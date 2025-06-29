"use client"

import Image from 'next/image'
import type { CricketCard } from '@/lib/data'
import { cn } from '@/lib/utils'

interface CricketCardProps {
  card: CricketCard
  className?: string
  onClick?: () => void
  draggable?: boolean
  onDragStart?: (e: React.DragEvent) => void
}

const rarityColors = {
  common: 'bg-gray-500',
  rare: 'bg-blue-500',
  epic: 'bg-purple-500',
  legendary: 'bg-yellow-500'
}

const rarityTextColors = {
  common: 'text-gray-300',
  rare: 'text-blue-300',
  epic: 'text-purple-300',
  legendary: 'text-yellow-300'
}

export function CricketCard({ card, className, onClick, draggable, onDragStart }: CricketCardProps) {
  return (
    <div
      className={cn(
        'relative bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transform transition-all duration-200 hover:scale-105 hover:shadow-xl',
        className
      )}
      onClick={onClick}
      draggable={draggable}
      onDragStart={onDragStart}
    >
      <div className="relative">
        <img
          src={card.image}
          alt={card.name}
          className="w-full h-80 object-contain"
        />
        <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {card.position}
        </div>
        <div className="absolute top-2 right-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-xs">
          {card.rating}
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-bold text-lg text-gray-900 dark:text-white">{card.name}</h3>
          <span className={cn(
            'px-2 py-1 rounded text-xs font-semibold capitalize',
            rarityColors[card.rarity],
            rarityTextColors[card.rarity]
          )}>
            {card.rarity}
          </span>
        </div>
        
        <div className="text-sm text-gray-600 dark:text-gray-300">
          <p>{card.team}</p>
          <p className="font-semibold text-green-600 dark:text-green-400">₹{card.price}</p>
        </div>
      </div>
    </div>
  )
} 