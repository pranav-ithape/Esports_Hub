import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Target, Zap, Shield, Crown, TrendingUp, ArrowRight, ArrowLeft, Filter, Search, Twitter, Instagram, Youtube, Twitch } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
//import { playersApi } from "../utils/api";
//import { fallbackPlayersData } from "../utils/fallbackData";
import { gameLogos } from "../utils/gameData";

const countries = [
  "All Countries", "Argentina", "Australia", "Austria", "Belgium", "Brazil", "Bulgaria", "Canada", "Chile", "China", "Colombia", "Croatia", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "India", "Indonesia", "Italy", "Japan", "Latvia", "Lithuania", "Malaysia", "Mexico", "Netherlands", "Norway", "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Korea", "Spain", "Sweden", "Switzerland", "Thailand", "Turkey", "Ukraine", "United Kingdom", "United States", "Vietnam"
].sort();




const gameDescriptions = {
  "Counter Strike": "Counter-Strike 2 - The premier tactical FPS esport",
  "League of Legends": "The world's most popular MOBA",
  "Valorant": "Tactical shooter with unique agent abilities",
  "Dota 2": "Complex strategy MOBA with massive prize pools",
  "Overwatch 2": "Team-based hero shooter",
  "Fortnite": "Battle royale with building mechanics",
  "Rocket League": "Vehicular soccer with high-speed action",
  "Apex Legends": "Character-based battle royale",
  "Call of Duty": "Fast-paced military FPS",
  "EA Sports FC": "Professional football simulation",
  "Rainbow Six Siege": "Tactical team-based FPS",
  "Hearthstone": "Digital collectible card game",
  "StarCraft II": "Real-time strategy masterpiece",
  "Street Fighter 6": "Legendary fighting game series",
  "Tekken 8": "3D fighting game tournament standard",
  "PUBG": "Original battle royale experience",
  "Mobile Legends": "Mobile MOBA phenomenon",
  "Free Fire": "Fast-paced mobile battle royale",
  "Wild Rift": "League of Legends mobile edition",
  "Fall Guys": "Colorful battle royale party game",
  
};

