import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Trophy, ArrowLeft, Mail, KeyRound, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'

export default function ForgotPassword() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState('')
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleOtpChange = (value, index) => {
    if (!/^\d*$/.test(value)) return
    const updated = [...otp]
    updated[index] = value
    setOtp(updated)
    if (value && index < 5) {
      document.getElementById(`otp-${index + 1}`).focus()
    }
  }

  const handleOtpKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      document.getElementById(`otp-${index - 1}`).focus()
    }
  }

  const handleSendOtp = (e) => {
    e.preventDefault()
    // Will connect to backend later
    setStep(2)
  }

  const handleVerifyOtp = (e) => {
    e.preventDefault()
    // Will connect to backend later
    setStep(3)
  }

  const handleResetPassword = (e) => {
    e.preventDefault()
    // Will connect to backend later
    setStep(4)
  }

  const stepTitles = {
    1: { title: 'Forgot password?', sub: 'Enter your email and we\'ll send you a one-time password.' },
    2: { title: 'Check your email', sub: `We sent a 6-digit OTP to ${email}` },
    3: { title: 'Reset password', sub: 'Enter your new password below.' },
    4: { title: 'Password reset!', sub: 'Your password has been successfully updated.' },
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
              Reset Your <span className="text-green-400">Password.</span>
            </h1>
            <p className="text-white/60 text-sm">Follow the steps to securely<br />reset your account password.</p>
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

          {/* Back button */}
          {step !== 4 && (
            <button
              onClick={() => step === 1 ? navigate('/login') : setStep(step - 1)}
              className="flex items-center gap-2 text-white/40 hover:text-white/70 transition-colors text-sm mb-8"
            >
              <ArrowLeft size={16} />
              {step === 1 ? 'Back to sign in' : 'Back'}
            </button>
          )}

          {/* Step indicators */}
          {step !== 4 && (
            <div className="flex gap-2 mb-8">
              {[1, 2, 3].map(s => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-all ${s <= step ? 'bg-green-400' : 'bg-white/10'}`}
                />
              ))}
            </div>
          )}

          <h2 className="text-3xl font-bold text-white mb-1">{stepTitles[step].title}</h2>
          <p className="text-white/40 text-sm mb-8">{stepTitles[step].sub}</p>

          {/* Step 1 — Email */}
          {step === 1 && (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="text-white/50 text-xs tracking-widest block mb-2">EMAIL ADDRESS</label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="Enter your email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-green-400 transition-colors pl-10"
                  />
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#1a6b3c] hover:bg-[#145c32] text-white py-6 text-sm font-bold tracking-widest">
                SEND OTP
              </Button>
            </form>
          )}

          {/* Step 2 — OTP */}
          {step === 2 && (
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <div>
                <label className="text-white/50 text-xs tracking-widest block mb-4">ENTER 6-DIGIT OTP</label>
                <div className="flex gap-3 justify-between">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      maxLength={1}
                      value={digit}
                      onChange={e => handleOtpChange(e.target.value, index)}
                      onKeyDown={e => handleOtpKeyDown(e, index)}
                      className="w-12 h-12 bg-white/5 border border-white/15 rounded-lg text-center text-white text-lg font-bold outline-none focus:border-green-400 transition-colors"
                    />
                  ))}
                </div>
              </div>
              <Button type="submit" className="w-full bg-[#1a6b3c] hover:bg-[#145c32] text-white py-6 text-sm font-bold tracking-widest">
                VERIFY OTP
              </Button>
              <p className="text-center text-white/40 text-sm">
                Didn't receive it?{' '}
                <span onClick={() => {}} className="text-green-400 cursor-pointer hover:underline">Resend OTP</span>
              </p>
            </form>
          )}

          {/* Step 3 — New Password */}
          {step === 3 && (
            <form onSubmit={handleResetPassword} className="space-y-4">
              <div>
                <label className="text-white/50 text-xs tracking-widest block mb-2">NEW PASSWORD</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter new password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-green-400 transition-colors pl-10 pr-10"
                  />
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              <div>
                <label className="text-white/50 text-xs tracking-widest block mb-2">CONFIRM PASSWORD</label>
                <div className="relative">
                  <input
                    type={showConfirm ? 'text' : 'password'}
                    required
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/15 rounded-lg px-4 py-3 text-white text-sm placeholder-white/25 outline-none focus:border-green-400 transition-colors pl-10 pr-10"
                  />
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
                  <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors">
                    {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
              {confirmPassword && newPassword !== confirmPassword && (
                <p className="text-red-400 text-xs">Passwords do not match</p>
              )}
              <Button
                type="submit"
                disabled={newPassword !== confirmPassword || !newPassword}
                className="w-full bg-[#1a6b3c] hover:bg-[#145c32] text-white py-6 text-sm font-bold tracking-widest disabled:opacity-50"
              >
                RESET PASSWORD
              </Button>
            </form>
          )}

          {/* Step 4 — Success */}
          {step === 4 && (
            <div className="text-center">
              <div className="flex justify-center mb-6">
                <CheckCircle size={64} className="text-green-400" />
              </div>
              <p className="text-white/50 text-sm leading-relaxed mb-8">
                Your password has been reset successfully. You can now sign in with your new password.
              </p>
              <Button
                onClick={() => navigate('/login')}
                className="w-full bg-[#1a6b3c] hover:bg-[#145c32] text-white py-6 text-sm font-bold tracking-widest"
              >
                BACK TO SIGN IN
              </Button>
            </div>
          )}

        </div>
      </div>
    </div>
  )
}