export default function ProblemStatement({ headline, body }) {
  return (
    <section className="py-16 md:py-24 px-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-3xl mx-auto">
        <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-6" style={{ color: 'var(--color-foreground-muted)' }}>
          The Challenge
        </p>
        <div className="border-l-2 pl-5 md:pl-8 mb-8" style={{ borderColor: 'var(--color-accent)' }}>
          <h2 className="font-serif text-2xl md:text-3xl font-light leading-snug" style={{ color: 'var(--color-foreground)' }}>
            "{headline}"
          </h2>
        </div>
        <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
          {body}
        </p>
      </div>
    </section>
  )
}
