'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Tool } from '@/types'

interface RelatedToolsProps {
  tools: Tool[]
  currentToolId: string
}

export default function RelatedTools({ tools, currentToolId }: RelatedToolsProps) {
  // Filter out the current tool and limit to 3 related tools
  const relatedTools = tools
    .filter(tool => tool.id !== currentToolId)
    .slice(0, 3)

  if (relatedTools.length === 0) {
    return null
  }

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Related Tools
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {relatedTools.map((tool) => (
          <Link
            key={tool.id}
            href={`/tools/${tool.slug}`}
            className="block group"
          >
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden transition-transform group-hover:scale-[1.02]">
              <div className="relative h-48 w-full">
                <Image
                  src={tool.image_url || '/images/placeholder-tool.jpg'}
                  alt={tool.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {tool.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-2">
                  {tool.description}
                </p>
                <div className="mt-3 flex items-center gap-2">
                  <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded-full text-xs">
                    {tool.category}
                  </span>
                  <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-2 py-1 rounded-full text-xs">
                    {tool.pricing_type}
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
} 