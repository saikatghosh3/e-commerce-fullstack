
// static hero section  
// import Link from 'next/link';
// import { ArrowRight, ShoppingBag, Info } from 'lucide-react';

// export default function HeroSection() {
//   return (
//     <section className="relative bg-gradient-to-br from-slate-900 via-orange-950 to-slate-900 py-20 sm:py-32 overflow-hidden">
//       <div className="absolute inset-0">
//         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-orange-500/20 rounded-full blur-[100px] animate-pulse"></div>
//         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500/20 rounded-full blur-[100px] animate-pulse animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-[80px] animate-spin-slow"></div>
//         <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-400/10 rounded-full blur-[60px] animate-float"></div>
//         <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-rose-400/10 rounded-full blur-[60px] animate-float animation-delay-4000"></div>
//       </div>

//       <div className="absolute inset-0 opacity-30"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//         }}
//       ></div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          
//           <div className="text-white">
//             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-8 animate-slide-down">
//               <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
//               <span className="text-sm text-emerald-300 font-medium">নতুন কালেকশন এসেছে</span>
//             </div>
            
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-slide-up">
//               <span className="bg-gradient-to-r from-white via-orange-200 to-white bg-clip-text text-transparent">
//                 আবিষ্কার করুন
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-amber-400 bg-clip-text text-transparent animate-gradient bg-300%">
//                 প্রিমিয়াম মানের পণ্য
//               </span>
//             </h1>
            
//             <p className="text-lg sm:text-xl text-slate-300 mb-8 leading-relaxed animate-slide-up animation-delay-200">
//               সাবধানে নির্বাচিত আইটেমের সেরা কালেকশন থেকে কেনাকাটা করুন। 
//               গুণমান, স্টাইল এবং বিলাসিতা — সবই এক জায়গায়।
//             </p>

//             <div className="flex flex-col sm:flex-row gap-4 animate-slide-up animation-delay-400">
//               <Link
//                 href="/products"
//                 className="group relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-orange-600 to-amber-600 px-5 py-2.5 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] hover:-translate-y-1"
//               >
//                 <span className="absolute inset-0 bg-gradient-to-r from-orange-600 to-amber-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//                 <span className="relative flex items-center">
//                   <ShoppingBag className="mr-2 group-hover:scale-110 transition-transform duration-300" size={20} />
//                   এখনই কেনাকাটা করুন
//                   <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
//                 </span>
//               </Link>
              
//               <button className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-white/30 px-5 py-2.5 rounded-full font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-1">
//                 <span className="relative flex items-center">
//                   <Info className="mr-2 group-hover:rotate-12 transition-transform duration-300" size={20} />
//                   আরও জানুন
//                 </span>
//               </button>
//             </div>
//           </div>

//           <div className="relative h-96 hidden lg:block">
//             <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-amber-400 to-orange-500 rounded-[2rem] rotate-12 shadow-2xl shadow-amber-500/30 animate-float">
//               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-[2rem]"></div>
//             </div>
            
//             <div className="absolute top-8 -left-4 w-48 h-48 bg-gradient-to-tr from-orange-400 to-amber-400 rounded-full shadow-2xl shadow-orange-500/30 animate-float animation-delay-2000">
//               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
//             </div>
            
//             <div className="absolute bottom-0 right-20 w-40 h-40 bg-gradient-to-br from-amber-400 to-pink-400 rounded-3xl -rotate-12 shadow-2xl shadow-amber-500/30 animate-float animation-delay-4000">
//               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-3xl"></div>
//             </div>
            
//             <div className="absolute bottom-10 left-10 w-32 h-32 bg-gradient-to-tr from-emerald-400 to-teal-400 rounded-full shadow-2xl shadow-emerald-500/20 animate-pulse"></div>
            
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white/30 rounded-full blur-2xl animate-ping"></div>
            
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-40 h-40 border-2 border-white/10 rounded-full animate-spin-slow"></div>
//             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-56 h-56 border border-white/5 rounded-full animate-spin-slow animation-delay-3000"></div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// static hero section end 


