import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const tool_id = searchParams.get('tool_id')
    const user_id = searchParams.get('user_id')
    const limit = parseInt(searchParams.get('limit') || '10')
    const offset = parseInt(searchParams.get('offset') || '0')

    let query = supabase
      .from('reviews')
      .select('*, users(*)')
      .order('created_at', { ascending: false })

    if (tool_id) {
      query = query.eq('tool_id', tool_id)
    }

    if (user_id) {
      query = query.eq('user_id', user_id)
    }

    const { data, error } = await query
      .range(offset, offset + limit - 1)

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      error: null,
      message: 'Reviews retrieved successfully',
    })
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to retrieve reviews',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { tool_id, user_id, rating, comment } = body

    // Validate required fields
    if (!tool_id || !user_id || !rating) {
      return NextResponse.json(
        {
          data: null,
          error: 'Missing required fields',
          message: 'Please provide tool_id, user_id, and rating',
        },
        { status: 400 }
      )
    }

    // Validate rating
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        {
          data: null,
          error: 'Invalid rating',
          message: 'Rating must be between 1 and 5',
        },
        { status: 400 }
      )
    }

    const { data, error } = await supabase
      .from('reviews')
      .insert([
        {
          tool_id,
          user_id,
          rating,
          comment,
        },
      ])
      .select()

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      error: null,
      message: 'Review created successfully',
    })
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to create review',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
} 