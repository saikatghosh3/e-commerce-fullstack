import HeroSection from '@/components/home/HeroSection';
import TrustSection from '@/components/home/TrustSection';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import BestSellingProductsSection from '@/components/home/BestSellingProductsSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import AdvertisementSlot from '@/components/home/AdvertisementSlot';
import { getFeaturedProducts, getBestSellingProducts, getActiveAdvertisements } from '@/lib/queries';

export default async function Home() {
  const [featuredProducts, bestSellingProducts, advertisements] = await Promise.all([
    getFeaturedProducts(200),
    getBestSellingProducts(8),
    getActiveAdvertisements(),
  ]);

  return (
    <main>
      <HeroSection />
      <AdvertisementSlot advertisements={advertisements} position="after-hero" />
      <TrustSection />
      <BestSellingProductsSection products={bestSellingProducts} loading={false} />
      <AdvertisementSlot advertisements={advertisements} position="after-trust" />
      <FeaturedProductsSection featuredProducts={featuredProducts} loading={false} />
      <AdvertisementSlot advertisements={advertisements} position="after-products" />
      <NewsletterSection />
    </main>
  );
}
