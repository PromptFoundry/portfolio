// Default tiles for the Influencer Marketing case study
const INFLUENCER_TILES = [
  {
    image: '/images/influencer-marketing/top left.png',
    imageClass: 'object-left-top',
    label: 'Campaign Analytics',
    title: "Know what's driving results",
    body: 'All your campaign data, finally in one place. Spot top-performing creators, channels, and content instantly — and double down on what works. Less guessing. More scaling.',
    colSpan: 'lg:col-span-4',
    roundedExtra: 'max-lg:rounded-t-[2rem] lg:rounded-tl-[2rem]',
  },
  {
    image: '/images/influencer-marketing/top right.png',
    imageClass: '',
    label: 'Content Calendar',
    title: 'Everything, perfectly in sync',
    body: 'Plan and manage every campaign in a single, unified calendar. Track posts, deadlines, milestones, and key events across creators and platforms — all in one view.',
    colSpan: 'lg:col-span-2',
    roundedExtra: 'lg:rounded-tr-[2rem]',
  },
  {
    image: '/images/influencer-marketing/bottom left.png',
    imageClass: '',
    label: 'Audience Fit',
    title: "Know who's actually watching",
    body: 'Demographic and behavioral data for every creator surfaces audience overlap before you commit a single dollar.',
    colSpan: 'lg:col-span-2',
    roundedExtra: 'lg:rounded-bl-[2rem]',
  },
  {
    image: '/images/influencer-marketing/bottom right.png',
    imageClass: 'object-center-top',
    label: 'Messaging & Approvals',
    title: 'All communication, one place',
    body: 'Message creators, review content, and approve deliverables without leaving the platform. Every conversation tied to its campaign — so nothing gets lost and everything stays on track.',
    colSpan: 'lg:col-span-4',
    roundedExtra: 'max-lg:rounded-b-[2rem] lg:rounded-br-[2rem]',
  },
]

export default function FeatureSectionBento({ label, headline, body, accentColor, tiles }) {
  const accent = accentColor || 'var(--color-accent)'
  const tilesData = tiles || INFLUENCER_TILES

  return (
    <section
      className="py-16 md:py-24 border-b"
      style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-surface-alt)' }}
    >
      <div className="mx-auto max-w-2xl px-6 lg:max-w-7xl lg:px-8">

        {/* Header */}
        <p className="text-[10px] font-semibold tracking-[0.4em] uppercase" style={{ color: accent }}>
          {label}
        </p>
        <h3
          className="mt-3 max-w-lg font-serif text-3xl sm:text-4xl font-light leading-tight text-pretty md:text-5xl"
          style={{ color: 'var(--color-foreground)' }}
        >
          {headline}
        </h3>
        <div className="w-8 h-px mt-6" style={{ background: `linear-gradient(to right, ${accent}, transparent)` }} />
        {body && (
          <p className="mt-5 max-w-xl text-sm font-light leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
            {body}
          </p>
        )}

        {/* Bento grid */}
        <div className="mt-10 grid grid-cols-1 gap-4 sm:mt-16 lg:grid-cols-6 lg:grid-rows-2">
          {tilesData.map((tile) => (
            <div key={tile.label} className={`flex p-px ${tile.colSpan}`}>
              <div
                className={`w-full overflow-hidden rounded-xl ${tile.roundedExtra}`}
                style={{
                  backgroundColor: 'var(--color-surface)',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.4)',
                  outline: '1px solid var(--color-surface)',
                }}
              >
                {tile.video ? (
                  <video
                    src={tile.video}
                    className="h-52 sm:h-72 lg:h-80 w-full object-cover object-top"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                ) : (
                  <img
                    src={tile.image}
                    alt={tile.title}
                    className={`h-52 sm:h-72 lg:h-80 w-full object-cover ${tile.imageClass || ''}`}
                  />
                )}
                <div className="p-5 sm:p-8 lg:p-10">
                  <p className="text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: accent }}>
                    {tile.label}
                  </p>
                  <p className="mt-2 text-lg font-medium tracking-tight" style={{ color: 'var(--color-foreground)' }}
                    dangerouslySetInnerHTML={{ __html: tile.title }}
                  />
                  <p className="mt-2 max-w-lg text-sm leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
                    {tile.body}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
