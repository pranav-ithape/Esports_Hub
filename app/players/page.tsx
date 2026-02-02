"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { fallbackPlayersData, gameLogos } from "@/lib/data"

export default function PlayersPage() {
  const [selectedGame, setSelectedGame] = useState("Counter Strike")
  const games = Object.keys(fallbackPlayersData)

  const PlayerCard = ({ player, rank }: { player: any; rank: number }) => (
    <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300">
      <CardHeader className="pb-4">
        <div className="flex items-center gap-4">
          <div className="relative">
            <img
              src={player.avatar}
              alt={player.name}
              className="w-16 h-16 rounded-full object-cover"
            />
            <div className="absolute -top-1 -right-1 w-7 h-7 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-bold text-black">#{rank}</span>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-bold text-foreground">{player.name}</h3>
            <div className="flex items-center gap-2 mt-1">
              <Badge variant="outline" className="border-blue-500 text-blue-500">
                {player.team}
              </Badge>
              <Badge variant="secondary" className="bg-purple-500/20 text-purple-500">
                {player.role}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mt-1">{player.country}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4 text-center bg-muted rounded-lg p-4">
          <div>
            <div className="text-2xl font-bold text-foreground">{player.stats.rating}</div>
            <div className="text-xs text-muted-foreground">Rating</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-500">{player.stats.kd}</div>
            <div className="text-xs text-muted-foreground">K/D</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-yellow-500">{player.stats.mvps}</div>
            <div className="text-xs text-muted-foreground">MVPs</div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">ADR</span>
            <span className="text-foreground">{player.stats.adr}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Clutches</span>
            <span className="text-foreground">{player.stats.clutches}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Headshots</span>
            <span className="text-foreground">{player.stats.headshots}%</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Earnings</span>
            <span className="text-green-500 font-semibold">{player.earnings}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 text-foreground">Top Players</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              The highest performing esports athletes this season. View statistics,
              achievements, and player profiles.
            </p>
          </div>

          <Tabs
            value={selectedGame}
            onValueChange={setSelectedGame}
            className="max-w-6xl mx-auto"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="bg-muted">
                {games.map((game) => (
                  <TabsTrigger
                    key={game}
                    value={game}
                    className="data-[state=active]:bg-blue-600 flex items-center gap-2"
                  >
                    <img
                      src={gameLogos[game]}
                      alt={game}
                      className="w-5 h-5 rounded"
                    />
                    <span className="hidden sm:inline">{game}</span>
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {games.map((game) => (
              <TabsContent key={game} value={game}>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {(fallbackPlayersData[game] || []).map((player: any, index: number) => (
                    <PlayerCard key={player.id} player={player} rank={index + 1} />
                  ))}
                </div>

                {(!fallbackPlayersData[game] || fallbackPlayersData[game].length === 0) && (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">
                      No player data available for {game}.
                    </p>
                  </div>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  )
}
