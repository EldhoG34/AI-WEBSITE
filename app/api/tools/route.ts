import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase/client'
import { Tool, SearchFilters } from '@/types'

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category')
    const pricing_type = searchParams.get('pricing_type')
    const features = searchParams.get('features')?.split(',')
    const sort_by = searchParams.get('sort_by') || 'rating'
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('tools')
      .select('*, reviews(*)')
      .order(sort_by, { ascending: false })

    if (category) {
      query = query.eq('category', category)
    }

    if (pricing_type) {
      query = query.eq('pricing_type', pricing_type)
    }

    if (features && features.length > 0) {
      query = query.contains('features', features)
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      error: null,
      message: 'Tools retrieved successfully',
    })
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to retrieve tools',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, description, category, pricing_type, features, website_url, logo_url } = body

    // Validate required fields
    if (!name || !description || !category || !pricing_type || !website_url) {
      return NextResponse.json(
        {
          data: null,
          error: 'Missing required fields',
          message: 'Please provide all required fields',
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
      .from('tools')
      .insert([
        {
          name,
          slug,
          description,
          category,
          pricing_type,
          features: features || [],
          website_url,
          logo_url,
        },
      ])
      .select()

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      error: null,
      message: 'Tool created successfully',
    })
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to create tool',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
} 