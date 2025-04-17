import Link from 'next/link'
import { Star } from 'lucide-react'
import PlaceholderImage from '../common/PlaceholderImage'

interface Tool {
  id: string
  name: string
  description: string
  category: string
  rating: number
  slug: string
}

const featuredTools: Tool[] = [
  {
    id: '1',
    name: 'ChatGPT',
    description: 'Advanced AI language model for conversation and content generation',
    category: 'Text Generation',
    rating: 4.8,
    slug: 'chatgpt'
  },
  {
    id: '2',
    name: 'Midjourney',
    description: 'AI-powered image generation from text descriptions',
    category: 'Image Generation',
    rating: 4.7,
    slug: 'midjourney'
  },
  {
    id: '3',
    name: 'DALL-E',
    description: 'Create and edit images with AI',
    category: 'Image Generation',
    rating: 4.6,
    slug: 'dalle'
  }
]

export default function FeaturedTools() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Featured AI Tools</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredTools.map((tool) => (
            <Link 
              key={tool.id}
              href={`/tools/${tool.slug}`}
              className="group block p-6 bg-gray-50 dark:bg-gray-800 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="relative w-12 h-12 mr-4">
                  <PlaceholderImage 
                    width={48} 
                    height={48} 
                    className="rounded-lg"
                    alt={`${tool.name} logo`}
                  />
                </div>
                <div>
                  <h3 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                    {tool.name}
                  </h3>
                  <div className="flex items-center text-yellow-500">
                    <Star size={16} className="fill-current" />
                    <span className="ml-1 text-sm">{tool.rating}</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {tool.description}
              </p>
              <span className="inline-block px-3 py-1 text-sm bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300 rounded-full">
                {tool.category}
              </span>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/tools"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            View All Tools
          </Link>
        </div>
      </div>
    </section>
  )
} 