import PageWrapper from '../components/layout/PageWrapper'
import CaseStudyHero from '../case-study/CaseStudyHero'
import Overview from '../case-study/Overview'
import ProblemStatementBranded from '../case-study/ProblemStatementBranded'
import FeatureSection from '../case-study/FeatureSection'
import FeatureSectionHighlight from '../case-study/FeatureSectionHighlight'
import FeatureSectionBento from '../case-study/FeatureSectionBento'
import FeatureSectionSplit from '../case-study/FeatureSectionSplit'
import ResearchProcess from '../case-study/ResearchProcess'
import OutcomeStats from '../case-study/OutcomeStats'
import PrototypeLink from '../case-study/PrototypeLink'
import MoreWork from '../case-study/MoreWork'
import { influencer } from '../data/caseStudies/influencer'

const accent = influencer.accentColor

export default function CaseStudyInfluencer() {
  return (
    <PageWrapper>
      <CaseStudyHero
        title={influencer.title}
        tagline={influencer.tagline}
        category={influencer.category}
        heroImage={influencer.heroImage}
        heroVideo="/videos/creator.mp4"
        accentColor={accent}
      />
      <Overview
        role={influencer.role}
        timeline={influencer.timeline}
        tools={influencer.tools}
        prototypeUrl={influencer.prototypeUrl}
      />
      <ProblemStatementBranded
        headline={influencer.problem.headline}
        body={influencer.problem.body}
        accentColor={accent}
      />

      {/* App-branded surface theme — overrides site vars with the app's actual dark palette */}
      <div style={{
        '--color-surface':         '#030712',
        '--color-surface-alt':     '#111827',
        '--color-surface-muted':   '#1f2937',
        '--color-border':          'rgba(255, 255, 255, 0.08)',
        '--color-foreground':      '#f9fafb',
        '--color-foreground-muted':'#9ca3af',
      }}>
        {influencer.features.map((f, i) =>
          f.highlight
            ? <FeatureSectionHighlight key={i} {...f} accentColor={accent} />
            : f.split
              ? <FeatureSectionSplit key={i} {...f} accentColor={accent} />
              : f.bento
                ? <FeatureSectionBento key={i} {...f} accentColor={accent} />
                : <FeatureSection key={i} {...f} index={i} accentColor={accent} />
        )}
        {/* <ResearchProcess accentColor={accent} /> */}
        <OutcomeStats stats={influencer.stats} accentColor={accent} />
        <PrototypeLink url={influencer.prototypeUrl} projectName={influencer.title} accentColor={accent} />
      </div>
      <MoreWork currentId="influencer" />
    </PageWrapper>
  )
}
