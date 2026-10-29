export default function ProblemStatementBranded({ headline, body, accentColor }) {
  const accent = accentColor || 'var(--color-accent)'

  // Derive a very dark tinted background from the accent (hardcoded per-brand for fidelity)
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
          className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-8"
          style={{ color: accent }}
        >
          The Challenge
        </p>

        {/* Headline */}
        <h2
          className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-snug mb-8"
          style={{ color: '#f5f3ff' }}
        >
          "{headline}"
        </h2>

        {/* Divider */}
        <div
          className="w-12 h-px mb-8"
          style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
        />

        {/* Body */}
        {body.split('\n\n').map((para, i) => (
          <p
            key={i}
            className={`text-sm font-light leading-relaxed mb-4 last:mb-0${i === 0 ? ' italic' : ''}`}
            style={{ color: i === 0 ? 'rgba(245,243,255,0.35)' : 'rgba(245,243,255,0.6)' }}
          >
            {para}
          </p>
        ))}
      </div>
    </section>
  )
}
