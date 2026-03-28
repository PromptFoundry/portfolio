import { BarChart2, ImageIcon, ListChecks, Users, DollarSign, Bell } from 'lucide-react'

const icons = [BarChart2, ImageIcon, ListChecks, Users, DollarSign, Bell]

export default function FeatureSectionHighlight({ label, headline, body, image, video, highlights = [], accentColor, customVisual }) {
  const accent = accentColor || 'var(--color-accent)'

  return (
    <section
      className="py-16 md:py-24 border-b"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      {/* Centered header */}
      <div className="max-w-2xl mx-auto px-6 text-center">
        <p className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-4" style={{ color: accent }}>
          {label}
        </p>
        <h3 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light mb-6 leading-tight" style={{ color: 'var(--color-foreground)', whiteSpace: 'pre-line' }}>
          {headline}
        </h3>
        <div
          className="w-8 h-px mx-auto mb-6"
          style={{ background: accentColor ? `linear-gradient(to right, ${accent}, transparent)` : 'var(--color-border)' }}
        />
        <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
          {body}
        </p>
      </div>

      {/* Visual: custom component, video, or screenshot */}
      <div className={`pt-10 md:pt-16 ${customVisual ? '' : 'px-6'}`}>
        <div className={customVisual ? '' : 'max-w-5xl mx-auto'}>
          {customVisual ? customVisual : video ? (
            <video
              src={video}
              autoPlay
              loop
              muted
              playsInline
              className="w-full rounded-xl shadow-2xl"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
                outline: '1px solid rgba(0,0,0,0.08)',
              }}
            />
          ) : (
            <img
              src={image}
              alt={headline}
              className="w-full rounded-xl shadow-2xl"
              style={{
                boxShadow: '0 25px 50px -12px rgba(0,0,0,0.35)',
                outline: '1px solid rgba(0,0,0,0.08)',
              }}
            />
          )}
        </div>
      </div>

      {/* Feature grid — hidden when a custom visual already surfaces highlights inline */}
      {highlights.length > 0 && !customVisual && (
        <div className="max-w-6xl mx-auto px-6 mt-12 md:mt-20">
          <dl className="grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {highlights.map((feature, i) => {
              const Icon = icons[i % icons.length]
              return (
                <div key={feature.name} className="relative pl-9">
                  <dt className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
                    <Icon
                      size={16}
                      className="absolute top-0.5 left-1"
                      style={{ color: accent }}
                    />
                    {feature.name}
                  </dt>
                  <dd className="mt-1 text-sm font-light leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
                    {feature.description}
                  </dd>
                </div>
              )
            })}
          </dl>
        </div>
      )}
    </section>
  )
}
