# Get Products Showing in 30 Seconds

## The Problem
Your MongoDB is connected ✅ but **empty** ❌. No products = nothing to display.

## The Solution
Visit this single URL in your browser:

### **http://localhost:3000/api/debug/seed**

That's it! This will:
- Create 6 sample products in your database
- Products will be electronics with real Unsplash images
- All products will be featured on your homepage

## After Seeding

1. **Refresh your homepage**: http://localhost:3000
2. **You'll see 6 beautiful product cards** with:
   - Product image
   - Product name
   - Price with discount
   - Star rating
   - "Add to Cart" button

## Your Own Products

After testing with samples, add your products two ways:

### Way 1: Admin Panel (GUI)
http://localhost:3000/admin/products/new

Fill out form → Click "Create Product" → Done!

### Way 2: Programmatically
POST to `/api/products` with JSON data:

```bash
curl -X POST http://localhost:3000/api/products \
  -H "Content-Type: application/json" \
  -d '{
    "name": "My Product",
    "description": "Product description",
    "price": 99.99,
    "image": "https://example.com/image.jpg",
    "category": "Electronics",
    "stock": 50,
    "sku": "UNIQUE-001"
  }'
```

## Check It's Working

**See all products (API)**: http://localhost:3000/api/products

**See database status**: http://localhost:3000/api/debug/db-status

**See sample products**: http://localhost:3000/api/debug/seed (run once, won't duplicate)

## What Products Are Included in Sample Data

1. **Premium Wireless Headphones** - $299.99
2. **Smartphone Pro Max** - $1,099.99
3. **Smartwatch Elite** - $399.99
4. **4K Webcam Pro** - $199.99
5. **Wireless Mouse** - $49.99
6. **Mechanical Keyboard** - $179.99

All have images, ratings, discounts, and are ready to test your store!

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Seed endpoint returns error | Check .env.local has MONGODB_URI |
| Products still not showing | Try refreshing (Ctrl+F5) |
| Images not loading | Use valid image URLs or upload your own |
| Database says "0 products" | Visit the seed endpoint to add samples |

## Next: Test Your Store

After products appear:
1. Click "Add to Cart"
2. Go to Cart page
3. Proceed to checkout
4. Fill in payment info
5. Test SSL Commerz payment gateway

You're ready to go! 🚀
