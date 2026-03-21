import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import {
  Target,
  Zap,
  Shield,
  Crown,
  TrendingUp,
  ArrowRight,
  ArrowLeft,
  Filter,
  Search,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";

import { db } from "../lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import type { MouseEvent } from "react";

type GameDoc = {
  name?: string;
  description?: string;
  discription?: string;
  image?: string;
  genre?: string;
};

type TeamDoc = {
  name?: string;
};

type PlayerDoc = {
  name?: string;
  nickname?: string;
  originalname?: string;
  gameId?: string;
  teamId?: string;
  country?: string;
  image?: string;
  avatar?: string;
  role?: string;
  rank?: number;
  stats?: {
    rating?: number;
    kd?: number;
    adr?: number;
    headshotPercent?: number;
    headshots?: number;
    clutches?: number;
    mvps?: number;
    earnings?: number;
  };
  socialMedia?: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    twitch?: string;
  };
};

interface PlayerCardType {
  id: string;
  name: string;
  originalname?: string;
  team: string;
  role: string;
  country: string;
  avatar: string;
  stats: {
    rating: number;
    kd: number;
    adr: number;
    headshots: number;
    clutches: number;
    mvps: number;
  };
  earnings: string;
  rank: number;
  socialMedia?: {
    twitter?: string;
    instagram?: string;
    youtube?: string;
    twitch?: string;
  };
}

const formatMoney = (value: number | string | undefined) => {
  const num = typeof value === "number" ? value : Number(value || 0);
  if (Number.isNaN(num)) return "$0";
  return `$${num.toLocaleString("en-US")}`;
};

