import { projectId, publicAnonKey } from './supabase/info';

const API_BASE = `https://${projectId}.supabase.co/functions/v1/make-server-30bcd8f7`;

const teams = [
  {
    name: "Thunder Wolves",
    logo: "🐺",
    region: "NA",
    country: "United States",
    rank: 1,
    wins: 24,
    losses: 3,
    winRate: 88.9,
    players: ["ShadowStrike", "ThunderBolt", "IceWolf", "FireStorm", "NightHawk"],
    achievements: ["World Champions 2024", "Regional Masters"],
    totalEarnings: "$450,000",
    game: "CS2",
    jerseyAvailable: true
  },
  {
    name: "Cyber Dragons",
    logo: "🐉",
    region: "EU",
    country: "Germany",
    rank: 1,
    wins: 28,
    losses: 2,
    winRate: 93.3,
    players: ["DragonSlayer", "CyberNinja", "StormBreaker", "Phoenix", "Viper"],
    achievements: ["Worlds 2024", "LEC Champions"],
    totalEarnings: "$520,000",
    game: "League of Legends",
    jerseyAvailable: true
  },
  {
    name: "Neon Legends",
    logo: "⚡",
    region: "APAC",
    country: "Japan",
    rank: 1,
    wins: 20,
    losses: 7,
    winRate: 74.1,
    players: ["NeonFlash", "LegendKiller", "Pulse", "Voltage", "Circuit"],
    achievements: ["Masters Tokyo 2024", "Pacific Champions"],
    totalEarnings: "$320,000",
    game: "Valorant",
    jerseyAvailable: true
  }
];

const players = [
  {
    name: "ShadowStrike",
    team: "Thunder Wolves",
    role: "Rifler",
    avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: {
      rating: 1.35,
      kd: 1.45,
      adr: 85.2,
      headshots: 52.8,
      clutches: 18,
      mvps: 12
    },
    earnings: "$85,000",
    rank: 1,
    game: "CS2"
  },
  {
    name: "DragonSlayer",
    team: "Cyber Dragons",
    role: "ADC",
    avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: {
      rating: 9.2,
      kd: 4.8,
      adr: 650,
      headshots: 0,
      clutches: 25,
      mvps: 18
    },
    earnings: "$120,000",
    rank: 1,
    game: "League of Legends"
  },
  {
    name: "NeonFlash",
    team: "Neon Legends",
    role: "Duelist",
    avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    stats: {
      rating: 1.22,
      kd: 1.31,
      adr: 168.4,
      headshots: 28.9,
      clutches: 12,
      mvps: 8
    },
    earnings: "$68,000",
    rank: 1,
    game: "Valorant"
  }
];

const products = [
  {
    name: "Thunder Wolves Home Jersey",
    team: "Thunder Wolves",
    basePrice: 89.99,
    originalBasePrice: 119.99,
    image: "https://images.unsplash.com/photo-1655089131279-8029e8a21ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.8,
    reviews: 124,
    category: "jersey",
    isNew: true,
    isBestseller: false,
    stock: 50
  },
  {
    name: "Cyber Dragons Championship Jersey",
    team: "Cyber Dragons",
    basePrice: 94.99,
    originalBasePrice: 129.99,
    image: "https://images.unsplash.com/photo-1655089131279-8029e8a21ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 89,
    category: "jersey",
    isNew: false,
    isBestseller: true,
    stock: 25
  },
  {
    name: "Neon Legends Gaming Mousepad",
    team: "Neon Legends",
    basePrice: 24.99,
    originalBasePrice: 34.99,
    image: "https://images.unsplash.com/photo-1709305317692-8987bb2dfd73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    reviews: 156,
    category: "accessory",
    isNew: false,
    isBestseller: true,
    stock: 100
  }
];

const tournaments = [
  {
    name: "World Championship 2024",
    game: "CS2",
    type: "international",
    country: "International",
    prizePool: "$2,000,000",
    startDate: "2024-12-15",
    endDate: "2024-12-22",
    teams: 16,
    status: "upcoming",
    location: "Los Angeles, USA"
  },
  {
    name: "League of Legends Worlds 2024",
    game: "League of Legends",
    type: "international",
    country: "International",
    prizePool: "$5,000,000",
    startDate: "2024-11-20",
    endDate: "2024-12-05",
    teams: 24,
    status: "ongoing",
    location: "Seoul, South Korea"
  },
  {
    name: "Valorant Masters Tokyo",
    game: "Valorant",
    type: "international",
    country: "Japan",
    prizePool: "$1,500,000",
    startDate: "2024-10-15",
    endDate: "2024-10-25",
    teams: 12,
    status: "completed",
    location: "Tokyo, Japan"
  }
];

export async function initializeData() {
  try {
    console.log('Initializing esports data...');

    // Initialize teams
    for (const team of teams) {
      await fetch(`${API_BASE}/teams`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(team)
      });
    }

    // Initialize players
    for (const player of players) {
      await fetch(`${API_BASE}/players`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(player)
      });
    }

    // Initialize products
    for (const product of products) {
      await fetch(`${API_BASE}/shop/products`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(product)
      });
    }

    // Initialize tournaments
    for (const tournament of tournaments) {
      await fetch(`${API_BASE}/tournaments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        },
        body: JSON.stringify(tournament)
      });
    }

    console.log('Data initialization completed successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error initializing data:', error);
    return { success: false, error };
  }
}