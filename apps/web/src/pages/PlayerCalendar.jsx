import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  Home, Activity, CalendarDays, Newspaper, Star,
  Settings, LogOut, ChevronRight, ChevronLeft, Trophy,
  MapPin, Clock, Users, Swords, Dumbbell, MessageSquare,
  Filter, Plus, Search,
} from 'lucide-react'

const navLinks = [
  { icon: Home,        label: 'Home' },
  { icon: Activity,    label: 'Live Matches', badge: 2 },
  { icon: CalendarDays,label: 'Calendar' },
  { icon: Newspaper,   label: 'News' },
  { icon: Star,        label: 'Subscription' },
]

const ageCategories = [
  { label: 'Under 15', count: 24 },
  { label: 'Under 17', count: 31 },
  { label: 'Under 19', count: 28 },
  { label: 'Senior',   count: 45 },
]

// Extended events: keyed by "YYYY-MM-DD"
const allEvents = {
  '2026-06-02': [{ id:1, label: 'vs Southern Province WC', type: 'match',    time: '10:00 AM', venue: 'Colombo Cricket Ground',    note: 'Provincial Championship Round 1' }],
  '2026-06-08': [{ id:2, label: 'vs Kandy WC',             type: 'match',    time: '09:30 AM', venue: 'Kandy Sports Club',          note: 'Provincial Championship Round 2' }],
  '2026-06-11': [{ id:3, label: 'Batting Practice',        type: 'training', time: '07:00 AM', venue: 'WPCA Training Ground',       note: 'Focus: off-side drives' }],
  '2026-06-14': [{ id:4, label: 'Fielding Drills',         type: 'training', time: '06:30 AM', venue: 'WPCA Training Ground',       note: 'Slip catching & outfield' }],
  '2026-06-15': [{ id:5, label: 'vs Galle WC',             type: 'match',    time: '10:00 AM', venue: 'Galle International Oval',   note: 'Provincial Championship Round 3' }],
  '2026-06-18': [{ id:6, label: 'Fitness Assessment',      type: 'training', time: '08:00 AM', venue: 'WPCA Gym',                   note: 'Quarterly fitness test' }],
  '2026-06-20': [{ id:7, label: 'Team Training',           type: 'training', time: '06:00 AM', venue: 'WPCA Training Ground',       note: 'Full squad session' }],
  '2026-06-24': [{ id:8, label: 'Selection Meeting',       type: 'meeting',  time: '03:00 PM', venue: 'WPCA Boardroom',             note: 'U19 squad selection for nationals' }],
  '2026-06-27': [{ id:9, label: 'vs Matara WC',            type: 'match',    time: '09:00 AM', venue: 'Matara Oval',                note: 'Provincial Championship Round 4' }],
  '2026-06-30': [{ id:10,label: 'Team Meeting',            type: 'meeting',  time: '04:00 PM', venue: 'WPCA Clubhouse',             note: 'End of month debrief' }],
  '2026-07-03': [{ id:11,label: 'vs Colombo WC',           type: 'match',    time: '10:00 AM', venue: 'Colombo Cricket Ground',     note: 'City Derby – high importance' }],
  '2026-07-07': [{ id:12,label: 'Bowling Workshop',        type: 'training', time: '07:00 AM', venue: 'WPCA Training Ground',       note: 'Spin bowling focus' }],
  '2026-07-10': [{ id:13,label: 'Fitness Training',        type: 'training', time: '06:00 AM', venue: 'WPCA Gym',                   note: 'Strength & conditioning' }],
  '2026-07-14': [{ id:14,label: 'vs Kurunegala WC',        type: 'match',    time: '09:30 AM', venue: 'Kurunegala Oval',            note: 'Semi-final qualifier' }],
  '2026-07-17': [{ id:15,label: 'Video Analysis Session',  type: 'meeting',  time: '02:00 PM', venue: 'WPCA Boardroom',             note: 'Batting technique review' }],
  '2026-07-21': [{ id:16,label: 'vs Negombo WC',           type: 'match',    time: '10:00 AM', venue: 'Negombo Sports Ground',      note: 'Provincial Championship Round 5' }],
  '2026-07-25': [{ id:17,label: 'Full Squad Training',     type: 'training', time: '06:00 AM', venue: 'WPCA Training Ground',       note: 'Pre-semi-final preparation' }],
  '2026-07-28': [{ id:18,label: 'Nationals Briefing',      type: 'meeting',  time: '03:30 PM', venue: 'WPCA Boardroom',             note: 'Nationals squad announcement' }],
}

