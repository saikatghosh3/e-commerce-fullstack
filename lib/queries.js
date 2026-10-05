import { unstable_cache } from 'next/cache';
import connectDB from '@/lib/db';
import Product from '@/models/Product';
import SiteSetting from '@/models/SiteSetting';
import Category from '@/models/Category';
import Advertisement from '@/models/Advertisement';

export const CACHE_TAGS = {
  settings: 'site-settings',
  categories: 'categories',
  products: 'products',
  advertisements: 'advertisements',
};

// Every mutation route must call the matching revalidateTag so admin edits show
// up immediately instead of waiting out the revalidation window.

export async function getSiteSettings() {
  return unstable_cache(
    async () => {
      await connectDB();
      let settings = await SiteSetting.findOne().lean();
      if (!settings) {
        settings = (await SiteSetting.create({})).toObject();
      }
      return JSON.parse(JSON.stringify(settings));
    },
    ['site-settings'],
    { tags: [CACHE_TAGS.settings], revalidate: 3600 }
  )();
}

export async function getCategories() {
  return unstable_cache(
    async () => {
      await connectDB();

      // One-off bootstrap: only ever runs on a cache miss, not on every request
      const existingCount = await Category.countDocuments();
      if (existingCount === 0) {
        const productCategories = await Product.distinct('category', {
          category: { $nin: [null, ''] },
        });
        if (productCategories.length > 0) {
          await Category.insertMany(
            productCategories.map((name) => ({ name })),
            { ordered: false }
          ).catch(() => {});
        }
      }

      const categories = await Category.find({}).sort({ name: 1 }).lean();
      return JSON.parse(JSON.stringify(categories));
    },
    ['categories'],
    { tags: [CACHE_TAGS.categories], revalidate: 3600 }
  )();
}

export async function getFeaturedProducts(limit = 200) {
  return unstable_cache(
    async () => {
      await connectDB();
      const products = await Product.find({ featured: true })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();
      return JSON.parse(JSON.stringify(products.filter((p) => p && p.price !== undefined)));
    },
    ['featured-products', String(limit)],
    { tags: [CACHE_TAGS.products], revalidate: 300 }
  )();
}

export async function getBestSellingProducts(limit = 8) {
  return unstable_cache(
    async () => {
      await connectDB();
      const products = await Product.find({ bestSelling: true })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();
      return JSON.parse(JSON.stringify(products.filter((p) => p && p.price !== undefined)));
    },
    ['best-selling-products', String(limit)],
    { tags: [CACHE_TAGS.products], revalidate: 300 }
  )();
}

export async function getActiveAdvertisements() {
  return unstable_cache(
    async () => {
      await connectDB();
      const advertisements = await Advertisement.find({ active: true })
        .sort({ position: 1, displayOrder: 1, createdAt: -1 })
        .lean();
      return JSON.parse(JSON.stringify(advertisements));
    },
    ['active-advertisements'],
    { tags: [CACHE_TAGS.advertisements], revalidate: 300 }
  )();
}

export async function getProducts({
  category,
  search,
  minPrice,
  maxPrice,
  featured,
  bestSelling,
  page = 1,
  limit = 12,
} = {}) {
  const key = JSON.stringify([category, search, minPrice, maxPrice, featured, bestSelling, page, limit]);

  return unstable_cache(
    async () => {
      await connectDB();

      const query = {};
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
    },
    ['products-list', key],
    { tags: [CACHE_TAGS.products, CACHE_TAGS.categories], revalidate: 300 }
  )();
}

export async function getProductById(id) {
  return unstable_cache(
    async () => {
      await connectDB();
      const product = await Product.findById(id).lean();
      if (!product) return null;
      return JSON.parse(JSON.stringify(product));
    },
    ['product-by-id', String(id)],
    { tags: [CACHE_TAGS.products], revalidate: 300 }
  )();
}

export async function getProductsByIds(ids) {
  const key = Array.isArray(ids) ? ids.join(',') : String(ids);

  return unstable_cache(
    async () => {
      await connectDB();
      const products = await Product.find({ _id: { $in: ids } }).lean();
      return JSON.parse(JSON.stringify(products));
    },
    ['products-by-ids', key],
    { tags: [CACHE_TAGS.products], revalidate: 300 }
  )();
}

export async function getRelatedProducts(category, excludeId, limit = 4) {
  return unstable_cache(
    async () => {
      await connectDB();
      const products = await Product.find({ category })
        .sort({ createdAt: -1 })
        .limit(limit)
        .lean();
      return JSON.parse(
        JSON.stringify(products.filter((p) => p._id.toString() !== excludeId.toString()))
      );
    },
    ['related-products', String(category), String(excludeId), String(limit)],
    { tags: [CACHE_TAGS.products], revalidate: 300 }
  )();
}
