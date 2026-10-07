'use client'

import { useEffect, useState } from 'react'
import { usePathname } from 'next/navigation'

/**
 * Slim route-change progress bar. It deliberately does NOT block the page on
 * first paint: content is server rendered, so a full-screen overlay would only
 * add dead time to an already fast load.
 */
export default function GlobalLoader() {
  const pathname = usePathname()
  const [active, setActive] = useState(false)

  useEffect(() => {
    setActive(true)
    const timer = setTimeout(() => setActive(false), 400)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div
      aria-hidden={!active}
      role="progressbar"
      aria-busy={active}
      className={`pointer-events-none fixed inset-x-0 top-0 z-[9999] h-0.5 overflow-hidden transition-opacity duration-200 ${
        active ? 'opacity-100' : 'opacity-0'
      }`}
    >
      <div className="h-full w-1/3 rounded-full bg-orange-600 animate-progress-bar" />
    </div>
  )
}
