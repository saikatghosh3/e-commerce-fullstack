# No Products Showing? - Debug Guide

## The Issue
Your database connection is working, but your **MongoDB database is empty** - there are no products in the database yet.

## How to Fix This

### Option 1: Quick Test with Sample Data (Recommended)
1. Visit: **http://localhost:3000/api/debug/seed**
2. This will add 6 sample products to your database
3. Refresh your homepage - products should now appear!

### Option 2: Add Products via Admin Panel
1. Go to: **http://localhost:3000/admin/products/new**
2. Fill in the product form:
   - Name
   - Description
   - Price
   - Image URL
   - Category
   - Stock
   - SKU (unique identifier)
3. Click "Create Product"
4. Go back to homepage - new product will appear

### Option 3: Check Database Status
To verify your MongoDB connection is working:
1. Visit: **http://localhost:3000/api/debug/db-status**
2. You should see a response with:
   - Connection status
   - Product count (should be 0 initially)
   - Environment variable status

## What's Happening in the Code

### Landing Page Flow
```
page.js (useEffect)
  → fetch('/api/products')
    → API calls connectDB()
      → Connects to MongoDB Atlas
        → Queries Product collection
          → Returns products array
            → setFeaturedProducts(data)
              → Renders ProductCard components
```

### Why No Products Show
- Your `.env.local` has the correct MONGODB_URI ✅
- Your backend code is correct ✅
- Your frontend code is correct ✅
- **BUT: Your product collection is empty** ❌

## Debug Endpoints

| Endpoint | Purpose | What it does |
|----------|---------|--------------|
| `/api/debug/db-status` | Check connection | Tests MongoDB connection and shows product count |
| `/api/debug/seed` | Add test data | Creates 6 sample products for testing |
| `/api/products` | Get products | Fetches products (add ?limit=6 for pagination) |

## Product Data Structure

When you add products, they need these fields:

```javascript
{
  name: "Product Name",              // Required
  description: "Description",        // Required
  price: 99.99,                      // Required (number)
  discount: 10,                      // Optional (percentage)
  image: "https://image-url.jpg",    // Required (URL)
  images: ["url1", "url2"],          // Optional (array of URLs)
  category: "Electronics",           // Required
  stock: 50,                         // Required (number)
  rating: 4.5,                       // Optional (0-5)
  sku: "UNIQUE-ID",                  // Required (must be unique)
  tags: ["tag1", "tag2"],            // Optional (array)
  featured: true,                    // Optional (boolean)
}
```

## Testing the API Manually

### Test Product Fetch
```bash
curl http://localhost:3000/api/products?limit=6
```

### Test Database Connection
```bash
curl http://localhost:3000/api/debug/db-status
```

### Add Sample Products
```bash
curl http://localhost:3000/api/debug/seed
```

## Still Not Working?

1. **Check .env.local**
   - Make sure MONGODB_URI is set correctly
   - No typos in connection string

2. **Check Browser Console**
   - Open DevTools (F12)
   - Look for any fetch errors
   - Check the Network tab for API responses

3. **Check Server Console**
   - Look for [v0] debug logs
   - Check for MongoDB connection errors

4. **Verify MongoDB Atlas**
   - Make sure your IP is whitelisted
   - Check your connection string is correct
   - Verify database user credentials

## Image URLs in Seed Data

The sample products use Unsplash images (free, no auth needed):
- They load from external URLs
- They're used for testing only
- Replace with your own images for production

## Next Steps

1. ✅ Seed database with sample products
2. ✅ Verify products appear on homepage
3. ✅ Test add to cart functionality
4. ✅ Test checkout process
5. Add your SSL Commerz credentials for payments
6. Start adding your real products
