'use client'

import { useEffect, useState } from 'react'
import { createClient } from '@/lib/supabase/client'
import { LogOut, Heart, Film, Activity, User } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function Sidebar({ userId }: { userId: string }) {
  const supabase = createClient()
  const router = useRouter()
  
  const [stats, setStats] = useState({
    totalSwipes: 0,
    likedCount: 0,
    topGenre: 'Undecided',
    likedMovies: [] as any[]
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchStats() {
      // 1. Get all swipes for this user and join with movie details
      const { data: history } = await supabase
        .from('swipes')
        .select('is_like, movies(title, genres, poster_path)')
        .eq('user_id', userId)

      if (!history || history.length === 0) {
        setLoading(false)
        return
      }

      // 2. Calculate Stats
      const totalSwipes = history.length
      const likedSwipes = history.filter(h => h.is_like)
      const likedMovies = likedSwipes.map(h => h.movies)

      // 3. Calculate Top Genre
      const genreCounts: Record<string, number> = {}
      likedMovies.forEach((movie: any) => {
        // Parse the genre string/array depending on how it's stored
        let genres = movie.genres
        if (typeof genres === 'string') {
            try { genres = JSON.parse(genres) } catch(e) { genres = [] } // Handle messy data
        }
        
        if (Array.isArray(genres)) {
            genres.forEach((g: string) => {
                genreCounts[g] = (genreCounts[g] || 0) + 1
            })
        }
      })

      const topGenre = Object.keys(genreCounts).reduce((a, b) => 
        genreCounts[a] > genreCounts[b] ? a : b, 'Undecided'
      )

      setStats({
        totalSwipes,
        likedCount: likedSwipes.length,
        topGenre,
        likedMovies
      })
      setLoading(false)
    }

    fetchStats()
  }, [userId, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh() // Refresh to show Landing Page again
  }

  return (
    <aside className="w-full md:w-80 flex-shrink-0 border-r border-white/10 bg-[#111] p-6 flex flex-col h-screen overflow-hidden">
        {/* User Header */}
        <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                <User className="text-white h-6 w-6" />
            </div>
            <div>
                <h2 className="font-bold text-white">My Profile</h2>
                <p className="text-xs text-gray-400">Movie Enthusiast</p>
            </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-800/50 p-4 rounded-xl border border-white/5">
                <p className="text-xs text-gray-400 mb-1 flex items-center gap-2">
                    <Activity className="h-3 w-3" /> Total Swipes
                </p>
                <p className="text-2xl font-bold text-white">{stats.totalSwipes}</p>
            </div>
            <div className="bg-gray-800/50 p-4 rounded-xl border border-white/5">
                <p className="text-xs text-gray-400 mb-1 flex items-center gap-2">
                    <Film className="h-3 w-3" /> Top Genre
                </p>
                <p className="text-xl font-bold text-purple-400 truncate">{stats.topGenre}</p>
            </div>
        </div>

        {/* Liked Movies List */}
        <div className="flex-1 overflow-hidden flex flex-col">
            <h3 className="text-sm font-semibold text-gray-400 mb-4 flex items-center gap-2">
                <Heart className="h-4 w-4 text-pink-500" /> Liked Movies ({stats.likedCount})
            </h3>
            
            <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-gray-700">
                {stats.likedMovies.length === 0 ? (
                    <p className="text-sm text-gray-500 text-center py-4">No likes yet. Start swiping!</p>
                ) : (
                    stats.likedMovies.map((movie: any, i) => (
                        <div key={i} className="flex items-center gap-3 p-2 rounded-lg hover:bg-white/5 transition-colors">
                            {movie.poster_path && (
                                <img 
                                    src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`} 
                                    alt={movie.title}
                                    className="h-12 w-8 rounded object-cover" 
                                />
                            )}
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-white truncate">{movie.title}</p>
                                <div className="flex gap-1 flex-wrap">
                                    {/* Just show first genre tag to save space */}
                                    {Array.isArray(movie.genres) && movie.genres[0] && (
                                        <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-gray-300">
                                            {movie.genres[0]}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-6 border-t border-white/10">
            <button 
                onClick={handleSignOut}
                className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors w-full"
            >
                <LogOut className="h-4 w-4" /> Sign Out
            </button>
        </div>
    </aside>
  )
}