export function PlayerStats() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [selectedCountry, setSelectedCountry] = useState("All Countries");
  const [searchQuery, setSearchQuery] = useState("");
  const [gameSearchQuery, setGameSearchQuery] = useState("");
  const [playersData, setPlayersData] = useState<Record<string, PlayerCardType[]>>({});
  const [gamesData, setGamesData] = useState<Record<string, GameDoc>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlayers = async () => {
      try {
        setLoading(true);

        const [gamesSnap, teamsSnap, playersSnap] = await Promise.all([
          getDocs(collection(db, "games")),
          getDocs(collection(db, "teams")),
          getDocs(collection(db, "players")),
        ]);

        const gamesMap: Record<string, GameDoc> = {};
        gamesSnap.forEach((docSnap) => {
          gamesMap[docSnap.id] = docSnap.data() as GameDoc;
        });

        const teamsMap: Record<string, TeamDoc> = {};
        teamsSnap.forEach((docSnap) => {
          teamsMap[docSnap.id] = docSnap.data() as TeamDoc;
        });

        const grouped: Record<string, PlayerCardType[]> = {};

        playersSnap.forEach((docSnap) => {
          const data = docSnap.data() as PlayerDoc;
          const gameId = data.gameId?.trim();

          if (!gameId) return;

          if (!grouped[gameId]) grouped[gameId] = [];

          const teamName =
            teamsMap[data.teamId || ""]?.name ||
            data.nickname ||
            data.originalname ||
            data.teamId ||
            "Unknown Team";

          grouped[gameId].push({
            id: docSnap.id,
            name: data.name || "Unknown Player",
            originalname: data.originalname || data.nickname || "",
            team: teamName,
            role: data.role || "Player",
            country: data.country || "Unknown",
            avatar: data.image || data.avatar || "",
            stats: {
              rating: Number(data.stats?.rating || 0),
              kd: Number(data.stats?.kd || 0),
              adr: Number(data.stats?.adr || 0),
              headshots: Number(
                data.stats?.headshotPercent ?? data.stats?.headshots ?? 0
              ),
              clutches: Number(data.stats?.clutches || 0),
              mvps: Number(data.stats?.mvps || 0),
            },
            earnings: formatMoney(data.stats?.earnings || 0),
            rank: Number(data.rank || 0),
            socialMedia: data.socialMedia || {},
          });
        });

        setGamesData(gamesMap);
        setPlayersData(grouped);
      } catch (error) {
        console.error("Error fetching players:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPlayers();
  }, []);

  const allCountries = [
    "All Countries",
    ...Array.from(
      new Set(
        Object.values(playersData).flatMap((gamePlayers) =>
          gamePlayers
            .map((player) => player.country)
            .filter((country): country is string => Boolean(country))
        )
      )
    ).sort(),
  ];

  const getFilteredPlayers = (gamePlayers: PlayerCardType[]) => {
    let filtered = gamePlayers;

    if (selectedCountry !== "All Countries") {
      filtered = filtered.filter((player) => player.country === selectedCountry);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (player) =>
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

  const PlayerCard = ({
    player,
    game,
  }: {
    player: PlayerCardType;
    game: string;
  }) => {
    const gameGenre = (gamesData[game]?.genre || "").toLowerCase();
    const showHeadshots = gameGenre.includes("fps") || gameGenre.includes("shooter");

    return (
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
          <div className="bg-muted rounded-lg p-4">
            <h4 className="text-foreground mb-3 flex items-center">
              <TrendingUp className="w-4 h-4 text-green-500 mr-2" />
              Player Statistics
            </h4>

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
                  {showHeadshots
                    ? player.stats.headshots === 0
                      ? "N/A"
                      : `${player.stats.headshots}%`
                    : "N/A"}
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

          <div className="pt-3 border-t border-border">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Career Earnings</span>
              <span className="text-green-500">{player.earnings}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  };

  const GameBox = ({
    gameId,
    gamePlayers,
  }: {
    gameId: string;
    gamePlayers: PlayerCardType[];
  }) => {
    const [hovered, setHovered] = useState(false);
    const [tilt, setTilt] = useState({ x: 0, y: 0 });

    const gameName = gamesData[gameId]?.name || gameId;
    const gameDescription =
      gamesData[gameId]?.description ||
      gamesData[gameId]?.discription ||
      "Explore professional esports athletes and performance metrics.";
    const gameImage = gamesData[gameId]?.image || "";

    const totalPlayers = gamePlayers.length;
    const avgEarnings =
      gamePlayers.length > 0
        ? Math.round(
            gamePlayers.reduce((acc, player) => {
              const numeric = Number(
                String(player.earnings).replace(/[^0-9.]/g, "")
              );
              return acc + (Number.isNaN(numeric) ? 0 : numeric);
            }, 0) / gamePlayers.length / 1000
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
            <div className="w-24 h-24 mx-auto mb-4 rounded-lg overflow-hidden">
              <ImageWithFallback
                src={gameImage}
                alt={`${gameName} logo`}
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-2xl text-foreground mb-2">{gameName}</h2>
            <p className="text-muted-foreground mb-6">{gameDescription}</p>

            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <div className="text-3xl text-blue-500">{totalPlayers}</div>
                <div className="text-muted-foreground text-sm">Players</div>
              </div>
              <div>
                <div className="text-3xl text-green-500">
                  {avgEarnings}K
                </div>
                <div className="text-muted-foreground text-sm">Avg Earnings</div>
              </div>
            </div>

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
    gamePlayers,
  }: {
    gameId: string;
    gamePlayers: PlayerCardType[];
  }) => {
    const gameName = gamesData[gameId]?.name || gameId;
    const gameDescription =
      gamesData[gameId]?.description ||
      gamesData[gameId]?.discription ||
      "Explore professional esports athletes and performance metrics.";
    const gameImage = gamesData[gameId]?.image || "";
    const gameGenre = (gamesData[gameId]?.genre || "").toLowerCase();
    const filteredPlayers = getFilteredPlayers(gamePlayers);

    return (
      <div className="space-y-8">
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

        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={gameImage}
              alt={`${gameName} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <div>
            <h1 className="text-4xl text-foreground">{gameName}</h1>
            <p className="text-muted-foreground text-lg">{gameDescription}</p>
          </div>
        </div>

        <div className="text-center mb-8">
          <div className="max-w-2xl mx-auto">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
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

              <div className="flex items-center space-x-2">
                <Filter className="w-4 h-4 text-muted-foreground" />
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-full sm:w-56 bg-card border-border text-foreground">
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
          </div>
        </div>

        <div className="bg-card rounded-lg p-6">
          <h3 className="text-foreground mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-500" />
            Performance Overview
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl text-blue-500">{filteredPlayers.length}</div>
              <div className="text-muted-foreground">Active Players</div>
            </div>
            <div>
              <div className="text-3xl text-green-500">
                {filteredPlayers.length > 0
                  ? (
                      filteredPlayers.reduce((acc, player) => {
                        const numeric = Number(
                          String(player.earnings).replace(/[^0-9.]/g, "")
                        );
                        return acc + (Number.isNaN(numeric) ? 0 : numeric);
                      }, 0) / 1000
                    ).toFixed(0)
                  : 0}
                K
              </div>
              <div className="text-muted-foreground">Total Earnings</div>
            </div>
            <div>
              <div className="text-3xl text-yellow-500">
                {filteredPlayers.length > 0
                  ? Math.round(
                      (filteredPlayers.reduce((acc, player) => acc + player.stats.rating, 0) /
                        filteredPlayers.length) *
                        100
                    ) / 100
                  : 0}
              </div>
              <div className="text-muted-foreground">Avg Rating</div>
            </div>
            <div>
              <div className="text-3xl text-purple-500">
                {filteredPlayers.reduce((acc, player) => acc + player.stats.mvps, 0)}
              </div>
              <div className="text-muted-foreground">Total MVPs</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredPlayers.map((player) => (
            <PlayerCard player={player} game={gameId} key={player.id} />
          ))}
        </div>

        {filteredPlayers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No players found for the selected filters in {gameName}.
            </p>
          </div>
        )}
      </div>
    );
  };

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-5xl mb-4 text-foreground">Player Statistics</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {selectedGame
              ? `Explore ${gamesData[selectedGame]?.name || selectedGame} player statistics and performance metrics`
              : "Choose a game to track performance metrics and achievements of the world's top esports athletes with comprehensive game-specific statistics across all major titles"}
          </p>
        </div>

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
            <GameDetailView
              gameId={selectedGame}
              gamePlayers={playersData[selectedGame] || []}
            />
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(playersData)
                  .filter(([gameId]) => {
                    const gameName = gamesData[gameId]?.name || gameId;
                    const desc =
                      gamesData[gameId]?.description ||
                      gamesData[gameId]?.discription ||
                      "";
                    return (
                      gameSearchQuery.trim() === "" ||
                      gameName.toLowerCase().includes(gameSearchQuery.toLowerCase()) ||
                      desc.toLowerCase().includes(gameSearchQuery.toLowerCase())
                    );
                  })
                  .map(([gameId, gamePlayers]) => (
                    <GameBox
                      gameId={gameId}
                      gamePlayers={gamePlayers}
                      key={gameId}
                    />
                  ))}
              </div>

              {Object.entries(playersData)
                .filter(([gameId]) => {
                  const gameName = gamesData[gameId]?.name || gameId;
                  const desc =
                    gamesData[gameId]?.description ||
                    gamesData[gameId]?.discription ||
                    "";
                  return (
                    gameSearchQuery.trim() === "" ||
                    gameName.toLowerCase().includes(gameSearchQuery.toLowerCase()) ||
                    desc.toLowerCase().includes(gameSearchQuery.toLowerCase())
                  );
                }).length === 0 &&
                gameSearchQuery.trim() !== "" && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No games found for "{gameSearchQuery}".
                    </p>
                  </div>
                )}
            </>
          )}
        </div>
      </div>
    </section>
  );
}