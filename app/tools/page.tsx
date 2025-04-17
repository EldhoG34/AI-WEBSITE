import { Suspense } from 'react'
import dynamic from 'next/dynamic'

const ToolList = dynamic(() => import('@/components/tools/ToolList'))
const Filters = dynamic(() => import('@/components/tools/Filters')) 
const AdBanner = dynamic(() => import('@/components/ads/AdBanner'))

export default function ToolsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <Suspense fallback={<div>Loading filters...</div>}>
            <Filters />
          </Suspense>
          
          <div className="mt-8">
            <Suspense fallback={<div>Loading tools...</div>}>
              <ToolList />
            </Suspense>
          </div>
        </div>

        {/* Sidebar with Ads */}
        <div className="lg:w-80 space-y-8">
          <AdBanner 
            slot="sidebar-top" 
            format="sidebar" 
            className="sticky top-4"
          />
          
          <AdBanner 
            slot="sidebar-middle" 
            format="sidebar" 
            className="sticky top-[calc(4rem+300px)]"
          />
          
          <AdBanner 
            slot="sidebar-bottom" 
            format="sidebar" 
            className="sticky top-[calc(4rem+600px)]"
          />
        </div>
      </div>
    </div>
  )
} 