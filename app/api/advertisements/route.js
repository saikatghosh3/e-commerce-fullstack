import connectDB from '@/lib/db';
import Advertisement from '@/models/Advertisement';
import { NextResponse } from 'next/server';

export async function GET(request) {
  try {
    await connectDB();
    const { searchParams } = new URL(request.url);
    const active = searchParams.get('active');
    const position = searchParams.get('position');

    const query = {};

    if (active === 'true') {
      query.active = true;
    }

    if (position) {
      query.position = position;
    }

    const advertisements = await Advertisement.find(query).sort({
      position: 1,
      displayOrder: 1,
      createdAt: -1,
    });

    return NextResponse.json({ success: true, advertisements });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();

    if (!body.image || !body.position) {
      return NextResponse.json(
        { success: false, message: 'Image and position are required' },
        { status: 400 }
      );
    }

    const advertisement = await Advertisement.create({
      ...body,
      displayOrder: Number(body.displayOrder) || 0,
      active: body.active !== false,
    });

    return NextResponse.json(
      { success: true, advertisement },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
