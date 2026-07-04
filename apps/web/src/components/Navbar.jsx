import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { Trophy } from 'lucide-react'
import SignInPrompt from './SignInPrompt'

export default function Navbar() {
  const navigate = useNavigate()
  const [showPrompt, setShowPrompt] = useState(false)

  const navLinks = ['Home', 'Players', 'Matches', 'Teams', 'Analytics']

  return (
    <>
      <nav className="flex items-center justify-between px-10 py-4 bg-[#0a1628]/80 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#1a6b3c] rounded-lg flex items-center justify-center text-white">
            <Trophy size={18} />
          </div>
          <span className="text-white font-medium text-sm tracking-wide">WPCA Women's Cricket</span>
        </div>

        <div className="flex gap-7">
          {navLinks.map(link => (
            <button
              key={link}
              onClick={() => link === 'Teams' ? navigate('/teams') : setShowPrompt(true)}
              className="text-white/70 text-sm hover:text-white transition-colors"
            >
              {link}
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          onClick={() => navigate('/login')}
          className="text-white border-white/30 bg-transparent hover:bg-white/10 text-sm"
        >
          Sign in
        </Button>
      </nav>

      {showPrompt && <SignInPrompt onClose={() => setShowPrompt(false)} />}
    </>
  )
}