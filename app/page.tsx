import { Metadata } from 'next'
import Hero from '../components/home/Hero'
import FeaturedTools from '../components/home/FeaturedTools'
import Categories from '../components/home/Categories'
import LatestNews from '../components/home/LatestNews'
import Newsletter from '../components/common/Newsletter'
import AdBanner from '../components/ads/AdBanner'

export const metadata: Metadata = {
  title: 'AI Tools Directory - Discover the Best AI Tools',
  description: 'Find and compare the best AI tools for your needs. Comprehensive directory of AI image generators, text generators, video editors, and more.',
}

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Top Leaderboard Ad */}
      <div className="container mx-auto px-4 py-4">
        <AdBanner 
          slot="top-leaderboard" 
          format="leaderboard" 
          className="mb-8"
        />
      </div>

      <Hero />
      
      {/* First Rectangle Ad */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner 
          slot="middle-rectangle-1" 
          format="rectangle" 
          className="mb-8"
        />
      </div>

      <FeaturedTools />
      
      {/* Second Rectangle Ad */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner 
          slot="middle-rectangle-2" 
          format="rectangle" 
          className="mb-8"
        />
      </div>

      <Categories />
      
      {/* Third Rectangle Ad */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner 
          slot="middle-rectangle-3" 
          format="rectangle" 
          className="mb-8"
        />
      </div>

      <LatestNews />
      
      {/* Bottom Leaderboard Ad */}
      <div className="container mx-auto px-4 py-8">
        <AdBanner 
          slot="bottom-leaderboard" 
          format="leaderboard" 
          className="mb-8"
        />
      </div>

      <Newsletter />
    </main>
  )
} 