"use client"

import Link from "next/link"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Star, Users, Calendar, MapPin } from "lucide-react"
import { useState } from "react"
import {
  fallbackPlayersData,
  fallbackTournamentsData,
  gameLogos,
  gameDescriptions,
} from "@/lib/data"

export function HomeContent() {
  const [selectedPlayersTab, setSelectedPlayersTab] = useState("Counter Strike")
  const [selectedMatchesTab, setSelectedMatchesTab] = useState("Counter Strike")

  const getTopPlayersByGame = (game: string) => {
    const gamePlayers = fallbackPlayersData[game] || []
    return gamePlayers.slice(0, 3)
  }

  const getFeaturedMatchesByGame = (game: string) => {
    return fallbackTournamentsData
      .filter((tournament) => tournament.game === game)
      .slice(0, 3)
  }

  const PlayerCard = ({ player }: { player: any }) => (
    <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img
              src={player.avatar}
              alt={player.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-black">#{player.rank}</span>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-foreground">{player.name}</h3>
            <div className="flex items-center gap-2">
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
            <div className="text-lg font-bold text-foreground">{player.stats.rating}</div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-500">{player.stats.kd}</div>
            <div className="text-xs text-muted-foreground">K/D</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-500">{player.stats.mvps}</div>
            <div className="text-xs text-muted-foreground">MVPs</div>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  const TournamentCard = ({ tournament }: { tournament: any }) => (
    <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={tournament.image}
          alt={tournament.name}
          className="w-full h-32 object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        <div className="absolute top-2 left-2">
          <Badge
            className={
              tournament.status === "live"
                ? "bg-red-500 animate-pulse"
                : tournament.status === "upcoming"
                ? "bg-blue-500"
                : "bg-gray-500"
            }
          >
            {tournament.status.toUpperCase()}
          </Badge>
        </div>

        <div className="absolute bottom-2 left-2">
          <div className="flex items-center gap-1">
            <Trophy className="w-3 h-3 text-yellow-400" />
            <span className="text-yellow-400 text-sm font-semibold">
              {tournament.prizePool}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-semibold text-foreground mb-2 text-sm line-clamp-1">
          {tournament.name}
        </h3>
        <div className="space-y-1 text-xs">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-3 h-3 mr-1" />
            <span>
              {tournament.startDate} - {tournament.endDate}
            </span>
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
  )

  const games = Object.keys(fallbackPlayersData)

  return (
    <div className="space-y-20">
      {/* Top Players Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-12">
            <div>
              <h2 className="text-4xl font-bold mb-4 text-foreground">Top Players</h2>
              <p className="text-xl text-muted-foreground">
                The highest performing esports athletes this season
              </p>
            </div>
            <Link href="/players">
              <Button
                variant="outline"
                className="border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                View All Players
              </Button>
            </Link>
          </div>

          <Tabs
            value={selectedPlayersTab}
            onValueChange={setSelectedPlayersTab}
            className="max-w-6xl mx-auto"
          >
            <TabsList className="bg-muted border-border mb-8">
              {games.map((game) => (
                <TabsTrigger
                  key={game}
                  value={game}
                  className="data-[state=active]:bg-blue-600"
                >
                  {game}
                </TabsTrigger>
              ))}
            </TabsList>

            {games.map((game) => (
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
              <h2 className="text-4xl font-bold mb-4 text-foreground">
                Featured Tournaments
              </h2>
              <p className="text-xl text-muted-foreground">
                {"Don't miss the biggest esports tournaments"}
              </p>
            </div>
            <Link href="/tournaments">
              <Button
                variant="outline"
                className="border-border text-muted-foreground hover:text-foreground hover:bg-muted"
              >
                View All Tournaments
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {fallbackTournamentsData.map((tournament) => (
              <TournamentCard key={tournament.id} tournament={tournament} />
            ))}
          </div>
        </div>
      </section>

      {/* Shop Preview */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Official Esports Merchandise
          </h2>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Get official jerseys, accessories, and gaming gear from your favorite
            esports teams. International shipping available.
          </p>
          <Link href="/shop">
            <Button
              size="lg"
              variant="secondary"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Shop Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  )
}
