import Link from 'next/link'
import { Calendar } from 'lucide-react'
import PlaceholderImage from '../common/PlaceholderImage'

interface NewsItem {
  id: string
  title: string
  excerpt: string
  date: string
  slug: string
}

const latestNews: NewsItem[] = [
  {
    id: '1',
    title: 'OpenAI Releases GPT-4 Turbo',
    excerpt: 'The latest version of GPT-4 brings significant improvements in speed and capabilities.',
    date: '2024-03-15',
    slug: 'openai-releases-gpt4-turbo'
  },
  {
    id: '2',
    title: 'New AI Image Generation Breakthrough',
    excerpt: 'Researchers achieve photorealistic image generation with unprecedented detail.',
    date: '2024-03-10',
    slug: 'ai-image-generation-breakthrough'
  },
  {
    id: '3',
    title: 'AI in Healthcare: Latest Developments',
    excerpt: 'How AI is transforming medical diagnosis and treatment planning.',
    date: '2024-03-05',
    slug: 'ai-healthcare-developments'
  }
]

export default function LatestNews() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Latest AI News</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {latestNews.map((news) => (
            <Link
              key={news.id}
              href={`/news/${news.slug}`}
              className="group block bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="h-48">
                <PlaceholderImage 
                  width={192}
                  height={192}
                  className="w-full"
                  alt={news.title}
                />
              </div>
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-2">
                  <Calendar size={16} className="mr-2" />
                  {new Date(news.date).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {news.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {news.excerpt}
                </p>
              </div>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link 
            href="/news"
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
          >
            View All News
          </Link>
        </div>
      </div>
    </section>
  )
} 