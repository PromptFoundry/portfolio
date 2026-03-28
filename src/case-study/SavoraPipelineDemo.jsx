import { useState, useEffect } from 'react'
import { useLottie } from 'lottie-react'
import cookingAnimation from '../assets/lottie-cooking.json'
import loadingAnimation from '../assets/lottie-loading.json'
import sushiAnimation from '../assets/lottie-sushi.json'
import burgerAnimation from '../assets/lottie-burger.json'
import pizzaAnimation from '../assets/lottie-pizza.json'
import tacosAnimation from '../assets/lottie-tacos.json'
import bowlAnimation from '../assets/lottie-bowl.json'

const ACCENT   = '#af2c38'
const SERIF    = "'Playfair Display', Georgia, serif"
const SANS     = "'Open Sans', system-ui, sans-serif"
const INTER    = "'Inter', system-ui, sans-serif"
const RECIPES = [
  {
    name:  'Nobu-Style Miso Black Cod',
    title: 'Nobu-Style Miso Black Cod',
    description: 'A signature Japanese dish featuring buttery black cod marinated in sweet white miso, broiled to a caramelized finish.',
    note: 'Marinate 24–48 hrs*',
    prep: '10 min', cook: '12 min', total: '~30 min',
    image: '/images/savora/miso-cod.jpg',
    lottie: sushiAnimation,
  },
  {
    name:  'Baja Shrimp Tacos',
    title: 'Baja Shrimp Tacos',
    description: 'Crispy chili-spiced shrimp in charred tortillas with avocado, pickled red onion, and edible flowers.',
    note: 'Best served immediately',
    prep: '15 min', cook: '10 min', total: '25 min',
    image: '/images/savora/tacos.jpg',
    lottie: tacosAnimation,
  },
  {
    name:  'Moroccan Chickpea Rice Bowl',
    title: 'Moroccan Chickpea Rice Bowl',
    description: 'Warm spiced chickpeas over basmati rice with fresh cucumber, herbs, toasted flatbread, and harissa on the side.',
    note: 'Vegan · gluten-free option',
    prep: '10 min', cook: '20 min', total: '30 min',
    image: '/images/savora/chickpea-bowl.jpg',
    lottie: bowlAnimation,
  },
  {
    name:  'Triple Stack Smash Burger',
    title: 'Triple Stack Smash Burger',
    description: 'Three smashed beef patties with melted American cheese, crispy bacon, pickles, and house sauce on a toasted brioche bun.',
    note: 'Cast iron skillet recommended',
    prep: '10 min', cook: '15 min', total: '25 min',
    image: '/images/savora/smash-burger.jpg',
    lottie: burgerAnimation,
  },
  {
    name:  'Loaded Italian Calzone',
    title: 'Loaded Italian Calzone',
    description: 'A golden, oven-baked calzone stuffed with layers of melted cheese, savory cured meats, and sautéed vegetables. Crisp on the outside, molten and rich on the inside, served with marinara and a creamy dipping sauce.',
    note: null,
    prep: '20 min', cook: '18 min', total: '~40 min',
    image: '/images/savora/carnitas-tacos.jpg',
    lottie: pizzaAnimation,
  },
]

const SHIMMER_CSS = `
@keyframes savoraShimmer {
  0%, 100% { filter: brightness(1); }
  50%      { filter: brightness(1.18); }
}
@keyframes savoraSpin {
  to { transform: rotate(360deg); }
}
@keyframes savoraFade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
.savora-fill > div { width: 100% !important; height: 100% !important; }
.savora-fill > div > svg { width: 100% !important; height: 100% !important; display: block; }
@keyframes savoraCursor {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
}
`

// ─── Shared ──────────────────────────────────────────────────────────────────

function LottieView({ animationData, loop = true, rendererSettings, style }) {
  const { View } = useLottie({ animationData, loop, autoplay: true, rendererSettings })
  return <div style={style}>{View}</div>
}

