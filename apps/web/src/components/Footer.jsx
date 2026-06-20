import { Trophy, MapPin, Mail, Phone } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-black/70 backdrop-blur-md text-white">
      <div className="px-10 py-16 grid grid-cols-4 gap-10">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-9 h-9 bg-[#1a6b3c] rounded-lg flex items-center justify-center">
              <Trophy size={18} className="text-white" />
            </div>
            <span className="font-bold text-base">WPCA Women's Cricket</span>
          </div>
          <p className="text-white/50 text-sm leading-relaxed">
            The official management platform for Western Province Women's Cricket Association, Sri Lanka.
          </p>
        </div>

        <div>
          <h4 className="font-bold text-base mb-5">Quick links</h4>
          <ul className="space-y-3">
            {['Home', 'Players', 'Matches', 'Teams', 'Analytics'].map(l => (
              <li key={l}><a href="#" className="text-white/50 text-sm hover:text-green-400 transition-colors">{l}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-base mb-5">Age categories</h4>
          <ul className="space-y-3">
            {['Under 13', 'Under 15', 'Under 19', 'Under 23'].map(a => (
              <li key={a}><a href="#" className="text-white/50 text-sm hover:text-green-400 transition-colors">{a}</a></li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-base mb-5">Contact us</h4>
          <ul className="space-y-3">
            <li className="flex items-start gap-3 text-white/50 text-sm">
              <MapPin size={16} className="mt-0.5 shrink-0" />
              <span>Western Province Cricket Association,<br />Colombo, Sri Lanka</span>
            </li>
            <li className="flex items-center gap-3 text-white/50 text-sm">
              <Mail size={16} className="shrink-0" />
              <a href="mailto:info@wpca.lk" className="hover:text-green-400 transition-colors">info@wpca.lk</a>
            </li>
            <li className="flex items-center gap-3 text-white/50 text-sm">
              <Phone size={16} className="shrink-0" />
              <a href="tel:+94112345678" className="hover:text-green-400 transition-colors">+94 11 234 5678</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 px-10 py-5 flex justify-between items-center">
        <p className="text-white/40 text-xs">© 2026 Western Province Women's Cricket Association. All rights reserved.</p>
        <div className="flex gap-6">
          {['Privacy policy', 'Terms of use', 'Cookie policy'].map(l => (
            <a key={l} href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">{l}</a>
          ))}
        </div>
      </div>
    </footer>
  )
}