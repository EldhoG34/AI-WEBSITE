'use client'

import { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { 
  ImageIcon, 
  MessageSquare, 
  Code2, 
  VideoIcon, 
  Music2, 
  BrainCircuit 
} from 'lucide-react'

const categories = [
  {
    name: 'Image Generation',
    icon: ImageIcon,
    slug: 'image-generation'
  },
  {
    name: 'Text Generation',
    icon: MessageSquare,
    slug: 'text-generation'
  },
  {
    name: 'Code Generation',
    icon: Code2,
    slug: 'code-generation'
  },
  {
    name: 'Video Generation',
    icon: VideoIcon,
    slug: 'video-generation'
  },
  {
    name: 'Audio Generation',
    icon: Music2,
    slug: 'audio-generation'
  },
  {
    name: 'AI Assistants',
    icon: BrainCircuit,
    slug: 'ai-assistants'
  }
]

const pricingTypes = [
  { name: 'Free', value: 'free' },
  { name: 'Freemium', value: 'freemium' },
  { name: 'Paid', value: 'paid' }
]

export default function Filters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '')
  const [selectedPricing, setSelectedPricing] = useState(searchParams.get('pricing') || '')

  const handleCategoryChange = (category: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (category === selectedCategory) {
      params.delete('category')
      setSelectedCategory('')
    } else {
      params.set('category', category)
      setSelectedCategory(category)
    }
    router.push(`/tools?${params.toString()}`)
  }

  const handlePricingChange = (pricing: string) => {
    const params = new URLSearchParams(searchParams.toString())
    if (pricing === selectedPricing) {
      params.delete('pricing')
      setSelectedPricing('')
    } else {
      params.set('pricing', pricing)
      setSelectedPricing(pricing)
    }
    router.push(`/tools?${params.toString()}`)
  }

  return (
    <div className="bg-white dark:bg-gray-900 rounded-xl p-6 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Categories</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
        {categories.map((category) => {
          const Icon = category.icon
          return (
            <button
              key={category.slug}
              onClick={() => handleCategoryChange(category.slug)}
              className={`flex items-center p-3 rounded-lg border transition-colors ${
                selectedCategory === category.slug
                  ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800'
                  : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
              }`}
            >
              <Icon className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
              <span className="text-sm">{category.name}</span>
            </button>
          )
        })}
      </div>

      <h3 className="text-lg font-semibold mb-4">Pricing</h3>
      <div className="flex flex-wrap gap-4">
        {pricingTypes.map((type) => (
          <button
            key={type.value}
            onClick={() => handlePricingChange(type.value)}
            className={`px-4 py-2 rounded-lg border transition-colors ${
              selectedPricing === type.value
                ? 'bg-blue-50 dark:bg-blue-900 border-blue-200 dark:border-blue-800'
                : 'border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800'
            }`}
          >
            {type.name}
          </button>
        ))}
      </div>
    </div>
  )
} 