function ShimmerButton({ label, serif = false, style }) {
  return (
    <button style={{
      fontFamily: serif ? SERIF : SANS,
      fontWeight: 700,
      fontSize: serif ? '1.1em' : '0.7em',
      letterSpacing: serif ? 0 : '0.15em',
      textTransform: serif ? 'none' : 'uppercase',
      color: 'white',
      border: 'none',
      borderRadius: 4,
      cursor: 'pointer',
      padding: '0 24px',
      background: 'linear-gradient(254deg, #ba4953 0%, #832243 100%)',
      animation: 'savoraShimmer 2.5s ease-in-out infinite',
      ...style,
    }}>
      {label}
    </button>
  )
}

function CheckItem({ label, state }) {
  const sz = 'clamp(14px, 1.3vw, 20px)'
  const fsz = 'clamp(9px, 0.85vw, 13px)'
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'clamp(8px, 0.8vw, 12px)' }}>
      <div style={{ width: sz, height: sz, flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {state === 'done' && (
          <div style={{ width: sz, height: sz, borderRadius: '50%', backgroundColor: ACCENT, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: 'white', fontSize: 'clamp(7px, 0.65vw, 10px)', lineHeight: 1 }}>✓</span>
          </div>
        )}
        {state === 'active' && (
          <div style={{ width: sz, height: sz, borderRadius: '50%', backgroundColor: 'rgba(175,44,56,0.13)', border: `1.5px solid ${ACCENT}`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: ACCENT, fontSize: fsz, lineHeight: 1 }}>·</span>
          </div>
        )}
        {state === 'pending' && (
          <div style={{ width: sz, height: sz, borderRadius: '50%', border: '1.5px solid #3d3d38' }} />
        )}
      </div>
      <span style={{
        fontFamily: INTER, fontSize: fsz,
        color: state === 'pending' ? '#3d3d38' : ACCENT,
        fontWeight: 400, letterSpacing: '0.025em',
        whiteSpace: 'nowrap',
      }}>
        {label}
      </span>
    </div>
  )
}

// ─── Step 1: Homepage ────────────────────────────────────────────────────────

function Step1({ typedText = '', recipeName = '' }) {
  const isTyping = typedText.length > 0 && typedText.length < recipeName.length

  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundColor: 'white',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'flex-start',
      overflow: 'hidden',
      animation: 'savoraFade 0.3s ease',
    }}>
      {/* Lottie — top flush, fills ~38% of height */}
      <LottieView
        animationData={cookingAnimation}
        style={{ width: '50%', maxWidth: 280, flexShrink: 0 }}
      />

      {/* What shall / we cook? */}
      <div style={{ textAlign: 'center', lineHeight: 1, padding: '0 5%' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'center', gap: '0.3em', flexWrap: 'wrap' }}>
          <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(16px, 2.8vw, 28px)', color: '#1e1f22', letterSpacing: '-0.05em' }}>
            What shall
          </span>
          <span style={{ fontFamily: SERIF, fontWeight: 600, fontStyle: 'italic', fontSize: 'clamp(36px, 6.5vw, 68px)', color: ACCENT, letterSpacing: '-0.04em', lineHeight: 1 }}>
            we cook?
          </span>
        </div>
        <p style={{ fontFamily: SANS, fontSize: 'clamp(9px, 1.1vw, 12px)', color: '#8e96ad', margin: '6px 0 0', letterSpacing: '0.01em' }}>
          Describe a dish, a craving, a mood, or an occasion.
        </p>
      </div>

      {/* Input */}
      <div style={{
        width: '72%', maxWidth: 420, marginTop: '3%',
        backgroundColor: '#f0f4f9',
        border: `1px solid ${typedText ? 'rgba(175,44,56,0.3)' : 'rgba(97,106,133,0.2)'}`,
        borderBottom: `2px solid ${typedText ? 'rgba(175,44,56,0.5)' : 'rgba(97,106,133,0.3)'}`,
        borderRadius: 4,
        padding: '12px 48px 12px 14px',
        boxSizing: 'border-box',
        flexShrink: 0,
        minHeight: 44,
        display: 'flex', alignItems: 'center',
      }}>
        {typedText ? (
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(10px, 1.3vw, 14px)', color: '#1e1f22' }}>
            {typedText}
            {isTyping && (
              <span style={{ display: 'inline-block', width: '1px', height: '1em', backgroundColor: ACCENT, marginLeft: 1, verticalAlign: 'text-bottom', animation: 'savoraCursor 0.7s step-end infinite' }} />
            )}
          </span>
        ) : (
          <span style={{ fontFamily: SERIF, fontSize: 'clamp(10px, 1.3vw, 14px)', color: '#b0b7c6' }}>
            Describe what you want to cook...
          </span>
        )}
      </div>

      {/* Button */}
      <ShimmerButton
        label="GENERATE RECIPE →"
        style={{ width: '50%', maxWidth: 240, height: 42, marginTop: '2.5%', flexShrink: 0, borderRadius: 3 }}
      />
    </div>
  )
}

