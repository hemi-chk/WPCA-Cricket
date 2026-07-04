import { useNavigate } from 'react-router-dom'
import { Trophy, Users, MapPin, ChevronLeft, Shield } from 'lucide-react'

const teams = [
  {
    id: 1,
    name: 'Western Province WCA',
    shortName: 'WPCA',
    category: 'Senior',
    players: 22,
    location: 'Colombo',
    founded: '2008',
    captain: 'Chamari Athapaththu',
    color: '#1a6b3c',
  },
  {
    id: 2,
    name: 'Western Province Under 19',
    shortName: 'WP U19',
    category: 'Under 19',
    players: 18,
    location: 'Colombo',
    founded: '2012',
    captain: 'Anjali Perera',
    color: '#1a5c8a',
  },
  {
    id: 3,
    name: 'Western Province Under 17',
    shortName: 'WP U17',
    category: 'Under 17',
    players: 16,
    location: 'Colombo',
    founded: '2015',
    captain: 'Dilini Fernando',
    color: '#6b3c8a',
  },
  {
    id: 4,
    name: 'Western Province Under 15',
    shortName: 'WP U15',
    category: 'Under 15',
    players: 15,
    location: 'Colombo',
    founded: '2016',
    captain: 'Nadeesha Silva',
    color: '#8a6b1a',
  },
  {
    id: 5,
    name: 'Western Province Under 13',
    shortName: 'WP U13',
    category: 'Under 13',
    players: 14,
    location: 'Colombo',
    founded: '2018',
    captain: 'Sethumi Wickrama',
    color: '#8a3c3c',
  },
  {
    id: 6,
    name: 'Colombo District WCA',
    shortName: 'CDWCA',
    category: 'Senior',
    players: 20,
    location: 'Colombo District',
    founded: '2010',
    captain: 'Inoka Ranaweera',
    color: '#2a7a5c',
  },
]

const categoryColors = {
  'Senior':     'bg-green-400/15 text-green-300 border-green-400/30',
  'Under 19':   'bg-blue-400/15 text-blue-300 border-blue-400/30',
  'Under 17':   'bg-purple-400/15 text-purple-300 border-purple-400/30',
  'Under 15':   'bg-yellow-400/15 text-yellow-300 border-yellow-400/30',
  'Under 13':   'bg-red-400/15 text-red-300 border-red-400/30',
}

export default function Teams() {
  const navigate = useNavigate()

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
          <span>Home</span>
          <span>/</span>
          <span className="text-white/60">Teams</span>
        </div>
        <div className="flex items-end justify-between">
          <div>
            <p className="text-green-400 text-xs tracking-widest uppercase font-medium mb-2">Season 2025 / 2026</p>
            <h1 className="text-4xl font-bold text-white mb-2">Our Teams</h1>
            <p className="text-white/45 text-sm">All Western Province women's cricket teams competing this season.</p>
          </div>
          <div className="flex items-center gap-4">
            {['Senior','Under 19','Under 17','Under 15','Under 13'].map(cat => (
              <span key={cat} className={`text-[11px] font-medium px-3 py-1 rounded-full border ${categoryColors[cat]}`}>
                {cat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Teams grid */}
      <div className="px-10 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl">
          {teams.map(team => (
            <div
              key={team.id}
              className="border border-white/8 rounded-2xl bg-white/3 hover:bg-white/5 hover:border-white/15 transition-all cursor-pointer overflow-hidden group"
            >
              {/* Card top accent */}
              <div className="h-1.5 w-full" style={{ backgroundColor: team.color }} />

              <div className="p-6">
                {/* Icon + name */}
                <div className="flex items-start gap-4 mb-5">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{ backgroundColor: team.color + '30', border: `1px solid ${team.color}60` }}
                  >
                    <Shield size={22} style={{ color: team.color }} />
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

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mb-5">
                  {[
                    { label: 'Players', value: team.players },
                    { label: 'Founded', value: team.founded },
                    { label: 'Short', value: team.shortName },
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/4 rounded-lg px-3 py-2 text-center">
                      <p className="text-white/30 text-[9px] uppercase tracking-wide mb-0.5">{label}</p>
                      <p className="text-white text-xs font-semibold">{value}</p>
                    </div>
                  ))}
                </div>

                {/* Location & captain */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-white/45 text-xs">
                    <MapPin size={12} className="shrink-0" />
                    {team.location}
                  </div>
                  <div className="flex items-center gap-2 text-white/45 text-xs">
                    <Users size={12} className="shrink-0" />
                    Captain: <span className="text-white/65">{team.captain}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
