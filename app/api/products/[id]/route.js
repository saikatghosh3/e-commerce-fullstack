import connectDB from '@/lib/db';
import Category from '@/models/Category';
import Product from '@/models/Product';
import { NextResponse } from 'next/server'; // Response এর বদলে NextResponse ব্যবহার করা ভালো

export async function GET(request, { params }) {
  try {
    await connectDB();
    // Next.js 15 এ params একটি Promise, তাই await করতে হয়
    const { id } = await params; 

    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json({ success: false, message: 'পণ্য পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

// আপডেট করার জন্য PUT এবং PATCH উভয়ই সাপোর্ট রাখা ভালো
export async function PUT(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
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

    if (Array.isArray(body.reviews)) {
      const ratings = body.reviews
        .map((review) => Number(review.rating) || 0)
        .filter((rating) => rating > 0);
      body.rating = ratings.length > 0
        ? ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        : 0;
    }

    // { new: true } দিলে আপডেট হওয়া নতুন ডাটা রিটার্ন করে
    const product = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return NextResponse.json({ success: false, message: 'পণ্য পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({ success: true, product }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}




export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json({ success: false, message: 'পণ্য পাওয়া যায়নি' }, { status: 404 });
    }

    return NextResponse.json({ success: true, message: 'পণ্য ডিলিট হয়েছে' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
