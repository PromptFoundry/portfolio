import { useState, useEffect } from 'react'

const ACCENT = '#af2c38'
const SANS = "'Inter', system-ui, sans-serif"
const SERIF = "'Playfair Display', Georgia, serif"

const Q = 'How long for the garlic?'
const A = "Cook the garlic about 60 seconds over medium heat, stirring frequently until fragrant. Don't let it brown — it'll turn bitter fast."
const NAV = 'Next step'

const STEPS = [
  {
    num: '02',
    technique: 'Sauté the Aromatics',
    instruction: 'Heat olive oil in a large skillet over medium heat. Add minced garlic and cook, stirring frequently, until fragrant and lightly golden — about 60 seconds. Add crushed red pepper if using.',
  },
  {
    num: '03',
    technique: 'Build the Sauce',
    instruction: 'Add cherry tomatoes to the pan and press gently to burst them. Season generously with salt and pepper, then simmer for 10–12 minutes until the sauce thickens and deepens in color.',
  },
]

const CSS = `
  @keyframes svPulseRing {
    0% { transform: scale(1); opacity: 0.65; }
    100% { transform: scale(2.4); opacity: 0; }
  }
  @keyframes svDot {
    0%, 100% { transform: translateY(0); opacity: 0.35; }
    50% { transform: translateY(-5px); opacity: 1; }
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
    from { opacity: 0; transform: translateX(18px); }
    to { opacity: 1; transform: translateX(0); }
  }
  @keyframes svIdlePulse {
    0%, 100% { box-shadow: 0 0 0 0 rgba(175,44,56,0.25); }
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

function Waveform() {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 3, height: 28 }}>
      {WAVEFORM.map(({ dur, del }, i) => (
        <div key={i} style={{
          width: 3, height: 26, borderRadius: 2,
          backgroundColor: ACCENT,
          transformOrigin: 'center',
          animation: `svBar ${dur}s ease-in-out ${del}s infinite`,
        }} />
      ))}
    </div>
  )
}

function ThinkDots() {
  return (
    <div style={{ display: 'flex', gap: 7, alignItems: 'center', height: 28 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{
          width: 8, height: 8, borderRadius: '50%',
          backgroundColor: ACCENT,
          animation: `svDot 0.85s ease-in-out ${i * 0.2}s infinite`,
        }} />
      ))}
    </div>
  )
}

function VoiceZone({ state, transcript, answer }) {
  if (state === 'idle') {
    return (
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          backgroundColor: `rgba(175,44,56,0.07)`,
          border: `1px solid rgba(175,44,56,0.18)`,
          borderRadius: 28, padding: '7px 16px',
          animation: 'svIdlePulse 2.4s ease-in-out infinite',
        }}>
          <MicIcon size={13} color={ACCENT} />
          <span style={{ fontSize: 12, fontWeight: 600, color: ACCENT, fontFamily: SANS, letterSpacing: '0.01em' }}>Ask anything</span>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      backgroundColor: '#fff',
      border: '1px solid rgba(0,0,0,0.07)',
      borderRadius: 12,
      padding: '11px 14px',
      display: 'flex', flexDirection: 'column', gap: 8,
      boxShadow: '0 2px 14px rgba(0,0,0,0.07)',
      animation: 'svFadeUp 0.25s ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>

        {/* Mic button with pulse rings */}
        <div style={{ position: 'relative', width: 36, height: 36, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {state === 'listening' && (
            <>
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${ACCENT}`, animation: 'svPulseRing 1.3s ease-out infinite' }} />
              <div style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: `2px solid ${ACCENT}`, animation: 'svPulseRing 1.3s ease-out 0.45s infinite' }} />
            </>
          )}
          <div style={{
            width: 36, height: 36, borderRadius: '50%',
            backgroundColor: ACCENT,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            position: 'relative', zIndex: 1,
          }}>
            <MicIcon size={15} color="#fff" />
          </div>
        </div>

        {/* Content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {state === 'listening' && (
            <div style={{ fontSize: 13, color: transcript ? '#1a1a18' : 'rgba(0,0,0,0.35)', fontStyle: transcript ? 'normal' : 'italic', fontFamily: SANS, lineHeight: 1.4 }}>
              {transcript || 'Listening…'}
              {transcript && (
                <span style={{ animation: 'svCursor 0.75s step-end infinite', color: ACCENT, marginLeft: 1 }}>|</span>
              )}
            </div>
          )}
          {state === 'thinking' && <ThinkDots />}
          {state === 'speaking' && <Waveform />}
        </div>

        {/* State label */}
        <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.28)', fontFamily: SANS, flexShrink: 0 }}>
          {state === 'listening' ? 'Listening' : state === 'thinking' ? 'Thinking' : 'Speaking'}
        </div>
      </div>

      {/* Answer */}
      {answer && (
        <div style={{
          fontSize: 12.5, color: '#3a3a38', lineHeight: 1.65,
          paddingTop: 8, borderTop: '1px solid rgba(0,0,0,0.06)',
          fontFamily: SANS, animation: 'svFadeUp 0.35s ease',
        }}>
          {answer}
        </div>
      )}
    </div>
  )
}

