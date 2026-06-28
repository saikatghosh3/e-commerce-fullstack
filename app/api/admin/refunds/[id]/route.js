import connectDB from '@/lib/db';
import Order from '@/models/Order';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

function getTokenFromHeader(request) {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Bearer ')) return null;
  return authHeader.split(' ')[1];
}

export async function PUT(request, { params }) {
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

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: 'Invalid order ID' },
        { status: 400 }
      );
    }

    const { action, note } = await request.json();

    if (!action || !['approve', 'reject'].includes(action)) {
      return Response.json(
        { success: false, message: 'Action must be approve or reject' },
        { status: 400 }
      );
    }

    const order = await Order.findById(id);

    if (!order) {
      return Response.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    if (action === 'approve') {
      order.refundStatus = 'approved';
      order.paymentStatus = 'refunded';
      order.refundNote = note || 'Refund approved';
    } else {
      order.refundStatus = 'rejected';
      order.refundNote = note || 'Refund rejected';
    }

    await order.save();

    return Response.json(
      { success: true, order, message: `Refund ${action === 'approve' ? 'approved' : 'rejected'} successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error('Refund action error:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
