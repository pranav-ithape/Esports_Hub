import { useState } from "react";
import { useCart } from "./CartContext";
import { useCountry } from "./CountryContext";
import { db } from "../lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader } from "./ui/card";

interface CheckoutProps {
  onNavigate?: (section: string) => void;
}

export default function Checkout({ onNavigate }: CheckoutProps) {
  const { cartItems, clearCart } = useCart();
  const { formatPrice } = useCountry();

  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    payment: "COD",
  });

  // ✅ NEW STATE (file upload)
  const [paymentScreenshot, setPaymentScreenshot] = useState<File | null>(null);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.basePrice * item.quantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (!form.name || !form.phone || !form.address) {
      alert("Please fill all details ❗");
      return;
    }

    try {
      setLoading(true);

      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        alert("Please login first ❌");
        return;
      }

      const formattedItems = cartItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.basePrice,
        quantity: item.quantity,
        image: item.image,
      }));

      // ✅ SAVE ORDER WITH PAYMENT INFO
      await addDoc(collection(db, "orders"), {
        userId: user.uid,
        customer: form,
        items: formattedItems,
        totalAmount: subtotal,
        paymentMethod: form.payment, // ✅ NEW
        paymentScreenshot: paymentScreenshot
          ? paymentScreenshot.name
          : null, // ✅ NEW
        status: "pending",
        createdAt: serverTimestamp(),
      });

      alert("Order placed successfully ✅");

      clearCart();
      onNavigate?.("profile");

    } catch (error) {
      console.error(error);
      alert("Error placing order ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">

          <h1 className="text-4xl text-foreground mb-8">Checkout</h1>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* LEFT - FORM */}
            <Card>
              <CardHeader>
                <h2 className="text-xl">Billing Details</h2>
              </CardHeader>

              <CardContent className="space-y-4">

                <Input
                  placeholder="Full Name"
                  value={form.name}
                  onChange={(e) =>
                    setForm({ ...form, name: e.target.value })
                  }
                />

                <Input
                  placeholder="Phone Number"
                  value={form.phone}
                  onChange={(e) =>
                    setForm({ ...form, phone: e.target.value })
                  }
                />

                <Input
                  placeholder="Address"
                  value={form.address}
                  onChange={(e) =>
                    setForm({ ...form, address: e.target.value })
                  }
                />

                {/* Payment Method */}
                <select
                  className="w-full p-2 bg-background border border-border rounded"
                  value={form.payment}
                  onChange={(e) =>
                    setForm({ ...form, payment: e.target.value })
                  }
                >
                  <option value="COD">Cash on Delivery</option>
                  <option value="ONLINE">Online Payment</option>
                </select>

                {/* ✅ QR + FILE UPLOAD (NO UI CHANGE) */}
                {form.payment === "ONLINE" && (
                  <div className="space-y-3 border-t pt-4 text-center">

                    <p className="text-sm text-muted-foreground">
                      Scan QR and upload payment screenshot
                    </p>

                    <img
                      src="/assets/qr.png"
                      alt="QR Code"
                      className="w-40 mx-auto rounded"
                    />

                    <Input
                      type="file"
                      accept="image/*"
                      onChange={(e) =>
                        setPaymentScreenshot(
                          e.target.files?.[0] || null
                        )
                      }
                    />

                  </div>
                )}

              </CardContent>
            </Card>

            {/* RIGHT - ORDER SUMMARY */}
            <Card>
              <CardHeader>
                <h2 className="text-xl">Order Summary</h2>
              </CardHeader>

              <CardContent className="space-y-4">

                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>
                      {item.name} × {item.quantity}
                    </span>
                    <span>
                      {formatPrice(item.basePrice * item.quantity)}
                    </span>
                  </div>
                ))}

                <div className="border-t pt-4 flex justify-between text-lg">
                  <span>Total</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>

                <Button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-green-600 to-blue-600"
                >
                  {loading ? "Placing Order..." : "Place Order"}
                </Button>

              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  );
}