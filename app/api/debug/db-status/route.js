import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request) {
  try {
    console.log('[v0] Debug: Attempting to connect to MongoDB');
    await connectDB();
    console.log('[v0] Debug: Connected to MongoDB');

    const count = await Product.countDocuments();
    console.log('[v0] Debug: Product count:', count);

    const products = await Product.find().limit(5);
    console.log('[v0] Debug: Sample products:', products);

    return Response.json(
      {
        success: true,
        message: 'Database connection successful',
        productCount: count,
        sampleProducts: products,
        env: {
          mongodbUri: process.env.MONGODB_URI ? 'Set' : 'Not set',
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('[v0] Debug error:', error);
    return Response.json(
      {
        success: false,
        message: error.message,
        error: error.toString(),
      },
      { status: 500 }
    );
  }
}
