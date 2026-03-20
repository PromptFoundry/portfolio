const methods = [
  {
    name: 'Usability Testing',
    description: 'Observed real users navigating campaign workflows to surface friction and uncover mental model gaps.',
  },
  {
    name: 'Scenario Mapping',
    description: 'Defined end-to-end task scenarios to ensure the design covered every critical user path.',
  },
  {
    name: 'Empathy Mapping',
    description: 'Synthesized user research into empathy maps to align the team around user needs, goals, and pain points.',
  },
  {
    name: "User Journeys",
    description: 'Mapped the full brand-to-creator journey to identify handoff points, delays, and opportunities for automation.',
  },
  {
    name: 'Whiteboarding',
    description: 'Rapid collaborative sketching sessions to explore layout patterns and interaction models before committing to high-fidelity.',
  },
]

const images = [
  { src: '/images/influencer-marketing/research-whiteboard.png', alt: 'Whiteboarding session' },
  { src: '/images/influencer-marketing/research-mindmap.png',    alt: 'Scenario mapping mind map' },
  { src: '/images/influencer-marketing/research-session.png',    alt: 'User research session' },
  { src: '/images/influencer-marketing/research-stickies.png',   alt: 'Affinity mapping with sticky notes' },
]

export default function ResearchProcess({ accentColor }) {
  const accent = accentColor || 'var(--color-accent)'
  const border = `color-mix(in srgb, ${accent} 18%, transparent)`
  const mutedText = 'rgba(245,243,255,0.5)'

  return (
    <section
      className="py-16 md:py-28 px-6 border-b overflow-hidden"
      style={{
        background: 'var(--color-surface, #0a0a0f)',
        borderColor: border,
      }}
    >
      <div className="mx-auto max-w-2xl lg:max-w-7xl">

        {/* Top: label + heading + description */}
        <div className="max-w-2xl">
          <p
            className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-6"
            style={{ color: accent }}
          >
            Research &amp; Process
          </p>
          <h2
            className="font-serif text-3xl md:text-4xl lg:text-5xl font-light leading-snug mb-6"
            style={{ color: '#f5f3ff' }}
          >
            Designed around real workflows.
          </h2>
          <p className="text-sm font-light leading-relaxed" style={{ color: mutedText }}>
            Before a single screen was designed, I spent time understanding how marketing teams actually operate —
            the tools they juggle, the handoffs that break down, and the decisions they make under pressure.
            Research shaped every interaction in this product.
          </p>
        </div>

        {/* Two-column: methods list + staggered image grid */}
        <div className="mt-16 grid grid-cols-1 lg:grid-cols-2 lg:gap-x-16 lg:gap-y-0 items-start">

          {/* Methods */}
          <div className="lg:pr-8">
            <div
              className="w-8 h-px mb-10"
              style={{ background: `linear-gradient(to right, ${accent}, transparent)` }}
            />
            <dl className="space-y-0 divide-y" style={{ borderColor: border }}>
              {methods.map((m) => (
                <div key={m.name} className="flex flex-col gap-y-1 py-5">
                  <dt
                    className="text-xs font-semibold tracking-[0.25em] uppercase"
                    style={{ color: accent }}
                  >
                    {m.name}
                  </dt>
                  <dd className="text-sm font-light leading-relaxed" style={{ color: mutedText }}>
                    {m.description}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Staggered 2×2 image grid */}
          <div className="pt-12 lg:pt-0 lg:-mr-16 xl:mr-auto">
            <div className="-mx-8 grid grid-cols-2 gap-4 sm:-mx-16 sm:grid-cols-2 lg:mx-0 xl:gap-6">
              <div
                className="aspect-square overflow-hidden rounded-xl"
                style={{ outline: `1px solid ${border}` }}
              >
                <img src={images[0].src} alt={images[0].alt} className="block size-full object-cover" />
              </div>
              <div
                className="-mt-8 aspect-square overflow-hidden rounded-xl lg:-mt-24"
                style={{ outline: `1px solid ${border}` }}
              >
                <img src={images[1].src} alt={images[1].alt} className="block size-full object-cover" />
              </div>
              <div
                className="aspect-square overflow-hidden rounded-xl"
                style={{ outline: `1px solid ${border}` }}
              >
                <img src={images[2].src} alt={images[2].alt} className="block size-full object-cover" />
              </div>
              <div
                className="-mt-8 aspect-square overflow-hidden rounded-xl lg:-mt-24"
                style={{ outline: `1px solid ${border}` }}
              >
                <img src={images[3].src} alt={images[3].alt} className="block size-full object-cover" />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
