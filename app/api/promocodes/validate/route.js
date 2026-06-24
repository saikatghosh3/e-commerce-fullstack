import connectDB from '@/lib/db';
import PromoCode from '@/models/PromoCode';

export async function POST(request) {
  try {
    await connectDB();
    const { code, orderAmount } = await request.json();

    if (!code) {
      return Response.json(
        { success: false, message: 'Promo code is required' },
        { status: 400 }
      );
    }

    const promo = await PromoCode.findOne({ code: code.toUpperCase().trim() });

    if (!promo) {
      return Response.json(
        { success: false, message: 'Invalid promo code' },
        { status: 404 }
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

    const amount = orderAmount || 0;

    if (amount < promo.minOrderAmount) {
      return Response.json(
        {
          success: false,
          message: `Minimum order amount of ৳${promo.minOrderAmount.toLocaleString('en-IN')} required`,
        },
        { status: 400 }
      );
    }

    let discountAmount = 0;
    if (promo.type === 'percentage') {
      discountAmount = (amount * promo.value) / 100;
      if (promo.maxDiscount !== null && discountAmount > promo.maxDiscount) {
        discountAmount = promo.maxDiscount;
      }
    } else {
      discountAmount = Math.min(promo.value, amount);
    }

    return Response.json({
      success: true,
      promoCode: {
        code: promo.code,
        type: promo.type,
        value: promo.value,
        discountAmount: Math.round(discountAmount * 100) / 100,
        originalAmount: amount,
        finalAmount: Math.round((amount - discountAmount) * 100) / 100,
      },
    });
  } catch (error) {
    console.error('Promo validation error:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
