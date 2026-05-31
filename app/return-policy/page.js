// app/return-policy/page.js (Next.js App Router)

export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* হেডার সেকশন */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-8 md:px-10 border-b border-amber-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-amber-200 rounded-full w-14 h-14 flex items-center justify-center">
                <i className="fas fa-rotate-left text-amber-700 text-2xl"></i>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">রিটার্ন নীতি</h1>
                <p className="text-amber-700 mt-1">ফেরত ও বিনিময় নিয়মাবলি</p>
              </div>
            </div>
            
            {/* হোমপেজে রিডাইরেক্ট বাটন */}
            <a 
              href="/" 
              className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 px-6 rounded-xl transition flex items-center gap-2 w-fit"
            >
              <i className="fas fa-home"></i>
              হোমপেজে যান
            </a>
          </div>
        </div>

        {/* মূল কন্টেন্ট */}
        <div className="p-6 md:p-10 space-y-6">
          <div className="bg-amber-50 p-5 rounded-xl border-l-8 border-amber-500">
            <h2 className="font-bold text-xl text-slate-800">আমাদের প্রতিশ্রুতি</h2>
            <p className="text-slate-600 mt-1">আপনার কেনাকাটা ১০০% সুরক্ষিত। সন্তুষ্ট না হলে সহজ রিটার্ন প্রক্রিয়া।</p>
          </div>

          {/* গ্রিড কার্ড */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="border p-5 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-emerald-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                <i className="fas fa-calendar-week text-emerald-600"></i>
              </div>
              <h3 className="font-bold text-lg text-slate-800">রিটার্ন সময়সীমা</h3>
              <p className="text-slate-600 text-sm mt-1">পণ্য হাতে পাওয়ার ৭ দিনের মধ্যে রিটার্ন রিকোয়েস্ট করতে হবে।</p>
            </div>

            <div className="border p-5 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-blue-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                <i className="fas fa-clipboard-list text-blue-600"></i>
              </div>
              <h3 className="font-bold text-lg text-slate-800">পণ্যের শর্তাবলী</h3>
              <p className="text-slate-600 text-sm mt-1">পণ্য অব্যবহৃত, ট্যাগসহ এবং মূল প্যাকেটে থাকতে হবে।</p>
            </div>

            <div className="border p-5 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-purple-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                <i className="fas fa-arrow-right-arrow-left text-purple-600"></i>
              </div>
              <h3 className="font-bold text-lg text-slate-800">কিভাবে ফেরত দিবেন</h3>
              <p className="text-slate-600 text-sm mt-1">অ্যাকাউন্টে রিটার্ন অপশন থেকে অনুরোধ করুন।</p>
            </div>

            <div className="border p-5 rounded-xl shadow-sm hover:shadow-md transition">
              <div className="bg-rose-100 w-10 h-10 rounded-lg flex items-center justify-center mb-3">
                <i className="fas fa-coins text-rose-500"></i>
              </div>
              <h3 className="font-bold text-lg text-slate-800">রিফান্ড নীতি</h3>
              <p className="text-slate-600 text-sm mt-1">রিটার্ন শেষে ৭-১০ কার্যদিবসের মধ্যে টাকা ফেরত দেওয়া হবে।</p>
            </div>
          </div>

          {/* হোমপেজে আরেকটি বাটন */}
          <div className="text-center pt-4">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-6 py-3 rounded-xl transition"
            >
              <i className="fas fa-arrow-left"></i>
              হোমপেজে ফিরে যান
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}