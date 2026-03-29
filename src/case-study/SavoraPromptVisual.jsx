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
      <div style={{ position: 'relative', width: '100%', maxWidth: 780 }}>

        {/* Blob shape */}
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

        {/* Content — centered in blob */}
        <div style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: 'clamp(320px, 58vw, 580px)',
        }}>
          <img
            src="/images/savora/logotype-tag.svg"
            alt="Savora — Generative Cuisine"
            style={{
              width: 'clamp(120px, 22vw, 200px)',
              display: 'block',
              marginBottom: '-5%',
            }}
          />

          <CookingLottie />
        </div>
      </div>
    </div>
  )
}
