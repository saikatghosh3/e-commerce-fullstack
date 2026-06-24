import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { productId } = await params;
    const { searchParams } = new URL(request.url);
    const approved = searchParams.get('approved');

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    let reviews = product.reviews || [];

    if (approved === 'true') {
      reviews = reviews.filter((r) => r.approved);
    }

    reviews.sort((a, b) => new Date(b.date) - new Date(a.date));

    return NextResponse.json({ success: true, reviews });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
