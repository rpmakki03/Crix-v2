export interface CricketCard {
  id: string;
  name: string;
  image: string;
  price: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
  position: string;
  team: string;
  rating: number;
}

export interface Pack {
  id: string;
  name: string;
  price: number;
  image: string;
  description: string;
  cardCount: number;
  guaranteedRarity?: string;
  guaranteedCard?: string;
  excludeRarities?: string[];
}

export const cricketCards: CricketCard[] = [
  {
    id: '1',
    name: 'Virat Kohli',
    image: '/assets/Virat.jpg',
    price: 5000,
    rarity: 'legendary',
    position: 'Batsman',
    team: 'India',
    rating: 94
  },
  {
    id: '2',
    name: 'Rohit Sharma',
    image: '/assets/Rohit.jpg',
    price: 5000,
    rarity: 'legendary',
    position: 'Batsman',
    team: 'India',
    rating: 94
  },
  {
    id: '3',
    name: 'Jasprit Bumrah',
    image: '/assets/Bumrah.jpg',
    price: 1000,
    rarity: 'epic',
    position: 'Bowler',
    team: 'India',
    rating: 92
  },
  {
    id: '5',
    name: 'Mitchell Starc',
    image: '/assets/Starc.jpg',
    price: 1000,
    rarity: 'epic',
    position: 'Bowler',
    team: 'Australia',
    rating: 94
  },
  {
    id: '6',
    name: 'Jasii',
    image: '/assets/Jasii.jpg',
    price: 200,
    rarity: 'common',
    position: 'All-rounder',
    team: 'Unknown',
    rating: 92
  },
  {
    id: '7',
    name: 'MS Dhoni',
    image: '/assets/msdhoni.png',
    price: 5000,
    rarity: 'legendary',
    position: 'Wicket-keeper',
    team: 'India',
    rating: 95
  },
  {
    id: '8',
    name: 'Gautam Gambhir',
    image: '/assets/gautamgambhir.png',
    price: 1000,
    rarity: 'epic',
    position: 'Batsman',
    team: 'India',
    rating: 94
  },
  {
    id: '9',
    name: 'James Anderson',
    image: '/assets/james anderson.png',
    price: 1000,
    rarity: 'epic',
    position: 'Bowler',
    team: 'England',
    rating: 96
  },
  {
    id: '10',
    name: 'Virat Kohli',
    image: '/assets/India Baisc/Virat Kohli.jpg',
    price: 5000,
    rarity: 'legendary',
    position: 'Batsman',
    team: 'India',
    rating: 96
  },
  {
    id: '11',
    name: 'Rohit Sharma',
    image: '/assets/India Baisc/Rohit Sharma.jpg',
    price: 5000,
    rarity: 'legendary',
    position: 'Batsman',
    team: 'India',
    rating: 95
  },
  {
    id: '12',
    name: 'Jasprit Bumrah',
    image: '/assets/India Baisc/Jasprit Bumrah.jpg',
    price: 1000,
    rarity: 'epic',
    position: 'Bowler',
    team: 'India',
    rating: 93
  },
  {
    id: '14',
    name: 'KL Rahul',
    image: '/assets/India Baisc/K L Rahul.jpg',
    price: 500,
    rarity: 'rare',
    position: 'Wicket-keeper',
    team: 'India',
    rating: 89
  },
  {
    id: '15',
    name: 'Hardik Pandya',
    image: '/assets/India Baisc/Hardik Pandya.jpg',
    price: 500,
    rarity: 'rare',
    position: 'All-rounder',
    team: 'India',
    rating: 88
  },
  {
    id: '16',
    name: 'Kuldeep Yadav',
    image: '/assets/India Baisc/Kuldeep Yadav.jpg',
    price: 500,
    rarity: 'rare',
    position: 'Bowler',
    team: 'India',
    rating: 88
  },
  {
    id: '17',
    name: 'Shreyas Iyer',
    image: '/assets/India Baisc/Shreyas Iyer.jpg',
    price: 500,
    rarity: 'rare',
    position: 'Batsman',
    team: 'India',
    rating: 88
  },
  {
    id: '18',
    name: 'Siraj',
    image: '/assets/India Baisc/Siraj.jpg',
    price: 200,
    rarity: 'common',
    position: 'Bowler',
    team: 'India',
    rating: 88
  },
  {
    id: '19',
    name: 'Ravindra Jadeja',
    image: '/assets/India Baisc/Ravindra Jadeja.jpg',
    price: 200,
    rarity: 'common',
    position: 'All-rounder',
    team: 'India',
    rating: 87
  },
  {
    id: '20',
    name: 'Arshdeep Singh',
    image: '/assets/India Baisc/Arshdeep Singh.jpg',
    price: 200,
    rarity: 'common',
    position: 'Bowler',
    team: 'India',
    rating: 85
  },
  {
    id: '21',
    name: 'Glenn Philips',
    image: '/assets/New Zealand/Glenn Philips 82.jpg',
    price: 500,
    rarity: 'rare',
    position: 'Batsman',
    team: 'New Zealand',
    rating: 82
  },
  {
    id: '22',
    name: 'Shane Warne',
    image: '/assets/Legends/Shayne Warne 94.jpg',
    price: 5000,
    rarity: 'legendary',
    position: 'Bowler',
    team: 'Legends',
    rating: 94
  },
  {
    id: '23',
    name: 'Ben Stokes',
    image: '/assets/Match Edition/Ben Stokes 98.jpg',
    price: 5000,
    rarity: 'legendary',
    position: 'All-rounder',
    team: 'England',
    rating: 98
  },
  {
    id: '24',
    name: 'Ryan Rickelton',
    image: '/assets/South Africa/Ryan Rickelton 80.jpg',
    price: 200,
    rarity: 'common',
    position: 'Wicket-keeper',
    team: 'South Africa',
    rating: 80
  },
  {
    id: '25',
    name: 'Glenn Maxwell',
    image: '/assets/Match Edition/Maxwell 98.jpg',
    price: 5000,
    rarity: 'legendary',
    position: 'All-rounder',
    team: 'Australia',
    rating: 98
  },
  {
    id: '26',
    name: 'Yuvraj Singh',
    image: '/assets/Match Edition/Yuvraj Singh 98.jpg',
    price: 5000,
    rarity: 'legendary',
    position: 'All-rounder',
    team: 'India',
    rating: 98
  },
  {
    id: '27',
    name: 'Mitchell Johnson',
    image: '/assets/Match Edition/Mitchell Jhonson.jpg',
    price: 1000,
    rarity: 'epic',
    position: 'Bowler',
    team: 'Australia',
    rating: 98
  },
  {
    id: '28',
    name: 'Kumar Sangakkara',
    image: '/assets/Match Edition/Kumar Sangakara 95.jpg',
    price: 1000,
    rarity: 'epic',
    position: 'Wicket-keeper',
    team: 'Sri Lanka',
    rating: 95
  },
  {
    id: '29',
    name: 'Travis Head',
    image: '/assets/Austrailia/Travis Head 93.jpg',
    price: 1000,
    rarity: 'epic',
    position: 'Batsman',
    team: 'Australia',
    rating: 93
  },
  {
    id: '30',
    name: 'Chris Gayle',
    image: '/assets/Legends/Chris Gayle.jpg',
    price: 5000,
    rarity: 'legendary',
    position: 'Batsman',
    team: 'Legends',
    rating: 96
  },
  {
    id: '42',
    name: 'Sachin Tendulkar',
    image: '/assets/Legends/Sachin Tendulkar 100.jpg',
    price: 10000,
    rarity: 'legendary',
    position: 'Batsman',
    team: 'Legends',
    rating: 100
  },
  {
    id: '31',
    name: 'Shoaib Bahir',
    image: '/assets/England/Shoaib Bahir 76.jpg',
    price: 200,
    rarity: 'common',
    position: 'Bowler',
    team: 'England',
    rating: 76
  },
  {
    id: '32',
    name: 'Josh Tongue',
    image: '/assets/England/Josh Tongue 78.jpg',
    price: 200,
    rarity: 'common',
    position: 'Bowler',
    team: 'England',
    rating: 78
  },
  {
    id: '33',
    name: 'Brydon Carse',
    image: '/assets/England/Brydon Carse 76.jpg',
    price: 200,
    rarity: 'common',
    position: 'Bowler',
    team: 'England',
    rating: 76
  },
  {
    id: '34',
    name: 'Chris Woakes',
    image: '/assets/England/Chris Woakes 86.jpg',
    price: 1000,
    rarity: 'rare',
    position: 'All-rounder',
    team: 'England',
    rating: 86
  },
  {
    id: '35',
    name: 'Jamie Smith',
    image: '/assets/England/Jamie Smith 75.jpg',
    price: 200,
    rarity: 'common',
    position: 'Wicket-keeper',
    team: 'England',
    rating: 75
  },
  {
    id: '36',
    name: 'Harry Brook',
    image: '/assets/England/Harry Brook 83.jpg',
    price: 1000,
    rarity: 'rare',
    position: 'Batsman',
    team: 'England',
    rating: 83
  },
  {
    id: '37',
    name: 'Joe Root',
    image: '/assets/England/Joe Root 90.jpg',
    price: 1000,
    rarity: 'rare',
    position: 'Batsman',
    team: 'England',
    rating: 90
  },
  {
    id: '38',
    name: 'Ollie Pope',
    image: '/assets/England/Ollie Pope 82.jpg',
    price: 1000,
    rarity: 'rare',
    position: 'Batsman',
    team: 'England',
    rating: 82
  },
  {
    id: '39',
    name: 'Ben Duckett',
    image: '/assets/England/Ben Duckett 80.jpg',
    price: 200,
    rarity: 'common',
    position: 'Batsman',
    team: 'England',
    rating: 80
  },
  {
    id: '40',
    name: 'Zack Crawley',
    image: '/assets/England/Zack Crawley 78.jpg',
    price: 200,
    rarity: 'common',
    position: 'Batsman',
    team: 'England',
    rating: 78
  },
  {
    id: '41',
    name: 'Aiden Markram',
    image: '/assets/Match Edition/Aiden Markram 96.jpg',
    price: 1000,
    rarity: 'epic',
    position: 'Batsman',
    team: 'South Africa',
    rating: 96
  },
  {
    id: '42',
    name: 'Rohit Sharma',
    image: '/assets/Match Edition/Rohit Sharma 100.jpg',
    price: 5000,
    rarity: 'legendary',
    position: 'Batsman',
    team: 'India',
    rating: 100
  },
  {
    id: '43',
    name: 'Shubman Gill',
    image: '/assets/Match Edition/Shubman Gill 99.jpg',
    price: 5000,
    rarity: 'legendary',
    position: 'Batsman',
    team: 'India',
    rating: 99
  },
  {
    id: '44',
    name: 'M S Dhoni',
    image: '/assets/Legends/M S Dhoni 100.jpg',
    price: 10000,
    rarity: 'legendary',
    position: 'Wicket-keeper',
    team: 'Legends',
    rating: 100
  },
  {
    id: '45',
    name: 'M S Dhoni',
    image: '/assets/Match Edition/M S Dhoni 96.jpg',
    price: 5000,
    rarity: 'legendary',
    position: 'Wicket-keeper',
    team: 'India',
    rating: 96
  },
  {
    id: '46',
    name: 'M S Dhoni',
    image: '/assets/Match Edition/M S Dhoni 97.jpg',
    price: 5000,
    rarity: 'legendary',
    position: 'Wicket-keeper',
    team: 'India',
    rating: 97
  },
  {
    id: '47',
    name: 'M S Dhoni',
    image: '/assets/Match Edition/M S Dhoni 99.jpg',
    price: 5000,
    rarity: 'legendary',
    position: 'Wicket-keeper',
    team: 'India',
    rating: 99
  },
  {
    id: '48',
    name: 'M S Dhoni',
    image: '/assets/ms dhoni.jpg',
    price: 10000,
    rarity: 'legendary',
    position: 'Wicket-keeper',
    team: 'India',
    rating: 100
  },
  {
    id: '49',
    name: 'Mohd Shami',
    image: '/assets/Match Edition/Mohd Shami 99.jpg',
    price: 1000,
    rarity: 'epic',
    position: 'Bowler',
    team: 'India',
    rating: 99
  },
  {
    id: '50',
    name: 'Anil Kumble',
    image: '/assets/Match Edition/Anil Kumble 100.jpg',
    price: 5000,
    rarity: 'legendary',
    position: 'Bowler',
    team: 'India',
    rating: 100
  },
  {
    id: '51',
    name: 'Mitchell Starc',
    image: '/assets/Match Edition/Mitchell starc 98.jpg',
    price: 1000,
    rarity: 'epic',
    position: 'Bowler',
    team: 'Australia',
    rating: 98
  },
  {
    id: '52',
    name: 'James Anderson',
    image: '/assets/Match Edition/James Anderson 97.jpg',
    price: 1000,
    rarity: 'epic',
    position: 'Bowler',
    team: 'England',
    rating: 97
  },
  {
    id: '53',
    name: 'Kagiso Rabada',
    image: '/assets/Match Edition/Kagiso Rabada 98.jpg',
    price: 1000,
    rarity: 'epic',
    position: 'Bowler',
    team: 'South Africa',
    rating: 98
  },
  {
    id: '54',
    name: 'Stuart Broad',
    image: '/assets/Match Edition/Stuart Broad 99.jpg',
    price: 1000,
    rarity: 'epic',
    position: 'Bowler',
    team: 'England',
    rating: 99
  },
  {
    id: '55',
    name: 'Gautam Gambhir',
    image: '/assets/Match Edition/gautamgambhir.png',
    price: 1000,
    rarity: 'epic',
    position: 'Batsman',
    team: 'India',
    rating: 94
  }
];

