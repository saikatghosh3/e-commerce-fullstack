'use client'

import { useEffect, useState } from 'react'

export default function GlobalLoader() {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 650)
    return () => clearTimeout(timer)
  }, [])

  if (!loading) return null

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-gradient-to-b from-white to-slate-50">
      <div className="flex flex-col items-center gap-6">
        <div className="relative flex items-center justify-center h-16 w-16">
          <div className="absolute inset-0 rounded-full border-4 border-slate-200/70"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-slate-900 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-r-indigo-500/80 animate-spin" style={{ animationDuration: '1.2s', animationDirection: 'reverse' }}></div>
          <div className="absolute inset-5 rounded-full bg-slate-900 shadow-[0_0_0_4px_rgba(255,255,255,0.8)] animate-pulse"></div>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-[10px] uppercase tracking-[0.25em] text-slate-500 font-medium">Loading</p>
          <div className="flex items-center gap-1">
            <span className="h-1 w-1 rounded-full bg-slate-900 animate-bounce"></span>
            <span className="h-1 w-1 rounded-full bg-slate-700 animate-bounce" style={{ animationDelay: '0.1s' }}></span>
            <span className="h-1 w-1 rounded-full bg-slate-500 animate-bounce" style={{ animationDelay: '0.2s' }}></span>
          </div>
        </div>
      </div>
    </div>
  )
}
