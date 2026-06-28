import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function PUT(request) {
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

    const body = await request.json();

    const allowedFields = ['name', 'phone', 'address', 'avatar'];
    const updates = {};
    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        updates[field] = body[field];
      }
    });

    const user = await User.findByIdAndUpdate(decoded.userId, updates, {
      new: true,
      runValidators: true,
    }).select('-password');

    if (!user) {
      return Response.json(
        { success: false, message: 'User not found' },
        { status: 404 }
      );
    }

    return Response.json(
      {
        success: true,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          address: user.address,
          role: user.role,
          avatar: user.avatar,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Update profile error:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
