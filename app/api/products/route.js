// import connectDB from '@/lib/db';
// import Product from '@/models/Product';
// import { NextResponse } from 'next/server';

// export async function GET(request) {
//   try {
//     await connectDB();
//     const { searchParams } = new URL(request.url);

//     // কুয়েরি প্যারামিটারগুলো ধরা
//     const category = searchParams.get('category');
//     const search = searchParams.get('search');
//     const minPrice = searchParams.get('minPrice');
//     const maxPrice = searchParams.get('maxPrice');
//     const page = parseInt(searchParams.get('page')) || 1;
//     const limit = parseInt(searchParams.get('limit')) || 12;
//     const skip = (page - 1) * limit;

//     // ফিল্টার অবজেক্ট তৈরি
//     let query = {};

//     // ক্যাটাগরি ফিল্টার (সবথেকে গুরুত্বপূর্ণ)
//     if (category && category !== 'all') {
//       // এটি Case-insensitive করার জন্য রেগুলার এক্সপ্রেশন ব্যবহার করা ভালো
//       query.category = { $regex: new RegExp(`^${category}$`, 'i') };
//     }

//     // সার্চ ফিল্টার
//     if (search) {
//       query.name = { $regex: search, $options: 'i' };
//     }

//     // প্রাইস ফিল্টার
//     if (minPrice || maxPrice) {
//       query.price = {};
//       if (minPrice) query.price.$gte = Number(minPrice);
//       if (maxPrice) query.price.$lte = Number(maxPrice);
//     }

//     // ডাটাবেস থেকে প্রোডাক্ট নিয়ে আসা
//     const products = await Product.find(query)
//       .sort({ createdAt: -1 })
//       .skip(skip)
//       .limit(limit);

//     const total = await Product.countDocuments(query);

//     return NextResponse.json({
//       success: true,
//       products,
//       pagination: {
//         total,
//         pages: Math.ceil(total / limit),
//         currentPage: page,
//       },
//     });
//   } catch (error) {
//     return NextResponse.json({ success: false, message: error.message }, { status: 500 });
//   }
// }


import connectDB from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);

    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const featured = searchParams.get('featured');
    const bestSelling = searchParams.get('bestSelling');
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 12;

    let query = {};

    if (category && category !== 'all') {
      query.category = category; 
    }

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (featured === 'true') {
      query.featured = true;
    }

    if (bestSelling === 'true') {
      query.bestSelling = true;
    }

    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = Number(minPrice);
      if (maxPrice) query.price.$lte = Number(maxPrice);
    }

    const skip = (page - 1) * limit;
    const products = await Product.find(query)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    const total = await Product.countDocuments(query);

    return NextResponse.json({
      success: true,
      products,
      pagination: {
        total,
        pages: Math.ceil(total / limit),
        currentPage: page,
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

    if (body.category) {
      const category = await Category.findOne({ name: body.category });
      if (!category) {
        return NextResponse.json(
          { success: false, message: 'Selected category does not exist' },
          { status: 400 }
        );
      }
    }

    const newProduct = await Product.create(body);

    return NextResponse.json(
      { success: true, message: 'পণ্য সফলভাবে তৈরি হয়েছে', product: newProduct },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
