import Navbar from './components/Navbar'
import Hero from './components/Hero'
import ProblemSection from './components/ProblemSection'
import SolutionSection from './components/SolutionSection'
import DemoAgenda from './components/DemoAgenda'
import ProntuarioSection from './components/ProntuarioSection'
import ScreensGallery from './components/ScreensGallery'
import Architecture from './components/Architecture'
import Footer from './components/Footer'
import { useLocalStorage } from './hooks/useLocalStorage'
import { initialAppointments } from './data/mockData'
import type { Appointment } from './types'

export default function App() {
  // Estado dos agendamentos fica aqui em cima para que a Demo interativa e a
  // busca de Prontuário enxerguem sempre os mesmos dados (mock + localStorage).
  const [appointments, setAppointments] = useLocalStorage<Appointment[]>(
    'petvida-agenda-demo',
    initialAppointments,
  )

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <ProblemSection />
        <SolutionSection />
        <DemoAgenda appointments={appointments} setAppointments={setAppointments} />
        <ProntuarioSection appointments={appointments} />
        <ScreensGallery />
        <Architecture />
      </main>
      <Footer />
    </div>
  )
}
