const ages = [
  { num: 'U13', label: 'Under 13', sub: 'Future stars' },
  { num: 'U15', label: 'Under 15', sub: 'Rising talent' },
  { num: 'U19', label: 'Under 19', sub: 'Elite prospects' },
  { num: 'U23', label: 'Under 23', sub: 'Senior pathway' },
]

export default function AgeCategories() {
  return (
    <section className="px-10 py-16 bg-[#0a1628]/70 backdrop-blur-md">
      <p className="text-green-400 text-xs tracking-widest uppercase font-medium mb-2">Age categories</p>
      <h2 className="text-3xl font-bold text-white mb-1">Developing talent at every level</h2>
      <p className="text-white/50 text-sm mb-8">Tracking growth across all age groups in women's cricket.</p>
      <div className="grid grid-cols-4 gap-4">
        {ages.map(a => (
          <div key={a.num} className="border border-white/10 rounded-xl p-7 text-center hover:border-green-400 transition-colors cursor-pointer">
            <div className="text-4xl font-bold text-green-400">{a.num}</div>
            <div className="text-sm text-white/50 mt-2">{a.label}</div>
            <div className="text-xs text-white/30 mt-1">{a.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}