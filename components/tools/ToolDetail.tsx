'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Tool } from '@/types'

interface ToolDetailProps {
  tool: Tool
}

export default function ToolDetail({ tool }: ToolDetailProps) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Tool Image */}
        <div className="md:w-1/3">
          <div className="relative h-64 w-full rounded-lg overflow-hidden">
            <Image
              src={tool.image_url || '/images/placeholder-tool.jpg'}
              alt={tool.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Tool Info */}
        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            {tool.name}
          </h1>
          
          <div className="flex items-center gap-4 mb-4">
            <span className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-3 py-1 rounded-full text-sm font-medium">
              {tool.category}
            </span>
            <span className="bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 px-3 py-1 rounded-full text-sm font-medium">
              {tool.pricing_type}
            </span>
          </div>

          <p className="text-gray-700 dark:text-gray-300 mb-6">
            {tool.description}
          </p>

          <div className="flex flex-wrap gap-4 mb-6">
            {tool.features?.map((feature, index) => (
              <span
                key={index}
                className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
              >
                {feature}
              </span>
            ))}
          </div>

          <div className="flex gap-4">
            <Link
              href={tool.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Visit Website
            </Link>
            {tool.demo_url && (
              <Link
                href={tool.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-white px-6 py-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors"
              >
                Try Demo
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Additional Details */}
      <div className="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
          Additional Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Use Cases
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {tool.use_cases?.map((useCase, index) => (
                <li key={index}>{useCase}</li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Integrations
            </h3>
            <ul className="list-disc list-inside text-gray-700 dark:text-gray-300">
              {tool.integrations?.map((integration, index) => (
                <li key={index}>{integration}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 