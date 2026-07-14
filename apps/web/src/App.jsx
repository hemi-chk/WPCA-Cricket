import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Activity, Newspaper, Star } from 'lucide-react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import AgeCategories from './components/AgeCategories'
import Roles from './components/Roles'
import CTA from './components/CTA'
import Footer from './components/Footer'
import Login from './pages/Login'
import ContactAdmin from './pages/ContactAdmin'
import ForgotPassword from './pages/ForgotPassword'
import PlayerDashboard from './pages/PlayerDashboard'
import AgeCategoryDetail from "./pages/AgeCategoryDetail";
import PlayerCalendar from './pages/PlayerCalendar'
import Teams from './pages/Teams'
import Analytics from './pages/Analytics'
import ComingSoon from './pages/player/ComingSoon'
import ProtectedRoute from './components/ProtectedRoute'








function Home() {
  return (
    <div className="relative min-h-screen">
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: "url('/hero-cricket.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'blur(8px)',
          transform: 'scale(1.1)',
        }}
      />
      <div className="fixed inset-0 z-0 bg-black/60" />
      <div className="relative z-10">
        <Navbar />
        <Hero />
        <Features />
        <AgeCategories />
        <Roles />
        <CTA />
        <Footer />
      </div>
    </div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact-admin" element={<ContactAdmin />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/player" element={<ProtectedRoute><PlayerDashboard /></ProtectedRoute>} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/player/calendar" element={<ProtectedRoute><PlayerCalendar /></ProtectedRoute>} />
        <Route path="/player/live-matches" element={<ProtectedRoute><ComingSoon title="Live Matches" icon={Activity} description="Live match scoring and streaming will be available in a future update." /></ProtectedRoute>} />
        <Route path="/player/news" element={<ProtectedRoute><ComingSoon title="News" icon={Newspaper} description="Club and provincial cricket news will appear here soon." /></ProtectedRoute>} />
        <Route path="/player/subscription" element={<ProtectedRoute><ComingSoon title="Subscription" icon={Star} description="Membership and subscription management is coming soon." /></ProtectedRoute>} />
        <Route path="/age-category/:slug" element={<AgeCategoryDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App