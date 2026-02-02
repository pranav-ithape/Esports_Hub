// Game logos and descriptions
export const gameLogos: Record<string, string> = {
  "Counter Strike": "/assets/gamelogos/cs2.png",
  "League of Legends": "/assets/gamelogos/lol.png",
  "Valorant": "/assets/gamelogos/valorant.png",
  "Dota 2": "/assets/gamelogos/dota.png",
  "Overwatch 2": "/assets/gamelogos/overwatch.png",
  "Fortnite": "/assets/gamelogos/fortnite.png",
  "Rocket League": "/assets/gamelogos/rocket.png",
  "Apex Legends": "/assets/gamelogos/apex.png",
  "Call of Duty": "/assets/gamelogos/cod.png",
  "PUBG": "/assets/gamelogos/pubg.png",
  "EA Sports FC": "/assets/gamelogos/ea.jpg",
  "Free Fire": "/assets/gamelogos/ff.jpg",
}

export const gameDescriptions: Record<string, string> = {
  "Counter Strike": "Counter-Strike 2 - The premier tactical FPS esport",
  "League of Legends": "The world's most popular MOBA",
  "Valorant": "Tactical shooter with unique agent abilities",
  "Dota 2": "Complex strategy MOBA with massive prize pools",
  "Overwatch 2": "Team-based hero shooter",
  "Fortnite": "Battle royale with building mechanics",
  "Rocket League": "Vehicular soccer with physics-based gameplay",
  "Apex Legends": "Battle royale with unique legend abilities",
  "Call of Duty": "Military-themed first-person shooter",
  "PUBG": "Battle royale with realistic gameplay"
}

// Country data with currency conversion
export interface Country {
  name: string
  currency: string
  symbol: string
  rate: number
}

