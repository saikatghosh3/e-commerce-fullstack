'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, Crown, Shield } from 'lucide-react';

export default function ParallaxSection() {
  const parallaxRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (parallaxRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.5;
        parallaxRef.current.style.transform = `translateY(${rate}px)`;
      }
      if (textRef.current) {
        const scrolled = window.scrollY;
        const rate = scrolled * 0.3;
        textRef.current.style.transform = `translateY(${rate}px)`;
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section className="relative h-[600px] lg:h-[700px] overflow-hidden">
      {/* প্যারালাক্স ব্যাকগ্রাউন্ড ইমেজ */}
      <div
        ref={parallaxRef}
        className="absolute inset-0 bg-fixed bg-center bg-cover"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop")',
          backgroundAttachment: 'fixed',
          backgroundPosition: 'center',
          backgroundSize: 'cover',
        }}
      >
        {/* ওভারলে */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
      </div>

      {/* কন্টেন্ট */}
      <div className="relative h-full flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div
          ref={textRef}
          className="text-center max-w-4xl mx-auto transform transition-all duration-300"
        >
          {/* ব্যাজ */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 mb-6 border border-white/20">
            <Sparkles size={16} className="text-yellow-400" />
            <span className="text-sm font-medium text-white">প্রিমিয়াম কালেকশন ২০২৪</span>
          </div>

          {/* হেডিং */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            <span className="bg-gradient-to-r from-amber-400 to-orange-500 bg-clip-text text-transparent">
              এলিগেন্ট
            </span>
            <br />
            <span className="text-white">শপিং এক্সপিরিয়েন্স</span>
          </h1>

          {/* ডেসক্রিপশন */}
          <p className="text-base sm:text-lg text-gray-200 mb-8 max-w-2xl mx-auto">
            আবিষ্কার করুন প্রিমিয়াম কোয়ালিটির পণ্য, অসাধারণ ডিজাইন এবং সেরা দামে। 
            আপনার স্বপ্নের পণ্য এখন আপনার doorstep এ।
          </p>

          {/* বাটন */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-3 rounded-full font-semibold hover:from-amber-600 hover:to-orange-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
            >
              এখনই কেনাকাটা করুন
              <ArrowRight size={18} />
            </Link>
            <Link
              href="/collections"
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-3 rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
            >
              কালেকশন দেখুন
            </Link>
          </div>

          {/* ফিচার */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-12 pt-8 border-t border-white/10">
            <div className="flex items-center justify-center gap-2 text-white/80">
              <Crown size={18} className="text-amber-400" />
              <span className="text-sm">প্রিমিয়াম কোয়ালিটি</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/80">
              <Shield size={18} className="text-amber-400" />
              <span className="text-sm">১০০% অথেনটিক</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-white/80">
              <Sparkles size={18} className="text-amber-400" />
              <span className="text-sm">ফ্রি ডেলিভারি*</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}