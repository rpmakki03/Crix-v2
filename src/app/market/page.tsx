"use client"

import { useState } from 'react'
import { CricketCardComponent } from '@/components/cricket-card'
import { cricketCards } from '@/lib/data'
import { Search, Filter } from 'lucide-react'

export default function MarketPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRarity, setSelectedRarity] = useState<string>('all')

  const filteredCards = cricketCards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.position.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRarity = selectedRarity === 'all' || card.rarity === selectedRarity
    return matchesSearch && matchesRarity
  })

  const rarities = ['all', 'common', 'rare', 'epic', 'legendary']

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">Cricket Market</h1>
        <p className="text-xl text-muted-foreground">
          Browse and discover all available cricket cards
        </p>
      </div>

      {/* Filters */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name, team, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          {/* Rarity Filter */}
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <select
              value={selectedRarity}
              onChange={(e) => setSelectedRarity(e.target.value)}
              className="px-3 py-2 border border-border rounded-lg bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              {rarities.map(rarity => (
                <option key={rarity} value={rarity}>
                  {rarity === 'all' ? 'All Rarities' : rarity.charAt(0).toUpperCase() + rarity.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Count */}
        <div className="mt-4 text-sm text-muted-foreground">
          Showing {filteredCards.length} of {cricketCards.length} cards
        </div>
      </div>

      {/* Cards Grid */}
      {filteredCards.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCards.map((card) => (
            <CricketCardComponent key={card.id} card={card} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground text-lg">
            No cards found matching your criteria
          </div>
          <button
            onClick={() => {
              setSearchTerm('')
              setSelectedRarity('all')
            }}
            className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Clear Filters
          </button>
        </div>
      )}

      {/* Market Stats */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-xl font-semibold text-foreground mb-4">
          Market Statistics
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {cricketCards.length}
            </div>
            <div className="text-sm text-muted-foreground">Total Cards</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">
              {cricketCards.filter(card => card.rarity === 'legendary').length}
            </div>
            <div className="text-sm text-muted-foreground">Legendary</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">
              {cricketCards.filter(card => card.rarity === 'epic').length}
            </div>
            <div className="text-sm text-muted-foreground">Epic</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {cricketCards.filter(card => card.rarity === 'rare').length}
            </div>
            <div className="text-sm text-muted-foreground">Rare</div>
          </div>
        </div>
      </div>
    </div>
  )
} 