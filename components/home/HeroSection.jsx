
// static hero section  
// import Link from 'next/link';
// import { ArrowRight, ShoppingBag, Info } from 'lucide-react';

// export default function HeroSection() {
//   return (
//     <section className="relative bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 py-20 sm:py-32 overflow-hidden">
//       <div className="absolute inset-0">
//         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/20 rounded-full blur-[100px] animate-pulse"></div>
//         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-500/20 rounded-full blur-[100px] animate-pulse animation-delay-2000"></div>
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[80px] animate-spin-slow"></div>
//         <div className="absolute top-1/4 right-1/4 w-72 h-72 bg-amber-400/10 rounded-full blur-[60px] animate-float"></div>
//         <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-rose-400/10 rounded-full blur-[60px] animate-float animation-delay-4000"></div>
//       </div>

//       <div className="absolute inset-0 opacity-30"
//         style={{
//           backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.03'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
//         }}
//       ></div>

//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
//           <div className="text-white">
//             <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-8 animate-slide-down">
//               <span className="w-2 h-2 bg-emerald-400 rounded-full animate-ping"></span>
//               <span className="text-sm text-emerald-300 font-medium">নতুন কালেকশন এসেছে</span>
//             </div>
            
//             <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6 animate-slide-up">
//               <span className="bg-gradient-to-r from-white via-blue-200 to-white bg-clip-text text-transparent">
//                 আবিষ্কার করুন
//               </span>
//               <br />
//               <span className="bg-gradient-to-r from-amber-400 via-rose-400 to-purple-400 bg-clip-text text-transparent animate-gradient bg-300%">
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
//                 className="group relative inline-flex items-center justify-center overflow-hidden bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.5)] hover:-translate-y-1"
//               >
//                 <span className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
//                 <span className="relative flex items-center">
//                   <ShoppingBag className="mr-2 group-hover:scale-110 transition-transform duration-300" size={20} />
//                   এখনই কেনাকাটা করুন
//                   <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" size={18} />
//                 </span>
//               </Link>
              
//               <button className="group relative inline-flex items-center justify-center overflow-hidden border-2 border-white/30 px-8 py-3.5 rounded-full font-semibold text-white transition-all duration-300 hover:border-white hover:bg-white/10 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] hover:-translate-y-1">
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
            
//             <div className="absolute top-8 -left-4 w-48 h-48 bg-gradient-to-tr from-blue-400 to-cyan-400 rounded-full shadow-2xl shadow-blue-500/30 animate-float animation-delay-2000">
//               <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
//             </div>
            
