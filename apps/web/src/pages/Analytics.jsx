import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Trophy, ChevronLeft, TrendingUp, Calendar,
  Target, Award, Lock, LogIn, BarChart2, Activity,
  Clock, Zap, Star, Loader,
} from 'lucide-react'
import { API } from '../lib/api.js'

const categoryBadge = {
  'Senior':   'bg-green-400/15 text-green-300 border-green-400/30',
  'Under 19': 'bg-blue-400/15 text-blue-300 border-blue-400/30',
  'Under 17': 'bg-purple-400/15 text-purple-300 border-purple-400/30',
  'Under 15': 'bg-yellow-400/15 text-yellow-300 border-yellow-400/30',
  'Under 13': 'bg-red-400/15 text-red-300 border-red-400/30',
}

// ── SVG Bar Chart ─────────────────────────────────────────────────────────────

function BarChart({ data }) {
  if (!data.length) return null
  const W = 520, H = 120, pl = 28, pr = 12, pt = 10, pb = 24
  const cw = W - pl - pr, ch = H - pt - pb
  const maxVal = Math.max(...data.map(d => d.sessions))
  const barW = (cw / data.length) * 0.5
  const gap  = cw / data.length
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      {data.map((d, i) => {
        const x  = pl + i * gap + (gap - barW) / 2
        const bh = (d.sessions / maxVal) * ch
        const y  = pt + ch - bh
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={bh} fill="#4ade80" rx="3" opacity="0.85" />
            <text x={x + barW / 2} y={H - 6} textAnchor="middle" fill="#ffffff30" fontSize="9">{d.month}</text>
            <text x={x + barW / 2} y={y - 4} textAnchor="middle" fill="#4ade80" fontSize="9" fontWeight="600">{d.sessions}</text>
          </g>
        )
      })}
      {[0, 0.5, 1].map((f, i) => {
        const yy = pt + ch - f * ch
        return (
          <g key={i}>
            <line x1={pl} y1={yy} x2={W - pr} y2={yy} stroke="#ffffff08" strokeWidth="1" />
            <text x={pl - 4} y={yy + 3} textAnchor="end" fill="#ffffff25" fontSize="8">{Math.round(maxVal * f)}</text>
          </g>
        )
      })}
    </svg>
  )
}

function LineChart({ data }) {
  if (!data.length) return null
  const W = 520, H = 100, pl = 28, pr = 12, pt = 10, pb = 20
  const cw = W - pl - pr, ch = H - pt - pb
  const max = Math.max(...data.map(d => d.hours))
  const pts = data.map((d, i) => ({
    x: pl + (i / (data.length - 1)) * cw,
    y: pt + ch - (d.hours / max) * ch,
    ...d,
  }))
  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const area = `${line} L${pts.at(-1).x},${pt + ch} L${pts[0].x},${pt + ch} Z`
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <defs>
        <linearGradient id="lg2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#60a5fa" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d={area} fill="url(#lg2)" />
      <path d={line} fill="none" stroke="#60a5fa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <g key={i}>
          <circle cx={p.x} cy={p.y} r="3.5" fill="#60a5fa" stroke="#0d1520" strokeWidth="1.5" />
          <text x={p.x} y={H - 4} textAnchor="middle" fill="#ffffff25" fontSize="8">{p.month}</text>
        </g>
      ))}
    </svg>
  )
}

const monthShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

