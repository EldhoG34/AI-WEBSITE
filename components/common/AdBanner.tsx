interface AdBannerProps {
  slot: string
  className?: string
}

export default function AdBanner({ slot, className = '' }: AdBannerProps) {
  return (
    <div className={`bg-gray-100 dark:bg-gray-700 rounded-lg p-4 ${className}`}>
      <div className="text-center text-sm text-gray-500 dark:text-gray-400">
        Advertisement
      </div>
      <div className="mt-2 h-[250px] w-full bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center">
        <span className="text-gray-400 dark:text-gray-500">
          Ad Slot: {slot}
        </span>
      </div>
    </div>
  )
} 