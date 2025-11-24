import Link from 'next/link';
import { Film, Heart, X, Zap, Github, ArrowRight } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#111] text-white selection:bg-purple-500 selection:text-white">
      {/* --- NAVIGATION --- */}
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#111]/80 backdrop-blur-md">
        <div className="container mx-auto flex h-16 items-center justify-between px-6">
          <div className="flex items-center gap-2">
            <Film className="h-6 w-6 text-purple-500" />
            <span className="text-xl font-bold tracking-tight">MovieTinder</span>
          </div>
          <div className="flex items-center gap-4">
            <Link 
              href="/login" 
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link 
              href="/login" 
              className="rounded-full bg-white px-5 py-2 text-sm font-bold text-black transition-transform hover:scale-105"
            >
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* --- HERO SECTION --- */}
      <section className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20 text-center">
        {/* Background Glow Effects */}
        <div className="absolute top-1/4 -left-20 h-96 w-96 rounded-full bg-purple-600/30 blur-[120px]" />
        <div className="absolute bottom-1/4 -right-20 h-96 w-96 rounded-full bg-pink-600/20 blur-[120px]" />

        {/* Badge */}
        <div className="mb-6 inline-flex items-center rounded-full border border-purple-500/30 bg-purple-500/10 px-3 py-1 text-sm text-purple-300">
          <Zap className="mr-2 h-3 w-3" />
          <span>Powered by AI & TMDB</span>
        </div>

        {/* Main Typography */}
        <h1 className="mb-6 max-w-4xl text-5xl font-extrabold tracking-tight md:text-7xl">
          Stop Scrolling. <br />
          <span className="bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">
            Start Watching.
          </span>
        </h1>
        
        <p className="mb-10 max-w-xl text-lg text-gray-400">
          Tired of arguing about what to watch? Swipe through movies, build your taste profile, and let our AI find your perfect match tonight.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col gap-4 sm:flex-row">
          <Link 
            href="/login" 
            className="group flex items-center justify-center rounded-full bg-gradient-to-r from-purple-600 to-pink-600 px-8 py-4 text-lg font-bold text-white transition-all hover:shadow-[0_0_40px_-10px_rgba(168,85,247,0.5)]"
          >
            Find My Movie
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Link>
          <a 
            href="https://github.com/your-username/movie-tinder" 
            target="_blank"
            className="flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-8 py-4 text-lg font-medium text-white backdrop-blur-sm transition-colors hover:bg-white/10"
          >
            <Github className="mr-2 h-5 w-5" />
            View on GitHub
          </a>
        </div>

        {/* --- MOCKUP VISUAL (CSS Only) --- */}
        <div className="relative mt-20 flex w-full max-w-sm flex-col items-center">
          {/* Card 3 (Back) */}
          <div className="absolute top-0 h-80 w-64 rotate-6 rounded-2xl bg-gray-800 opacity-40 shadow-xl" />
          {/* Card 2 (Middle) */}
          <div className="absolute top-4 h-80 w-64 -rotate-3 rounded-2xl bg-gray-700 opacity-70 shadow-xl" />
          {/* Card 1 (Front) */}
          <div className="relative h-96 w-72 rotate-0 overflow-hidden rounded-2xl bg-gray-900 shadow-2xl border border-white/10">
            {/* Fake Movie Poster */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/90" />
            <img 
              src="https://image.tmdb.org/t/p/w500/q6y0Go1tsGEsmtFryDOJo3dEmqu.jpg" 
              alt="Movie Poster" 
              className="h-full w-full object-cover opacity-80"
            />
            
            {/* Overlay UI */}
            <div className="absolute bottom-0 w-full p-6 text-left">
              <h3 className="text-2xl font-bold text-white">The Shawshank Redemption</h3>
              <p className="text-sm text-gray-300">Drama • 1994</p>
              
              {/* Fake Actions */}
              <div className="mt-4 flex justify-center gap-6">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-red-500/50 bg-red-500/10 text-red-500">
                  <X className="h-6 w-6" />
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-green-500/50 bg-green-500/10 text-green-500">
                  <Heart className="h-6 w-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- FEATURES GRID --- */}
      <section className="container mx-auto px-6 py-24">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Feature 1 */}
          <div className="rounded-2xl border border-white/5 bg-white/5 p-8 transition-colors hover:border-purple-500/30">
            <div className="mb-4 inline-block rounded-lg bg-purple-500/10 p-3 text-purple-400">
              <Zap className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Instant Matches</h3>
            <p className="text-gray-400">
              Stop wasting 45 minutes scrolling Netflix. Get recommendations in seconds based on your mood.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-2xl border border-white/5 bg-white/5 p-8 transition-colors hover:border-pink-500/30">
            <div className="mb-4 inline-block rounded-lg bg-pink-500/10 p-3 text-pink-400">
              <Heart className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Learn Your Taste</h3>
            <p className="text-gray-400">
              Our Vector Database algorithm learns from every swipe. The more you use it, the better it gets.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-2xl border border-white/5 bg-white/5 p-8 transition-colors hover:border-blue-500/30">
            <div className="mb-4 inline-block rounded-lg bg-blue-500/10 p-3 text-blue-400">
              <Film className="h-6 w-6" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Curated Library</h3>
            <p className="text-gray-400">
              Access thousands of top-rated movies from the TMDB database, filtered for quality.
            </p>
          </div>
        </div>
      </section>

      {/* --- FOOTER --- */}
      <footer className="border-t border-white/10 bg-[#111] py-12 text-center text-gray-500">
        <p className="mb-4 text-sm">
          Built with Next.js, Supabase, and Tailwind CSS.
        </p>
        <div className="flex items-center justify-center gap-2 opacity-70 grayscale transition-all hover:opacity-100 hover:grayscale-0">
          <img 
            src="https://www.themoviedb.org/assets/2/v4/logos/v2/blue_short-8e7b30f73a4020692ccca9c88bafe5dcb6f8a62a4c6bc55cd9ba82bb2cd95f6c.svg" 
            alt="TMDB Logo" 
            className="h-4"
          />
          <span className="text-xs">
            This product uses the TMDB API but is not endorsed or certified by TMDB.
          </span>
        </div>
      </footer>
    </div>
  );
}