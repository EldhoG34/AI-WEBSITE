import { Suspense } from 'react'
import AdBanner from '@/components/common/AdBanner'
import NewsList from '@/components/news/NewsList'
import Filters from '@/components/news/Filters'

export const metadata = {
  title: 'AI News & Updates | AI Tools Directory',
  description: 'Stay updated with the latest news, trends, and developments in the AI industry.',
}

export default function NewsPage() {
  return (
    <div className="container mx-auto px-4 py-8 text-gray-900 dark:text-white">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-6 text-gray-900 dark:text-white">
            AI News & Updates
          </h1>
          <p className="text-lg text-gray-800 dark:text-gray-200 mb-8">
            Stay informed about the latest developments, trends, and breakthroughs in artificial intelligence.
          </p>
          
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 mb-8">
            <Suspense fallback={<div className="text-gray-900 dark:text-white">Loading filters...</div>}>
              <Filters />
            </Suspense>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-lg p-6">
            <Suspense fallback={<div className="text-gray-900 dark:text-white">Loading news...</div>}>
              <NewsList />
            </Suspense>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:w-80 space-y-6">
          <AdBanner slot="sidebar-top" className="sticky top-4" />
          <AdBanner slot="sidebar-middle" className="sticky top-[300px]" />
          <AdBanner slot="sidebar-bottom" className="sticky top-[600px]" />
        </div>
      </div>
    </div>
  )
} 