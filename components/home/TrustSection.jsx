import { RotateCcw, Shield, Star, Truck } from 'lucide-react';

export default function TrustSection() {
  return (
    <section className="relative bg-white py-10 overflow-hidden">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent" />
      <div className="absolute inset-0 -z-10 opacity-40" style={{
        backgroundImage: 'radial-gradient(circle at 20% 0%, rgba(99,102,241,0.05), transparent 60%), radial-gradient(circle at 80% 0%, rgba(168,85,247,0.05), transparent 60%)'
      }} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {[
            {
              icon: Truck,
              title: 'ফ্রি ডেলিভারি',
              desc: '৫০ টাকার বেশি অর্ডারে ফ্রি শিপিং',
              grad: 'from-indigo-500/10 to-indigo-500/5',
              iconBg: 'bg-indigo-50',
              iconColor: 'text-indigo-600',
            },
            {
              icon: Shield,
              title: 'নিরাপদ পেমেন্ট',
              desc: 'সম্পূর্ণ SSL সুরক্ষিত লেনদেন',
              grad: 'from-emerald-500/10 to-emerald-500/5',
              iconBg: 'bg-emerald-50',
              iconColor: 'text-emerald-600',
            },
            {
              icon: RotateCcw,
              title: 'সহজ রিটার্ন',
              desc: '৩০ দিনের সহজ রিটার্ন সুবিধা',
              grad: 'from-amber-500/10 to-amber-500/5',
              iconBg: 'bg-amber-50',
              iconColor: 'text-amber-600',
            },
            {
              icon: Star,
              title: 'প্রিমিয়াম মান',
              desc: 'যাচাইকৃত আসল ও মানসম্মত পণ্য',
              grad: 'from-purple-500/10 to-purple-500/5',
              iconBg: 'bg-purple-50',
              iconColor: 'text-purple-600',
            },
          ].map((item, i) => (
            <div
              key={i}
              className={`group relative overflow-hidden rounded-lg border border-slate-200/80 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md`}
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${item.grad} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
              <div className="relative flex items-start gap-4">
                <div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-lg ${item.iconBg} ring-1 ring-inset ring-white/40 transition-transform duration-300 group-hover:scale-105`}>
                  <item.icon className={item.iconColor} size={20} />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900">{item.title}</h3>
                  <p className="mt-0.5 text-xs text-slate-600 leading-relaxed">{item.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}