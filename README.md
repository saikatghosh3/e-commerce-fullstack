# Elite Store - E-Commerce Platform

A professional, modern e-commerce platform built with Next.js, Tailwind CSS, and MongoDB. Features a stunning landing page, complete shopping cart functionality, SSL Commerz payment integration, and a comprehensive admin panel.

## Features

### Frontend
- **Professional Landing Page** - Eye-catching hero section with featured products
- **Product Catalog** - Browse products with filtering and search functionality
- **Product Details** - Detailed product pages with images, ratings, and reviews
- **Shopping Cart** - Full cart management with quantity controls and price calculations
- **Checkout** - Complete checkout process with shipping information
- **Responsive Design** - Mobile-first design that works on all devices
- **User Authentication** - Register and login functionality

### Admin Panel
- **Product Management** - Create, edit, and delete products
- **Inventory Control** - Manage stock levels and product availability
- **Order Management** - Track and manage customer orders
- **Dashboard** - Overview of products and orders

### Payment
- **SSL Commerz Integration** - Secure online payment gateway
- **Multiple Payment Methods** - Support for SSL Commerz and Cash on Delivery

### Database
- **MongoDB Integration** - Secure MongoDB Atlas connection
- **Product Schema** - Comprehensive product model with ratings and reviews
- **User Management** - User accounts and authentication
- **Order Tracking** - Complete order history and management

## Tech Stack

- **Frontend**: Next.js 14, React 18, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Payment Gateway**: SSL Commerz
- **Icons**: Lucide React
- **Language**: JavaScript/JSX (No TypeScript)

## Getting Started

### Prerequisites

- Node.js 16+ and npm/pnpm
- MongoDB Atlas account (free tier available)
- SSL Commerz account (for payment processing)

### Installation

1. **Clone or download the project**

```bash
cd elite-store
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**

Create a `.env.local` file in the root directory:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key_here
SSL_COMMERZ_STORE_ID=your_store_id
SSL_COMMERZ_STORE_PASSWORD=your_store_password
NEXT_PUBLIC_API_URL=http://localhost:3000
```

### MongoDB Setup

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Get your connection string
4. Add it to `.env.local` as `MONGODB_URI`

### SSL Commerz Setup

1. Sign up at [SSL Commerz](https://www.sslcommerz.com)
2. Get your Store ID and Store Password
3. Add them to `.env.local`

### Running the Application

```bash
# Development server
pnpm dev

# Production build
pnpm build
pnpm start
```

The application will be available at `http://localhost:3000`

## Project Structure

```
elite-store/
├── app/
│   ├── api/                 # API routes
│   │   ├── products/        # Product endpoints
│   │   ├── auth/            # Authentication endpoints
│   │   ├── cart/            # Cart endpoints
│   │   └── payment/         # Payment processing
│   ├── admin/               # Admin panel pages
│   ├── auth/                # Authentication pages
│   ├── products/            # Product pages
│   ├── cart/                # Shopping cart page
│   ├── checkout/            # Checkout page
│   ├── layout.js            # Root layout
│   ├── page.js              # Landing page
│   └── globals.css          # Global styles
├── components/
│   ├── Header.jsx           # Navigation header
│   ├── Footer.jsx           # Footer component
│   ├── ProductCard.jsx      # Product card component
│   └── AdminLayout.jsx      # Admin layout wrapper
├── models/                  # MongoDB models
│   ├── Product.js           # Product schema
│   ├── User.js              # User schema
│   └── Order.js             # Order schema
├── lib/
│   ├── db.js                # MongoDB connection
│   └── utils.js             # Utility functions
└── public/                  # Static assets
```

## Key Pages & Routes

### Customer Routes
- `/` - Landing page
- `/products` - Products listing
- `/products/[id]` - Product details
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/auth/login` - User login
- `/auth/register` - User registration

### Admin Routes
- `/admin/dashboard` - Product management
- `/admin/products/new` - Add new product
- `/admin/products/[id]/edit` - Edit product
- `/admin/orders` - Order management
- `/admin/customers` - Customer management

## API Endpoints

### Products
- `GET /api/products` - Get all products (with pagination)
- `GET /api/products?category=Electronics` - Filter by category
- `GET /api/products/[id]` - Get product details
- `POST /api/products` - Create product (admin)
- `PUT /api/products/[id]` - Update product (admin)
- `DELETE /api/products/[id]` - Delete product (admin)

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login

### Cart & Checkout
- `POST /api/cart` - Validate and calculate cart totals
- `POST /api/payment/initiate` - Initiate payment

### Payments
- `POST /api/payment/success` - Payment success callback
- `GET/POST /api/payment/ipn` - Instant Payment Notification

## Features Breakdown

### Shopping Experience
- Smooth product browsing with lazy loading
- Advanced search and filtering
- Product ratings and reviews
- Wishlist functionality
- Add to cart with quantity selection
- Cart persistence (local storage)
- Comprehensive checkout with address collection
- Order confirmation

### Admin Experience
- Dashboard with product overview
- Add/Edit/Delete products easily
- Manage inventory and stock levels
- View and manage orders
- Customer management
- Product analytics

### Security
- Password hashing with bcryptjs
- JWT-based authentication
- SSL encrypted transactions
- Input validation
- CORS protection

## Customization

### Styling
- All styles use Tailwind CSS utility classes
- Color scheme can be customized in `tailwind.config.js`
- Responsive design with mobile-first approach

### Adding New Products
1. Go to `/admin/dashboard`
2. Click "Add Product" button
3. Fill in product details
4. Upload product images (URL-based)
5. Set pricing and inventory
6. Click "Create Product"

### Payment Gateway
The app supports both SSL Commerz (online) and Cash on Delivery. The payment initialization is handled in `/api/payment/initiate`.

## Default Admin Credentials

For testing, you can create an admin user with:
- Email: admin@elitestore.com
- Password: admin123

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Connect to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy automatically on push

```bash
# Using Vercel CLI
vercel deploy
```

### Environment Variables for Production

Ensure these are set in your production environment:
- `MONGODB_URI` - Production MongoDB connection
- `JWT_SECRET` - Strong secret key
- `SSL_COMMERZ_STORE_ID` - Production SSL Commerz ID
- `SSL_COMMERZ_STORE_PASSWORD` - Production password
- `NEXT_PUBLIC_API_URL` - Your production domain

## Performance Optimization

- Image optimization with Next.js Image component
- Code splitting and lazy loading
- Database indexing on frequently queried fields
- Caching strategies for product catalog
- Minified CSS and JavaScript

## Future Enhancements

- Email notifications for orders
- Product recommendations
- User reviews and ratings system
- Wishlist functionality
- Coupon and discount codes
- Advanced analytics dashboard
- Multi-currency support
- Subscription products

## Support & Troubleshooting

### Common Issues

**MongoDB Connection Error**
- Check your MongoDB Atlas connection string
- Ensure IP whitelist includes your machine
- Verify credentials in `.env.local`

**Payment Gateway Issues**
- Confirm SSL Commerz credentials
- Use sandbox environment for testing
- Check callback URL configuration

**Image Loading Issues**
- Ensure image URLs are accessible
- Check CORS settings if using external URLs
- Use data URIs for small images

## License

This project is licensed under the MIT License.

## Support

For support, please contact support@elitestore.com or visit our documentation.

---

Built with passion for e-commerce excellence. Happy selling!
