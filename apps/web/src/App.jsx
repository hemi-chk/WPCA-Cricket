import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Features from './components/Features'
import AgeCategories from './components/AgeCategories'
import Roles from './components/Roles'
import CTA from './components/CTA'
import Footer from './components/Footer'

function App() {
  return (
    <div className="relative min-h-screen">
      {/* Blurred background image */}
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
      {/* Dark overlay */}
      <div className="fixed inset-0 z-0 bg-black/60" />

      {/* Content */}
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

export default App