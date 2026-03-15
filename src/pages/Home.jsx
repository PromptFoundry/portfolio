import PageWrapper from '../components/layout/PageWrapper'
import Hero from '../sections/Hero'
import StatsBar from '../sections/StatsBar'
import ProjectGrid from '../sections/ProjectGrid'
import AboutSection from '../sections/AboutSection'
import ContactSection from '../sections/ContactSection'

export default function Home() {
  return (
    <PageWrapper>
      <Hero />
      <StatsBar />
      <ProjectGrid />
      <AboutSection />
      <ContactSection />
    </PageWrapper>
  )
}
