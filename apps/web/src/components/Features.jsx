import { Card, CardContent } from '@/components/ui/card'

const features = [
  { icon: '👤', title: 'Player profiles', desc: 'Complete profiles with personal stats, injury history, and performance records.', bg: 'bg-green-100', color: 'text-green-700' },
  { icon: '📊', title: 'Performance analytics', desc: 'Batting, bowling, and fitness metrics with visual dashboards and comparison tools.', bg: 'bg-blue-100', color: 'text-blue-700' },
  { icon: '📅', title: 'Match calendar', desc: 'Upcoming matches, training sessions, and tournaments all in one place.', bg: 'bg-amber-100', color: 'text-amber-700' },
  { icon: '👥', title: 'Team selection', desc: 'Coaches build teams, selectors approve and publish with dual-selector approval.', bg: 'bg-purple-100', color: 'text-purple-700' },
  { icon: '🩺', title: 'Injury tracking', desc: 'Players log their own injury updates. Coaches stay informed in real time.', bg: 'bg-red-100', color: 'text-red-700' },
  { icon: '🔔', title: 'Live notifications', desc: 'Instant alerts when teams are published, matches are added, or selections announced.', bg: 'bg-teal-100', color: 'text-teal-700' },
]

export default function Features() {
  return (
    <section className="px-10 py-16 bg-white/10 backdrop-blur-md">
      <div className="mb-9">
        <p className="text-green-400 text-xs tracking-widest uppercase font-medium mb-2">Platform features</p>
        <h2 className="text-3xl font-bold text-white">Everything you need to manage women's cricket</h2>
        <p className="text-white/50 text-sm mt-2">Built for coaches, selectors, and players of Western Province.</p>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {features.map(f => (
          <Card key={f.title} className="bg-white/10 border-white/10 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className={`w-11 h-11 rounded-xl ${f.bg} flex items-center justify-center text-xl mb-4`}>{f.icon}</div>
              <h3 className="text-white font-medium text-sm mb-2">{f.title}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{f.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}