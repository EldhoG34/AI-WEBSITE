import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  'https://btwztefmvyjklonbzvqk.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ0d3p0ZWZtdnlqa2xvbmJ6dnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDQ4MzYxODIsImV4cCI6MjA2MDQxMjE4Mn0.spWkSWm1CtawqHN3D1tH1kRjGG2mAWh_y0KJJugxwak',
  {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
    },
  }
) 