import { ExternalLink } from 'lucide-react'

export default function PrototypeLink({ url, projectName, accentColor }) {
  const accent = accentColor || 'var(--color-accent)'
  const btnBg = accentColor || 'var(--color-foreground)'
  const btnText = accentColor ? '#fff' : 'var(--color-surface)'

  return (
    <section
      className="py-24 px-6 border-t"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface)' }}
    >
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-4" style={{ color: accent }}>
          Live Prototype
        </p>
        <h2 className="font-serif text-4xl font-light mb-6" style={{ color: 'var(--color-foreground)' }}>
          See it in action.
        </h2>
        <div
          className="w-12 h-px mx-auto mb-8"
          style={{ background: accentColor ? `linear-gradient(to right, ${accent}, transparent)` : accent }}
        />
        <p className="text-sm font-light leading-relaxed mb-10" style={{ color: 'var(--color-foreground-muted)' }}>
          Explore the fully interactive prototype for {projectName} — all components, interactions, and variants working live.
        </p>
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 sm:px-10 py-3 sm:py-4 text-xs sm:text-sm font-semibold tracking-widest uppercase border transition-all"
          style={{ backgroundColor: btnBg, color: btnText, borderColor: btnBg }}
          onMouseEnter={e => {
            e.currentTarget.style.backgroundColor = 'transparent'
            e.currentTarget.style.color = accentColor ? accent : 'var(--color-foreground)'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.backgroundColor = btnBg
            e.currentTarget.style.color = btnText
          }}
        >
          Open {projectName} <ExternalLink size={15} />
        </a>
      </div>
    </section>
  )
}
