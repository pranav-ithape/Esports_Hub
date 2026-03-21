import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Minus, Plus, Trash2, ShoppingCart, CreditCard, ArrowLeft } from "lucide-react";
import { Input } from "./ui/input";
import { useCart } from "./CartContext";
import { useCountry } from "./CountryContext";

interface CartItem {
  id: number;
  name: string;
  team: string;
  basePrice: number;
  originalBasePrice: number;
  image: string;
  rating: number;
  reviews: number;
  category: string;
  isNew: boolean;
  isBestseller: boolean;
  quantity: number;
  size?: string;
}

interface CartProps {
  onNavigate?: (section: string) => void;
}

export function Cart({ onNavigate }: CartProps) {
  const { cartItems, updateQuantity, removeFromCart, clearCart } = useCart();
  const { formatPrice } = useCountry();

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const validCodes: Record<string, number> = {
    ESPORTS10: 10,
    GAMING20: 20,
    WELCOME5: 5,
    CHAMPION15: 15,
  };

  const applyPromoCode = () => {
    const discountPercent = validCodes[promoCode] || 0;
    setDiscount(discountPercent);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.basePrice * item.quantity,
    0
  );

  const discountAmount = (subtotal * discount) / 100;
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = (subtotal - discountAmount) * 0.08;
  const total = subtotal - discountAmount + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <section className="py-20 bg-background min-h-screen">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="flex items-center mb-8">
              <Button onClick={() => onNavigate?.("shop")} variant="outline" className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Button>
              <h1 className="text-4xl text-foreground">Shopping Cart</h1>
            </div>

            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl text-foreground mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">
                Add some awesome esports gear to get started!
              </p>
              <Button
                onClick={() => onNavigate?.("shop")}
                className="bg-gradient-to-r from-blue-600 to-purple-600"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button onClick={() => onNavigate?.("shop")} variant="outline" className="mr-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Button>
              <h1 className="text-4xl text-foreground">
                Shopping Cart ({cartItems.length} items)
              </h1>
            </div>

            <Button
              onClick={clearCart}
              variant="outline"
              className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
            >
              <Trash2 className="w-4 h-4 mr-2" />
              Clear Cart
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* CART ITEMS */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="border border-border">
                  <CardContent className="p-6 flex items-center space-x-4">

                    <ImageWithFallback
                      src={item.image}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg"
                    />

                    <div className="flex-1">
                      <h3 className="text-lg text-foreground">{item.name}</h3>
                      <div className="flex gap-2 mt-1">
                        <Badge variant="secondary">{item.category}</Badge>
                        <Badge variant="outline">Size: {item.size}</Badge>
                      </div>
                      <p className="text-xl mt-2">{formatPrice(item.basePrice)}</p>
                    </div>

                    {/* Quantity */}
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() =>
                          updateQuantity(item.id, Math.max(1, item.quantity - 1))
                        }
                      >
                        <Minus className="w-4 h-4" />
                      </Button>

                      <span className="w-8 text-center">{item.quantity}</span>

                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="w-4 h-4" />
                      </Button>
                    </div>

                    {/* Price */}
                    <div className="text-right">
                      <p className="text-lg">
                        {formatPrice(item.basePrice * item.quantity)}
                      </p>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => removeFromCart(item.id)}
                        className="text-red-500"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>

                  </CardContent>
                </Card>
              ))}
            </div>

            {/* ORDER SUMMARY */}
            <div className="space-y-6">

              <Card>
                <CardHeader>
                  <h2 className="text-xl">Order Summary</h2>
                </CardHeader>

                <CardContent className="space-y-3">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>

                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>

                  <div className="border-t pt-3 flex justify-between text-xl">
                    <span>Total</span>
                    <span>{formatPrice(total)}</span>
                  </div>
                </CardContent>
              </Card>

              {/* PROMO */}
              <Card>
                <CardContent className="p-4 space-y-2">
                  <Input
                    placeholder="Promo Code"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                  />
                  <Button onClick={applyPromoCode} variant="outline">
                    Apply
                  </Button>
                </CardContent>
              </Card>

              {/* CHECKOUT */}
              <Button
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 py-3"
                onClick={() => onNavigate?.("checkout")}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Proceed to Checkout
              </Button>

              <Button variant="outline" className="w-full" onClick={() => onNavigate?.("shop")}>
                Continue Shopping
              </Button>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}