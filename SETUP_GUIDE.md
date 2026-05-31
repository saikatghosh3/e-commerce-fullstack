# Quick Setup Guide - Elite Store

## Step 1: Environment Variables

Before running the application, you need to set up your environment variables.

### Create `.env.local` file in the root directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/elite-store?retryWrites=true&w=majority

# JWT Secret (use any random string)
JWT_SECRET=your-super-secret-jwt-key-change-this

# SSL Commerz Payment Gateway
SSL_COMMERZ_STORE_ID=your_store_id_here
SSL_COMMERZ_STORE_PASSWORD=your_store_password_here

# API URL
NEXT_PUBLIC_API_URL=http://localhost:3000
```

## Step 2: MongoDB Setup (MongoDB Atlas)

1. Go to [mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account
3. Create a new cluster (shared tier is free)
4. In "Database" section, click "Browse Collections"
5. Click "Create Database" and name it "elite-store"
6. Go to "Database Access" and create a database user
7. Go to "Network Access" and add IP 0.0.0.0/0 (or your IP) to whitelist
8. Click "Connect" and copy your connection string
9. Replace the username and password in the connection string
10. Add it to `.env.local` as `MONGODB_URI`

## Step 3: SSL Commerz Setup (Optional for testing)

For testing payments:

1. Go to [sslcommerz.com](https://www.sslcommerz.com)
2. Sign up for an account
3. Request a test merchant account
4. Get your Store ID and Store Password
5. Add them to `.env.local`

For now, you can use Cash on Delivery (COD) as the payment method, which doesn't require SSL Commerz setup.

## Step 4: Install Dependencies

```bash
pnpm install
```

## Step 5: Run the Application

```bash
pnpm dev
```

The application will start at `http://localhost:3000`

## Step 6: Create Initial Product Data (Optional)

To add sample products:

1. Go to `http://localhost:3000/auth/register` and create a user account
2. Go to `http://localhost:3000/auth/login` and login
3. Go to `http://localhost:3000/admin/dashboard` (for admin access, manually set role in MongoDB)
4. Add products using the "Add Product" button

Or manually add an admin user in MongoDB:

```javascript
db.users.insertOne({
  name: "Admin User",
  email: "admin@elitestore.com",
  password: "admin123", // This will be hashed
  role: "admin"
})
```

## Project Structure

```
elite-store/
├── app/                          # Next.js app directory
│   ├── api/                     # API routes
│   ├── admin/                   # Admin panel routes
│   ├── auth/                    # Auth routes (login/register)
│   ├── products/                # Product routes
│   ├── cart/                    # Cart page
│   ├── checkout/                # Checkout page
│   └── page.js                  # Home page
├── components/                   # React components
│   ├── Header.jsx               # Navigation header
│   ├── Footer.jsx               # Footer
│   ├── ProductCard.jsx          # Product card component
│   └── AdminLayout.jsx          # Admin sidebar layout
├── models/                       # MongoDB schemas
│   ├── Product.js               # Product model
│   ├── User.js                  # User model
│   └── Order.js                 # Order model
├── lib/
│   └── db.js                    # MongoDB connection
├── public/                       # Static files
└── .env.local                   # Environment variables (CREATE THIS)
```

## Available Routes

### Customer Routes
- `/` - Home page
- `/products` - All products
- `/products/[id]` - Product details
- `/cart` - Shopping cart
- `/checkout` - Checkout process
- `/auth/login` - Login
- `/auth/register` - Register
- `/order-success` - Order confirmation

### Admin Routes
- `/admin/dashboard` - Product management
- `/admin/products/new` - Add new product
- `/admin/products/[id]/edit` - Edit product

## How to Add Products via Admin Panel

1. Login to your account
2. Navigate to `/admin/dashboard`
3. Click "Add Product"
4. Fill in the form:
   - **Product Name**: Name of the product
   - **Description**: Product description
   - **Category**: Select from dropdown (Electronics, Fashion, etc.)
   - **SKU**: Unique product identifier
   - **Price**: Product price
   - **Discount**: Optional discount percentage
   - **Stock**: Number of items available
   - **Primary Image URL**: Link to product image
   - **Tags**: Add tags separated by commas
   - **Featured**: Check if you want it on homepage
5. Click "Create Product"

## Testing Checklist

- [ ] Landing page loads with featured products
- [ ] Product listing page works with filtering
- [ ] Product details page displays correctly
- [ ] Can add products to cart
- [ ] Cart page shows correct totals
- [ ] Can proceed to checkout
- [ ] Checkout form validates input
- [ ] Can select payment method
- [ ] Admin panel loads
- [ ] Can create new products from admin
- [ ] Products appear on frontend after creation

## Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
- Check your MongoDB Atlas connection string
- Ensure your IP is whitelisted in Network Access
- Verify username and password are correct

### Port 3000 Already in Use
```bash
# Kill the process using port 3000
lsof -ti:3000 | xargs kill -9

# Or use a different port
pnpm dev -p 3001
```

### Image Not Loading
- Ensure the image URL is publicly accessible
- Check CORS settings if using external URLs
- Use imgur, cloudinary, or similar for testing

### Payment Gateway Not Working
- Verify SSL Commerz credentials are correct
- Check if using sandbox vs production environment
- Ensure NEXT_PUBLIC_API_URL is correct

## Next Steps

1. Add your products
2. Test the shopping flow
3. Configure SSL Commerz for real payments
4. Deploy to Vercel
5. Set up domain and SSL certificate
6. Configure email notifications (future enhancement)

## Support

For issues or questions:
- Check the README.md for more detailed documentation
- Review API endpoints documentation
- Contact: support@elitestore.com

Happy selling!
