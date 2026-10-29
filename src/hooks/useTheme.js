import { useState, useEffect } from 'react'

const themes = {
  light: {
    '--color-brand': '#1a1a1a',
    '--color-brand-hover': '#333333',
    '--color-surface': '#ffffff',
    '--color-surface-alt': '#f5f5f4',
    '--color-surface-muted': '#e8e8e6',
    '--color-foreground': '#0f0f0f',
    '--color-foreground-muted': '#6b6b6b',
    '--color-border': '#e2e2e0',
    '--color-accent': '#6b6b6b',
    // Site notice: a stealth yellow — a yellow-tinted dark ramp (Arcis-style), dark in both themes
    '--color-notice-bg': '#1c1a10',
    '--color-notice-border': '#1c1a10',
    '--color-notice-fg': '#f2ead0',
    '--color-notice-muted': '#ada077',
    '--color-notice-accent': '#e0ba45',
  },
  dark: {
    '--color-brand': '#f0f0ee',
    '--color-brand-hover': '#d4d4d0',
    '--color-surface': '#111111',
    '--color-surface-alt': '#1a1a1a',
    '--color-surface-muted': '#222222',
    '--color-foreground': '#f0f0ee',
    '--color-foreground-muted': '#888884',
    '--color-border': '#2a2a2a',
    '--color-accent': 'rgba(255,255,255,0.45)',
    // Lifted just off the #111 page, with a yellow-black hairline to separate it from the nav
    '--color-notice-bg': '#17150c',
    '--color-notice-border': '#2c2814',
    '--color-notice-fg': '#ede3c2',
    '--color-notice-muted': '#a39668',
    '--color-notice-accent': '#d9b23c',
  },
}

export function useTheme(rootRef) {
  const getInitial = () => {
    const stored = localStorage.getItem('portfolio-theme')
    if (stored) return stored
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  }

  const [theme, setTheme] = useState(getInitial)

  useEffect(() => {
    const el = rootRef?.current
    if (!el) return
    const vars = themes[theme]
    Object.entries(vars).forEach(([k, v]) => el.style.setProperty(k, v))
    localStorage.setItem('portfolio-theme', theme)
    document.body.dataset.theme = theme
  }, [theme, rootRef])

  const toggle = () => setTheme(t => t === 'light' ? 'dark' : 'light')

  return { theme, toggle }
}
