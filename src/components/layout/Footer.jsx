import { Link } from 'react-router-dom'
import { Github, Linkedin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="border-t" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-6xl mx-auto px-6 py-8 flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-xs font-light" style={{ color: 'var(--color-foreground-muted)' }}>
          © {new Date().getFullYear()} Chase Hignight. All rights reserved.
        </p>
        <div className="flex items-center gap-6">
          <Link to="/" className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--color-foreground-muted)' }}>Work</Link>
          <a href="mailto:chase@example.com" className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--color-foreground-muted)' }}>Contact</a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-foreground-muted)' }}><Github size={15} /></a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--color-foreground-muted)' }}><Linkedin size={15} /></a>
        </div>
      </div>
    </footer>
  )
}
