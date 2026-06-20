import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function ContactAdmin() {
  const navigate = useNavigate()
  const [submitted, setSubmitted] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', role: 'player', message: '' })

  const roles = [
    { id: 'player', label: 'Player', icon: '🏃‍♀️' },
    { id: 'coach', label: 'Coach', icon: '🎽' },
    { id: 'selector', label: 'Selector', icon: '📋' },
  ]

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e) => {
    e.preventDefault()
    // Will connect to backend later
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-[#0a1628] flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />
        <div className="relative z-10 text-center max-w-md px-6">
          <div className="text-6xl mb-6">✅</div>
          <h2 className="text-3xl font-bold text-white mb-3">Request sent!</h2>
          <p className="text-white/50 text-sm leading-relaxed mb-8">
            Your request has been sent to the WPCA admin. They will review it and send your credentials to <span className="text-green-400">{form.email}</span> shortly.
          </p>
          <Button
            onClick={() => navigate('/login')}
            className="bg-[#1a6b3c] hover:bg-[#145c32] text-white px-8 py-5"
          >
            Back to sign in
          </Button>
        </div>
      </div>
    )
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
            <div className="w-9 h-9 bg-[#1a6b3c] rounded-lg flex items-center justify-center text-white text-lg">🏆</div>
            <span className="text-white font-medium text-sm">WPCA Women's Cricket</span>
          </div>
          <div>
            <h1 className="text-5xl font-bold text-white leading-tight mb-4">
              Request<br />Your <span className="text-green-400">Access.</span>
            </h1>
            <p className="text-white/60 text-sm leading-relaxed">
              WPCA is a managed system.<br />
              Contact the admin to get your credentials<br />
              and join the platform.
            </p>
          </div>
        </div>
      </div>

      {/* Right side */}
      <div className="bg-[#0a1628] flex items-center justify-center p-10 relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.06]"
          style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }}
        />

        <div className="relative z-10 w-full max-w-sm">
          {/* Back link */}
          <button
            onClick={() => navigate('/login')}
            className="text-white/40 text-xs hover:text-white/70 transition-colors mb-8 flex items-center gap-2"
          >
            ← Back to sign in
          </button>

          <h2 className="text-3xl font-bold text-white mb-1">Contact admin</h2>
          <p className="text-white/40 text-sm mb-8">Fill in your details and we'll get you set up</p>

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Full name */}
            <div>
              <label className="text-white/50 text-xs tracking-widest block mb-2">FULL NAME</label>
              <input
                type="text"
                name="name"
                required
                placeholder="Enter your full name"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-green-400 transition-colors"
              />
            </div>

            {/* Email */}
            <div>
              <label className="text-white/50 text-xs tracking-widest block mb-2">EMAIL ADDRESS</label>
              <input
                type="email"
                name="email"
                required
                placeholder="Enter your email"
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-green-400 transition-colors"
              />
            </div>

            {/* Role */}
            <div>
              <label className="text-white/50 text-xs tracking-widest block mb-3">I AM REQUESTING ACCESS AS</label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map(r => (
                  <button
                    type="button"
                    key={r.id}
                    onClick={() => setForm({ ...form, role: r.id })}
                    className={`border rounded-lg py-3 px-2 text-center transition-all ${
                      form.role === r.id
                        ? 'border-green-400 bg-green-400/10'
                        : 'border-white/15 hover:border-green-400/50'
                    }`}
                  >
                    <div className="text-xl mb-1">{r.icon}</div>
                    <div className={`text-xs ${form.role === r.id ? 'text-green-400' : 'text-white/50'}`}>{r.label}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Message */}
            <div>
              <label className="text-white/50 text-xs tracking-widest block mb-2">MESSAGE (OPTIONAL)</label>
              <textarea
                name="message"
                rows={3}
                placeholder="Tell the admin a bit about yourself..."
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-green-400 transition-colors resize-none"
              />
            </div>

            <Button
              type="submit"
              className="w-full bg-[#1a6b3c] hover:bg-[#145c32] text-white py-6 text-sm font-bold tracking-widest mt-2"
            >
              SEND REQUEST
            </Button>
          </form>
        </div>
      </div>
    </div>
  )
}