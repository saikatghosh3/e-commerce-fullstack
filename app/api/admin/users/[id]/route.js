import connectDB from '@/lib/db';
import User from '@/models/User';
import { ObjectId } from 'mongodb';

export async function GET(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 }
      );
    }

    const user = await User.findById(id).select('-password');

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;
    const body = await request.json();

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 }
      );
    }

    const allowedFields = ['name', 'phone', 'address', 'role', 'isActive', 'avatar'];
    const updates = {};
    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    });

    const user = await User.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json({ success: true, user });
  } catch (error) {
    console.error('Error updating user:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 400 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    await connectDB();

    const { id } = await params;

    if (!ObjectId.isValid(id)) {
      return Response.json(
        { success: false, message: 'Invalid user ID' },
        { status: 400 }
      );
    }

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, message: 'User deleted successfully' }
    );
  } catch (error) {
    console.error('Error deleting user:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
