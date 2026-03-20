export default function OutcomeStats({ stats = [], accentColor }) {
  const accent = accentColor || 'var(--color-accent)'
  const bg = `color-mix(in srgb, ${accent} 12%, #0a0a0f)`

  return (
    <section
      className="py-16 md:py-28 px-6 border-b relative overflow-hidden"
      style={{ background: bg, borderColor: `color-mix(in srgb, ${accent} 20%, transparent)` }}
    >
      {/* Ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-full max-w-[600px] h-[400px] rounded-full blur-[120px] opacity-20"
        style={{ background: accent }}
      />

      <div className="relative max-w-3xl mx-auto">
        {/* Label */}
        <p
          className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-8 text-center"
          style={{ color: accent }}
        >
          Outcomes
        </p>

        {/* Divider */}
        <div
          className="w-12 h-px mb-12 mx-auto"
          style={{ background: `linear-gradient(to right, transparent, ${accent}, transparent)` }}
        />

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x" style={{ borderColor: `color-mix(in srgb, ${accent} 20%, transparent)` }}>
          {stats.map((s, i) => (
            <div key={i} className="px-3 sm:px-4 md:px-10 py-6 md:py-8 text-center" style={{ borderColor: `color-mix(in srgb, ${accent} 20%, transparent)` }}>
              <p className="font-serif text-4xl sm:text-5xl font-light mb-2" style={{ color: '#f5f3ff' }}>{s.value}</p>
              <p className="text-xs font-semibold tracking-[0.3em] uppercase mb-2" style={{ color: accent }}>{s.label}</p>
              {s.description && (
                <p className="text-xs font-light" style={{ color: 'rgba(245,243,255,0.5)' }}>{s.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
