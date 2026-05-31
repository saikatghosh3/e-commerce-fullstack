import connectDB from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

async function createCategoriesFromProducts() {
  const existingCount = await Category.countDocuments();
  if (existingCount > 0) return;

  const productCategories = await Product.distinct('category', {
    category: { $nin: [null, ''] },
  });

  if (productCategories.length === 0) return;

  await Category.insertMany(
    productCategories.map((name) => ({ name })),
    { ordered: false }
  );
}

export async function GET() {
  try {
    await connectDB();
    await createCategoriesFromProducts();

    const categories = await Category.find({}).sort({ name: 1 });

    return NextResponse.json({ success: true, categories }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json({ success: false, message: 'Category name is required' }, { status: 400 });
    }

    const category = await Category.create({
      name,
      description: body.description?.trim() || '',
    });

    return NextResponse.json({ success: true, category }, { status: 201 });
  } catch (error) {
    const status = error.code === 11000 ? 409 : 500;
    const message = error.code === 11000 ? 'Category already exists' : error.message;
    return NextResponse.json({ success: false, message }, { status });
  }
}
