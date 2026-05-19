import { useState } from 'react'
import { Home, Images, Gift } from 'lucide-react'
import HomePage from './components/HomePage'
import MemoriesPage from './components/MemoriesPage'
import GiftQuestPage from './components/GiftQuestPage'
import BottomNav from './components/BottomNav'

type TabType = 'home' | 'memories' | 'gift'

const tabs = [
  { id: 'home' as const, label: 'Beranda', icon: Home },
  { id: 'memories' as const, label: 'Kenangan', icon: Images },
  { id: 'gift' as const, label: 'Kado', icon: Gift },
]

function App() {
  const [activeTab, setActiveTab] = useState<TabType>('home')

  const handleStartJourney = () => {
    setActiveTab('memories')
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <main className="animate-fade-in">
        {activeTab === 'home' && <HomePage onStartJourney={handleStartJourney} />}
        {activeTab === 'memories' && <MemoriesPage />}
        {activeTab === 'gift' && <GiftQuestPage />}
      </main>

      <BottomNav 
        tabs={tabs} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
      />
    </div>
  )
}

export default App
