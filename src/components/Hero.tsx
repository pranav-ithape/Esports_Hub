import { Button } from "./ui/button";
import { Play, Trophy, Users } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export function Hero() {
  return (
    <section id="home" className="relative min-h-screen bg-gradient-to-br from-black via-gray-900 to-black dark:from-black dark:via-gray-900 dark:to-black overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <ImageWithFallback
          src="/assets/home/hero.png"
          alt="Esports Tournament"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
      </div>

      {/* Content */}
      <div className="relative container mx-auto px-4 h-screen flex items-center">
        <div className="max-w-2xl">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 border border-blue-500/30 mb-6">
            <Trophy className="w-4 h-4 text-blue-400 mr-2" />
            <span className="text-blue-400">World Championship 2025</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl mb-6 text-white">
            Professional
            <span className="block bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
              Esports Hub
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 mb-8 leading-relaxed">
            Discover the ultimate destination for professional esports. Follow your favorite teams, 
            track player statistics, and get exclusive merchandise from the world's top gaming organizations.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Play className="w-5 h-5 mr-2" />
              Watch Live
            </Button>
            <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800">
              <Users className="w-5 h-5 mr-2" />
              View Teams
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-gray-800">
            <div>
              <div className="text-3xl text-white mb-1">50+</div>
              <div className="text-gray-400">Pro Teams</div>
            </div>
            <div>
              <div className="text-3xl text-white mb-1">500+</div>
              <div className="text-gray-400">Players</div>
            </div>
            <div>
              <div className="text-3xl text-white mb-1">$2M+</div>
              <div className="text-gray-400">Prize Pool</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}