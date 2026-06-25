import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  User,
  Users,
  CalendarDays,
  Trophy,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  Bat,
  Target,
  Star,
  ChevronRight,
  Clock,
  MapPin,
} from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'profile', label: 'My Profile', icon: User },
  { id: 'team', label: 'My Team', icon: Users },
  { id: 'schedule', label: 'Schedule', icon: CalendarDays },
]

const statsCards = [
  { label: 'Matches Played', value: '24', change: '+3 this season', icon: Trophy, color: 'text-green-400', bg: 'bg-green-400/10' },
  { label: 'Total Runs', value: '612', change: '+87 this season', icon: TrendingUp, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  { label: 'Wickets Taken', value: '18', change: '+4 this season', icon: Target, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  { label: 'Batting Avg', value: '34.2', change: '+2.1 this season', icon: Star, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
]

const upcomingMatches = [
  {
    opponent: 'Southern Province WC',
    date: 'July 2, 2026',
    time: '9:00 AM',
    venue: 'Bloomfield Cricket Ground',
    type: 'T20',
    status: 'Confirmed',
  },
  {
    opponent: 'Kandy WC',
    date: 'July 8, 2026',
    time: '2:00 PM',
    venue: 'Nondescripts Cricket Club',
    type: 'ODI',
    status: 'Tentative',
  },
  {
    opponent: 'Galle WC',
    date: 'July 15, 2026',
    time: '10:00 AM',
    venue: 'Galle International Stadium',
    type: 'T20',
    status: 'Confirmed',
  },
]

const recentActivity = [
  { text: 'Your performance report for June has been shared.', time: '2 hours ago' },
  { text: 'Coach Amara added a new training session on June 30.', time: '1 day ago' },
  { text: 'You were selected for the T20 squad vs Southern Province.', time: '2 days ago' },
  { text: 'Match result recorded: WP vs Kandy — WP won by 6 wickets.', time: '5 days ago' },
]

export default function PlayerDashboard() {
  const navigate = useNavigate()
  const [active, setActive] = useState('dashboard')

  return (
    <div className="flex min-h-screen bg-[#060e1a]">

      {/* Sidebar */}
      <aside className="w-60 bg-[#0a1628] border-r border-white/10 flex flex-col shrink-0">
        {/* Logo */}
        <div className="px-6 py-5 border-b border-white/10 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#1a6b3c] rounded-lg flex items-center justify-center">
            <Trophy size={16} className="text-white" />
          </div>
          <div>
            <p className="text-white text-xs font-semibold leading-tight">WPCA</p>
            <p className="text-white/40 text-[10px]">Women's Cricket</p>
          </div>
        </div>

        {/* Player avatar */}
        <div className="px-6 py-5 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-[#1a6b3c] flex items-center justify-center text-white font-bold text-sm">
              AP
            </div>
            <div>
              <p className="text-white text-sm font-medium">Anjali Perera</p>
              <p className="text-white/40 text-xs">Right-hand Bat · Age U19</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActive(id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all ${
                active === id
                  ? 'bg-green-400/10 text-green-400 border border-green-400/20'
                  : 'text-white/50 hover:text-white hover:bg-white/5'
              }`}
            >
              <Icon size={17} />
              {label}
            </button>
          ))}
        </nav>

        {/* Bottom actions */}
        <div className="px-3 pb-5 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-white hover:bg-white/5 transition-all">
            <Settings size={17} />
            Settings
          </button>
          <button
            onClick={() => navigate('/login')}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-white/50 hover:text-red-400 hover:bg-red-400/5 transition-all"
          >
            <LogOut size={17} />
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">

        {/* Top bar */}
        <header className="sticky top-0 z-10 bg-[#060e1a]/90 backdrop-blur border-b border-white/10 px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-white font-semibold text-lg">
              {navItems.find(n => n.id === active)?.label ?? 'Dashboard'}
            </h1>
            <p className="text-white/40 text-xs">Wednesday, June 25, 2026</p>
          </div>
          <button className="relative text-white/50 hover:text-white transition-colors">
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full text-[9px] font-bold text-white flex items-center justify-center">3</span>
          </button>
        </header>

        {/* Dashboard content */}
        {active === 'dashboard' && (
          <div className="px-8 py-6 space-y-6">

            {/* Welcome banner */}
            <div className="bg-gradient-to-r from-[#1a6b3c]/40 to-[#0a1628] border border-green-400/20 rounded-xl px-6 py-5 flex items-center justify-between">
              <div>
                <p className="text-green-400 text-xs tracking-widest mb-1">GOOD MORNING</p>
                <h2 className="text-white text-xl font-bold">Anjali Perera</h2>
                <p className="text-white/50 text-sm mt-1">Your next match is in <span className="text-green-400 font-medium">7 days</span>. Keep training hard!</p>
              </div>
              <div className="hidden sm:flex w-14 h-14 rounded-full bg-gradient-to-br from-green-500 to-[#1a6b3c] items-center justify-center text-white font-bold text-xl">
                AP
              </div>
            </div>

            {/* Stats grid */}
            <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
              {statsCards.map(({ label, value, change, icon: Icon, color, bg }) => (
                <div key={label} className="bg-[#0a1628] border border-white/10 rounded-xl p-4">
                  <div className="flex items-center justify-between mb-3">
                    <p className="text-white/50 text-xs">{label}</p>
                    <div className={`w-8 h-8 rounded-lg ${bg} flex items-center justify-center`}>
                      <Icon size={15} className={color} />
                    </div>
                  </div>
                  <p className={`text-2xl font-bold ${color}`}>{value}</p>
                  <p className="text-white/30 text-xs mt-1">{change}</p>
                </div>
              ))}
            </div>

            {/* Upcoming matches + recent activity */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">

              {/* Upcoming matches */}
              <div className="xl:col-span-2 bg-[#0a1628] border border-white/10 rounded-xl p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-white font-semibold text-sm">Upcoming Matches</h3>
                  <button className="text-green-400 text-xs hover:underline flex items-center gap-1">
                    View all <ChevronRight size={13} />
                  </button>
                </div>
                <div className="space-y-3">
                  {upcomingMatches.map((match, i) => (
                    <div key={i} className="flex items-center gap-4 bg-white/3 rounded-lg px-4 py-3 border border-white/5">
                      <div className="text-center shrink-0">
                        <p className="text-green-400 font-bold text-xs">{match.type}</p>
                        <p className="text-white/30 text-[10px] mt-0.5">{match.date}</p>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-white text-sm font-medium truncate">vs {match.opponent}</p>
                        <div className="flex items-center gap-3 mt-1">
                          <span className="flex items-center gap-1 text-white/40 text-xs">
                            <Clock size={11} /> {match.time}
                          </span>
                          <span className="flex items-center gap-1 text-white/40 text-xs truncate">
                            <MapPin size={11} /> {match.venue}
                          </span>
                        </div>
                      </div>
                      <span className={`shrink-0 text-xs px-2.5 py-1 rounded-full border ${
                        match.status === 'Confirmed'
                          ? 'bg-green-400/10 text-green-400 border-green-400/20'
                          : 'bg-yellow-400/10 text-yellow-400 border-yellow-400/20'
                      }`}>
                        {match.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent activity */}
              <div className="bg-[#0a1628] border border-white/10 rounded-xl p-5">
                <h3 className="text-white font-semibold text-sm mb-4">Recent Activity</h3>
                <div className="space-y-4">
                  {recentActivity.map((item, i) => (
                    <div key={i} className="flex gap-3">
                      <div className="mt-1 w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                      <div>
                        <p className="text-white/70 text-xs leading-relaxed">{item.text}</p>
                        <p className="text-white/30 text-[10px] mt-1">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Placeholder for other sections */}
        {active !== 'dashboard' && (
          <div className="flex items-center justify-center h-[60vh]">
            <div className="text-center">
              <div className="w-14 h-14 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mx-auto mb-4">
                {(() => {
                  const Icon = navItems.find(n => n.id === active)?.icon
                  return Icon ? <Icon size={22} className="text-white/30" /> : null
                })()}
              </div>
              <p className="text-white/40 text-sm">{navItems.find(n => n.id === active)?.label} — coming soon</p>
            </div>
          </div>
        )}

      </main>
    </div>
  )
}