const playersByGame = {
  "Counter Strike": [
    {
      id: 1,
      name: "ApEX",
      originalname: "Dan Madesclaire",
      team: "Team Vitality",
      role: "In-game leader",
      country: "France",
      avatar: "/assets/player/apex.jpg",
      stats: {
        rating: 1.35,
        kd: 1.45,
        adr: 85.2,
        headshots: 52.8,
        clutches: 18,
        mvps: 123
      },
      earnings: "$213,801,585",
      rank: 1,
      socialMedia: {
        twitter: "Vitality_apEX",
        instagram: "apexcsgo",
        youtube: "apexcsgo",
        twitch: "apEX"
      }
    },
    {
      id: 2,
      name: "StormBringer",
      team: "Nordic Storm",
      role: "AWPer",
      country: "Sweden",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 1.28,
        kd: 1.38,
        adr: 82.7,
        headshots: 48.3,
        clutches: 15,
        mvps: 10
      },
      earnings: "$72,000",
      rank: 2,
      socialMedia: {
        twitter: "StormBringer_fps",
        instagram: "stormbringer_esports",
        youtube: "StormBringerGaming",
        twitch: "stormbringer_live"
      }
    },
    {
      id: 10,
      name: "IceBreaker",
      team: "Frost Giants",
      role: "Entry Fragger",
      country: "Finland",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 1.22,
        kd: 1.31,
        adr: 78.4,
        headshots: 44.7,
        clutches: 12,
        mvps: 8
      },
      earnings: "$58,000",
      rank: 3,
      socialMedia: {
        twitter: "IceBreaker_FN",
        instagram: "icebreaker_gaming",
        youtube: "IceBreakerProGaming",
        twitch: "icebreaker_official"
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
    },
    {
      id: 4,
      name: "KingSlayer",
      team: "Seoul Dynasty",
      role: "Mid",
      country: "South Korea",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 8.9,
        kd: 4.2,
        adr: 580,
        headshots: 0,
        clutches: 22,
        mvps: 15
      },
      earnings: "$110,000",
      rank: 2,
      socialMedia: {
        twitter: "KingSlayer_KR",
        instagram: "kingslayer_dynasty",
        youtube: "KingSlayerProGaming",
        twitch: "kingslayer_kr"
      }
    },
    {
      id: 11,
      name: "Sunrise",
      team: "Rising Sun",
      role: "Jungle",
      country: "Japan",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 8.4,
        kd: 3.9,
        adr: 520,
        headshots: 0,
        clutches: 19,
        mvps: 12
      },
      earnings: "$95,000",
      rank: 3,
      socialMedia: {
        twitter: "Sunrise_JP",
        instagram: "sunrise_rising",
        youtube: "SunriseGaming",
        twitch: "sunrise_japan"
      }
    }
  ],
  "Valorant": [
    {
      id: 5,
      name: "NeonFlash",
      team: "Neon Legends",
      role: "Duelist",
      country: "Japan",
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
      socialMedia: {
        twitter: "NeonFlash_VAL",
        instagram: "neonflash_legends",
        youtube: "NeonFlashGaming",
        twitch: "neonflash_val"
      }
    },
    {
      id: 6,
      name: "Phantom",
      team: "Ghost Squad",
      role: "Controller",
      country: "Canada",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 1.18,
        kd: 1.25,
        adr: 152.8,
        headshots: 25.2,
        clutches: 14,
        mvps: 9
      },
      earnings: "$61,000",
      rank: 2,
      socialMedia: {
        twitter: "Phantom_Ghost",
        instagram: "phantom_squad",
        youtube: "PhantomGhostGaming",
        twitch: "phantom_valorant"
      }
    },
    {
      id: 12,
      name: "Venom",
      team: "Viper Strike",
      role: "Initiator",
      country: "France",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 1.14,
        kd: 1.19,
        adr: 145.2,
        headshots: 22.8,
        clutches: 11,
        mvps: 7
      },
      earnings: "$54,000",
      rank: 3,
      socialMedia: {
        twitter: "Venom_Strike",
        instagram: "venom_viper",
        youtube: "VenomStrikeGaming",
        twitch: "venom_valorant"
      }
    }
  ],
  "Dota 2": [
    {
      id: 13,
      name: "ImmortalKing",
      team: "Immortal Gaming",
      role: "Carry",
      country: "Denmark",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 8.9,
        kd: 4.1,
        adr: 580,
        headshots: 0,
        clutches: 28,
        mvps: 22
      },
      earnings: "$350,000",
      rank: 1,
      socialMedia: {
        twitter: "ImmortalKing_Dota",
        instagram: "immortalking_dota2",
        youtube: "ImmortalKingDota",
        twitch: "immortalking_dota"
      }
    }
  ],
  "Overwatch 2": [
    {
      id: 14,
      name: "StormShield",
      team: "Storm Guardians",
      role: "Tank",
      country: "United States",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 1.24,
        kd: 1.18,
        adr: 145,
        headshots: 0,
        clutches: 15,
        mvps: 14
      },
      earnings: "$125,000",
      rank: 1,
      socialMedia: {
        twitter: "StormShield_OW",
        instagram: "stormshield_ow2",
        youtube: "StormShieldOW",
        twitch: "stormshield_ow"
      }
    }
  ],
    "Free Fire": [
    {
      id: 22,
      name: "FireMaster",
      team: "Fire Squad",
      role: "Rusher",
      country: "Brazil",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 1.18,
        kd: 1.85,
        adr: 125,
        headshots: 42.3,
        clutches: 16,
        mvps: 13
      },
      earnings: "$52,000",
      rank: 1,
      socialMedia: {
        twitter: "FireMaster_FF",
        instagram: "firemaster_freefire",
        youtube: "FireMasterFF",
        twitch: "firemaster_ff"
      }
    }
  ],
  "EA Sports FC": [
    {
      id: 16,
      name: "GoalMachine",
      team: "FC Champions",
      role: "Striker",
      country: "Spain",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 8.7,
        kd: 0,
        adr: 0,
        headshots: 0,
        clutches: 12,
        mvps: 16
      },
      earnings: "$76,000",
      rank: 1,
      socialMedia: {
        twitter: "GoalMachine_FC",
        instagram: "goalmachine_fifa",
        youtube: "GoalMachineFC",
        twitch: "goalmachine_fc"
      }
    }
  ],
    "Call of Duty":[

  ],
  
  /*"Rainbow Six Siege": [
    {
      id: 15,
      name: "TacMaster",
      team: "Tactical Force",
      role: "Entry Fragger",
      country: "France",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 1.31,
        kd: 1.42,
        adr: 88.5,
        headshots: 58.2,
        clutches: 19,
        mvps: 11
      },
      earnings: "$89,000",
      rank: 1,
      socialMedia: {
        twitter: "TacMaster_R6",
        instagram: "tacmaster_siege",
        youtube: "TacMasterR6",
        twitch: "tacmaster_r6"
      }
    }
  ],*/
  /*"Hearthstone": [
    {
      id: 17,
      name: "CardMaster",
      team: "Card Legends",
      role: "Control Player",
      country: "South Korea",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 9.1,
        kd: 0,
        adr: 0,
        headshots: 0,
        clutches: 0,
        mvps: 28
      },
      earnings: "$45,000",
      rank: 1,
      socialMedia: {
        twitter: "CardMaster_HS",
        instagram: "cardmaster_hs",
        youtube: "CardMasterHS",
        twitch: "cardmaster_hs"
      }
    }
  ],
  "StarCraft II": [
    {
      id: 18,
      name: "StarCommander",
      team: "Starcraft Elite",
      role: "Terran Player",
      country: "South Korea",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 9.4,
        kd: 0,
        adr: 0,
        headshots: 0,
        clutches: 0,
        mvps: 24
      },
      earnings: "$62,000",
      rank: 1,
      socialMedia: {
        twitter: "StarCommander_SC2",
        instagram: "starcommander_sc2",
        youtube: "StarCommanderSC2",
        twitch: "starcommander_sc2"
      }
    }
  ],
  "Street Fighter 6": [
    {
      id: 19,
      name: "CombatKing",
      team: "Fighting Legends",
      role: "Shoto Player",
      country: "Japan",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 8.8,
        kd: 0,
        adr: 0,
        headshots: 0,
        clutches: 0,
        mvps: 21
      },
      earnings: "$38,000",
      rank: 1,
      socialMedia: {
        twitter: "CombatKing_SF6",
        instagram: "combatking_sf6",
        youtube: "CombatKingSF6",
        twitch: "combatking_sf6"
      }
    }
  ],
  "Tekken 8": [
    {
      id: 20,
      name: "IronFist",
      team: "Iron Fist Warriors",
      role: "Mishima Player",
      country: "South Korea",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 8.6,
        kd: 0,
        adr: 0,
        headshots: 0,
        clutches: 0,
        mvps: 23
      },
      earnings: "$34,000",
      rank: 1,
      socialMedia: {
        twitter: "IronFist_T8",
        instagram: "ironfist_tekken8",
        youtube: "IronFistTekken",
        twitch: "ironfist_tekken"
      }
    }
  ],
  "Mobile Legends": [
    {
      id: 21,
      name: "MobileLegend",
      team: "Mobile Legends Pro",
      role: "Marksman",
      country: "Philippines",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnhlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 8.2,
        kd: 3.8,
        adr: 420,
        headshots: 0,
        clutches: 18,
        mvps: 19
      },
      earnings: "$58,000",
      rank: 1,
      socialMedia: {
        twitter: "MobileLegend_ML",
        instagram: "mobilelegend_mlbb",
        youtube: "MobileLegendMLBB",
        twitch: "mobilelegend_ml"
      }
    }
  ],*/

  /*"Wild Rift": [
    {
      id: 23,
      name: "RiftMaster",
      team: "Rift Legends",
      role: "ADC",
      country: "Vietnam",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 7.9,
        kd: 3.2,
        adr: 380,
        headshots: 0,
        clutches: 14,
        mvps: 15
      },
      earnings: "$42,000",
      rank: 1,
      socialMedia: {
        twitter: "RiftMaster_WR",
        instagram: "riftmaster_wildrift",
        youtube: "RiftMasterWR",
        twitch: "riftmaster_wr"
      }
    }
  ],
  "Fall Guys": [
    {
      id: 24,
      name: "BeanMaster",
      team: "Bean Squad",
      role: "Speed Runner",
      country: "United States",
      avatar: "https://images.unsplash.com/photo-1659259809484-355b1ead9656?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHhwcm9mZXNzaW9uYWwlMjBnYW1lcnxlbnwxfHx8fDE3NTY1Mzc1OTV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
      stats: {
        rating: 7.2,
        kd: 0,
        adr: 0,
        headshots: 0,
        clutches: 0,
        mvps: 18
      },
      earnings: "$28,000",
      rank: 1,
      socialMedia: {
        twitter: "BeanMaster_FG",
        instagram: "beanmaster_fallguys",
        youtube: "BeanMasterFG",
        twitch: "beanmaster_fg"
      }
    }
  ],*/

};

