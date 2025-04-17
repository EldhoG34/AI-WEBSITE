'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { format } from 'date-fns'
import Image from 'next/image'

interface NewsItem {
  id: string
  title: string
  excerpt: string
  image_url: string
  category: string
  published_at: string
  author: string
}

export default function NewsList() {
  const [news, setNews] = useState<NewsItem[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch('/api/news')
        if (!response.ok) {
          throw new Error('Failed to fetch news')
        }
        const data = await response.json()
        setNews(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    fetchNews()
  }, [])

  if (loading) {
    return <div className="text-center py-8 text-gray-900 dark:text-white text-lg">Loading news...</div>
  }

  if (error) {
    return <div className="text-center py-8 text-red-600 dark:text-red-400 text-lg">{error}</div>
  }

  if (news.length === 0) {
    return <div className="text-center py-8 text-gray-900 dark:text-white text-lg">No news articles found.</div>
  }

  return (
    <div className="grid gap-8">
      {news.map((item) => (
        <article key={item.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700">
          <div className="md:flex">
            <div className="md:flex-shrink-0">
              <div className="relative h-48 w-full md:w-48">
                <Image
                  src={item.image_url || '/images/placeholder-news.jpg'}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center text-sm mb-2">
                <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
                  {item.category}
                </span>
                <span className="mx-2 text-gray-600 dark:text-gray-300">•</span>
                <time dateTime={item.published_at} className="text-gray-600 dark:text-gray-300">
                  {format(new Date(item.published_at), 'MMMM d, yyyy')}
                </time>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                <Link href={`/news/${item.id}`} className="hover:text-blue-600 dark:hover:text-blue-400">
                  {item.title}
                </Link>
              </h2>
              <p className="text-gray-700 dark:text-gray-200 mb-4 text-base leading-relaxed">
                {item.excerpt}
              </p>
              <div className="flex items-center">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  By {item.author}
                </span>
              </div>
            </div>
          </div>
        </article>
      ))}
    </div>
  )
} 