// ─── Step 2: Loading ─────────────────────────────────────────────────────────

function Step2({ phase }) {
  const checks = [
    { label: 'Reading your request',  state: phase >= 1 ? 'done'    : 'active'  },
    { label: 'Building your recipe',  state: phase >= 2 ? 'done'    : phase === 1 ? 'active' : 'pending' },
    { label: 'Validating recipe',     state: phase >= 3 ? 'done'    : phase === 2 ? 'active' : 'pending' },
    { label: 'Composing the layout',  state: phase >= 4 ? 'done'    : phase === 3 ? 'active' : 'pending' },
  ]

  return (
    <div style={{
      position: 'absolute', inset: 0,
      backgroundColor: 'white',
      overflow: 'hidden',
      animation: 'savoraFade 0.3s ease',
    }}>
      {/* Lottie — top: -3.5% mirrors Figma's -42px in 1187px frame */}
      <div style={{ position: 'absolute', top: '-3.5%', left: '50%', transform: 'translateX(-50%)', width: '55%', maxWidth: 340 }}>
        <LottieView animationData={loadingAnimation} style={{ width: '100%' }} />
      </div>

      {/* Generating / Your recipe — top: 48% mirrors Figma's 575px / 1187px */}
      <div style={{ position: 'absolute', top: '48%', left: 0, right: 0, textAlign: 'center', lineHeight: 1 }}>
        <span style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(13px, 1.5vw, 24px)', color: '#1e1f22', letterSpacing: '-0.05em', display: 'block' }}>
          Generating
        </span>
        <span style={{ fontFamily: SERIF, fontWeight: 600, fontStyle: 'italic', fontSize: 'clamp(26px, 3vw, 48px)', color: ACCENT, letterSpacing: '-0.035em', lineHeight: 1, display: 'block' }}>
          Your recipe
        </span>
      </div>

      {/* Checklist — top: 71% mirrors Figma's 845px / 1187px */}
      <div style={{ position: 'absolute', top: '71%', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', gap: 'clamp(6px, 0.7vw, 11px)', alignItems: 'flex-start' }}>
        {checks.map(c => <CheckItem key={c.label} {...c} />)}
      </div>
    </div>
  )
}

// ─── Step 3: Recipe landing ──────────────────────────────────────────────────

function Step3({ recipe }) {
  return (
    <div style={{ position: 'absolute', inset: 0, animation: 'savoraFade 0.3s ease' }}>
      {/* Blurred bg */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `url(${recipe.image})`,
        backgroundSize: 'cover', backgroundPosition: 'center',
        filter: 'blur(16px) brightness(0.6)',
        transform: 'scale(1.08)',
      }} />

      {/* Card */}
      <div style={{
        position: 'absolute', inset: '4%',
        backgroundColor: 'white',
        borderRadius: 10,
        boxShadow: '0 4px 80px rgba(51,51,51,0.2)',
        overflow: 'hidden',
        display: 'flex',
      }}>
        {/* Left: recipe content */}
        <div style={{
          width: '48%', flexShrink: 0,
          padding: '5% 4%',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}>
          <p style={{ fontFamily: SANS, fontWeight: 300, fontSize: '0.6em', letterSpacing: '0.6em', textTransform: 'uppercase', color: '#010303', margin: 0 }}>
            Overview
          </p>

          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '5%' }}>
            <p style={{ fontFamily: SERIF, fontWeight: 600, fontSize: 'clamp(16px, 2.8vw, 32px)', color: '#1e1f22', lineHeight: 1.15, margin: 0 }}>
              {recipe.title}
            </p>

            <div style={{ display: 'flex', gap: '0.3em' }}>
              {[...Array(5)].map((_, i) => (
                <span key={i} style={{ color: ACCENT, fontSize: 'clamp(10px, 1.4vw, 16px)' }}>★</span>
              ))}
            </div>

            <p style={{ fontFamily: INTER, fontSize: 'clamp(9px, 1.2vw, 13px)', color: '#8e96ad', lineHeight: 1.7, margin: 0 }}>
              {recipe.description}
              {recipe.note && <>{' '}<em style={{ fontWeight: 600 }}>{recipe.note}</em></>}
            </p>

            <div style={{ display: 'flex', gap: '6%' }}>
              {[['Prep', recipe.prep], ['Cook', recipe.cook], ['Total', recipe.total]].map(([lbl, val]) => (
                <div key={lbl}>
                  <div style={{ fontFamily: SERIF, fontWeight: 800, fontSize: 'clamp(9px, 1.2vw, 13px)', color: '#4c5674' }}>{lbl}</div>
                  <div style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 'clamp(9px, 1.2vw, 13px)', color: '#4c5674' }}>{val}</div>
                </div>
              ))}
            </div>

            <ShimmerButton
              label="Let's cook!"
              serif
              style={{ width: '55%', maxWidth: 160, height: 40, flexShrink: 0, borderRadius: 3 }}
            />
          </div>
        </div>

        {/* Right: food photo */}
        <div style={{ flex: 1, overflow: 'hidden' }}>
          <img src={recipe.image} alt={recipe.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      </div>
    </div>
  )
}

