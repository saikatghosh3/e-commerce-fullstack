import { getProductById, getRelatedProducts } from '@/lib/queries';
import ProductDetailClient from '@/components/ProductDetailClient';

export default async function ProductDetailPage({ params }) {
  const { id } = await params;

  const product = await getProductById(id);

  let relatedProducts = [];
  if (product) {
    relatedProducts = await getRelatedProducts(product.category, id, 4);
  }

  return <ProductDetailClient product={product} relatedProducts={relatedProducts} />;
}
