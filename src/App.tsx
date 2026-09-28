import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import SolutionSection from './components/SolutionSection'
import DemoAgenda from './components/DemoAgenda'
import ScreensGallery from './components/ScreensGallery'
import Architecture from './components/Architecture'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <DemoAgenda />
        <ScreensGallery />
        <Architecture />
      </main>
      <Footer />
    </div>
  )
}
