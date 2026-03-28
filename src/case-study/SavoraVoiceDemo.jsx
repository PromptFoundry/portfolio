import { useState, useEffect, useRef } from 'react'

const ACCENT = '#af2c38'
const SANS = "'Inter', system-ui, sans-serif"
const SERIF = "'Playfair Display', Georgia, serif"

const EXAMPLES = [
  {
    recipe: 'Thai Green Curry',
    step: '03',
    technique: 'Finish the Curry',
    instruction: 'Stir in coconut milk and bring to a gentle simmer. Add fish sauce and a squeeze of lime. Taste and adjust seasoning before serving over jasmine rice.',
    question: "What if I don't have fresh Thai basil?",
    answer: "Regular basil works — it's sweeter and less peppery, but still holds up. Stir it in right at the end so it doesn't wilt and lose its flavor.",
    image: '/images/savora/voice-curry.jpg',
  },
  {
    recipe: 'Saffron Risotto',
    step: '04',
    technique: 'Finish & Plate',
    instruction: 'Remove from heat and stir in cold butter and freshly grated Parmigiano-Reggiano. Let rest one minute, then plate immediately — risotto waits for no one.',
    question: 'How do I know when the risotto is done?',
    answer: "Drag a spoon through the pan — if the risotto slowly flows back, you're there. It should be loose and creamy, never stiff or gluey.",
    image: '/images/savora/voice-risotto.jpg',
  },
  {
    recipe: 'Pan-Seared Salmon',
    step: '02',
    technique: 'Sear the Salmon',
    instruction: 'Heat a stainless steel pan until smoking. Add oil, place salmon skin-side down, and press gently for 30 seconds. Do not move it for 4 minutes.',
    question: 'Should I cook the skin side first?',
    answer: "Yes — skin down in a screaming hot pan. Press gently the first 30 seconds, then leave it completely alone until the skin is golden and crispy.",
    image: '/images/savora/voice-salmon.jpg',
  },
  {
    recipe: 'Chocolate Lava Cake',
    step: '01',
    technique: 'Prep the Batter',
    instruction: 'Melt dark chocolate and butter over a bain-marie. Whisk eggs and sugar until pale, then fold in the chocolate mixture and flour until just combined.',
    question: 'Can I make these ahead of time?',
    answer: "Yes — fill the ramekins, cover, and refrigerate up to 24 hours. Bake straight from cold and add 2 to 3 extra minutes to the time.",
    image: '/images/savora/voice-lavacake.jpg',
  },
  {
    recipe: 'Braised Short Ribs',
    step: '03',
    technique: 'Build the Braise',
    instruction: 'Return seared ribs to the pot. Add red wine, beef stock, thyme, and bay leaves until the meat is three-quarters submerged. Cover and transfer to a 325°F oven for 3 hours.',
    question: 'My sauce is too thin — how do I fix it?',
    answer: "Whisk a tablespoon of cornstarch into cold water and stir it in, then simmer a few minutes. Or let it reduce uncovered — low and slow works every time.",
    image: '/images/savora/voice-shortribs.jpg',
  },
]

const CSS = `
  @keyframes svPulseRing {
    0% { transform: scale(1); opacity: 0.65; }
    100% { transform: scale(2.6); opacity: 0; }
  }
  @keyframes svDot {
    0%, 100% { transform: translateY(0); opacity: 0.35; }
    50% { transform: translateY(-6px); opacity: 1; }
  }
  @keyframes svBar {
    0%, 100% { transform: scaleY(0.18); }
    50% { transform: scaleY(1); }
  }
  @keyframes svFadeUp {
    from { opacity: 0; transform: translateY(5px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes svCursor {
    0%, 100% { opacity: 1; }
    50% { opacity: 0; }
  }
  @keyframes svSlideIn {
    from { opacity: 0; transform: translateX(14px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes svImgFade {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes svIdlePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(175,44,56,0.22); }
    50% { box-shadow: 0 0 0 8px rgba(175,44,56,0); }
  }
`