const monthNames = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December']
const dayLabels  = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const dayShort   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const typeConfig = {
  match:    { bg: 'bg-green-400/20',  text: 'text-green-300',  dot: 'bg-green-400',  border: 'border-green-400/40',  icon: Swords,        label: 'Match'    },
  training: { bg: 'bg-blue-400/20',   text: 'text-blue-300',   dot: 'bg-blue-400',   border: 'border-blue-400/40',   icon: Dumbbell,      label: 'Training' },
  meeting:  { bg: 'bg-yellow-400/20', text: 'text-yellow-300', dot: 'bg-yellow-400', border: 'border-yellow-400/40', icon: MessageSquare, label: 'Meeting'  },
}

function key(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

export default function PlayerCalendar() {
  const navigate = useNavigate()
  const today = new Date(2026, 6, 3) // July 3 2026
  const [current, setCurrent] = useState(new Date(2026, 5, 1)) // June 2026
  const [selected, setSelected] = useState(key(2026, 6, 3))
  const [filter, setFilter]     = useState('all')
  const [search, setSearch]     = useState('')

  const year  = current.getFullYear()
  const month = current.getMonth()

  const firstDay    = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()
  const prevDays    = new Date(year, month, 0).getDate()

  // Build 6-row × 7-col grid
  const cells = []
  for (let i = 0; i < firstDay; i++)
    cells.push({ day: prevDays - firstDay + 1 + i, cur: false })
  for (let d = 1; d <= daysInMonth; d++)
    cells.push({ day: d, cur: true })
  while (cells.length < 42)
    cells.push({ day: cells.length - firstDay - daysInMonth + 1, cur: false })

  const isToday = (d) =>
    d === today.getDate() && month === today.getMonth() && year === today.getFullYear()

  const eventsForDay = (d, cur) => {
    if (!cur) return []
    const k = key(year, month, d)
    const evs = allEvents[k] || []
    return filter === 'all' ? evs : evs.filter(e => e.type === filter)
  }

  const selectedEvents = (() => {
    const evs = allEvents[selected] || []
    return filter === 'all' ? evs : evs.filter(e => e.type === filter)
  })()

  const selectedDate = selected
    ? new Date(selected + 'T00:00:00')
    : null

  // Upcoming events (from today onwards, sorted)
  const upcoming = Object.entries(allEvents)
    .filter(([k]) => k >= key(today.getFullYear(), today.getMonth(), today.getDate()))
    .flatMap(([k, evs]) => evs.map(e => ({ ...e, date: k })))
    .filter(e => filter === 'all' || e.type === filter)
    .filter(e => !search || e.label.toLowerCase().includes(search.toLowerCase()))
    .sort((a, b) => a.date.localeCompare(b.date))
    .slice(0, 8)

  const totalThisMonth = Object.entries(allEvents)
    .filter(([k]) => k.startsWith(`${year}-${String(month + 1).padStart(2, '0')}`))
    .flatMap(([, evs]) => evs)

  const counts = {
    match:    totalThisMonth.filter(e => e.type === 'match').length,
    training: totalThisMonth.filter(e => e.type === 'training').length,
    meeting:  totalThisMonth.filter(e => e.type === 'meeting').length,
  }

  return (
    <div className="flex min-h-screen bg-[#0d1520] text-white overflow-hidden">

      {/* ── Sidebar ── */}
      <aside className="w-52 bg-[#080f1a] border-r border-white/8 flex flex-col shrink-0">
        <div className="px-5 pt-5 pb-4">
          <div className="flex items-center gap-2.5">
            <div className="w-7 h-7 bg-[#1a6b3c] rounded-md flex items-center justify-center">
              <Trophy size={13} className="text-white" />
            </div>
            <span className="text-white text-xs font-semibold tracking-wide">WPCA Cricket</span>
          </div>
        </div>

        <div className="px-3 mb-5">
          <p className="text-white/25 text-[9px] tracking-widest px-2 mb-1.5">NAVIGATION</p>
          {navLinks.map(({ icon: Icon, label, badge }) => (
            <button
              key={label}
              onClick={() => {
                if (label === 'Home') navigate('/player')
                else if (label === 'Calendar') navigate('/player/calendar')
              }}
              className={`w-full flex items-center justify-between px-2 py-2 rounded-md text-xs transition-all mb-0.5 ${
                label === 'Calendar'
                  ? 'bg-white/8 text-white'
                  : 'text-white/45 hover:text-white/75 hover:bg-white/5'
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
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-[#1a6b3c] flex items-center justify-center text-[10px] font-bold shrink-0">AP</div>
            <div className="min-w-0">
              <p className="text-white text-[11px] font-medium truncate">Anjali Perera</p>
              <p className="text-white/30 text-[9px] truncate">anjali@wpca.lk</p>
            </div>
          </div>
        </div>
      </aside>

      {/* ── Main ── */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-hidden">

        {/* Top bar */}
        <header className="flex items-center justify-between px-6 py-3 border-b border-white/8 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-white/35">Home</span>
            <ChevronRight size={12} className="text-white/20" />
            <span className="text-white/50">Players</span>
            <ChevronRight size={12} className="text-white/20" />
            <span className="text-white/75">Calendar</span>
          </div>
          <div className="flex items-center gap-2.5">
            {/* Search */}
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 w-44">
              <Search size={12} className="text-white/30" />
              <input
                type="text"
                placeholder="Search events…"
                value={search}
                onChange={e => setSearch(e.target.value)}
                className="bg-transparent text-xs text-white placeholder-white/25 outline-none flex-1"
              />
            </div>
            {/* Filter */}
            <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1">
              <Filter size={11} className="text-white/30" />
              {['all','match','training','meeting'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  className={`px-2 py-0.5 rounded text-[10px] capitalize transition-colors ${
                    filter === f ? 'bg-white/12 text-white' : 'text-white/35 hover:text-white/60'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
            <button className="flex items-center gap-1.5 bg-[#1a6b3c] hover:bg-[#145c32] text-white text-xs px-3 py-1.5 rounded-lg transition-colors">
              <Plus size={12} /> Add Event
            </button>
          </div>
        </header>

        {/* Content: calendar + right panel */}
        <div className="flex flex-1 min-h-0 overflow-hidden">

          {/* ── Calendar area ── */}
          <div className="flex-1 flex flex-col min-w-0 overflow-hidden p-5">

            {/* Month header + stats */}
            <div className="flex items-center justify-between mb-4 shrink-0">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => setCurrent(new Date(year, month - 1, 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <h2 className="text-white text-xl font-bold w-44 text-center">
                    {monthNames[month]} {year}
                  </h2>
                  <button
                    onClick={() => setCurrent(new Date(year, month + 1, 1))}
                    className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white transition-all"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
                <button
                  onClick={() => setCurrent(new Date(today.getFullYear(), today.getMonth(), 1))}
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-xs transition-all border border-white/8"
                >
                  Today
                </button>
              </div>

              {/* Month stats */}
              <div className="flex items-center gap-3">
                {Object.entries(typeConfig).map(([type, cfg]) => (
                  <div key={type} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${cfg.border} ${cfg.bg}`}>
                    <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                    <span className={`text-xs font-medium ${cfg.text}`}>{counts[type]} {cfg.label}s</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day header row */}
            <div className="grid grid-cols-7 mb-1 shrink-0">
              {dayShort.map(d => (
                <div key={d} className="text-center text-xs text-white/25 font-medium py-2">{d}</div>
              ))}
            </div>

            {/* Calendar grid */}
            <div className="grid grid-cols-7 flex-1 min-h-0 gap-px bg-white/5 rounded-xl overflow-hidden border border-white/8">
              {cells.map(({ day, cur }, i) => {
                const evs       = eventsForDay(day, cur)
                const dayKey    = cur ? key(year, month, day) : null
                const isT       = cur && isToday(day)
                const isSel     = dayKey === selected
                const isWeekend = i % 7 === 0 || i % 7 === 6

                return (
                  <div
                    key={i}
                    onClick={() => cur && dayKey && setSelected(dayKey)}
                    className={`relative bg-[#0d1520] flex flex-col p-2 min-h-0 transition-all ${
                      cur ? 'cursor-pointer hover:bg-white/4' : 'opacity-30'
                    } ${isSel && !isT ? 'bg-white/6 ring-1 ring-inset ring-white/15' : ''}
                    ${isWeekend && cur ? 'bg-[#0b1420]' : ''}`}
                  >
                    {/* Day number */}
                    <div className="flex items-center justify-between mb-1 shrink-0">
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full text-xs font-semibold ${
                        isT
                          ? 'bg-green-500 text-white'
                          : isSel
                            ? 'bg-white/15 text-white'
                            : cur
                              ? 'text-white/60'
                              : 'text-white/20'
                      }`}>
                        {day}
                      </span>
                      {evs.length > 2 && (
                        <span className="text-[9px] text-white/25">+{evs.length - 2}</span>
                      )}
                    </div>

                    {/* Events (max 2 visible) */}
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                      {evs.slice(0, 2).map(ev => {
                        const cfg = typeConfig[ev.type]
                        return (
                          <div
                            key={ev.id}
                            className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[10px] truncate ${cfg.bg} ${cfg.text}`}
                          >
                            <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${cfg.dot}`} />
                            <span className="truncate">{ev.label}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Legend */}
            <div className="flex items-center gap-5 mt-3 shrink-0">
              {Object.entries(typeConfig).map(([type, cfg]) => (
                <span key={type} className="flex items-center gap-1.5 text-xs text-white/35">
                  <span className={`w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                  {cfg.label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Right Panel ── */}
          <div className="w-72 shrink-0 border-l border-white/8 flex flex-col overflow-hidden bg-[#080f1a]">

            {/* Selected day detail */}
            <div className="p-4 border-b border-white/8 shrink-0">
              <p className="text-white/25 text-[9px] tracking-widest mb-2">SELECTED DAY</p>
              {selectedDate ? (
                <div>
                  <p className="text-white font-bold text-lg leading-tight">
                    {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
                  </p>
                  <p className="text-white/35 text-xs">{dayLabels[selectedDate.getDay()]} · {selectedDate.getFullYear()}</p>
                </div>
              ) : (
                <p className="text-white/35 text-xs">No day selected</p>
              )}
            </div>

            {/* Events for selected day */}
            <div className="p-4 border-b border-white/8 shrink-0">
              <p className="text-white/25 text-[9px] tracking-widest mb-2">
                {selectedEvents.length > 0 ? `${selectedEvents.length} EVENT${selectedEvents.length > 1 ? 'S' : ''}` : 'NO EVENTS'}
              </p>
              {selectedEvents.length === 0 ? (
                <div className="flex flex-col items-center py-4 text-center">
                  <CalendarDays size={22} className="text-white/15 mb-2" />
                  <p className="text-white/25 text-xs">No events this day</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {selectedEvents.map(ev => {
                    const cfg = typeConfig[ev.type]
                    const Icon = cfg.icon
                    return (
                      <div key={ev.id} className={`rounded-xl border p-3 ${cfg.border} ${cfg.bg}`}>
                        <div className="flex items-start gap-2 mb-2">
                          <div className={`w-7 h-7 rounded-lg ${cfg.bg} border ${cfg.border} flex items-center justify-center shrink-0`}>
                            <Icon size={13} className={cfg.text} />
                          </div>
                          <div className="min-w-0">
                            <p className={`text-sm font-semibold leading-tight ${cfg.text}`}>{ev.label}</p>
                            <p className="text-white/35 text-[10px] mt-0.5">{ev.note}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-[11px] text-white/45">
                            <Clock size={10} className="shrink-0" />
                            {ev.time}
                          </div>
                          <div className="flex items-center gap-1.5 text-[11px] text-white/45">
                            <MapPin size={10} className="shrink-0" />
                            <span className="truncate">{ev.venue}</span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Upcoming events */}
            <div className="flex-1 overflow-y-auto p-4">
              <p className="text-white/25 text-[9px] tracking-widest mb-2">UPCOMING EVENTS</p>
              {upcoming.length === 0 ? (
                <p className="text-white/25 text-xs">No upcoming events</p>
              ) : (
                <div className="space-y-2">
                  {upcoming.map(ev => {
                    const cfg  = typeConfig[ev.type]
                    const d    = new Date(ev.date + 'T00:00:00')
                    const isEv = ev.date === key(today.getFullYear(), today.getMonth(), today.getDate())
                    return (
                      <button
                        key={ev.id}
                        onClick={() => setSelected(ev.date)}
                        className="w-full flex items-center gap-2.5 bg-white/3 hover:bg-white/6 border border-white/6 rounded-lg px-3 py-2.5 text-left transition-all"
                      >
                        <div className="flex flex-col items-center bg-white/5 rounded-lg px-2 py-1 shrink-0 min-w-[36px]">
                          <span className="text-white/35 text-[8px] uppercase">{monthNames[d.getMonth()].slice(0,3)}</span>
                          <span className={`text-sm font-bold leading-tight ${isEv ? 'text-green-400' : 'text-white'}`}>{d.getDate()}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-white/75 text-xs font-medium truncate">{ev.label}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            <span className="text-white/30 text-[10px]">{ev.time}</span>
                          </div>
                        </div>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>

            {/* Player mini card */}
            <div className="p-4 border-t border-white/8 shrink-0">
              <div className="flex items-center gap-2.5 bg-white/3 rounded-xl p-2.5">
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-[#1a6b3c] flex items-center justify-center text-xs font-bold shrink-0">AP</div>
                <div className="min-w-0">
                  <p className="text-white text-xs font-semibold truncate">Anjali Perera</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Users size={9} className="text-white/30" />
                    <p className="text-white/35 text-[10px]">Under 19 · #7</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
