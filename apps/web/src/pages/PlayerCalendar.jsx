import { useEffect, useMemo, useState } from 'react'
import {
  ChevronRight, ChevronLeft, MapPin, Clock, Users,
  Swords, Dumbbell, Filter, Plus, Search, Loader,
} from 'lucide-react'
import { apiFetch } from '../lib/api.js'
import PlayerLayout from '../components/player/PlayerLayout.jsx'

const monthNames = ['January','February','March','April','May','June',
                    'July','August','September','October','November','December']
const dayLabels  = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']
const dayShort   = ['Sun','Mon','Tue','Wed','Thu','Fri','Sat']

const typeConfig = {
  match:    { bg: 'bg-green-400/20',  text: 'text-green-300',  dot: 'bg-green-400',  border: 'border-green-400/40',  icon: Swords,   label: 'Match'    },
  training: { bg: 'bg-blue-400/20',   text: 'text-blue-300',   dot: 'bg-blue-400',   border: 'border-blue-400/40',   icon: Dumbbell, label: 'Training' },
}

function key(y, m, d) {
  return `${y}-${String(m + 1).padStart(2, '0')}-${String(d).padStart(2, '0')}`
}

function dateKeyOf(d) {
  return key(d.getFullYear(), d.getMonth(), d.getDate())
}

function timeOf(d) {
  return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
}

