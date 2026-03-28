import { useState, useEffect } from 'react'

const INTERVAL = 9000

// Map each feature index to an app screenshot
const IMAGES = [
  '/images/savora/0.png',
  '/images/savora/1.png',
  '/images/savora/2.png',
  '/images/savora/3.png',
  '/images/savora/4.png',
  '/images/savora/5.png',
  '/images/savora/6.png',
  '/images/savora/7.png',
  '/images/savora/8.png',
  '/images/savora/9.png',
]

const CSS = `
  @keyframes sfImgIn {
    from { opacity: 0; transform: scale(1.015); }
    to   { opacity: 1; transform: scale(1); }
  }
  @keyframes sfTextIn {
    from { opacity: 0; transform: translateY(8px); }
    to   { opacity: 1; transform: translateY(0); }
  }
`

export default function SavoraFeatureSlider({ highlights = [], accentColor = '#af2c38' }) {
  const [idx, setIdx]           = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    setProgress(0)
    let elapsed = 0
    const timer = setInterval(() => {
      elapsed += 50
      const pct = (elapsed / INTERVAL) * 100
      if (pct >= 100) {
        clearInterval(timer)
        setIdx(i => (i + 1) % IMAGES.length)
      } else {
        setProgress(pct)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [idx, IMAGES.length])

  const goPrev = () => setIdx(i => (i - 1 + IMAGES.length) % IMAGES.length)
  const goNext = () => setIdx(i => (i + 1) % IMAGES.length)

  const feature = highlights[idx]
  const image   = IMAGES[idx] || IMAGES[0]

  return (
    <>
      <style>{CSS}</style>
      <div className="max-w-5xl mx-auto px-6">
        <div style={{
          position: 'relative',
          borderRadius: '0.875rem',
          overflow: 'hidden',
          boxShadow: '0 25px 60px -12px rgba(0,0,0,0.5)',
          outline: '1px solid rgba(255,255,255,0.06)',
          backgroundColor: '#0a0806',
        }}>

          {/* Screenshot — crossfades on change */}
          <img
            key={idx}
            src={image}
            alt={feature?.name}
            style={{
              width: '100%',
              display: 'block',
              objectFit: 'contain',
              animation: 'sfImgIn 0.6s ease',
            }}
          />

          {/* Dark gradient + feature copy overlay */}
          <div style={{
            position: 'absolute', bottom: 0, left: 0, right: 0,
            background: 'linear-gradient(to top, rgba(8,6,4,0.95) 0%, rgba(8,6,4,0.7) 55%, transparent 100%)',
            padding: '60px 36px 24px',
          }}>
            {/* Counter */}
            <div style={{
              fontSize: 10, fontWeight: 700, letterSpacing: '0.22em',
              color: 'rgba(255,255,255,0.38)', marginBottom: 10,
              fontFamily: "'Inter', system-ui, sans-serif",
            }}>
              {String(idx + 1).padStart(2, '0')} / {String(IMAGES.length).padStart(2, '0')}
            </div>

            {/* Feature name + description */}
            <div key={idx} style={{ animation: 'sfTextIn 0.45s ease' }}>
              <div style={{
                fontSize: 'clamp(15px, 1.5vw, 20px)',
                fontWeight: 700,
                color: '#fff',
                marginBottom: 6,
                lineHeight: 1.25,
                fontFamily: "'Inter', system-ui, sans-serif",
              }}>
                {feature?.name}
              </div>
              <div style={{
                fontSize: 'clamp(12px, 1.1vw, 14px)',
                color: 'rgba(255,255,255,0.6)',
                lineHeight: 1.65,
                maxWidth: '560px',
                fontFamily: "'Inter', system-ui, sans-serif",
              }}>
                {feature?.description}
              </div>
            </div>

            {/* Progress bar + controls row */}
            <div style={{ marginTop: 20, display: 'flex', alignItems: 'center', gap: 16 }}>
              {/* Progress bar */}
              <div style={{
                flex: 1, height: 2,
                backgroundColor: 'rgba(255,255,255,0.12)',
                borderRadius: 2,
              }}>
                <div style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: accentColor,
                  borderRadius: 2,
                  transition: 'width 0.05s linear',
                }} />
              </div>

              {/* Dot indicators */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                {IMAGES.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setIdx(i)}
                    style={{
                      width: i === idx ? 18 : 6,
                      height: 6,
                      borderRadius: 3,
                      backgroundColor: i === idx ? accentColor : 'rgba(255,255,255,0.3)',
                      border: 'none', cursor: 'pointer', padding: 0,
                      transition: 'width 0.3s ease, background-color 0.3s',
                    }}
                  />
                ))}
              </div>

              {/* Pagination arrows */}
              <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
                <button
                  onClick={goPrev}
                  aria-label="Previous"
                  style={{
                    width: 28, height: 28, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.18)',
                    background: 'rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.7)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M6.5 2L3.5 5L6.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
                <button
                  onClick={goNext}
                  aria-label="Next"
                  style={{
                    width: 28, height: 28, borderRadius: '50%',
                    border: '1px solid rgba(255,255,255,0.18)',
                    background: 'rgba(255,255,255,0.07)',
                    color: 'rgba(255,255,255,0.7)',
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'background 0.2s, border-color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.14)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.35)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.07)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)'; }}
                >
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                    <path d="M3.5 2L6.5 5L3.5 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* View Project button */}
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
        <a
          href="/projects/savora/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
            padding: '12px 28px',
            borderRadius: 6,
            backgroundColor: accentColor,
            color: '#fff',
            fontFamily: "'Inter', system-ui, sans-serif",
            fontSize: 13,
            fontWeight: 600,
            letterSpacing: '0.04em',
            textDecoration: 'none',
            transition: 'opacity 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.opacity = '0.85' }}
          onMouseLeave={e => { e.currentTarget.style.opacity = '1' }}
        >
          View Project
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M2.5 9.5L9.5 2.5M9.5 2.5H4.5M9.5 2.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>
      </div>
    </>
  )
}
