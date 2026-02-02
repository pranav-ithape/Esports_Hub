"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { ShoppingCart, Star, Heart, Filter, Search } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useCountry } from "@/components/country-provider"
import { toast } from "sonner"
import { staticProducts } from "@/lib/data"

export default function ShopPage() {
  const { addToCart } = useCart()
  const { formatPrice } = useCountry()
  const [favorites, setFavorites] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  const toggleFavorite = (productId: string) => {
    setFavorites((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    )
  }

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100)
  }

  const handleAddToCart = (product: any) => {
    addToCart(product)
    toast.success(`${product.name} added to cart!`)
  }

  const getFilteredProducts = () => {
    let filtered = staticProducts

    switch (activeTab) {
      case "jerseys":
        filtered = filtered.filter((product) => product.category === "jersey")
        break
      case "accessories":
        filtered = filtered.filter((product) => product.category === "accessory")
        break
      default:
        break
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.team.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      )
    }

    return filtered
  }

  const ProductCard = ({ product }: { product: (typeof staticProducts)[0] }) => (
    <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.is_new && (
            <Badge className="bg-green-500 hover:bg-green-600">NEW</Badge>
          )}
          {product.is_bestseller && (
            <Badge className="bg-orange-500 hover:bg-orange-600">BESTSELLER</Badge>
          )}
          <Badge variant="destructive">
            -{calculateDiscount(product.original_price, product.base_price)}%
          </Badge>
        </div>

        {/* Favorite Button */}
        <Button
          variant="ghost"
          size="sm"
          className="absolute top-4 right-4 text-foreground hover:text-red-500"
          onClick={() => toggleFavorite(product.id)}
        >
          <Heart
            className={`w-5 h-5 ${
              favorites.includes(product.id) ? "fill-red-500 text-red-500" : ""
            }`}
          />
        </Button>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="font-semibold text-foreground mb-2 line-clamp-1">
            {product.name}
          </h3>
          <Badge variant="outline" className="border-blue-500 text-blue-500">
            {product.team}
          </Badge>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span className="text-foreground ml-1">{product.rating}</span>
          </div>
          <span className="text-muted-foreground">
            ({product.reviews_count} reviews)
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl font-bold text-foreground">
            {formatPrice(product.base_price)}
          </span>
          <span className="text-muted-foreground line-through">
            {formatPrice(product.original_price)}
          </span>
        </div>

        {/* Add to Cart Button */}
        <Button
          onClick={() => handleAddToCart(product)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h1 className="text-5xl font-bold mb-4 text-foreground">
              Esports Hub Shop
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Official merchandise from your favorite esports teams. Jerseys,
              accessories, and gaming gear with international shipping.
            </p>
          </div>

          {/* Filter Controls */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="max-w-6xl mx-auto"
          >
            <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
              <TabsList className="bg-muted border-border">
                <TabsTrigger
                  value="all"
                  className="data-[state=active]:bg-blue-600"
                >
                  All Products
                </TabsTrigger>
                <TabsTrigger
                  value="jerseys"
                  className="data-[state=active]:bg-blue-600"
                >
                  Jerseys
                </TabsTrigger>
                <TabsTrigger
                  value="accessories"
                  className="data-[state=active]:bg-blue-600"
                >
                  Accessories
                </TabsTrigger>
              </TabsList>

              {/* Search */}
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-64 pl-10 bg-card border-border"
                  />
                </div>

                <Button
                  variant="outline"
                  size="sm"
                  className="border-border text-muted-foreground hover:text-foreground hover:bg-muted"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  Filters
                </Button>
              </div>
            </div>

            <TabsContent value={activeTab} className="mt-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {getFilteredProducts().map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {getFilteredProducts().length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    No products found for the current search.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>

          {/* Featured Categories */}
          <div className="mt-20 max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              Shop by Category
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card
                className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 overflow-hidden cursor-pointer"
                onClick={() => setActiveTab("jerseys")}
              >
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Team Jerseys</h3>
                  <p className="text-blue-100 mb-4">
                    Official team uniforms and limited editions from all major
                    esports teams
                  </p>
                  <Button variant="secondary">Shop Jerseys</Button>
                </CardContent>
              </Card>

              <Card
                className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 overflow-hidden cursor-pointer"
                onClick={() => setActiveTab("accessories")}
              >
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Gaming Gear</h3>
                  <p className="text-purple-100 mb-4">
                    Professional gaming accessories and peripherals used by pros
                  </p>
                  <Button variant="secondary">Shop Gear</Button>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-green-600 to-teal-600 border-0 overflow-hidden cursor-pointer">
                <CardContent className="p-8 text-center">
                  <h3 className="text-2xl font-bold text-white mb-4">Collectibles</h3>
                  <p className="text-green-100 mb-4">
                    Rare items and championship memorabilia from tournament winners
                  </p>
                  <Button variant="secondary">Coming Soon</Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
