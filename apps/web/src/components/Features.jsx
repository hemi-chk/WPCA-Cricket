import { User, BarChart2, Calendar, Users, HeartPulse, Bell } from 'lucide-react'

const features = [
  { icon: <User size={22} />, title: 'Player profiles', desc: 'Complete profiles with personal stats, injury history, and performance records for every player.', border: 'border-green-400/40', iconBg: 'bg-green-400/10 text-green-400' },
  { icon: <BarChart2 size={22} />, title: 'Performance analytics', desc: 'Batting, bowling, and fitness metrics with visual dashboards and comparison tools.', border: 'border-blue-400/40', iconBg: 'bg-blue-400/10 text-blue-400' },
  { icon: <Calendar size={22} />, title: 'Match calendar', desc: 'Upcoming matches, training sessions, and tournaments all in one place.', border: 'border-amber-400/40', iconBg: 'bg-amber-400/10 text-amber-400' },
  { icon: <Users size={22} />, title: 'Team selection', desc: 'Coaches build teams, selectors approve and publish with dual-selector approval.', border: 'border-purple-400/40', iconBg: 'bg-purple-400/10 text-purple-400' },
  { icon: <HeartPulse size={22} />, title: 'Injury tracking', desc: 'Players log their own injury updates. Coaches stay informed in real time.', border: 'border-red-400/40', iconBg: 'bg-red-400/10 text-red-400' },
  { icon: <Bell size={22} />, title: 'Live notifications', desc: 'Instant alerts when teams are published, matches are added, or selections announced.', border: 'border-teal-400/40', iconBg: 'bg-teal-400/10 text-teal-400' },
]

export default function Features() {
  return (
    <section className="px-10 py-16 bg-black/40 backdrop-blur-md">
      <div className="mb-10">
        <p className="text-green-400 text-xs tracking-widest uppercase font-medium mb-3">Platform features</p>
        <h2 className="text-4xl font-bold text-white">Everything you need to<br />manage women's cricket</h2>
        <p className="text-white/50 text-base mt-3">Built for coaches, selectors, and players of Western Province.</p>
      </div>
      <div className="grid grid-cols-3 gap-5">
        {features.map(f => (
          <div key={f.title} className={`border ${f.border} rounded-2xl p-7 bg-white/5 hover:bg-white/10 transition-all`}>
            <div className={`w-11 h-11 rounded-xl flex items-center justify-center mb-5 ${f.iconBg}`}>
              {f.icon}
            </div>
            <h3 className="text-white font-bold text-xl mb-3">{f.title}</h3>
            <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}