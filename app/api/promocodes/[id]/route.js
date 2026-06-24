import connectDB from '@/lib/db';
import PromoCode from '@/models/PromoCode';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: 'Invalid ID' },
        { status: 400 }
      );
    }

    const promoCode = await PromoCode.findById(id);
    if (!promoCode) {
      return Response.json(
        { success: false, message: 'Promo code not found' },
        { status: 404 }
      );
    }

    return Response.json({ success: true, promoCode });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: 'Invalid ID' },
        { status: 400 }
      );
    }

    if (body.code) {
      const dup = await PromoCode.findOne({
        code: body.code.toUpperCase(),
        _id: { $ne: id },
      });
      if (dup) {
        return Response.json(
          { success: false, message: 'Another promo code with this code already exists' },
          { status: 409 }
        );
      }
    }

    const updates = {};
    const fields = ['code', 'type', 'value', 'minOrderAmount', 'maxDiscount', 'usageLimit', 'expiresAt', 'isActive'];
    fields.forEach((f) => {
      if (body[f] !== undefined) updates[f] = body[f];
    });

    const promoCode = await PromoCode.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!promoCode) {
      return Response.json(
        { success: false, message: 'Promo code not found' },
        { status: 404 }
      );
    }

    return Response.json({ success: true, promoCode });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: 'Invalid ID' },
        { status: 400 }
      );
    }

    const promoCode = await PromoCode.findByIdAndDelete(id);
    if (!promoCode) {
      return Response.json(
        { success: false, message: 'Promo code not found' },
        { status: 404 }
      );
    }

    return Response.json({ success: true, message: 'Promo code deleted' });
  } catch (error) {
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
