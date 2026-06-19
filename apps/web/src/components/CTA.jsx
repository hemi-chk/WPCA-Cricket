import { Button } from '@/components/ui/button'

export default function CTA() {
  return (
    <section className="px-10 py-20 bg-[#1a6b3c]/80 backdrop-blur-md text-center">
      <h2 className="text-3xl font-bold text-white mb-3">Be part of Western Province Women's Cricket</h2>
      <p className="text-white/70 text-sm mb-8">Register as a player, coach, or selector and help grow the women's game in Sri Lanka.</p>
      <div className="flex gap-3 justify-center">
        <Button className="bg-white text-[#1a6b3c] hover:bg-white/90 px-8">Register now</Button>
        <Button variant="outline" className="text-white border-white/50 bg-transparent hover:bg-white/10 px-8">Learn more</Button>
      </div>
    </section>
  )
}