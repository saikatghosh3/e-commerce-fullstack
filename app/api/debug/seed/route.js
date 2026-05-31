import connectDB from '@/lib/db';
import Product from '@/models/Product';

export async function GET(request) {
  try {
    await connectDB();

    // Check if products already exist
    const existingCount = await Product.countDocuments();
    
    if (existingCount > 0) {
      return Response.json(
        {
          success: true,
          message: `Database already has ${existingCount} products. Not seeding.`,
          productCount: existingCount,
        },
        { status: 200 }
      );
    }

    // Create sample products
    const sampleProducts = [
      {
        name: 'Premium Wireless Headphones',
        description: 'High-quality wireless headphones with noise cancellation and 30-hour battery life.',
        price: 299.99,
        discount: 10,
        image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop',
        ],
        category: 'Electronics',
        stock: 50,
        rating: 4.8,
        sku: 'HEADPHONES-001',
        tags: ['wireless', 'audio', 'premium'],
        featured: true,
      },
      {
        name: 'Smartphone Pro Max',
        description: 'Latest generation smartphone with advanced camera system and 5G connectivity.',
        price: 1099.99,
        discount: 5,
        image: 'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=500&h=500&fit=crop',
        ],
        category: 'Electronics',
        stock: 30,
        rating: 4.9,
        sku: 'PHONE-001',
        tags: ['smartphone', 'mobile', 'latest'],
        featured: true,
      },
      {
        name: 'Smartwatch Elite',
        description: 'Advanced smartwatch with fitness tracking, heart rate monitor, and 7-day battery.',
        price: 399.99,
        discount: 8,
        image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop',
        ],
        category: 'Electronics',
        stock: 45,
        rating: 4.7,
        sku: 'WATCH-001',
        tags: ['wearable', 'fitness', 'smart'],
        featured: true,
      },
      {
        name: '4K Webcam Pro',
        description: 'Professional 4K webcam perfect for streaming and video conferences.',
        price: 199.99,
        discount: 15,
        image: 'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=500&h=500&fit=crop',
        ],
        category: 'Accessories',
        stock: 60,
        rating: 4.6,
        sku: 'WEBCAM-001',
        tags: ['camera', 'streaming', '4k'],
        featured: false,
      },
      {
        name: 'Wireless Mouse',
        description: 'Ergonomic wireless mouse with precision tracking and quiet clicking.',
        price: 49.99,
        discount: 20,
        image: 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop',
        ],
        category: 'Accessories',
        stock: 100,
        rating: 4.5,
        sku: 'MOUSE-001',
        tags: ['mouse', 'wireless', 'ergonomic'],
        featured: false,
      },
      {
        name: 'Mechanical Keyboard',
        description: 'Premium mechanical keyboard with customizable RGB lighting and hot-swap switches.',
        price: 179.99,
        discount: 12,
        image: 'https://images.unsplash.com/photo-1587829191301-53ce2173887f?w=500&h=500&fit=crop',
        images: [
          'https://images.unsplash.com/photo-1587829191301-53ce2173887f?w=500&h=500&fit=crop',
        ],
        category: 'Accessories',
        stock: 55,
        rating: 4.8,
        sku: 'KEYBOARD-001',
        tags: ['keyboard', 'mechanical', 'gaming'],
        featured: false,
      },
    ];

    const createdProducts = await Product.insertMany(sampleProducts);

    return Response.json(
      {
        success: true,
        message: 'Database seeded successfully',
        productsCreated: createdProducts.length,
        products: createdProducts,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('[v0] Seed error:', error);
    return Response.json(
      {
        success: false,
        message: error.message,
        error: error.toString(),
      },
      { status: 500 }
    );
  }
}
