import { User, AudioWaveform, ClipboardList, ShieldCheck } from 'lucide-react'

const roles = [
  { icon: <User size={28} />, name: 'Player', desc: 'View your dashboard, log injuries, see upcoming matches, and track your personal analytics.', border: 'border-green-400/40', iconBg: 'bg-green-400/10 text-green-400' },
  { icon: <AudioWaveform size={28} />, name: 'Coach', desc: 'Access player profiles, compare performance, build teams, and manage training schedules.', border: 'border-blue-400/40', iconBg: 'bg-blue-400/10 text-blue-400' },
  { icon: <ClipboardList size={28} />, name: 'Selector', desc: 'Publish teams with dual-selector approval, add match fixtures, and manage tournaments.', border: 'border-amber-400/40', iconBg: 'bg-amber-400/10 text-amber-400' },
  { icon: <ShieldCheck size={28} />, name: 'Admin', desc: 'Full system control — manage users, approve teams, and oversee all association data.', border: 'border-purple-400/40', iconBg: 'bg-purple-400/10 text-purple-400' },
]

export default function Roles() {
  return (
    <section className="px-10 py-16 bg-black/40 backdrop-blur-md">
      <p className="text-green-400 text-xs tracking-widest uppercase font-medium mb-3">User roles</p>
      <h2 className="text-4xl font-bold text-white mb-3">Built for everyone in the association</h2>
      <p className="text-white/50 text-base mb-10">Every role has its own tailored dashboard and capabilities.</p>
      <div className="grid grid-cols-4 gap-5">
        {roles.map(r => (
          <div key={r.name} className={`border ${r.border} rounded-2xl p-8 text-center hover:bg-white/10 transition-all`}>
            <div className={`w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5 ${r.iconBg}`}>
              {r.icon}
            </div>
            <h3 className="text-white font-bold text-xl mb-3">{r.name}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}