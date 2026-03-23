import {
  MagnifyingGlassIcon,
  ChartBarIcon,
  UserGroupIcon,
  StarIcon,
  FunnelIcon,
  BoltIcon,
} from '@heroicons/react/20/solid'

const ICONS = [MagnifyingGlassIcon, ChartBarIcon, UserGroupIcon, StarIcon, FunnelIcon, BoltIcon]

export default function FeatureSectionScreenshot({ label, headline, body, image, features = [], accentColor }) {
  const accent = accentColor || 'var(--color-accent)'

  return (
    <section
      className="border-b"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-16 md:py-24">

        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: accent }}>
            {label}
          </p>
          <h3
            className="mt-4 font-serif text-3xl sm:text-4xl md:text-5xl font-light leading-tight text-pretty"
            style={{ color: 'var(--color-foreground)' }}
          >
            {headline}
          </h3>
          <p className="mt-6 text-sm font-light leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
            {body}
          </p>
        </div>

        {/* Screenshot */}
        <div className="relative pt-12">
          <div className="mx-auto max-w-5xl">
            <img
              src={image}
              alt={headline}
              className="rounded-xl"
              style={{
                outline: `1px solid ${accent}40`,
                boxShadow: `0 25px 50px -12px rgba(0,0,0,0.5), 0 -18px 40px -8px ${accent}30, -18px 10px 40px -15px ${accent}22, 18px 10px 40px -15px ${accent}22`,
                clipPath: 'inset(-80px -80px 0px -80px)',
              }}
            />
            <div aria-hidden="true" className="absolute bottom-0 left-0 right-0 h-32"
              style={{ background: `linear-gradient(to top, var(--color-surface), transparent)` }}
            />
          </div>
        </div>

        {/* Feature grid */}
        {features.length > 0 && (
          <dl className="mx-auto mt-12 grid max-w-2xl grid-cols-1 gap-x-6 gap-y-8 text-sm sm:grid-cols-2 lg:mx-0 lg:max-w-none lg:grid-cols-3 lg:gap-x-8 lg:gap-y-12">
            {features.map((feature, i) => {
              const Icon = ICONS[i % ICONS.length]
              return (
                <div key={feature.name} className="relative pl-9">
                  <Icon
                    aria-hidden="true"
                    className="absolute top-0.5 left-1 size-5"
                    style={{ color: accent }}
                  />
                  <dt className="font-semibold" style={{ color: 'var(--color-foreground)' }}>
                    {feature.name}
                  </dt>
                  <dd className="mt-1 font-light leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
                    {feature.description}
                  </dd>
                </div>
              )
            })}
          </dl>
        )}

      </div>
    </section>
  )
}
