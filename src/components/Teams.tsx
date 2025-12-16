import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Trophy, Users, Star, Filter, ShoppingBag, ArrowRight, ArrowLeft, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
//import { teamsApi } from "../utils/api";
import { fallbackTeamsData } from "../utils/fallbackData";
import { gameLogos } from "../utils/gameData";

const countries = [
  "All Countries", "Argentina", "Australia", "Austria", "Belgium", "Brazil", "Bulgaria", "Canada", "Chile", "China", "Colombia", "Croatia", "Czech Republic", "Denmark", "Estonia", "Finland", "France", "Germany", "Greece", "Hungary", "India", "Indonesia", "Italy", "Japan", "Latvia", "Lithuania", "Malaysia", "Mexico", "Netherlands", "Norway", "Peru", "Philippines", "Poland", "Portugal", "Romania", "Russia", "Serbia", "Singapore", "Slovakia", "Slovenia", "South Korea", "Spain", "Sweden", "Switzerland", "Thailand", "Turkey", "Ukraine", "United Kingdom", "United States", "Vietnam"
];



const gameDescriptions = {
  "Counter Strike": "Counter-Strike - The premier tactical FPS esport",
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
  "Minecraft": "Creative sandbox building competitions"
};

const teams = {
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
    },
    {
      id: 10,
      name: "Frost Giants",
      logo: "🧊",
      region: "EU",
      country: "Finland",
      rank: 3,
      wins: 19,
      losses: 8,
      winRate: 70.4,
      players: ["IceBreaker", "Glacier", "Permafrost", "Blizzard", "Arctic"],
      achievements: ["Nordic Championship 2024"],
      totalEarnings: "$280,000",
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
    },
    {
      id: 4,
      name: "Seoul Dynasty",
      logo: "👑",
      region: "KR",
      country: "South Korea",
      rank: 2,
      wins: 26,
      losses: 4,
      winRate: 86.7,
      players: ["KingSlayer", "Dynasty", "Seoul", "Emperor", "Crown"],
      achievements: ["LCK Champions 2024", "MSI Winners"],
      totalEarnings: "$480,000",
      jerseyAvailable: true
    },
    {
      id: 11,
      name: "Rising Sun",
      logo: "🌅",
      region: "APAC",
      country: "Japan",
      rank: 3,
      wins: 23,
      losses: 7,
      winRate: 76.7,
      players: ["Sunrise", "Dawn", "Hikari", "Akira", "Yuki"],
      achievements: ["LJL Champions 2024"],
      totalEarnings: "$340,000",
      jerseyAvailable: true
    }
  ],
  "Valorant": [
    {
      id: 5,
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
    },
    {
      id: 6,
      name: "Ghost Squad",
      logo: "👻",
      region: "NA",
      country: "Canada",
      rank: 2,
      wins: 18,
      losses: 9,
      winRate: 66.7,
      players: ["Phantom", "Specter", "Wraith", "Banshee", "Spirit"],
      achievements: ["VCT Americas Finals"],
      totalEarnings: "$280,000",
      jerseyAvailable: true
    },
    {
      id: 12,
      name: "Viper Strike",
      logo: "🐍",
      region: "EU",
      country: "France",
      rank: 3,
      wins: 16,
      losses: 11,
      winRate: 59.3,
      players: ["Venom", "Cobra", "Serpent", "Poison", "Strike"],
      achievements: ["EMEA Regional 2024"],
      totalEarnings: "$180,000",
      jerseyAvailable: true
    }
  ],
  "Dota 2": [
    {
      id: 13,
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
  ],
  "Overwatch 2": [
    {
      id: 14,
      name: "Storm Guardians",
      logo: "⚡",
      region: "NA",
      country: "United States",
      rank: 1,
      wins: 22,
      losses: 6,
      winRate: 78.6,
      players: ["StormShield", "Guardian", "ThunderHeal", "LightningFast", "TempestTank"],
      achievements: ["Overwatch League 2024", "Stage Champions"],
      totalEarnings: "$680,000",
      jerseyAvailable: true
    }
  ],
  "Rainbow Six Siege": [
    {
      id: 15,
      name: "Tactical Force",
      logo: "🛡️",
      region: "EU",
      country: "France",
      rank: 1,
      wins: 19,
      losses: 5,
      winRate: 79.2,
      players: ["TacMaster", "SiegeBreaker", "DefenseKing", "Operator", "Breach"],
      achievements: ["Six Invitational 2024", "European League"],
      totalEarnings: "$420,000",
      jerseyAvailable: true
    }
  ],
  "EA Sports FC": [
    {
      id: 16,
      name: "FC Champions",
      logo: "⚽",
      region: "EU",
      country: "Spain",
      rank: 1,
      wins: 25,
      losses: 3,
      winRate: 89.3,
      players: ["GoalMachine", "MidMaestro", "DefenderX", "SpeedWing", "KeepSafe"],
      achievements: ["EA Sports FC World Championship 2024"],
      totalEarnings: "$380,000",
      jerseyAvailable: true
    }
  ],
  "Hearthstone": [
    {
      id: 17,
      name: "Card Legends",
      logo: "🃏",
      region: "APAC",
      country: "South Korea",
      rank: 1,
      wins: 28,
      losses: 2,
      winRate: 93.3,
      players: ["CardMaster", "DeckBuilder", "SpellCaster", "LegendHunter", "ArcaneWiz"],
      achievements: ["World Championship 2024", "Masters Tour"],
      totalEarnings: "$180,000",
      jerseyAvailable: true
    }
  ],
  "StarCraft II": [
    {
      id: 18,
      name: "Starcraft Elite",
      logo: "⭐",
      region: "KR",
      country: "South Korea",
      rank: 1,
      wins: 24,
      losses: 1,
      winRate: 96.0,
      players: ["StarCommander", "MacroKing", "MicroMaster", "StrategicMind", "BaseBuild"],
      achievements: ["WCS Global Finals 2024", "GSL Champions"],
      totalEarnings: "$250,000",
      jerseyAvailable: true
    }
  ],
  "Street Fighter 6": [
    {
      id: 19,
      name: "Fighting Legends",
      logo: "👊",
      region: "APAC",
      country: "Japan",
      rank: 1,
      wins: 21,
      losses: 4,
      winRate: 84.0,
      players: ["CombatKing", "FightMaster", "SpecialMove", "CounterHit", "PerfectPlay"],
      achievements: ["Capcom Cup 2024", "EVO Champions"],
      totalEarnings: "$160,000",
      jerseyAvailable: true
    }
  ],
  "Tekken 8": [
    {
      id: 20,
      name: "Iron Fist Warriors",
      logo: "🥊",
      region: "KR",
      country: "South Korea",
      rank: 1,
      wins: 23,
      losses: 2,
      winRate: 92.0,
      players: ["IronFist", "TekkenKing", "ComboMaster", "JuggleEx", "FrameTrap"],
      achievements: ["Tekken World Tour 2024", "King of Iron Fist"],
      totalEarnings: "$140,000",
      jerseyAvailable: true
    }
  ],
  "Mobile Legends": [
    {
      id: 21,
      name: "Mobile Legends Pro",
      logo: "📱",
      region: "SEA",
      country: "Philippines",
      rank: 1,
      wins: 26,
      losses: 4,
      winRate: 86.7,
      players: ["MobileLegend", "MLBBPro", "JungleKing", "LordSlayer", "TowerPush"],
      achievements: ["M-Series World Championship 2024"],
      totalEarnings: "$320,000",
      jerseyAvailable: true
    }
  ],
  "Free Fire": [
    {
      id: 22,
      name: "Fire Squad",
      logo: "🔥",
      region: "LATAM",
      country: "Brazil",
      rank: 1,
      wins: 24,
      losses: 6,
      winRate: 80.0,
      players: ["FireMaster", "FreeBattle", "DropKing", "SurvivalPro", "BattleRoyale"],
      achievements: ["Free Fire World Series 2024"],
      totalEarnings: "$280,000",
      jerseyAvailable: true
    }
  ],
  "Wild Rift": [
    {
      id: 23,
      name: "Rift Legends",
      logo: "📲",
      region: "SEA",
      country: "Vietnam",
      rank: 1,
      wins: 22,
      losses: 3,
      winRate: 88.0,
      players: ["RiftMaster", "WildLegend", "MobileADC", "SupportKing", "JunglePro"],
      achievements: ["Wild Rift World Championship 2024"],
      totalEarnings: "$200,000",
      jerseyAvailable: true
    }
  ],
  "Fall Guys": [
    {
      id: 24,
      name: "Bean Squad",
      logo: "🫘",
      region: "NA",
      country: "United States",
      rank: 1,
      wins: 18,
      losses: 7,
      winRate: 72.0,
      players: ["BeanMaster", "FallGuy", "PartyKing", "ObstaclePro", "CrownWinner"],
      achievements: ["Fall Guys Championship 2024"],
      totalEarnings: "$85,000",
      jerseyAvailable: true
    }
  ],
  "Minecraft": [
    {
      id: 25,
      name: "Block Builders",
      logo: "⛏️",
      region: "EU",
      country: "Netherlands",
      rank: 1,
      wins: 20,
      losses: 5,
      winRate: 80.0,
      players: ["BlockMaster", "CraftKing", "BuildPro", "RedstoneWiz", "MinePro"],
      achievements: ["Minecraft Championship 2024", "Build Battle Champions"],
      totalEarnings: "$120,000",
      jerseyAvailable: true
    }
  ]
};

