import { CricketCard } from '@/components/cricket-card'
import { cricketCards } from '@/lib/data'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-bold text-foreground">
          Welcome to <span className="text-primary">Crix</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          The ultimate cricket card trading platform. Collect, trade, and build your dream team with legendary cricket players.
        </p>
        <div className="flex gap-4 justify-center px-4 sm:px-0">
          <Link href="/packs">
            <Button size="lg" className="text-lg px-8 py-6 w-full max-w-xs">
              Open Packs
            </Button>
          </Link>
          <Link href="/market">
            <Button variant="outline" size="lg" className="text-lg px-8 py-6 w-full max-w-xs">
              Browse Market
            </Button>
          </Link>
        </div>
      </div>

      {/* Featured Cards */}
      <div className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Featured Players
          </h2>
          <p className="text-muted-foreground">
            Discover some of the most iconic cricket players
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {(() => {
            // Get the Mitchell Johnson card
            const mitchellJohnson = cricketCards.find(card => card.name === 'Mitchell Johnson');
            // Get the top 8 highest rated players, excluding Mitchell Johnson
            let topPlayers = cricketCards
              .filter(card => card.name !== 'Mitchell Johnson')
              .slice()
              .sort((a, b) => b.rating - a.rating)
              .slice(0, 8);
            // Add Mitchell Johnson at the end if found
            if (mitchellJohnson) {
              topPlayers = [...topPlayers.filter(card => card.id !== mitchellJohnson.id), mitchellJohnson];
            }
            return topPlayers.map((card) => (
              <CricketCard key={card.id} card={card} />
            ));
          })()}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid md:grid-cols-3 gap-6">
        <Link href="/packs" className="group">
          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200 group-hover:scale-105">
            <h3 className="text-xl font-semibold text-foreground mb-2">Open Packs</h3>
            <p className="text-muted-foreground">Get random cricket cards and build your collection</p>
          </div>
        </Link>
        
        <Link href="/market" className="group">
          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200 group-hover:scale-105">
            <h3 className="text-xl font-semibold text-foreground mb-2">Browse Market</h3>
            <p className="text-muted-foreground">View all available cards and their prices</p>
          </div>
        </Link>
        
        <Link href="/my-team" className="group">
          <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-all duration-200 group-hover:scale-105">
            <h3 className="text-xl font-semibold text-foreground mb-2">Build Team</h3>
            <p className="text-muted-foreground">Create your ultimate 5-a-side cricket team</p>
          </div>
        </Link>
      </div>
    </div>
  )
} 