import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const stats = [
  { num: '100+', label: 'Registered players' },
  { num: '4', label: 'Age categories' },
  { num: '25+', label: 'Coaches & staff' },
  { num: 'Live', label: 'Match updates' },
]

export default function Hero() {
  return (
    <section className="min-h-[520px] flex items-center px-10 py-16">
      <div className="max-w-xl">
        <Badge className="bg-[#1a6b3c]/30 text-green-400 border border-green-400/30 mb-5 tracking-widest text-xs">
          Western Province Women's Cricket
        </Badge>
        <h1 className="text-5xl font-bold text-white leading-tight mb-4">
          Empowering<br />Every <span className="text-green-400">Woman.</span><br />Every Match.
        </h1>
        <p className="text-white/60 text-sm leading-relaxed mb-8 max-w-md">
          The official management platform for Western Province Women's Cricket Association. We  Track performance, manage teams, and grow the women's game.
        </p>
        <div className="flex gap-3 mb-10">
          <Button className="bg-[#1a6b3c] hover:bg-[#145c32] text-white px-7">Get started</Button>
          <Button variant="outline" className="text-white border-white/30 bg-transparent hover:bg-white/10 px-7">View matches</Button>
        </div>
        <div className="flex gap-8">
          {stats.map(s => (
            <div key={s.label}>
              <div className="text-2xl font-bold text-green-400">{s.num}</div>
              <div className="text-xs text-white/40 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}