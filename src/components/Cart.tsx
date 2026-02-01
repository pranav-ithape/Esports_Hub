import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Minus, Plus, Trash2, ShoppingCart, CreditCard, ArrowLeft } from "lucide-react";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
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

  const applyPromoCode = () => {
    const validCodes = {
      "ESPORTS10": 10,
      "GAMING20": 20,
      "WELCOME5": 5,
      "CHAMPION15": 15
    };
    
    const discountPercent = validCodes[promoCode as keyof typeof validCodes] || 0;
    setDiscount(discountPercent);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.basePrice * item.quantity), 0);
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
              <Button 
                onClick={() => onNavigate?.('shop')}
                variant="outline" 
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Button>
              <h1 className="text-4xl text-foreground">Shopping Cart</h1>
            </div>
            
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-2xl text-foreground mb-4">Your cart is empty</h2>
              <p className="text-muted-foreground mb-8">Add some awesome esports gear to get started!</p>
              <Button 
                onClick={() => onNavigate?.('shop')}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
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
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center">
              <Button 
                onClick={() => onNavigate?.('shop')}
                variant="outline" 
                className="mr-4"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Button>
              <h1 className="text-4xl text-foreground">Shopping Cart ({cartItems.length} items)</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button
                onClick={clearCart}
                variant="outline"
                className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <Card key={item.id} className="border border-border">
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <h3 className="text-lg text-foreground">{item.name}</h3>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="secondary">{item.category}</Badge>
                          <Badge variant="outline">Size: {item.size}</Badge>
                        </div>
                        <p className="text-xl text-foreground mt-2">{formatPrice(item.basePrice)}</p>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          <Minus className="w-4 h-4" />
                        </Button>
                        
                        <span className="w-8 text-center text-foreground">{item.quantity}</span>
                        
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>
                      
                      <div className="text-right">
                        <p className="text-lg text-foreground">
                          {formatPrice(item.basePrice * item.quantity)}
                        </p>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFromCart(item.id)}
                          className="text-red-500 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950 mt-1"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Order Summary */}
            <div className="space-y-6">
              <Card className="border border-border">
                <CardHeader>
                  <h2 className="text-xl text-foreground">Order Summary</h2>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-muted-foreground">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  
                  {discount > 0 && (
                    <div className="flex justify-between text-green-600">
                      <span>Discount ({discount}%)</span>
                      <span>-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between text-muted-foreground">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : formatPrice(shipping)}</span>
                  </div>
                  
                  <div className="flex justify-between text-muted-foreground">
                    <span>Tax</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between text-xl text-foreground">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Promo Code */}
              <Card className="border border-border">
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <label className="text-sm text-muted-foreground">Promo Code</label>
                    <div className="flex space-x-2">
                      <Input
                        placeholder="Enter code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value.toUpperCase())}
                      />
                      <Button onClick={applyPromoCode} variant="outline">
                        Apply
                      </Button>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Try: ESPORTS10, GAMING20, WELCOME5, CHAMPION15
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Checkout Button */}
              <Button 
                className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 py-3"
                onClick={() => onNavigate?.('checkout')}
              >
                <CreditCard className="w-4 h-4 mr-2" />
                Proceed to Checkout
              </Button>
              
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => onNavigate?.('shop')}
              >
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}