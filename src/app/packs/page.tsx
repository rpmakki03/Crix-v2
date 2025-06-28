"use client"

import { useState } from 'react'
import Image from 'next/image'
import { CricketCardComponent } from '@/components/cricket-card'
import { getRandomCards, packImage } from '@/lib/data'
import { useUser } from '@/lib/user-context'
import { Package, Sparkles, Wallet } from 'lucide-react'

export default function PacksPage() {
  const [openedCards, setOpenedCards] = useState<any[]>([])
  const [isOpening, setIsOpening] = useState(false)
  const { user, addCardToCollection } = useUser()

  const handleBuyPack = () => {
    if (!user) {
      alert('Please connect your wallet or sign in to buy packs!')
      return
    }

    setIsOpening(true)
    
    // Simulate pack opening animation
    setTimeout(() => {
      const newCards = getRandomCards(1) // Only 1 card per pack
      setOpenedCards(newCards)
      // Add the card to user's collection
      newCards.forEach(card => addCardToCollection(card))
      setIsOpening(false)
    }, 2000)
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Cricket Packs</h1>
        <p className="text-xl text-muted-foreground">
          Open packs to discover legendary cricket players
        </p>
      </div>

      {/* Authentication Check */}
      {!user && (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-6 text-center">
          <Wallet className="h-8 w-8 text-yellow-600 dark:text-yellow-400 mx-auto mb-3" />
          <h3 className="text-lg font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            Connect to Buy Packs
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            Please connect your wallet or sign in with email to purchase packs and collect cards.
          </p>
        </div>
      )}

      {/* Pack Display */}
      <div className="flex justify-center">
        <div className="relative group">
          <div className="relative w-80 h-96 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border-2 border-dashed border-primary/30 p-8 flex flex-col items-center justify-center">
            <Image
              src={packImage}
              alt="Cricket Pack"
              width={200}
              height={200}
              className="object-contain mb-4"
            />
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Cricket Pack
            </h3>
            <p className="text-muted-foreground text-center mb-6">
              Contains 1 random cricket card with varying rarities
            </p>
            <button
              onClick={handleBuyPack}
              disabled={isOpening || !user}
              className="
                inline-flex items-center justify-center gap-2 px-6 py-3
                bg-primary text-primary-foreground rounded-lg font-semibold
                hover:bg-primary/90 transition-all duration-200
                disabled:opacity-50 disabled:cursor-not-allowed
                hover:shadow-lg hover:shadow-primary/25
              "
            >
              {isOpening ? (
                <>
                  <Sparkles className="h-5 w-5 animate-spin" />
                  Opening...
                </>
              ) : (
                <>
                  <Package className="h-5 w-5" />
                  Buy Pack - ₹999
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Opened Cards */}
      {openedCards.length > 0 && (
        <div className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Your Pack Contents
            </h2>
            <p className="text-muted-foreground">
              Here's the card you got from your pack!
            </p>
          </div>
          
          <div className="flex justify-center">
            <div className="w-full max-w-sm">
              <CricketCardComponent card={openedCards[0]} showPrice={false} />
            </div>
          </div>
          
          <div className="text-center">
            <button
              onClick={() => setOpenedCards([])}
              className="px-6 py-2 bg-secondary text-secondary-foreground rounded-lg font-medium hover:bg-secondary/80 transition-colors"
            >
              Clear Results
            </button>
          </div>
        </div>
      )}

      {/* Pack Info */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Pack Information
        </h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-foreground mb-2">What's in a pack?</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• 1 random cricket card</li>
              <li>• Guaranteed at least 1 rare card</li>
              <li>• Chance for epic and legendary cards</li>
              <li>• Cards from various teams and positions</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-2">Rarity Distribution</h4>
            <ul className="space-y-2 text-muted-foreground">
              <li>• Common: 60% chance</li>
              <li>• Rare: 25% chance</li>
              <li>• Epic: 12% chance</li>
              <li>• Legendary: 3% chance</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 