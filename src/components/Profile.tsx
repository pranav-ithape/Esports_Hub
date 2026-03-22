import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ArrowLeft, User, Trophy } from "lucide-react";
import { toast } from "sonner";
import { setDoc, addDoc, serverTimestamp } from "firebase/firestore"; // ✅ added
import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";

interface ProfileProps {
  onNavigate?: (section: string) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const [user, setUser] = useState<any>(null);
  const [orders, setOrders] = useState<any[]>([]);
  const [isEditing, setIsEditing] = useState(false);

  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    favoriteGame: ""
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (!currentUser) {
        onNavigate?.("login");
        return;
      }

      try {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        const userData = {
          id: currentUser.uid,
          name: docSnap.data()?.name || "",
          email: currentUser.email,
          avatar: docSnap.data()?.avatar || "",
          phone: docSnap.data()?.phone || "",
          bio: docSnap.data()?.bio || "",
          favoriteGame: docSnap.data()?.favoriteGame || "",
        };

        setUser(userData);

        setEditForm({
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          bio: userData.bio,
          favoriteGame: userData.favoriteGame
        });

        // 🔥 FETCH ORDERS
        const q = query(
          collection(db, "orders"),
          where("userId", "==", currentUser.uid)
        );

        const snap = await getDocs(q);

        const orderData = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }));

        setOrders(orderData);

      } catch (err) {
        console.error(err);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    setIsLoading(true);

    try {
      const docRef = doc(db, "users", user.id);

      await setDoc(
        docRef,
        {
          name: editForm.name || "",
          email: user.email || "",
          phone: editForm.phone || "",
          bio: editForm.bio || "",
          favoriteGame: editForm.favoriteGame || "",
          updatedAt: new Date()
        },
        { merge: true }
      );

      setUser({ ...user, ...editForm });
      setIsEditing(false);

      toast.success("Profile updated!");
    } catch (error) {
      console.error(error);
      toast.error("Error updating profile");
    }

    setIsLoading(false);
  };

  const handleLogout = async () => {
    await signOut(auth);
    toast.success("Logged out");
    onNavigate?.("login");
  };

  if (!user) return <div className="text-center py-20">Loading...</div>;

  return (
    <section className="min-h-screen bg-background flex justify-center px-4 py-16">
      <div className="w-full max-w-4xl flex flex-col items-center">

        <div className="flex justify-between mb-6 w-full">
          <Button onClick={() => onNavigate?.("home")}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button onClick={handleLogout} className="bg-red-600 text-white">
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full">

          <Card className="p-6 text-center">
            <Avatar className="w-24 h-24 mx-auto mb-4">
              <AvatarImage src={user.avatar} />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>

            <h2 className="text-xl font-bold">{user.name}</h2>
            <p>{user.email}</p>

            <Badge className="mt-2">
              <Trophy className="w-3 h-3 mr-1" />
              Gamer
            </Badge>
          </Card>

          <Card className="p-6 col-span-2">

            <div className="flex justify-between mb-4">
              <h2>Profile Info</h2>

              {!isEditing ? (
                <Button onClick={() => setIsEditing(true)}>Edit</Button>
              ) : (
                <div className="flex gap-2">
                  <Button onClick={handleSave}>
                    {isLoading ? "Saving..." : "Save"}
                  </Button>

                  <Button onClick={() => setIsEditing(false)}>Cancel</Button>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <Field label="Name" value={editForm.name} editing={isEditing}
                onChange={(v) => setEditForm({ ...editForm, name: v })} />

              <StaticField label="Email" value={user.email} />

              <Field label="Phone" value={editForm.phone} editing={isEditing}
                onChange={(v) => setEditForm({ ...editForm, phone: v })} />

              <Field label="Bio" value={editForm.bio} editing={isEditing}
                onChange={(v) => setEditForm({ ...editForm, bio: v })} />
            </div>
          </Card>
        </div>

        {/* ORDERS */}
        <div className="w-full mt-10">
          <h2 className="text-2xl mb-4">My Orders</h2>

          {orders.length === 0 ? (
            <p>No orders yet</p>
          ) : (
            orders.map((order) => (
              <Card key={order.id} className="p-4 mb-4">

                <div className="flex justify-between">
                  <span>Total: {order.totalAmount}</span>
                  <span>Status: {order.status}</span>
                </div>

                <div className="mt-3 space-y-2">
                  {order.items?.map((item: any, i: number) => (
                    <div key={i} className="flex flex-col gap-2 border-t pt-3">

                      <div className="flex items-center gap-3">
                        <img src={item.image} className="w-10 h-10 rounded" />
                        <span>{item.name}</span>
                        <span>× {item.quantity}</span>
                      </div>

                      {order.status === "delivered" && (
                        <ReviewBox productId={item.id} user={user} />
                      )}

                    </div>
                  ))}
                </div>

              </Card>
            ))
          )}
        </div>

      </div>
    </section>
  );
}

/* 🔥 REVIEW COMPONENT */

function ReviewBox({ productId, user }: any) {
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");

  const handleSubmit = async () => {
    if (!rating || !review) {
      alert("Fill review ❗");
      return;
    }

    try {
      await addDoc(collection(db, "reviews"), {
        productId,
        userId: user.id,
        userName: user.name || user.email,
        rating,
        review,
        createdAt: serverTimestamp(),
      });

      alert("Review submitted ✅");

      setRating(0);
      setReview("");
    } catch (err) {
      console.error(err);
      alert("Error ❌");
    }
  };

  return (
    <div className="ml-12 mt-2 border p-3 rounded">

      <p className="text-sm mb-2">Write Review</p>

      <select
        value={rating}
        onChange={(e) => setRating(Number(e.target.value))}
        className="border p-1 rounded text-sm"
      >
        <option value={0}>Rating</option>
        <option value={1}>⭐ 1</option>
        <option value={2}>⭐ 2</option>
        <option value={3}>⭐ 3</option>
        <option value={4}>⭐ 4</option>
        <option value={5}>⭐ 5</option>
      </select>

      <Input
        placeholder="Write review..."
        value={review}
        onChange={(e) => setReview(e.target.value)}
        className="mt-2"
      />

      <Button onClick={handleSubmit} className="mt-2 text-sm">
        Submit
      </Button>

    </div>
  );
}

/* HELPERS */

function Field({ label, value, editing, onChange }: any) {
  return (
    <div>
      <Label>{label}</Label>
      {editing ? (
        <Input value={value} onChange={(e) => onChange(e.target.value)} />
      ) : (
        <div className="p-2 border rounded">{value || "Not set"}</div>
      )}
    </div>
  );
}

function StaticField({ label, value }: any) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="p-2 border rounded">{value}</div>
    </div>
  );
}