const HIGHLIGHTS_ICONS = [
  '/images/arcis/icon-template.png',
  '/images/arcis/icon-drag.png',
  '/images/arcis/icon-modal.png',
]

export default function FeatureSectionSplit({ label, headline, body, image, highlights = [], accentColor }) {
  const accent = accentColor || 'var(--color-accent)'

  return (
    <section
      className="py-24 border-b overflow-hidden"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-alt)' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-16 items-start">

          {/* Left: text */}
          <div className="max-w-lg">
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
                      src={HIGHLIGHTS_ICONS[i % HIGHLIGHTS_ICONS.length]}
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

          {/* Right: image with Figma crop */}
          <div
            className="relative mt-12 lg:mt-0 rounded-xl overflow-hidden"
            style={{
              height: '576px',
              boxShadow: '0 20px 50px -12px rgba(0,0,0,0.3)',
            }}
          >
            <img
              src={image}
              alt={headline}
              className="absolute max-w-none"
              style={{
                width: '157.9%',
                height: '150.88%',
                top: '-15.07%',
                left: 0,
                objectFit: 'cover',
              }}
            />
          </div>

        </div>
      </div>
    </section>
  )
}
