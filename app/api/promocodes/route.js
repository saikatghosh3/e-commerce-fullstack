import connectDB from '@/lib/db';
import PromoCode from '@/models/PromoCode';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 50;
    const search = searchParams.get('search')?.trim();
    const status = searchParams.get('status');

    const query = {};
    if (search) {
      query.code = { $regex: search, $options: 'i' };
    }
    if (status === 'active') query.isActive = true;
    else if (status === 'inactive') query.isActive = false;

    const skip = (page - 1) * limit;
    const [promoCodes, total] = await Promise.all([
      PromoCode.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit),
      PromoCode.countDocuments(query),
    ]);

    return Response.json({
      success: true,
      promoCodes,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
      },
    });
  } catch (error) {
    console.error('Error fetching promo codes:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.code || !body.type || body.value === undefined) {
      return Response.json(
        { success: false, message: 'Code, type and value are required' },
        { status: 400 }
      );
    }

    if (!['percentage', 'fixed'].includes(body.type)) {
      return Response.json(
        { success: false, message: 'Type must be percentage or fixed' },
        { status: 400 }
      );
    }

    const existing = await PromoCode.findOne({ code: body.code.toUpperCase() });
    if (existing) {
      return Response.json(
        { success: false, message: 'A promo code with this code already exists' },
        { status: 409 }
      );
    }

    const promoCode = await PromoCode.create({
      code: body.code,
      type: body.type,
      value: body.value,
      minOrderAmount: body.minOrderAmount || 0,
      maxDiscount: body.maxDiscount || null,
      usageLimit: body.usageLimit || null,
      expiresAt: body.expiresAt || null,
      isActive: body.isActive !== undefined ? body.isActive : true,
    });

    return Response.json({ success: true, promoCode }, { status: 201 });
  } catch (error) {
    console.error('Error creating promo code:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