export const countries: Country[] = [
  { name: "Argentina", currency: "ARS", symbol: "$", rate: 850 },
  { name: "Australia", currency: "AUD", symbol: "A$", rate: 1.55 },
  { name: "Austria", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Belgium", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Brazil", currency: "BRL", symbol: "R$", rate: 5.2 },
  { name: "Bulgaria", currency: "BGN", symbol: "лв", rate: 1.8 },
  { name: "Canada", currency: "CAD", symbol: "C$", rate: 1.35 },
  { name: "Chile", currency: "CLP", symbol: "$", rate: 920 },
  { name: "China", currency: "CNY", symbol: "¥", rate: 7.2 },
  { name: "Colombia", currency: "COP", symbol: "$", rate: 4200 },
  { name: "Croatia", currency: "HRK", symbol: "kn", rate: 6.9 },
  { name: "Czech Republic", currency: "CZK", symbol: "Kč", rate: 23 },
  { name: "Denmark", currency: "DKK", symbol: "kr", rate: 6.9 },
  { name: "Estonia", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Finland", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "France", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Germany", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Greece", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Hungary", currency: "HUF", symbol: "Ft", rate: 360 },
  { name: "India", currency: "INR", symbol: "₹", rate: 83 },
  { name: "Indonesia", currency: "IDR", symbol: "Rp", rate: 15800 },
  { name: "Italy", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Japan", currency: "JPY", symbol: "¥", rate: 148 },
  { name: "Latvia", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Lithuania", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Malaysia", currency: "MYR", symbol: "RM", rate: 4.7 },
  { name: "Mexico", currency: "MXN", symbol: "$", rate: 18 },
  { name: "Netherlands", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Norway", currency: "NOK", symbol: "kr", rate: 10.8 },
  { name: "Peru", currency: "PEN", symbol: "S/", rate: 3.7 },
  { name: "Philippines", currency: "PHP", symbol: "₱", rate: 56 },
  { name: "Poland", currency: "PLN", symbol: "zł", rate: 4.1 },
  { name: "Portugal", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Romania", currency: "RON", symbol: "lei", rate: 4.6 },
  { name: "Russia", currency: "RUB", symbol: "₽", rate: 92 },
  { name: "Serbia", currency: "RSD", symbol: "дин", rate: 108 },
  { name: "Singapore", currency: "SGD", symbol: "S$", rate: 1.35 },
  { name: "Slovakia", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Slovenia", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "South Korea", currency: "KRW", symbol: "₩", rate: 1320 },
  { name: "Spain", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Sweden", currency: "SEK", symbol: "kr", rate: 10.5 },
  { name: "Switzerland", currency: "CHF", symbol: "CHF", rate: 0.88 },
  { name: "Thailand", currency: "THB", symbol: "฿", rate: 36 },
  { name: "Turkey", currency: "TRY", symbol: "₺", rate: 30 },
  { name: "Ukraine", currency: "UAH", symbol: "₴", rate: 37 },
  { name: "United Kingdom", currency: "GBP", symbol: "£", rate: 0.79 },
  { name: "United States", currency: "USD", symbol: "$", rate: 1 },
  { name: "Vietnam", currency: "VND", symbol: "₫", rate: 24500 }
]

// Static products data
export const staticProducts = [
  {
    id: "1",
    name: "Godlike Esports 2025 Jersey",
    team: "Godlike Esports",
    base_price: 9.63,
    original_price: 13.99,
    image_url: "/assets/jersey/godlike25.jpg",
    rating: 0,
    reviews_count: 0,
    category: "jersey",
    is_new: true,
    is_bestseller: false
  },
  {
    id: "2",
    name: "S8ul 2025 Jersey",
    team: "S8ul",
    base_price: 9.14,
    original_price: 12.99,
    image_url: "/assets/jersey/soul25.jpg",
    rating: 0,
    reviews_count: 0,
    category: "jersey",
    is_new: false,
    is_bestseller: true
  },
  {
    id: "3",
    name: "Orangutan 2025 Jersey",
    team: "Orangutan",
    base_price: 9.02,
    original_price: 11.99,
    image_url: "/assets/jersey/orangutan25.jpg",
    rating: 0,
    reviews_count: 0,
    category: "jersey",
    is_new: true,
    is_bestseller: false
  },
  {
    id: "4",
    name: "Vero Forza Glide V2 (6 Pieces)",
    team: "Vero Forza",
    base_price: 5.72,
    original_price: 7.99,
    image_url: "/assets/accessory/veroglidev2.jpg",
    rating: 0,
    reviews_count: 0,
    category: "accessory",
    is_new: false,
    is_bestseller: true
  },
  {
    id: "5",
    name: "Hyper X Cloud II",
    team: "Hyper X",
    base_price: 90.35,
    original_price: 109.99,
    image_url: "/assets/accessory/hyperxcloud2.jpg",
    rating: 0,
    reviews_count: 0,
    category: "accessory",
    is_new: false,
    is_bestseller: false
  },
  {
    id: "6",
    name: "Logitech G PRO Wireless Gaming Mouse",
    team: "Logitech",
    base_price: 126.51,
    original_price: 199.99,
    image_url: "/assets/accessory/logitechgpro.jpg",
    rating: 0,
    reviews_count: 0,
    category: "accessory",
    is_new: true,
    is_bestseller: true
  },
  {
    id: "7",
    name: "Revenant XSparx 2024 Jersey",
    team: "Revenant XSparx",
    base_price: 11.07,
    original_price: 14.99,
    image_url: "/assets/jersey/rntx24.jpg",
    rating: 0,
    reviews_count: 0,
    category: "jersey",
    is_new: false,
    is_bestseller: true
  },
  {
    id: "8",
    name: "Godlike Esports 2024 Jersey",
    team: "Godlike Esports",
    base_price: 9.99,
    original_price: 15.99,
    image_url: "/assets/jersey/godlike24.jpg",
    rating: 0,
    reviews_count: 0,
    category: "jersey",
    is_new: true,
    is_bestseller: false
  },
  {
    id: "9",
    name: "Pro Vitality 2025 Esports Jersey",
    team: "Team Vitality",
    base_price: 8.99,
    original_price: 13.55,
    image_url: "/assets/jersey/vitality25.jpg",
    rating: 0,
    reviews_count: 0,
    category: "jersey",
    is_new: false,
    is_bestseller: true
  }
]

// Fallback players data
export const fallbackPlayersData: Record<string, any[]> = {
  "Counter Strike": [
    {
      id: 1,
      name: "ShadowStrike",
      team: "Thunder Wolves",
      role: "Rifler",
      country: "United States",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?w=400",
      stats: { rating: 1.35, kd: 1.45, adr: 85.2, headshots: 52.8, clutches: 18, mvps: 12 },
      earnings: "$85,000",
      rank: 1
    },
    {
      id: 2,
      name: "ThunderBolt",
      team: "Thunder Wolves",
      role: "AWPer",
      country: "United States",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?w=400",
      stats: { rating: 1.28, kd: 1.38, adr: 78.5, headshots: 48.2, clutches: 15, mvps: 10 },
      earnings: "$72,000",
      rank: 2
    },
    {
      id: 3,
      name: "NordicWolf",
      team: "Nordic Storm",
      role: "Entry Fragger",
      country: "Sweden",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?w=400",
      stats: { rating: 1.22, kd: 1.32, adr: 82.1, headshots: 55.3, clutches: 12, mvps: 8 },
      earnings: "$68,000",
      rank: 3
    }
  ],
  "League of Legends": [
    {
      id: 4,
      name: "DragonSlayer",
      team: "Cyber Dragons",
      role: "ADC",
      country: "Germany",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?w=400",
      stats: { rating: 9.2, kd: 4.8, adr: 650, headshots: 0, clutches: 25, mvps: 18 },
      earnings: "$120,000",
      rank: 1
    }
  ],
  "Valorant": [
    {
      id: 5,
      name: "NeonFlash",
      team: "Neon Legends",
      role: "Duelist",
      country: "Japan",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?w=400",
      stats: { rating: 1.42, kd: 1.52, adr: 165.8, headshots: 28.5, clutches: 22, mvps: 16 },
      earnings: "$95,000",
      rank: 1
    }
  ]
}

// Fallback tournaments data
export const fallbackTournamentsData = [
  {
    id: 1,
    name: "World Esports Championship",
    game: "Counter Strike",
    prizePool: "$2,000,000",
    startDate: "2025-04-15",
    endDate: "2025-04-25",
    location: "Los Angeles, USA",
    participants: 32,
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1675310854573-c5c8e4089426?w=800"
  },
  {
    id: 2,
    name: "International League Masters",
    game: "League of Legends",
    prizePool: "$1,500,000",
    startDate: "2025-05-20",
    endDate: "2025-06-05",
    location: "Seoul, South Korea",
    participants: 24,
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1709305317692-8987bb2dfd73?w=800"
  },
  {
    id: 3,
    name: "Valorant Champions Tour",
    game: "Valorant",
    prizePool: "$1,000,000",
    startDate: "2025-06-10",
    endDate: "2025-06-25",
    location: "Tokyo, Japan",
    participants: 16,
    status: "upcoming",
    image: "https://images.unsplash.com/photo-1675310854573-c5c8e4089426?w=800"
  }
]

// Teams data
export const teamsData: Record<string, any[]> = {
  "Counter Strike": [
    {
      id: 1,
      name: "Thunder Wolves",
      logo: "/assets/teams/thunder.png",
      region: "NA",
      country: "United States",
      rank: 1,
      wins: 24,
      losses: 3,
      winRate: 88.9,
      players: ["ShadowStrike", "ThunderBolt", "IceWolf", "FireStorm", "NightHawk"],
      achievements: ["World Champions 2024", "Regional Masters"],
      totalEarnings: "$450,000",
      jerseyAvailable: true
    },
    {
      id: 2,
      name: "Nordic Storm",
      logo: "/assets/teams/nordic.png",
      region: "EU",
      country: "Sweden",
      rank: 2,
      wins: 22,
      losses: 5,
      winRate: 81.5,
      players: ["StormBringer", "NordicWolf", "IceCold", "ThunderStrike", "Aurora"],
      achievements: ["EU Champions 2024", "Major Winners"],
      totalEarnings: "$380,000",
      jerseyAvailable: true
    }
  ],
  "League of Legends": [
    {
      id: 3,
      name: "Cyber Dragons",
      logo: "/assets/teams/cyber.png",
      region: "EU",
      country: "Germany",
      rank: 1,
      wins: 28,
      losses: 2,
      winRate: 93.3,
      players: ["DragonSlayer", "CyberNinja", "StormBreaker", "Phoenix", "Viper"],
      achievements: ["Worlds 2024", "LEC Champions"],
      totalEarnings: "$520,000",
      jerseyAvailable: true
    }
  ],
  "Valorant": [
    {
      id: 4,
      name: "Neon Legends",
      logo: "/assets/teams/neon.png",
      region: "APAC",
      country: "Japan",
      rank: 1,
      wins: 20,
      losses: 7,
      winRate: 74.1,
      players: ["NeonFlash", "LegendKiller", "Pulse", "Voltage", "Circuit"],
      achievements: ["Masters Tokyo 2024", "Pacific Champions"],
      totalEarnings: "$320,000",
      jerseyAvailable: true
    }
  ]
}
