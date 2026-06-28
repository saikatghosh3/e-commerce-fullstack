import connectDB from '@/lib/db';
import Order from '@/models/Order';
import jwt from 'jsonwebtoken';

function getTokenFromHeader(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return authHeader.split(' ')[1];
}

export async function GET(request) {
  try {
    await connectDB();

    const token = getTokenFromHeader(request);
    if (!token) {
      return Response.json(
        { success: false, message: 'Not authenticated' },
        { status: 401 }
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (decoded.role !== 'admin') {
      return Response.json(
        { success: false, message: 'Access denied' },
        { status: 403 }
      );
    }

    const orders = await Order.find({
      $or: [
        { refundStatus: { $in: ['requested', 'approved', 'rejected'] } },
        { cancelRequested: true },
      ],
    }).sort({ updatedAt: -1 });

    return Response.json({ success: true, orders }, { status: 200 });
  } catch (error) {
    console.error('Admin refunds error:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
