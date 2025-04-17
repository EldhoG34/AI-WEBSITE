import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'

const formSchema = z.object({
  name: z.string().min(3, 'Name must be at least 3 characters'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  website_url: z.string().url('Please enter a valid URL'),
  category: z.string().min(1, 'Please select a category'),
  pricing_type: z.enum(['free', 'freemium', 'paid']),
  features: z.array(z.string()).min(1, 'Please add at least one feature'),
  submitted_by: z.string().email('Please enter a valid email'),
})

type FormData = z.infer<typeof formSchema>

const SubmitForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const categories = [
    'Image Generation',
    'Text Generation',
    'Video Editing',
    'Audio Generation',
    'Code Generation',
    'General AI',
  ]

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      const response = await fetch('/api/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.message || 'Failed to submit tool')
      }

      setSubmitStatus('success')
      reset()
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Failed to submit tool')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label htmlFor="name" className="label">
          Tool Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="input"
          placeholder="Enter tool name"
        />
        {errors.name && (
          <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          id="description"
          {...register('description')}
          className="input h-32"
          placeholder="Describe the tool and its features"
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="website_url" className="label">
          Website URL
        </label>
        <input
          id="website_url"
          type="url"
          {...register('website_url')}
          className="input"
          placeholder="https://example.com"
        />
        {errors.website_url && (
          <p className="mt-1 text-sm text-red-600">{errors.website_url.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="category" className="label">
          Category
        </label>
        <select
          id="category"
          {...register('category')}
          className="input"
        >
          <option value="">Select a category</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="pricing_type" className="label">
          Pricing Type
        </label>
        <select
          id="pricing_type"
          {...register('pricing_type')}
          className="input"
        >
          <option value="">Select pricing type</option>
          <option value="free">Free</option>
          <option value="freemium">Freemium</option>
          <option value="paid">Paid</option>
        </select>
        {errors.pricing_type && (
          <p className="mt-1 text-sm text-red-600">{errors.pricing_type.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="features" className="label">
          Features (comma-separated)
        </label>
        <input
          id="features"
          type="text"
          {...register('features', {
            setValueAs: (value) => value.split(',').map((item) => item.trim()),
          })}
          className="input"
          placeholder="Feature 1, Feature 2, Feature 3"
        />
        {errors.features && (
          <p className="mt-1 text-sm text-red-600">{errors.features.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="submitted_by" className="label">
          Your Email
        </label>
        <input
          id="submitted_by"
          type="email"
          {...register('submitted_by')}
          className="input"
          placeholder="your@email.com"
        />
        {errors.submitted_by && (
          <p className="mt-1 text-sm text-red-600">{errors.submitted_by.message}</p>
        )}
      </div>

      {submitStatus === 'success' && (
        <div className="p-4 bg-green-50 text-green-800 rounded-lg">
          Tool submitted successfully! Our team will review it soon.
        </div>
      )}

      {submitStatus === 'error' && (
        <div className="p-4 bg-red-50 text-red-800 rounded-lg">
          {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full btn btn-primary"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            Submitting...
          </>
        ) : (
          'Submit Tool'
        )}
      </button>
    </form>
  )
}

export default SubmitForm 