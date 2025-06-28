"use client"

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useTheme } from 'next-themes'
import { useUser } from '@/lib/user-context'
import { WalletConnect } from './wallet-connect'
import { Moon, Sun, User, LogOut, Package } from 'lucide-react'
import { useState } from 'react'

export function Navigation() {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
  const { user, connectUser, disconnectUser } = useUser()
  const [showWalletConnect, setShowWalletConnect] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/packs', label: 'Packs' },
    { href: '/market', label: 'Market' },
    { href: '/collection', label: 'My Collection' },
  ]

  const handleConnect = (type: 'metamask' | 'phantom' | 'email', address?: string) => {
    connectUser(type, address)
    setShowWalletConnect(false)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <span className="text-lg font-bold text-primary-foreground">C</span>
            </div>
            <span className="text-xl font-bold text-foreground">Crix</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  text-sm font-medium transition-colors hover:text-primary
                  ${pathname === item.href 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="
                inline-flex items-center justify-center rounded-md text-sm font-medium
                transition-colors focus-visible:outline-none focus-visible:ring-2
                focus-visible:ring-ring focus-visible:ring-offset-2
                disabled:pointer-events-none disabled:opacity-50
                hover:bg-accent hover:text-accent-foreground
                h-10 w-10
              "
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </button>

            {/* Wallet Connect / User Profile */}
            {user ? (
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-2 px-3 py-2 bg-primary/10 rounded-lg">
                  <User className="h-4 w-4 text-primary" />
                  <span className="text-sm font-medium text-foreground">
                    {user.type === 'email' ? user.email : `${user.address?.slice(0, 6)}...${user.address?.slice(-4)}`}
                  </span>
                </div>
                <button
                  onClick={disconnectUser}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <button
                onClick={() => setShowWalletConnect(!showWalletConnect)}
                className="flex items-center space-x-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                <Package className="h-4 w-4" />
                <span>Connect Wallet</span>
              </button>
            )}
          </div>
        </div>

        {/* Wallet Connect Modal */}
        {showWalletConnect && !user && (
          <div className="py-4 border-t border-border">
            <div className="max-w-md mx-auto">
              <WalletConnect onConnect={handleConnect} />
            </div>
          </div>
        )}

        {/* Mobile Navigation */}
        <div className="md:hidden py-4 border-t border-border">
          <div className="flex items-center justify-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  text-sm font-medium transition-colors hover:text-primary
                  ${pathname === item.href 
                    ? 'text-primary' 
                    : 'text-muted-foreground'
                  }
                `}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  )
} 