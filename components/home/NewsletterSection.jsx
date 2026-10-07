'use client';

import toast from 'react-hot-toast';

export default function NewsletterSection() {
  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('🎉 শীঘ্রই আসছে! নিউজলেটার ফিচার ডেভেলপমেন্টে রয়েছে।', {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#C2410C',
        color: '#fff',
      },
      icon: '📧',
    });
  };

  return (
    <section className="relative text-white py-14 lg:py-16 overflow-hidden bg-gradient-to-br from-slate-950 via-orange-950 to-slate-950">
      <div className="absolute inset-0">
        <div className="absolute top-0 -right-40 h-80 w-80 rounded-full bg-orange-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-80 w-80 rounded-full bg-amber-500/20 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.05),transparent_70%)]" />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 sm:p-8 shadow-[0_10px_60px_-20px_rgba(249,115,22,0.45)] backdrop-blur-xl">
          <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-gradient-to-br from-orange-400/90 to-amber-400/90 shadow-lg shadow-orange-500/20">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="h-7 w-7 text-white">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>

            <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold mb-2">
              {`আমাদের নিউজলেটারে যুক্ত হন`}
            </h2>
            <p className="text-sm sm:text-base text-white/80 leading-relaxed mb-6">
              এক্সক্লুসিভ অফার, নতুন পণ্য এবং স্পেশাল ডিসকাউন্ট পেতে সাবস্ক্রাইব করুন
            </p>

            <form onSubmit={handleSubmit} className="flex w-full flex-col gap-3 sm:flex-row sm:items-center sm:gap-2">
              <div className="relative w-full">
                <input
                  type="email"
                  placeholder="demo@example.com"
                  className="w-full rounded-lg border border-white/20 bg-white/95 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-500 shadow-sm outline-none transition focus:border-white focus:ring-2 focus:ring-white/40"
                  required
                  readOnly
                  onFocus={(e) => e.target.blur()}
                  value="demo@example.com"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex items-center justify-center gap-2 rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-slate-950 shadow-sm transition hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/40"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
                  <path d="M5.85 3.5a.75.75 0 00-1.117-1 9.719 9.719 0 00-2.348 4.876.75.75 0 001.479.248A8.219 8.219 0 015.85 3.5zM19.267 2.5a.75.75 0 10-1.118 1 8.22 8.22 0 011.987 4.124.75.75 0 001.48-.248A9.72 9.72 0 0019.266 2.5z" />
                  <path fillRule="evenodd" d="M12 2.25A6.75 6.75 0 005.25 9v.75a8.217 8.217 0 01-2.119 5.52.75.75 0 00.298 1.206c1.544.57 3.16.99 4.831 1.243a3.75 3.75 0 107.48 0 24.583 24.583 0 004.83-1.244.75.75 0 00.298-1.205 8.217 8.217 0 01-2.118-5.52V9A6.75 6.75 0 0012 2.25zM9.75 18c0-.034 0-.067.002-.1a25.05 25.05 0 004.496 0l.002.1a2.25 2.25 0 11-4.5 0z" clipRule="evenodd" />
                </svg>
                সাবস্ক্রাইব
              </button>
            </form>

            <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-white/70">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5">
                <path fillRule="evenodd" d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z" clipRule="evenodd" />
              </svg>
              <span>নিউজলেটার ফিচারটি ডেভেলপমেন্টে রয়েছে। শীঘ্রই আসছে!</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}