import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';

export const runtime = 'nodejs';

const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('image');

    if (!file || typeof file === 'string') {
      return Response.json(
        { success: false, message: 'Image file is required' },
        { status: 400 }
      );
    }

    if (!allowedTypes.includes(file.type)) {
      return Response.json(
        { success: false, message: 'Only JPG, PNG, WEBP, and GIF images are allowed' },
        { status: 400 }
      );
    }

    const extension = file.name?.split('.').pop()?.toLowerCase() || 'jpg';
    const filename = `${randomUUID()}.${extension}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    const uploadPath = path.join(uploadDir, filename);
    const bytes = await file.arrayBuffer();

    await mkdir(uploadDir, { recursive: true });
    await writeFile(uploadPath, Buffer.from(bytes));

    return Response.json(
      {
        success: true,
        url: `/uploads/${filename}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Image upload error:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
