import CoachLayout from '../../components/coach/CoachLayout.jsx'

export default function ComingSoon({ title, icon: Icon, description }) {
  return (
    <CoachLayout>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
        {Icon && <Icon size={40} className="text-white/20 mb-4" />}
        <h1 className="text-white text-2xl font-bold mb-2">{title}</h1>
        <p className="text-white/40 text-sm max-w-sm">{description || 'This feature is coming soon.'}</p>
      </div>
    </CoachLayout>
  )
}
