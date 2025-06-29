import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/lib/theme-provider'
import { UserProvider } from '@/lib/user-context'
import { Navigation } from '@/components/navigation'
import { Analytics } from '@vercel/analytics/next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Crix - Cricket Card Trading',
  description: 'Buy and trade cricket cards in packs, similar to FIFA Ultimate Team',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <UserProvider>
            <div className="min-h-screen bg-background">
              <Navigation />
              <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {children}
              </main>
            </div>
          </UserProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
} 