import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Trophy, Calendar, Users, MapPin, Clock, Filter, Search, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { tournamentsApi } from "../utils/api";
import { fallbackTournamentsData } from "../utils/fallbackData";
import { gameLogos } from "../utils/gameData";



const countries = [
  "All Countries", "Argentina", "Australia", "Austria", "Belgium", "Brazil", "Bulgaria", "Canada", "Chile", "China", "Colombia", "Croatia", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "India", "Indonesia", "Italy", "Japan", "Latvia", "Lithuania", "Malaysia", "Mexico", "Netherlands", "Norway", "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Korea", "Spain", "Sweden", "Switzerland", "Thailand", "Turkey", "Ukraine", "United Kingdom", "United States", "Vietnam"
];

const gameLogos = {
  "CS2": "/assets/gamelogos/cs2.png",
  "League of Legends": "/assets/gamelogos/lol.png",
  "Valorant": "/assets/gamelogos/valorant.png",
  "Dota 2": "https://images.unsplash.com/photo-1624138149925-6c1dd2d60460?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3RhJTIwMiUyMGdhbWUlMjBsb2dvfGVufDF8fHx8MTc1Njc5OTgzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Overwatch 2": "https://images.unsplash.com/photo-1739288717700-c2673866705e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxvdmVyd2F0Y2glMjBnYW1lJTIwbG9nb3xlbnwxfHx8fDE3NTY3OTk4MzV8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Fortnite": "https://images.unsplash.com/photo-1634309490604-1270c0d486e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3J0bml0ZSUyMGdhbWUlMjBsb2dvfGVufDF8fHx8MTc1Njc5OTgzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Rocket League": "https://images.unsplash.com/photo-1580686933569-374000c1ce67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrZXQlMjBsZWFndWUlMjBnYW1lJTIwbG9nb3xlbnwxfHx8fDE3NTY3OTk4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Apex Legends": "https://images.unsplash.com/photo-1690233662564-f599cc764cca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGV4JTIwbGVnZW5kcyUyMGdhbWUlMjBsb2dvfGVufDF8fHx8MTc1Njc5OTg0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Call of Duty": "https://images.unsplash.com/photo-1678659372486-767c8777b9c7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYWxsJTIwb2YlMjBkdXR5JTIwZ2FtZSUyMGxvZ298ZW58MXx8fHwxNzU2Nzk5ODQ4fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "FIFA/EA FC": "https://images.unsplash.com/photo-1580686933569-374000c1ce67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2NrZXQlMjBsZWFndWUlMjBnYW1lJTIwbG9nb3xlbnwxfHx8fDE3NTY3OTk4NDF8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Rainbow Six Siege": "https://images.unsplash.com/photo-1690683790356-c1edb75e3df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudGVyJTIwc3RyaWtlJTIwMiUyMGdhbWUlMjBsb2dvfGVufDF8fHx8MTc1Njc5OTgyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Hearthstone": "https://images.unsplash.com/photo-1580686933569-374000c1ce67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFndWUlMjBvZiUyMGxlZ2VuZHMlMjBnYW1lJTIwbG9nb3xlbnwxfHx8fDE3NTY3OTk4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "StarCraft II": "https://images.unsplash.com/photo-1624138149925-6c1dd2d60460?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkb3RhJTIwMiUyMGdhbWUlMjBsb2dvfGVufDF8fHx8MTc1Njc5OTgzM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Street Fighter 6": "https://images.unsplash.com/photo-1634309490604-1270c0d486e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3J0bml0ZSUyMGdhbWUlMjBsb2dvfGVufDF8fHx8MTc1Njc5OTgzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Tekken 8": "https://images.unsplash.com/photo-1634309490604-1270c0d486e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmb3J0bml0ZSUyMGdhbWUlMjBsb2dvfGVufDF8fHx8MTc1Njc5OTgzOHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "PUBG": "https://images.unsplash.com/photo-1690683790356-c1edb75e3df7?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3VudGVyJTIwc3RyaWtlJTIwMiUyMGdhbWUlMjBsb2dvfGVufDF8fHx8MTc1Njc5OTgyM3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Mobile Legends": "https://images.unsplash.com/photo-1580686933569-374000c1ce67?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsZWFndWUlMjBvZiUyMGxlZ2VuZHMlMjBnYW1lJTIwbG9nb3xlbnwxfHx8fDE3NTY3OTk4MjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
  "Free Fire": "https://images.unsplash.com/photo-1690233662564-f599cc764cca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGV4JTIwbGVnZW5kcyUyMGdhbWUlMjBsb2dvfGVufDF8fHx8MTc1Njc5OTg0NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
};

