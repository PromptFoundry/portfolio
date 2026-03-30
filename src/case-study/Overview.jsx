import Tag from '../components/ui/Tag'
import { ExternalLink } from 'lucide-react'

export default function Overview({ role, timeline, outcome, tools, prototypeUrl, accentColor }) {
  return (
    <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 divide-y sm:divide-y-0 divide-x-0 sm:divide-x" style={{ borderColor: 'var(--color-border)' }}>
        {[
          { label: 'Role', value: role },
          outcome ? { label: 'Outcome', value: outcome } : { label: 'Timeline', value: timeline },
          { label: 'Tools', value: tools.join(', ') },
        ].map(item => (
          <div key={item.label} className="px-6 md:px-8 py-6 md:py-8" style={{ borderColor: 'var(--color-border)' }}>
            <p className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--color-foreground-muted)' }}>
              {item.label}
            </p>
            <p className="text-sm font-light" style={{ color: 'var(--color-foreground)' }}>{item.value}</p>
          </div>
        ))}
        <div className="px-6 md:px-8 py-6 md:py-8" style={{ borderColor: 'var(--color-border)' }}>
          <p className="text-[10px] font-semibold tracking-[0.35em] uppercase mb-2" style={{ color: 'var(--color-foreground-muted)' }}>
            Prototype
          </p>
          <a
            href={prototypeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-medium tracking-wider uppercase transition-colors"
            style={{ color: 'var(--color-foreground)' }}
            onMouseEnter={e => e.currentTarget.style.color = accentColor || 'var(--color-accent)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--color-foreground)'}
          >
            View Project <ExternalLink size={12} />
          </a>
        </div>
      </div>
    </section>
  )
}
