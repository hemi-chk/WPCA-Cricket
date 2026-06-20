import { useNavigate } from 'react-router-dom'
import { X, LogIn } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function SignInPrompt({ onClose }) {
  const navigate = useNavigate()

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="relative z-10 bg-[#0a1628] border border-white/10 rounded-2xl p-8 w-full max-w-sm mx-4 text-center">
        
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/30 hover:text-white/70 transition-colors"
        >
          <X size={18} />
        </button>

        {/* Icon */}
        <div className="w-14 h-14 bg-[#1a6b3c]/20 border border-green-400/30 rounded-full flex items-center justify-center mx-auto mb-5">
          <LogIn size={24} className="text-green-400" />
        </div>

        <h3 className="text-xl font-bold text-white mb-2">Sign in required</h3>
        <p className="text-white/40 text-sm leading-relaxed mb-6">
          You need to sign in to access this section of the WPCA platform.
        </p>

        <Button
          onClick={() => { navigate('/login'); onClose(); }}
          className="w-full bg-[#1a6b3c] hover:bg-[#145c32] text-white py-5 text-sm font-bold tracking-widest mb-3"
        >
          SIGN IN
        </Button>

        <button
          onClick={onClose}
          className="text-white/30 text-sm hover:text-white/60 transition-colors"
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}