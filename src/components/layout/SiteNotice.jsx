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

  // Stealth yellow: the --color-notice-* tokens are a yellow-tinted dark ramp
  // (see useTheme), so the strip reads as yellow without a bright yellow fill.
  return (
    <div
      role="note"
      aria-label="Site status"
      className="relative flex items-center justify-center px-12 py-2 text-xs border-b"
      style={{
        backgroundColor: 'var(--color-notice-bg)',
        borderColor: 'var(--color-notice-border)',
        color: 'var(--color-notice-fg)',
      }}
    >
      <span className="flex items-center gap-2.5 text-center">
        <span className="relative flex h-2 w-2 shrink-0" aria-hidden="true">
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-60 motion-safe:animate-ping"
            style={{ backgroundColor: 'var(--color-notice-accent)' }}
          />
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ backgroundColor: 'var(--color-notice-accent)' }} />
        </span>
        <span>
          <span className="font-semibold tracking-wide">Under construction</span>
          <span className="hidden sm:inline" style={{ color: 'var(--color-notice-muted)' }}> — some case studies are still in progress.</span>
          <span className="sm:hidden" style={{ color: 'var(--color-notice-muted)' }}> — more coming soon.</span>
        </span>
      </span>
      <button
        onClick={dismiss}
        className="absolute right-3 p-1 transition-colors"
        style={{ color: 'var(--color-notice-muted)' }}
        onMouseEnter={e => e.currentTarget.style.color = 'var(--color-notice-fg)'}
        onMouseLeave={e => e.currentTarget.style.color = 'var(--color-notice-muted)'}
        aria-label="Dismiss notice"
      >
        <X size={14} />
      </button>
    </div>
  )
}
