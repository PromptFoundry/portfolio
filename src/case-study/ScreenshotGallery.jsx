import { useState, useEffect, useCallback } from 'react'

function Lightbox({ images, startIndex, onClose, accentColor }) {
  const [current, setCurrent] = useState(startIndex)
  const accent = accentColor || 'var(--color-foreground-muted)'

  const prev = useCallback(() => setCurrent(i => (i - 1 + images.length) % images.length), [images.length])
  const next = useCallback(() => setCurrent(i => (i + 1) % images.length), [images.length])

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') prev()
      else if (e.key === 'ArrowRight') next()
      else if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [prev, next, onClose])

  // Lock scroll while open
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  const img = images[current]

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.92)' }}
      onClick={onClose}
    >
      {/* Modal card — stop propagation so clicking image doesn't close */}
      <div
        className="relative flex flex-col max-w-5xl w-full mx-4"
        onClick={e => e.stopPropagation()}
      >
        {/* Top bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <span className="text-[10px] font-semibold tracking-[0.35em] uppercase" style={{ color: accent }}>
            {current + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white/80 transition-colors text-xl leading-none"
            aria-label="Close"
          >
            ✕
          </button>
        </div>

        {/* Image */}
        <div className="relative overflow-hidden rounded-lg border" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          <img
            src={img.src}
            alt={img.alt}
            className="w-full h-auto max-h-[75vh] object-contain bg-black"
          />

          {/* Prev / Next overlays */}
          <button
            onClick={prev}
            className="absolute left-0 inset-y-0 w-16 flex items-center justify-start pl-4 text-white/30 hover:text-white/70 transition-colors"
            aria-label="Previous"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M13 4L7 10L13 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          <button
            onClick={next}
            className="absolute right-0 inset-y-0 w-16 flex items-center justify-end pr-4 text-white/30 hover:text-white/70 transition-colors"
            aria-label="Next"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M7 4L13 10L7 16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>

        {/* Caption */}
        {img.alt && (
          <p className="mt-3 text-xs font-light text-center px-1" style={{ color: 'rgba(255,255,255,0.4)' }}>
            {img.alt}
          </p>
        )}

        {/* Thumbnail strip */}
        <div className="flex gap-2 mt-4 overflow-x-auto pb-1 justify-center">
          {images.map((thumb, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              className="flex-shrink-0 w-14 h-10 overflow-hidden rounded transition-opacity"
              style={{
                outline: i === current ? `2px solid ${accent}` : '2px solid transparent',
                opacity: i === current ? 1 : 0.4,
              }}
            >
              <img src={thumb.src} alt={thumb.alt} className="w-full h-full object-cover" />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ScreenshotGallery({ images = [], accentColor }) {
  const accent = accentColor || 'var(--color-foreground-muted)'
  const [lightboxIndex, setLightboxIndex] = useState(null)

  return (
    <>
      <section className="py-20 px-6 border-b" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-alt)' }}>
        <div className="max-w-6xl mx-auto">
          <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-10" style={{ color: accent }}>
            Screens
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => setLightboxIndex(i)}
                className="group text-left border rounded-xl overflow-hidden focus:outline-none"
                style={{ borderColor: 'var(--color-border)' }}
              >
                <div className="aspect-video relative overflow-hidden" style={{ backgroundColor: 'var(--color-surface-muted)' }}>
                  {img.src ? (
                    <>
                      <img src={img.src} alt={img.alt} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                      {/* Hover overlay */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200" style={{ background: 'rgba(0,0,0,0.45)' }}>
                        <svg width="28" height="28" viewBox="0 0 28 28" fill="none" className="text-white">
                          <circle cx="14" cy="14" r="13" stroke="currentColor" strokeWidth="1.5"/>
                          <path d="M10 14H18M14 10V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                        </svg>
                      </div>
                    </>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-xs" style={{ color: 'var(--color-foreground-muted)' }}>{img.alt}</span>
                    </div>
                  )}
                </div>
                {img.caption && (
                  <p className="px-4 py-2 text-xs font-light" style={{ color: 'var(--color-foreground-muted)' }}>{img.caption}</p>
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          startIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          accentColor={accentColor}
        />
      )}
    </>
  )
}
