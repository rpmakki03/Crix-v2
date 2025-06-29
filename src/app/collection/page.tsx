"use client"

import { useState } from 'react'
import { CricketCard } from '@/components/cricket-card'
import { useUser } from '@/lib/user-context'
import { Input } from '@/components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Wallet, Package, Trophy } from 'lucide-react'

export default function CollectionPage() {
  const { user, userCards } = useUser()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedRarity, setSelectedRarity] = useState('all')
  const [selectedTeam, setSelectedTeam] = useState('all')

  if (!user) {
    return (
      <div className="space-y-8">
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-foreground">My Collection</h1>
          <p className="text-xl text-muted-foreground">
            Please connect your wallet or sign in to view your collection.
          </p>
        </div>

        <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-8 text-center">
          <Wallet className="h-12 w-12 text-yellow-600 dark:text-yellow-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
            Connect to View Collection
          </h3>
          <p className="text-yellow-700 dark:text-yellow-300">
            Please connect your wallet or sign in to view your cricket card collection.
          </p>
        </div>
      </div>
    )
  }

  const filteredCards = userCards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.team.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         card.position.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesRarity = selectedRarity === 'all' || card.rarity === selectedRarity
    const matchesTeam = selectedTeam === 'all' || card.team === selectedTeam
    
    return matchesSearch && matchesRarity && matchesTeam
  })

  const teams = Array.from(new Set(userCards.map(card => card.team)))

  // Calculate collection stats
  const totalCards = userCards.length
  const legendaryCount = userCards.filter(card => card.rarity === 'legendary').length
  const epicCount = userCards.filter(card => card.rarity === 'epic').length
  const rareCount = userCards.filter(card => card.rarity === 'rare').length
  const commonCount = userCards.filter(card => card.rarity === 'common').length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">My Collection</h1>
        <p className="text-xl text-muted-foreground">
          Your personal cricket card collection
        </p>
      </div>

      {/* Collection Stats */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <Trophy className="h-6 w-6 text-primary" />
          <h3 className="text-xl font-semibold text-foreground">Collection Statistics</h3>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">
              {totalCards}
            </div>
            <div className="text-sm text-muted-foreground">Total Cards</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-500">
              {legendaryCount}
            </div>
            <div className="text-sm text-muted-foreground">Legendary</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-500">
              {epicCount}
            </div>
            <div className="text-sm text-muted-foreground">Epic</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-500">
              {rareCount}
            </div>
            <div className="text-sm text-muted-foreground">Rare</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-500">
              {commonCount}
            </div>
            <div className="text-sm text-muted-foreground">Common</div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search your collection..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1"
        />
        <Select value={selectedRarity} onValueChange={setSelectedRarity}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select rarity" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Rarities</SelectItem>
            <SelectItem value="common">Common</SelectItem>
            <SelectItem value="rare">Rare</SelectItem>
            <SelectItem value="epic">Epic</SelectItem>
            <SelectItem value="legendary">Legendary</SelectItem>
          </SelectContent>
        </Select>
        <Select value={selectedTeam} onValueChange={setSelectedTeam}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Select team" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Teams</SelectItem>
            {teams.map(team => (
              <SelectItem key={team} value={team}>{team}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        Showing {filteredCards.length} of {totalCards} cards
      </div>

      {/* Cards Grid */}
      {filteredCards.length > 0 ? (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-foreground">Your Cards</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCards.map((card, index) => (
              <div key={`${card.id}-${index}`} className="animate-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                <CricketCard card={card} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-foreground mb-2">
            No Cards Yet
          </h3>
          <p className="text-muted-foreground mb-4">
            You haven't collected any cards yet. Start by opening some packs!
          </p>
          <a
            href="/packs"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Package className="h-5 w-5" />
            Open Packs
          </a>
        </div>
      )}
    </div>
  )
} 