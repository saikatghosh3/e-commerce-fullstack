import connectDB from '@/lib/db';
import Advertisement from '@/models/Advertisement';
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const advertisement = await Advertisement.findById(id);

    if (!advertisement) {
      return NextResponse.json(
        { success: false, message: 'Advertisement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, advertisement });
  } catch (error) {
    return NextResponse.json(
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

    const advertisement = await Advertisement.findByIdAndUpdate(
      id,
      {
        ...body,
        displayOrder: Number(body.displayOrder) || 0,
        active: body.active !== false,
      },
      { new: true, runValidators: true }
    );

    if (!advertisement) {
      return NextResponse.json(
        { success: false, message: 'Advertisement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, advertisement });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();
    const { id } = await params;
    const advertisement = await Advertisement.findByIdAndDelete(id);

    if (!advertisement) {
      return NextResponse.json(
        { success: false, message: 'Advertisement not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