export function PlayerStats() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [searchQuery, setSearchQuery] = useState("");
  const [gameSearchQuery, setGameSearchQuery] = useState("");
  const [playersData, setPlayersData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Commented out API call to use only local static data for immediate reflection of changes
    /*
    const fetchPlayers = async () => {
      try {
        setLoading(true);
        const response = await playersApi.getAll();
        if (response.success) {
          setPlayersData(response.data);
        }
      } catch (error) {
        console.error('Error fetching players:', error);
        // Use fallback data when API fails
        setPlayersData(playersByGame);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
    */
    // Use only local static data
    setPlayersData(playersByGame);
    setLoading(false);
  }, []);

  const getFilteredPlayers = (gamePlayers: any[]) => {
    let filtered = gamePlayers;
    
    // Filter by country
    if (selectedCountry !== "All Countries") {
      filtered = filtered.filter(player => player.country === selectedCountry);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(player => 
        player.name.toLowerCase().includes(query) ||
        player.team.toLowerCase().includes(query) ||
        player.role.toLowerCase().includes(query) ||
        player.country.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const handleGameEnter = (game: string) => {
    setSelectedGame(game);
    setSelectedCountry("All Countries");
    setSearchQuery("");
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
    setSelectedCountry("All Countries");
    setSearchQuery("");
  };

  const PlayerCard = ({ player, game, key }: { player: any; game: string; key?: any }) => (
    <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center space-x-3">
          <div className="relative">
            <ImageWithFallback
              src={player.avatar}
              alt={player.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-xs text-black">#{player.rank}</span>
            </div>
          </div>
          <div>
            <h3 className="text-foreground">{player.name}</h3>
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="border-blue-500 text-blue-500 text-xs">
                {player.team}
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-500 text-xs">
                {player.role}
              </Badge>
            </div>
            <div className="mt-1">
              <Badge variant="secondary" className="bg-green-500/20 text-green-500 text-xs">
                {player.country}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Player Statistics Section */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="text-foreground mb-3 flex items-center">
            <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
            Player Statistics
          </h4>
          
          {/* Key Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-xl text-foreground">{player.stats.rating}</div>
              <div className="text-xs text-muted-foreground">Rating</div>
            </div>
            <div className="text-center">
              <div className="text-xl text-green-500">{player.stats.kd}</div>
              <div className="text-xs text-muted-foreground">K/D Ratio</div>
            </div>
          </div>

          {/* Detailed Stats */}
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center">
                <Target className="w-3 h-3 mr-1" />
                ADR
              </span>
              <span className="text-foreground">{player.stats.adr}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center">
                <Zap className="w-3 h-3 mr-1" />
                HS%
              </span>
              <span className="text-orange-500">
                {['League of Legends', 'Dota 2', 'Overwatch 2', 'Fortnite', 'Rocket League', 'Apex Legends', 'EA Sports FC', 'Hearthstone', 'StarCraft II', 'Street Fighter 6', 'Mobile Legends', 'Tekken 8', 'PUBG', 'Free Fire', 'Wild Rift'].includes(game)
                  ? (player.stats.headshots === 0 ? 'N/A' : `${player.stats.headshots}%`)
                  : `${player.stats.headshots}%`
                }
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center">
                <Shield className="w-3 h-3 mr-1" />
                Clutches
              </span>
              <span className="text-blue-500">{player.stats.clutches}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground flex items-center">
                <Crown className="w-3 h-3 mr-1" />
                MVPs
              </span>
              <span className="text-yellow-500">{player.stats.mvps}</span>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        {player.socialMedia && (
          <div className="pt-3 border-t border-border">
            <h5 className="text-muted-foreground text-sm mb-3">Social Media</h5>
            <div className="flex justify-between items-center">
              {player.socialMedia.twitter && (
                <a 
                  href={`https://twitter.com/${player.socialMedia.twitter}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  <Twitter className="w-4 h-4" />
                </a>
              )}
              {player.socialMedia.instagram && (
                <a 
                  href={`https://instagram.com/${player.socialMedia.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-pink-500 hover:text-pink-600 transition-colors"
                >
                  <Instagram className="w-4 h-4" />
                </a>
              )}
              {player.socialMedia.youtube && (
                <a 
                  href={`https://youtube.com/${player.socialMedia.youtube}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-red-500 hover:text-red-600 transition-colors"
                >
                  <Youtube className="w-4 h-4" />
                </a>
              )}
              {player.socialMedia.twitch && (
                <a 
                  href={`https://twitch.tv/${player.socialMedia.twitch}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-purple-500 hover:text-purple-600 transition-colors"
                >
                  <Twitch className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>
        )}

        {/* Earnings */}
        <div className="pt-3 border-t border-border">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Career Earnings</span>
            <span className="text-green-500">{player.earnings}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const GameBox = ({ game, players: gamePlayers, key }: { game: string; players: any[]; key?: string }) => (
    <Card className="bg-gradient-to-br from-card to-muted border-border hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group">
      <CardContent className="p-8">
        <div className="text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={gameLogos[game as keyof typeof gameLogos]}
              alt={`${game} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl text-foreground mb-2">{game}</h2>
          <p className="text-muted-foreground mb-6">{gameDescriptions[game as keyof typeof gameDescriptions]}</p>
          
          {/* Game Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-3xl text-blue-500">{gamePlayers.length}</div>
              <div className="text-muted-foreground text-sm">Players</div>
            </div>
            <div>
              <div className="text-3xl text-green-500">
                {gamePlayers.length > 0 ? Math.round((gamePlayers.reduce((acc, player) => acc + parseFloat(player.earnings.replace('$', '').replace(',', '')), 0) / gamePlayers.length / 1000)) : 0}K
              </div>
              <div className="text-muted-foreground text-sm">Avg Earnings</div>
            </div>
          </div>

          <Button 
            onClick={() => handleGameEnter(game)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group-hover:scale-105 transition-transform"
          >
            <span className="mr-2">Enter</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const GameDetailView = ({ game, gamePlayers }: { game: string; gamePlayers: any[] }) => (
    <div className="space-y-8">
      {/* Header with back button */}
      <div className="flex items-center justify-between">
        <Button 
          onClick={handleBackToGames}
          variant="outline" 
          className="border-border text-muted-foreground hover:text-foreground hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Games
        </Button>
      </div>

      {/* Game header */}
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-lg overflow-hidden">
          <ImageWithFallback
            src={gameLogos[game as keyof typeof gameLogos]}
            alt={`${game} logo`}
            className="w-full h-full object-cover"
          />
        </div>
        <div>
          <h1 className="text-4xl text-foreground">{game}</h1>
          <p className="text-muted-foreground text-lg">{gameDescriptions[game as keyof typeof gameDescriptions]}</p>
        </div>
      </div>

      {/* Centered Search and Filter Section */}
      <div className="text-center mb-8">
        <div className="max-w-2xl mx-auto">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search players, teams, roles..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 bg-card border-border text-foreground"
              />
            </div>
            
            {/* Country Filter */}
            <div className="flex items-center space-x-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-full sm:w-56 bg-card border-border text-foreground">
                  <SelectValue placeholder="Filter by country" />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {countries.map((country) => (
                    <SelectItem key={country} value={country} className="text-foreground hover:bg-muted">
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>
      
      {/* Game-specific stats overview */}
      <div className="bg-card rounded-lg p-6">
        <h3 className="text-foreground mb-4 flex items-center">
          <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
          Performance Overview
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl text-blue-500">{getFilteredPlayers(gamePlayers).length}</div>
            <div className="text-muted-foreground">Active Players</div>
          </div>
          <div>
            <div className="text-3xl text-green-500">
              {getFilteredPlayers(gamePlayers).length > 0 ? (getFilteredPlayers(gamePlayers).reduce((acc, player) => acc + parseFloat(player.earnings.replace('$', '').replace(',', '')), 0) / 1000).toFixed(0) : 0}K
            </div>
            <div className="text-muted-foreground">Total Earnings</div>
          </div>
          <div>
            <div className="text-3xl text-yellow-500">
              {getFilteredPlayers(gamePlayers).length > 0 ? Math.round(getFilteredPlayers(gamePlayers).reduce((acc, player) => acc + player.stats.rating, 0) / getFilteredPlayers(gamePlayers).length * 100) / 100 : 0}
            </div>
            <div className="text-muted-foreground">Avg Rating</div>
          </div>
          <div>
            <div className="text-3xl text-purple-500">
              {getFilteredPlayers(gamePlayers).reduce((acc, player) => acc + player.stats.mvps, 0)}
            </div>
            <div className="text-muted-foreground">Total MVPs</div>
          </div>
        </div>
      </div>

      {/* Players Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {getFilteredPlayers(gamePlayers).map((player) => (
          <PlayerCard player={player} game={game} key={player.id} />
        ))}
      </div>

      {getFilteredPlayers(gamePlayers).length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No players found for the selected filters in {game}.</p>
        </div>
      )}
    </div>
  );

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-4 text-foreground">Player Statistics</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {selectedGame 
              ? `Explore ${selectedGame} player statistics and performance metrics`
              : "Choose a game to track performance metrics and achievements of the world's top esports athletes with comprehensive game-specific statistics across all major titles"
            }
          </p>
        </div>

        {/* Search Bar for Games - Only show when not in specific game view */}
        {!selectedGame && (
          <div className="mb-16 flex justify-center">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                type="text"
                placeholder="Search games..."
                value={gameSearchQuery}
                onChange={(e) => setGameSearchQuery(e.target.value)}
                className="w-full pl-10 bg-card border-border text-foreground"
              />
            </div>
          </div>
        )}

        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-muted-foreground">Loading players data...</p>
              </div>
            </div>
          ) : selectedGame ? (
            <GameDetailView game={selectedGame} gamePlayers={playersData[selectedGame as keyof typeof playersData] || []} />
          ) : (
            <>

              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(playersData)
                  .filter(([game]) => 
                    gameSearchQuery.trim() === "" || 
                    game.toLowerCase().includes(gameSearchQuery.toLowerCase()) ||
                    (gameDescriptions[game as keyof typeof gameDescriptions] || "").toLowerCase().includes(gameSearchQuery.toLowerCase())
                  )
                  .map(([game, gamePlayers]) => (
                    <GameBox game={game} players={gamePlayers as any[]} key={game} />
                  ))}
              </div>
              
              {Object.entries(playersByGame)
                .filter(([game]) => 
                  gameSearchQuery.trim() === "" || 
                  game.toLowerCase().includes(gameSearchQuery.toLowerCase()) ||
                  (gameDescriptions[game as keyof typeof gameDescriptions] || "").toLowerCase().includes(gameSearchQuery.toLowerCase())
                ).length === 0 && gameSearchQuery.trim() !== "" && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">No games found for "{gameSearchQuery}".</p>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}