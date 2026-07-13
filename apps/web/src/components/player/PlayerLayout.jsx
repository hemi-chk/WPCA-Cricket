import { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import {
  Home, Activity, CalendarDays, Newspaper, Star,
  Settings, LogOut, ChevronRight, Trophy,
} from 'lucide-react'
import { apiFetch } from '../../lib/api.js'

const navLinks = [
  { icon: Home,         label: 'Home',         path: '/player' },
  { icon: Activity,     label: 'Live Matches', path: '/player/live-matches' },
  { icon: CalendarDays, label: 'Calendar',      path: '/player/calendar' },
  { icon: Newspaper,    label: 'News',          path: '/player/news' },
  { icon: Star,         label: 'Subscription',  path: '/player/subscription' },
]

const ageCategoryOrder = ['Under 13', 'Under 15', 'Under 17', 'Under 19', 'Under 23', 'Senior']

function initials(name) {
  if (!name) return '?'
  return name.split(' ').filter(Boolean).map(w => w[0]).join('').slice(0, 2).toUpperCase()
}

export default function PlayerLayout({ children }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [me, setMe]     = useState(null)
  const [counts, setCounts] = useState({})

  useEffect(() => {
    apiFetch('/api/auth/me').then(setMe).catch(() => {})
    apiFetch('/api/players').then(players => {
      const c = {}
      for (const p of players) c[p.ageCategory] = (c[p.ageCategory] || 0) + 1
      setCounts(c)
    }).catch(() => {})
  }, [])

  function handleLogout() {
    localStorage.removeItem('wpca_token')
    localStorage.removeItem('wpca_user')
    navigate('/login')
  }

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
            <span className="text-white text-sm font-semibold tracking-wide">WPCA Cricket</span>
          </div>
        </div>

        {/* Nav links */}
        <div className="px-3 mb-5">
          <p className="text-white/25 text-[10px] tracking-widest px-2 mb-1.5">NAVIGATION</p>
          {navLinks.map(({ icon: Icon, label, path }) => (
            <button
              key={label}
              onClick={() => navigate(path)}
              className={`w-full flex items-center justify-between px-2 py-2 rounded-md text-sm transition-all mb-0.5 ${
                location.pathname === path ? 'bg-white/8 text-white' : 'text-white/45 hover:text-white/75 hover:bg-white/5'
              }`}
            >
              <span className="flex items-center gap-2.5"><Icon size={14} />{label}</span>
            </button>
          ))}
        </div>

        {/* Age categories */}
        <div className="px-3 mb-4">
          <p className="text-white/25 text-[10px] tracking-widest px-2 mb-1.5">AGE CATEGORIES</p>
          {ageCategoryOrder.map(label => (
            <button key={label} className="w-full flex items-center justify-between px-2 py-1.5 rounded-md text-sm text-white/45 hover:text-white/75 hover:bg-white/5 transition-all">
              <span>{label}</span>
              <span className="text-white/25">{counts[label] ?? 0}</span>
            </button>
          ))}
          <button className="flex items-center gap-1 px-2 py-1.5 text-sm text-white/25 hover:text-white/45 transition-colors">
            View all <ChevronRight size={11} />
          </button>
        </div>

        <div className="flex-1" />

        {/* Bottom */}
        <div className="px-3 pb-4 space-y-0.5">
          <button className="w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-sm text-white/45 hover:text-white/75 hover:bg-white/5 transition-all">
            <Settings size={14} />Settings
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-2 py-2 rounded-md text-sm text-white/45 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <LogOut size={14} />Logout
          </button>
          <div className="flex items-center gap-2.5 px-2 pt-3 mt-1 border-t border-white/8">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-green-500 to-[#1a6b3c] flex items-center justify-center text-xs font-bold shrink-0">
              {initials(me?.name)}
            </div>
            <div className="min-w-0">
              <p className="text-white text-xs font-medium truncate">{me?.name || 'Loading…'}</p>
              <p className="text-white/30 text-[10px] truncate">{me?.email || ''}</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col min-w-0 min-h-screen overflow-hidden">
        {children}
      </div>
    </div>
  )
}
