const roles = [
  { icon: '🏃‍♀️', name: 'Player', desc: 'View your dashboard, log injuries, see upcoming matches, and track your personal analytics.', border: 'border-green-400/40' },
  { icon: '🎽', name: 'Coach', desc: 'Access player profiles, compare performance, build teams, and manage training schedules.', border: 'border-blue-400/40' },
  { icon: '📋', name: 'Selector', desc: 'Publish teams with dual-selector approval, add match fixtures, and manage tournaments.', border: 'border-amber-400/40' },
  { icon: '🛡️', name: 'Admin', desc: 'Full system control — manage users, approve teams, and oversee all association data.', border: 'border-purple-400/40' },
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
            <div className="text-5xl mb-5">{r.icon}</div>
            <h3 className="text-white font-bold text-xl mb-3">{r.name}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{r.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}