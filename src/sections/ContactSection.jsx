import { ArrowUpRight } from 'lucide-react'

export default function ContactSection() {
  return (
    <section id="contact" className="py-16 md:py-24 px-6 border-t" style={{ borderColor: 'var(--color-border)' }}>
      <div className="max-w-2xl mx-auto text-center">
        <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--color-foreground-muted)' }}>
          Get In Touch
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-light mb-6" style={{ color: 'var(--color-foreground)' }}>
          Let's work together.
        </h2>
        <div className="w-12 h-px mx-auto mb-6" style={{ backgroundColor: 'var(--color-accent)' }} />
        <p className="text-sm font-light leading-relaxed mb-10" style={{ color: 'var(--color-foreground-muted)' }}>
          I'm currently available for freelance projects and collaborations. If you're building something interesting, I'd love to connect.
        </p>
        <a
          href="mailto:chasehignight@gmail.com"
          className="inline-flex items-center gap-2 font-serif text-base sm:text-xl md:text-2xl font-light border-b pb-1 transition-colors"
          style={{ color: 'var(--color-foreground)', borderColor: 'var(--color-accent)' }}
          onMouseEnter={e => e.currentTarget.style.color = 'var(--color-accent)'}
          onMouseLeave={e => e.currentTarget.style.color = 'var(--color-foreground)'}
        >
          chasehignight@gmail.com <ArrowUpRight size={20} />
        </a>
      </div>
    </section>
  )
}
