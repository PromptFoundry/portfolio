export default function FeatureSection({ label, headline, body, image, imageAlt, imagePosition = 'right', index = 0, accentColor }) {
  const isRight = imagePosition === 'right'
  const accent = accentColor || 'var(--color-accent)'

  return (
    <section
      className="py-20 px-6 border-b"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: index % 2 === 1 ? 'var(--color-surface-alt)' : 'var(--color-surface)',
      }}
    >
      <div className={`max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center ${!isRight ? 'md:[&>*:first-child]:order-2' : ''}`}>
        {/* Text */}
        <div>
          <p className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-4" style={{ color: accent }}>
            {label}
          </p>
          <h3 className="font-serif text-3xl font-light mb-5 leading-snug" style={{ color: 'var(--color-foreground)' }}>
            {headline}
          </h3>
          <div
            className="w-8 h-px mb-5"
            style={{ background: accentColor ? `linear-gradient(to right, ${accent}, transparent)` : 'var(--color-border)' }}
          />
          <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
            {body}
          </p>
        </div>

        {/* Image */}
        <div
          className="aspect-video border overflow-hidden"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-muted)' }}
        >
          {image ? (
            <img src={image} alt={imageAlt || headline} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-xs font-medium tracking-widest uppercase" style={{ color: 'var(--color-foreground-muted)' }}>
                Screenshot
              </span>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
