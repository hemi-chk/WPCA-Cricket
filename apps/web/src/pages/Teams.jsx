import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Trophy, Users, MapPin, ChevronLeft, Shield, Loader } from 'lucide-react'
import { API } from '../lib/api.js'

const categoryColors = {
  'Senior':   'bg-green-400/15 text-green-300 border-green-400/30',
  'Under 19': 'bg-blue-400/15 text-blue-300 border-blue-400/30',
  'Under 17': 'bg-purple-400/15 text-purple-300 border-purple-400/30',
  'Under 15': 'bg-yellow-400/15 text-yellow-300 border-yellow-400/30',
  'Under 13': 'bg-red-400/15 text-red-300 border-red-400/30',
}

const categoryAccent = {
  'Senior':   '#1a6b3c',
  'Under 19': '#1a5c8a',
  'Under 17': '#6b3c8a',
  'Under 15': '#8a6b1a',
  'Under 13': '#8a3c3c',
}

export default function Teams() {
  const navigate = useNavigate()
  const [teams, setTeams]     = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState(null)

  useEffect(() => {
    fetch(`${API}/api/teams`)
      .then(r => { if (!r.ok) throw new Error('Failed to fetch'); return r.json() })
      .then(data => setTeams(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">

      {/* Navbar */}
      <nav className="flex items-center justify-between px-10 py-4 bg-[#0a1628]/80 backdrop-blur-md sticky top-0 z-50 border-b border-white/8">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-[#1a6b3c] rounded-lg flex items-center justify-center text-white">
            <Trophy size={18} />
          </div>
          <span className="text-white font-medium text-sm tracking-wide">WPCA Women's Cricket</span>
        </div>
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-1.5 text-white/50 hover:text-white text-sm transition-colors"
        >
          <ChevronLeft size={15} /> Back to Home
        </button>
      </nav>

      {/* Hero */}
      <div className="px-10 py-14 border-b border-white/8 bg-[#0a1628]/40">
        <div className="flex items-center gap-2 text-xs text-white/35 mb-4">
          <span>Home</span><span>/</span>
          <span className="text-white/60">Teams</span>
        </div>
        <div className="flex items-end justify-between flex-wrap gap-4">
          <div>
            <p className="text-green-400 text-xs tracking-widest uppercase font-medium mb-2">Season 2025 / 2026</p>
            <h1 className="text-4xl font-bold text-white mb-2">Our Teams</h1>
            <p className="text-white/45 text-sm">All Western Province women's cricket teams competing this season.</p>
          </div>
          <div className="flex items-center gap-3 flex-wrap">
            {Object.entries(categoryColors).map(([cat, cls]) => (
              <span key={cat} className={`text-[11px] font-medium px-3 py-1 rounded-full border ${cls}`}>{cat}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-10 py-10">
        {loading && (
          <div className="flex items-center gap-2 text-white/40">
            <Loader size={16} className="animate-spin" />
            <span className="text-sm">Loading teams…</span>
          </div>
        )}

        {error && (
          <div className="text-red-400 text-sm bg-red-400/10 border border-red-400/20 rounded-xl px-5 py-4">
            Could not load teams: {error}
          </div>
        )}

        {!loading && !error && teams.length === 0 && (
          <p className="text-white/30 text-sm">No teams found. Run the seed script to populate data.</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl">
          {teams.map(team => {
            const color   = categoryAccent[team.category] || '#1a6b3c'
            const captain = team.captain?.name ?? '—'
            const count   = Array.isArray(team.players) ? team.players.length : 0

            return (
              <div
                key={team._id}
                className="border border-white/8 rounded-2xl bg-white/3 hover:bg-white/5 hover:border-white/15 transition-all cursor-pointer overflow-hidden group"
              >
                <div className="h-1.5 w-full" style={{ backgroundColor: color }} />
                <div className="p-6">
                  <div className="flex items-start gap-4 mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                      style={{ backgroundColor: color + '30', border: `1px solid ${color}60` }}
                    >
                      <Shield size={22} style={{ color }} />
                    </div>
                    <div>
                      <h2 className="text-white font-bold text-base leading-tight group-hover:text-green-300 transition-colors">
                        {team.name}
                      </h2>
                      <span className={`inline-block mt-1.5 text-[10px] font-medium px-2.5 py-0.5 rounded-full border ${categoryColors[team.category]}`}>
                        {team.category}
                      </span>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 mb-5">
                    {[
                      { label: 'Players', value: count },
                      { label: 'Founded', value: team.founded ?? '—' },
                      { label: 'Short',   value: team.shortName },
                    ].map(({ label, value }) => (
                      <div key={label} className="bg-white/4 rounded-lg px-3 py-2 text-center">
                        <p className="text-white/30 text-[9px] uppercase tracking-wide mb-0.5">{label}</p>
                        <p className="text-white text-xs font-semibold">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-white/45 text-xs">
                      <MapPin size={12} className="shrink-0" />
                      {team.location ?? '—'}
                    </div>
                    <div className="flex items-center gap-2 text-white/45 text-xs">
                      <Users size={12} className="shrink-0" />
                      Captain: <span className="text-white/65">{captain}</span>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