const WAVEFORM = [
  { dur: 0.52, del: 0.00 }, { dur: 0.41, del: 0.10 }, { dur: 0.63, del: 0.05 },
  { dur: 0.47, del: 0.20 }, { dur: 0.58, del: 0.00 }, { dur: 0.44, del: 0.15 },
  { dur: 0.50, del: 0.08 }, { dur: 0.62, del: 0.12 }, { dur: 0.46, del: 0.03 },
  { dur: 0.53, del: 0.18 }, { dur: 0.40, del: 0.07 }, { dur: 0.56, del: 0.13 },
]

function MicIcon({ size = 16, color = '#fff' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2a3 3 0 0 1 3 3v7a3 3 0 0 1-6 0V5a3 3 0 0 1 3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="22" />
    </svg>
  )
}

function Waveform({ barH, barW }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: barW === 2 ? 2 : 3, height: barH + 2 }}>
      {WAVEFORM.map(({ dur, del }, i) => (
        <div key={i} style={{
          width: barW, height: barH, borderRadius: 2,
          backgroundColor: ACCENT, transformOrigin: 'center',
          animation: `svBar ${dur}s ease-in-out ${del}s infinite`,
        }} />
      ))}
    </div>
  )
}

function ThinkDots({ dotSz, dotGap }) {
  return (
    <div style={{ display: 'flex', gap: dotGap, alignItems: 'center', height: dotSz + 10 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: dotSz, height: dotSz, borderRadius: '50%',
          backgroundColor: ACCENT,
          animation: `svDot 0.9s ease-in-out ${i * 0.22}s infinite`,
        }} />
      ))}
    </div>
  )
}

