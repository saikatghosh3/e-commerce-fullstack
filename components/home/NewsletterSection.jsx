'use client';

import toast from 'react-hot-toast';

export default function NewsletterSection() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('🎉 শীঘ্রই আসছে! নিউজলেটার ফিচার ডেভেলপমেন্টে রয়েছে।', {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#4F46E5',
        color: '#fff',
        fontFamily: 'Hind Siliguri, sans-serif',
      },
      icon: '📧',
    });
  };

  return (
    <section className="bg-gradient-to-r from-indigo-900 via-purple-900 to-indigo-900 text-white py-16 lg:py-20 relative overflow-hidden">
      
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
          <div className="w-20 h-20 bg-gradient-to-br from-indigo-400 to-purple-400 rounded-full flex items-center justify-center mx-auto mb-5 animate-pulse">
            <i className="fas fa-envelope-open-text text-white text-3xl"></i>
          </div>
          
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3">
            আমাদের নিউজলেটারে যুক্ত হন
          </h2>
          <p className="text-indigo-100 text-sm sm:text-base mb-6">
            এক্সক্লুসিভ অফার, নতুন পণ্য এবং স্পেশাল ডিসকাউন্ট পেতে সাবস্ক্রাইব করুন
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
            <input
              type="email"
              placeholder="আপনার ইমেইল লিখুন"
              className="flex-1 px-5 py-3 rounded-xl text-gray-900 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent"
              required
              readOnly
              onFocus={(e) => e.target.blur()}
              value="demo@example.com"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl font-semibold hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-md hover:shadow-lg"
            >
              <i className="fas fa-bell mr-2"></i>
              সাবস্ক্রাইব
            </button>
          </form>
          
          <p className="text-indigo-200 text-xs mt-4 flex items-center justify-center gap-2">
            <i className="fas fa-tools"></i>
            <span>নিউজলেটার ফিচারটি ডেভেলপমেন্টে রয়েছে। শীঘ্রই আসছে!</span>
          </p>
        </div>
      </div>
    </section>
  );
}