import { Card, CardContent } from '@/components/ui/card'

const roles = [
  { icon: '🏃‍♀️', name: 'Player', desc: 'View your dashboard, log injuries, see upcoming matches, and track your analytics.', bg: 'bg-green-100' },
  { icon: '🎽', name: 'Coach', desc: 'Access player profiles, compare performance, build teams, and manage schedules.', bg: 'bg-blue-100' },
  { icon: '📋', name: 'Selector', desc: 'Publish teams with dual-selector approval, add fixtures, and manage tournaments.', bg: 'bg-amber-100' },
  { icon: '🛡️', name: 'Admin', desc: 'Full system control — manage users, approve teams, and oversee all data.', bg: 'bg-purple-100' },
]

export default function Roles() {
  return (
    <section className="px-10 py-16 bg-white/10 backdrop-blur-md">
      <p className="text-green-400 text-xs tracking-widest uppercase font-medium mb-2">User roles</p>
      <h2 className="text-3xl font-bold text-white mb-1">Built for everyone in the association</h2>
      <p className="text-white/50 text-sm mb-8">Every role has its own tailored dashboard and capabilities.</p>
      <div className="grid grid-cols-4 gap-4">
        {roles.map(r => (
          <Card key={r.name} className="bg-white/10 border-white/10 backdrop-blur-sm text-center">
            <CardContent className="p-6">
              <div className={`w-13 h-13 rounded-full ${r.bg} flex items-center justify-center text-2xl mx-auto mb-4 w-14 h-14`}>{r.icon}</div>
              <h3 className="text-white font-medium text-sm mb-2">{r.name}</h3>
              <p className="text-white/50 text-xs leading-relaxed">{r.desc}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  )
}