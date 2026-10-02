export default function Loading() {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white z-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative">
          <div className="h-12 w-12 rounded-full border-2 border-slate-200 border-t-slate-900 animate-spin"></div>
          <div className="absolute inset-0 h-12 w-12 rounded-full border-2 border-transparent border-r-slate-400 animate-spin" style={{ animationDuration: '1.5s', animationDirection: 'reverse' }}></div>
        </div>
        <p className="text-sm text-slate-600 tracking-wide">Loading...</p>
      </div>
    </div>
  )
}
