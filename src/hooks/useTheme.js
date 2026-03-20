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
    '--color-accent': '#60a5fa',
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
    '--color-accent': '#60a5fa',
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
