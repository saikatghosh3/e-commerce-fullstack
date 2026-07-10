import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    await connectDB();
    const { ids } = await request.json();

    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json({ success: false, message: 'No product IDs provided' }, { status: 400 });
    }

    const products = await Product.find({ _id: { $in: ids } }).lean();
    return NextResponse.json({ success: true, products });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
