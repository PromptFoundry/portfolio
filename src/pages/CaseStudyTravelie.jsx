import PageWrapper from '../components/layout/PageWrapper'
import CaseStudyHero from '../case-study/CaseStudyHero'
import Overview from '../case-study/Overview'
import ProblemStatementBranded from '../case-study/ProblemStatementBranded'
import OutcomeStats from '../case-study/OutcomeStats'
import PrototypeLink from '../case-study/PrototypeLink'
import MoreWork from '../case-study/MoreWork'
import PhoneFrame from '../case-study/PhoneFrame'
import { travelie } from '../data/caseStudies/travelie'

const accent = travelie.accentColor

const FEATURE_PHONES = [
  { src: '/projects/travelie/?page=dashboard&dark=1', image: '/images/travelie/home-mobile.png' },
  { src: '/projects/travelie/?page=plan&dark=1',      image: '/images/travelie/plan-trip-mobile.png' },
  { src: '/projects/travelie/?page=packages&dark=1',  image: '/images/travelie/explore-mobile.png' },
]

// ── Three-up phone showcase ──────────────────────────────────────────────
function ThreeUpShowcase() {
  return (
    <section
      className="py-16 md:py-24 px-6 overflow-hidden border-b"
      style={{ backgroundColor: 'var(--color-surface-alt)', borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-4xl mx-auto text-center mb-12 md:mb-20">
        <p
          className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-4"
          style={{ color: accent }}
        >
          AI Powered Travel
        </p>
        <h2
          className="font-serif text-3xl md:text-4xl font-light leading-snug"
          style={{ color: 'var(--color-foreground)' }}
        >
          Less planning. More going.
        </h2>
      </div>

      {/* Mobile: single centered phone */}
      <div className="flex md:hidden justify-center">
        <div style={{ filter: `drop-shadow(0 30px 60px rgba(0,0,0,0.65)) drop-shadow(0 0 30px ${accent}22)` }}>
          <PhoneFrame image="/images/travelie/home-mobile.png" width={220} />
        </div>
      </div>

      {/* Desktop: three-up */}
      <div
        className="hidden md:flex items-end justify-center"
        style={{ gap: 0, perspective: '1400px' }}
      >
        <div style={{ transform: 'rotateY(10deg) rotateZ(-2.5deg) translateX(56px) translateY(28px) scale(0.82)', transformOrigin: 'right bottom', zIndex: 0, filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.55))' }}>
          <PhoneFrame image="/images/travelie/plan-trip-mobile.png" width={240} />
        </div>
        <div style={{ zIndex: 10, filter: `drop-shadow(0 50px 80px rgba(0,0,0,0.65)) drop-shadow(0 0 40px ${accent}22)` }}>
          <PhoneFrame image="/images/travelie/home-mobile.png" width={290} />
        </div>
        <div style={{ transform: 'rotateY(-10deg) rotateZ(2.5deg) translateX(-56px) translateY(28px) scale(0.82)', transformOrigin: 'left bottom', zIndex: 0, filter: 'drop-shadow(0 40px 60px rgba(0,0,0,0.55))' }}>
          <PhoneFrame image="/images/travelie/explore-mobile.png" width={240} />
        </div>
      </div>

      {/* Screen labels — hidden on mobile */}
      <div className="hidden md:flex justify-center gap-16 mt-10">
        {['Plan a Trip', 'Dashboard', 'Explore'].map((label) => (
          <p key={label} className="text-[10px] font-semibold tracking-[0.3em] uppercase" style={{ color: 'var(--color-foreground-muted)' }}>
            {label}
          </p>
        ))}
      </div>
    </section>
  )
}

// ── Per-feature section with phone ────────────────────────────────────────
function MobileFeatureSection({ feature, index, phone }) {
  const isRight = feature.imagePosition === 'right'

  return (
    <section
      className="py-16 md:py-20 px-6 border-b"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: index % 2 === 1 ? 'var(--color-surface-alt)' : 'var(--color-surface)',
      }}
    >
      <div
        className={`max-w-5xl mx-auto flex flex-col items-center gap-12 md:gap-24 ${isRight ? 'md:flex-row' : 'md:flex-row-reverse'}`}
      >
        {/* Text */}
        <div className="flex-1 min-w-0 w-full">
          <p
            className="text-[10px] font-semibold tracking-[0.4em] uppercase mb-4"
            style={{ color: accent }}
          >
            {feature.label}
          </p>
          <h3
            className="font-serif text-2xl md:text-3xl font-light mb-5 leading-snug"
            style={{ color: 'var(--color-foreground)' }}
          >
            {feature.headline}
          </h3>
          <div className="w-8 h-px mb-5" style={{ background: `linear-gradient(to right, ${accent}, transparent)` }} />
          <p className="text-sm font-light leading-relaxed" style={{ color: 'var(--color-foreground-muted)' }}>
            {feature.body}
          </p>
        </div>

        {/* Phone */}
        <div className="flex-shrink-0 flex justify-center" style={{ filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.5))' }}>
          <PhoneFrame src={phone.src} width={220} />
        </div>
      </div>
    </section>
  )
}

// ── Page ──────────────────────────────────────────────────────────────────
export default function CaseStudyTravelie() {
  return (
    <PageWrapper>
      <CaseStudyHero
        title={travelie.title}
        tagline={travelie.tagline}
        category={travelie.category}
        heroImage={travelie.heroImage}
        heroVideo="https://pub-8bc960bf17b743588ae14838b4a96326.r2.dev/travelie.mp4"
        accentColor={accent}
      />
      <Overview
        role={travelie.role}
        timeline={travelie.timeline}
        tools={travelie.tools}
        prototypeUrl={travelie.prototypeUrl}
        accentColor={accent}
      />
      <ProblemStatementBranded
        headline={travelie.problem.headline}
        body={travelie.problem.body}
        accentColor={accent}
      />

      <div style={{
        '--color-surface':          '#030a14',
        '--color-surface-alt':      '#081625',
        '--color-surface-muted':    '#0e2035',
        '--color-border':           'rgba(14, 165, 233, 0.12)',
        '--color-foreground':       '#f0f8ff',
        '--color-foreground-muted': '#6b99bb',
      }}>
        <ThreeUpShowcase />

        {travelie.features.map((f, i) => (
          <MobileFeatureSection key={i} feature={f} index={i} phone={FEATURE_PHONES[i]} />
        ))}

        <OutcomeStats stats={travelie.stats} accentColor={accent} />
        <PrototypeLink url={travelie.prototypeUrl} projectName={travelie.title} accentColor={accent} />
      </div>
      <MoreWork currentId="travelie" />
    </PageWrapper>
  )
}
