export default function Footer() {
  return (
    <footer className="px-10 py-8 bg-[#0a1628]/80 backdrop-blur-md flex justify-between items-center">
      <p className="text-white/40 text-xs">© 2026 Western Province Women's Cricket Association. All rights reserved.</p>
      <div className="flex gap-5">
        {['Privacy', 'Terms', 'Contact'].map(l => (
          <a key={l} href="#" className="text-white/40 text-xs hover:text-white/70 transition-colors">{l}</a>
        ))}
      </div>
    </footer>
  )
}