import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function POST(request) {
  try {
    await connectDB();

    const { items } = await request.json();

    if (!items || !Array.isArray(items)) {
      return Response.json(
        { success: false, message: 'Invalid cart items' },
        { status: 400 }
      );
    }

    const cartItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);

        if (!product) {
          throw new Error(`Product ${item.productId} not found`);
        }

        return {
          productId: product._id,
          name: product.name,
          price: product.price,
          discount: product.discount,
          image: product.image,
          quantity: item.quantity,
          stock: product.stock,
        };
      })
    );

    const subtotal = cartItems.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0
    );

    return Response.json(
      {
        success: true,
        items: cartItems,
        subtotal,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Cart error:', error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
