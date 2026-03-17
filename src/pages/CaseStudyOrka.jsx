import PageWrapper from '../components/layout/PageWrapper'
import CaseStudyHero from '../case-study/CaseStudyHero'
import Overview from '../case-study/Overview'
import ProblemStatementBranded from '../case-study/ProblemStatementBranded'
import FeatureSection from '../case-study/FeatureSection'
import FeatureSectionHighlight from '../case-study/FeatureSectionHighlight'
import FeatureSectionSplit from '../case-study/FeatureSectionSplit'
import OutcomeStats from '../case-study/OutcomeStats'
import PrototypeLink from '../case-study/PrototypeLink'
import MoreWork from '../case-study/MoreWork'
import { orka } from '../data/caseStudies/orka'

const accent = orka.accentColor

export default function CaseStudyOrka() {
  return (
    <PageWrapper>
      <CaseStudyHero
        title={orka.title}
        tagline={orka.tagline}
        category={orka.category}
        heroImage={orka.heroImage}
        heroVideo="/videos/orka.mp4"
        accentColor={accent}
      />
      <Overview
        role={orka.role}
        timeline={orka.timeline}
        tools={orka.tools}
        prototypeUrl={orka.prototypeUrl}
      />
      <ProblemStatementBranded
        headline={orka.problem.headline}
        body={orka.problem.body}
        accentColor={accent}
      />

      {/* Orka brand palette — deep dark with emerald accents */}
      <div style={{
        '--color-surface':          '#030d07',
        '--color-surface-alt':      '#071410',
        '--color-surface-muted':    '#0d1f19',
        '--color-border':           'rgba(16, 185, 129, 0.12)',
        '--color-foreground':       '#f0faf5',
        '--color-foreground-muted': '#6b9e8a',
      }}>
        {orka.features.map((f, i) =>
          f.highlight
            ? <FeatureSectionHighlight key={i} {...f} accentColor={accent} />
            : f.split
              ? <FeatureSectionSplit key={i} {...f} accentColor={accent} />
              : <FeatureSection key={i} {...f} index={i} accentColor={accent} />
        )}
        <OutcomeStats stats={orka.stats} accentColor={accent} />
        <PrototypeLink url={orka.prototypeUrl} projectName={orka.title} accentColor={accent} />
      </div>
      <MoreWork currentId="orka" />
    </PageWrapper>
  )
}