function VoiceZone({ state, transcript, answer, sz }) {
  const {
    micSz, micIconSz, zonePadV, zonePadH, zoneGap, zoneRowGap,
    transcriptSz, answerSz, stateLabelSz, waveBarH, waveBarW, dotSz, dotGap,
    pillPadV, pillPadH, pillFontSz,
  } = sz

  if (state === 'idle') {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 7,
          backgroundColor: 'rgba(175,44,56,0.07)',
          border: '1px solid rgba(175,44,56,0.18)',
          borderRadius: 28,
          padding: `${pillPadV}px ${pillPadH}px`,
          animation: 'svIdlePulse 2.8s ease-in-out infinite',
        }}>
          <MicIcon size={pillFontSz - 1} color={ACCENT} />
          <span style={{ fontSize: pillFontSz, fontWeight: 600, color: ACCENT, fontFamily: SANS }}>Ask anything</span>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: '#fff',
      border: '1px solid rgba(0,0,0,0.07)',
      borderRadius: 12,
      padding: `${zonePadV}px ${zonePadH}px`,
      display: 'flex', flexDirection: 'column', gap: zoneGap,
      boxShadow: '0 3px 16px rgba(0,0,0,0.08)',
      animation: 'svFadeUp 0.3s ease',
      minWidth: 0,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: zoneRowGap, minWidth: 0 }}>

        {/* Mic with pulse rings */}
        <div style={{ position: 'relative', width: micSz, height: micSz, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {state === 'listening' && (
            <>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${ACCENT}`, animation: 'svPulseRing 1.6s ease-out infinite' }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${ACCENT}`, animation: 'svPulseRing 1.6s ease-out 0.55s infinite' }} />
            </>
          )}
          <div style={{ width: micSz, height: micSz, borderRadius: '50%', backgroundColor: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
            <MicIcon size={micIconSz} color="#fff" />
          </div>
        </div>

        {/* State content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {state === 'listening' && (
            <div style={{ fontSize: transcriptSz, color: transcript ? '#1a1a18' : 'rgba(0,0,0,0.35)', fontStyle: transcript ? 'normal' : 'italic', fontFamily: SANS, lineHeight: 1.4, wordBreak: 'break-word' }}>
              {transcript || 'Listening…'}
              {transcript && <span style={{ animation: 'svCursor 0.75s step-end infinite', color: ACCENT, marginLeft: 1 }}>|</span>}
            </div>
          )}
          {state === 'thinking' && <ThinkDots dotSz={dotSz} dotGap={dotGap} />}
          {state === 'speaking' && <Waveform barH={waveBarH} barW={waveBarW} />}
        </div>

        {/* State label */}
        <div style={{ fontSize: stateLabelSz, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', fontFamily: SANS, flexShrink: 0 }}>
          {state === 'listening' ? 'Listening' : state === 'thinking' ? 'Thinking' : 'Speaking'}
        </div>
      </div>

      {/* Answer */}
      {answer && (
        <div style={{
          fontSize: answerSz, color: '#3a3a38', lineHeight: 1.65,
          paddingTop: zoneGap, borderTop: '1px solid rgba(0,0,0,0.06)',
          fontFamily: SANS, animation: 'svFadeUp 0.45s ease',
        }}>
          {answer}
        </div>
      )}
    </div>
  )
}

export default function SavoraVoiceDemo() {
  const containerRef = useRef(null)
  const [dims, setDims]             = useState({ w: 700, h: 520 })
  const [loopKey, setLoopKey]       = useState(0)
  const [exIdx, setExIdx]           = useState(0)
  const [voiceState, setVoice]      = useState('idle')
  const [transcript, setTranscript] = useState('')
  const [answer, setAnswer]         = useState('')

  // Track actual container size
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      const { width: w, height: h } = entry.contentRect
      setDims({ w, h })
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // ── Derive all layout values from real container dimensions ──────
  const { w, h } = dims

  // Breakpoints based on actual height
  const xs = h < 280   // very small mobile
  const sm = h < 380   // compact mobile
  const md = h < 540   // tablet

  const cardTopPct    = xs ? 30 : sm ? 36 : md ? 42 : 48
  const gradStopPct   = cardTopPct - 10  // gradient fades just before card

  const navH          = xs ? 32 : sm ? 40 : md ? 46 : 52
  const padV          = xs ? 8  : sm ? 12 : md ? 16 : 22
  const padH          = xs ? 12 : sm ? 16 : md ? 20 : 26
  const cardGap       = xs ? 6  : sm ? 8  : md ? 10 : 13

  const labelSz       = xs ? 7.5 : sm ? 8.5 : md ? 9  : 10
  const titleSz       = xs ? 13  : sm ? 15  : md ? 18 : 21
  const bodySz        = xs ? 10  : sm ? 11  : md ? 12 : 13
  const navFontSz     = xs ? 9   : sm ? 10  : md ? 11 : 12
  const navDotSz      = xs ? 4   : 5
  const showBody      = !sm && !xs

  // Voice zone sizing object
  const sz = {
    micSz:        xs ? 26 : sm ? 30 : md ? 34 : 38,
    micIconSz:    xs ? 10 : sm ? 12 : md ? 13 : 15,
    zonePadV:     xs ? 7  : sm ? 9  : md ? 10 : 12,
    zonePadH:     xs ? 9  : sm ? 11 : md ? 13 : 16,
    zoneGap:      xs ? 5  : sm ? 6  : md ? 8  : 9,
    zoneRowGap:   xs ? 8  : sm ? 10 : md ? 11 : 13,
    transcriptSz: xs ? 10 : sm ? 11 : md ? 12 : 13,
    answerSz:     xs ? 10 : sm ? 11 : md ? 12 : 12.5,
    stateLabelSz: xs ? 7  : sm ? 8  : 10,
    waveBarH:     xs ? 16 : sm ? 19 : md ? 22 : 26,
    waveBarW:     xs ? 2  : 3,
    dotSz:        xs ? 6  : sm ? 6  : md ? 7  : 8,
    dotGap:       xs ? 5  : sm ? 5  : md ? 6  : 7,
    pillPadV:     xs ? 5  : sm ? 6  : 8,
    pillPadH:     xs ? 10 : sm ? 12 : 18,
    pillFontSz:   xs ? 10 : sm ? 11 : 12,
  }

  const ex = EXAMPLES[exIdx]

  // ── Demo sequence ────────────────────────────────────────────────
  useEffect(() => {
    const timers = []
    const at = (fn, ms) => timers.push(setTimeout(fn, ms))
    let t = 0

    EXAMPLES.forEach((ex, ei) => {
      const Q = ex.question
      const A = ex.answer

      at(() => { setExIdx(ei); setVoice('idle'); setTranscript(''); setAnswer('') }, t)
      t += 2600

      at(() => setVoice('listening'), t)
      Q.split('').forEach((_, i) => {
        at(() => setTranscript(Q.slice(0, i + 1)), t + i * 95)
      })
      t += Q.length * 95 + 1200

      at(() => setVoice('thinking'), t)
      t += 2400

      at(() => { setVoice('speaking'); setAnswer(A) }, t)
      t += 6500

      at(() => { setVoice('idle'); setTranscript(''); setAnswer('') }, t)
      t += 2200
    })

    at(() => setLoopKey(k => k + 1), t)
    return () => timers.forEach(clearTimeout)
  }, [loopKey])

  return (
    <>
      <style>{CSS}</style>
      <div
        ref={containerRef}
        style={{ position: 'absolute', inset: 0, overflow: 'hidden', fontFamily: SANS }}
      >
        {/* Full-bleed background image */}
        <img
          key={exIdx}
          src={ex.image}
          alt=""
          style={{
            position: 'absolute', inset: 0,
            width: '100%', height: '100%',
            objectFit: 'cover', objectPosition: 'center 55%',
            animation: 'svImgFade 1.0s ease',
          }}
        />

        {/* Gradient: dark top → warm white at card boundary */}
        <div style={{
          position: 'absolute', inset: 0,
          background: `linear-gradient(to bottom,
            rgba(18,16,14,0.52) 0%,
            rgba(18,16,14,0.08) ${gradStopPct}%,
            rgba(246,245,242,0.97) ${cardTopPct - 2}%,
            #f6f5f2 100%)`,
        }} />

        {/* Content card */}
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          top: `${cardTopPct}%`,
          zIndex: 5, display: 'flex', flexDirection: 'column',
        }}>
          <div
            key={exIdx}
            style={{
              flex: 1, minHeight: 0,
              backgroundColor: '#f6f5f2',
              padding: `${padV}px ${padH}px ${padV * 0.5}px`,
              display: 'flex', flexDirection: 'column', gap: cardGap,
              boxShadow: '0 -8px 40px rgba(0,0,0,0.18)',
              animation: 'svSlideIn 0.45s ease',
              overflow: 'hidden',
            }}
          >
            {/* Recipe + step label */}
            <div style={{ flexShrink: 0 }}>
              <div style={{ fontSize: labelSz, color: 'rgba(0,0,0,0.3)', fontWeight: 700, letterSpacing: '0.14em', marginBottom: xs ? 2 : 3 }}>
                {ex.recipe.toUpperCase()} · STEP {ex.step}
              </div>
              <div style={{ fontSize: titleSz, fontFamily: SERIF, fontWeight: 700, color: '#1a1a18', lineHeight: 1.2 }}>
                {ex.technique}
              </div>
            </div>

            {/* Voice zone */}
            <div style={{ flexShrink: 0 }}>
              <VoiceZone state={voiceState} transcript={transcript} answer={answer} sz={sz} />
            </div>

            {/* Instruction — hidden at small sizes */}
            {showBody && (
              <p style={{ fontSize: bodySz, color: '#5a5a56', lineHeight: 1.72, flex: 1, margin: 0, minHeight: 0, overflow: 'hidden' }}>
                {ex.instruction}
              </p>
            )}
          </div>

          {/* Bottom nav */}
          <div style={{
            height: navH, flexShrink: 0,
            backgroundColor: '#f6f5f2',
            borderTop: '1px solid rgba(0,0,0,0.07)',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: `0 ${padH}px`,
          }}>
            <span style={{ fontSize: navFontSz, color: ACCENT, fontWeight: 600 }}>← Prep</span>
            <div style={{ display: 'flex', gap: navDotSz }}>
              {EXAMPLES.map((_, i) => (
                <div key={i} style={{
                  width: navDotSz, height: navDotSz, borderRadius: '50%',
                  backgroundColor: i === exIdx ? ACCENT : 'rgba(0,0,0,0.14)',
                  transition: 'background-color 0.5s',
                }} />
              ))}
            </div>
            <span style={{ fontSize: navFontSz, color: ACCENT, fontWeight: 600 }}>Next →</span>
          </div>
        </div>
      </div>
    </>
  )
}