export default function Analytics() {
  const navigate   = useNavigate()
  const [scoreTab, setScoreTab] = useState('runs')
  const [players,  setPlayers]  = useState([])
  const [matches,  setMatches]  = useState([])
  const [sessions, setSessions] = useState([])
  const [loading,  setLoading]  = useState(true)

  useEffect(() => {
    Promise.all([
      fetch(`${API}/api/players`).then(r => r.json()),
      fetch(`${API}/api/matches`).then(r => r.json()),
      fetch(`${API}/api/practice-sessions`).then(r => r.json()),
    ])
      .then(([p, m, s]) => { setPlayers(p); setMatches(m); setSessions(s) })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [])

  // Derive session chart data (group by month)
  const sessionByMonth = monthShort.map((month, mi) => {
    const inMonth = sessions.filter(s => new Date(s.date).getMonth() === mi)
    const hrs     = inMonth.reduce((sum, s) => sum + (s.durationMins || 0), 0) / 60
    return { month, sessions: inMonth.length, hours: Math.round(hrs) }
  }).filter(d => d.sessions > 0)

  const totalSessions = sessions.length
  const totalHours    = Math.round(sessions.reduce((s, d) => s + (d.durationMins || 0), 0) / 60)
  const matchesWon    = matches.filter(m => m.result === 'Won').length
  const winRate       = matches.length ? Math.round((matchesWon / matches.length) * 100) : 0

  // Focus breakdown
  const focusGroups = sessions.reduce((acc, s) => { acc[s.focus] = (acc[s.focus] || 0) + 1; return acc }, {})
  const focusBreakdown = Object.entries(focusGroups).map(([label, count]) => ({
    label, pct: Math.round((count / totalSessions) * 100),
    color: { Batting: 'bg-green-400', Bowling: 'bg-blue-400', Fielding: 'bg-purple-400', Fitness: 'bg-yellow-400', 'Full Team': 'bg-red-400' }[label] || 'bg-white/30',
  }))

  const sortedPlayers = [...players].sort((a, b) => {
    const key = scoreTab === 'avg' ? 'battingAvg' : scoreTab
    return (b.stats?.[key] || 0) - (a.stats?.[key] || 0)
  })
  const maxVal = sortedPlayers.length ? (sortedPlayers[0].stats?.[scoreTab === 'avg' ? 'battingAvg' : scoreTab] || 1) : 1

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center gap-2 text-white/40">
        <Loader size={18} className="animate-spin" /> Loading analytics…
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-4 bg-[#0a1628]/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#1a6b3c] rounded-lg flex items-center justify-center">
            <Trophy size={18} className="text-white" />
          </div>
          <span className="text-white font-medium text-sm tracking-wide">WPCA Women's Cricket</span>
        </div>
        <button onClick={() => navigate('/')} className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors">
          <ChevronLeft size={15} /> Back to Home
        </button>
      </nav>

      {/* Page header */}
      <div className="px-10 py-12 border-b border-white/8 bg-[#0a1628]/40">
        <p className="text-green-400 text-xs tracking-widest uppercase font-medium mb-2">Season 2025 / 2026</p>
        <h1 className="text-4xl font-bold text-white mb-2">Team Analytics</h1>
        <p className="text-white/40 text-sm">Cumulative performance across all practice sessions and matches.</p>
      </div>

      <div className="px-10 py-10 space-y-12 max-w-6xl">

        {/* KPIs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Calendar, label: 'Practice Sessions', value: totalSessions,          sub: 'Total this season',   color: 'text-green-400',  bg: 'bg-green-400/10' },
            { icon: Clock,    label: 'Total Hours',       value: `${totalHours}h`,       sub: 'On field training',   color: 'text-blue-400',   bg: 'bg-blue-400/10' },
            { icon: Target,   label: 'Matches Played',   value: matches.length,          sub: `${matchesWon} wins`,  color: 'text-purple-400', bg: 'bg-purple-400/10' },
            { icon: Zap,      label: 'Win Rate',          value: `${winRate}%`,          sub: 'This season',         color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
          ].map(({ icon: Icon, label, value, sub, color, bg }) => (
            <div key={label} className="border border-white/8 rounded-2xl p-5 bg-white/3">
              <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                <Icon size={17} className={color} />
              </div>
              <p className="text-white/35 text-xs mb-1">{label}</p>
              <p className={`text-2xl font-bold ${color}`}>{value}</p>
              <p className="text-white/25 text-[10px] mt-0.5">{sub}</p>
            </div>
          ))}
        </div>

        {/* Practice Sessions */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <BarChart2 size={18} className="text-green-400" />
            <h2 className="text-xl font-bold text-white">Practice Sessions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div className="border border-white/8 rounded-2xl p-5 bg-white/3">
              <p className="text-white/50 text-xs mb-1">Sessions per Month</p>
              <p className="text-white font-semibold text-sm mb-4">Total: <span className="text-green-400">{totalSessions} sessions</span></p>
              <div className="h-32"><BarChart data={sessionByMonth} /></div>
            </div>
            <div className="border border-white/8 rounded-2xl p-5 bg-white/3">
              <p className="text-white/50 text-xs mb-1">Training Hours per Month</p>
              <p className="text-white font-semibold text-sm mb-4">Total: <span className="text-blue-400">{totalHours} hours</span></p>
              <div className="h-32"><LineChart data={sessionByMonth} /></div>
            </div>
          </div>
          {focusBreakdown.length > 0 && (
            <div className="grid grid-cols-3 gap-4 mt-4">
              {focusBreakdown.slice(0, 3).map(({ label, pct, color }) => (
                <div key={label} className="border border-white/8 rounded-xl p-4 bg-white/3">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-white/55 text-xs">{label}</p>
                    <p className="text-white text-sm font-bold">{pct}%</p>
                  </div>
                  <div className="w-full h-1.5 bg-white/8 rounded-full overflow-hidden">
                    <div className={`h-full ${color} rounded-full`} style={{ width: `${pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Practice Matches */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Activity size={18} className="text-blue-400" />
            <h2 className="text-xl font-bold text-white">Practice Matches</h2>
            <span className="ml-auto text-xs text-white/30">{matches.length} matches · {winRate}% win rate</span>
          </div>
          <div className="border border-white/8 rounded-2xl overflow-hidden bg-white/3">
            {matches.length === 0 ? (
              <p className="text-white/30 text-sm px-5 py-6">No matches recorded yet.</p>
            ) : (
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/8 text-white/30 text-xs">
                    <th className="text-left px-5 py-3 font-medium">Date</th>
                    <th className="text-left px-5 py-3 font-medium">Opponent</th>
                    <th className="text-left px-5 py-3 font-medium">WP Score</th>
                    <th className="text-left px-5 py-3 font-medium">Opp Score</th>
                    <th className="text-left px-5 py-3 font-medium">Result</th>
                    <th className="text-left px-5 py-3 font-medium">MVP</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map((m) => {
                    const date = new Date(m.date)
                    const dateStr = `${monthShort[date.getMonth()]} ${String(date.getDate()).padStart(2,'0')}`
                    const opponent = m.homeTeam?.shortName === 'WPCA' ? m.awayTeam?.name : m.homeTeam?.name
                    const wpScore  = m.homeTeam?.shortName === 'WPCA' ? m.homeScore : m.awayScore
                    const oppScore = m.homeTeam?.shortName === 'WPCA' ? m.awayScore : m.homeScore
                    return (
                      <tr key={m._id} className="border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors">
                        <td className="px-5 py-3.5 text-white/40 text-xs">{dateStr}</td>
                        <td className="px-5 py-3.5 text-white/75 font-medium">{opponent}</td>
                        <td className="px-5 py-3.5 text-white/60 font-mono text-xs">{wpScore}</td>
                        <td className="px-5 py-3.5 text-white/40 font-mono text-xs">{oppScore}</td>
                        <td className="px-5 py-3.5">
                          <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${
                            m.result === 'Won' ? 'bg-green-400/15 text-green-300' : 'bg-red-400/15 text-red-300'
                          }`}>{m.result}</span>
                        </td>
                        <td className="px-5 py-3.5">
                          <div className="flex items-center gap-1.5">
                            <Star size={11} className="text-yellow-400" />
                            <span className="text-white/60 text-xs">{m.mvp?.name ?? '—'}</span>
                          </div>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            )}
          </div>
        </section>

        {/* Cumulative Scores */}
        <section>
          <div className="flex items-center gap-2 mb-5">
            <Award size={18} className="text-yellow-400" />
            <h2 className="text-xl font-bold text-white">Cumulative Player Scores</h2>
            <div className="ml-auto flex bg-white/5 rounded-lg p-1 gap-0.5">
              {['runs','wickets','avg'].map(tab => (
                <button key={tab} onClick={() => setScoreTab(tab)}
                  className={`px-3 py-1 rounded text-xs capitalize transition-colors ${
                    scoreTab === tab ? 'bg-white/12 text-white' : 'text-white/35 hover:text-white/60'
                  }`}>
                  {tab === 'avg' ? 'Avg' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>
          {players.length === 0 ? (
            <p className="text-white/30 text-sm">No player data yet.</p>
          ) : (
            <div className="space-y-2">
              {sortedPlayers.map((p, i) => {
                const statKey = scoreTab === 'avg' ? 'battingAvg' : scoreTab
                const val = p.stats?.[statKey] || 0
                const pct = (val / maxVal) * 100
                const initials = p.name.split(' ').map(n => n[0]).join('')
                return (
                  <div key={p._id} className="flex items-center gap-4 border border-white/8 rounded-xl px-5 py-3.5 bg-white/3 hover:bg-white/5 transition-colors">
                    <span className={`text-sm font-bold w-5 shrink-0 ${i === 0 ? 'text-yellow-400' : 'text-white/25'}`}>{i + 1}</span>
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500/40 to-[#1a6b3c]/60 flex items-center justify-center text-[10px] font-bold shrink-0">
                      {initials}
                    </div>
                    <div className="w-36 shrink-0">
                      <p className="text-white text-sm font-medium">{p.name}</p>
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full border ${categoryBadge[p.ageCategory] || 'bg-white/10 text-white/50 border-white/20'}`}>
                        {p.ageCategory}
                      </span>
                    </div>
                    <div className="flex-1 flex items-center gap-3">
                      <div className="flex-1 h-1.5 bg-white/8 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${i === 0 ? 'bg-yellow-400' : 'bg-green-400'}`} style={{ width: `${pct}%` }} />
                      </div>
                      <span className={`text-sm font-bold w-12 text-right shrink-0 ${i === 0 ? 'text-yellow-400' : 'text-white'}`}>
                        {scoreTab === 'avg' ? val.toFixed(1) : val}
                      </span>
                    </div>
                    <div className="flex gap-4 shrink-0 text-right">
                      {[['RUNS','runs'],['WKT','wickets'],['S/R','strikeRate']].map(([label, key]) => (
                        <div key={key}>
                          <p className="text-white/25 text-[9px]">{label}</p>
                          <p className="text-white/60 text-xs font-medium">{p.stats?.[key] ?? 0}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>

        {/* Detailed Analysis — blurred/locked */}
        <section className="relative">
          <div className="flex items-center gap-2 mb-5">
            <TrendingUp size={18} className="text-purple-400" />
            <h2 className="text-xl font-bold text-white">Detailed Analysis</h2>
          </div>
          <div className="relative rounded-2xl overflow-hidden border border-white/8">
            <div className="blur-sm pointer-events-none select-none">
              <div className="grid grid-cols-3 gap-px bg-white/5">
                {[
                  { label: 'Boundary %',        value: '38.4%', sub: 'of total scoring shots' },
                  { label: 'Dot Ball %',         value: '42.1%', sub: 'across all innings' },
                  { label: 'Powerplay Avg',      value: '34.6',  sub: 'runs in first 6 overs' },
                  { label: 'Death Over Economy', value: '7.8',   sub: 'overs 16–20' },
                  { label: 'Avg Partnership',    value: '41.2',  sub: 'runs per wicket pair' },
                  { label: 'Run-chase Success',  value: '75%',   sub: '3 of 4 chases' },
                ].map(({ label, value, sub }) => (
                  <div key={label} className="bg-[#0d1520] p-5">
                    <p className="text-white/30 text-xs mb-1">{label}</p>
                    <p className="text-white text-2xl font-bold">{value}</p>
                    <p className="text-white/25 text-[10px] mt-0.5">{sub}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#0d1520] p-5 border-t border-white/5">
                <div className="h-24 flex items-end gap-2">
                  {[60,45,72,38,88,55,91,43,76,62,84,50].map((h, i) => (
                    <div key={i} className="flex-1 rounded-t" style={{ height: `${h}%`, background: i % 2 === 0 ? '#4ade8050' : '#60a5fa50' }} />
                  ))}
                </div>
              </div>
            </div>
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a]/70 backdrop-blur-[2px]">
              <div className="text-center px-8 py-10 max-w-sm">
                <div className="w-14 h-14 bg-purple-400/15 border border-purple-400/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Lock size={22} className="text-purple-300" />
                </div>
                <h3 className="text-white text-lg font-bold mb-2">Personalized Player Analytics</h3>
                <p className="text-white/45 text-sm leading-relaxed mb-6">
                  Sign in to unlock detailed breakdowns, individual performance trends, and AI-powered insights tailored to your profile.
                </p>
                <button
                  onClick={() => navigate('/login')}
                  className="flex items-center gap-2 bg-[#1a6b3c] hover:bg-[#145c32] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors mx-auto"
                >
                  <LogIn size={15} /> Sign in for full analytics
                </button>
                <p className="text-white/20 text-xs mt-3">No account? Contact your team admin.</p>
              </div>
            </div>
          </div>
        </section>

        <div className="h-10" />
      </div>
    </div>
  )
}