const allTournaments = [
  // International Tournaments
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
    name: "Global Valorant Champions",
    game: "Valorant",
    prizePool: "$1,200,000",
    startDate: "2025-03-10",
    endDate: "2025-03-20",
    location: "Berlin, Germany",
    participants: 16,
    status: "live",
    type: "international",
    image: "https://images.unsplash.com/photo-1675310854573-c5c8e4089426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NTY0ODU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The most prestigious Valorant tournament worldwide"
  },
  {
    id: 4,
    name: "The International Dota 2",
    game: "Dota 2",
    prizePool: "$3,000,000",
    startDate: "2025-08-10",
    endDate: "2025-08-20",
    location: "Seattle, USA",
    participants: 18,
    status: "upcoming",
    type: "international",
    image: "https://images.unsplash.com/photo-1675310854573-c5c8e4089426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NTY0ODU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The biggest prize pool tournament in esports history"
  },
  {
    id: 5,
    name: "Overwatch World Cup",
    game: "Overwatch 2",
    prizePool: "$1,000,000",
    startDate: "2025-07-15",
    endDate: "2025-07-25",
    location: "Tokyo, Japan",
    participants: 20,
    status: "upcoming",
    type: "international",
    image: "https://images.unsplash.com/photo-1709305317692-8987bb2dfd73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMGNvbXBldGl0aXZlfGVufDF8fHx8MTc1NjQ1ODA2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Elite teams battle for Overwatch supremacy"
  },
  {
    id: 6,
    name: "Fortnite World Championship",
    game: "Fortnite",
    prizePool: "$4,000,000",
    startDate: "2025-06-12",
    endDate: "2025-06-15",
    location: "New York, USA",
    participants: 100,
    status: "upcoming",
    type: "international",
    image: "https://images.unsplash.com/photo-1675310854573-c5c8e4089426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NTY0ODU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "The ultimate battle royale championship"
  },

  // National Tournaments
  {
    id: 9,
    name: "North American CS2 Championship",
    game: "CS2",
    country: "United States",
    prizePool: "$500,000",
    startDate: "2025-03-25",
    endDate: "2025-04-05",
    location: "New York, USA",
    participants: 16,
    status: "upcoming",
    type: "national",
    image: "https://images.unsplash.com/photo-1709305317692-8987bb2dfd73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMGNvbXBldGl0aXZlfGVufDF8fHx8MTc1NjQ1ODA2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Premier North American championship for CS2 teams"
  },
  {
    id: 10,
    name: "European League Masters",
    game: "League of Legends",
    country: "Germany",
    prizePool: "$300,000",
    startDate: "2025-04-10",
    endDate: "2025-04-20",
    location: "Munich, Germany",
    participants: 12,
    status: "upcoming",
    type: "national",
    image: "https://images.unsplash.com/photo-1675310854573-c5c8e4089426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NTY0ODU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Top European teams compete for regional dominance"
  },
  {
    id: 11,
    name: "Korean Valorant Pro League",
    game: "Valorant",
    country: "South Korea",
    prizePool: "$200,000",
    startDate: "2025-03-15",
    endDate: "2025-03-25",
    location: "Seoul, South Korea",
    participants: 10,
    status: "live",
    type: "national",
    image: "https://images.unsplash.com/photo-1709305317692-8987bb2dfd73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMGNvbXBldGl0aXZlfGVufDF8fHx8MTc1NjQ1ODA2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Korea's premier Valorant competition"
  },
  {
    id: 12,
    name: "Brazilian Dota 2 Championship",
    game: "Dota 2",
    country: "Brazil",
    prizePool: "$150,000",
    startDate: "2025-05-01",
    endDate: "2025-05-10",
    location: "São Paulo, Brazil",
    participants: 8,
    status: "upcoming",
    type: "national",
    image: "https://images.unsplash.com/photo-1675310854573-c5c8e4089426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NTY0ODU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Brazil's biggest Dota 2 tournament"
  },
  {
    id: 13,
    name: "Japanese Street Fighter Championship",
    game: "Street Fighter 6",
    country: "Japan",
    prizePool: "$100,000",
    startDate: "2025-04-20",
    endDate: "2025-04-22",
    location: "Tokyo, Japan",
    participants: 64,
    status: "upcoming",
    type: "national",
    image: "https://images.unsplash.com/photo-1709305317692-8987bb2dfd73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMGNvbXBldGl0aXZlfGVufDF8fHx8MTc1NjQ1ODA2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Japan's premier fighting game tournament"
  },
  {
    id: 14,
    name: "UK Call of Duty Major",
    game: "Call of Duty",
    country: "United Kingdom",
    prizePool: "$250,000",
    startDate: "2025-03-28",
    endDate: "2025-03-31",
    location: "London, UK",
    participants: 12,
    status: "upcoming",
    type: "national",
    image: "https://images.unsplash.com/photo-1675310854573-c5c8e4089426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NTY0ODU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "UK's Call of Duty championship"
  },
  {
    id: 15,
    name: "Australian Rocket League Nationals",
    game: "Rocket League",
    country: "Australia",
    prizePool: "$80,000",
    startDate: "2025-04-15",
    endDate: "2025-04-18",
    location: "Sydney, Australia",
    participants: 16,
    status: "upcoming",
    type: "national",
    image: "https://images.unsplash.com/photo-1709305317692-8987bb2dfd73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMGNvbXBldGl0aXZlfGVufDF8fHx8MTc1NjQ1ODA2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Australia's premier Rocket League competition"
  },
  {
    id: 16,
    name: "Canadian Rainbow Six Championship",
    game: "Rainbow Six Siege",
    country: "Canada",
    prizePool: "$120,000",
    startDate: "2025-05-12",
    endDate: "2025-05-15",
    location: "Toronto, Canada",
    participants: 8,
    status: "upcoming",
    type: "national",
    image: "https://images.unsplash.com/photo-1675310854573-c5c8e4089426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NTY0ODU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Canada's tactical FPS championship"
  },
  {
    id: 17,
    name: "Philippine Mobile Legends Cup",
    game: "Mobile Legends",
    country: "Philippines",
    prizePool: "$90,000",
    startDate: "2025-06-05",
    endDate: "2025-06-08",
    location: "Manila, Philippines",
    participants: 12,
    status: "upcoming",
    type: "national",
    image: "https://images.unsplash.com/photo-1709305317692-8987bb2dfd73?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBzZXR1cCUyMGNvbXBldGl0aXZlfGVufDF8fHx8MTc1NjQ1ODA2MXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "Philippines' premier mobile MOBA tournament"
  },
  {
    id: 18,
    name: "French Overwatch Cup",
    game: "Overwatch 2",
    country: "France",
    prizePool: "$70,000",
    startDate: "2025-04-08",
    endDate: "2025-04-10",
    location: "Paris, France",
    participants: 8,
    status: "upcoming",
    type: "national",
    image: "https://images.unsplash.com/photo-1675310854573-c5c8e4089426?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3BvcnRzJTIwZ2FtaW5nJTIwdG91cm5hbWVudHxlbnwxfHx8fDE3NTY0ODU1MzN8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    description: "France's premier Overwatch tournament"
  }
];

