import { useEffect, useRef, useState } from 'react'

// ─── Constants ───────────────────────────────────────────────────────────────

const GAP   = 20   // px
const COL_W = 360  // px

const THEME_CONFIG = [
  { id: 'neutral',     label: 'Neutral',      color: '#71717a' },
  { id: 'augusta',     label: 'Augusta',      color: '#16a34a' },
  { id: 'bordeaux',    label: 'Bordeaux',     color: '#9f1239' },
  { id: 'coastal',     label: 'Coastal',      color: '#2563eb' },
  { id: 'desertRidge', label: 'Desert Ridge', color: '#ea580c' },
  { id: 'links',       label: 'Links',        color: '#65a30d' },
]

const VARIANTS = {
  hero:              ['fullscreen', 'split', 'overlay', 'minimal', 'stat'],
  content:           ['centered', 'left', 'imageRight', 'imageLeft', 'stats'],
  impact:            ['video-hero', 'fullbleed', 'promo-grid', 'texture', 'stat-band'],
  gallery:           ['masonry', 'grid', 'split'],
  amenities:         ['icons', 'cards', 'list'],
  testimonial:       ['centered', 'grid', 'compact'],
  'events-carousel': ['overlay-carousel', 'below-grid', 'featured', 'timeline'],
  'events-grid':     ['default'],
  proshop:           ['grid', 'featured', 'quick-buy', 'sale'],
  membership:        ['tiered', 'photo', 'comparison', 'featured'],
  weather:           ['cards', 'forecast', 'banner'],
  contact:           ['split', 'minimal', 'stacked'],
  map:               ['map', 'withInfo', 'sidebar'],
  footer:            ['classic', 'standard', 'minimal', 'mega'],
}

// ─── Sequence builder ────────────────────────────────────────────────────────

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)]
}

function s(type) {
  return { file: `${type}-${pick(VARIANTS[type])}` }
}

// Build a single homepage sequence — all cards from the neutral theme
// Section order follows realistic landing page structure
function buildHomepageSequence() {
  const seq = []

  // 1. Hero — always first
  seq.push(s('hero'))

  // 2. Primary content block — always
  seq.push(s('content'))

  // 3. Secondary content or gallery
  if (Math.random() > 0.5) {
    seq.push(s('gallery'))
  } else {
    seq.push(s('content'))
  }

  // 4. Events or impact section
  if (Math.random() > 0.45) {
    seq.push(s(pick(['events-carousel', 'events-grid'])))
  } else {
    seq.push(s('impact'))
  }

  // 5. Optional: amenities, membership, or proshop
  if (Math.random() > 0.3) {
    seq.push(s(pick(['amenities', 'membership', 'proshop'])))
  }

  // 6. Optional: testimonial
  if (Math.random() > 0.4) {
    seq.push(s('testimonial'))
  }

  // 7. Optional: map or weather
  if (Math.random() > 0.45) {
    seq.push(s(pick(['map', 'weather'])))
  }

  // 8. Optional: contact
  if (Math.random() > 0.35) {
    seq.push(s('contact'))
  }

  // 9. Footer — always last
  seq.push(s('footer'))

  return seq
}

// Build one column: 6 homepage sequences, no two adjacent sections with the same file
function buildColumnContent() {
  const result = []
  for (let i = 0; i < 6; i++) {
    result.push(...buildHomepageSequence())
  }

  // Post-process: re-roll any section whose file matches its predecessor
  for (let i = 1; i < result.length; i++) {
    if (result[i].file === result[i - 1].file) {
      const type = Object.keys(VARIANTS).find(t => result[i].file.startsWith(t + '-'))
      if (type && VARIANTS[type].length > 1) {
        let file, attempts = 0
        do {
          file = `${type}-${pick(VARIANTS[type])}`
          attempts++
        } while (file === result[i - 1].file && attempts < 20)
        result[i] = { file }
      }
    }
  }

  return result
}

// ─── Column config ────────────────────────────────────────────────────────────

const NUM_COLS    = 4
// Slow, meditative speeds (px/s)
const COL_SPEEDS  = [22, 19, 25, 17]
// 1 = scroll up, -1 = scroll down — alternating for woven conveyor effect
const COL_DIRS    = [1, -1, 1, -1]
// Staggered start positions — normalized to [0, loopH) at runtime
const COL_OFFSETS = [0, 1800, 600, 2400]
// Pre-built per session — different each load, stable within a session
const COL_SEQS    = Array.from({ length: NUM_COLS }, buildColumnContent)

