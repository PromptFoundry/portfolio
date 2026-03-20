import { useEffect, useRef } from 'react'
import { ArrowDown } from 'lucide-react'

function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []
    const mouse = { x: null, y: null }

    const PARTICLE_COUNT = Math.min(120, Math.floor((window.innerWidth * window.innerHeight) / 9000))
    const MAX_DIST = 160
    const MOUSE_DIST = 220
    const REPEL_DIST = 90
    const REPEL_FORCE = 0.06
    const SPEED = 0.3

    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    const init = () => {
      resize()
      particles = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        baseVx: (Math.random() - 0.5) * SPEED,
        baseVy: (Math.random() - 0.5) * SPEED,
        r: Math.random() * 1.5 + 0.5,
      }))
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Particle-to-particle connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.25
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx.lineWidth = 0.6
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }

      // Cursor-to-particle connections
      if (mouse.x !== null) {
        for (const p of particles) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MOUSE_DIST) {
            const alpha = (1 - dist / MOUSE_DIST) * 0.6
            ctx.strokeStyle = `rgba(255,255,255,${alpha})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(mouse.x, mouse.y)
            ctx.lineTo(p.x, p.y)
            ctx.stroke()
          }
        }

        // Cursor dot
        ctx.beginPath()
        ctx.arc(mouse.x, mouse.y, 2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.6)'
        ctx.fill()
      }

      // Update particles
      for (const p of particles) {
        // Repel from cursor
        if (mouse.x !== null) {
          const dx = p.x - mouse.x
          const dy = p.y - mouse.y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < REPEL_DIST && dist > 0) {
            const force = (1 - dist / REPEL_DIST) * REPEL_FORCE
            p.vx += (dx / dist) * force
            p.vy += (dy / dist) * force
          }
        }

        // Dampen back toward base velocity
        p.vx += (p.baseVx - p.vx) * 0.03
        p.vy += (p.baseVy - p.vy) * 0.03

        p.x += p.vx
        p.y += p.vy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      }

      // Draw dots
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.r, p.r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.55)'
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      mouse.x = e.clientX - rect.left
      mouse.y = e.clientY - rect.top
    }

    const handleMouseLeave = () => {
      mouse.x = null
      mouse.y = null
    }

    init()
    draw()

    const handleResize = () => { init() }
    window.addEventListener('resize', handleResize)
    canvas.addEventListener('mousemove', handleMouseMove)
    canvas.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', handleResize)
      canvas.removeEventListener('mousemove', handleMouseMove)
      canvas.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ opacity: 0.8 }}
    />
  )
}

export default function Hero() {
  return (
    <section
      className="relative min-h-[92vh] flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ backgroundColor: '#080808' }}
    >
      <ParticleCanvas />

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
