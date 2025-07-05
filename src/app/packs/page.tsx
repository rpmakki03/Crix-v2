"use client"

import { useState, useRef } from 'react'
import Image from 'next/image'
import { CricketCard } from '@/components/cricket-card'
import { packs, getRandomCards } from '@/lib/data'
import { useUser } from '@/lib/user-context'
import { Package, Sparkles, Wallet, Star, Info } from 'lucide-react'

export default function PacksPage() {
  const [openedCards, setOpenedCards] = useState<any[]>([])
  const [isOpening, setIsOpening] = useState(false)
  const [selectedPack, setSelectedPack] = useState<string | null>(null)
  const [infoPack, setInfoPack] = useState<string | null>(null)
  const { user, addCardToCollection } = useUser()
  const openedCardsRef = useRef<HTMLDivElement>(null)

  const handleBuyPack = (packId: string) => {
    if (!user) {
      alert('Please connect your wallet or sign in to buy packs!')
      return
    }

    const pack = packs.find(p => p.id === packId)
    if (!pack) return

    setIsOpening(true)
    setSelectedPack(packId)
    
    // Simulate pack opening animation
    setTimeout(() => {
      const options = {
        excludeRarities: pack.excludeRarities,
        guaranteedCard: pack.guaranteedCard
      }
      
      const newCards = getRandomCards(pack.cardCount, options)
      setOpenedCards(newCards)
      // Add the cards to user's collection
      newCards.forEach(card => addCardToCollection(card))
      setIsOpening(false)
      
      // Auto-scroll to opened cards section
      setTimeout(() => {
        openedCardsRef.current?.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        })
      }, 100)
    }, 2000)
  }

  const getRarityIcon = (rarity: string) => {
    switch (rarity) {
      case 'legendary': return '⭐';
      case 'epic': return '💎';
      case 'rare': return '🔵';
      case 'common': return '⚪';
      default: return '⚪';
    }
  }

  // Pack chance info
  const packChances: Record<string, { label: string, value: string }[]> = {
    basic: [
      { label: 'Above 90 rated', value: '1%' },
      { label: 'Below 90 rated', value: '99%' },
    ],
    standard: [
      { label: '90-93 rated', value: '50%' },
      { label: '94 rated', value: '24%' },
      { label: '95 rated', value: '12%' },
      { label: '96 rated', value: '6%' },
      { label: '97 or above', value: '1%' },
      { label: 'Below 90 rated', value: '2%' },
    ],
    ultimate: [
      { label: 'Above 97 rated', value: '5%' },
      { label: '98 or 99 rated', value: '2%' },
      { label: '100 rated', value: '1%' },
      { label: 'Always gives', value: '1 Legendary, 1 Epic, 1 Rare' },
    ],
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Cricket Packs</h1>
        <p className="text-xl text-muted-foreground">
          Choose your pack and discover legendary cricket players
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

      {/* Packs Display */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
        {packs.map((pack) => (
          <div key={pack.id} className="relative group">
            {/* Info Button */}
            <button
              className="absolute top-2 right-2 z-10 bg-white/80 dark:bg-black/60 rounded-full p-1 hover:bg-primary/80 hover:text-white transition"
              onClick={() => setInfoPack(pack.id)}
              aria-label="Pack Info"
              type="button"
            >
              <Info className="h-5 w-5" />
            </button>
            <div className="relative w-full min-h-[420px] md:min-h-[480px] bg-gradient-to-br from-primary/20 to-secondary/20 rounded-2xl border-2 border-dashed border-primary/30 p-4 md:p-6 flex flex-col items-center justify-center">
              <Image
                src={pack.image}
                alt={pack.name}
                width={160}
                height={160}
                className="object-contain mb-3 md:mb-4 w-32 h-32 md:w-40 md:h-40"
              />
              <h3 className="text-lg md:text-xl font-semibold text-foreground mb-2 text-center">
                {pack.name}
              </h3>
              <p className="text-muted-foreground text-center mb-3 md:mb-4 text-sm md:text-base">
                {pack.description}
              </p>
              
              {/* Pack Features */}
              <div className="space-y-1 md:space-y-2 mb-4 md:mb-6 text-xs md:text-sm w-full">
                <div className="flex items-center gap-2 justify-center">
                  <Package className="h-3 w-3 md:h-4 md:w-4 text-primary flex-shrink-0" />
                  <span>{pack.cardCount} card{pack.cardCount > 1 ? 's' : ''}</span>
                </div>
                {pack.guaranteedCard && (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 justify-center">
                    <Star className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                    <span className="text-center">Guaranteed {pack.guaranteedCard}</span>
                  </div>
                )}
                {pack.excludeRarities && (
                  <div className="flex items-center gap-2 text-green-600 dark:text-green-400 justify-center">
                    <Star className="h-3 w-3 md:h-4 md:w-4 flex-shrink-0" />
                    <span className="text-center">Guaranteed {pack.excludeRarities.length === 3 ? 'common' : pack.excludeRarities.join(', ')} player{pack.excludeRarities.length > 1 ? 's' : ''}</span>
                  </div>
                )}
              </div>
              
              <button
                onClick={() => handleBuyPack(pack.id)}
                disabled={isOpening || !user}
                className="
                  w-full inline-flex items-center justify-center gap-2 px-4 md:px-6 py-3 md:py-3
                  bg-primary text-primary-foreground rounded-lg font-semibold text-sm md:text-base
                  hover:bg-primary/90 transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:shadow-lg hover:shadow-primary/25
                  mt-auto
                "
              >
                {isOpening && selectedPack === pack.id ? (
                  <>
                    <Sparkles className="h-4 w-4 md:h-5 md:w-5 animate-spin" />
                    Opening...
                  </>
                ) : (
                  <>
                    <Package className="h-4 w-4 md:h-5 md:w-5" />
                    Buy Pack - ₹{pack.price}
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Opened Cards */}
      {openedCards.length > 0 && (
        <div ref={openedCardsRef} className="space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Your Pack Contents
            </h2>
            <p className="text-muted-foreground">
              Here are the cards you got from your pack!
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {openedCards.map((card, index) => (
              <div key={index} className="animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 200}ms` }}>
                <CricketCard card={card} />
              </div>
            ))}
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
        <div className="grid md:grid-cols-3 gap-6">
          {packs.map((pack) => (
            <div key={pack.id} className="space-y-3">
              <h4 className="font-semibold text-foreground">{pack.name} - ₹{pack.price}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• {pack.cardCount} card{pack.cardCount > 1 ? 's' : ''}</li>
                {pack.guaranteedCard && (
                  <li>• Guaranteed {pack.guaranteedCard}</li>
                )}
                {pack.excludeRarities && (
                  <li>• Guaranteed {pack.excludeRarities.length === 3 ? 'common' : pack.excludeRarities.join(', ')} player{pack.excludeRarities.length > 1 ? 's' : ''}</li>
                )}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Info Popup/Modal */}
      {infoPack && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl p-6 w-full max-w-xs relative animate-in fade-in">
            <button
              className="absolute top-2 right-2 text-zinc-500 hover:text-zinc-900 dark:hover:text-white"
              onClick={() => setInfoPack(null)}
              aria-label="Close"
              type="button"
            >
              ×
            </button>
            <h3 className="text-lg font-bold mb-3 text-center">{packs.find(p => p.id === infoPack)?.name} Odds</h3>
            <ul className="space-y-2">
              {packChances[infoPack].map((chance, idx) => (
                <li key={idx} className="flex justify-between text-sm border-b last:border-b-0 pb-1">
                  <span>{chance.label}</span>
                  <span className="font-semibold">{chance.value}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
} 