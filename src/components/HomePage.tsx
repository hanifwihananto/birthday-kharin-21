import { useEffect, useRef } from 'react'
import confetti from 'canvas-confetti'
import { Heart, Sparkles, ArrowRight } from 'lucide-react'
import FallingPetals from './FallingPetals'

interface HomePageProps {
  onStartJourney: () => void
}

export default function HomePage({ onStartJourney }: HomePageProps) {
  const hasRunConfetti = useRef(false)

  useEffect(() => {
    if (hasRunConfetti.current) return
    hasRunConfetti.current = true

    const duration = 3000
    const animationEnd = Date.now() + duration
    const colors = ['#ec4899', '#f9a8d4', '#fce7f3', '#ffffff']

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
      })
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
      })

      if (Date.now() < animationEnd) {
        requestAnimationFrame(frame)
      }
    }

    frame()
  }, [])

  return (
    <div className="relative min-h-screen overflow-hidden">
      <FallingPetals />
      
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-20 h-20 bg-accent/30 rounded-full blur-2xl animate-float" />
        <div className="absolute top-1/4 right-5 w-32 h-32 bg-primary/20 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-1/3 left-5 w-24 h-24 bg-secondary/50 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Floating hearts decoration */}
        <div className="absolute top-20 left-1/4 animate-float" style={{ animationDelay: '0.5s' }}>
          <Heart className="w-6 h-6 text-primary/40 fill-primary/40" />
        </div>
        <div className="absolute top-32 right-1/4 animate-float" style={{ animationDelay: '1.5s' }}>
          <Sparkles className="w-5 h-5 text-accent" />
        </div>
        <div className="absolute top-40 left-1/3 animate-float" style={{ animationDelay: '2s' }}>
          <Heart className="w-4 h-4 text-accent/60 fill-accent/60" />
        </div>

        {/* Main content */}
        <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="mb-6 flex justify-center">
            <div className="relative">
              <Heart className="w-16 h-16 text-primary fill-primary animate-pulse-glow rounded-full" />
              <Sparkles className="absolute -top-1 -right-1 w-6 h-6 text-accent animate-bounce-slow" />
            </div>
          </div>

          <p className="text-muted-foreground text-sm uppercase tracking-widest mb-2 animate-fade-in" style={{ animationDelay: '0.5s' }}>
            Selamat Ulang Tahun
          </p>

          <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl font-bold text-foreground mb-4 text-balance animate-fade-in" style={{ animationDelay: '0.7s' }}>
            Kharin Nova
          </h1>

          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-primary to-transparent mx-auto mb-6 animate-fade-in" style={{ animationDelay: '0.9s' }} />

          <p className="text-muted-foreground text-lg max-w-sm mx-auto mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '1.1s' }}>
            Di hari spesialmu ini, aku ingin memberikan sesuatu yang lebih dari sekedar kata-kata...
          </p>

          <p className="text-foreground/80 text-base max-w-xs mx-auto mb-10 animate-fade-in" style={{ animationDelay: '1.3s' }}>
            Sebuah perjalanan kecil untuk menemukan hadiah istimewa yang sudah menunggumu 💕
          </p>
        </div>

        {/* CTA Button */}
        <button
          onClick={onStartJourney}
          className="group relative inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 rounded-full font-medium text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up animate-pulse-glow"
          style={{ animationDelay: '1.5s' }}
        >
          <span>Mulai Perjalanan</span>
          <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Bottom decoration */}
        <div className="absolute bottom-32 left-1/2 -translate-x-1/2 flex gap-2 animate-fade-in" style={{ animationDelay: '2s' }}>
          {[...Array(5)].map((_, i) => (
            <Heart 
              key={i} 
              className="w-3 h-3 text-primary/30 fill-primary/30" 
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