export default function SavoraVoiceDemo() {
  const [loopKey, setLoopKey] = useState(0)
  const [stepIdx, setStepIdx] = useState(0)
  const [voiceState, setVoiceState] = useState('idle')
  const [transcript, setTranscript] = useState('')
  const [answer, setAnswer] = useState('')

  const step = STEPS[stepIdx]

  useEffect(() => {
    const timers = []
    const at = (fn, ms) => timers.push(setTimeout(fn, ms))
    let t = 0

    // ── Phase 1: Q&A ──────────────────────────────────────────────
    t += 1600
    at(() => { setVoiceState('listening'); setTranscript('') }, t)

    Q.split('').forEach((_, i) => {
      at(() => setTranscript(Q.slice(0, i + 1)), t + i * 72)
    })
    t += Q.length * 72 + 550

    at(() => setVoiceState('thinking'), t)
    t += 1300

    at(() => { setVoiceState('speaking'); setAnswer(A) }, t)
    t += 3400

    at(() => { setVoiceState('idle'); setTranscript(''); setAnswer('') }, t)
    t += 2000

    // ── Phase 2: Navigation command ───────────────────────────────
    at(() => { setVoiceState('listening'); setTranscript('') }, t)

    NAV.split('').forEach((_, i) => {
      at(() => setTranscript(NAV.slice(0, i + 1)), t + i * 110)
    })
    t += NAV.length * 110 + 350

    at(() => {
      setVoiceState('idle')
      setTranscript('')
      setStepIdx(1)
    }, t)
    t += 2800

    // ── Reset & loop ───────────────────────────────────────────────
    at(() => {
      setStepIdx(0)
      setVoiceState('idle')
      setTranscript('')
      setAnswer('')
    }, t)
    t += 300
    at(() => setLoopKey(k => k + 1), t)

    return () => timers.forEach(clearTimeout)
  }, [loopKey])

  return (
    <>
      <style>{CSS}</style>
      <div style={{
        position: 'absolute', inset: 0, overflow: 'hidden',
        backgroundColor: '#f6f5f2', fontFamily: SANS,
        display: 'flex', flexDirection: 'column',
      }}>

        {/* ── Header bar ── */}
        <div style={{
          height: 50, flexShrink: 0,
          backgroundColor: '#181714',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 22px',
        }}>
          <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: 12, fontWeight: 500 }}>← Overview</span>
          <span style={{ color: '#fff', fontSize: 11, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase' }}>
            Rustic Italian Pasta
          </span>
          <div style={{ display: 'flex', gap: 5, alignItems: 'center' }}>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} style={{
                width: 5, height: 5, borderRadius: '50%',
                backgroundColor: i === stepIdx + 1 ? '#fff' : 'rgba(255,255,255,0.25)',
                transition: 'background-color 0.4s',
              }} />
            ))}
          </div>
        </div>

        {/* ── Food image ── */}
        <div style={{ height: '36%', flexShrink: 0, overflow: 'hidden', position: 'relative' }}>
          <img
            src="/images/savora/calzone.jpg"
            alt=""
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 60%' }}
          />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(to bottom, transparent 50%, rgba(246,245,242,0.95) 100%)',
          }} />
        </div>

        {/* ── Step content ── */}
        <div
          key={stepIdx}
          style={{
            flex: 1, padding: '18px 26px 10px',
            display: 'flex', flexDirection: 'column', gap: 11,
            overflow: 'hidden',
            animation: 'svSlideIn 0.38s ease',
          }}
        >
          {/* Step label */}
          <div>
            <div style={{ fontSize: 10, color: 'rgba(0,0,0,0.35)', fontWeight: 700, letterSpacing: '0.14em', marginBottom: 3 }}>
              STEP {step.num}
            </div>
            <div style={{ fontSize: 20, fontFamily: SERIF, fontWeight: 700, color: '#1a1a18', lineHeight: 1.2 }}>
              {step.technique}
            </div>
          </div>

          {/* Voice zone */}
          <VoiceZone state={voiceState} transcript={transcript} answer={answer} />

          {/* Instruction */}
          <p style={{ fontSize: 13, color: '#5a5a56', lineHeight: 1.7, flex: 1, margin: 0 }}>
            {step.instruction}
          </p>
        </div>

        {/* ── Bottom nav ── */}
        <div style={{
          height: 50, flexShrink: 0,
          backgroundColor: '#fff',
          borderTop: '1px solid rgba(0,0,0,0.07)',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '0 24px',
        }}>
          <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600 }}>← Prep</span>
          <div style={{ display: 'flex', gap: 5 }}>
            {[0, 1, 2, 3, 4].map(i => (
              <div key={i} style={{
                width: 5, height: 5, borderRadius: '50%',
                backgroundColor: i === stepIdx + 1 ? ACCENT : 'rgba(0,0,0,0.14)',
                transition: 'background-color 0.4s',
              }} />
            ))}
          </div>
          <span style={{ fontSize: 12, color: ACCENT, fontWeight: 600 }}>Build the Sauce →</span>
        </div>

      </div>
    </>
  )
}