// ─── Step 4: Sushi ───────────────────────────────────────────────────────────

function Step4({ lottie: animationData }) {
  const { View } = useLottie({
    animationData,
    loop: false,
    autoplay: true,
    rendererSettings: { preserveAspectRatio: 'xMidYMid slice' },
  })
  return (
    <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', animation: 'savoraFade 0.25s ease' }}>
      <div className="savora-fill" style={{ position: 'absolute', inset: 0 }}>
        {View}
      </div>
    </div>
  )
}

// ─── Main ────────────────────────────────────────────────────────────────────

export default function SavoraPipelineDemo() {
  const [step, setStep] = useState(1)
  const [phase, setPhase] = useState(0)
  const [recipeIdx, setRecipeIdx] = useState(0)
  const [typedText, setTypedText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const recipe = RECIPES[recipeIdx]

  // Typing animation: type recipe name char by char, then advance to step 2
  useEffect(() => {
    if (!isTyping) return
    if (typedText.length >= recipe.name.length) {
      const t = setTimeout(() => { setIsTyping(false); setStep(2) }, 300)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => setTypedText(recipe.name.slice(0, typedText.length + 1)), 55)
    return () => clearTimeout(t)
  }, [isTyping, typedText, recipe.name])

  // Step 2: animate checklist + auto-advance
  useEffect(() => {
    if (step !== 2) { setPhase(0); return }
    const timers = [
      setTimeout(() => setPhase(1), 650),
      setTimeout(() => setPhase(2), 1300),
      setTimeout(() => setPhase(3), 1950),
      setTimeout(() => setPhase(4), 2600),
      setTimeout(() => setStep(3), 3000),
    ]
    return () => timers.forEach(clearTimeout)
  }, [step])

  // Step 4: play 4s then reset
  useEffect(() => {
    if (step !== 4) return
    const t = setTimeout(() => {
      setRecipeIdx(i => (i + 1) % RECIPES.length)
      setStep(1)
      setTypedText('')
    }, 4000)
    return () => clearTimeout(t)
  }, [step])

  const onClick = () => {
    if (step === 1 && !isTyping) { setIsTyping(true) }
    else if (step === 3) setStep(4)
  }

  return (
    <>
      <style>{SHIMMER_CSS}</style>
      <div
        onClick={onClick}
        style={{
          width: '100%', height: '100%',
          position: 'relative', overflow: 'hidden',
          backgroundColor: 'white',
          cursor: (step === 1 && !isTyping) || step === 3 ? 'pointer' : 'default',
          userSelect: 'none',
        }}
      >
        {step === 1 && <Step1 typedText={typedText} recipeName={recipe.name} />}
        {step === 2 && <Step2 phase={phase} />}
        {step === 3 && <Step3 recipe={recipe} />}
        {step === 4 && <Step4 lottie={recipe.lottie} />}
      </div>
    </>
  )
}
