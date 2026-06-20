import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function Login() {
  const navigate = useNavigate()
  const [role, setRole] = useState('player')
  const [showPassword, setShowPassword] = useState(false)

  const roles = [
    { id: 'player', label: 'Player', icon: '🏃‍♀️' },
    { id: 'coach', label: 'Coach', icon: '🎽' },
    { id: 'selector', label: 'Selector', icon: '📋' },
  ]

  return (
    <div className="grid grid-cols-2 min-h-screen">

      {/* Left side */}
      <div className="relative overflow-hidden">
        <div
          className="absolute inset-0"
          style={{ backgroundImage: "url('/hero-cricket.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a1628]/50 to-[#0a1628]/85" />
        <div className="relative z-10 p-10 h-full flex flex-col justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#1a6b3c] rounded-lg flex items-center justify-center text-white text-lg">🏆</div>
            <span className="text-white font-medium text-sm">WPCA Women's Cricket</span>
          </div>
          <div>
            <h1 className="text-5xl font-bold text-white leading-tight mb-4">
              Welcome<br />Back to <span className="text-green-400">Cricket.</span>
            </h1>
            <p className="text-white/60 text-sm">Sign in to access your dashboard,<br />matches, and team updates.</p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="bg-[#0a1628] flex items-center justify-center p-10 relative overflow-hidden">
        {/* Dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        <div className="relative z-10 w-full max-w-sm">
          <h2 className="text-3xl font-bold text-white mb-1">Sign in</h2>
          <p className="text-white/40 text-sm mb-8">Choose your role and enter your credentials</p>

          {/* Role selector */}
          <p className="text-white/50 text-xs tracking-widest mb-3">I AM A</p>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {roles.map(r => (
              <button
                key={r.id}
                onClick={() => setRole(r.id)}
                className={`border rounded-lg py-3 px-2 text-center transition-all ${
                  role === r.id
                    ? 'border-green-400 bg-green-400/10'
                    : 'border-white/15 hover:border-green-400/50'
                }`}
              >
                <div className="text-xl mb-1">{r.icon}</div>
                <div className={`text-xs ${role === r.id ? 'text-green-400' : 'text-white/50'}`}>{r.label}</div>
              </button>
            ))}
          </div>

          {/* Email */}
          <div className="mb-4">
            <label className="text-white/50 text-xs tracking-widest block mb-2">EMAIL ADDRESS</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-green-400 transition-colors"
            />
          </div>

          {/* Password */}
          <div className="mb-2">
            <label className="text-white/50 text-xs tracking-widest block mb-2">PASSWORD</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-green-400 transition-colors pr-10"
              />
              <button
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors text-sm"
              >
                {showPassword ? '🙈' : '👁️'}
              </button>
            </div>
          </div>

          {/* Forgot */}
          <div className="text-right mb-6">
            <a href="#" className="text-green-400 text-xs hover:underline">Forgot password?</a>
          </div>

          {/* Submit */}
          <Button className="w-full bg-[#1a6b3c] hover:bg-[#145c32] text-white py-6 text-sm font-bold tracking-widest">
            SIGN IN
          </Button>

          {/* Contact admin link */}
          <p className="text-center text-white/40 text-sm mt-6">
            Don't have an account?{' '}
            <span
              onClick={() => navigate('/contact-admin')}
              className="text-green-400 font-medium hover:underline cursor-pointer"
            >
              Contact admin
            </span>
          </p>
        </div>
      </div>
    </div>
  )
}