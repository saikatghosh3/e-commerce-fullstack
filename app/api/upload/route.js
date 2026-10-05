import { randomUUID } from 'crypto';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

export const runtime = 'nodejs';

const MAX_EDGE = 1600;
const MAX_UPLOAD_BYTES = 12 * 1024 * 1024;

const RASTER_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

/**
 * SVGs are served from the same origin, so an unsanitised upload is a stored-XSS
 * vector for every customer. Strip anything executable and allow it through.
 */
function sanitizeSvg(svg) {
  return svg
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<script[^>]*\/>/gi, '')
    .replace(/<foreignObject[\s\S]*?<\/foreignObject>/gi, '')
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, '')
    .replace(/<embed[\s\S]*?>/gi, '')
    .replace(/<use[^>]*xlink:href\s*=\s*["']\s*javascript:[^"']*["'][^>]*>/gi, '')
    .replace(/\son\w+\s*=\s*(["']).*?\1/gi, '')
    .replace(/(href|xlink:href)\s*=\s*(["'])\s*javascript:[\s\S]*?\2/gi, '');
}

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

    const declaredType = (file.type || '').toLowerCase();
    if (![...RASTER_TYPES, 'image/svg+xml'].includes(declaredType)) {
      return Response.json(
        { success: false, message: 'Only JPG, PNG, WEBP and SVG images are allowed' },
        { status: 400 }
      );
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    if (bytes.length === 0) {
      return Response.json(
        { success: false, message: 'Uploaded file is empty' },
        { status: 400 }
      );
    }
    if (bytes.length > MAX_UPLOAD_BYTES) {
      return Response.json(
        {
          success: false,
          message: `Image is too large. Maximum size is ${Math.floor(MAX_UPLOAD_BYTES / 1024 / 1024)}MB.`,
        },
        { status: 413 }
      );
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    let output;
    let filename;

    if (declaredType === 'image/svg+xml') {
      const cleaned = sanitizeSvg(bytes.toString('utf8'));
      if (!/<svg[\s>]/i.test(cleaned)) {
        return Response.json(
          { success: false, message: 'File is not a valid SVG image' },
          { status: 400 }
        );
      }
      filename = `${randomUUID()}.svg`;
      output = Buffer.from(cleaned, 'utf8');
    } else {
      // sharp validates real content, so a renamed .exe cannot pose as an image
      let pipeline = sharp(bytes, { failOn: 'error' }).rotate();

      // Animated GIFs would be flattened to frame one, so pass them through untouched
      const meta = await sharp(bytes, { failOn: 'error' }).metadata();
      if (meta.format === 'gif' && meta.pages > 1) {
        filename = `${randomUUID()}.gif`;
        output = bytes;
      } else {
        pipeline = pipeline.resize({
          width: MAX_EDGE,
          height: MAX_EDGE,
          fit: 'inside',
          withoutEnlargement: true,
        });

        // Transparency must survive, otherwise logos get black boxes
        const keepAlpha = meta.format === 'png' && meta.hasAlpha === true;

        if (keepAlpha) {
          filename = `${randomUUID()}.png`;
          output = await pipeline
            .png({ compressionLevel: 9, palette: true, quality: 90, effort: 8 })
            .toBuffer();
        } else {
          filename = `${randomUUID()}.webp`;
          output = await pipeline.webp({ quality: 82, effort: 6 }).toBuffer();
        }
      }
    }

    await writeFile(path.join(uploadDir, filename), output);

    return Response.json(
      {
        success: true,
        url: `/uploads/${filename}`,
        bytes: output.length,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Image upload error:', error);
    return Response.json(
      { success: false, message: 'Could not process that image. Is it a valid JPG, PNG, WEBP or SVG?' },
      { status: 400 }
    );
  }
}