// hero slider start 
'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ShoppingBag, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: '/images/softdrinks.jpg',
    title: 'প্রিমিয়াম কালেকশন',
    subtitle: 'আবিষ্কার করুন সেরা মানের পণ্য',
    description: 'সাবধানে নির্বাচিত আইটেমের এক্সক্লুসিভ কালেকশন থেকে কেনাকাটা করুন',
    cta: 'এখনই কিনুন',
    link: '/products',
    bgGradient: 'from-amber-50 via-orange-50 to-white',
    accentColor: 'from-orange-500 to-amber-500',
    textColor: 'text-slate-900',
  },
  {
    id: 2,
    image: '/images/Badam milk.jpg',
    title: 'বিশেষ ছাড়',
    subtitle: '৫০% পর্যন্ত ছাড়ে পণ্য কিনুন',
    description: 'সীমিত সময়ের অফার, আজই অর্ডার করুন',
    cta: 'অফার দেখুন',
    link: '/products',
    bgGradient: 'from-orange-50 via-amber-50 to-white',
    accentColor: 'from-orange-500 to-amber-500',
    textColor: 'text-slate-900',
  },
  {
    id: 3,
    image: '/images/vegetables.jpg',
    title: 'নতুন অ্যারাইভাল',
    subtitle: 'লেটেস্ট ট্রেন্ড এখন আপনার হাতে',
    description: 'ফ্যাশনেবল ও স্টাইলিশ পণ্যের বিশাল সংগ্রহ',
    cta: 'এক্সপ্লোর করুন',
    link: '/products',
    bgGradient: 'from-amber-50 via-orange-50 to-white',
    accentColor: 'from-orange-500 to-amber-500',
    textColor: 'text-slate-900',
  },
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);

  const minSwipeDistance = 50;

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      nextSlide();
      setIsAutoPlaying(false);
    }
    if (isRightSwipe) {
      prevSlide();
      setIsAutoPlaying(false);
    }
  };

  useEffect(() => {
    if (!isAutoPlaying) return;
    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [isAutoPlaying, nextSlide]);

  const slide = slides[currentSlide];

  return (
    <section
      className="w-full bg-[#fbf9f5] px-4 py-4 sm:px-6 sm:py-5 lg:px-8"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="mx-auto grid max-w-[1500px] grid-cols-1 gap-4 lg:grid-cols-[2fr_1fr]">
        <div className="relative grid min-h-[340px] overflow-hidden rounded-lg bg-white shadow-sm sm:min-h-[380px] lg:min-h-[394px] lg:grid-cols-[1fr_0.9fr]">
          <div className={`relative z-10 flex flex-col justify-center bg-gradient-to-br ${slide.bgGradient} px-6 py-8 sm:px-10 lg:px-12`}>
            <div
              className={`mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-orange-200 bg-white/80 px-3 py-1.5 text-xs font-semibold text-orange-700 shadow-sm transition-all duration-700 sm:text-sm ${
                currentSlide === slides.findIndex((item) => item.id === slide.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <Sparkles size={15} className="text-orange-500" />
              {slide.subtitle}
            </div>

            <h1
              className={`mb-3 text-3xl font-bold leading-snug text-slate-900 transition-all duration-700 sm:text-4xl lg:text-[2.75rem] ${
                currentSlide === slides.findIndex((item) => item.id === slide.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {slide.title}
            </h1>

            <p
              className={`mb-6 max-w-md text-sm leading-relaxed text-slate-600 transition-all duration-700 sm:text-base ${
                currentSlide === slides.findIndex((item) => item.id === slide.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {slide.description}
            </p>

            <div
              className={`transition-all duration-700 ${
                currentSlide === slides.findIndex((item) => item.id === slide.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <Link
                href={slide.link}
                className={`group inline-flex items-center gap-2 rounded-md bg-gradient-to-r ${slide.accentColor} px-5 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg sm:text-base`}
              >
                <ShoppingBag size={19} className="transition-transform group-hover:scale-110" />
                {slide.cta}
                <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="mt-7 flex items-center gap-2.5" aria-label="Hero slides">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    index === currentSlide ? 'w-7 bg-orange-500' : 'w-2 bg-orange-200 hover:bg-orange-400'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                  aria-current={index === currentSlide ? 'true' : undefined}
                />
              ))}
            </div>
          </div>

          <div className="relative min-h-[180px] overflow-hidden sm:min-h-[220px] lg:min-h-full">
            <div
              className={`absolute inset-0 transition-all duration-700 ${
                currentSlide === slides.findIndex((item) => item.id === slide.id)
                  ? 'translate-x-0 opacity-100'
                  : 'translate-x-8 opacity-0'
              }`}
            >
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={currentSlide === 0}
                sizes="(max-width: 1024px) 100vw, 40vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-orange-50/30 to-transparent lg:from-orange-50/60" />
          </div>

          <button
            onClick={prevSlide}
            className="absolute left-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-sm bg-white/80 text-orange-600 shadow-sm transition hover:bg-white sm:left-4 sm:h-10 sm:w-10"
            aria-label="Previous slide"
          >
            <ChevronLeft size={21} />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-3 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-sm bg-white/80 text-orange-600 shadow-sm transition hover:bg-white sm:right-4 sm:h-10 sm:w-10"
            aria-label="Next slide"
          >
            <ChevronRight size={21} />
          </button>
        </div>

        <Link
          href="/products"
          className="group relative hidden min-h-[394px] overflow-hidden rounded-lg bg-orange-100 shadow-sm lg:block"
        >
          <Image
            src="/images/Badam milk.jpg"
            alt="বাদাম দুধসহ আমাদের জনপ্রিয় পণ্য"
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 1500px) 33vw, 500px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/65 via-slate-950/10 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-6 text-white">
            <p className="text-sm font-medium text-orange-100">প্রতিদিনের পছন্দের পণ্য</p>
            <p className="mt-1 text-2xl font-bold">বাজার এখন হাতের কাছেই</p>
            <span className="mt-4 inline-flex items-center gap-2 rounded-md bg-orange-500 px-4 py-2 text-sm font-semibold transition-colors group-hover:bg-orange-600">
              সব পণ্য দেখুন <ArrowRight size={16} />
            </span>
          </div>
        </Link>
      </div>
    </section>
  );
}
// hero slider end 