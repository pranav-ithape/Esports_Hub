import { Card, CardContent, CardHeader } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Trophy, Star, Users, Play, TrendingUp, ArrowRight, Target, Zap, Crown, Calendar, MapPin } from "lucide-react";
import { useState, useEffect } from "react";
import { playersApi, tournamentsApi } from "../utils/api";
import { testBackendConnection } from "../utils/testApi";
import { fallbackPlayersData, fallbackTournamentsData } from "../utils/fallbackData";
import { gameLogos, gameDescriptions } from "../utils/gameData";



interface HomeProps {
  onNavigate: (section: string) => void;
}

export function Home({ onNavigate }: HomeProps) {
  const [playersData, setPlayersData] = useState<any>({});
  const [tournamentsData, setTournamentsData] = useState<any[]>([]);
  const [selectedPlayersTab, setSelectedPlayersTab] = useState("CS2");
  const [selectedMatchesTab, setSelectedMatchesTab] = useState("CS2");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // First test backend connection
        try {
          await testBackendConnection();
          console.log('Backend connection successful');
        } catch (error) {
          console.error('Backend connection failed:', error);
          // Use fallback data if backend is not available
          setPlayersData(fallbackPlayersData);
          setTournamentsData(fallbackTournamentsData);
          return;
        }
        
        const [playersResponse, tournamentsResponse] = await Promise.all([
          playersApi.getAll(),
          tournamentsApi.getAll()
        ]);
        
        if (playersResponse.success) {
          setPlayersData(playersResponse.data);
        }
        
        if (tournamentsResponse.success) {
          setTournamentsData(tournamentsResponse.data);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        // Use fallback data on error
        setPlayersData(fallbackPlayersData);
        setTournamentsData(fallbackTournamentsData);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);



  const getTopPlayersByGame = (game: string) => {
    const gamePlayers = playersData[game] || [];
    return gamePlayers.slice(0, 3);
  };

  const getFeaturedMatchesByGame = (game: string) => {
    return tournamentsData
      .filter(tournament => tournament.game === game)
      .slice(0, 3);
  };

  const PlayerGameBox = ({ game, players }: { game: string; players: any[] }) => (
    <Card className="bg-gradient-to-br from-card to-muted border-border hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={gameLogos[game as keyof typeof gameLogos]}
              alt={`${game} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl text-foreground mb-2">{game}</h3>
          <p className="text-muted-foreground text-sm mb-4">{gameDescriptions[game as keyof typeof gameDescriptions]}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-2xl text-blue-500">{players.length}</div>
              <div className="text-muted-foreground text-xs">Players</div>
            </div>
            <div>
              <div className="text-2xl text-green-500">
                {players.length > 0 ? Math.round((players.reduce((acc, p) => acc + parseFloat(p.earnings.replace('$', '').replace(',', '')), 0) / players.length / 1000)) : 0}K
              </div>
              <div className="text-muted-foreground text-xs">Avg Earnings</div>
            </div>
          </div>

          <Button 
            onClick={() => {
              setSelectedPlayersTab(game);
            }}
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white group-hover:scale-105 transition-transform"
            size="sm"
          >
            <span className="mr-2">View Players</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const MatchGameBox = ({ game, matches }: { game: string; matches: any[] }) => (
    <Card className="bg-gradient-to-br from-card to-muted border-border hover:border-blue-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer group">
      <CardContent className="p-6">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-lg overflow-hidden">
            <ImageWithFallback
              src={gameLogos[game as keyof typeof gameLogos]}
              alt={`${game} logo`}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-xl text-foreground mb-2">{game}</h3>
          <p className="text-muted-foreground text-sm mb-4">{gameDescriptions[game as keyof typeof gameDescriptions]}</p>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-2xl text-orange-500">{matches.length}</div>
              <div className="text-muted-foreground text-xs">Tournaments</div>
            </div>
            <div>
              <div className="text-2xl text-purple-500">
                {matches.length > 0 ? `${Math.round(matches.reduce((acc, m) => acc + parseFloat(m.prizePool.replace(/[$,]/g, '')), 0) / 1000000)}M` : '0'}
              </div>
              <div className="text-muted-foreground text-xs">Prize Pool</div>
            </div>
          </div>

          <Button 
            onClick={() => {
              setSelectedMatchesTab(game);
            }}
            className="bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white group-hover:scale-105 transition-transform"
            size="sm"
          >
            <span className="mr-2">View Matches</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );

  const PlayerCard = ({ player }: { player: any }) => (
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
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-3">
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <div className="text-lg text-foreground">{player.stats.rating}</div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
          <div>
            <div className="text-lg text-green-500">{player.stats.kd}</div>
            <div className="text-xs text-muted-foreground">K/D</div>
          </div>
          <div>
            <div className="text-lg text-yellow-500">{player.stats.mvps}</div>
            <div className="text-xs text-muted-foreground">MVPs</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const TournamentCard = ({ tournament }: { tournament: any }) => (
    <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
      <div className="relative">
        <ImageWithFallback
          src={tournament.image}
          alt={tournament.name}
          className="w-full h-32 object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
        
        <div className="absolute top-2 left-2">
          <Badge className={tournament.status === 'live' ? 'bg-red-500 animate-pulse' : tournament.status === 'upcoming' ? 'bg-blue-500' : 'bg-gray-500'}>
            {tournament.status.toUpperCase()}
          </Badge>
        </div>



        <div className="absolute bottom-2 left-2">
          <div className="flex items-center space-x-1">
            <Trophy className="w-3 h-3 text-yellow-400" />
            <span className="text-yellow-400 text-sm">{tournament.prizePool}</span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="text-foreground mb-2 text-sm">{tournament.name}</h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            <span>{tournament.startDate} - {tournament.endDate}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-3 h-3 mr-1" />
            <span>{tournament.location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="w-3 h-3 mr-1" />
            <span>{tournament.participants} Teams</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-muted-foreground">Loading esports data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-20">
      {/* Top Players Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl mb-4 text-foreground">Top Players</h2>
              <p className="text-xl text-muted-foreground">
                The highest performing esports athletes this season
              </p>
            </div>
            <Button 
              variant="outline" 
              onClick={() => onNavigate('players')}
              className="border-border text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              View All Players
            </Button>
          </div>

          <Tabs value={selectedPlayersTab} onValueChange={setSelectedPlayersTab} className="max-w-6xl mx-auto">
            <TabsList className="bg-muted border-border mb-8">
              {Object.keys(playersData).map((game) => (
                <TabsTrigger key={game} value={game} className="data-[state=active]:bg-blue-600">
                  {game}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(playersData).map(([game, players]) => (
              <TabsContent key={game} value={game}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getTopPlayersByGame(game).map((player: any) => (
                    <PlayerCard key={player.id} player={player} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Featured Matches Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl mb-4 text-foreground">Featured Matches</h2>
              <p className="text-xl text-muted-foreground">
                Don't miss the biggest esports matches and tournaments
              </p>
            </div>
            <Button 
              variant="outline"
              onClick={() => onNavigate('tournaments')}
              className="border-border text-muted-foreground hover:text-foreground hover:bg-muted"
            >
              View All Tournaments
            </Button>
          </div>

          <Tabs value={selectedMatchesTab} onValueChange={setSelectedMatchesTab} className="max-w-6xl mx-auto">
            <TabsList className="bg-muted border-border mb-8">
              {Array.from(new Set(tournamentsData.map(t => t.game))).map((game) => (
                <TabsTrigger key={game} value={game} className="data-[state=active]:bg-orange-600">
                  {game}
                </TabsTrigger>
              ))}
            </TabsList>

            {Array.from(new Set(tournamentsData.map(t => t.game))).map((game) => (
              <TabsContent key={game} value={game}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {getFeaturedMatchesByGame(game).map((tournament: any) => (
                    <TournamentCard key={tournament.id} tournament={tournament} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </div>
  );
}