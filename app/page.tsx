import { createClient } from '@/lib/supabase/server'
import LandingPage from './components/LandingPage' // We'll move your old code here
import Sidebar from './components/Sidebar'
// import CardStack from './components/CardStack' // We'll build this next!

export default async function Home() {
  const supabase = await createClient()
  
  // Check Authentication Session
  const { data: { session } } = await supabase.auth.getSession()

  // 1. IF NOT LOGGED IN -> Show Landing Page
  if (!session) {
    return <LandingPage />
  }

  // 2. IF LOGGED IN -> Show Dashboard
  return (
    <div className="flex h-screen bg-[#111] text-white overflow-hidden">
      {/* LEFT: The Stats Sidebar */}
      <Sidebar userId={session.user.id} />

      {/* RIGHT: The Main Swipe Area */}
      <main className="flex-1 flex flex-col relative overflow-hidden">
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-white/10 bg-[#111]/50 backdrop-blur-md z-10">
          <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Discover
          </h1>
        </header>

        {/* Content Area */}
        <div className="flex-1 flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-800 via-[#111] to-[#111]">
            <div className="text-center text-gray-500">
                {/* We will replace this text with <CardStack /> later */}
                <p className="text-2xl font-bold text-white mb-2">Ready to Swipe?</p>
                <p>Card Stack Component loading...</p>
            </div>
        </div>
      </main>
    </div>
  )
}