interface TeamsProps {
  onNavigate?: (section: string) => void;
}

export function Teams({ onNavigate }: TeamsProps) {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [searchQuery, setSearchQuery] = useState("");
  const [teamsData, setTeamsData] = useState<any>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const response = await teamsApi.getAll();
        if (response.success) {
          setTeamsData(response.data);
        }
      } catch (error) {
        console.error('Error fetching teams:', error);
        // Use fallback data when API fails
        setTeamsData(fallbackTeamsData);
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  const getFilteredTeams = (gameTeams: any[]) => {
    if (selectedCountry === "All Countries") {
      return gameTeams;
    }
    return gameTeams.filter(team => team.country === selectedCountry);
  };

  const handleJerseyClick = (teamName: string) => {
    if (onNavigate) {
      onNavigate('shop');
    }
  };

  const handleGameEnter = (game: string) => {
    setSelectedGame(game);
    setSelectedCountry("All Countries"); // Reset filter when entering game
  };

  const handleBackToGames = () => {
    setSelectedGame(null);
    setSelectedCountry("All Countries");
  };

  const TeamCard = ({ team, game }: { team: any; game: string }) => (
    <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="text-3xl">{team.logo}</div>
            <div>
              <h3 className="text-foreground mb-1">{team.name}</h3>
              <div className="flex items-center space-x-2">
                <Badge variant="outline" className="border-blue-500 text-blue-500">
                  #{team.rank} {team.region}
                </Badge>
                <Badge variant="secondary" className="bg-green-500/20 text-green-500">
                  {team.country}
                </Badge>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Team Statistics Section */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="text-foreground mb-3 flex items-center">
            <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
            Team Statistics
          </h4>
          
          {/* Win Rate */}
          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Win Rate</span>
              <span className="text-green-500">{team.winRate}%</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full" 
                style={{ width: `${team.winRate}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>{team.wins} Wins</span>
              <span>{team.losses} Losses</span>
            </div>
          </div>

          {/* Record Stats */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="text-center">
              <div className="text-foreground">{team.wins}</div>
              <div className="text-muted-foreground">Victories</div>
            </div>
            <div className="text-center">
              <div className="text-foreground">{team.losses}</div>
              <div className="text-muted-foreground">Defeats</div>
            </div>
          </div>
        </div>

        {/* Earnings */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-muted-foreground">Total Earnings</span>
          </div>
          <span className="text-foreground">{team.totalEarnings}</span>
        </div>

        {/* Players */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-muted-foreground">Roster ({team.players.length} players)</span>
          </div>
          <div className="space-y-1">
            {team.players.slice(0, 3).map((player: string, index: number) => (
              <div key={index} className="text-sm text-foreground">{player}</div>
            ))}
            {team.players.length > 3 && (
              <div className="text-sm text-muted-foreground">+{team.players.length - 3} more players</div>
            )}
          </div>
        </div>

        {/* Achievements */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-4 h-4 text-purple-500" />
            <span className="text-muted-foreground">Recent Achievements</span>
          </div>
          <div className="space-y-1">
            {team.achievements.map((achievement: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-xs bg-purple-500/20 text-purple-500 mr-1">
                {achievement}
              </Badge>
            ))}
          </div>
        </div>

        {/* Jersey Section */}
        {team.jerseyAvailable && (
          <div className="pt-3 border-t border-border">
            <Button 
              onClick={() => handleJerseyClick(team.name)}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
            >
              <ShoppingBag className="w-4 h-4 mr-2" />
              Shop {team.name} Jersey
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  const GameBox = ({ game, teams: gameTeams }: { game: string; teams: any[] }) => (
    <Card className="bg-gradient-to-br from-card to-muted border-border hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group">
      <CardContent className="p-8">
        <div className="text-center">
          <div className="mb-4">
            <ImageWithFallback
              src={gameLogos[game as keyof typeof gameLogos]}
              alt={`${game} logo`}
              className="w-24 h-24 mx-auto rounded-lg object-cover"
            />
          </div>
          <h2 className="text-2xl text-foreground mb-2">{game}</h2>
          <p className="text-muted-foreground mb-6">{gameDescriptions[game as keyof typeof gameDescriptions]}</p>
          
          {/* Game Stats */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-3xl text-blue-500">{gameTeams.length}</div>
              <div className="text-muted-foreground text-sm">Teams</div>
            </div>
            <div>
              <div className="text-3xl text-green-500">
                {gameTeams.reduce((acc, team) => acc + team.players.length, 0)}
              </div>
              <div className="text-muted-foreground text-sm">Players</div>
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

  const GameDetailView = ({ game, gameTeams }: { game: string; gameTeams: any[] }) => (
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
        
        <div className="flex items-center space-x-2">
          <Filter className="w-4 h-4 text-muted-foreground" />
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="w-56 bg-card border-border text-foreground">
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

      {/* Game header */}
      <div className="flex items-center space-x-4">
        <ImageWithFallback
          src={gameLogos[game as keyof typeof gameLogos]}
          alt={`${game} logo`}
          className="w-16 h-16 rounded-lg object-cover"
        />
        <div>
          <h1 className="text-4xl text-foreground">{game}</h1>
          <p className="text-muted-foreground text-lg">{gameDescriptions[game as keyof typeof gameDescriptions]}</p>
        </div>
      </div>
      
      {/* Game-specific stats overview */}
      <div className="bg-card rounded-lg p-6">
        <h3 className="text-foreground mb-4">League Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl text-blue-500">{getFilteredTeams(gameTeams).length}</div>
            <div className="text-muted-foreground">Active Teams</div>
          </div>
          <div>
            <div className="text-3xl text-green-500">
              {getFilteredTeams(gameTeams).length > 0 ? Math.round(getFilteredTeams(gameTeams).reduce((acc, team) => acc + team.winRate, 0) / getFilteredTeams(gameTeams).length) : 0}%
            </div>
            <div className="text-muted-foreground">Avg Win Rate</div>
          </div>
          <div>
            <div className="text-3xl text-yellow-500">
              {getFilteredTeams(gameTeams).reduce((acc, team) => acc + team.players.length, 0)}
            </div>
            <div className="text-muted-foreground">Total Players</div>
          </div>
          <div>
            <div className="text-3xl text-purple-500">
              {new Set(getFilteredTeams(gameTeams).map(team => team.country)).size}
            </div>
            <div className="text-muted-foreground">Countries</div>
          </div>
        </div>
      </div>

      {/* Teams Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {getFilteredTeams(gameTeams).map((team) => (
          <TeamCard key={team.id} team={team} game={game} />
        ))}
      </div>

      {getFilteredTeams(gameTeams).length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No teams found for the selected country in {game}.</p>
        </div>
      )}
    </div>
  );

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-4 text-foreground">Professional Teams</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {selectedGame 
              ? `Explore ${selectedGame} teams competing at the highest level`
              : "Choose a game to explore professional esports teams competing at the highest level across all major titles"
            }
          </p>
          
          {/* Search Bar */}
          <div className="max-w-md mx-auto mt-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search teams, players, or regions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-muted border-border"
              />
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mb-4"></div>
                <p className="text-muted-foreground">Loading teams data...</p>
              </div>
            </div>
          ) : selectedGame ? (
            <GameDetailView game={selectedGame} gameTeams={teamsData[selectedGame as keyof typeof teamsData] || []} />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {Object.entries(teamsData).map(([game, gameTeams]) => (
                <GameBox key={game} game={game} teams={gameTeams as any[]} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}