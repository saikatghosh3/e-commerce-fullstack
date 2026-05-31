import connectDB from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const body = await request.json();
    const name = body.name?.trim();

    if (!name) {
      return NextResponse.json({ success: false, message: 'Category name is required' }, { status: 400 });
    }

    const existing = await Category.findById(id);
    if (!existing) {
      return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
    }

    const oldName = existing.name;
    existing.name = name;
    existing.description = body.description?.trim() || '';
    await existing.save();

    if (oldName !== name) {
      await Product.updateMany({ category: oldName }, { $set: { category: name } });
    }

    return NextResponse.json({ success: true, category: existing }, { status: 200 });
  } catch (error) {
    const status = error.code === 11000 ? 409 : 400;
    const message = error.code === 11000 ? 'Category already exists' : error.message;
    return NextResponse.json({ success: false, message }, { status });
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json({ success: false, message: 'Category not found' }, { status: 404 });
    }

    const productCount = await Product.countDocuments({ category: category.name });
    if (productCount > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `This category has ${productCount} product(s). Move or delete those products first.`,
        },
        { status: 409 }
      );
    }

    await Category.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: 'Category deleted' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
