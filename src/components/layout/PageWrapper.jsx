import { useRef, useEffect } from 'react'
import { useTheme } from '../../hooks/useTheme'
import Navbar from './Navbar'
import Footer from './Footer'

export default function PageWrapper({ children }) {
  const rootRef = useRef(null)
  const { theme, toggle } = useTheme(rootRef)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <div
      ref={rootRef}
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: 'var(--color-surface)', color: 'var(--color-foreground)' }}
    >
      <Navbar theme={theme} onToggleTheme={toggle} />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}
