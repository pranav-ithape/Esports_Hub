import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Input } from "./ui/input";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { ShoppingCart, Star, Heart, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useCart } from "./CartContext";
import { useCountry } from "./CountryContext";
import { toast } from "sonner";

import { db } from "../lib/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";

export function Shop() {
  const { addToCart } = useCart();
  const { formatPrice } = useCountry();

  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH PRODUCTS
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const snap = await getDocs(collection(db, "products"));

        const data = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setProducts(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const toggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id)
        ? prev.filter((f) => f !== id)
        : [...prev, id]
    );
  };

  const handleAddToCart = (product: any) => {
    addToCart(product);
    toast.success(`${product.name} added to cart!`);
  };

  const calculateDiscount = (original: number, current: number) => {
    if (!original || !current) return 0;
    return Math.round(((original - current) / original) * 100);
  };

  // 🔥 FILTER LOGIC
  const filterProducts = (type: string) => {
    return products.filter((p) => {
      const matchCategory =
        type === "all" ||
        p.category === (type === "jerseys" ? "jersey" : "accessory");

      const q = searchQuery.toLowerCase();

      const matchSearch =
        p.name?.toLowerCase().includes(q) ||
        p.category?.toLowerCase().includes(q);

      return matchCategory && matchSearch;
    });
  };

  // 🔥 PRODUCT CARD
  const ProductCard = ({ product }: any) => {
    const [reviews, setReviews] = useState<any[]>([]);

    useEffect(() => {
      const fetchReviews = async () => {
        try {
          const q = query(
            collection(db, "reviews"),
            where("productId", "==", product.id)
          );
          const snap = await getDocs(q);
          setReviews(snap.docs.map((d) => d.data()));
        } catch (err) {
          console.error(err);
        }
      };

      fetchReviews();
    }, [product.id]);

    const avgRating =
      reviews.length > 0
        ? (
            reviews.reduce((sum, r) => sum + (r.rating || 0), 0) /
            reviews.length
          ).toFixed(1)
        : "0";

    // ✅ FIXED PRICE SUPPORT
    const price = product.price ?? product.basePrice ?? 0;
    const originalPrice =
      product.originalPrice ?? product.originalBasePrice ?? 0;

    // ✅ FIXED IMAGE SUPPORT
    const imageSrc = Array.isArray(product.image)
      ? product.image[0]
      : product.image;

    return (
      <Card className="bg-card border-border hover:border-blue-500/50 transition-all duration-300 overflow-hidden">
        <ImageWithFallback
          src={imageSrc || ""}
          alt={product.name}
          className="w-full h-64 object-cover"
        />

        <CardContent className="p-6">
          <h3>{product.name}</h3>

          <div className="flex items-center gap-2 my-3">
            <Star className="w-4 h-4 text-yellow-500 fill-current" />
            <span>{avgRating}</span>
            <span className="text-muted-foreground">
              ({reviews.length} reviews)
            </span>
          </div>

          {/* ✅ FIXED PRICE */}
          <div className="flex items-center gap-3 mb-4">
            <span>{formatPrice(price)}</span>
            <span className="line-through text-muted-foreground">
              {formatPrice(originalPrice)}
            </span>
          </div>

          {/* ✅ OPTIONAL BADGES */}
          <div className="flex gap-2 mb-2">
            {product.isNew && <Badge className="bg-green-500">NEW</Badge>}
            {product.isBestseller && (
              <Badge className="bg-orange-500">BESTSELLER</Badge>
            )}
            {originalPrice > 0 && (
              <Badge variant="destructive">
                -{calculateDiscount(originalPrice, price)}%
              </Badge>
            )}
          </div>

          <Button onClick={() => handleAddToCart(product)} className="w-full">
            <ShoppingCart className="w-4 h-4 mr-2" />
            Add to Cart
          </Button>
        </CardContent>
      </Card>
    );
  };

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <h1 className="text-5xl text-center mb-10">Esports Hub Shop</h1>

        {/* SEARCH */}
        <div className="flex justify-end mb-6">
          <div className="relative">
            <Search className="absolute left-2 top-2 w-4 h-4" />
            <Input
              className="pl-8"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="jerseys">Jerseys</TabsTrigger>
            <TabsTrigger value="accessories">Accessories</TabsTrigger>
          </TabsList>

          <TabsContent value="all">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {filterProducts("all").map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="jerseys">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {filterProducts("jerseys").map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="accessories">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              {filterProducts("accessories").map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </TabsContent>
        </Tabs>

        {loading && <p className="text-center mt-6">Loading products...</p>}
      </div>
    </section>
  );
}