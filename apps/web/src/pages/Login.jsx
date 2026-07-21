import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { User, AudioWaveform, ClipboardList, Trophy, Eye, EyeOff, ArrowLeft, Loader, AlertCircle } from 'lucide-react'
import { API } from '../lib/api.js'

export default function Login() {
  const navigate = useNavigate()
  const [role,         setRole]         = useState('player')
  const [email,        setEmail]        = useState('')
  const [password,     setPassword]     = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading,      setLoading]      = useState(false)
  const [error,        setError]        = useState('')

  const roles = [
    { id: 'player',   label: 'Player',   icon: <User size={22} /> },
    { id: 'coach',    label: 'Coach',    icon: <AudioWaveform size={22} /> },
    { id: 'selector', label: 'Selector', icon: <ClipboardList size={22} /> },
  ]

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res  = await fetch(`${API}/api/auth/login`, {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Login failed'); return }

      localStorage.setItem('wpca_token', data.token)
      localStorage.setItem('wpca_user',  JSON.stringify(data.user))

      // Redirect based on role
      if (data.user.role === 'coach') navigate('/coach')
      else navigate('/player')
    } catch {
      setError('Could not connect to server. Make sure the API is running.')
    } finally {
      setLoading(false)
    }
  }

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
            <div className="w-9 h-9 bg-[#1a6b3c] rounded-lg flex items-center justify-center text-white">
              <Trophy size={18} />
            </div>
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
        <div
          className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        <div className="relative z-10 w-full max-w-sm">

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-8"
          >
            <ArrowLeft size={16} /> Back to home
          </button>

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
                  role === r.id ? 'border-green-400 bg-green-400/10' : 'border-white/15 hover:border-green-400/50'
                }`}
              >
                <div className={`flex justify-center mb-1 ${role === r.id ? 'text-green-400' : 'text-white/50'}`}>
                  {r.icon}
                </div>
                <div className={`text-xs ${role === r.id ? 'text-green-400' : 'text-white/50'}`}>{r.label}</div>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Error */}
            {error && (
              <div className="flex items-center gap-2 bg-red-400/10 border border-red-400/25 rounded-lg px-4 py-3 text-red-400 text-sm">
                <AlertCircle size={15} className="shrink-0" />
                {error}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="text-white/50 text-xs tracking-widest block mb-2">EMAIL ADDRESS</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-green-400 transition-colors"
              />
            </div>

            {/* Password */}
            <div>
              <label className="text-white/50 text-xs tracking-widest block mb-2">PASSWORD</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                  className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-green-400 transition-colors pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/forgot-password')}
              className="text-green-400 text-xs hover:underline"
            >
              Forgot password?
            </button>

            <Button
              type="submit"
              disabled={loading}
              className="w-full bg-[#1a6b3c] hover:bg-[#145c32] text-white py-6 text-sm font-bold tracking-widest disabled:opacity-50"
            >
              {loading ? <Loader size={16} className="animate-spin mr-2" /> : null}
              {loading ? 'SIGNING IN…' : 'SIGN IN'}
            </Button>
          </form>

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
