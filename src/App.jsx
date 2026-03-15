import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import CaseStudyArcis from './pages/CaseStudyArcis'
import CaseStudyInfluencer from './pages/CaseStudyInfluencer'
import CaseStudyTravelie from './pages/CaseStudyTravelie'
import CaseStudyOrka from './pages/CaseStudyOrka'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/work/arcis" element={<CaseStudyArcis />} />
        <Route path="/work/influencer-marketing" element={<CaseStudyInfluencer />} />
        <Route path="/work/travelie" element={<CaseStudyTravelie />} />
        <Route path="/work/orka" element={<CaseStudyOrka />} />
      </Routes>
    </BrowserRouter>
  )
}
