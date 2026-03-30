import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'

function DotGrid() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let dots = []

    // Mouse starts off-canvas so no dots are affected on load
    const mouse = { x: -9999, y: -9999, active: false }

    const SPACING   = 30    // grid pitch (px)
    const BASE_R    = 1.4   // resting dot radius
    const PEAK_R    = 3.2   // radius at cursor centre
    const INFLUENCE = 130   // cursor influence radius
    const MAX_PUSH  = 26    // max displacement (px)
    const STIFFNESS = 0.11  // spring pull toward target offset
    const DAMPING   = 0.74  // velocity damping per frame

    const build = () => {
      canvas.width  = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
      dots = []
      // Centre the grid so dots are symmetrically distributed
      const cols  = Math.ceil(canvas.width  / SPACING) + 2
      const rows  = Math.ceil(canvas.height / SPACING) + 2
      const startX = ((canvas.width  % SPACING) / 2) - SPACING / 2
      const startY = ((canvas.height % SPACING) / 2) - SPACING / 2
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({
            gx: startX + c * SPACING,
            gy: startY + r * SPACING,
            ox: 0, oy: 0,   // current offset from grid position
            vx: 0, vy: 0,   // velocity
          })
        }
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      for (const d of dots) {
        const dx = d.gx - mouse.x
        const dy = d.gy - mouse.y
        const dist = Math.sqrt(dx * dx + dy * dy)

        // Target offset: push dot away from cursor
        let tx = 0, ty = 0
        if (mouse.active && dist < INFLUENCE && dist > 0) {
          const t  = 1 - dist / INFLUENCE
          const ease = t * t * (3 - 2 * t)    // smoothstep
          const push = ease * MAX_PUSH
          tx = (dx / dist) * push
          ty = (dy / dist) * push
        }

        // Spring toward target offset
        d.vx += (tx - d.ox) * STIFFNESS
        d.vy += (ty - d.oy) * STIFFNESS
        d.vx *= DAMPING
        d.vy *= DAMPING
        d.ox += d.vx
        d.oy += d.vy

        const x = d.gx + d.ox
        const y = d.gy + d.oy

        // Visual: radius + opacity scale with proximity
        const proximity = mouse.active
          ? Math.max(0, 1 - dist / INFLUENCE)
          : 0
        const ease2 = proximity * proximity * (3 - 2 * proximity)
        const r     = BASE_R + ease2 * (PEAK_R - BASE_R)
        const alpha = 0.18  + ease2 * 0.62

        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${alpha.toFixed(3)})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
      mouse.active = true
    }

    const onLeave = () => { mouse.active = false }

    build()
    draw()

    const onResize = () => build()
    window.addEventListener('resize', onResize)
    canvas.addEventListener('mousemove', onMove)
    canvas.addEventListener('mouseleave', onLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
      canvas.removeEventListener('mousemove', onMove)
      canvas.removeEventListener('mouseleave', onLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
    />
  )
}

export default function Hero() {
  return (
    <section
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ backgroundColor: '#080808' }}
    >
      <DotGrid />

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 70% at 50% 50%, transparent 30%, rgba(8,8,8,0.7) 100%)',
        }}
      />

      {/* Grain texture */}
      <div
        className="absolute inset-0 opacity-[0.025] pointer-events-none"
        style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'1\'/%3E%3C/svg%3E")',
          backgroundSize: '256px',
        }}
      />

      <div className="relative max-w-4xl mx-auto">
        <p className="text-xs font-medium tracking-[0.5em] uppercase mb-8" style={{ color: 'rgba(255,255,255,0.4)' }}>
          Product Designer & UI Developer
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-light text-white leading-[1.1] mb-8">
          Crafting products<br />
          <em>people actually</em><br />
          want to use.
        </h1>
        <p className="text-sm md:text-base font-light leading-relaxed max-w-xl mx-auto mb-12" style={{ color: 'rgba(255,255,255,0.55)' }}>
          From design systems to full-stack prototypes, I build digital products that balance precision and beauty.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#work"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold tracking-widest uppercase border transition-all"
            style={{ backgroundColor: 'white', color: '#0f0f0f', borderColor: 'white' }}
            onMouseEnter={e => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#0f0f0f' }}
          >
            View My Work
          </a>
          <a
            href="#about"
            className="inline-flex items-center justify-center gap-2 px-8 py-3.5 text-xs font-semibold tracking-widest uppercase border transition-all"
            style={{ backgroundColor: 'transparent', color: 'rgba(255,255,255,0.7)', borderColor: 'rgba(255,255,255,0.25)' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.6)'; e.currentTarget.style.color = 'white' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,0.25)'; e.currentTarget.style.color = 'rgba(255,255,255,0.7)' }}
          >
            About Me
          </a>
        </div>
      </div>

      <style>{`
        @keyframes scroll-bob {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(6px); }
        }
        @keyframes scroll-dot {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50% { transform: translateY(4px); opacity: 1; }
        }
      `}</style>
      <div
        className="absolute bottom-4 sm:bottom-8 left-1/2 flex flex-col items-center gap-2"
        style={{ animation: 'scroll-bob 2.4s ease-in-out infinite', transform: 'translateX(-50%)' }}
      >
        {/* Mouse outline */}
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1" y="1" width="20" height="32" rx="10" stroke="rgba(255,255,255,0.25)" strokeWidth="1.5"/>
          <rect
            x="10" y="6" width="2" height="6" rx="1"
            fill="rgba(255,255,255,0.25)"
            style={{ animation: 'scroll-dot 2.4s ease-in-out infinite' }}
          />
        </svg>
        <span className="text-[10px] font-medium tracking-[0.3em] uppercase" style={{ color: 'rgba(255,255,255,0.25)' }}>Scroll</span>
        <ArrowDown size={14} style={{ color: 'rgba(255,255,255,0.25)' }} />
      </div>
    </section>
  )
}
