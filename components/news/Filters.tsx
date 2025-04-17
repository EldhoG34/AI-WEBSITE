'use client'

import { useState } from 'react'

const categories = [
  'All',
  'AI Development',
  'Research',
  'Industry News',
  'Startups',
  'Ethics & Policy',
  'Applications'
]

const timeframes = [
  'Latest',
  'This Week',
  'This Month',
  'Last 3 Months'
]

export default function Filters() {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [selectedTimeframe, setSelectedTimeframe] = useState('Latest')

  return (
    <div className="flex flex-col md:flex-row gap-4">
      <div className="flex-1">
        <label className="block text-base font-semibold text-gray-900 dark:text-white mb-2">
          Category
        </label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        >
          {categories.map((category) => (
            <option 
              key={category} 
              value={category}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {category}
            </option>
          ))}
        </select>
      </div>
      
      <div className="flex-1">
        <label className="block text-base font-semibold text-gray-900 dark:text-white mb-2">
          Timeframe
        </label>
        <select
          value={selectedTimeframe}
          onChange={(e) => setSelectedTimeframe(e.target.value)}
          className="w-full px-3 py-2 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
        >
          {timeframes.map((timeframe) => (
            <option 
              key={timeframe} 
              value={timeframe}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              {timeframe}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
} 