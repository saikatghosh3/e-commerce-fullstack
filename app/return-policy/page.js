export default function ReturnPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50 px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-100 to-orange-100 px-6 py-8 md:px-10 border-b border-amber-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-amber-200 rounded-full w-14 h-14 flex items-center justify-center">
                <i className="fas fa-rotate-left text-amber-700 text-2xl"></i>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">রিটার্ন নীতি</h1>
                <p className="text-amber-700 mt-1">সহজ ও ঝামেলামুক্ত রিটার্ন প্রক্রিয়া</p>
              </div>
            </div>
            <a href="/" className="bg-amber-600 hover:bg-amber-700 text-white font-semibold py-2.5 px-6 rounded-xl transition flex items-center gap-2 w-fit shadow-md hover:shadow-lg">
              <i className="fas fa-home"></i>
              হোমপেজে যান
            </a>
          </div>
        </div>

        <div className="p-6 md:p-10 space-y-8">
          {/* Intro */}
          <div className="bg-amber-50 p-5 rounded-xl border-l-8 border-amber-500">
            <div className="flex items-start gap-3">
              <i className="fas fa-shield-halved text-amber-600 text-2xl mt-1"></i>
              <div>
                <h2 className="font-bold text-xl text-slate-800">আমাদের প্রতিশ্রুতি</h2>
                <p className="text-slate-600 mt-2 leading-relaxed">
                  আপনার কেনাকাটা ১০০% সুরক্ষিত। আপনি যদি কোনো কারণে আপনার কেনা পণ্যে সন্তুষ্ট না হন, আমরা তা ফেরত বা 
                  বিনিময় করে দেব। নিচে আমাদের রিটার্ন নীতিমালা বিস্তারিতভাবে বর্ণিত হলো।
                </p>
              </div>
            </div>
          </div>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-5">
            <div className="border p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-emerald-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <i className="fas fa-calendar-week text-emerald-600 text-xl"></i>
              </div>
              <h3 className="font-bold text-lg text-slate-800">রিটার্ন সময়সীমা</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                পণ্য হাতে পাওয়ার <strong className="text-slate-800">৭ দিনের</strong> মধ্যে রিটার্ন রিকোয়েস্ট করতে হবে। 
                ৭ দিনের পরে কোনো রিটার্ন গ্রহণযোগ্য নয়। সময়মতো রিটার্ন নিশ্চিত করতে অর্ডার পাওয়ার পর promptly পণ্য চেক করুন।
              </p>
            </div>

            <div className="border p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-blue-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <i className="fas fa-clipboard-list text-blue-600 text-xl"></i>
              </div>
              <h3 className="font-bold text-lg text-slate-800">পণ্যের শর্তাবলী</h3>
              <ul className="text-slate-600 text-sm mt-2 space-y-1 list-disc list-inside leading-relaxed">
                <li>পণ্য অবশ্যই অব্যবহৃত হতে হবে</li>
                <li>সকল ট্যাগ ও লেবেল অক্ষত থাকতে হবে</li>
                <li>মূল প্যাকেটিং সংরক্ষিত থাকতে হবে</li>
                <li>পণ্যের সাথে থাকা অন্যান্য উপকরণ (গিফট, এক্সেসরিজ) জমা দিতে হবে</li>
              </ul>
            </div>

            <div className="border p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-purple-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <i className="fas fa-arrow-right-arrow-left text-purple-600 text-xl"></i>
              </div>
              <h3 className="font-bold text-lg text-slate-800">রিটার্ন প্রক্রিয়া</h3>
              <ol className="text-slate-600 text-sm mt-2 space-y-1.5 list-decimal list-inside leading-relaxed">
                <li>আপনার অ্যাকাউন্টে লগইন করে &quot;মাই অর্ডার&quot; এ যান</li>
                <li>প্রাসঙ্গিক অর্ডারে &quot;রিটার্ন&quot; অপশনে ক্লিক করুন</li>
                <li>রিটার্নের কারণ নির্বাচন করুন ও বিস্তারিত লিখুন</li>
                <li>আমরা ২৪ ঘন্টার মধ্যে রিটার্ন অনুরোধ অনুমোদন করব</li>
                <li>কুরিয়ার সার্ভিস পণ্য সংগ্রহ করবে (সম্পূর্ণ ফ্রি)</li>
                <li>পণ্য আমাদের কাছে পৌঁছানোর পর ৩-৫ দিনের মধ্যে রিফান্ড প্রক্রিয়া সম্পন্ন হবে</li>
              </ol>
            </div>

            <div className="border p-5 rounded-xl shadow-sm hover:shadow-md transition-all">
              <div className="bg-rose-100 w-12 h-12 rounded-xl flex items-center justify-center mb-3">
                <i className="fas fa-coins text-rose-500 text-xl"></i>
              </div>
              <h3 className="font-bold text-lg text-slate-800">রিফান্ড নীতি</h3>
              <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                রিটার্ন সম্পন্ন হওয়ার পর <strong className="text-slate-800">৭-১০ কার্যদিবসের</strong> মধ্যে টাকা ফেরত 
                দেওয়া হবে। পেমেন্ট পদ্ধতি অনুযায়ী টাকা ফেরত দেওয়া হবে:
              </p>
              <ul className="text-slate-600 text-sm mt-2 space-y-1 list-disc list-inside">
                <li>অনলাইন পেমেন্ট: একই অ্যাকাউন্টে ফেরত</li>
                <li>ক্যাশ অন ডেলিভারি: আপনার ব্যাংক/মোবাইল ব্যাংকিং অ্যাকাউন্টে</li>
              </ul>
            </div>
          </div>

          {/* Non-returnable Items */}
          <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-3">
              <div className="bg-red-100 rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-ban text-red-500"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">যে পণ্যগুলো ফেরত দেওয়া যাবে না</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-3">
                  {[
                    'ব্যক্তিগত স্বাস্থ্য ও হাইজিন পণ্য',
                    'আন্ডারগার্মেন্টস ও অন্তর্বাস',
                    'পারফিউম (ব্যবহার করা থাকলে)',
                    'ইলেকট্রনিক্স (প্রোডাক্ট সারিয়াল নম্বর ভাঙা থাকলে)',
                    'কাস্টমাইজড বা অর্ডার অনুযায়ী তৈরি পণ্য',
                    'ডিজিটাল পণ্য (ভাউচার, গিফট কার্ড)',
                    'ফুড ও বেভারেজ পণ্য',
                    'স্পর্শকাতর পণ্য (মেকআপ, স্কিন কেয়ার)',
                  ].map((item, i) => (
                    <div key={i} className="flex items-center gap-2 bg-red-50 p-2.5 rounded-lg">
                      <i className="fas fa-times-circle text-red-400 text-sm"></i>
                      <span className="text-sm text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Damaged */}
          <div className="border border-gray-100 rounded-xl p-5 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-start gap-3">
              <div className="bg-amber-100 rounded-xl w-10 h-10 flex items-center justify-center flex-shrink-0">
                <i className="fas fa-triangle-exclamation text-amber-600"></i>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-800">ড্যামেজ বা ভুল পণ্য পেলে কী করবেন?</h3>
                <p className="text-slate-600 text-sm mt-2 leading-relaxed">
                  পণ্য ডেলিভারির সময় কুরিয়ার কর্মীর সামনে পণ্য খুলে চেক করুন। যদি পণ্য ড্যামেজ বা ভুল পণ্য আসে:
                </p>
                <ol className="text-slate-600 text-sm mt-2 space-y-1 list-decimal list-inside">
                  <li>পণ্য রিসিভ করবেন না। কুরিয়ার কর্মীকে জানিয়ে দিন।</li>
                  <li>পণ্যের ছবি ও ভিডিও তুলে রাখুন।</li>
                  <li>২৪ ঘন্টার মধ্যে আমাদের কাস্টমার কেয়ারে জানান।</li>
                  <li>আমরা সর্বোচ্চ ২৪ ঘন্টার মধ্যে পণ্য পরিবর্তন বা রিফান্ডের ব্যবস্থা করব।</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <i className="fas fa-headset text-amber-600 text-2xl"></i>
                <div>
                  <p className="text-sm text-slate-500">রিটার্ন সংক্রান্ত যেকোনো প্রশ্নে</p>
                  <p className="font-semibold text-slate-700">০৯৬১২-৩৪৫৬৭৮</p>
                  <p className="text-xs text-slate-400">সকাল ৯টা - রাত ১০টা (শুক্রবার ছাড়া)</p>
                </div>
              </div>
              <a href="/contact" className="text-amber-600 hover:text-amber-700 font-medium text-sm flex items-center gap-1 border border-amber-300 px-4 py-2 rounded-lg bg-white">
                <i className="fas fa-envelope"></i>
                যোগাযোগ করুন
              </a>
            </div>
          </div>

          {/* Related */}
          <div className="bg-gray-50 rounded-xl p-5">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <i className="fas fa-link text-amber-600"></i>
              প্রাসঙ্গিক পৃষ্ঠা
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { href: '/faq', label: 'সাধারণ জিজ্ঞাসা' },
                { href: '/delivery-info', label: 'ডেলিভারির তথ্য' },
                { href: '/privacy-policy', label: 'গোপনীয়তা নীতি' },
                { href: '/terms-of-service', label: 'শর্তাবলী' },
              ].map(({ href, label }) => (
                <a key={href} href={href} className="text-sm text-amber-600 hover:text-amber-700 flex items-center gap-1 bg-white p-2.5 rounded-lg border border-gray-200">
                  <i className="fas fa-arrow-right text-xs"></i> {label}
                </a>
              ))}
            </div>
          </div>

          {/* Home */}
          <div className="text-center pt-4 border-t border-gray-100">
            <a href="/" className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg">
              <i className="fas fa-arrow-left"></i>
              হোমপেজে ফিরে যান
              <i className="fas fa-home ml-1"></i>
            </a>
          </div>
        </div>
      </div>
    </main>
  );
}
