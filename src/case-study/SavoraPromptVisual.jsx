import { useLottie } from 'lottie-react'
import cookingAnimation from '../assets/lottie-cooking.json'

function CookingLottie() {
  const { View } = useLottie({ animationData: cookingAnimation, loop: true, autoplay: true })
  return (
    <div style={{ width: '62%', maxWidth: 340, minWidth: 180 }}>
      {View}
    </div>
  )
}

export default function SavoraPromptVisual() {
  return (
    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', padding: '0 24px' }}>
      {/* Outer wrapper — sets the max width and gives room for the rotated blob to breathe */}
      <div style={{ position: 'relative', width: '100%', maxWidth: 780 }}>

        {/* Blob shape — slightly tilted like the mockup */}
        <img
          src="/images/savora/shape.svg"
          alt=""
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'fill',
            transform: 'rotate(-4deg) scale(1.04)',
            transformOrigin: 'center center',
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        />

        {/* Content — stacked inside the blob */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingTop: 'clamp(32px, 6vw, 64px)',
          paddingBottom: 'clamp(28px, 5vw, 56px)',
          paddingLeft: 24,
          paddingRight: 24,
          // Aspect ratio close to the blob (723 × 673)
          minHeight: 'clamp(320px, 58vw, 580px)',
          justifyContent: 'space-between',
        }}>

          {/* Logotype + tagline */}
          <img
            src="/images/savora/logotype-tag.svg"
            alt="Savora — Generative Cuisine"
            style={{
              width: 'clamp(120px, 22vw, 200px)',
              display: 'block',
              flexShrink: 0,
            }}
          />

          {/* Lottie cooking illustration */}
          <CookingLottie />

          {/* "What shall we cook?" headline */}
          <img
            src="/images/savora/whatshallwecook.svg"
            alt="What shall we cook?"
            style={{
              width: 'clamp(220px, 68%, 540px)',
              display: 'block',
              flexShrink: 0,
            }}
          />
        </div>
      </div>
    </div>
  )
}
