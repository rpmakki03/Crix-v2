import Link from 'next/link'
import { CricketCardComponent } from '@/components/cricket-card'
import { cricketCards } from '@/lib/data'
import { ArrowRight, Package, ShoppingCart } from 'lucide-react'

export default function HomePage() {
  const featuredCards = cricketCards.slice(0, 4)

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground">
            Welcome to{' '}
            <span className="text-primary">Crix</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            The ultimate cricket card trading platform. Collect legendary players, 
            open packs, and build your dream team.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/packs"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/90 transition-colors"
          >
            <Package className="h-5 w-5" />
            Open Packs
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="/market"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-secondary text-secondary-foreground rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
          >
            <ShoppingCart className="h-5 w-5" />
            Browse Market
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* Featured Cards */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">
            Featured Players
          </h2>
          <p className="text-muted-foreground">
            Discover legendary cricket players in our collection
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredCards.map((card) => (
            <CricketCardComponent key={card.id} card={card} />
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Open Packs</h3>
          </div>
          <p className="text-muted-foreground">
            Purchase packs to get random cricket cards. Each pack contains 4 cards 
            with varying rarities from common to legendary.
          </p>
        </div>
        
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-lg">
              <ShoppingCart className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold text-foreground">Trade Cards</h3>
          </div>
          <p className="text-muted-foreground">
            Browse the market to see all available cards and their current prices. 
            Build your collection with your favorite players.
          </p>
        </div>
      </section>
    </div>
  )
} 