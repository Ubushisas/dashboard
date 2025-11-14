import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Wellness Admin Dashboard',
  description: 'Admin dashboard with AI recommendations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
