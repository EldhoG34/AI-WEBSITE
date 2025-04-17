import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { data: tool, error: toolError } = await supabase
      .from('tools')
      .select('*, reviews(*)')
      .eq('id', params.id)
      .single()

    if (toolError) {
      throw toolError
    }

    // Get related tools in the same category
    const { data: relatedTools, error: relatedError } = await supabase
      .from('tools')
      .select('id, name, slug, description, logo_url')
      .eq('category', tool.category)
      .neq('id', tool.id)
      .limit(4)

    if (relatedError) {
      throw relatedError
    }

    return NextResponse.json({
      data: {
        ...tool,
        related_tools: relatedTools,
      },
      error: null,
      message: 'Tool retrieved successfully',
    })
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to retrieve tool',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
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

    const { data, error } = await supabase
      .from('tools')
      .update({
        name,
        description,
        category,
        pricing_type,
        features: features || [],
        website_url,
        logo_url,
        updated_at: new Date().toISOString(),
      })
      .eq('id', params.id)
      .select()

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      error: null,
      message: 'Tool updated successfully',
    })
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to update tool',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { error } = await supabase
      .from('tools')
      .delete()
      .eq('id', params.id)

    if (error) {
      throw error
    }

    return NextResponse.json({
      data: null,
      error: null,
      message: 'Tool deleted successfully',
    })
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to delete tool',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
} 