import Link from 'next/link'
import { Search } from 'lucide-react'

export default function Hero() {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
            Discover the Best AI Tools
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
            Find and compare the most powerful AI tools for your needs. From image generation to text analysis, we've got you covered.
          </p>
          
          <div className="relative max-w-2xl mx-auto">
            <input
              type="text"
              placeholder="Search for AI tools..."
              className="w-full px-6 py-4 rounded-full border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 text-gray-900 dark:text-white"
            />
            <button className="absolute right-2 top-2 p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors">
              <Search size={20} />
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link 
              href="/tools"
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Browse All Tools
            </Link>
            <Link 
              href="/submit"
              className="px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Submit Your Tool
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
} 