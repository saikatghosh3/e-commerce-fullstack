import axios from 'axios';
import connectDB from '@/lib/db';
import Order from '@/models/Order';

export async function POST(request) {
  try {
    await connectDB();

    const {
      orderNumber,
      userId,
      items,
      subtotal,
      shippingCost,
      tax,
      totalAmount,
      shippingAddress,
      paymentMethod,
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

    const orderPayload = {
      orderNumber,
      items,
      customerType: userId ? 'registered' : 'guest',
      subtotal: subtotal ?? calculatedSubtotal,
      shippingCost: shippingCost ?? 0,
      tax: tax ?? 0,
      totalAmount,
      shippingAddress,
      paymentMethod,
      paymentStatus: 'pending',
      orderStatus: 'pending',
    };

    if (userId) {
      orderPayload.userId = userId;
    }

    const order = new Order(orderPayload);

    await order.save();

    if (paymentMethod === 'ssl-commerz') {
      try {
        const sslPayload = {
          store_id: process.env.SSL_COMMERZ_STORE_ID,
          store_passwd: process.env.SSL_COMMERZ_STORE_PASSWORD,
          total_amount: totalAmount,
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
          message: 'Order created. Proceed to payment.',
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
