"use client"

import { useUser } from '@/lib/user-context'
import { CricketCard } from '@/components/cricket-card'
import { Wallet } from 'lucide-react'

export default function CollectionPage() {
  const { user, userCards } = useUser()

  if (!user) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">My Collection</h1>
          <p className="text-xl text-muted-foreground">
            Your personal cricket card collection
          </p>
        </div>
        
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center">
          <Wallet className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            Connect to View Collection
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            Please connect your wallet or sign in to view your card collection.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">My Collection</h1>
        <p className="text-xl text-muted-foreground">
          Your personal cricket card collection ({userCards.length} cards)
        </p>
      </div>

      {/* Cards Grid */}
      {userCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {userCards.map((card) => (
            <CricketCard key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg mb-4">
            Your collection is empty. Open some packs to get started!
          </p>
          <a
            href="/packs"
            className="inline-flex items-center px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            Open Packs
          </a>
        </div>
      )}
    </div>
  )
} 