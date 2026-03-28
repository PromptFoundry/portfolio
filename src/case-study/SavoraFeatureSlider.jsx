import { useState, useEffect } from 'react'

const INTERVAL = 5000

// Map each feature index to an app screenshot
const IMAGES = [
  '/images/savora/overview-screen.png',   // Smarter image queries
  '/images/savora/step-screen.png',        // Technique-aware steps
  '/images/savora/savora-tablet.png',      // Adaptive layout
  '/images/savora/step-screen.png',        // Direction-aware transitions
  '/images/savora/overview-screen.png',    // Responsive by default
  '/images/savora/step-screen.png',        // Focused step navigation
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
        setIdx(i => (i + 1) % highlights.length)
      } else {
        setProgress(pct)
      }
    }, 50)
    return () => clearInterval(timer)
  }, [idx, highlights.length])

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
              {String(idx + 1).padStart(2, '0')} / {String(highlights.length).padStart(2, '0')}
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

            {/* Progress bar + dots row */}
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
                {highlights.map((_, i) => (
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
            </div>
          </div>

        </div>
      </div>
    </>
  )
}
