import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Home, Activity, CalendarDays, Newspaper, Star,
  Settings, LogOut, ChevronRight, ChevronLeft, Trophy, Search,
} from 'lucide-react'

const navLinks = [
  { icon: Home, label: 'Home' },
  { icon: Activity, label: 'Live Matches', badge: 2 },
  { icon: CalendarDays, label: 'Calendar' },
  { icon: Newspaper, label: 'News' },
  { icon: Star, label: 'Subscription' },
]

const ageCategories = [
  { label: 'Under 15', count: 24 },
  { label: 'Under 17', count: 31 },
  { label: 'Under 19', count: 28 },
  { label: 'Senior', count: 45 },
]

const playerInfoRows = [
  { label: 'Height', value: '165 cm' },
  { label: 'Weight', value: '58 kg' },
  { label: 'Role', value: 'All-rounder' },
  { label: 'Batting', value: 'Right hand' },
  { label: 'Age Group', value: 'Under 19' },
  { label: 'Bowling', value: 'RA Medium' },
  { label: 'Joined', value: 'Jan 15, 2024' },
  { label: 'Reg. ends', value: 'Dec 31, 2026' },
]

const perfData = [
  { year: '2021', runs: 80 },
  { year: '2022', runs: 195 },
  { year: '2023', runs: 280 },
  { year: '2024', runs: 420 },
  { year: '2025', runs: 530 },
  { year: '2026', runs: 612 },
]

const calendarEvents = {
  2:  { label: 'vs Southern', type: 'match' },
  8:  { label: 'vs Kandy WC', type: 'match' },
  15: { label: 'vs Galle WC', type: 'match' },
  20: { label: 'Training',    type: 'training' },
  30: { label: 'Team Meet',   type: 'meeting' },
}

// --- SVG line chart ---
function PerfChart({ data }) {
  const W = 500, H = 140
  const pl = 38, pr = 16, pt = 12, pb = 28
  const cw = W - pl - pr
  const ch = H - pt - pb
  const max = Math.max(...data.map(d => d.runs))

  const pts = data.map((d, i) => ({
    x: pl + (i / (data.length - 1)) * cw,
    y: pt + ch - (d.runs / max) * ch,
    ...d,
  }))

  const line = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ')
  const area = `${line} L${pts.at(-1).x},${pt + ch} L${pts[0].x},${pt + ch} Z`

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-full">
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#4ade80" stopOpacity="0.35" />
          <stop offset="100%" stopColor="#4ade80" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 0.25, 0.5, 0.75, 1].map((f, i) => {
        const y = pt + ch - f * ch
        return (
          <g key={i}>
            <line x1={pl} y1={y} x2={W - pr} y2={y} stroke="#ffffff0d" strokeWidth="1" />
            <text x={pl - 4} y={y + 3.5} textAnchor="end" fill="#ffffff35" fontSize="9">
              {Math.round(max * f)}
            </text>
          </g>
        )
      })}
      <path d={area} fill="url(#areaGrad)" />
      <path d={line} fill="none" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r="4" fill="#4ade80" stroke="#0d1520" strokeWidth="2" />
      ))}
      {pts.map((p, i) => (
        <text key={i} x={p.x} y={H - 4} textAnchor="middle" fill="#ffffff45" fontSize="10">
          {p.year}
        </text>
      ))}
    </svg>
  )
}

