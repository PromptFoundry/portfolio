import PageWrapper from '../components/layout/PageWrapper'
import CaseStudyHero from '../case-study/CaseStudyHero'
import Overview from '../case-study/Overview'
import ProblemStatementBranded from '../case-study/ProblemStatementBranded'
import FeatureSectionHighlight from '../case-study/FeatureSectionHighlight'
import FeatureSectionSplit from '../case-study/FeatureSectionSplit'
import OutcomeStats from '../case-study/OutcomeStats'
import MoreWork from '../case-study/MoreWork'
import SavoraPromptVisual from '../case-study/SavoraPromptVisual'
import { savora } from '../data/caseStudies/savora'

const accent = savora.accentColor

export default function CaseStudySavora() {
  return (
    <PageWrapper>
      <CaseStudyHero
        title={savora.title}
        tagline={savora.tagline}
        category={savora.category}
        heroImage={savora.heroImage}
        heroVideo="https://pub-8bc960bf17b743588ae14838b4a96326.r2.dev/savora.mp4"
        accentColor={accent}
      />
      <Overview
        role={savora.role}
        outcome="AI-generated recipe app with voice-guided cooking"
        tools={savora.tools}
        prototypeUrl={savora.prototypeUrl}
      />
      <ProblemStatementBranded
        headline={savora.problem.headline}
        body={savora.problem.body}
        accentColor={accent}
      />

      {/* Warm dark surface theme — echoes Savora's ink palette */}
      <div style={{
        '--color-surface':          '#141411',
        '--color-surface-alt':      '#1c1b17',
        '--color-surface-muted':    '#252420',
        '--color-border':           'rgba(255,255,255,0.07)',
        '--color-foreground':       '#fafaf7',
        '--color-foreground-muted': '#9c9b93',
      }}>
        {savora.features.map((f, i) =>
          f.highlight
            ? <FeatureSectionHighlight key={i} {...f} accentColor={accent} customVisual={i === 0 ? <SavoraPromptVisual /> : undefined} />
            : f.split
              ? <FeatureSectionSplit key={i} {...f} accentColor={accent} />
              : null
        )}
        <OutcomeStats stats={savora.stats} accentColor={accent} />
      </div>

      <MoreWork currentId="savora" />
    </PageWrapper>
  )
}
