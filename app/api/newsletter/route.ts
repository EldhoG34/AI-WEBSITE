import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email } = body

    // Validate email
    if (!email || !email.includes('@')) {
      return NextResponse.json(
        {
          data: null,
          error: 'Invalid email',
          message: 'Please provide a valid email address',
        },
        { status: 400 }
      )
    }

    // Check if email already exists
    const { data: existingSubscriber, error: checkError } = await supabase
      .from('newsletter_subscribers')
      .select('id')
      .eq('email', email)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      throw checkError
    }

    if (existingSubscriber) {
      return NextResponse.json(
        {
          data: null,
          error: 'Email already subscribed',
          message: 'This email is already subscribed to our newsletter',
        },
        { status: 400 }
      )
    }

    // Create new subscription
    const { data, error } = await supabase
      .from('newsletter_subscribers')
      .insert([
        {
          email,
          is_active: true,
        },
      ])
      .select()

    if (error) {
      throw error
    }

    return NextResponse.json({
      data,
      error: null,
      message: 'Successfully subscribed to newsletter',
    })
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to subscribe',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const email = searchParams.get('email')

    if (!email) {
      return NextResponse.json(
        {
          data: null,
          error: 'Missing email',
          message: 'Please provide an email address',
        },
        { status: 400 }
      )
    }

    const { error } = await supabase
      .from('newsletter_subscribers')
      .update({ is_active: false })
      .eq('email', email)

    if (error) {
      throw error
    }

    return NextResponse.json({
      data: null,
      error: null,
      message: 'Successfully unsubscribed from newsletter',
    })
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to unsubscribe',
        message: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    )
  }
} 