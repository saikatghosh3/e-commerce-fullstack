import connectDB from '@/lib/db';
import Order from '@/models/Order';

export async function POST(request) {
  try {
    await connectDB();

    const formData = await request.formData();
    const tran_id = formData.get('tran_id');
    const val_id = formData.get('val_id');

    const order = await Order.findOne({ orderNumber: tran_id });

    if (!order) {
      return Response.json(
        { success: false, message: 'Order not found' },
        { status: 404 }
      );
    }

    order.paymentStatus = 'completed';
    order.orderStatus = 'processing';
    order.transactionId = val_id;

    await order.save();

    return new Response('Payment successful', { status: 200 });
  } catch (error) {
    console.error('Payment success error:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const tran_id = searchParams.get('tran_id');

  return Response.json(
    {
      success: true,
      message: 'Payment successful',
      transactionId: tran_id,
    },
    { status: 200 }
  );
}
