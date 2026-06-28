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

    if (order.orderStatus !== 'delivered') {
      return Response.json(
        { success: false, message: 'Only delivered orders can be refunded' },
        { status: 400 }
      );
    }

    if (order.refundStatus === 'requested') {
      return Response.json(
        { success: false, message: 'Refund already requested' },
        { status: 400 }
      );
    }

    if (order.refundStatus === 'approved') {
      return Response.json(
        { success: false, message: 'Refund already approved' },
        { status: 400 }
      );
    }

    order.refundRequested = true;
    order.refundReason = reason;
    order.refundStatus = 'requested';
    order.refundDate = new Date();

    await order.save();

    return Response.json(
      { success: true, message: 'Refund request submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Refund request error:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
