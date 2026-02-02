"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Trophy, Calendar, MapPin, Users, Play } from "lucide-react"
import { fallbackTournamentsData } from "@/lib/data"

export default function TournamentsPage() {
  const [filter, setFilter] = useState("all")

  const getFilteredTournaments = () => {
    switch (filter) {
      case "live":
        return fallbackTournamentsData.filter((t) => t.status === "live")
      case "upcoming":
        return fallbackTournamentsData.filter((t) => t.status === "upcoming")
      case "completed":
        return fallbackTournamentsData.filter((t) => t.status === "completed")
      default:
        return fallbackTournamentsData
    }
  }

  const TournamentCard = ({ tournament }: { tournament: any }) => (
    <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
      <div className="relative">
        <img
          src={tournament.image}
          alt={tournament.name}
          className="w-full h-48 object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>

        <div className="absolute top-4 left-4 flex gap-2">
          <Badge
            className={
              tournament.status === "live"
                ? "bg-red-500 animate-pulse"
                : tournament.status === "upcoming"
                ? "bg-blue-500"
                : "bg-gray-500"
            }
          >
            {tournament.status === "live" && <Play className="w-3 h-3 mr-1" />}
            {tournament.status.toUpperCase()}
          </Badge>
          <Badge variant="outline" className="bg-black/50 text-white border-white/30">
            {tournament.game}
          </Badge>
        </div>

        <div className="absolute bottom-4 left-4 right-4">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-yellow-400" />
            <span className="text-xl font-bold text-yellow-400">
              {tournament.prizePool}
            </span>
          </div>
        </div>
      </div>

      <CardContent className="p-6">
        <h3 className="text-xl font-bold text-foreground mb-4 line-clamp-2">
          {tournament.name}
        </h3>

        <div className="space-y-3 mb-6">
          <div className="flex items-center text-muted-foreground">
            <Calendar className="w-4 h-4 mr-3" />
            <span>
              {tournament.startDate} - {tournament.endDate}
            </span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <MapPin className="w-4 h-4 mr-3" />
            <span>{tournament.location}</span>
          </div>
          <div className="flex items-center text-muted-foreground">
            <Users className="w-4 h-4 mr-3" />
            <span>{tournament.participants} Teams Participating</span>
          </div>
        </div>

        <div className="flex gap-3">
          {tournament.status === "live" ? (
            <Button className="flex-1 bg-red-500 hover:bg-red-600">
              <Play className="w-4 h-4 mr-2" />
              Watch Live
            </Button>
          ) : (
            <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
              View Details
            </Button>
          )}
          <Button variant="outline">Bracket</Button>
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
            <h1 className="text-5xl font-bold mb-4 text-foreground">Tournaments</h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Follow the biggest esports tournaments from around the world. Live
              matches, brackets, and results.
            </p>
          </div>

          <Tabs
            value={filter}
            onValueChange={setFilter}
            className="max-w-6xl mx-auto"
          >
            <div className="flex justify-center mb-8">
              <TabsList className="bg-muted">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-blue-600"
                >
                  All Tournaments
                </TabsTrigger>
                <TabsTrigger
                  value="live"
                  className="data-[state=active]:bg-red-500"
                >
                  <span className="w-2 h-2 bg-red-500 rounded-full mr-2 animate-pulse"></span>
                  Live
                </TabsTrigger>
                <TabsTrigger
                  value="upcoming"
                  className="data-[state=active]:bg-blue-600"
                >
                  Upcoming
                </TabsTrigger>
                <TabsTrigger
                  value="completed"
                  className="data-[state=active]:bg-gray-600"
                >
                  Completed
                </TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value={filter}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {getFilteredTournaments().map((tournament) => (
                  <TournamentCard key={tournament.id} tournament={tournament} />
                ))}
              </div>

              {getFilteredTournaments().length === 0 && (
                <div className="text-center py-12">
                  <Trophy className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    No tournaments found for this filter.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Upcoming Featured */}
          <div className="mt-20 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Major Championships 2025
            </h2>
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <Badge className="bg-white/20 text-white mb-4">Featured Event</Badge>
                  <h3 className="text-3xl font-bold mb-4">World Esports Championship</h3>
                  <p className="text-white/80 mb-6">
                    The biggest esports event of the year featuring top teams from
                    around the world competing for a $2,000,000 prize pool.
                  </p>
                  <div className="flex flex-wrap gap-4 mb-6">
                    <div className="flex items-center">
                      <Calendar className="w-5 h-5 mr-2" />
                      <span>April 15-25, 2025</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      <span>Los Angeles, USA</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="w-5 h-5 mr-2" />
                      <span>32 Teams</span>
                    </div>
                  </div>
                  <Button variant="secondary" size="lg">
                    Get Tickets
                  </Button>
                </div>
                <div className="hidden lg:block">
                  <div className="bg-white/10 rounded-xl p-6">
                    <div className="text-center">
                      <Trophy className="w-20 h-20 text-yellow-400 mx-auto mb-4" />
                      <div className="text-4xl font-bold mb-2">$2,000,000</div>
                      <div className="text-white/70">Total Prize Pool</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
