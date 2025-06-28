# Crix - Cricket Card Trading Platform

A fully responsive cricket card trading website built with Next.js, Tailwind CSS, and modern UI design principles. Similar to EA Sports FIFA Ultimate Team, users can buy cricket cards through packs and browse the market.

## Features

- **Modern UI Design**: Clean, minimal interface inspired by shadcn/ui
- **Dark Mode Support**: Toggle between light and dark themes
- **Responsive Design**: Works perfectly on mobile, tablet, and desktop
- **Pack System**: Buy packs to get random cricket cards
- **Market Place**: Browse all available cards with search and filter functionality
- **Card Rarities**: Common, Rare, Epic, and Legendary cards with visual indicators
- **Hover Effects**: Interactive cards with smooth animations and transitions

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: Tailwind CSS with custom design system
- **Icons**: Lucide React
- **Theme**: next-themes for dark mode support
- **Language**: TypeScript
- **Images**: Next.js Image optimization

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd crix
```

2. Install dependencies:
```bash
npm install
```

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
crix/
├── public/
│   └── assets/           # Cricket player images and pack images
├── src/
│   ├── app/             # Next.js app router pages
│   │   ├── globals.css  # Global styles and Tailwind directives
│   │   ├── layout.tsx   # Root layout with navigation
│   │   ├── page.tsx     # Home page
│   │   ├── packs/       # Packs page
│   │   └── market/      # Market page
│   ├── components/      # Reusable components
│   │   ├── cricket-card.tsx
│   │   └── navigation.tsx
│   └── lib/            # Utilities and data
│       ├── data.ts
│       └── theme-provider.tsx
├── tailwind.config.js  # Tailwind configuration
└── package.json
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Design Features

### Cards
- Rounded corners with subtle shadows
- Hover effects with elevation and scaling
- Rarity-based color coding
- Responsive grid layout (4 cards per row on desktop)

### Navigation
- Sticky navigation bar
- Mobile-responsive menu
- Dark mode toggle
- Active page indicators

### Pages
- **Home**: Hero section with featured cards and call-to-action buttons
- **Packs**: Interactive pack opening with animation
- **Market**: Searchable and filterable card marketplace

## Card Rarities

- **Common** (Gray): 60% drop rate
- **Rare** (Blue): 25% drop rate  
- **Epic** (Purple): 12% drop rate
- **Legendary** (Gold): 3% drop rate

## Customization

### Adding New Cards
Edit `src/lib/data.ts` to add new cricket players:

```typescript
{
  id: '7',
  name: 'Player Name',
  image: '/assets/player-image.jpg',
  price: 999,
  rarity: 'legendary',
  position: 'Batsman',
  team: 'Team Name'
}
```

### Styling
The project uses a custom design system with CSS variables. Modify `src/app/globals.css` to change colors and styling.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available under the [MIT License](LICENSE). 