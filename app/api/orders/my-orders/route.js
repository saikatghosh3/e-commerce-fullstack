import connectDB from '@/lib/db';
import Order from '@/models/Order';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export async function GET(request) {
  try {
    await connectDB();

    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return Response.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const orders = await Order.find({ userId: new ObjectId(decoded.userId) })
      .sort({ createdAt: -1 });

    return Response.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error('My orders error:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
