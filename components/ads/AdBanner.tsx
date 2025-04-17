"use client";
import { useEffect } from 'react';
import Script from 'next/script';

interface AdBannerProps {
  className?: string;
  slot: string;
  format?: 'leaderboard' | 'rectangle' | 'sidebar';
}

export default function AdBanner({ 
  className = '', 
  slot,
  format = 'rectangle'
}: AdBannerProps) {
  const getAdStyle = () => {
    switch (format) {
      case 'leaderboard':
        return {
          display: 'block',
          width: '728px',
          height: '90px',
        }
      case 'rectangle':
        return {
          display: 'block',
          width: '336px',
          height: '280px',
        }
      case 'sidebar':
        return {
          display: 'block',
          width: '300px',
          height: '600px',
        }
      default:
        return {
          display: 'block',
          width: '336px',
          height: '280px',
        }
    }
  }

  return (
    <div className={`${className} flex justify-center`}>
      <div 
        className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg flex items-center justify-center"
        style={getAdStyle()}
      >
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Advertisement
        </span>
      </div>
    </div>
  )
}