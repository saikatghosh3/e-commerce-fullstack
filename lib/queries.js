import connectDB from '@/lib/db';
import Product from '@/models/Product';
import SiteSetting from '@/models/SiteSetting';
import Category from '@/models/Category';
import Advertisement from '@/models/Advertisement';

export async function getSiteSettings() {
  await connectDB();
  let settings = await SiteSetting.findOne().lean();
  if (!settings) {
    settings = await SiteSetting.create({});
    settings = settings.toObject();
  }
  return JSON.parse(JSON.stringify(settings));
}

export async function getCategories() {
  await connectDB();
  const existingCount = await Category.countDocuments();
  if (existingCount === 0) {
    const productCategories = await Product.distinct('category', {
      category: { $nin: [null, ''] },
    });
    if (productCategories.length > 0) {
      await Category.insertMany(
        productCategories.map((name) => ({ name })),
        { ordered: false }
      );
    }
  }
  const categories = await Category.find({}).sort({ name: 1 }).lean();
  return JSON.parse(JSON.stringify(categories));
}

export async function getFeaturedProducts(limit = 200) {
  await connectDB();
  const products = await Product.find({ featured: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return JSON.parse(JSON.stringify(products.filter(p => p && p.price !== undefined)));
}

export async function getBestSellingProducts(limit = 8) {
  await connectDB();
  const products = await Product.find({ bestSelling: true })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return JSON.parse(JSON.stringify(products.filter(p => p && p.price !== undefined)));
}

export async function getActiveAdvertisements() {
  await connectDB();
  const advertisements = await Advertisement.find({ active: true })
    .sort({ position: 1, displayOrder: 1, createdAt: -1 })
    .lean();
  return JSON.parse(JSON.stringify(advertisements));
}

export async function getProducts({ category, search, minPrice, maxPrice, featured, bestSelling, page = 1, limit = 12 } = {}) {
  await connectDB();
  let query = {};
  if (category && category !== 'all') query.category = category;
  if (search) query.name = { $regex: search, $options: 'i' };
  if (featured === 'true') query.featured = true;
  if (bestSelling === 'true') query.bestSelling = true;
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }
  const skip = (page - 1) * limit;
  const [products, total] = await Promise.all([
    Product.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Product.countDocuments(query),
  ]);
  return {
    products: JSON.parse(JSON.stringify(products)),
    pagination: {
      total,
      pages: Math.ceil(total / limit),
      currentPage: page,
    },
  };
}

export async function getProductById(id) {
  await connectDB();
  const product = await Product.findById(id).lean();
  if (!product) return null;
  return JSON.parse(JSON.stringify(product));
}

export async function getProductsByIds(ids) {
  await connectDB();
  const products = await Product.find({ _id: { $in: ids } }).lean();
  return JSON.parse(JSON.stringify(products));
}

export async function getRelatedProducts(category, excludeId, limit = 4) {
  await connectDB();
  const products = await Product.find({ category })
    .sort({ createdAt: -1 })
    .limit(limit)
    .lean();
  return JSON.parse(JSON.stringify(products.filter(p => p._id.toString() !== excludeId.toString())));
}