function initials(name) {
  if (!name) return '?'
  return name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function PlayerCalendar() {
  const [me,       setMe]      = useState(null)
  const [matches,  setMatches] = useState([])
  const [sessions, setSessions]= useState([])
  const [loading,  setLoading] = useState(true)
  const [error,    setError]   = useState(null)

  const today = new Date()
  const [current, setCurrent] = useState(new Date(today.getFullYear(), today.getMonth(), 1))
  const [selected, setSelected] = useState(dateKeyOf(today))
  const [filter, setFilter]     = useState('all')
  const [search, setSearch]     = useState('')

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const meData = await apiFetch('/api/auth/me')
        if (cancelled) return
        setMe(meData)
        const teamId = meData.player?.team
        if (teamId) {
          const [m, s] = await Promise.all([
            apiFetch(`/api/matches?team=${teamId}`),
            apiFetch(`/api/practice-sessions?team=${teamId}`),
          ])
          if (cancelled) return
          setMatches(m)
          setSessions(s)
        }
      } catch (err) {
        if (!cancelled) setError(err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }
    load()
    return () => { cancelled = true }
  }, [])

  const teamId = me?.player?.team

  const allEvents = useMemo(() => {
    const map = {}
    for (const m of matches) {
      const d = new Date(m.date)
      const isHome = m.homeTeam?._id === teamId
      const opponent = isHome ? m.awayTeam : m.homeTeam
      const ev = {
        id: `m-${m._id}`, type: 'match',
        label: `${isHome ? 'vs' : '@'} ${opponent?.name || 'TBD'}`,
        time: timeOf(d), venue: m.venue || '—', note: m.notes || m.type,
      }
      const k = dateKeyOf(d)
      ;(map[k] ||= []).push(ev)
    }
    for (const s of sessions) {
      const d = new Date(s.date)
      const ev = {
        id: `s-${s._id}`, type: 'training',
        label: `${s.focus} Training`,
        time: timeOf(d), venue: s.venue || '—',
        note: s.durationMins ? `${s.durationMins} min` : s.focus,
      }
      const k = dateKeyOf(d)
      ;(map[k] ||= []).push(ev)
    }
    return map
  }, [matches, sessions, teamId])

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
    .filter(([k]) => k >= dateKeyOf(today))
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
  }

  return (
    <PlayerLayout>
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/8 shrink-0">
        <div className="flex items-center gap-2 text-sm">
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
              className="bg-transparent text-sm text-white placeholder-white/25 outline-none flex-1"
            />
          </div>
          {/* Filter */}
          <div className="flex items-center gap-1 bg-white/5 border border-white/10 rounded-lg px-2 py-1">
            <Filter size={11} className="text-white/30" />
            {['all','match','training'].map(f => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-2 py-0.5 rounded text-[11px] capitalize transition-colors ${
                  filter === f ? 'bg-white/12 text-white' : 'text-white/35 hover:text-white/60'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 bg-[#1a6b3c] hover:bg-[#145c32] text-white text-sm px-3 py-1.5 rounded-lg transition-colors">
            <Plus size={12} /> Add Event
          </button>
        </div>
      </header>

      {loading ? (
        <div className="flex-1 flex items-center justify-center gap-2 text-white/40 text-sm">
          <Loader size={16} className="animate-spin" /> Loading calendar…
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-5 py-4">
            Could not load calendar: {error}
          </div>
        </div>
      ) : (
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
                  className="px-3 py-1 rounded-lg bg-white/5 hover:bg-white/10 text-white/50 hover:text-white text-sm transition-all border border-white/8"
                >
                  Today
                </button>
              </div>

              {/* Month stats */}
              <div className="flex items-center gap-3">
                {Object.entries(typeConfig).map(([type, cfg]) => (
                  <div key={type} className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${cfg.border} ${cfg.bg}`}>
                    <span className={`w-2 h-2 rounded-full ${cfg.dot}`} />
                    <span className={`text-sm font-medium ${cfg.text}`}>{counts[type]} {cfg.label}s</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Day header row */}
            <div className="grid grid-cols-7 mb-1 shrink-0">
              {dayShort.map(d => (
                <div key={d} className="text-center text-sm text-white/25 font-medium py-2">{d}</div>
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
                      <span className={`w-6 h-6 flex items-center justify-center rounded-full text-sm font-semibold ${
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
                        <span className="text-[10px] text-white/25">+{evs.length - 2}</span>
                      )}
                    </div>

                    {/* Events (max 2 visible) */}
                    <div className="flex flex-col gap-0.5 overflow-hidden">
                      {evs.slice(0, 2).map(ev => {
                        const cfg = typeConfig[ev.type]
                        return (
                          <div
                            key={ev.id}
                            className={`flex items-center gap-1 px-1.5 py-0.5 rounded text-[11px] truncate ${cfg.bg} ${cfg.text}`}
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
                <span key={type} className="flex items-center gap-1.5 text-sm text-white/35">
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
              <p className="text-white/25 text-[10px] tracking-widest mb-2">SELECTED DAY</p>
              {selectedDate ? (
                <div>
                  <p className="text-white font-bold text-xl leading-tight">
                    {selectedDate.getDate()} {monthNames[selectedDate.getMonth()]}
                  </p>
                  <p className="text-white/35 text-sm">{dayLabels[selectedDate.getDay()]} · {selectedDate.getFullYear()}</p>
                </div>
              ) : (
                <p className="text-white/35 text-sm">No day selected</p>
              )}
            </div>

            {/* Events for selected day */}
            <div className="p-4 border-b border-white/8 shrink-0">
              <p className="text-white/25 text-[10px] tracking-widest mb-2">
                {selectedEvents.length > 0 ? `${selectedEvents.length} EVENT${selectedEvents.length > 1 ? 'S' : ''}` : 'NO EVENTS'}
              </p>
              {selectedEvents.length === 0 ? (
                <div className="flex flex-col items-center py-4 text-center">
                  <Swords size={22} className="text-white/15 mb-2" />
                  <p className="text-white/25 text-sm">No events this day</p>
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
                            <p className={`text-base font-semibold leading-tight ${cfg.text}`}>{ev.label}</p>
                            <p className="text-white/35 text-[11px] mt-0.5">{ev.note}</p>
                          </div>
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-1.5 text-xs text-white/45">
                            <Clock size={10} className="shrink-0" />
                            {ev.time}
                          </div>
                          <div className="flex items-center gap-1.5 text-xs text-white/45">
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
              <p className="text-white/25 text-[10px] tracking-widest mb-2">UPCOMING EVENTS</p>
              {upcoming.length === 0 ? (
                <p className="text-white/25 text-sm">No upcoming events</p>
              ) : (
                <div className="space-y-2">
                  {upcoming.map(ev => {
                    const cfg  = typeConfig[ev.type]
                    const d    = new Date(ev.date + 'T00:00:00')
                    const isEv = ev.date === dateKeyOf(today)
                    return (
                      <button
                        key={ev.id}
                        onClick={() => setSelected(ev.date)}
                        className="w-full flex items-center gap-2.5 bg-white/3 hover:bg-white/6 border border-white/6 rounded-lg px-3 py-2.5 text-left transition-all"
                      >
                        <div className="flex flex-col items-center bg-white/5 rounded-lg px-2 py-1 shrink-0 min-w-[36px]">
                          <span className="text-white/35 text-[9px] uppercase">{monthNames[d.getMonth()].slice(0,3)}</span>
                          <span className={`text-base font-bold leading-tight ${isEv ? 'text-green-400' : 'text-white'}`}>{d.getDate()}</span>
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="text-white/75 text-sm font-medium truncate">{ev.label}</p>
                          <div className="flex items-center gap-1.5 mt-0.5">
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot}`} />
                            <span className="text-white/30 text-[11px]">{ev.time}</span>
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
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-green-500 to-[#1a6b3c] flex items-center justify-center text-sm font-bold shrink-0">
                  {initials(me?.name)}
                </div>
                <div className="min-w-0">
                  <p className="text-white text-sm font-semibold truncate">{me?.name}</p>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <Users size={9} className="text-white/30" />
                    <p className="text-white/35 text-[11px]">{me?.player?.ageCategory} · #{me?.player?.shirtNumber}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}
    </PlayerLayout>
  )
}
