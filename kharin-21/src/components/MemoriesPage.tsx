import { useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Heart, ChevronLeft, ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Memory {
  id: number
  image: string
  caption: string
  date: string
}

const memories: Memory[] = [
  {
    id: 1,
    image: '/photos/photo-1.jpg',
    caption: 'Moment pertama kita bertemu...',
    date: 'Kenangan Pertama',
  },
  {
    id: 2,
    image: '/photos/photo-2.jpg',
    caption: 'Tawa yang selalu membuatku bahagia',
    date: 'Kenangan Kedua',
  },
  {
    id: 3,
    image: '/photos/photo-3.jpg',
    caption: 'Petualangan kecil kita berdua',
    date: 'Kenangan Ketiga',
  },
  {
    id: 4,
    image: '/photos/photo-4.jpg',
    caption: 'Setiap detik bersamamu adalah hadiah',
    date: 'Kenangan Keempat',
  },
  {
    id: 5,
    image: '/photos/photo-5.jpg',
    caption: 'Cinta yang tumbuh setiap hari',
    date: 'Kenangan Kelima',
  },
  {
    id: 6,
    image: '/photos/photo-6.jpg',
    caption: 'Kamu adalah rumahku',
    date: 'Kenangan Keenam',
  },
]

export default function MemoriesPage() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: 'center' })
  const [selectedIndex, setSelectedIndex] = useState(0)

  const scrollPrev = () => {
    emblaApi?.scrollPrev()
    setSelectedIndex((prev) => (prev === 0 ? memories.length - 1 : prev - 1))
  }

  const scrollNext = () => {
    emblaApi?.scrollNext()
    setSelectedIndex((prev) => (prev === memories.length - 1 ? 0 : prev + 1))
  }

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in-up">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Heart className="w-5 h-5 text-primary fill-primary" />
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Galeri</span>
          <Heart className="w-5 h-5 text-primary fill-primary" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
          Kenangan Kita
        </h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Setiap foto menyimpan cerita indah tentang kita berdua
        </p>
      </div>

      {/* Carousel */}
      <div className="relative max-w-lg mx-auto mb-8">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {memories.map((memory, index) => (
              <div
                key={memory.id}
                className="flex-[0_0_85%] min-w-0 px-2"
              >
                <div
                  className={cn(
                    'relative bg-card rounded-2xl p-3 shadow-lg transition-all duration-500 transform',
                    index === selectedIndex ? 'scale-100 opacity-100' : 'scale-95 opacity-70'
                  )}
                  style={{
                    transform: `rotate(${index % 2 === 0 ? -2 : 2}deg)`,
                  }}
                >
                  {/* Polaroid style photo */}
                  <div className="relative aspect-[4/5] bg-muted rounded-lg overflow-hidden mb-4">
                    <img
                      src={memory.image}
                      alt={memory.caption}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement
                        target.style.display = 'none'
                        target.parentElement!.classList.add('flex', 'items-center', 'justify-center')
                        const placeholder = document.createElement('div')
                        placeholder.className = 'text-center p-4'
                        placeholder.innerHTML = `
                          <div class="w-16 h-16 mx-auto mb-3 rounded-full bg-secondary flex items-center justify-center">
                            <svg class="w-8 h-8 text-primary" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                            </svg>
                          </div>
                          <p class="text-sm text-muted-foreground">Tambahkan foto di<br/>/public/photos/photo-${memory.id}.jpg</p>
                        `
                        target.parentElement!.appendChild(placeholder)
                      }}
                    />
                  </div>

                  {/* Caption */}
                  <div className="text-center px-2 pb-2">
                    <p className="text-xs text-primary font-medium mb-1">{memory.date}</p>
                    <p className="text-foreground font-medium text-sm leading-relaxed">
                      {memory.caption}
                    </p>
                  </div>

                  {/* Decorative tape */}
                  <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-4 bg-accent/60 rounded-sm transform -rotate-2" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Navigation buttons */}
        <button
          onClick={scrollPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 w-10 h-10 bg-card rounded-full shadow-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors z-10"
          aria-label="Foto sebelumnya"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 w-10 h-10 bg-card rounded-full shadow-lg flex items-center justify-center text-foreground hover:bg-secondary transition-colors z-10"
          aria-label="Foto selanjutnya"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mb-8">
        {memories.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              emblaApi?.scrollTo(index)
              setSelectedIndex(index)
            }}
            className={cn(
              'w-2 h-2 rounded-full transition-all duration-300',
              index === selectedIndex ? 'w-6 bg-primary' : 'bg-border hover:bg-primary/50'
            )}
            aria-label={`Ke foto ${index + 1}`}
          />
        ))}
      </div>

      {/* Love note */}
      <div className="max-w-sm mx-auto text-center animate-fade-in" style={{ animationDelay: '0.5s' }}>
        <div className="bg-card rounded-2xl p-6 shadow-md border border-border">
          <Heart className="w-8 h-8 text-primary fill-primary mx-auto mb-3 animate-bounce-slow" />
          <p className="text-foreground/90 italic leading-relaxed">
            &quot;Setiap kenangan bersamamu adalah harta yang tak ternilai. Terima kasih telah menjadi bagian terindah dalam hidupku.&quot;
          </p>
          <p className="text-primary font-medium mt-3">— Dengan Cinta 💕</p>
        </div>
      </div>
    </div>
  )
}
