import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ShoppingCart, Star, Heart } from "lucide-react";
import { useState } from "react";

interface Jersey {
  id: number;
  name: string;
  team: string;
  price: number;
  originalPrice: number;
  image: string;
  rating: number;
  reviews: number;
  sizes: string[];
  isNew: boolean;
  isBestseller: boolean;
}

const jerseys: Jersey[] = [
  {
    id: 1,
    name: "Thunder Wolves Home Jersey",
    team: "Thunder Wolves",
    price: 89.99,
    originalPrice: 119.99,
    image: "/assets/jersey/godlike25.jpg",
    rating: 4.8,
    reviews: 124,
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: true,
    isBestseller: false
  },
  {
    id: 2,
    name: "Cyber Dragons Championship Jersey",
    team: "Cyber Dragons",
    price: 94.99,
    originalPrice: 129.99,
    image: "https://images.unsplash.com/photo-1655089131279-8029e8a21ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBqZXJzZXklMjB1bmlmb3JtfGVufDF8fHx8MTc1NjUzNzU5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.9,
    reviews: 89,
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: false,
    isBestseller: true
  },
  {
    id: 3,
    name: "Neon Legends Away Jersey",
    team: "Neon Legends",
    price: 84.99,
    originalPrice: 109.99,
    image: "https://images.unsplash.com/photo-1655089131279-8029e8a21ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBqZXJzZXklMjB1bmlmb3JtfGVufDF8fHx8MTc1NjUzNzU5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    reviews: 156,
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: false,
    isBestseller: false
  },
  {
    id: 4,
    name: "Ghost Squad Limited Edition",
    team: "Ghost Squad",
    price: 99.99,
    originalPrice: 139.99,
    image: "https://images.unsplash.com/photo-1655089131279-8029e8a21ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBqZXJzZXklMjB1bmlmb3JtfGVufDF8fHx8MTc1NjUzNzU5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.6,
    reviews: 73,
    sizes: ["S", "M", "L", "XL"],
    isNew: true,
    isBestseller: false
  },
  {
    id: 5,
    name: "Phoenix Fire Retro Jersey",
    team: "Phoenix Fire",
    price: 79.99,
    originalPrice: 99.99,
    image: "https://images.unsplash.com/photo-1655089131279-8029e8a21ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBqZXJzZXklMjB1bmlmb3JtfGVufDF8fHx8MTc1NjUzNzU5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.5,
    reviews: 201,
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: false,
    isBestseller: true
  },
  {
    id: 6,
    name: "Ice Titans Championship Jersey",
    team: "Ice Titans",
    price: 92.99,
    originalPrice: 124.99,
    image: "https://images.unsplash.com/photo-1655089131279-8029e8a21ac6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxnYW1pbmclMjBqZXJzZXklMjB1bmlmb3JtfGVufDF8fHx8MTc1NjUzNzU5NXww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    rating: 4.7,
    reviews: 98,
    sizes: ["S", "M", "L", "XL", "XXL"],
    isNew: false,
    isBestseller: false
  }
];

export function JerseyShop() {
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (jerseyId: number) => {
    setFavorites(prev => 
      prev.includes(jerseyId) 
        ? prev.filter(id => id !== jerseyId)
        : [...prev, jerseyId]
    );
  };

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  return (
    <section className="py-20 bg-gray-900 min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-4 text-white">Official Team Jerseys</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Represent your favorite esports teams with authentic, high-quality jerseys and merchandise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {jerseys.map((jersey) => (
            <Card key={jersey.id} className="bg-gray-800 border-gray-700 hover:border-blue-500/50 transition-all duration-300 overflow-hidden group">
              <div className="relative">
                <ImageWithFallback
                  src={jersey.image}
                  alt={jersey.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {jersey.isNew && (
                    <Badge className="bg-green-500 hover:bg-green-600">NEW</Badge>
                  )}
                  {jersey.isBestseller && (
                    <Badge className="bg-orange-500 hover:bg-orange-600">BESTSELLER</Badge>
                  )}
                  <Badge variant="destructive">
                    -{calculateDiscount(jersey.originalPrice, jersey.price)}%
                  </Badge>
                </div>

                {/* Favorite Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-4 right-4 text-white hover:text-red-400"
                  onClick={() => toggleFavorite(jersey.id)}
                >
                  <Heart 
                    className={`w-5 h-5 ${favorites.includes(jersey.id) ? 'fill-red-400 text-red-400' : ''}`} 
                  />
                </Button>
              </div>

              <CardContent className="p-6">
                <div className="mb-4">
                  <h3 className="text-white mb-2">{jersey.name}</h3>
                  <Badge variant="outline" className="border-blue-500 text-blue-400">
                    {jersey.team}
                  </Badge>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex items-center">
                    <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    <span className="text-white ml-1">{jersey.rating}</span>
                  </div>
                  <span className="text-gray-400">({jersey.reviews} reviews)</span>
                </div>

                {/* Sizes */}
                <div className="mb-4">
                  <div className="text-gray-400 mb-2">Available Sizes:</div>
                  <div className="flex gap-2">
                    {jersey.sizes.map((size) => (
                      <Badge key={size} variant="secondary" className="bg-gray-700 text-gray-300">
                        {size}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-2xl text-white">${jersey.price}</span>
                  <span className="text-gray-400 line-through">${jersey.originalPrice}</span>
                </div>

                {/* Add to Cart Button */}
                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View More */}
        <div className="text-center mt-12">
          <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:text-white hover:bg-gray-800">
            View All Products
          </Button>
        </div>
      </div>
    </section>
  );
}