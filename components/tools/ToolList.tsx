'use client'

import { useState, useEffect } from 'react'
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

export default function ToolList() {
  const [tools, setTools] = useState<Tool[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchTools = async () => {
      try {
        const response = await fetch('/api/tools')
        const data = await response.json()
        
        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch tools')
        }
        
        setTools(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch tools')
      } finally {
        setLoading(false)
      }
    }

    fetchTools()
  }, [])

  if (loading) {
    return <div>Loading tools...</div>
  }

  if (error) {
    return <div className="text-red-600">{error}</div>
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {tools.map((tool) => (
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
  )
} 