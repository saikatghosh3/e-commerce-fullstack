import connectDB from '@/lib/db';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const productId = searchParams.get('productId');
    const approved = searchParams.get('approved');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 20;
    const skip = (page - 1) * limit;

    let pipeline = [];

    if (productId) {
      pipeline.push({ $match: { _id: new (await import('mongoose')).Types.ObjectId(productId) } });
    }

    pipeline.push({ $unwind: '$reviews' });

    if (approved !== null && approved !== undefined) {
      const isApproved = approved === 'true';
      pipeline.push({ $match: { 'reviews.approved': isApproved } });
    }

    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { 'reviews.user': { $regex: search, $options: 'i' } },
            { 'reviews.comment': { $regex: search, $options: 'i' } },
          ],
        },
      });
    }

    const countPipeline = [...pipeline, { $count: 'total' }];
    const countResult = await Product.aggregate(countPipeline);
    const total = countResult[0]?.total || 0;

    pipeline.push(
      { $sort: { 'reviews.date': -1 } },
      { $skip: skip },
      { $limit: limit },
      {
        $project: {
          _id: 0,
          reviewId: '$reviews._id',
          productId: '$_id',
          productName: '$name',
          productImage: '$image',
          user: '$reviews.user',
          rating: '$reviews.rating',
          comment: '$reviews.comment',
          date: '$reviews.date',
          approved: '$reviews.approved',
        },
      }
    );

    const reviews = await Product.aggregate(pipeline);

    return NextResponse.json({
      success: true,
      reviews,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { productId, user, rating, comment } = body;

    if (!productId || !user || !rating || !comment) {
      return NextResponse.json(
        { success: false, message: 'productId, user, rating, and comment are required' },
        { status: 400 }
      );
    }

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json({ success: false, message: 'Product not found' }, { status: 404 });
    }

    product.reviews.push({
      user,
      rating: Number(rating),
      comment,
      date: new Date(),
      approved: true,
    });

    const ratings = product.reviews
      .filter((r) => r.approved)
      .map((r) => Number(r.rating) || 0)
      .filter((r) => r > 0);
    product.rating =
      ratings.length > 0
        ? ratings.reduce((sum, r) => sum + r, 0) / ratings.length
        : 0;

    await product.save();

    return NextResponse.json(
      { success: true, message: 'Review added successfully', product },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