// ─── Theme hook ───────────────────────────────────────────────────────────────

function useBodyTheme() {
  const get = () =>
    document.body.dataset.theme ||
    localStorage.getItem('portfolio-theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  const [theme, setTheme] = useState(get)
  useEffect(() => {
    const obs = new MutationObserver(() => setTheme(get()))
    obs.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] })
    return () => obs.disconnect()
  }, [])
  return theme
}

// ─── InfiniteColumn ───────────────────────────────────────────────────────────

function InfiniteColumn({ sections, speed, initialOffset, mode, direction, activeTheme }) {
  const innerRef = useRef(null)

  useEffect(() => {
    const el = innerRef.current
    if (!el) return

    const N   = sections.length
    let loopH = 0
    let pos   = initialOffset
    let lastT = null
    let raf

    // Sum heights of first N children + N wrap-inclusive gaps
    const measureLoop = () => {
      let h = 0
      const kids = el.children
      for (let i = 0; i < N; i++) {
        if (kids[i]) h += kids[i].offsetHeight
      }
      return h > 200 ? h + N * GAP : 0
    }

    const tick = (t) => {
      if (lastT === null) lastT = t
      const dt = Math.min((t - lastT) / 1000, 0.05) // cap at 50ms — prevents jump on tab switch
      lastT = t

      if (!loopH) {
        const m = measureLoop()
        if (m > 0) {
          loopH = m
          pos   = pos % loopH
        }
      }

      if (loopH > 0) {
        pos += speed * dt
        if (pos >= loopH) pos -= loopH // atomic reset — seamless at the seam

        // direction 1  = upward   → translateY = -pos
        // direction -1 = downward → translateY = pos - loopH
        const y = direction === 1 ? -Math.round(pos) : Math.round(pos - loopH)
        el.style.transform = `translate3d(0, ${y}px, 0)`
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [sections, speed, initialOffset, direction]) // mode omitted — images update in place

  return (
    <div
      ref={innerRef}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: `${GAP}px`,
        willChange: 'transform',
        flexShrink: 0,
      }}
    >
      {/* Original + duplicate for seamless looping */}
      {[...sections, ...sections].map(({ file }, i) => (
        <img
          key={i}
          src={`/images/arcis/ui-blocks/${activeTheme}/${mode}/${file}.png`}
          alt=""
          loading={i < sections.length ? 'eager' : 'lazy'}
          draggable={false}
          style={{
            display: 'block',
            width: `${COL_W}px`,
            height: 'auto',
            borderRadius: 0,
            flexShrink: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />
      ))}
    </div>
  )
}

// ─── TemplateShowcase ─────────────────────────────────────────────────────────

export default function TemplateShowcase() {
  const theme       = useBodyTheme()
  const isDark      = theme === 'dark'
  const mode        = isDark ? 'dark' : 'light'
  const [activeTheme, setActiveTheme] = useState('neutral')

  const bg     = isDark ? '#0d0d0d' : '#f4f2ef'
  const r      = isDark ? '13,13,13' : '244,242,239'
  const border = isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.09)'

  const planeW = COL_W * NUM_COLS + GAP * (NUM_COLS - 1) // 1500px

  return (
    <div
      className="ts-outer"
      style={{
        position: 'relative',
        backgroundColor: bg,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'clamp(24px, 4vw, 48px) 0',
        transition: 'background-color 0.4s ease',
      }}
    >
      {/* ── Framed media panel ── */}
      <div
        className="ts-frame"
        style={{
          position: 'relative',
          width: '92%',
          maxWidth: '1300px',
          height: 'clamp(280px, 60vw, 580px)',
          overflow: 'hidden',
          borderRadius: '10px',
          border: `1px solid ${border}`,
          backgroundColor: bg,
          boxShadow: isDark
            ? '0 0 0 1px rgba(255,255,255,0.03), 0 32px 80px rgba(0,0,0,0.6)'
            : '0 0 0 1px rgba(0,0,0,0.04), 0 32px 80px rgba(0,0,0,0.15)',
          transition: 'background-color 0.4s ease',
        }}
      >
        {/* Perspective scene */}
        <div
          style={{
            width: '100%',
            height: '100%',
            perspective: '1800px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Subtle breathing float */}
          <div className="ts-float" style={{ transformStyle: 'preserve-3d' }}>

            {/* 3D tilted plane */}
            <div
              className="ts-plane"
              style={{
                width: `${planeW}px`,
                transformOrigin: 'center center',
                transformStyle: 'preserve-3d',
              }}
            >
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: `repeat(${NUM_COLS}, ${COL_W}px)`,
                  columnGap: `${GAP}px`,
                  alignItems: 'start',
                }}
              >
                {COL_SEQS.map((seq, i) => (
                  <InfiniteColumn
                    key={i}
                    sections={seq}
                    speed={COL_SPEEDS[i]}
                    initialOffset={COL_OFFSETS[i]}
                    mode={mode}
                    direction={COL_DIRS[i]}
                    activeTheme={activeTheme}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Theme switcher — floats above animation */}
        <div
          style={{
            position: 'absolute',
            top: '20px',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            gap: '2px',
            padding: '4px',
            borderRadius: '999px',
            background: isDark ? 'rgba(10,10,10,0.75)' : 'rgba(255,255,255,0.8)',
            backdropFilter: 'blur(14px)',
            WebkitBackdropFilter: 'blur(14px)',
            border: `1px solid ${isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}`,
            boxShadow: isDark ? '0 4px 24px rgba(0,0,0,0.5)' : '0 4px 24px rgba(0,0,0,0.15)',
            whiteSpace: 'nowrap',
            maxWidth: 'calc(100% - 32px)',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        >
          {THEME_CONFIG.map(({ id, label, color }) => {
            const isActive = activeTheme === id
            return (
              <button
                key={id}
                onClick={() => setActiveTheme(id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  padding: '6px 14px',
                  borderRadius: '999px',
                  border: 'none',
                  cursor: 'pointer',
                  fontSize: '12px',
                  fontWeight: isActive ? 600 : 400,
                  letterSpacing: '0.01em',
                  background: isActive
                    ? (isDark ? 'rgba(255,255,255,0.13)' : 'rgba(0,0,0,0.08)')
                    : 'transparent',
                  color: isDark
                    ? (isActive ? '#f9fafb' : '#9ca3af')
                    : (isActive ? '#111827' : '#6b7280'),
                  transition: 'all 0.18s ease',
                  outline: 'none',
                }}
              >
                <span
                  style={{
                    width: '7px',
                    height: '7px',
                    borderRadius: '50%',
                    background: color,
                    flexShrink: 0,
                    opacity: isActive ? 1 : 0.7,
                  }}
                />
                {label}
              </button>
            )
          })}
        </div>

        {/* Edge vignette — fades to bg on all sides */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 0,
            background: [
              `radial-gradient(ellipse at center, rgba(${r},0) 28%, rgba(${r},0.5) 58%, rgba(${r},0.94) 100%)`,
              `linear-gradient(to bottom, rgba(${r},1) 0%, rgba(${r},0) 16%, rgba(${r},0) 84%, rgba(${r},1) 100%)`,
            ].join(', '),
            pointerEvents: 'none',
            zIndex: 5,
            transition: 'background 0.4s ease',
          }}
        />
      </div>

      <style>{`
        .ts-plane {
          transform: scale(0.55) rotateX(40deg) rotateZ(-25deg) translateZ(0);
        }
        @media (min-width: 640px) {
          .ts-plane { transform: scale(0.72) rotateX(40deg) rotateZ(-25deg) translateZ(0); }
        }
        @media (min-width: 1024px) {
          .ts-plane { transform: scale(0.88) rotateX(40deg) rotateZ(-25deg) translateZ(0); }
        }
        @media (min-width: 1440px) {
          .ts-plane { transform: scale(1.0) rotateX(40deg) rotateZ(-25deg) translateZ(0); }
        }

        .ts-float { animation: ts-breathe 12s ease-in-out infinite; }
        @keyframes ts-breathe {
          0%, 100% { transform: translate3d(0, 0px, 0); }
          50%       { transform: translate3d(0, -6px, 0); }
        }

        .ts-frame:hover .ts-float { animation-play-state: paused; }

        @media (prefers-reduced-motion: reduce) {
          .ts-float { animation: none !important; }
        }
      `}</style>
    </div>
  )
}
