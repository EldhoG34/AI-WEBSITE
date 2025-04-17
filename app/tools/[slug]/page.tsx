import { Suspense } from 'react'
import ToolDetail from '@/components/tools/ToolDetail'
import RelatedTools from '@/components/tools/RelatedTools'
import AdBanner from '@/components/ads/AdBanner'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://btwztefmvyjklonbzvqk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0d3p0ZWZtdnlqa2xvbmJ6dnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzYxODIsImV4cCI6MjA2MDQxMjE4Mn0.spWkSWm1CtawqHN3D1tH1kRjGG2mAWh_y0KJJugxwak'
)


export default async function ToolPage({ params }: { params: { slug: string } }) {
  const { data: tool, error } = await supabase
    .from('tools')
    .select('*')
    .eq('slug', params.slug)
    .single()

  if (error || !tool) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Tool not found
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            The tool you're looking for doesn't exist or has been removed.
          </p>
        </div>
      </div>
    )
  }

  // Fetch related tools from the same category
  const { data: relatedTools } = await supabase
    .from('tools')
    .select('*')
    .eq('category', tool.category)
    .neq('id', tool.id)
    .limit(3)

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
            <ToolDetail tool={tool} />
          </Suspense>
          
          <AdBanner 
            slot="tool-detail-middle" 
            format="rectangle" 
            className="my-8"
          />
          
          <Suspense fallback={<div>Loading related tools...</div>}>
            <RelatedTools tools={relatedTools || []} currentToolId={tool.id} />
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