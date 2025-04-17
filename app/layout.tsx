import './globals.css'
import { Inter } from 'next/font/google'
import { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

const metadata: Metadata = {
  title: {
    default: 'AI Tools Directory - Discover the Best AI Tools',
    template: '%s | AI Tools Directory'
  },
  description: 'Discover and compare the best AI tools for your needs. Find AI image generators, text generators, video editors, and more.',
  keywords: [
    'best AI tools',
    'AI tools directory',
    'free AI tools',
    'AI image generator',
    'AI text generator',
    'AI video editor',
    'AI tools comparison',
    'latest AI tools'
  ],
  authors: [{ name: 'AI Tools Directory' }],
  creator: 'AI Tools Directory',
  publisher: 'AI Tools Directory',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL,
    title: 'AI Tools Directory - Discover the Best AI Tools',
    description: 'Discover and compare the best AI tools for your needs. Find AI image generators, text generators, video editors, and more.',
    siteName: 'AI Tools Directory',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Tools Directory - Discover the Best AI Tools',
    description: 'Discover and compare the best AI tools for your needs. Find AI image generators, text generators, video editors, and more.',
    creator: '@aitools',
  },
  verification: {
    google: 'google-site-verification-code',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body>{children}</body>
    </html>
  )
}

export { metadata } 