import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ShoppingCart, Star, Heart, Filter, Globe, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { toast } from "sonner";
import { shopApi } from "../utils/api";
import { fallbackShopItems } from "../utils/fallbackData";

const countries = [
  { name: "Argentina", currency: "ARS", symbol: "$", rate: 850 },
  { name: "Australia", currency: "AUD", symbol: "A$", rate: 1.55 },
  { name: "Austria", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Belgium", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Brazil", currency: "BRL", symbol: "R$", rate: 5.2 },
  { name: "Bulgaria", currency: "BGN", symbol: "лв", rate: 1.8 },
  { name: "Canada", currency: "CAD", symbol: "C$", rate: 1.35 },
  { name: "Chile", currency: "CLP", symbol: "$", rate: 920 },
  { name: "China", currency: "CNY", symbol: "¥", rate: 7.2 },
  { name: "Colombia", currency: "COP", symbol: "$", rate: 4200 },
  { name: "Croatia", currency: "HRK", symbol: "kn", rate: 6.9 },
  { name: "Czech Republic", currency: "CZK", symbol: "Kč", rate: 23 },
  { name: "Denmark", currency: "DKK", symbol: "kr", rate: 6.9 },
  { name: "Estonia", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Finland", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "France", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Germany", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Greece", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Hungary", currency: "HUF", symbol: "Ft", rate: 360 },
  { name: "India", currency: "INR", symbol: "₹", rate: 83 },
  { name: "Indonesia", currency: "IDR", symbol: "Rp", rate: 15800 },
  { name: "Italy", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Japan", currency: "JPY", symbol: "¥", rate: 148 },
  { name: "Latvia", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Lithuania", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Malaysia", currency: "MYR", symbol: "RM", rate: 4.7 },
  { name: "Mexico", currency: "MXN", symbol: "$", rate: 18 },
  { name: "Netherlands", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Norway", currency: "NOK", symbol: "kr", rate: 10.8 },
  { name: "Peru", currency: "PEN", symbol: "S/", rate: 3.7 },
  { name: "Philippines", currency: "PHP", symbol: "₱", rate: 56 },
  { name: "Poland", currency: "PLN", symbol: "zł", rate: 4.1 },
  { name: "Portugal", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Romania", currency: "RON", symbol: "lei", rate: 4.6 },
  { name: "Russia", currency: "RUB", symbol: "₽", rate: 92 },
  { name: "Serbia", currency: "RSD", symbol: "дин", rate: 108 },
  { name: "Singapore", currency: "SGD", symbol: "S$", rate: 1.35 },
  { name: "Slovakia", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Slovenia", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "South Korea", currency: "KRW", symbol: "₩", rate: 1320 },
  { name: "Spain", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Sweden", currency: "SEK", symbol: "kr", rate: 10.5 },
  { name: "Switzerland", currency: "CHF", symbol: "CHF", rate: 0.88 },
  { name: "Thailand", currency: "THB", symbol: "฿", rate: 36 },
  { name: "Turkey", currency: "TRY", symbol: "₺", rate: 30 },
  { name: "Ukraine", currency: "UAH", symbol: "₴", rate: 37 },
  { name: "United Kingdom", currency: "GBP", symbol: "£", rate: 0.79 },
  { name: "United States", currency: "USD", symbol: "$", rate: 1 },
  { name: "Vietnam", currency: "VND", symbol: "₫", rate: 24500 }
];

const jerseys = [
  {
    id: 1,
    name: "Godlike Esports 2025 Jersey",
    team: "Godlike Esports",
    basePrice: 9.63,
    originalBasePrice: 13.99,
    image: "/assets/jersey/godlike25.jpg",
    rating: 0,
    reviews: 0,
    category: "jersey",
    isNew: true,
    isBestseller: false
  },
  {
    id: 2,
    name: "S8ul 2025 Jersey",
    team: "S8ul",
    basePrice: 9.14,
    originalBasePrice: 12.99,
    image: "/assets/jersey/soul25.jpg",
    rating: 0,
    reviews: 0,
    category: "jersey",
    isNew: false,
    isBestseller: true
  },
  {
    id: 3,
    name: "Orangutan 2025 Jersey",
    team: "Orangutan",
    basePrice: 9.02,
    originalBasePrice: 11.99,
    image: "/assets/jersey/orangutan25.jpg",
    rating: 0,
    reviews: 0,
    category: "jersey",
    isNew: true,
    isBestseller: false
  },
  {
    id: 7,
    name: "Revenant XSparx 2024 Jersey",
    team: "Revenant XSparx",
    basePrice: 11.07,
    originalBasePrice: 14.99,
    image: "/assets/jersey/rntx24.jpg",
    rating: 0,
    reviews: 0,
    category: "jersey",
    isNew: false,
    isBestseller: true
  },
  {
    id: 8,
    name: "Godlike Esports 2024 Jersey",
    team: "Godlike Esports",
    basePrice: 9.99,
    originalBasePrice: 15.99,
    image: "/assets/jersey/godlike24.jpg",
    rating: 0,
    reviews: 0,
    category: "jersey",
    isNew: true,
    isBestseller: false
  },
  {
    id: 9,
    name: "Pro Vitality 2025 Esports Jersey",
    team: "Team Vitality",
    basePrice: 8.99,
    originalBasePrice: 13.55,
    image: "/assets/jersey/vitality25.jpg",
    rating: 0,
    reviews: 0,
    category: "jersey",
    isNew: false,
    isBestseller: true
  }
];

const accessories = [
  {
    id: 4,
    name: "Vero Forza Glide V2 (6 Pieces)",
    team: "Vero Forza",
    basePrice: 5.72,
    originalBasePrice: 7.99,
    image: "/assets/accessory/veroglidev2.jpg",
    rating: 0,
    reviews: 0,
    category: "accessory",
    isNew: false,
    isBestseller: true
  },
  {
    id: 5,
    name: "Hyper X Cloud II",
    team: "Hyper X",
    basePrice: 90.35,
    originalBasePrice: 109.99,
    image: "/assets/accessory/hyperxcloud2.jpg",
    rating: 0,
    reviews: 0,
    category: "accessory",
    isNew: false,
    isBestseller: false
  },
  {
    id: 6,
    name: "Logitech G PRO Wireless Gaming Mouse",
    team: "Logitech",
    basePrice: 126.51,
    originalBasePrice: 199.99,
    image: "/assets/accessory/logitechgpro.jpg",
    rating: 0,
    reviews: 0,
    category: "accessory",
    isNew: true,
    isBestseller: true
  }
];

const allProducts = [...jerseys, ...accessories];

export function Shop() {
  const { addToCart: addToCartContext } = useCart();
  const [favorites, setFavorites] = useState<number[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [selectedCountry, setSelectedCountry] = useState("United States");
  const [searchQuery, setSearchQuery] = useState("");
  const [shopItems, setShopItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Commented out API call to use only local static data for immediate reflection of changes
    /*
    const fetchShopItems = async () => {
      try {
        setLoading(true);
        const response = await shopApi.getAll();
        if (response.success) {
          setShopItems(response.data);
        }
      } catch (error) {
        console.error('Error fetching shop items:', error);
        // Use fallback data when API fails
        setShopItems(fallbackShopItems);
      } finally {
        setLoading(false);
      }
    };

    fetchShopItems();
    */
    // Use only local static data
    setShopItems([]);
    setLoading(false);
  }, []);

  const toggleFavorite = (productId: number) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const calculateDiscount = (original: number, current: number) => {
    return Math.round(((original - current) / original) * 100);
  };

  const formatPrice = (basePrice: number) => {
    const country = countries.find(c => c.name === selectedCountry);
    if (!country) return `${basePrice}`;
    
    const convertedPrice = basePrice * country.rate;
    return `${country.symbol}${convertedPrice.toFixed(convertedPrice < 10 ? 2 : 0)}`;
  };

  const addToCart = (product: any) => {
    addToCartContext(product);
    toast.success(`${product.name} added to cart!`);
  };

  const getFilteredProducts = () => {
    // Combine static products with dynamic shop items
    const combinedProducts = [...allProducts, ...shopItems];
    let filtered = combinedProducts;
    
    // Filter by category
    switch (activeTab) {
      case "jerseys":
        filtered = filtered.filter(product => product.category === "jersey");
        break;
      case "accessories":
        filtered = filtered.filter(product => product.category === "accessory");
        break;
      default:
        // Show all products
        break;
    }
    
    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(product => 
        product.name.toLowerCase().includes(query) ||
        product.team.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query)
      );
    }
    
    return filtered;
  };

  const ProductCard = ({ product }: { product: typeof allProducts[0] }) => (
    <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300 overflow-hidden group">
      <div className="relative">
        <ImageWithFallback
          src={product.image}
          alt={product.name}
          className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-green-500 hover:bg-green-600">NEW</Badge>
          )}
          {product.isBestseller && (
            <Badge className="bg-orange-500 hover:bg-orange-600">BESTSELLER</Badge>
          )}
          <Badge variant="destructive">
            -{calculateDiscount(product.originalBasePrice, product.basePrice)}%
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
            className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
          />
        </Button>
      </div>

      <CardContent className="p-6">
        <div className="mb-4">
          <h3 className="text-foreground mb-2">{product.name}</h3>
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
          <span className="text-muted-foreground">({product.reviews} reviews)</span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-3 mb-4">
          <span className="text-2xl text-foreground">{formatPrice(product.basePrice)}</span>
          <span className="text-muted-foreground line-through">{formatPrice(product.originalBasePrice)}</span>
        </div>

        {/* Add to Cart Button */}
        <Button 
          onClick={() => addToCart(product)}
          className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Add to Cart
        </Button>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h1 className="text-5xl mb-4 text-foreground">Esports Hub Shop</h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Official merchandise from your favorite esports teams. Jerseys, accessories, and gaming gear with international shipping.
          </p>
        </div>

        {/* Filter Controls */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="max-w-6xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-8 gap-4">
            <TabsList className="bg-muted border-border">
              <TabsTrigger value="all" className="data-[state=active]:bg-blue-600">
                All Products
              </TabsTrigger>
              <TabsTrigger value="jerseys" className="data-[state=active]:bg-blue-600">
                Jerseys
              </TabsTrigger>
              <TabsTrigger value="accessories" className="data-[state=active]:bg-blue-600">
                Accessories
              </TabsTrigger>
            </TabsList>

            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full sm:w-64 pl-10 bg-card border-border text-foreground"
                />
              </div>
              
              {/* Country/Currency Filter */}
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                  <SelectTrigger className="w-full sm:w-48 bg-card border-border text-foreground">
                    <SelectValue placeholder="Select country" />
                  </SelectTrigger>
                  <SelectContent className="bg-card border-border">
                    {countries.map((country) => (
                      <SelectItem key={country.name} value={country.name} className="text-foreground hover:bg-muted">
                        {country.name} ({country.currency})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <Button variant="outline" size="sm" className="border-border text-muted-foreground hover:text-foreground hover:bg-muted">
                <Filter className="w-4 h-4 mr-2" />
                More Filters
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
                <p className="text-muted-foreground">No products found for the current search.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Featured Categories */}
        <div className="mt-20">
          <h2 className="text-3xl text-foreground mb-8 text-center">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-gradient-to-r from-blue-600 to-purple-600 border-0 overflow-hidden group cursor-pointer">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl text-white mb-4">Team Jerseys</h3>
                <p className="text-blue-100 mb-4">Official team uniforms and limited editions from all major esports teams</p>
                <Button variant="secondary" onClick={() => setActiveTab("jerseys")}>
                  Shop Jerseys
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-purple-600 to-pink-600 border-0 overflow-hidden group cursor-pointer">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl text-white mb-4">Gaming Gear</h3>
                <p className="text-purple-100 mb-4">Professional gaming accessories and peripherals used by pros</p>
                <Button variant="secondary" onClick={() => setActiveTab("accessories")}>
                  Shop Gear
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-r from-green-600 to-teal-600 border-0 overflow-hidden group cursor-pointer">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl text-white mb-4">Collectibles</h3>
                <p className="text-green-100 mb-4">Rare items and championship memorabilia from tournament winners</p>
                <Button variant="secondary">
                  Coming Soon
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}