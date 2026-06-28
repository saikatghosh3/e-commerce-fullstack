import connectDB from '@/lib/db';
import SiteSetting from '@/models/SiteSetting';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    await connectDB();
    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = await SiteSetting.create({});
    }
    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    await connectDB();
    const body = await request.json();

    let settings = await SiteSetting.findOne();
    if (!settings) {
      settings = new SiteSetting();
    }

    const allowedFields = [
      'siteName', 'siteNameEnglish', 'logo', 'logoLetter', 'logoLetterEnglish',
      'tagline', 'description', 'email', 'phone', 'phoneEnglish',
      'address', 'addressEnglish',
      'facebook', 'twitter', 'instagram', 'linkedin', 'youtube', 'whatsapp',
      'copyright', 'footerTagline', 'favicon',
    ];

    for (const field of allowedFields) {
      if (body[field] !== undefined) {
        settings[field] = body[field];
      }
    }

    await settings.save();

    return NextResponse.json({ success: true, settings });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