export const packs: Pack[] = [
  {
    id: 'standard',
    name: 'Standard Pack',
    price: 99,
    image: '/assets/packs/standard.jpg',
    description: 'Guaranteed common player',
    cardCount: 1
  },
  {
    id: 'elite',
    name: 'Elite Pack',
    price: 399,
    image: '/assets/packs/basic.jpg',
    description: '2 cards, any country',
    cardCount: 2
  },
  {
    id: 'ultimate',
    name: 'Ultimate Pack',
    price: 999,
    image: '/assets/packs/Ultimate.jpg',
    description: '3 cards: 1 Legendary, 1 Epic, 1 Rare',
    cardCount: 3,
    // We'll handle the rarity guarantee in getRandomCards
  }
];

export function getRandomCards(count: number = 1, options?: {
  excludeRarities?: string[];
  guaranteedCard?: string;
}): CricketCard[] {
  // Special case for Ultimate Pack: 3 cards, one of each rarity
  if (count === 3 && !options?.excludeRarities && !options?.guaranteedCard) {
    // 0.1% chance for a 100-rated legendary card
    const legendary100 = cricketCards.filter(card => card.rarity === 'legendary' && card.rating === 100);
    const legendaryOther = cricketCards.filter(card => card.rarity === 'legendary' && card.rating <= 96);
    const epicCards = cricketCards.filter(card => card.rarity === 'epic');
    const rareCards = cricketCards.filter(card => card.rarity === 'rare');
    const pick = (arr: CricketCard[]) => arr[Math.floor(Math.random() * arr.length)];
    let legendaryCard;
    if (legendary100.length > 0 && Math.random() < 0.001) {
      legendaryCard = pick(legendary100);
    } else {
      legendaryCard = pick(legendaryOther);
    }
    return [legendaryCard, pick(epicCards), pick(rareCards)];
  }
  let availableCards = [...cricketCards];
  
  // Filter out excluded rarities
  if (options?.excludeRarities) {
    availableCards = availableCards.filter(card => 
      !options.excludeRarities!.includes(card.rarity)
    );
  }
  
  // Exclude cards with rating > 95, but for Ultimate, max is 96
  availableCards = availableCards.filter(card => {
    if (card.rarity === 'legendary') return card.rating <= 96;
    return card.rating <= 95;
  });
  
  // If there's a guaranteed card, include it
  if (options?.guaranteedCard) {
    const guaranteedCard = availableCards.find(card => card.name === options.guaranteedCard);
    if (guaranteedCard) {
      const remainingCards = availableCards.filter(card => card.name !== options.guaranteedCard);
      const shuffled = remainingCards.sort(() => 0.5 - Math.random());
      const additionalCards = shuffled.slice(0, count - 1);
      return [guaranteedCard, ...additionalCards];
    }
  }
  
  // Regular random selection
  const shuffled = availableCards.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

// Legacy function for backward compatibility
export const packImage = '/assets/packs/Ultimate.jpg'; 