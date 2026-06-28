import { BrowserRouter, Routes, Route } from 'react-router-dom'
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
        <Route path="/player" element={<PlayerDashboard />} />
        <Route path="/age-category/:slug" element={<AgeCategoryDetail />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App