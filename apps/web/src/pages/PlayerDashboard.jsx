import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CalendarDays, Trophy, Search, ChevronRight, Loader,
  Ruler, Scale, Shirt, Activity, Flag, Users, Clock,
} from 'lucide-react'
import { apiFetch } from '../lib/api.js'
import PlayerLayout from '../components/player/PlayerLayout.jsx'

function initials(name) {
  if (!name) return '?'
  return name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

function fmtDate(d) {
  if (!d) return '—'
  return new Date(d).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
}

function calcAge(dob) {
  if (!dob) return null
  const ms = Date.now() - new Date(dob).getTime()
  return Math.floor(ms / (365.25 * 24 * 60 * 60 * 1000))
}

export default function PlayerDashboard() {
  const navigate = useNavigate()
  const [me,       setMe]      = useState(null)
  const [teamName, setTeamName]= useState(null)
  const [loading,  setLoading] = useState(true)
  const [error,    setError]   = useState(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      try {
        const data = await apiFetch('/api/auth/me')
        if (cancelled) return
        setMe(data)
        if (data.player?.team) {
          const team = await apiFetch(`/api/teams/${data.player.team}`)
          if (!cancelled) setTeamName(team.name)
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

  const player = me?.player

  const playerInfoLeft = player ? [
    { icon: Ruler,    label: 'Height',        value: player.heightCm ? `${player.heightCm} cm` : '—' },
    { icon: Scale,    label: 'Weight',        value: player.weightKg ? `${player.weightKg} kg` : '—' },
    { icon: Shirt,    label: 'Shirt',         value: player.shirtNumber ? `#${player.shirtNumber}` : '—' },
    { icon: Activity, label: 'Preferred bat', value: player.battingHand || '—' },
  ] : []

  const playerInfoRight = player ? [
    { icon: Flag,         label: 'Country',   value: player.nationality || '—' },
    { icon: Users,        label: 'Age Group', value: player.ageCategory || '—' },
    { icon: CalendarDays, label: 'Reg. ends', value: fmtDate(player.registrationEnd) },
    { icon: Clock,        label: 'Joined',    value: fmtDate(player.joinedAt) },
  ] : []

  const age = player ? calcAge(player.dateOfBirth) : null
  const metaParts = player ? [
    age ? `${age} years old` : null,
    player.nationality,
    player.role,
    player.shirtNumber ? `#${player.shirtNumber}` : null,
  ].filter(Boolean) : []

  const statCards = player ? [
    { label: 'Matches',     value: player.stats?.matches ?? 0 },
    { label: 'Runs',        value: player.stats?.runs ?? 0 },
    { label: 'Wickets',     value: player.stats?.wickets ?? 0 },
    { label: 'Batting Avg', value: player.stats?.battingAvg ?? 0 },
    { label: 'Strike Rate', value: player.stats?.strikeRate ?? 0 },
  ] : []

  return (
    <PlayerLayout>
      {/* Top bar */}
      <header className="flex items-center justify-between px-6 py-3 border-b border-white/8 shrink-0">
        <div className="flex items-center gap-2 text-sm">
          <span className="text-white/35">Home</span>
          <ChevronRight size={12} className="text-white/20" />
          <span className="text-white/70">Players</span>
        </div>
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5">
            <CalendarDays size={12} className="text-white/30" />
            <span className="text-white/45 text-sm">Season 2025/2026</span>
          </div>
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 w-40">
            <Search size={12} className="text-white/30" />
            <input type="text" placeholder="Search players..." className="bg-transparent text-sm text-white placeholder-white/25 outline-none flex-1 w-full" />
          </div>
        </div>
      </header>

      {loading ? (
        <div className="flex-1 flex items-center justify-center gap-2 text-white/40 text-sm">
          <Loader size={16} className="animate-spin" /> Loading profile…
        </div>
      ) : error ? (
        <div className="flex-1 flex items-center justify-center p-6">
          <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-5 py-4">
            Could not load profile: {error}
          </div>
        </div>
      ) : (
        <div className="flex-1 flex flex-col min-h-0 overflow-y-auto">

          {/* Player card */}
          <div className="bg-[#0a1420] border-b border-white/8 shrink-0">
            <div className="flex min-h-56">

              {/* Left — image placeholder (50%) */}
              <div className="relative w-1/2 shrink-0 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#1a6b3c]/35 via-[#0b1a10] to-[#060e18]" />
                <div
                  className="absolute inset-0 opacity-[0.035]"
                  style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '20px 20px' }}
                />
                <div className="relative z-10 h-full flex flex-col items-center justify-center gap-3">
                  <div className="w-24 h-24 rounded-full bg-white/5 border-2 border-white/10 flex items-center justify-center text-4xl font-bold text-white/20">
                    {initials(me?.name)}
                  </div>
                  <p className="text-white/15 text-[9px] tracking-[0.2em]">PLAYER PHOTO</p>
                </div>
                <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0a1420] to-transparent" />
                <div className="absolute bottom-0 inset-x-0 h-10 bg-gradient-to-t from-[#0a1420] to-transparent" />
              </div>

              {/* Right — info (50%) */}
              <div className="w-1/2 px-7 py-5 flex flex-col">
                {/* Name + button */}
                <div className="flex items-start justify-between mb-1">
                  <h1 className="text-white text-2xl font-bold leading-tight">{me?.name}</h1>
                  <button className="bg-blue-400 hover:bg-blue-300 text-white text-sm px-4 py-1.5 rounded-lg transition-colors shrink-0 ml-3">
                    Edit Profile
                  </button>
                </div>

                {/* Club */}
                {teamName && (
                  <div className="flex items-center gap-1.5 mb-1">
                    <div className="w-4 h-4 bg-[#1a6b3c] rounded-sm flex items-center justify-center shrink-0">
                      <Trophy size={9} className="text-white" />
                    </div>
                    <span className="text-white/55 text-sm">{teamName}</span>
                  </div>
                )}

                {/* Meta row */}
                <div className="flex items-center gap-2 text-white/40 text-sm mb-5 flex-wrap">
                  {metaParts.map((part, i) => (
                    <span key={i} className="flex items-center gap-2">
                      {i > 0 && <span className="text-white/20">•</span>}
                      {part}
                    </span>
                  ))}
                </div>

                {/* Info grid — 2 columns with icons */}
                <div className="flex gap-6">
                  <div className="flex-1 space-y-3">
                    {playerInfoLeft.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                          <Icon size={13} className="text-white/35" />
                        </div>
                        <div>
                          <p className="text-white/30 text-[10px]">{label}</p>
                          <p className="text-white/75 text-sm font-medium">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="flex-1 space-y-3">
                    {playerInfoRight.map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-white/5 border border-white/8 flex items-center justify-center shrink-0">
                          <Icon size={13} className="text-white/35" />
                        </div>
                        <div>
                          <p className="text-white/30 text-[10px]">{label}</p>
                          <p className="text-white/75 text-sm font-medium">{value}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats bar — full width inside the card */}
            <div className="border-t border-white/8 px-6 py-3 flex items-center divide-x divide-white/10">
              {statCards.map(({ label, value }) => (
                <div key={label} className="flex-1 px-5 first:pl-0">
                  <p className="text-white/35 text-[10px] mb-0.5">{label}</p>
                  <p className="text-white font-bold text-base leading-tight">{value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Calendar callout */}
          <div className="flex-1 flex flex-col items-center justify-center gap-3 p-8">
            <CalendarDays size={28} className="text-white/15" />
            <p className="text-white/40 text-sm">See your upcoming matches and training sessions</p>
            <button
              onClick={() => navigate('/player/calendar')}
              className="flex items-center gap-1.5 bg-[#1a6b3c] hover:bg-[#145c32] text-white text-sm px-4 py-2 rounded-lg transition-colors"
            >
              View full calendar <ChevronRight size={14} />
            </button>
          </div>
        </div>
      )}
    </PlayerLayout>
  )
}
