const ages = [
  { num: 'U13', label: 'Under 13', sub: 'Future stars' },
  { num: 'U15', label: 'Under 15', sub: 'Rising talent' },
  { num: 'U19', label: 'Under 19', sub: 'Elite prospects' },
  { num: 'U23', label: 'Under 23', sub: 'Senior pathway' },
]

export default function AgeCategories() {
  return (
    <section className="px-10 py-16 bg-black/50 backdrop-blur-md">
      <p className="text-green-400 text-xs tracking-widest uppercase font-medium mb-3">Age categories</p>
      <h2 className="text-4xl font-bold text-white mb-3">Developing talent at every level</h2>
      <p className="text-white/50 text-base mb-10">Tracking growth across all age groups in women's cricket.</p>
      <div className="grid grid-cols-4 gap-5">
        {ages.map(a => (
          <div key={a.num} className="border border-green-400/30 rounded-2xl p-10 text-center hover:border-green-400 hover:bg-white/10 transition-all cursor-pointer">
            <div className="text-5xl font-bold text-green-400 mb-3">{a.num}</div>
            <div className="text-white font-medium text-lg mb-1">{a.label}</div>
            <div className="text-white/40 text-sm">{a.sub}</div>
          </div>
        ))}
      </div>
    </section>
  )
}