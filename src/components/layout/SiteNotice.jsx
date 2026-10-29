import { useState } from 'react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'site-notice-dismissed'

function readDismissed() {
  try {
    return localStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    return false
  }
}

export default function SiteNotice() {
  const [dismissed, setDismissed] = useState(readDismissed)

  if (dismissed) return null

  const dismiss = () => {
    setDismissed(true)
    try {
      localStorage.setItem(STORAGE_KEY, '1')
    } catch {}
  }

  // Inverted against the page (foreground as background) so it reads as a
  // distinct layer in both themes; the amber dot is the only color on it.
  return (
    <div
      role="note"
      aria-label="Site status"
      className="relative flex items-center justify-center px-12 py-2 text-xs"
      style={{ backgroundColor: 'var(--color-foreground)', color: 'var(--color-surface)' }}
    >
      <span className="flex items-center gap-2.5 text-center">
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
        </span>
        <span>
          <span className="font-semibold tracking-wide">Under construction</span>
          <span className="opacity-60 hidden sm:inline"> — some case studies are still in progress.</span>
          <span className="opacity-60 sm:hidden"> — more coming soon.</span>
        </span>
      </span>
      <button
        onClick={dismiss}
        className="absolute right-3 p-1 opacity-60 transition-opacity hover:opacity-100"
        aria-label="Dismiss notice"
      >
        <X size={14} />
      </button>
    </div>
  )
}
