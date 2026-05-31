'use client';

import React, { useState, useEffect } from 'react';
import HeroSection from '@/components/home/HeroSection';
import TrustSection from '@/components/home/TrustSection';
import FeaturedProductsSection from '@/components/home/FeaturedProductsSection';
import BestSellingProductsSection from '@/components/home/BestSellingProductsSection';
import NewsletterSection from '@/components/home/NewsletterSection';
import AdvertisementSlot from '@/components/home/AdvertisementSlot';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [bestSellingLoading, setBestSellingLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
    fetchBestSellingProducts();
    fetchAdvertisements();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products?featured=true&limit=200');
      const data = await response.json();

      if (response.ok && data.success) {
        // সেফটি চেক: শুধু সেই প্রোডাক্টগুলো নিবে যেগুলোর প্রাইস আছে
        const validProducts = (data.products || []).filter(p => p && p.price !== undefined);
        setFeaturedProducts(validProducts);
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAdvertisements = async () => {
    try {
      const response = await fetch('/api/advertisements?active=true');
      const data = await response.json();

      if (response.ok && data.success) {
        setAdvertisements(data.advertisements || []);
      }
    } catch (error) {
      console.error('Error fetching advertisements:', error);
    }
  };

  const fetchBestSellingProducts = async () => {
    try {
      const response = await fetch('/api/products?bestSelling=true&limit=8');
      const data = await response.json();

      if (response.ok && data.success) {
        const validProducts = (data.products || []).filter(p => p && p.price !== undefined);
        setBestSellingProducts(validProducts);
      }
    } catch (error) {
      console.error('Error fetching best selling products:', error);
    } finally {
      setBestSellingLoading(false);
    }
  };

  return (
    <main>
      <HeroSection />
      <AdvertisementSlot advertisements={advertisements} position="after-hero" />
      <TrustSection />
      <BestSellingProductsSection products={bestSellingProducts} loading={bestSellingLoading} />
      <AdvertisementSlot advertisements={advertisements} position="after-trust" />
      <FeaturedProductsSection featuredProducts={featuredProducts} loading={loading} />
      <AdvertisementSlot advertisements={advertisements} position="after-products" />
      <NewsletterSection />
    </main>
  );
}
