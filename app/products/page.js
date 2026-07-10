import { getProducts, getCategories } from '@/lib/queries';
import ProductsClient from '@/components/ProductsClient';

export default async function ProductsPage({ searchParams }) {
  const params = await searchParams;
  const category = params?.category || undefined;
  const search = params?.search || undefined;
  const minPrice = params?.minPrice || undefined;
  const maxPrice = params?.maxPrice || undefined;
  const page = Number(params?.page) || 1;

  const [productsData, categories] = await Promise.all([
    getProducts({ category, search, minPrice, maxPrice, page, limit: 12 }),
    getCategories(),
  ]);

  return (
    <ProductsClient
      initialProducts={productsData.products}
      initialPagination={productsData.pagination}
      serverCategories={categories}
    />
  );
}
