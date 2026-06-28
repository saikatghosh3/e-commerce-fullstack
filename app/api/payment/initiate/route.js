import axios from 'axios';
import connectDB from '@/lib/db';
import Order from '@/models/Order';
import User from '@/models/User';
import PromoCode from '@/models/PromoCode';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json(
        { success: false, message: 'Authentication required. Please login first.' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch {
      return Response.json(
        { success: false, message: 'Invalid or expired token. Please login again.' },
        { status: 401 }
      );
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      return Response.json(
        { success: false, message: 'User not found. Please register first.' },
        { status: 404 }
      );
    }

    const {
      orderNumber,
      items,
      subtotal,
      shippingCost,
      tax,
      totalAmount,
      shippingAddress,
      paymentMethod,
      promoCode: rawPromoCode,
    } = await request.json();

    if (!items?.length) {
      return Response.json(
        { success: false, message: 'Order must include at least one item' },
        { status: 400 }
      );
    }

    const calculatedSubtotal = items.reduce(
      (sum, item) => sum + Number(item.price || 0) * Number(item.quantity || 0),
      0
    );

    let discountAmount = 0;
    let discountType = null;
    let promoCodeUsed = null;

    if (rawPromoCode) {
      const promo = await PromoCode.findOne({ code: rawPromoCode.toUpperCase().trim() });

      if (!promo) {
        return Response.json(
          { success: false, message: 'Invalid promo code' },
          { status: 400 }
        );
      }

      if (!promo.isActive) {
        return Response.json(
          { success: false, message: 'This promo code is no longer active' },
          { status: 400 }
        );
      }

      if (promo.expiresAt && new Date(promo.expiresAt) < new Date()) {
        return Response.json(
          { success: false, message: 'This promo code has expired' },
          { status: 400 }
        );
      }

      if (promo.usageLimit !== null && promo.usedCount >= promo.usageLimit) {
        return Response.json(
          { success: false, message: 'This promo code has reached its usage limit' },
          { status: 400 }
        );
      }

      if (calculatedSubtotal < promo.minOrderAmount) {
        return Response.json(
          {
            success: false,
            message: `Minimum order amount of ৳${promo.minOrderAmount.toLocaleString('en-IN')} required for this promo code`,
          },
          { status: 400 }
        );
      }

      if (promo.type === 'percentage') {
        discountAmount = (calculatedSubtotal * promo.value) / 100;
        if (promo.maxDiscount !== null && discountAmount > promo.maxDiscount) {
          discountAmount = promo.maxDiscount;
        }
      } else {
        discountAmount = Math.min(promo.value, calculatedSubtotal);
      }

      discountAmount = Math.round(discountAmount * 100) / 100;

      await PromoCode.findByIdAndUpdate(promo._id, { $inc: { usedCount: 1 } });

      discountType = promo.type;
      promoCodeUsed = promo.code;
    }

    const finalShipping = shippingCost ?? 0;
    const finalTax = tax ?? 0;
    const finalTotal = calculatedSubtotal + finalShipping + finalTax - discountAmount;

    const orderPayload = {
      orderNumber,
      userId: user._id,
      items,
      customerType: 'registered',
      subtotal: calculatedSubtotal,
      shippingCost: finalShipping,
      tax: finalTax,
      totalAmount: finalTotal,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'pending',
      discount: discountAmount,
      promoCode: promoCodeUsed,
      discountType,
    };

    const order = new Order(orderPayload);

    await order.save();

    if (paymentMethod === 'ssl-commerz') {
      try {
        const sslPayload = {
          store_id: process.env.SSL_COMMERZ_STORE_ID,
          store_passwd: process.env.SSL_COMMERZ_STORE_PASSWORD,
          total_amount: finalTotal,
          currency: 'BDT',
          tran_id: orderNumber,
          success_url: `${process.env.NEXT_PUBLIC_API_URL}/api/payment/success`,
          fail_url: `${process.env.NEXT_PUBLIC_API_URL}/api/payment/fail`,
          cancel_url: `${process.env.NEXT_PUBLIC_API_URL}/api/payment/cancel`,
          ipn_url: `${process.env.NEXT_PUBLIC_API_URL}/api/payment/ipn`,
          cus_name: shippingAddress.name,
          cus_email: shippingAddress.email,
          cus_phone: shippingAddress.phone,
          cus_add1: shippingAddress.street,
          cus_city: shippingAddress.city,
          cus_postcode: shippingAddress.zipCode,
          cus_country: shippingAddress.country,
          shipping_method: 'NO',
          product_name: items.map((i) => i.name).join(', '),
          product_category: 'Electronics',
          product_profile: 'general',
        };

        const response = await axios.post(
          'https://sandbox.sslcommerz.com/gwprocess/v4/api.php',
          sslPayload
        );

        return Response.json(
          {
            success: true,
            order: {
              _id: order._id,
              orderNumber: order.orderNumber,
            },
            paymentUrl: response.data.redirectGatewayURL,
          },
          { status: 200 }
        );
      } catch (error) {
        console.error('SSL Commerz error:', error);
        return Response.json(
          {
            success: false,
            message: 'Payment gateway error',
            error: error.message,
          },
          { status: 500 }
        );
      }
    } else {
      return Response.json(
        {
          success: true,
          order: {
            _id: order._id,
            orderNumber: order.orderNumber,
          },
          message: 'Order created successfully.',
        },
        { status: 201 }
      );
    }
  } catch (error) {
    console.error('Payment initiation error:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
