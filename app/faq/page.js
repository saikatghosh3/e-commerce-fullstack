// app/faq/page.js

'use client';

import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const faqs = [
    {
      question: "অর্ডার করার পর কতদিনের মধ্যে পণ্য হাতে পাবো?",
      answer: "অর্ডার কনফার্মেশনের ২-৫ কার্যদিবসের মধ্যে পণ্য ডেলিভারি দেওয়া হয়। ঢাকার ভিতরে সাধারণত ২-৩ দিন এবং ঢাকার বাইরে ৩-৫ দিন সময় লাগে। এক্সপ্রেস ডেলিভারি অপশন থাকলে ২৪-৪৮ ঘন্টার মধ্যে ডেলিভারি সম্ভব।"
    },
    {
      question: "কিভাবে অর্ডার করব?",
      answer: "আপনি আমাদের ওয়েবসাইট বা মোবাইল অ্যাপ থেকে সহজেই অর্ডার করতে পারেন। পছন্দের পণ্য কার্টে যোগ করুন, চেকআউটে গিয়ে আপনার ঠিকানা ও পেমেন্ট পদ্ধতি নির্বাচন করুন, এবং অর্ডার কনফার্ম করুন। অর্ডার করার পর আপনি এসএমএস ও ইমেইলে কনফার্মেশন পেয়ে যাবেন।"
    },
    {
      question: "পণ্য ফেরত বা বিনিময়ের নিয়ম কী?",
      answer: "পণ্য হাতে পাওয়ার ৭ দিনের মধ্যে আপনি রিটার্ন বা বিনিময়ের অনুরোধ করতে পারবেন। পণ্য অবশ্যই অব্যবহৃত, ট্যাগসহ এবং মূল প্যাকেটে থাকতে হবে। নির্দিষ্ট কিছু পণ্য যেমন ব্যক্তিগত স্বাস্থ্য পণ্য, আন্ডারগার্মেন্টস ফেরতযোগ্য নয়। রিটার্ন প্রক্রিয়া সম্পূর্ণ বিনামূল্যে।"
    },
    {
      question: "পেমেন্টের কয়টি পদ্ধতি আছে?",
      answer: "আমরা একাধিক পেমেন্ট পদ্ধতি অফার করি: ক্যাশ অন ডেলিভারি (নগদ), বিকাশ, নগদ, রকেট, ব্যাংক কার্ড (ভিসা, মাস্টারকার্ড, অ্যামেক্স), এবং ব্যাংক ট্রান্সফার। সব অনলাইন পেমেন্ট ১০০% সুরক্ষিত ও এনক্রিপ্টেড।"
    },
    {
      question: "ডেলিভারি চার্জ কত?",
      answer: "ঢাকার ভিতরে ডেলিভারি চার্জ ৬০ টাকা এবং ঢাকার বাইরে ১২০ টাকা। নির্দিষ্ট মূল্যের (২০০০ টাকার উপরে) অর্ডারে ডেলিভারি চার্জ সম্পূর্ণ ফ্রি। এক্সপ্রেস ডেলিভারি চার্জ অর্ডারের ওজন ও লোকেশন অনুযায়ী নির্ধারণ করা হয়।"
    },
    {
      question: "অর্ডার ট্র্যাক কিভাবে করব?",
      answer: "অর্ডার করার পর আমরা আপনাকে একটি ট্র্যাকিং আইডি এসএমএস ও ইমেইলে পাঠিয়ে দেব। আমাদের ওয়েবসাইটের 'ট্র্যাক অর্ডার' সেকশনে গিয়ে সেই আইডি দিয়ে আপনার অর্ডারের অবস্থান জানতে পারবেন। এছাড়াও আমাদের কাস্টমার কেয়ারে কল করেও জানতে পারেন।"
    },
    {
      question: "প্রোমো কোড বা ডিসকাউন্ট কোড কিভাবে ব্যবহার করব?",
      answer: "চেকআউট পেজে 'প্রোমো কোড' বক্সটি পাবেন, সেখানে আপনার কোডটি লিখে 'প্রয়োগ করুন' বাটনে ক্লিক করুন। কোডটি বৈধ হলে ডিসকাউন্ট স্বয়ংক্রিয়ভাবে যোগ হয়ে যাবে। কোডের মেয়াদ শেষ হয়ে গেলে বা কোড ভুল হলে ডিসকাউন্ট হবে না।"
    },
    {
      question: "পণ্য ড্যামেজ বা ভুল পেলে কী করব?",
      answer: "পণ্য ডেলিভারির সময় খুলে চেক করে নিন। কোনো ড্যামেজ বা ভুল পণ্য পেলে সাথে সাথে আমাদের কাস্টমার কেয়ারে জানান (ডেলিভারি স্টাফকে রিসিভ না করে ফটো ও ভিডিও সহ)। আমরা ২৪ ঘন্টার মধ্যে আপনার অভিযোগ সমাধান করব এবং পণ্য পরিবর্তন বা টাকা ফেরত দেব।"
    },
    {
      question: "অ্যাকাউন্ট ছাড়া কি অর্ডার করা যায়?",
      answer: "হ্যাঁ, আপনি অ্যাকাউন্ট ছাড়াই গেস্ট চেকআউটের মাধ্যমে অর্ডার করতে পারবেন। তবে অ্যাকাউন্ট তৈরি করলে আপনার অর্ডার ইতিহাস, ট্র্যাকিং সুবিধা, দ্রুত চেকআউট, এক্সক্লুসিভ অফার ও ডিসকাউন্ট পাবেন।"
    },
    {
      question: "কিভাবে যোগাযোগ করব?",
      answer: "আমরা সাপোর্টে ২৪/৭ উপলব্ধ। ফোন: ০৯৬১২-৩৪৫৬৭৮, ইমেইল: support@yourstore.com, লাইভ চ্যাট: ওয়েবসাইটের নিচের ডান কোণে চ্যাট বাটন। এছাড়াও ফেসবুক ও ইন্সটাগ্রাম পেজে মেসেজ দিতে পারেন।"
    }
  ];

  return (
    <main className="min-h-screen bg-gradient-to-br from-emerald-50 to-teal-50 px-4 py-12 md:py-20">
      <div className="max-w-4xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
        
        {/* হেডার সেকশন */}
        <div className="bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-8 md:px-10 border-b border-emerald-200">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="bg-emerald-200 rounded-full w-14 h-14 flex items-center justify-center">
                <i className="fas fa-question-circle text-emerald-700 text-2xl"></i>
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-800">সাধারণ জিজ্ঞাসা</h1>
                <p className="text-emerald-700 mt-1">আপনার প্রশ্নের উত্তর এখানে খুঁজুন</p>
              </div>
            </div>
          
          </div>
        </div>

        {/* সার্চ বক্স */}
        <div className="px-6 md:px-10 pt-8 pb-4">
          <div className="relative">
            <i className="fas fa-search absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"></i>
            <input 
              type="text" 
              placeholder="আপনার প্রশ্ন লিখুন..." 
              className="w-full pl-12 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:border-emerald-400 focus:ring-2 focus:ring-emerald-200 transition"
            />
          </div>
        </div>

        {/* FAQ সেকশন */}
        <div className="p-6 md:p-10 space-y-4">
          <div className="flex items-center gap-2 mb-4">
            <i className="fas fa-comments text-emerald-600 text-xl"></i>
            <h2 className="text-xl font-bold text-slate-800">ঘন ঘন জিজ্ঞাসিত প্রশ্ন</h2>
          </div>

          {/* FAQ আইটেম লিস্ট */}
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="border border-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full text-left px-5 py-4 bg-white hover:bg-gray-50 transition flex justify-between items-center"
                >
                  <span className="font-semibold text-slate-800 text-sm md:text-base pr-4">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0">
                    {openIndex === index ? (
                      <i className="fas fa-chevron-up text-emerald-600"></i>
                    ) : (
                      <i className="fas fa-chevron-down text-gray-400"></i>
                    )}
                  </span>
                </button>
                
                {openIndex === index && (
                  <div className="px-5 py-4 bg-emerald-50/30 border-t border-emerald-100">
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* কুইক লিংক সেকশন */}
          <div className="mt-8 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-xl p-5">
            <h3 className="font-bold text-slate-800 mb-3 flex items-center gap-2">
              <i className="fas fa-link text-emerald-600"></i>
              দরকারী লিংকসমূহ
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <a href="/return-policy" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                <i className="fas fa-arrow-right text-xs"></i> রিটার্ন নীতি
              </a>
              <a href="/privacy-policy" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                <i className="fas fa-arrow-right text-xs"></i> গোপনীয়তা নীতি
              </a>
              <a href="/terms-of-service" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                <i className="fas fa-arrow-right text-xs"></i> শর্তাবলী
              </a>
              <a href="/contact" className="text-sm text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
                <i className="fas fa-arrow-right text-xs"></i> যোগাযোগ
              </a>
            </div>
          </div>

          {/* এখনো প্রশ্ন থাকে? */}
          <div className="text-center py-6 border-t border-gray-100">
            <div className="bg-amber-50 rounded-xl p-5 inline-block w-full">
              <i className="fas fa-headset text-amber-600 text-3xl mb-2 block"></i>
              <h4 className="font-bold text-slate-800">এখনো প্রশ্ন থাকে?</h4>
              <p className="text-slate-600 text-sm mt-1">আমাদের সাপোর্ট টিম ২৪/৭ আপনার জন্য প্রস্তুত</p>
              <a 
                href="/contact" 
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white px-5 py-2 rounded-lg mt-3 transition text-sm"
              >
                <i className="fas fa-envelope"></i>
                যোগাযোগ করুন
              </a>
            </div>
          </div>

          {/* হোমপেজে ফিরে যাওয়ার বাটন */}
          <div className="text-center pt-4">
            <a 
              href="/" 
              className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-900 text-white px-8 py-3 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg"
            >
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