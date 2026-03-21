import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import {
  Trophy,
  Users,
  Star,
  Filter,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  Search,
} from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";

// Firebase
import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { MouseEvent } from "react";

interface TeamsProps {
  onNavigate?: (section: string) => void;
}

type GameDoc = {
  name?: string;
  description?: string;
  discription?: string;
  image?: string;
  genre?: string;
};

type TeamDoc = {
  name?: string;
  gameId?: string;
  country?: string;
  region?: string;
  rank?: number;
  logo?: string;
  stats?: {
    wins?: number;
    losses?: number;
    winRate?: number;
  };
  players?: string[];
  achievements?: string[];
  totalEarnings?: string;
  jerseyAvailable?: boolean;
};

export function Teams({ onNavigate }: TeamsProps) {
  const [selectedGameId, setSelectedGameId] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [searchQuery, setSearchQuery] = useState("");
  const [teamsData, setTeamsData] = useState<Record<string, any[]>>({});
  const [gamesData, setGamesData] = useState<Record<string, GameDoc>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const gamesSnap = await getDocs(collection(db, "games"));
        const gamesMap: Record<string, GameDoc> = {};

        gamesSnap.forEach((docSnap) => {
          gamesMap[docSnap.id] = docSnap.data() as GameDoc;
        });

        const teamsSnap = await getDocs(collection(db, "teams"));
        const grouped: Record<string, any[]> = {};

        teamsSnap.forEach((docSnap) => {
          const data = docSnap.data() as TeamDoc;
          const gameId = data.gameId?.trim();

          if (!gameId) return;

          if (!grouped[gameId]) grouped[gameId] = [];

          grouped[gameId].push({
            id: docSnap.id,
            name: data.name || "Unknown Team",
            logo: data.logo || "🎮",
            region: data.region || "NA",
            country: data.country || "Unknown",
            rank: data.rank || 0,
            wins: data.stats?.wins || 0,
            losses: data.stats?.losses || 0,
            winRate: data.stats?.winRate || 0,
            players: data.players || [],
            achievements: data.achievements || [],
            totalEarnings: data.totalEarnings || "$0",
            jerseyAvailable: data.jerseyAvailable ?? false,
          });
        });

        setGamesData(gamesMap);
        setTeamsData(grouped);
      } catch (error) {
        console.error("Error fetching Firebase data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const allCountries = [
    "All Countries",
    ...Array.from(
      new Set(
        Object.values(teamsData).flatMap((gameTeams) =>
          gameTeams
            .map((team) => team.country)
            .filter((country): country is string => Boolean(country))
        )
      )
    ),
  ];

  const getFilteredTeams = (gameTeams: any[]) => {
    let data = gameTeams;

    if (selectedCountry !== "All Countries") {
      data = data.filter((team) => team.country === selectedCountry);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      data = data.filter((team) => team.name.toLowerCase().includes(q));
    }

    return data;
  };

  const handleJerseyClick = () => {
    onNavigate?.("shop");
  };

  const handleGameEnter = (gameId: string) => {
    setSelectedGameId(gameId);
    setSelectedCountry("All Countries");
  };

  const handleBackToGames = () => {
    setSelectedGameId(null);
    setSelectedCountry("All Countries");
  };

  const TeamCard = ({ team }: { team: any }) => (
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
        <div className="bg-muted rounded-lg p-4">
          <h4 className="text-foreground mb-3 flex items-center">
            <Trophy className="w-4 h-4 text-yellow-500 mr-2" />
            Team Statistics
          </h4>

          <div className="mb-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-muted-foreground">Win Rate</span>
              <span className="text-green-500">{team.winRate}%</span>
            </div>
            <div className="w-full bg-background rounded-full h-2">
              <div
                className="bg-gradient-to-r from-green-500 to-blue-500 h-2 rounded-full"
                style={{ width: `${team.winRate}%` }}
              />
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>{team.wins} Wins</span>
              <span>{team.losses} Losses</span>
            </div>
          </div>

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

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-muted-foreground">Total Earnings</span>
          </div>
          <span className="text-foreground">{team.totalEarnings}</span>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-muted-foreground">Roster ({team.players.length} players)</span>
          </div>
          <div className="space-y-1">
            {team.players.slice(0, 3).map((player: string, index: number) => (
              <div key={index} className="text-sm text-foreground">
                {player}
              </div>
            ))}
            {team.players.length > 3 && (
              <div className="text-sm text-muted-foreground">
                +{team.players.length - 3} more players
              </div>
            )}
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-2">
            <Star className="w-4 h-4 text-purple-500" />
            <span className="text-muted-foreground">Recent Achievements</span>
          </div>
          <div className="space-y-1">
            {team.achievements.map((achievement: string, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-purple-500/20 text-purple-500 mr-1"
              >
                {achievement}
              </Badge>
            ))}
          </div>
        </div>

        {team.jerseyAvailable && (
          <div className="pt-3 border-t border-border">
            <Button
              onClick={handleJerseyClick}
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

const GameBox = ({
  gameId,
  gameData,
  teams: gameTeams,
}: {
  gameId: string;
  gameData?: GameDoc;
  teams: any[];
}) => {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  const gameName = gameData?.name || gameId;
  const gameDescription =
    gameData?.description ||
    gameData?.discription ||
    "Explore professional esports teams competing at the highest level.";

  const gameImage = gameData?.image || "";

  // ✅ SAME AS PLAYER UI LOGIC
  const totalTeams = gameTeams.length;

  const avgWinRate =
    totalTeams > 0
      ? Math.round(
          gameTeams.reduce((acc, t) => acc + (t.winRate || 0), 0) /
            totalTeams
        )
      : 0;

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const rotateY = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
    const rotateX = -((e.clientY - rect.top) / rect.height - 0.5) * 8;
    setTilt({ x: rotateX, y: rotateY });
  };

  return (
    <Card
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      onClick={() => handleGameEnter(gameId)}
      className="bg-gradient-to-br from-card to-muted border-border hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group overflow-hidden rounded-[26px]"
      style={{
        transform: hovered
          ? `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale(1.04)`
          : "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
        boxShadow: hovered
          ? "0 12px 30px rgba(0,0,0,0.45)"
          : "0 4px 12px rgba(0,0,0,0.25)",
      }}
    >
      <CardContent className="p-8">
        <div className="text-center">
          {/* ✅ IMAGE (same style as player page) */}
          <div className="w-24 h-24 mx-auto mb-4 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={gameImage}
              alt={gameName}
              className="w-full h-full object-cover"
            />
          </div>

          {/* ✅ TITLE */}
          <h2 className="text-2xl text-foreground mb-2">{gameName}</h2>

          {/* ✅ DESCRIPTION */}
          <p className="text-muted-foreground mb-6">{gameDescription}</p>

          {/* ✅ STATS (MATCH PLAYER PAGE EXACTLY) */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-3xl text-blue-500">{totalTeams}</div>
              <div className="text-muted-foreground text-sm">Teams</div>
            </div>
            <div>
              <div className="text-3xl text-green-500">
                {avgWinRate}%
              </div>
              <div className="text-muted-foreground text-sm">
                Avg Win Rate
              </div>
            </div>
          </div>

          {/* ✅ BUTTON */}
          <Button
            onClick={() => handleGameEnter(gameId)}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group-hover:scale-105 transition-transform"
          >
            <span className="mr-2">Enter</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};
  const GameDetailView = ({
    gameId,
    gameData,
    gameTeams,
  }: {
    gameId: string;
    gameData?: GameDoc;
    gameTeams: any[];
  }) => {
    const gameName = gameData?.name || gameId;
    const gameDescription =
      gameData?.description ||
      gameData?.discription ||
      "Explore professional esports teams competing at the highest level.";
    const gameImage = gameData?.image || gameLogos[gameName as keyof typeof gameLogos] || "";

    const filteredTeams = getFilteredTeams(gameTeams);

    return (
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <Button
            onClick={handleBackToGames}
            variant="outline"
            className="border-border text-muted-foreground hover:bg-muted hover:text-foreground"
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
                {allCountries.map((country) => (
                  <SelectItem
                    key={country}
                    value={country}
                    className="text-foreground hover:bg-muted"
                  >
                    {country}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <ImageWithFallback
            src={gameImage}
            alt={`${gameName} logo`}
            className="h-16 w-16 rounded-lg object-cover"
          />
          <div>
            <h1 className="text-4xl text-foreground">{gameName}</h1>
            <p className="text-lg text-muted-foreground">{gameDescription}</p>
          </div>
        </div>

        <div className="rounded-lg bg-card p-6">
          <h3 className="mb-4 text-foreground">League Statistics</h3>
          <div className="grid grid-cols-2 gap-6 text-center md:grid-cols-4">
            <div>
              <div className="text-3xl text-blue-500">{filteredTeams.length}</div>
              <div className="text-muted-foreground">Active Teams</div>
            </div>
            <div>
              <div className="text-3xl text-green-500">
                {filteredTeams.length > 0
                  ? Math.round(
                      filteredTeams.reduce((acc, team) => acc + team.winRate, 0) /
                        filteredTeams.length
                    )
                  : 0}
                %
              </div>
              <div className="text-muted-foreground">Avg Win Rate</div>
            </div>
            <div>
              <div className="text-3xl text-yellow-500">
                {filteredTeams.reduce(
                  (acc, team) => acc + (team.players?.length || 0),
                  0
                )}
              </div>
              <div className="text-muted-foreground">Total Players</div>
            </div>
            <div>
              <div className="text-3xl text-purple-500">
                {new Set(filteredTeams.map((team) => team.country)).size}
              </div>
              <div className="text-muted-foreground">Countries</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredTeams.map((team) => (
            <TeamCard key={team.id} team={team} />
          ))}
        </div>

        {filteredTeams.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-muted-foreground">
              No teams found for the selected country in {gameName}.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="min-h-screen bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mb-16 text-center">
          <h1 className="mb-4 text-5xl text-foreground">Professional Teams</h1>
          <p className="mx-auto max-w-2xl text-xl text-muted-foreground">
            {selectedGameId
              ? `Explore ${gamesData[selectedGameId]?.name || selectedGameId} teams competing at the highest level`
              : "Choose a game to explore professional esports teams competing at the highest level across all major titles"}
          </p>

          <div className="mx-auto mt-8 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search teams, players, or regions..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="border-border bg-muted pl-10"
              />
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="text-center">
                <div className="mb-4 h-32 w-32 animate-spin rounded-full border-b-2 border-blue-500" />
                <p className="text-muted-foreground">Loading teams data...</p>
              </div>
            </div>
          ) : selectedGameId ? (
            <GameDetailView
              gameId={selectedGameId}
              gameData={gamesData[selectedGameId]}
              gameTeams={teamsData[selectedGameId] || []}
            />
          ) : (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {Object.entries(teamsData).map(([gameId, gameTeams]) => (
                <GameBox
                  key={gameId}
                  gameId={gameId}
                  gameData={gamesData[gameId]}
                  teams={gameTeams as any[]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}