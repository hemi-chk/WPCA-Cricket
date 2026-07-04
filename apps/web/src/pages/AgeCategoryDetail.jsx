import { useParams, useNavigate } from "react-router-dom";

// Placeholder data — this is what the backend will eventually provide.
// Keyed by slug so each age category shows its own content.
const placeholderData = {
  u13: {
    title: "Under 13",
    tagline: "Future stars",
    eligibility: "Players who selected at U13 selections at provincial level",
    nextSelection: { date: "2026-07-15", venue: "P. Sara Oval, Colombo", time: "8:30 AM" },
    practices: [
      { day: "Tuesday", time: "4:00 – 6:00 PM", venue: "Colombo Cricket Club Ground" },
      { day: "Saturday", time: "8:00 – 11:00 AM", venue: "P. Sara Oval" },
    ],
    tournaments: [
      { name: "WPCA U13 Inter-Club League", month: "August 2026", status: "Upcoming" },
      { name: "Provincial U13 Championship", month: "October 2026", status: "Upcoming" },
    ],
  },
  u15: {
    title: "Under 15",
    tagline: "Rising talent",
    eligibility: "Players who selected at U15 selections at provincial level",
    nextSelection: { date: "2026-07-20", venue: "SSC Ground, Colombo", time: "9:00 AM" },
    practices: [
      { day: "Wednesday", time: "4:00 – 6:00 PM", venue: "SSC Ground" },
      { day: "Sunday", time: "8:00 – 11:00 AM", venue: "NCC Ground" },
    ],
    tournaments: [
      { name: "WPCA U15 League", month: "September 2026", status: "Upcoming" },
    ],
  },
  u19: {
    title: "Under 19",
    tagline: "Elite prospects",
    eligibility: "Players who selected at U19 selections at provincial level",
    nextSelection: { date: "2026-08-01", venue: "Colts Cricket Club", time: "9:00 AM" },
    practices: [
      { day: "Monday", time: "4:30 – 6:30 PM", venue: "Colts Cricket Club" },
      { day: "Friday", time: "4:30 – 6:30 PM", venue: "Colts Cricket Club" },
    ],
    tournaments: [
      { name: "U19 Women's Provincial Tournament", month: "November 2026", status: "Upcoming" },
    ],
  },
  u23: {
    title: "Under 23",
    tagline: "Senior pathway",
    eligibility: "Players who selected at U13 selections at provincial level",
    nextSelection: { date: "2026-08-10", venue: "P. Sara Oval, Colombo", time: "9:30 AM" },
    practices: [
      { day: "Tuesday", time: "5:00 – 7:00 PM", venue: "P. Sara Oval" },
      { day: "Thursday", time: "5:00 – 7:00 PM", venue: "P. Sara Oval" },
    ],
    tournaments: [
      { name: "U23 Emerging Players Trophy", month: "December 2026", status: "Upcoming" },
    ],
  },
};

export default function AgeCategoryDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const data = placeholderData[slug];

  // If someone visits a slug that doesn't exist (e.g. /age-category/u99)
  if (!data) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col items-center justify-center px-10">
        <h1 className="text-3xl font-bold text-white mb-3">Category not found</h1>
        <p className="text-white/50 mb-6">We couldn't find details for "{slug}".</p>
        <button
          onClick={() => navigate("/")}
          className="text-green-400 border border-green-400/30 rounded-lg px-5 py-2 hover:bg-green-400/10 transition-all"
        >
          ← Back to home
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] px-10 py-12">
      {/* Back link */}
      <button
        onClick={() => navigate("/")}
        className="text-white/50 hover:text-green-400 text-sm mb-8 transition-all"
      >
        ← Back to home
      </button>

      {/* Header */}
      <div className="mb-12">
        <p className="text-green-400 text-xs tracking-widest uppercase font-medium mb-2">{data.tagline}</p>
        <h1 className="text-5xl font-bold text-white">{data.title}</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-5xl">
        {/* Next selection */}
        <div className="border border-green-400/30 rounded-2xl p-8 bg-white/5">
          <p className="text-green-400 text-lg font-bold mb-4">Next Selection</p>
          <div className="text-2xl font-bold text-white mb-2">{data.nextSelection.date}</div>
          <div className="text-white/60 text-sm">{data.nextSelection.time}</div>
          <div className="text-white/60 text-sm">{data.nextSelection.venue}</div>
        </div>

        {/* Eligibility */}
        <div className="border border-green-400/30 rounded-2xl p-8 bg-white/5">
          <p className="text-green-400 text-lg font-bold mb-4">Who Can Join</p>
          <p className="text-white/70 text-sm leading-relaxed">{data.eligibility}</p>
        </div>

        {/* Practices */}
        <div className="border border-green-400/30 rounded-2xl p-8 bg-white/5">
          <p className="text-green-400 text-lg font-bold mb-4">Practice Schedule</p>
          <div className="space-y-3">
            {data.practices.map((p, i) => (
              <div key={i} className="flex justify-between items-start border-b border-white/10 pb-3 last:border-0">
                <div>
                  <div className="text-white font-medium">{p.day}</div>
                  <div className="text-white/50 text-sm">{p.venue}</div>
                </div>
                <div className="text-green-400 text-sm">{p.time}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Tournaments */}
        <div className="border border-green-400/30 rounded-2xl p-8 bg-white/5">
          <p className="text-green-400 text-lg font-bold mb-4">Tournaments</p>
          <div className="space-y-3">
            {data.tournaments.map((t, i) => (
              <div key={i} className="flex justify-between items-start border-b border-white/10 pb-3 last:border-0">
                <div>
                  <div className="text-white font-medium">{t.name}</div>
                  <div className="text-white/50 text-sm">{t.month}</div>
                </div>
                <span className="text-xs text-green-400 border border-green-400/30 rounded-full px-3 py-1">{t.status}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}