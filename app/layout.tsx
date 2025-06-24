import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Ekai 100',
  description: 'Created by Ekai 100',
  // metadataBase: new URL('http://localhost:3000'), // Removed hardcoded port
  // generator: 'v0.dev',
  icons: {
    icon: [
      {
        url: '/placeholder-logo.png',
        sizes: '32x32',
        type: 'image/png',
      },
      
    ],
    apple: [
      {
        url: '/placeholder-logo.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  },
  openGraph: {
    title: 'Ekai 100',
    description: 'Created by Ekai 100',
    images: [
      {
        url: '/placeholder-logo.png',
        width: 1200,
        height: 630,
        alt: 'Ekai 100 Logo',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ekai 100',
    description: 'Created by Ekai 100',
    images: ['/placeholder-logo.png'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
