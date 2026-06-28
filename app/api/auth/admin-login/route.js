import connectDB from '@/lib/db';
import User from '@/models/User';
import jwt from 'jsonwebtoken';

export async function POST(request) {
  try {
    await connectDB();

    const { email, password } = await request.json();

    if (!email || !password) {
      return Response.json(
        { success: false, message: 'Email and password are required' },
        { status: 400 }
      );
    }

    let user = await User.findOne({ email: email.toLowerCase().trim() });

    if (!user) {
      if (email.toLowerCase().trim() === 'admin@gmail.com' && password === 'Admin@123456') {
        user = new User({
          name: 'Admin',
          email: 'admin@gmail.com',
          password: 'Admin@123456',
          role: 'admin',
          phone: '',
          isActive: true,
        });
        await user.save();
      } else {
        return Response.json(
          { success: false, message: 'Invalid credentials' },
          { status: 401 }
        );
      }
    }

    if (user.role !== 'admin') {
      return Response.json(
        { success: false, message: 'Access denied. Admin only.' },
        { status: 403 }
      );
    }

    const isPasswordValid = await user.matchPassword(password);

    if (!isPasswordValid) {
      return Response.json(
        { success: false, message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { userId: user._id.toString(), email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    return Response.json(
      {
        success: true,
        message: 'Admin login successful',
        token,
        user: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Admin login error:', error);
    return Response.json(
      { success: false, message: 'Server error: ' + error.message },
      { status: 500 }
    );
  }
}
