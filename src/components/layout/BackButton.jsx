import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function BackButton() {
  const { pathname } = useLocation()
  if (pathname === '/') return null

  return (
    <Link
      to="/#work"
      className="fixed bottom-4 left-4 sm:bottom-8 sm:left-6 z-50 flex items-center gap-2.5 px-4 py-2.5 sm:px-5 sm:py-3 text-xs font-semibold tracking-widest uppercase transition-all duration-200 hover:gap-3.5"
      style={{
        backgroundColor: 'var(--color-surface)',
        color: 'var(--color-foreground)',
        border: '1px solid var(--color-border)',
        borderRadius: '999px',
        boxShadow: '0 8px 32px rgba(0,0,0,0.25)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <ArrowLeft size={13} />
      All Work
    </Link>
  )
}
