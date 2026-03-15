import Tag from '../components/ui/Tag'

const skills = ['Product Design', 'UI Development', 'Design Systems', 'React', 'Tailwind CSS', 'Figma', 'Prototyping', 'User Research']

export default function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 border-t" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-alt)' }}>
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Headshot */}
        <div className="aspect-[4/5] overflow-hidden">
          <img
            src="/images/chase.png"
            alt="Chase Hignight"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Text */}
        <div>
          <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--color-foreground-muted)' }}>
            About Me
          </p>
          <h2 className="font-serif text-4xl font-light mb-6 leading-tight" style={{ color: 'var(--color-foreground)' }}>
            Designer who codes.<br />Developer who designs.
          </h2>
          <div className="w-12 h-px mb-6" style={{ backgroundColor: 'var(--color-accent)' }} />
          <p className="text-sm font-light leading-relaxed mb-4" style={{ color: 'var(--color-foreground-muted)' }}>
            I bridge the gap between design intent and technical execution — comfortable in Figma, equally comfortable in a codebase. I believe the best digital products come from designers who understand constraints and developers who respect aesthetics.
          </p>
          <p className="text-sm font-light leading-relaxed mb-8" style={{ color: 'var(--color-foreground-muted)' }}>
            My work spans design systems, SaaS products, and consumer apps — always pushing toward high-fidelity, production-ready output.
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => <Tag key={s}>{s}</Tag>)}
          </div>
        </div>
      </div>
    </section>
  )
}