export function Tournaments() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("international");
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [searchQuery, setSearchQuery] = useState("");
  const [tournamentsData, setTournamentsData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTournaments = async () => {
      try {
        setLoading(true);
        const response = await tournamentsApi.getAll();
        if (response.success) {
          setTournamentsData(response.data);
        }
      } catch (error) {
        console.error('Error fetching tournaments:', error);
        // Use fallback data when API fails
        setTournamentsData(fallbackTournamentsData);
      } finally {
        setLoading(false);
      }
    };

    fetchTournaments();
  }, []);

  const getFilteredTournaments = () => {
    let tournaments = tournamentsData.filter(tournament => tournament.type === activeTab);
    
    // Filter by game if a game is selected
    if (selectedGame) {
      tournaments = tournaments.filter(tournament => tournament.game === selectedGame);
    }
    
    // Filter by country for national tournaments
    if (activeTab === "national" && selectedCountry !== "All Countries") {
      tournaments = tournaments.filter(tournament => tournament.country === selectedCountry);
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      tournaments = tournaments.filter(tournament => 
        tournament.name.toLowerCase().includes(query) ||
        tournament.game.toLowerCase().includes(query) ||
        tournament.location.toLowerCase().includes(query) ||
        (tournament.country && tournament.country.toLowerCase().includes(query))
      );
    }
    
    return tournaments;
  };

  const getAvailableGames = () => {
    return Array.from(new Set(tournamentsData.map(tournament => tournament.game))).sort();
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'live':
        return 'bg-red-500 hover:bg-red-600 animate-pulse';
      case 'upcoming':
        return 'bg-blue-500 hover:bg-blue-600';
      case 'completed':
        return 'bg-gray-500 hover:bg-gray-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  const TournamentCard = ({ tournament }: { tournament: any }) => (
    <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
      <div className="relative">
        <ImageWithFallback
          src={tournament.image}
          alt={tournament.name}
          className="w-full h-48 object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        {/* Status Badge */}
        <div className="absolute top-4 left-4">
          <Badge className={getStatusColor(tournament.status)}>
            {tournament.status.toUpperCase()}
          </Badge>
        </div>

        {/* Type Badge */}
        <div className="absolute top-4 right-4">
          <Badge variant="outline" className="border-purple-500 text-purple-500 bg-background/50">
            {tournament.type === 'international' ? 'INTERNATIONAL' : 'NATIONAL'}
          </Badge>
        </div>

        {/* Game Logo */}
        <div className="absolute bottom-4 right-4 w-12 h-12 rounded-lg overflow-hidden bg-background/80 p-1">
          <ImageWithFallback
            src={gameLogos[tournament.game as keyof typeof gameLogos]}
            alt={`${tournament.game} logo`}
            className="w-full h-full object-cover rounded"
          />
        </div>

        {/* Game Type Badge */}
        <div className="absolute top-14 left-4">
          <Badge className="bg-orange-500 hover:bg-orange-600 text-white">
            {tournament.game}
          </Badge>
        </div>

        {/* Prize Pool */}
        <div className="absolute bottom-4 left-4">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400">{tournament.prizePool}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-foreground">{tournament.name}</h3>
          <Badge variant="outline" className="border-orange-500 text-orange-500 bg-orange-500/10">
            {tournament.game}
          </Badge>
        </div>
        <p className="text-muted-foreground text-sm mb-4">{tournament.description}</p>

        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span>{tournament.startDate} - {tournament.endDate}</span>
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{tournament.location}</span>
            </div>
            {tournament.country && (
              <Badge variant="secondary" className="bg-green-500/20 text-green-500">
                {tournament.country}
              </Badge>
            )}
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Users className="w-4 h-4" />
              <span>{tournament.participants} Teams</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <span>{tournament.status === 'live' ? 'Live Now' : 'Upcoming'}</span>
            </div>
          </div>
        </div>

        <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
          {tournament.status === 'live' ? 'Watch Live' : 'View Details'}
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-4 text-foreground">Esports Tournaments</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover the biggest esports tournaments happening around the world. From international championships to national leagues.
          </p>
        </div>

        {/* Game Categories */}
        <div className="mb-8">
          <h3 className="text-xl text-foreground mb-4 text-center">Select Game</h3>
          <div className="flex flex-wrap justify-center gap-3 mb-6">
            <Button 
              variant={selectedGame === null ? "default" : "outline"}
              onClick={() => setSelectedGame(null)}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              All Games
            </Button>
            {getAvailableGames().map((game) => (
              <Button 
                key={game}
                variant={selectedGame === game ? "default" : "outline"}
                onClick={() => setSelectedGame(game)}
                className={selectedGame === game ? "bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700" : ""}
              >
                <div className="flex items-center space-x-2">
                  <ImageWithFallback
                    src={gameLogos[game as keyof typeof gameLogos]}
                    alt={`${game} logo`}
                    className="w-4 h-4 rounded object-cover"
                  />
                  <span>{game}</span>
                </div>
              </Button>
            ))}
          </div>
        </div>

        {/* Tournament Categories */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
            <TabsList className="bg-muted border-border">
              <TabsTrigger value="international" className="data-[state=active]:bg-blue-600">
                <Trophy className="w-4 h-4 mr-2" />
                International
              </TabsTrigger>
              <TabsTrigger value="national" className="data-[state=active]:bg-green-600">
                <MapPin className="w-4 h-4 mr-2" />
                National
              </TabsTrigger>
            </TabsList>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search tournaments, games..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-10 bg-card border-border text-foreground"
                />
              </div>
              
              {/* Country Filter - Only show for National tournaments */}
              {activeTab === "national" && (
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
              )}
            </div>
          </div>

          <TabsContent value={activeTab} className="mt-8">
            {loading ? (
              <div className="flex items-center justify-center py-20">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mb-4"></div>
                  <p className="text-muted-foreground">Loading tournaments...</p>
                </div>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {getFilteredTournaments().map((tournament) => (
                    <TournamentCard key={tournament.id} tournament={tournament} />
                  ))}
                </div>
                
                {getFilteredTournaments().length === 0 && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">No tournaments found for the current filters.</p>
                  </div>
                )}
              </>
            )}
          </TabsContent>
        </Tabs>

        {/* Tournament Stats */}
        <div className="mt-20">
          <h2 className="text-3xl text-foreground mb-8 text-center">Tournament Overview</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="bg-gradient-to-r from-blue-600 to-blue-700 border-0 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">
                  {tournamentsData.filter(t => t.type === 'international').length}
                </div>
                <div className="text-blue-100">International Tournaments</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-600 to-green-700 border-0 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">
                  {tournamentsData.filter(t => t.type === 'national').length}
                </div>
                <div className="text-green-100">National Tournaments</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-600 to-purple-700 border-0 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">
                  ${Math.round(tournamentsData.reduce((sum, t) => sum + parseFloat(t.prizePool.replace(/[$,]/g, '')), 0) / 1000000)}M
                </div>
                <div className="text-purple-100">Total Prize Pool</div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-orange-600 to-orange-700 border-0 text-white">
              <CardContent className="p-6 text-center">
                <div className="text-3xl mb-2">
                  {allTournaments.filter(t => t.status === 'live').length}
                </div>
                <div className="text-orange-100">Live Now</div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}