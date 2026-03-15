import { useState, useEffect } from 'react'
import { Sparkles, PieChart, FileText } from 'lucide-react'

const icons = [Sparkles, PieChart, FileText]

export default function FeatureSectionSplit({ label, headline, body, image, embedUrl, highlights = [], accentColor }) {
  const accent = accentColor || 'var(--color-accent)'
  const [embedHeight, setEmbedHeight] = useState(480)

  useEffect(() => {
    if (!embedUrl) return
    const handler = (e) => {
      if (e.data?.type === 'campaign-demo-height' && e.data.height > 0) {
        setEmbedHeight(e.data.height + 48) // 48px = 24px padding top + bottom from CampaignDemo
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [embedUrl])

  return (
    <section
      className="overflow-hidden py-24 border-b"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-alt)' }}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-12 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2 items-start">

          {/* Left: text + feature list */}
          <div className="lg:pr-8">
            <div className="lg:max-w-lg">
              <p className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-4" style={{ color: accent }}>
                {label}
              </p>
              <h3 className="font-serif text-4xl md:text-5xl font-light leading-tight" style={{ color: 'var(--color-foreground)' }}>
                {headline}
              </h3>
              <div
                className="w-8 h-px mt-6 mb-6"
                style={{ background: accentColor ? `linear-gradient(to right, ${accent}, transparent)` : 'var(--color-border)' }}
              />
              <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
                {body}
              </p>
              {highlights.length > 0 && (
                <dl className="mt-10 space-y-8">
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
                        </dt>{' '}
                        <dd className="inline text-sm font-light leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
                          {feature.description}
                        </dd>
                      </div>
                    )
                  })}
                </dl>
              )}
            </div>
          </div>

          {/* Right: screenshot or live embed */}
          {embedUrl ? (
            <div
              className="w-full max-w-none rounded-xl overflow-hidden md:-mr-4 lg:mr-0"
              style={{
                boxShadow: '0 20px 50px -12px rgba(0,0,0,0.5)',
                outline: '1px solid rgba(255,255,255,0.06)',
                height: embedHeight,
                transition: 'height 0.3s ease',
              }}
            >
              <iframe
                src={embedUrl}
                title={headline}
                className="w-full border-0"
                style={{ display: 'block', height: embedHeight }}
              />
            </div>
          ) : (
            <img
              src={image}
              alt={headline}
              className="w-full max-w-none rounded-xl md:-mr-4 lg:mr-0"
              style={{
                boxShadow: '0 20px 50px -12px rgba(0,0,0,0.3)',
                outline: '1px solid rgba(0,0,0,0.08)',
              }}
            />
          )}
        </div>
      </div>
    </section>
  )
}
