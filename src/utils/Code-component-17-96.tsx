// Fallback data for when backend is not available
export const fallbackTeamsData = {
  "CS2": [
    {
      id: 1,
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
      jerseyAvailable: true
    },
    {
      id: 2,
      name: "Nordic Storm",
      logo: "⚡",
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
      jerseyAvailable: true
    }
  ],
  "Valorant": [
    {
      id: 4,
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
      jerseyAvailable: true
    }
  ],
  "Dota 2": [
    {
      id: 5,
      name: "Immortal Gaming",
      logo: "👑",
      region: "EU",
      country: "Denmark",
      rank: 1,
      wins: 18,
      losses: 4,
      winRate: 81.8,
      players: ["ImmortalKing", "DotaMaster", "AegisHolder", "RuneMage", "CrystalMaiden"],
      achievements: ["The International 2024", "DPC Champions"],
      totalEarnings: "$2,100,000",
      jerseyAvailable: true
    }
  ]
};

export const fallbackPlayersData = {
  "CS2": [
    {
      id: 1,
      name: "ShadowStrike",
      team: "Thunder Wolves",
      role: "Rifler",
      country: "United States",
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
      socialMedia: {
        twitter: "ShadowStrike_CS",
        instagram: "shadowstrike_official",
        youtube: "ShadowStrikeGaming",
        twitch: "shadowstrike_ttv"
      }
    },
    {
      id: 2,
      name: "ThunderBolt",
      team: "Thunder Wolves",
      role: "AWPer",
      country: "United States",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 1.28,
        kd: 1.38,
        adr: 78.5,
        headshots: 48.2,
        clutches: 15,
        mvps: 10
      },
      earnings: "$72,000",
      rank: 2,
      socialMedia: {
        twitter: "ThunderBolt_CS",
        instagram: "thunderbolt_cs",
        youtube: "ThunderBoltCS",
        twitch: "thunderbolt_live"
      }
    }
  ],
  "League of Legends": [
    {
      id: 3,
      name: "DragonSlayer",
      team: "Cyber Dragons",
      role: "ADC",
      country: "Germany",
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
      socialMedia: {
        twitter: "DragonSlayer_LoL",
        instagram: "dragonslayer_pro",
        youtube: "DragonSlayerGaming",
        twitch: "dragonslayer_stream"
      }
    }
  ],
  "Valorant": [
    {
      id: 4,
      name: "NeonFlash",
      team: "Neon Legends",
      role: "Duelist",
      country: "Japan",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 1.42,
        kd: 1.52,
        adr: 165.8,
        headshots: 28.5,
        clutches: 22,
        mvps: 16
      },
      earnings: "$95,000",
      rank: 1,
      socialMedia: {
        twitter: "NeonFlash_VAL",
        instagram: "neonflash_valorant",
        youtube: "NeonFlashVAL",
        twitch: "neonflash_ttv"
      }
    }
  ]
};

export const fallbackTournamentsData = [
  {
    id: 1,
    name: "World Esports Championship",
    game: "CS2",
    prizePool: "$2,000,000",
    startDate: "2025-04-15",
    endDate: "2025-04-25",
    location: "Los Angeles, USA",
    participants: 32,
    status: "upcoming",
    type: "international",
    image: "https://images.unsplash.com/photo-1675310854573-c5c8e4089426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NTY0ODU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The ultimate global championship featuring the world's best teams"
  },
  {
    id: 2,
    name: "International League of Legends Masters",
    game: "League of Legends",
    prizePool: "$1,500,000",
    startDate: "2025-05-20",
    endDate: "2025-06-05",
    location: "Seoul, South Korea",
    participants: 24,
    status: "upcoming",
    type: "international",
    image: "https://images.unsplash.com/photo-1709305317692-8987bb2dfd73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMGNvbXBldGl0aXZlfGVufDF8fHx8MTc1NjQ1ODA2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Premier international competition for League of Legends teams"
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
    type: "international",
    image: "https://images.unsplash.com/photo-1675310854573-c5c8e4089426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NTY0ODU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The premier Valorant tournament featuring global champions"
  },
  {
    id: 4,
    name: "USA Esports Championship",
    game: "CS2",
    prizePool: "$500,000",
    startDate: "2025-03-15",
    endDate: "2025-03-20",
    location: "New York, USA",
    participants: 16,
    status: "live",
    type: "national",
    country: "United States",
    image: "https://images.unsplash.com/photo-1709305317692-8987bb2dfd73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMGNvbXBldGl0aXZlfGVufDF8fHx8MTc1NjQ1ODA2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "National championship for the best US teams"
  }
];

export const fallbackShopItems = [
  {
    id: 1,
    name: "Thunder Wolves Jersey",
    team: "Thunder Wolves",
    game: "CS2",
    price: 89.99,
    originalPrice: 109.99,
    image: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "jersey",
    inStock: true,
    countryOrigin: "United States",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Official Thunder Wolves team jersey made with premium materials"
  },
  {
    id: 2,
    name: "Cyber Dragons Jersey",
    team: "Cyber Dragons",
    game: "League of Legends", 
    price: 94.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    category: "jersey",
    inStock: true,
    countryOrigin: "Germany",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    description: "Official Cyber Dragons team jersey with dragon design"
  }
];