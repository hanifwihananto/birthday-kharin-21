import { useState } from 'react'
import { Gift, MapPin, Mail, Package, PartyPopper, Check, Heart, Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

interface QuestStep {
  id: number
  title: string
  description: string
  hint: string
  icon: typeof Gift
  completed: boolean
}

const initialSteps: QuestStep[] = [
  {
    id: 1,
    title: 'Langkah Pertama',
    description: 'Cari kotak kecil di bawah bantal',
    hint: 'Ada sesuatu yang tersembunyi di tempat kamu bermimpi 🛏️',
    icon: MapPin,
    completed: false,
  },
  {
    id: 2,
    title: 'Langkah Kedua',
    description: 'Baca surat warna biru terlebih dahulu',
    hint: 'Surat itu berisi petunjuk penting untuk langkah selanjutnya 💌',
    icon: Mail,
    completed: false,
  },
  {
    id: 3,
    title: 'Langkah Ketiga',
    description: 'Temukan kotak besar di lemari',
    hint: 'Lihat di bagian paling pojok, tersembunyi dengan rapi 🎁',
    icon: Package,
    completed: false,
  },
  {
    id: 4,
    title: 'Langkah Terakhir',
    description: 'Buka kotak besarnya!',
    hint: 'Saatnya melihat kejutan yang sudah menunggumu! 🎉',
    icon: PartyPopper,
    completed: false,
  },
]

export default function GiftQuestPage() {
  const [steps, setSteps] = useState(initialSteps)

  const toggleStep = (id: number) => {
    setSteps((prev) =>
      prev.map((step) =>
        step.id === id ? { ...step, completed: !step.completed } : step
      )
    )
  }

  const completedCount = steps.filter((s) => s.completed).length
  const allCompleted = completedCount === steps.length
  const progress = (completedCount / steps.length) * 100

  return (
    <div className="min-h-screen py-8 px-4">
      {/* Header */}
      <div className="text-center mb-8 animate-fade-in-up">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Gift className="w-5 h-5 text-primary" />
          <span className="text-sm uppercase tracking-widest text-muted-foreground">Misi Spesial</span>
          <Gift className="w-5 h-5 text-primary" />
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground mb-2">
          The Gift Quest
        </h2>
        <p className="text-muted-foreground max-w-sm mx-auto">
          Ikuti petunjuk ini untuk menemukan hadiah istimewamu!
        </p>
      </div>

      {/* Progress bar */}
      <div className="max-w-md mx-auto mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Progress Misi</span>
          <span className="text-sm font-medium text-primary">{completedCount}/{steps.length}</span>
        </div>
        <div className="h-3 bg-secondary rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-primary to-accent rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Timeline */}
      <div className="max-w-md mx-auto relative">
        {/* Vertical line */}
        <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border" />

        {steps.map((step, index) => {
          const Icon = step.icon
          const isCompleted = step.completed
          
          return (
            <div
              key={step.id}
              className="relative pl-16 pb-8 last:pb-0 animate-fade-in-up"
              style={{ animationDelay: `${0.1 * (index + 1)}s` }}
            >
              {/* Timeline dot */}
              <div
                className={cn(
                  'absolute left-3 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300',
                  isCompleted
                    ? 'bg-primary text-primary-foreground scale-110'
                    : 'bg-card border-2 border-border text-muted-foreground'
                )}
              >
                {isCompleted ? (
                  <Check className="w-4 h-4" />
                ) : (
                  <span className="text-xs font-bold">{step.id}</span>
                )}
              </div>

              {/* Card */}
              <div
                className={cn(
                  'bg-card rounded-2xl p-5 shadow-md border transition-all duration-300 cursor-pointer group',
                  isCompleted
                    ? 'border-primary/30 bg-primary/5'
                    : 'border-border hover:border-primary/50 hover:shadow-lg'
                )}
                onClick={() => toggleStep(step.id)}
              >
                <div className="flex items-start gap-4">
                  <div
                    className={cn(
                      'w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 transition-colors',
                      isCompleted ? 'bg-primary/20 text-primary' : 'bg-secondary text-muted-foreground group-hover:text-primary'
                    )}
                  >
                    <Icon className="w-6 h-6" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className={cn(
                      'font-semibold mb-1 transition-colors',
                      isCompleted ? 'text-primary' : 'text-foreground'
                    )}>
                      {step.title}
                    </h3>
                    <p className={cn(
                      'text-sm mb-2',
                      isCompleted ? 'text-primary/70 line-through' : 'text-foreground'
                    )}>
                      {step.description}
                    </p>
                    <p className="text-xs text-muted-foreground italic">
                      {step.hint}
                    </p>
                  </div>

                  {/* Checkbox */}
                  <button
                    className={cn(
                      'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all',
                      isCompleted
                        ? 'bg-primary border-primary'
                        : 'border-border group-hover:border-primary'
                    )}
                    aria-label={isCompleted ? 'Tandai belum selesai' : 'Tandai selesai'}
                  >
                    {isCompleted && <Check className="w-3 h-3 text-primary-foreground" />}
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Completion message */}
      {allCompleted && (
        <div className="max-w-md mx-auto mt-8 animate-fade-in-up">
          <div className="bg-gradient-to-br from-primary/10 to-accent/10 rounded-2xl p-6 text-center border border-primary/20">
            <div className="flex justify-center gap-2 mb-4">
              <Heart className="w-6 h-6 text-primary fill-primary animate-bounce-slow" />
              <Sparkles className="w-6 h-6 text-accent animate-bounce-slow" style={{ animationDelay: '0.2s' }} />
              <Heart className="w-6 h-6 text-primary fill-primary animate-bounce-slow" style={{ animationDelay: '0.4s' }} />
            </div>
            <h3 className="font-serif text-2xl font-bold text-foreground mb-2">
              Selamat! 🎉
            </h3>
            <p className="text-muted-foreground mb-4">
              Kamu berhasil menyelesaikan semua misi! Sekarang nikmati hadiahmu dan ingatlah betapa spesialnya dirimu bagiku.
            </p>
            <p className="text-primary font-medium">
              Selamat Ulang Tahun, Sayangku! 💕
            </p>
          </div>
        </div>
      )}

      {/* Bottom note */}
      {!allCompleted && (
        <div className="max-w-sm mx-auto mt-10 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <p className="text-sm text-muted-foreground">
            Tap pada setiap langkah untuk menandai selesai ✨
          </p>
        </div>
      )}
    </div>
  )
}
