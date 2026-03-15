import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Sun, Moon, Menu, X } from 'lucide-react'

export default function Navbar({ theme, onToggleTheme }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const navLinks = [
    { label: 'Work', href: isHome ? '#work' : '/#work' },
    { label: 'About', href: isHome ? '#about' : '/#about' },
    { label: 'Contact', href: isHome ? '#contact' : '/#contact' },
  ]

  return (
    <header
      className="sticky top-0 z-50 border-b"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          to="/"
          className="flex flex-col leading-none"
          onClick={() => setMobileOpen(false)}
        >
          <span className="text-sm font-black tracking-[0.25em] uppercase" style={{ color: 'var(--color-foreground)' }}>
            Chase Hignight
          </span>
          <span className="text-xs font-light tracking-widest" style={{ color: 'var(--color-foreground-muted)' }}>
            Product Designer
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium tracking-widest uppercase transition-colors"
              style={{ color: 'var(--color-foreground-muted)' }}
              onMouseEnter={e => e.target.style.color = 'var(--color-foreground)'}
              onMouseLeave={e => e.target.style.color = 'var(--color-foreground-muted)'}
            >
              {link.label}
            </a>
          ))}
          <button
            onClick={onToggleTheme}
            className="p-1.5 transition-colors"
            style={{ color: 'var(--color-foreground-muted)' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--color-foreground)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-foreground-muted)'}
            aria-label="Toggle theme"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
        </nav>

        {/* Mobile */}
        <div className="md:hidden flex items-center gap-3">
          <button onClick={onToggleTheme} style={{ color: 'var(--color-foreground-muted)' }}>
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={() => setMobileOpen(o => !o)} style={{ color: 'var(--color-foreground-muted)' }}>
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t px-6 py-4 flex flex-col gap-4" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}>
          {navLinks.map(link => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-medium tracking-widest uppercase"
              style={{ color: 'var(--color-foreground-muted)' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  )
}
