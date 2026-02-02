"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Users, Star, ShoppingBag, ArrowLeft } from "lucide-react"
import { teamsData, gameLogos, gameDescriptions } from "@/lib/data"

export default function TeamsPage() {
  const [selectedGame, setSelectedGame] = useState<string | null>(null)
  const games = Object.keys(teamsData)

  const TeamCard = ({ team }: { team: any }) => (
    <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center text-2xl">
              {team.logo || "?"}
            </div>
            <div>
              <h3 className="font-semibold text-foreground">{team.name}</h3>
              <div className="flex items-center gap-2">
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
        {/* Win Rate */}
        <div className="bg-muted rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-3 flex items-center">
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
              ></div>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground mt-1">
              <span>{team.wins} Wins</span>
              <span>{team.losses} Losses</span>
            </div>
          </div>
        </div>

        {/* Earnings */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Trophy className="w-4 h-4 text-yellow-500" />
            <span className="text-muted-foreground">Total Earnings</span>
          </div>
          <span className="font-semibold text-foreground">{team.totalEarnings}</span>
        </div>

        {/* Players */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-4 h-4 text-blue-500" />
            <span className="text-muted-foreground">
              Roster ({team.players.length} players)
            </span>
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

        {/* Achievements */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Star className="w-4 h-4 text-purple-500" />
            <span className="text-muted-foreground">Recent Achievements</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {team.achievements.map((achievement: string, index: number) => (
              <Badge
                key={index}
                variant="secondary"
                className="text-xs bg-purple-500/20 text-purple-500"
              >
                {achievement}
              </Badge>
            ))}
          </div>
        </div>

        {/* Shop Jersey */}
        {team.jerseyAvailable && (
          <div className="pt-3 border-t border-border">
            <Link href="/shop">
              <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop {team.name} Jersey
              </Button>
            </Link>
          </div>
        )}
      </CardContent>
    </Card>
  )

  const GameCard = ({ game }: { game: string }) => {
    const teams = teamsData[game] || []
    return (
      <Card
        className="bg-gradient-to-br from-card to-muted border-border hover:border-blue-500/50 transition-all duration-300 cursor-pointer group"
        onClick={() => setSelectedGame(game)}
      >
        <CardContent className="p-8 text-center">
          <div className="w-24 h-24 mx-auto mb-4 rounded-lg overflow-hidden bg-muted">
            <img
              src={gameLogos[game]}
              alt={game}
              className="w-full h-full object-cover"
            />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">{game}</h2>
          <p className="text-muted-foreground mb-6">
            {gameDescriptions[game] || "Esports competition"}
          </p>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <div className="text-3xl font-bold text-blue-500">{teams.length}</div>
              <div className="text-muted-foreground text-sm">Teams</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-500">
                {teams.reduce((acc: number, team: any) => acc + team.players.length, 0)}
              </div>
              <div className="text-muted-foreground text-sm">Players</div>
            </div>
          </div>

          <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
            View Teams
          </Button>
        </CardContent>
      </Card>
    )
  }

  if (selectedGame) {
    const teams = teamsData[selectedGame] || []
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="flex items-center gap-4 mb-8">
              <Button variant="outline" onClick={() => setSelectedGame(null)}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Games
              </Button>
              <h1 className="text-4xl font-bold text-foreground">{selectedGame} Teams</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {teams.map((team: any) => (
                <TeamCard key={team.id} team={team} />
              ))}
            </div>
          </div>
        </main>

        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 text-foreground">Esports Teams</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover professional esports teams from around the world. View rosters,
              statistics, and achievements.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {games.map((game) => (
              <GameCard key={game} game={game} />
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
