import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function CTA() {
  const navigate = useNavigate()

  return (
    <section className="px-10 py-24 bg-[#1a6b3c]/70 backdrop-blur-md text-center">
      <h2 className="text-5xl font-bold text-white mb-4">Be part of Western Province<br/>Women's Cricket</h2>
      <p className="text-white/70 text-base mb-10 max-w-lg mx-auto">Contact the admin to get your credentials and join the platform.</p>
      <div className="flex gap-4 justify-center">
        <Button onClick={() => navigate('/contact-admin')} className="bg-white text-[#1a6b3c] hover:bg-white/90 px-10 py-6 text-base font-bold">Get access</Button>
        <Button variant="outline" className="text-white border-white/50 bg-transparent hover:bg-white/10 px-10 py-6 text-base">Learn more</Button>
      </div>
    </section>
  )
}