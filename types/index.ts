export interface Tool {
  id: string
  name: string
  slug: string
  description: string
  category: string
  pricing_type: 'free' | 'freemium' | 'paid'
  features: string[]
  website_url: string
  logo_url: string
  created_at: string
  updated_at: string
}

export interface Review {
  id: string
  tool_id: string
  user_id: string
  rating: number
  comment: string
  created_at: string
}

export interface Category {
  id: string
  name: string
  slug: string
  description: string
  icon: string
}

export interface User {
  id: string
  email: string
  name: string
  avatar_url: string
  created_at: string
}

export interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  category: string
  author: string
  published_at: string
  image_url: string
}

export interface NewsletterSubscriber {
  id: string
  email: string
  created_at: string
  is_active: boolean
}

export interface ToolSubmission {
  id: string
  name: string
  description: string
  website_url: string
  category: string
  pricing_type: string
  features: string[]
  submitted_by: string
  status: 'pending' | 'approved' | 'rejected'
  created_at: string
  updated_at: string
}

export interface SearchFilters {
  category?: string
  pricing_type?: string
  features?: string[]
  sort_by?: 'rating' | 'reviews' | 'newest' | 'oldest'
}

export interface ApiResponse<T> {
  data: T
  error: string | null
  message: string
} 