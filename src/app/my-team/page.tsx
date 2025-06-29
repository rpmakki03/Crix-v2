"use client"

import { useState } from 'react'
import { CricketCard } from '@/components/cricket-card'
import { useUser } from '@/lib/user-context'
import { CricketCard as CricketCardType } from '@/lib/data'
import { Users, Trophy, Lightbulb } from 'lucide-react'

interface TeamPosition {
  id: string
  name: string
  card: CricketCardType | null
}

export default function MyTeamPage() {
  const { user, userCards } = useUser()
  const [team, setTeam] = useState<TeamPosition[]>([
    { id: '1', name: 'Batsman 1', card: null },
    { id: '2', name: 'Batsman 2', card: null },
    { id: '3', name: 'All-rounder', card: null },
    { id: '4', name: 'Bowler 1', card: null },
    { id: '5', name: 'Bowler 2', card: null }
  ])

  if (!user) {
    return (
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">My Team</h1>
        <p className="text-xl text-muted-foreground">
          Please connect your wallet or sign in to build your team.
        </p>
      </div>
    )
  }

  const handleDragStart = (e: React.DragEvent, card: CricketCardType) => {
    e.dataTransfer.setData('card', JSON.stringify(card))
  }

  const handleDrop = (e: React.DragEvent, positionId: string) => {
    e.preventDefault()
    const cardData = e.dataTransfer.getData('card')
    if (cardData) {
      const card = JSON.parse(cardData)
      setTeam(prev => prev.map(pos => 
        pos.id === positionId ? { ...pos, card } : pos
      ))
    }
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const removeCard = (positionId: string) => {
    setTeam(prev => prev.map(pos => 
      pos.id === positionId ? { ...pos, card: null } : pos
    ))
  }

  // Calculate team rating
  const teamCards = team.filter(pos => pos.card !== null)
  const totalRating = teamCards.reduce((sum, pos) => sum + (pos.card?.rating || 0), 0)
  const averageRating = teamCards.length > 0 ? Math.round(totalRating / teamCards.length) : 0

  // Get available cards (cards not in team)
  const usedCardIds = team.map(pos => pos.card?.id).filter(Boolean)
  const availableCards = userCards.filter(card => !usedCardIds.includes(card.id))

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-foreground">My Team</h1>
        <p className="text-xl text-muted-foreground">
          Build your ultimate 5-a-side cricket team
        </p>
      </div>

      {/* Team Rating */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-500" />
            <div>
              <h3 className="text-xl font-semibold text-foreground">Team Rating</h3>
              <p className="text-muted-foreground">Average rating of your team</p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold text-primary">{averageRating}</div>
            <div className="text-sm text-muted-foreground">
              {teamCards.length}/5 players
            </div>
          </div>
        </div>
      </div>

      {/* Team Formation */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Team Formation</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {team.map((position) => (
            <div
              key={position.id}
              className="min-h-[200px] border-2 border-dashed border-border rounded-lg p-4 flex flex-col items-center justify-center"
              onDrop={(e) => handleDrop(e, position.id)}
              onDragOver={handleDragOver}
            >
              {position.card ? (
                <div className="w-full">
                  <CricketCard card={position.card} />
                  <button
                    onClick={() => removeCard(position.id)}
                    className="w-full mt-2 px-3 py-1 bg-destructive text-destructive-foreground rounded text-sm hover:bg-destructive/90 transition-colors"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <div className="text-center text-muted-foreground">
                  <Users className="h-8 w-8 mx-auto mb-2" />
                  <p className="font-medium">{position.name}</p>
                  <p className="text-sm">Drop a card here</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Available Cards */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-foreground">Available Cards</h2>
        {availableCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {availableCards.map((card) => (
              <div
                key={card.id}
                draggable
                onDragStart={(e) => handleDragStart(e, card)}
                className="cursor-grab active:cursor-grabbing"
              >
                <CricketCard card={card} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-muted-foreground">
              No available cards. All your cards are in your team!
            </p>
          </div>
        )}
      </div>

      {/* Tips */}
      <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Lightbulb className="h-6 w-6 text-blue-600 dark:text-blue-400 mt-1" />
          <div>
            <h3 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
              Team Building Tips
            </h3>
            <ul className="space-y-1 text-sm text-blue-700 dark:text-blue-300">
              <li>• Drag and drop cards from your collection to build your team</li>
              <li>• Aim for a balanced team with different player types</li>
              <li>• Higher rated players contribute more to your team rating</li>
              <li>• You can remove cards by clicking the "Remove" button</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
} 