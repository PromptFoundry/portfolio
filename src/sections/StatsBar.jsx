const stats = [
  { value: '4', label: 'Case Studies' },
  { value: '10+', label: 'Years Experience' },
  { value: '100M', label: 'Pixels Pushed' },
  { value: '200K', label: 'Components Built' },
]

export default function StatsBar() {
  return (
    <section className="border-b" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0" style={{ borderColor: 'var(--color-border)' }}>
        {stats.map((s, i) => (
          <div key={i} className="px-8 py-6 flex flex-col items-center text-center" style={{ borderColor: 'var(--color-border)' }}>
            <span className="font-serif text-3xl font-light mb-1" style={{ color: 'var(--color-foreground)' }}>{s.value}</span>
            <span className="text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--color-foreground-muted)' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
