import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://btwztefmvyjklonbzvqk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0d3p0ZWZtdnlqa2xvbmJ6dnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzYxODIsImV4cCI6MjA2MDQxMjE4Mn0.spWkSWm1CtawqHN3D1tH1kRjGG2mAWh_y0KJJugxwak'
)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const timeframe = searchParams.get('timeframe')
    const limit = searchParams.get('limit') || '10'
    const offset = searchParams.get('offset') || '0'

    let query = supabase
      .from('news')
      .select('*')
      .order('published_at', { ascending: false })
      .limit(parseInt(limit))
      .range(parseInt(offset), parseInt(offset) + parseInt(limit) - 1)

    if (category && category !== 'All') {
      query = query.eq('category', category)
    }

    if (timeframe) {
      const now = new Date()
      let startDate = new Date()

      switch (timeframe) {
        case 'This Week':
          startDate.setDate(now.getDate() - 7)
          break
        case 'This Month':
          startDate.setMonth(now.getMonth() - 1)
          break
        case 'Last 3 Months':
          startDate.setMonth(now.getMonth() - 3)
          break
        default:
          // Latest - no date filter needed
          break
      }

      if (timeframe !== 'Latest') {
        query = query.gte('published_at', startDate.toISOString())
      }
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    return NextResponse.json(data)
  } catch (error) {
    console.error('Error fetching news:', error)
    return NextResponse.json(
      { error: 'Failed to fetch news' },
      { status: 500 }
    )
  }
} 