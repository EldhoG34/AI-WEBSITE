import Link from 'next/link'
import { 
  ImageIcon, 
  MessageSquare, 
  Code2, 
  VideoIcon, 
  Music2, 
  BrainCircuit 
} from 'lucide-react'

const categories = [
  {
    name: 'Image Generation',
    icon: ImageIcon,
    description: 'Create and edit images with AI',
    slug: 'image-generation'
  },
  {
    name: 'Text Generation',
    icon: MessageSquare,
    description: 'Generate and edit text content',
    slug: 'text-generation'
  },
  {
    name: 'Code Generation',
    icon: Code2,
    description: 'AI-powered coding assistance',
    slug: 'code-generation'
  },
  {
    name: 'Video Generation',
    icon: VideoIcon,
    description: 'Create and edit videos with AI',
    slug: 'video-generation'
  },
  {
    name: 'Audio Generation',
    icon: Music2,
    description: 'Generate and edit audio content',
    slug: 'audio-generation'
  },
  {
    name: 'AI Assistants',
    icon: BrainCircuit,
    description: 'Smart AI assistants and chatbots',
    slug: 'ai-assistants'
  }
]

export default function Categories() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">Popular Categories</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.slug}
              href={`/tools?category=${category.slug}`}
              className="group block p-6 bg-white dark:bg-gray-900 rounded-xl hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-4">
                <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                  <category.icon 
                    className="w-6 h-6 text-blue-600 dark:text-blue-400" 
                  />
                </div>
                <h3 className="text-xl font-semibold group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {category.name}
                </h3>
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                {category.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 