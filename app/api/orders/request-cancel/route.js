import connectDB from '@/lib/db';
import Order from '@/models/Order';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export async function POST(request) {
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

    const { orderId, reason } = await request.json();

    if (!orderId || !reason) {
      return Response.json(
        { success: false, message: 'Order ID and reason are required' },
        { status: 400 }
      );
    }

    if (!ObjectId.isValid(orderId)) {
      return Response.json(
        { success: false, message: 'Invalid order ID' },
        { status: 400 }
      );
    }

    const order = await Order.findOne({ _id: new ObjectId(orderId), userId: new ObjectId(decoded.userId) });

    if (!order) {
      return Response.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    if (order.orderStatus !== 'pending' && order.orderStatus !== 'processing') {
      return Response.json(
        { success: false, message: 'Order cannot be cancelled at this stage' },
        { status: 400 }
      );
    }

    order.cancelRequested = true;
    order.cancelReason = reason;
    order.cancelDate = new Date();
    order.orderStatus = 'cancelled';

    await order.save();

    return Response.json(
      { success: true, message: 'Order cancelled successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Cancel order error:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
