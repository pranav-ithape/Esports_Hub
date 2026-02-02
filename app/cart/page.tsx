"use client"

import { useState } from "react"
import Link from "next/link"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Minus, Plus, Trash2, ShoppingCart, CreditCard, ArrowLeft } from "lucide-react"
import { useCart } from "@/components/cart-provider"
import { useCountry } from "@/components/country-provider"
import { toast } from "sonner"

export default function CartPage() {
  const { cartItems, updateQuantity, removeFromCart, clearCart, getCartTotal } = useCart()
  const { formatPrice } = useCountry()
  const [promoCode, setPromoCode] = useState("")
  const [discount, setDiscount] = useState(0)

  const applyPromoCode = () => {
    const validCodes: Record<string, number> = {
      ESPORTS10: 10,
      GAMING20: 20,
      WELCOME5: 5,
      CHAMPION15: 15,
    }

    const discountPercent = validCodes[promoCode] || 0
    if (discountPercent) {
      setDiscount(discountPercent)
      toast.success(`Promo code applied! ${discountPercent}% off`)
    } else {
      toast.error("Invalid promo code")
    }
  }

  const subtotal = getCartTotal()
  const discountAmount = (subtotal * discount) / 100
  const shipping = subtotal > 100 ? 0 : 9.99
  const tax = (subtotal - discountAmount) * 0.08
  const total = subtotal - discountAmount + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <Header />

        <main className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <Link href="/shop">
                  <Button variant="outline" className="mr-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Shop
                  </Button>
                </Link>
                <h1 className="text-4xl font-bold text-foreground">Shopping Cart</h1>
              </div>

              <div className="text-center py-16">
                <ShoppingCart className="w-24 h-24 text-muted-foreground mx-auto mb-4" />
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  Your cart is empty
                </h2>
                <p className="text-muted-foreground mb-8">
                  Add some awesome esports gear to get started!
                </p>
                <Link href="/shop">
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </Button>
                </Link>
              </div>
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
          <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center">
                <Link href="/shop">
                  <Button variant="outline" className="mr-4">
                    <ArrowLeft className="w-4 h-4 mr-2" />
                    Back to Shop
                  </Button>
                </Link>
                <h1 className="text-4xl font-bold text-foreground">
                  Shopping Cart ({cartItems.length} items)
                </h1>
              </div>

              <Button
                onClick={() => {
                  clearCart()
                  toast.success("Cart cleared")
                }}
                variant="outline"
                className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Clear Cart
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cartItems.map((item) => (
                  <Card key={`${item.id}-${item.size}`} className="border border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center gap-4">
                        <img
                          src={item.image_url}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />

                        <div className="flex-1">
                          <h3 className="font-semibold text-foreground">{item.name}</h3>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="secondary">{item.category}</Badge>
                            {item.size && (
                              <Badge variant="outline">Size: {item.size}</Badge>
                            )}
                          </div>
                          <p className="text-xl font-bold text-foreground mt-2">
                            {formatPrice(item.base_price)}
                          </p>
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          >
                            <Minus className="w-4 h-4" />
                          </Button>

                          <span className="w-8 text-center text-foreground">
                            {item.quantity}
                          </span>

                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                        </div>

                        <div className="text-right">
                          <p className="text-lg font-semibold text-foreground">
                            {formatPrice(item.base_price * item.quantity)}
                          </p>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              removeFromCart(item.id)
                              toast.success("Item removed from cart")
                            }}
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
                    <h2 className="text-xl font-semibold text-foreground">Order Summary</h2>
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
                      <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                    </div>

                    <div className="flex justify-between text-muted-foreground">
                      <span>Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>

                    <div className="border-t pt-4">
                      <div className="flex justify-between text-xl font-bold text-foreground">
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
                      <div className="flex gap-2">
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
                <Button className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 py-6">
                  <CreditCard className="w-4 h-4 mr-2" />
                  Proceed to Checkout
                </Button>

                <Link href="/shop">
                  <Button variant="outline" className="w-full">
                    Continue Shopping
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
