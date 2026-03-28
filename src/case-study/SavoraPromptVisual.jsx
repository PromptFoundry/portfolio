import { useLottie } from 'lottie-react'
import cookingAnimation from '../assets/lottie-cooking.json'

function CookingLottie() {
  const { View } = useLottie({ animationData: cookingAnimation, loop: true, autoplay: true })
  return (
    <div style={{ width: '42%', maxWidth: 420, minWidth: 240 }}>
      {View}
    </div>
  )
}

export default function SavoraPromptVisual() {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0 24px' }}>
    <div
      style={{
        backgroundColor: '#ffffff',
        width: '100%',
        maxWidth: 900,
        borderRadius: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingTop: 48,
        paddingBottom: 64,
        boxShadow: '0 25px 60px -12px rgba(0,0,0,0.45)',
        outline: '1px solid rgba(0,0,0,0.06)',
      }}
    >
      {/* Savora wordmark */}
      <p
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 700,
          fontSize: 48,
          lineHeight: 1.125,
          color: '#ba4953',
          letterSpacing: '0.015em',
          margin: 0,
        }}
      >
        Savora
      </p>

      {/* Eyebrow */}
      <p
        style={{
          fontFamily: "'Open Sans', sans-serif",
          fontWeight: 600,
          fontSize: 11,
          lineHeight: '16.5px',
          letterSpacing: '3.3px',
          textTransform: 'uppercase',
          color: 'rgba(97, 106, 133, 0.6)',
          marginTop: 6,
          marginBottom: 0,
        }}
      >
        Generative Cuisine
      </p>

      {/* Lottie illustration */}
      <CookingLottie />

      {/* Headline SVG */}
      <img
        src="/images/savora/whatshallwecook.svg"
        alt="What shall we cook?"
        style={{ width: '90%', maxWidth: 780, display: 'block' }}
      />
    </div>
    </div>
  )
}