//             <div className="absolute bottom-0 right-20 w-40 h-40 bg-gradient-to-br from-purple-400 to-pink-400 rounded-3xl -rotate-12 shadow-2xl shadow-purple-500/30 animate-float animation-delay-4000">
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
    bgGradient: 'from-indigo-50 via-purple-50 to-pink-50',
    accentColor: 'from-indigo-600 to-purple-600',
    textColor: 'text-indigo-950',
  },
  {
    id: 2,
    image: '/images/Badam milk.jpg',
    title: 'বিশেষ ছাড়',
    subtitle: '৫০% পর্যন্ত ছাড়ে পণ্য কিনুন',
    description: 'সীমিত সময়ের অফার, আজই অর্ডার করুন',
    cta: 'অফার দেখুন',
    link: '/products',
    bgGradient: 'from-emerald-50 via-teal-50 to-cyan-50',
    accentColor: 'from-emerald-600 to-teal-600',
    textColor: 'text-emerald-950',
  },
  {
    id: 3,
    image: '/images/vegetables.jpg',
    title: 'নতুন অ্যারাইভাল',
    subtitle: 'লেটেস্ট ট্রেন্ড এখন আপনার হাতে',
    description: 'ফ্যাশনেবল ও স্টাইলিশ পণ্যের বিশাল সংগ্রহ',
    cta: 'এক্সপ্লোর করুন',
    link: '/products',
    bgGradient: 'from-rose-50 via-pink-50 to-fuchsia-50',
    accentColor: 'from-rose-600 to-pink-600',
    textColor: 'text-rose-950',
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
      className="relative w-full h-screen max-h-[600px] min-h-[500px] overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Background Gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} transition-all duration-1000`}></div>

      {/* Decorative Elements */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-gradient-to-br from-purple-300/20 to-pink-300/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-96 h-96 bg-gradient-to-tr from-blue-300/20 to-cyan-300/20 rounded-full blur-3xl"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center h-full py-12">
          
          {/* Left Content */}
          <div className="space-y-8">
            {/* Subtitle Badge */}
            <div 
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r ${slide.accentColor} text-white text-sm font-semibold shadow-lg transform transition-all duration-700 ${
                currentSlide === slides.findIndex(s => s.id === slide.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              <Sparkles size={16} className="animate-pulse" />
              {slide.subtitle}
            </div>
            
            {/* Main Title */}
            <h1 
              className={`text-5xl sm:text-6xl lg:text-7xl font-bold ${slide.textColor} leading-tight transform transition-all duration-700 ${
                currentSlide === slides.findIndex(s => s.id === slide.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              {slide.title}
            </h1>
            
            {/* Description */}
            <p 
              className={`text-lg sm:text-xl ${slide.textColor}/80 leading-relaxed max-w-xl transform transition-all duration-700 ${
                currentSlide === slides.findIndex(s => s.id === slide.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '300ms' }}
            >
              {slide.description}
            </p>
            
            {/* CTA Button */}
            <div 
              className={`transform transition-all duration-700 ${
                currentSlide === slides.findIndex(s => s.id === slide.id)
                  ? 'translate-y-0 opacity-100'
                  : 'translate-y-4 opacity-0'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              <Link
                href={slide.link}
                className={`group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r ${slide.accentColor} text-white text-lg font-semibold rounded-full shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}
              >
                <ShoppingBag size={22} className="group-hover:scale-110 transition-transform" />
                {slide.cta}
                <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            {/* Slide Indicators */}
            <div className="flex items-center gap-3 pt-4">
              {slides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`transition-all duration-500 rounded-full ${
                    index === currentSlide 
                      ? 'w-12 h-2 bg-gradient-to-r ' + slide.accentColor
                      : 'w-2 h-2 bg-gray-400 hover:bg-gray-600'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-[400px] lg:h-[500px]">
            <div 
              className={`relative h-full w-full transform transition-all duration-1000 ${
                currentSlide === slides.findIndex(s => s.id === slide.id)
                  ? 'translate-x-0 opacity-100 scale-100'
                  : 'translate-x-8 opacity-0 scale-95'
              }`}
            >
              {/* Image Container with Modern Frame */}
              <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl">
                {/* Gradient Overlay */}
                <div className={`absolute inset-0 bg-gradient-to-br ${slide.accentColor} opacity-10 z-10`}></div>
                
                {/* Image */}
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={currentSlide === 0}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Decorative Frame Elements */}
              <div className={`absolute -top-4 -right-4 w-24 h-24 border-4 border-current rounded-2xl ${slide.textColor} opacity-20`}></div>
              <div className={`absolute -bottom-4 -left-4 w-32 h-32 border-4 border-current rounded-2xl ${slide.textColor} opacity-20`}></div>
            </div>
          </div>

        </div>
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className={`absolute left-4 lg:left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center ${slide.textColor} hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 group`}
        aria-label="Previous slide"
      >
        <ChevronLeft className="group-hover:-translate-x-0.5 transition-transform" size={24} />
      </button>

      <button
        onClick={nextSlide}
        className={`absolute right-4 lg:right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center ${slide.textColor} hover:bg-white shadow-lg hover:shadow-xl transition-all duration-300 group`}
        aria-label="Next slide"
      >
        <ChevronRight className="group-hover:translate-x-0.5 transition-transform" size={24} />
      </button>
    </section>
  );
}
// hero slider end 