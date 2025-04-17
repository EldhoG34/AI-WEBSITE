import { Suspense } from 'react'
import ToolDetail from '@/components/tools/ToolDetail'
import RelatedTools from '@/components/tools/RelatedTools'
import AdBanner from '@/components/ads/AdBanner'

export default function ToolPage({ params }: { params: { slug: string } }) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Main Content */}
        <div className="flex-1">
          <AdBanner 
            slot="tool-detail-top" 
            format="leaderboard" 
            className="mb-8"
          />
          
          <Suspense fallback={<div>Loading tool details...</div>}>
            <ToolDetail slug={params.slug} />
          </Suspense>
          
          <AdBanner 
            slot="tool-detail-middle" 
            format="rectangle" 
            className="my-8"
          />
          
          <Suspense fallback={<div>Loading related tools...</div>}>
            <RelatedTools slug={params.slug} />
          </Suspense>
          
          <AdBanner 
            slot="tool-detail-bottom" 
            format="leaderboard" 
            className="mt-8"
          />
        </div>

        {/* Sidebar with Ads */}
        <div className="lg:w-80 space-y-8">
          <AdBanner 
            slot="tool-sidebar-top" 
            format="sidebar" 
            className="sticky top-4"
          />
          
          <AdBanner 
            slot="tool-sidebar-middle" 
            format="sidebar" 
            className="sticky top-[calc(4rem+300px)]"
          />
          
          <AdBanner 
            slot="tool-sidebar-bottom" 
            format="sidebar" 
            className="sticky top-[calc(4rem+600px)]"
          />
        </div>
      </div>
    </div>
  )
} 