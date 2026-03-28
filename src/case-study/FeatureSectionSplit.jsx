import { useEffect, useRef, useState } from 'react'
import { Sparkles, PieChart, FileText, Users, Zap, BarChart2, ScanText, Cpu, ShieldCheck, Layers } from 'lucide-react'

const HIGHLIGHT_ICONS = [Sparkles, PieChart, FileText, Users, Zap, BarChart2]

const ICON_MAP = { ScanText, Cpu, ShieldCheck, Layers }

function AutoHeightIframe({ src, title }) {
  const [height, setHeight] = useState(900)

  useEffect(() => {
    const handler = (e) => {
      if (e.data?.type === 'campaign-demo-height' && e.data.height > 0) {
        setHeight(e.data.height)
      }
    }
    window.addEventListener('message', handler)
    return () => window.removeEventListener('message', handler)
  }, [])

  return (
    <iframe
      src={src}
      title={title}
      className="w-full border-0 block"
      style={{ height: `${height}px` }}
      scrolling="no"
    />
  )
}

export default function FeatureSectionSplit({ label, headline, body, image, video, embedUrl, customVisual, highlights = [], accentColor }) {
  const accent = accentColor || 'var(--color-accent)'

  return (
    <section
      className="overflow-x-hidden border-b"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-alt)' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row items-start md:items-stretch gap-10 md:gap-16 py-16 md:py-24">

        {/* Left: text */}
        <div className="w-full md:w-1/2 md:shrink-0 md:max-w-lg">
          <p className="text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: accent }}>
            {label}
          </p>
          <h3
            className="mt-8 font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-pretty"
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
              {highlights.map((feature, i) => {
                const Icon = (feature.icon && ICON_MAP[feature.icon]) || HIGHLIGHT_ICONS[i % HIGHLIGHT_ICONS.length]
                return (
                  <div key={feature.name} className="relative pl-9">
                    <Icon size={16} className="absolute left-1 top-0.5" style={{ color: accent }} />
                    <dt className="text-sm font-semibold" style={{ color: 'var(--color-foreground)' }}>
                      {feature.name}
                    </dt>
                    <dd className="mt-1 text-sm font-light leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
                      {feature.description}
                    </dd>
                  </div>
                )
              })}
            </dl>
          )}
        </div>

        {/* Mobile */}
        <div className="md:hidden w-full">
          {customVisual
            ? (
              <div style={{ width: '100%', aspectRatio: '1776/1187', overflow: 'hidden', borderRadius: '1rem', boxShadow: '0 20px 50px -12px rgba(0,0,0,0.5)' }}>
                {customVisual}
              </div>
            )
            : (
              <div
                style={{
                  aspectRatio: embedUrl ? undefined : '16/9',
                  backgroundColor: embedUrl ? '#030712' : undefined,
                  boxShadow: '0 20px 50px -12px rgba(0,0,0,0.5)',
                  overflow: 'hidden', borderRadius: '1rem',
                }}
              >
                {embedUrl
                  ? <AutoHeightIframe src={embedUrl} title={headline} />
                  : video
                    ? <video src={video} autoPlay loop muted playsInline className="w-full h-full object-cover object-left-top" />
                    : <img src={image} alt={headline} className="w-full h-full object-cover object-left-top" />
                }
              </div>
            )
          }
        </div>

        {/* Desktop */}
        <div className="hidden md:block flex-1 relative">
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ borderRadius: '1rem', right: '-200px', boxShadow: '0 20px 50px -12px rgba(0,0,0,0.5)' }}
          >
            {customVisual
              ? customVisual
              : embedUrl
                ? <AutoHeightIframe src={embedUrl} title={headline} />
                : video
                  ? <video src={video} autoPlay loop muted playsInline className="w-full h-full object-cover object-center" />
                  : <img src={image} alt={headline} className="w-full h-full object-cover object-left-top" />
            }
          </div>
        </div>

      </div>
    </section>
  )
}
