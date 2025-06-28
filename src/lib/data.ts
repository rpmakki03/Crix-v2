export interface CricketCard {
  id: string;
  name: string;
  image: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  position: string;
  team: string;
}

export const cricketCards: CricketCard[] = [
  {
    id: '1',
    name: 'Virat Kohli',
    image: '/assets/Virat.jpg',
    price: 999,
    rarity: 'legendary',
    position: 'Batsman',
    team: 'India'
  },
  {
    id: '2',
    name: 'Rohit Sharma',
    image: '/assets/Rohit.jpg',
    price: 999,
    rarity: 'legendary',
    position: 'Batsman',
    team: 'India'
  },
  {
    id: '3',
    name: 'Jasprit Bumrah',
    image: '/assets/Bumrah.jpg',
    price: 999,
    rarity: 'epic',
    position: 'Bowler',
    team: 'India'
  },
  {
    id: '4',
    name: 'Shubman Gill',
    image: '/assets/ShubhmanGill.jpg',
    price: 999,
    rarity: 'rare',
    position: 'Batsman',
    team: 'India'
  },
  {
    id: '5',
    name: 'Mitchell Starc',
    image: '/assets/Starc.jpg',
    price: 999,
    rarity: 'epic',
    position: 'Bowler',
    team: 'Australia'
  },
  {
    id: '6',
    name: 'Jasii',
    image: '/assets/Jasii.jpg',
    price: 999,
    rarity: 'common',
    position: 'All-rounder',
    team: 'Unknown'
  },
  {
    id: '7',
    name: 'MS Dhoni',
    image: '/assets/msdhoni.png',
    price: 999,
    rarity: 'legendary',
    position: 'Wicket-keeper',
    team: 'India'
  },
  {
    id: '8',
    name: 'Gautam Gambhir',
    image: '/assets/gautamgambhir.png',
    price: 999,
    rarity: 'epic',
    position: 'Batsman',
    team: 'India'
  },
  {
    id: '9',
    name: 'James Anderson',
    image: '/assets/james anderson.png',
    price: 999,
    rarity: 'epic',
    position: 'Bowler',
    team: 'England'
  }
];

export const packImage = '/assets/packs/image.png';

export function getRandomCards(count: number = 1): CricketCard[] {
  const shuffled = [...cricketCards].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
} 