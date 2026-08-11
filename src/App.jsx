import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AuthProvider } from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import PublicationsPage from './pages/PublicationsPage'
import AdminPage from './pages/AdminPage'
import GalleryPage from './pages/GalleryPage'
import { AboutPage, ProgrammesPage, EventsPage, ContactPage } from './pages/OtherPages'
import { ConferencePage } from './pages/ConferencePage'
import { PreConferencePage } from './pages/PreConferencePage'
import { CurrentStaffPage, CurrentExecutivesPage, PastStaffPage, PastExecutivesPage } from './pages/StaffPages'
import { GenderDevelopmentPage, HumanitarianDevelopmentPage, ShortCoursesPage } from './pages/ProgrammeDetailPages'
import { OkaforIkwubizoLiteraturePage } from './pages/LiteraturePage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [pathname])
  return null
}

function Layout() {
  const location = useLocation()
  const isAdmin = location.pathname.startsWith('/admin')

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!isAdmin && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/programmes" element={<ProgrammesPage />} />
          <Route path="/programmes/gender-development" element={<GenderDevelopmentPage />} />
          <Route path="/programmes/humanitarian-development" element={<HumanitarianDevelopmentPage />} />
          <Route path="/programmes/short-courses" element={<ShortCoursesPage />} />
          <Route path="/events" element={<EventsPage />} />
          <Route path="/events/2025-international-conference" element={<ConferencePage />} />
          <Route path="/events/pre-conference-workshop" element={<PreConferencePage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/gallery" element={<GalleryPage />} />
          <Route path="/staff/executives" element={<CurrentExecutivesPage />} />
          <Route path="/staff/current" element={<CurrentStaffPage />} />
          <Route path="/staff/past-executives" element={<PastExecutivesPage />} />
          <Route path="/staff/past" element={<PastStaffPage />} />
          <Route path="/publications/literature/okafor-and-ikwubizo" element={<OkaforIkwubizoLiteraturePage />} />
          <Route path="/publications/:type" element={<PublicationsPage />} />
          <Route path="/admin" element={<AdminPage />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Layout />
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
