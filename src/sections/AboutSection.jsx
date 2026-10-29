import Tag from '../components/ui/Tag'

const skills = ['Product Design', 'UI Development', 'Design Systems', 'React', 'Figma', 'Prototyping', 'User Research']

export default function AboutSection() {
  return (
    <section id="about" className="py-16 md:py-24 px-6 border-t" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-alt)' }}>
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16 items-center">
        {/* Headshot */}
        <div className="aspect-[4/5] overflow-hidden md:col-span-1">
          <img
            src="/images/chase.jpg"
            alt="Chase Hignight"
            className="w-full h-full object-cover object-top"
          />
        </div>

        {/* Text */}
        <div className="md:col-span-2">
          <p className="text-xs font-semibold tracking-[0.4em] uppercase mb-4" style={{ color: 'var(--color-foreground-muted)' }}>
            About Me
          </p>
          <h2 className="font-serif text-3xl md:text-4xl font-light mb-6 leading-tight" style={{ color: 'var(--color-foreground)' }}>
            Where design vision meets technical execution
          </h2>
          <div className="w-12 h-px mb-6" style={{ backgroundColor: 'var(--color-accent)' }} />
          <p className="text-sm font-light leading-relaxed mb-4" style={{ color: 'var(--color-foreground-muted)' }}>
            I enjoy working at the intersection of design and engineering, bridging the gap between creative vision and real-world execution.
          </p>
          <p className="text-sm font-light leading-relaxed mb-8" style={{ color: 'var(--color-foreground-muted)' }}>
            My experience spans design systems, SaaS platforms, and consumer applications, with a focus on creating experiences that feel intuitive, intentional, and thoughtfully crafted.
          </p>
          <div className="flex flex-wrap gap-2">
            {skills.map(s => <Tag key={s}>{s}</Tag>)}
          </div>
        </div>
      </div>
    </section>
  )
}
