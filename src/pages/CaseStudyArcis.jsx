import PageWrapper from '../components/layout/PageWrapper'
import CaseStudyHero from '../case-study/CaseStudyHero'
import Overview from '../case-study/Overview'
import ProblemStatementBranded from '../case-study/ProblemStatementBranded'
import FeatureSection from '../case-study/FeatureSection'
import FeatureSectionHighlight from '../case-study/FeatureSectionHighlight'
import TemplateShowcase from '../case-study/TemplateShowcase'
import FeatureSectionBento from '../case-study/FeatureSectionBento'
import FeatureSectionSplit from '../case-study/FeatureSectionSplit'
import ScreenshotGallery from '../case-study/ScreenshotGallery'
import OutcomeStats from '../case-study/OutcomeStats'
import PrototypeLink from '../case-study/PrototypeLink'
import MoreWork from '../case-study/MoreWork'
import { arcis } from '../data/caseStudies/arcis'

const accent = arcis.accentColor

export default function CaseStudyArcis() {
  return (
    <PageWrapper>
      <CaseStudyHero
        title={arcis.title}
        tagline={arcis.tagline}
        category={arcis.category}
        heroImage={arcis.heroImage}
        heroVideo="/videos/arcis.mp4"
        accentColor={accent}
      />
      <Overview
        role={arcis.role}
        timeline={arcis.timeline}
        tools={arcis.tools}
        prototypeUrl={arcis.prototypeUrl}
      />
      <ProblemStatementBranded
        headline={arcis.problem.headline}
        body={arcis.problem.body}
        accentColor={accent}
      />

      {/* Arcis brand palette — deep warm dark */}
      <div style={{
        '--color-surface':          '#080703',
        '--color-surface-alt':      '#110e08',
        '--color-surface-muted':    '#1c1810',
        '--color-border':           'rgba(200, 169, 110, 0.12)',
        '--color-foreground':       '#faf7f0',
        '--color-foreground-muted': '#a09070',
      }}>
        {arcis.features.map((f, i) =>
          f.highlight
            ? <FeatureSectionHighlight key={i} {...f} accentColor={accent} customVisual={<TemplateShowcase />} />
            : f.split
              ? <FeatureSectionSplit key={i} {...f} accentColor={accent} />
              : f.bento
                ? <FeatureSectionBento key={i} {...f} tiles={f.bentoTiles} accentColor={accent} />
                : <FeatureSection key={i} {...f} index={i} accentColor={accent} />
        )}
        <ScreenshotGallery images={arcis.gallery} accentColor={accent} />
        <OutcomeStats stats={arcis.stats} accentColor={accent} />
        <PrototypeLink url={arcis.prototypeUrl} projectName={arcis.title} accentColor={accent} />
      </div>
      <MoreWork currentId="arcis" />
    </PageWrapper>
  )
}
