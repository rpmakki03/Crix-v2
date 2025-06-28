"use client"

import Image from 'next/image'
import { CricketCard } from '@/lib/data'

interface CricketCardProps {
  card: CricketCard
  showPrice?: boolean
  onClick?: () => void
}

const rarityColors = {
  common: 'border-gray-300 bg-gray-50 dark:border-gray-600 dark:bg-gray-800',
  rare: 'border-blue-300 bg-blue-50 dark:border-blue-600 dark:bg-blue-900/20',
  epic: 'border-purple-300 bg-purple-50 dark:border-purple-600 dark:bg-purple-900/20',
  legendary: 'border-yellow-300 bg-yellow-50 dark:border-yellow-600 dark:bg-yellow-900/20'
}

const rarityTextColors = {
  common: 'text-gray-600 dark:text-gray-300',
  rare: 'text-blue-600 dark:text-blue-400',
  epic: 'text-purple-600 dark:text-purple-400',
  legendary: 'text-yellow-600 dark:text-yellow-400'
}

export function CricketCardComponent({ card, showPrice = true, onClick }: CricketCardProps) {
  return (
    <div 
      className={`
        relative group cursor-pointer transition-all duration-300 ease-in-out
        bg-card border border-border rounded-2xl overflow-hidden
        hover:shadow-lg hover:shadow-black/10 hover:-translate-y-1
        ${rarityColors[card.rarity]}
        ${onClick ? 'cursor-pointer' : 'cursor-default'}
      `}
      onClick={onClick}
    >
      {/* Card Image */}
      <div className="relative w-full h-80 overflow-hidden">
        <Image
          src={card.image}
          alt={card.name}
          fill
          className="object-contain transition-transform duration-300 group-hover:scale-105"
        />
        {/* Rarity Badge */}
        <div className="absolute top-2 right-2">
          <span className={`
            px-2 py-1 text-xs font-semibold rounded-full
            ${rarityTextColors[card.rarity]}
            bg-white/90 dark:bg-black/90 backdrop-blur-sm
          `}>
            {card.rarity.toUpperCase()}
          </span>
        </div>
      </div>

      {/* Card Content */}
      <div className="p-4 space-y-3 bg-card">
        {/* Player Name */}
        <h3 className="font-semibold text-lg text-card-foreground group-hover:underline transition-all duration-200">
          {card.name}
        </h3>
        
        {/* Player Details */}
        <div className="space-y-2 text-sm text-muted-foreground">
          <p className="flex items-center gap-2">
            <span className="font-medium text-foreground">Position:</span>
            <span>{card.position}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="font-medium text-foreground">Team:</span>
            <span>{card.team}</span>
          </p>
        </div>

        {/* Price */}
        {showPrice && (
          <div className="pt-3 border-t border-border">
            <p className="text-lg font-bold text-primary">
              ₹{card.price.toLocaleString()}
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 