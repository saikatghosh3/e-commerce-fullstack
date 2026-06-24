import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { reviewId } = await params;
    const body = await request.json();

    const product = await Product.findOne({ 'reviews._id': reviewId });
    if (!product) {
      return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
    }

    const review = product.reviews.id(reviewId);
    if (!review) {
      return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
    }

    if (body.user !== undefined) review.user = body.user;
    if (body.rating !== undefined) review.rating = Number(body.rating);
    if (body.comment !== undefined) review.comment = body.comment;
    if (body.approved !== undefined) review.approved = body.approved;

    const ratings = product.reviews
      .filter((r) => r.approved)
      .map((r) => Number(r.rating) || 0)
      .filter((r) => r > 0);
    product.rating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
        : 0;

    await product.save();

    return NextResponse.json({ success: true, message: 'Review updated successfully', review });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { reviewId } = await params;

    const product = await Product.findOne({ 'reviews._id': reviewId });
    if (!product) {
      return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
    }

    product.reviews.pull({ _id: reviewId });

    const ratings = product.reviews
      .filter((r) => r.approved)
      .map((r) => Number(r.rating) || 0)
      .filter((r) => r > 0);
    product.rating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
        : 0;

    await product.save();

    return NextResponse.json({ success: true, message: 'Review deleted successfully' });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
