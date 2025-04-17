import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  'https://btwztefmvyjklonbzvqk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0d3p0ZWZtdnlqa2xvbmJ6dnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzYxODIsImV4cCI6MjA2MDQxMjE4Mn0.spWkSWm1CtawqHN3D1tH1kRjGG2mAWh_y0KJJugxwak'
)


export async function POST(request: Request) {
  try {
    const body = await request.json()
    const {
      name,
      description,
      website_url,
      category,
      pricing_type,
      features,
      submitted_by,
    } = body

    // Validate required fields
    if (!name || !description || !website_url || !category || !pricing_type) {
      return NextResponse.json(
        {
          data: null,
          error: 'Missing required fields',
          message: 'Please provide all required fields',
        },
        { status: 400 }
      )
    }

    // Validate website URL
    try {
      new URL(website_url)
    } catch {
      return NextResponse.json(
        {
          data: null,
          error: 'Invalid website URL',
          message: 'Please provide a valid website URL',
        },
        { status: 400 }
      )
    }

    // Create slug from name
    const slug = name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')

    const { data, error } = await supabase
      .from('tool_submissions')
      .insert([
        {
          name,
          slug,
          description,
          website_url,
          category,
          pricing_type,
          features: features || [],
          submitted_by,
          status: 'pending',
        },
      ])
      .select()

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      error: null,
      message: 'Tool submitted successfully. Our team will review it soon.',
    })
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to submit tool',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const submitted_by = searchParams.get('submitted_by')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('tool_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (status) {
      query = query.eq('status', status)
    }

    if (submitted_by) {
      query = query.eq('submitted_by', submitted_by)
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      error: null,
      message: 'Submissions retrieved successfully',
    })
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to retrieve submissions',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
} 