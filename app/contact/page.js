
export default function ContactPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50 px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* হেডার সেকশন */}
        <div className="bg-gradient-to-r from-blue-100 to-cyan-100 px-6 py-8 md:px-10 border-b border-blue-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-blue-200 rounded-full w-14 h-14 flex items-center justify-center">
                <i className="fas fa-phone-alt text-blue-700 text-2xl"></i>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">যোগাযোগ করুন</h1>
                <p className="text-blue-700 mt-1">আমরা ২৪/৭ আপনার জন্য উন্মুক্ত</p>
              </div>
            </div>
          </div>
        </div>

        {/* মূল কন্টেন্ট */}
        <div className="p-6 md:p-10 space-y-8">
          
          {/* যোগাযোগের তথ্য কার্ডসমূহ */}
          <div className="grid md:grid-cols-2 gap-6">
            
            {/* ফোন নম্বর কার্ড */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <i className="fas fa-phone-alt text-white text-2xl"></i>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">ফোন করুন</h2>
              <p className="text-slate-500 text-sm mb-3">সকাল ৯টা - রাত ১০টা (শুক্রবার ছাড়া)</p>
              <div className="space-y-2">
                <div className="bg-white rounded-xl p-3">
                  <p className="text-xs text-slate-400">হটলাইন নম্বর</p>
                  <a href="tel:+8809612345678" className="text-blue-600 font-bold text-xl hover:text-blue-700 transition">
                    ০৯৬১২-৩৪৫৬৭৮
                  </a>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <p className="text-xs text-slate-400">মোবাইল (হোয়াটসঅ্যাপ)</p>
                  <a href="tel:+8801712345678" className="text-blue-600 font-bold text-lg hover:text-blue-700 transition">
                    ০১৭১২-৩৪৫৬৭৮
                  </a>
                </div>
              </div>
            </div>

            {/* ইমেইল কার্ড */}
            <div className="bg-gradient-to-br from-cyan-50 to-cyan-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 text-center">
              <div className="bg-cyan-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 shadow-md">
                <i className="fas fa-envelope text-white text-2xl"></i>
              </div>
              <h2 className="text-xl font-bold text-slate-800 mb-2">ইমেইল করুন</h2>
              <p className="text-slate-500 text-sm mb-3">২৪ ঘন্টার মধ্যে রিপ্লাই দেওয়া হয়</p>
              <div className="space-y-2">
                <div className="bg-white rounded-xl p-3">
                  <p className="text-xs text-slate-400">সাপোর্ট ইমেইল</p>
                  <a href="mailto:support@yourstore.com" className="text-cyan-600 font-semibold text-sm md:text-base break-all hover:text-cyan-700 transition">
                    support@yourstore.com
                  </a>
                </div>
                <div className="bg-white rounded-xl p-3">
                  <p className="text-xs text-slate-400">অভিযোগ ও আইনি বিষয়</p>
                  <a href="mailto:legal@yourstore.com" className="text-cyan-600 font-semibold text-sm md:text-base break-all hover:text-cyan-700 transition">
                    legal@yourstore.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* অন্যান্য যোগাযোগ মাধ্যম */}
          <div className="bg-gray-50 rounded-2xl p-6 border border-gray-200">
            <h3 className="font-bold text-lg text-slate-800 mb-4 text-center flex items-center justify-center gap-2">
              <i className="fab fa-rocketchat text-blue-500"></i>
              সামাজিক মাধ্যমে সংযুক্ত থাকুন
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#" className="flex items-center gap-2 bg-white hover:bg-blue-50 border border-blue-200 px-4 py-2 rounded-xl transition shadow-sm">
                <i className="fab fa-facebook text-blue-600 text-xl"></i>
                <span className="text-slate-700">Facebook</span>
              </a>
              <a href="#" className="flex items-center gap-2 bg-white hover:bg-pink-50 border border-pink-200 px-4 py-2 rounded-xl transition shadow-sm">
                <i className="fab fa-instagram text-pink-600 text-xl"></i>
                <span className="text-slate-700">Instagram</span>
              </a>
              <a href="#" className="flex items-center gap-2 bg-white hover:bg-green-50 border border-green-200 px-4 py-2 rounded-xl transition shadow-sm">
                <i className="fab fa-whatsapp text-green-500 text-xl"></i>
                <span className="text-slate-700">WhatsApp</span>
              </a>
              <a href="#" className="flex items-center gap-2 bg-white hover:bg-sky-50 border border-sky-200 px-4 py-2 rounded-xl transition shadow-sm">
                <i className="fab fa-messenger text-sky-500 text-xl"></i>
                <span className="text-slate-700">Messenger</span>
              </a>
            </div>
          </div>

          {/* দোকানের ঠিকানা */}
          <div className="bg-gradient-to-r from-blue-100 to-cyan-100 rounded-2xl p-6">
            <div className="flex items-start gap-3">
              <div className="bg-white rounded-full p-2">
                <i className="fas fa-map-marker-alt text-blue-600 text-xl"></i>
              </div>
              <div>
                <h4 className="font-bold text-slate-800">আমাদের ঠিকানা</h4>
                <p className="text-slate-600 text-sm mt-1">
                  হাউস #১২৩, রোড #৫, ব্লক #সি,<br />
                  বনানী, ঢাকা - ১২১৩, বাংলাদেশ
                </p>
                <div className="mt-3">
                  <a 
                    href="https://maps.google.com" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-600 text-sm flex items-center gap-1 hover:underline"
                  >
                    <i className="fas fa-external-link-alt text-xs"></i>
                    গুগল ম্যাপে দেখুন
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* ব্যবসায়িক সময় */}
          <div className="bg-white border border-gray-100 rounded-xl p-5 shadow-sm">
            <div className="flex items-center gap-3 mb-3">
              <i className="fas fa-clock text-blue-600 text-xl"></i>
              <h4 className="font-bold text-slate-800">কল সেন্টার খোলার সময়</h4>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex justify-between">
                <span className="text-slate-500">শনিবার - বৃহস্পতিব:</span>
                <span className="font-semibold text-slate-700">সকাল ৯টা - রাত ১০টা</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">শুক্রবার:</span>
                <span className="font-semibold text-slate-700">বিকাল ৩টা - রাত ৯টা</span>
              </div>
            </div>
          </div>

          {/* নোটিশ */}
          <div className="bg-amber-50 rounded-xl p-4 border border-amber-200 flex items-start gap-3">
            <i className="fas fa-info-circle text-amber-500 text-lg mt-0.5"></i>
            <p className="text-xs text-slate-600">
              <span className="font-semibold">দ্রষ্টব্য:</span> আমাদের কাছে কোনো ফর্ম নেই। সরাসরি উপরের নম্বরে কল করুন অথবা ইমেইল করুন। 
              আমরা যত দ্রুত সম্ভব উত্তর দেওয়ার চেষ্টা করি।
            </p>
          </div>

          {/* হোমপেজে ফিরে যাওয়ার বাটন */}
          <div className="text-center pt-4 border-t border-gray-100">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
              <i className="fas fa-arrow-left"></i>
              হোমপেজে ফিরে যান
              <i className="fas fa-home ml-1"></i>
            </a>
            <p className="text-xs text-slate-400 mt-3">
              <i className="fas fa-headset mr-1"></i> 
              যেকোনো সমস্যায় কল করতে দ্বিধা করবেন না
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}