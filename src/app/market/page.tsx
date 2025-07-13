"use client";
import { useState } from "react";
import { CricketCard } from '@/components/cricket-card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cricketCards } from '@/lib/data';

export default function MarketPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRarity, setSelectedRarity] = useState('all');
  const [selectedTeam, setSelectedTeam] = useState('all');

  const filteredCards = cricketCards.filter(card => {
    const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (card.team && card.team.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (card.position && card.position.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesRarity = selectedRarity === 'all' || card.rarity === selectedRarity;
    const matchesTeam = selectedTeam === 'all' || card.team === selectedTeam;
    return matchesSearch && matchesRarity && matchesTeam;
  });

  const teams = Array.from(new Set(cricketCards.map(card => card.team)));

  // Shuffle cards on each render
  function shuffle(array: typeof cricketCards) {
    return array.slice().sort(() => Math.random() - 0.5);
  }
  const shuffledCards = shuffle(filteredCards);

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
      <div className="flex flex-col sm:flex-row gap-4">
        <Input
          placeholder="Search players, teams, or positions..."
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
        Showing {filteredCards.length} of {cricketCards.length} cards
      </div>

      {/* Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {shuffledCards.map((card) => (
          <CricketCard key={card.id} card={card} />
        ))}
      </div>

      {/* No Results */}
      {filteredCards.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground text-lg">
            No cards found matching your criteria.
          </p>
        </div>
      )}
    </div>
  );
} 