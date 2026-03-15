import { useEffect, useRef } from 'react'

// Recursively draws a branching fractal tree
// `sway` adds a per-branch time-based oscillation so the trees breathe
function drawBranch(ctx, x, y, angle, len, depth, alpha, t, id) {
  if (depth === 0 || len < 1.2) return

  const sway = Math.sin(t * 0.0015 + depth * 1.9 + id * 0.4) * 0.07
  const a = angle + sway
  const x2 = x + Math.cos(a) * len
  const y2 = y + Math.sin(a) * len

  ctx.beginPath()
  ctx.moveTo(x, y)
  ctx.lineTo(x2, y2)
  ctx.lineWidth = depth * 0.45
  ctx.strokeStyle = `rgba(170, 228, 255, ${alpha * (depth / 4) * 0.85})`
  ctx.stroke()

  drawBranch(ctx, x2, y2, a - 0.54, len * 0.66, depth - 1, alpha, t, id)
  drawBranch(ctx, x2, y2, a + 0.54, len * 0.66, depth - 1, alpha, t, id)
}

export default function FractalCursor() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let raf

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let rawMouse   = null          // raw mouse position
    const smooth   = { x: 0, y: 0 } // lerped position
    const trail    = []             // smoothed positions for the spline
    const branches = []             // active fractal trees
    let lastSpawn  = null           // last position we sprouted a branch
    let bId        = 0

    const SPAWN_DIST = 8    // px between branch sprouts
    const LIFETIME   = 3400 // ms a branch stays alive
    const GROW_MS    = 380  // ms for the growth-in phase
    const FADE_AT    = 2200 // ms when fading begins

    const onMove = (e) => { rawMouse = { x: e.clientX, y: e.clientY } }
    window.addEventListener('mousemove', onMove, { passive: true })

    const tick = () => {
      const now = Date.now()

      // Lerp cursor for organic smoothness
      if (rawMouse) {
        smooth.x += (rawMouse.x - smooth.x) * 0.22
        smooth.y += (rawMouse.y - smooth.y) * 0.22
      }

      // Trail history
      trail.push({ x: smooth.x, y: smooth.y })
      if (trail.length > 40) trail.shift()

      // Spawn fractal branches along movement path
      if (lastSpawn) {
        const dx   = smooth.x - lastSpawn.x
        const dy   = smooth.y - lastSpawn.y
        const dist = Math.hypot(dx, dy)

        if (dist > SPAWN_DIST) {
          const moveAngle = Math.atan2(dy, dx)
          // Always sprout both sides; occasionally only one
          const sides = Math.random() > 0.3 ? [-1, 1] : [Math.random() > 0.5 ? -1 : 1]
          for (const side of sides) {
            branches.push({
              id:    bId++,
              x:     smooth.x,
              y:     smooth.y,
              angle: moveAngle + side * (Math.PI / 2),
              len:   10 + Math.random() * 10,
              born:  now,
            })
          }
          lastSpawn = { x: smooth.x, y: smooth.y }
        }
      } else {
        lastSpawn = { x: smooth.x, y: smooth.y }
      }

      // Semi-transparent fill = trail decay (instead of clearRect)
      ctx.fillStyle = 'rgba(8, 8, 8, 0.052)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Smooth spline through trail positions
      if (trail.length > 2) {
        ctx.beginPath()
        ctx.moveTo(trail[0].x, trail[0].y)
        for (let i = 1; i < trail.length; i++) {
          const mx = (trail[i].x + trail[i - 1].x) / 2
          const my = (trail[i].y + trail[i - 1].y) / 2
          ctx.quadraticCurveTo(trail[i - 1].x, trail[i - 1].y, mx, my)
        }
        ctx.strokeStyle = 'rgba(155, 215, 255, 0.11)'
        ctx.lineWidth   = 1.4
        ctx.lineJoin    = 'round'
        ctx.lineCap     = 'round'
        ctx.stroke()
      }

      // Draw fractal branches
      ctx.save()
      for (let i = branches.length - 1; i >= 0; i--) {
        const b   = branches[i]
        const age = now - b.born

        if (age > LIFETIME) { branches.splice(i, 1); continue }

        const grow  = Math.min(age / GROW_MS, 1)                       // 0→1 over first 380ms
        const fade  = age > FADE_AT ? 1 - (age - FADE_AT) / (LIFETIME - FADE_AT) : 1
        const alpha = grow * fade * 0.62

        drawBranch(ctx, b.x, b.y, b.angle, b.len * grow, 4, alpha, now, b.id)
      }
      ctx.restore()

      // Cursor: soft halo + dot
      if (rawMouse) {
        const grd = ctx.createRadialGradient(smooth.x, smooth.y, 0, smooth.x, smooth.y, 32)
        grd.addColorStop(0, 'rgba(155, 220, 255, 0.13)')
        grd.addColorStop(1, 'rgba(155, 220, 255, 0)')
        ctx.beginPath()
        ctx.arc(smooth.x, smooth.y, 32, 0, Math.PI * 2)
        ctx.fillStyle = grd
        ctx.fill()

        ctx.beginPath()
        ctx.arc(smooth.x, smooth.y, 2.2, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(210, 240, 255, 0.92)'
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    tick()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 9999,
        mixBlendMode: 'screen',
      }}
    />
  )
}
