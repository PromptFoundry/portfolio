const HIGHLIGHT_ICONS = [
  '/images/arcis/icon-template.png',
  '/images/arcis/icon-drag.png',
  '/images/arcis/icon-modal.png',
]

export default function FeatureSectionSplit({ label, headline, body, image, embedUrl, highlights = [], accentColor }) {
  const accent = accentColor || 'var(--color-accent)'

  return (
    <section
      className="overflow-hidden border-b"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-alt)' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex items-stretch gap-16 py-24">

        {/* Left: text */}
        <div className="w-1/2 shrink-0 max-w-lg">
          <p className="text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: accent }}>
            {label}
          </p>
          <h3
            className="mt-8 font-serif text-4xl md:text-5xl font-light leading-tight text-pretty"
            style={{ color: 'var(--color-foreground)' }}
          >
            {headline}
          </h3>
          <div className="w-8 h-px mt-6" style={{ background: `linear-gradient(to right, ${accent}, transparent)` }} />
          <p className="mt-6 text-sm font-light leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
            {body}
          </p>
          {highlights.length > 0 && (
            <dl className="mt-10 flex flex-col gap-8">
              {highlights.map((feature, i) => (
                <div key={feature.name} className="relative pl-9">
                  <img
                    src={HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]}
                    alt=""
                    className="absolute left-1 top-0.5 w-4 h-4"
                  />
                  <dt className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 text-sm font-light leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
                    {feature.description}
                  </dd>
                </div>
              ))}
            </dl>
          )}
        </div>

        {/* Right: image or embed — fills height, overflows right edge */}
        <div className="flex-1 relative">
          <div
            className="absolute inset-0 overflow-hidden"
            style={{
              borderRadius: '1rem',
              right: embedUrl ? '0' : '-200px',
              boxShadow: '0 20px 50px -12px rgba(0,0,0,0.5)',
            }}
          >
            {embedUrl ? (
              <iframe
                src={embedUrl}
                title={headline}
                className="w-full h-full border-0"
              />
            ) : (
              <img
                src={image}
                alt={headline}
                className="w-full h-full object-cover object-left-top"
              />
            )}
          </div>
        </div>

      </div>
    </section>
  )
}