// --- Calendar ---
function MatchCalendar() {
  const [date, setDate] = useState(new Date(2026, 5, 1))
  const year = date.getFullYear()
  const month = date.getMonth()
  const monthNames = ['January','February','March','April','May','June',
                      'July','August','September','October','November','December']
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const today = 26

  const cells = [
    ...Array(firstDay).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const upcoming = Object.entries(calendarEvents)
    .filter(([d]) => Number(d) >= today)
    .slice(0, 3)

  const dotColor = { match: 'bg-green-400', training: 'bg-blue-400', meeting: 'bg-yellow-400' }
  const cellColor = {
    match:    'bg-green-400/15 text-green-400 font-medium',
    training: 'bg-blue-400/15 text-blue-400',
    meeting:  'bg-yellow-400/15 text-yellow-400',
  }

  return (
    <div className="flex flex-col h-full">
      {/* Month nav */}
      <div className="flex items-center justify-between mb-3">
        <button onClick={() => setDate(new Date(year, month - 1, 1))} className="text-white/40 hover:text-white p-1 transition-colors">
          <ChevronLeft size={14} />
        </button>
        <span className="text-white text-sm font-medium">{monthNames[month]} {year}</span>
        <button onClick={() => setDate(new Date(year, month + 1, 1))} className="text-white/40 hover:text-white p-1 transition-colors">
          <ChevronRight size={14} />
        </button>
      </div>

      {/* Day headers */}
      <div className="grid grid-cols-7 mb-1">
        {['Su','Mo','Tu','We','Th','Fr','Sa'].map(d => (
          <div key={d} className="text-center text-[10px] text-white/25 pb-1">{d}</div>
        ))}
      </div>

      {/* Grid */}
      <div className="grid grid-cols-7 gap-0.5 mb-4">
        {cells.map((d, i) => {
          const ev = d ? calendarEvents[d] : null
          const isToday = d === today
          return (
            <div key={i} className={`relative aspect-square flex items-center justify-center text-[11px] rounded ${
              isToday ? 'bg-green-500 text-white font-bold' :
              ev ? cellColor[ev.type] :
              d ? 'text-white/55 hover:bg-white/5 cursor-pointer' : ''
            }`}>
              {d ?? ''}
              {ev && !isToday && (
                <span className={`absolute bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full ${dotColor[ev.type]}`} />
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div className="flex items-center gap-3 mb-3">
        {[['match','Match','bg-green-400'],['training','Training','bg-blue-400'],['meeting','Meeting','bg-yellow-400']].map(([,label,cls]) => (
          <span key={label} className="flex items-center gap-1 text-[10px] text-white/40">
            <span className={`w-1.5 h-1.5 rounded-full ${cls}`} />
            {label}
          </span>
        ))}
      </div>

      {/* Upcoming */}
      <p className="text-white/25 text-[9px] tracking-widest mb-2">UPCOMING</p>
      <div className="space-y-1.5 flex-1">
        {upcoming.map(([day, ev]) => (
          <div key={day} className="flex items-center gap-2.5 bg-white/3 rounded-lg px-3 py-2">
            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${dotColor[ev.type]}`} />
            <div>
              <p className="text-white/70 text-xs">{ev.label}</p>
              <p className="text-white/30 text-[10px]">Jun {day}, 2026</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

// --- Main page ---
export default function PlayerDashboard() {
  const navigate = useNavigate()
  const [activeNav, setActiveNav] = useState('Home')

  return (
    <div className="flex min-h-screen bg-[#0d1520] text-white overflow-hidden">

      {/* Sidebar */}
      <aside className="w-52 bg-[#080f1a] border-r border-white/8 flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#1a6b3c] rounded-md flex items-center justify-center">
              <Trophy size={13} className="text-white" />
            </div>
            <span className="text-white text-xs font-semibold tracking-wide">WPCA Cricket</span>
          </div>
        </div>

        {/* Nav links */}
        <div className="px-3 mb-5">
          <p className="text-white/25 text-[9px] tracking-widest px-2 mb-1.5">NAVIGATION</p>
          {navLinks.map(({ icon: Icon, label, badge }) => (
            <button
              key={label}
              onClick={() => setActiveNav(label)}
              className={`w-full flex items-center justify-between px-2 py-2 rounded-md text-xs transition-all mb-0.5 ${
                activeNav === label ? 'bg-white/8 text-white' : 'text-white/45 hover:text-white/75 hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2.5"><Icon size={14} />{label}</span>
              {badge && (
                <span className="bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {badge}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Age categories */}
        <div className="px-3 mb-4">
          <p className="text-white/25 text-[9px] tracking-widest px-2 mb-1.5">AGE CATEGORIES</p>
          {ageCategories.map(({ label, count }) => (
            <button key={label} className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-xs text-white/45 hover:text-white/75 hover:bg-white/5 transition-all">
              <span>{label}</span>
              <span className="text-white/25">{count}</span>
            </button>
          ))}
          <button className="flex items-center gap-1 px-2 py-1.5 text-xs text-white/25 hover:text-white/45 transition-colors">
            View all <ChevronRight size={11} />
          </button>
        </div>

        <div className="flex-1" />

        {/* Bottom */}
        <div className="px-3 pb-4 space-y-0.5">
          <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-xs text-white/45 hover:text-white/75 hover:bg-white/5 transition-all">
            <Settings size={14} />Settings
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-xs text-white/45 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <LogOut size={14} />Logout
          </button>
          <div className="flex items-center gap-2.5 px-2 pt-3 mt-1 border-t border-white/8">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-[#1a6b3c] flex items-center justify-center text-[10px] font-bold shrink-0">
              AP
            </div>
            <div className="min-w-0">
              <p className="text-white text-[11px] font-medium truncate">Anjali Perera</p>
              <p className="text-white/30 text-[9px] truncate">anjali@wpca.lk</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen">

        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-white/8 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-white/35">Home</span>
            <ChevronRight size={12} className="text-white/20" />
            <span className="text-white/70">Players</span>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
              <CalendarDays size={12} className="text-white/30" />
              <span className="text-white/45 text-xs">Season 2025/2026</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 w-40">
              <Search size={12} className="text-white/30" />
              <input type="text" placeholder="Search players..." className="bg-transparent text-xs text-white placeholder-white/25 outline-none flex-1 w-full" />
            </div>
          </div>
        </header>

        {/* Player card */}
        <div className="bg-[#0a1420] border-b border-white/8 px-6 py-5 flex items-center gap-6 shrink-0">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-[#1a6b3c] to-[#061510] flex items-center justify-center text-2xl font-bold text-white/70 border border-white/10">
              AP
            </div>
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-[#0a1420]" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2.5">
              <div>
                <h1 className="text-white text-xl font-bold leading-tight">Anjali Perera</h1>
                <div className="flex items-center gap-2 mt-1 flex-wrap">
                  <span className="flex items-center gap-1 text-white/45 text-xs">
                    <Trophy size={10} className="text-green-400" /> Western Province WCA
                  </span>
                  <span className="text-white/20 text-xs">•</span>
                  <span className="text-white/45 text-xs">🇱🇰 Sri Lankan</span>
                  <span className="text-white/20 text-xs">•</span>
                  <span className="text-white/45 text-xs">All-rounder</span>
                  <span className="text-white/20 text-xs">•</span>
                  <span className="text-white/45 text-xs">#7</span>
                </div>
              </div>
              <button className="bg-[#1a6b3c] hover:bg-[#145c32] text-white text-xs px-4 py-1.5 rounded-lg transition-colors shrink-0">
                Edit Profile
              </button>
            </div>
            <div className="grid grid-cols-4 gap-x-6 gap-y-1.5">
              {playerInfoRows.map(({ label, value }) => (
                <div key={label} className="flex items-center gap-2">
                  <span className="text-white/30 text-[11px] w-14 shrink-0">{label}</span>
                  <span className="text-white/65 text-[11px]">{value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Stats bar */}
        <div className="bg-[#091320] border-b border-white/8 px-6 py-3 flex items-center divide-x divide-white/10 shrink-0">
          {[
            { label: 'Matches', value: '24' },
            { label: 'Runs', value: '612' },
            { label: 'Wickets', value: '18' },
            { label: 'Batting Avg', value: '34.2' },
          ].map(({ label, value }) => (
            <div key={label} className="flex-1 px-6 first:pl-0">
              <p className="text-white/35 text-[10px] mb-0.5">{label}</p>
              <p className="text-white font-bold text-lg leading-tight">{value}</p>
            </div>
          ))}
          <div className="flex-1 px-6 flex items-center gap-2">
            <span className="text-green-400 font-bold text-sm">▲ 6.4%</span>
            <span className="text-white/30 text-xs">vs last season</span>
          </div>
        </div>

        {/* Bottom: chart + calendar */}
        <div className="flex flex-1 min-h-0">

          {/* Performance chart */}
          <div className="flex-1 border-r border-white/8 p-5 flex flex-col min-w-0">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="text-white font-semibold text-sm">Performance: 612 Runs</p>
                <p className="text-white/30 text-xs mt-0.5">Highest: 612 runs (2026 Season)</p>
              </div>
              <div className="flex bg-white/5 rounded-lg p-1 gap-0.5">
                {['Runs', 'Wickets', 'Avg'].map((t, i) => (
                  <button key={t} className={`px-2.5 py-1 rounded text-xs transition-colors ${
                    i === 0 ? 'bg-white/10 text-white' : 'text-white/35 hover:text-white/60'
                  }`}>{t}</button>
                ))}
              </div>
            </div>

            {/* Mini stat cards */}
            <div className="grid grid-cols-4 gap-3 mb-4">
              {[
                { label: 'Current season', value: '612 runs' },
                { label: 'Career best',    value: '612 runs' },
                { label: 'Career low',     value: '80 runs' },
                { label: 'Growth',         value: '+665%', green: true },
              ].map(({ label, value, green }) => (
                <div key={label} className="bg-white/3 border border-white/8 rounded-lg px-3 py-2">
                  <p className="text-white/30 text-[10px] mb-0.5">{label}</p>
                  <p className={`font-semibold text-sm ${green ? 'text-green-400' : 'text-white'}`}>{value}</p>
                </div>
              ))}
            </div>

            <div className="flex-1 min-h-0">
              <PerfChart data={perfData} />
            </div>
          </div>

          {/* Calendar */}
          <div className="w-72 shrink-0 p-5 flex flex-col">
            <p className="text-white font-semibold text-sm mb-4">Match Calendar</p>
            <MatchCalendar />
          </div>

        </div>
      </div>
    </div>
  )
}
