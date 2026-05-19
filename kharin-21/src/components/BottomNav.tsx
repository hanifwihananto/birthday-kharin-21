import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Tab {
  id: string
  label: string
  icon: LucideIcon
}

interface BottomNavProps {
  tabs: Tab[]
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function BottomNav({ tabs, activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] max-w-md">
      <div className="bg-card/90 backdrop-blur-lg rounded-full shadow-xl border border-border px-2 py-2">
        <ul className="flex items-center justify-around">
          {tabs.map((tab) => {
            const Icon = tab.icon
            const isActive = activeTab === tab.id
            
            return (
              <li key={tab.id}>
                <button
                  onClick={() => onTabChange(tab.id)}
                  className={cn(
                    'flex flex-col items-center gap-1 px-4 py-2 rounded-full transition-all duration-300',
                    isActive 
                      ? 'bg-primary text-primary-foreground scale-105' 
                      : 'text-muted-foreground hover:text-foreground hover:bg-secondary'
                  )}
                  aria-label={tab.label}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{tab.label}</span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </nav>
  )
}
