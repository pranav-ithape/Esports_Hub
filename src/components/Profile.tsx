import { useState, useEffect } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ArrowLeft, User, Trophy } from "lucide-react";
import { toast } from "sonner";

import { auth, db } from "../lib/firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { doc, getDoc, updateDoc } from "firebase/firestore";

interface ProfileProps {
  onNavigate?: (section: string) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);

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

      await updateDoc(docRef, {
        name: editForm.name,
        phone: editForm.phone,
        bio: editForm.bio,
        favoriteGame: editForm.favoriteGame,
        updatedAt: new Date()
      });

      setUser({ ...user, ...editForm });
      setIsEditing(false);
      toast.success("Profile updated!");

    } catch {
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

        {/* TOP */}
        <div className="flex justify-between mb-6 w-full">
          <Button
            variant="outline"
            onClick={() => onNavigate?.("home")}
            className="border-white/10 hover:bg-white/10 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          <Button
            onClick={handleLogout}
            className="bg-red-600 text-white hover:bg-red-500 transition duration-200"
          >
            Logout
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-6 w-full">

          {/* LEFT */}
          <Card className="p-6 text-center border border-white/10 rounded-xl">
            <Avatar
              className="w-24 h-24 mx-auto mb-4 cursor-pointer"
              onClick={() => setPreviewOpen(true)}
            >
              <AvatarImage src={user.avatar} />
              <AvatarFallback><User /></AvatarFallback>
            </Avatar>

            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>

            <Badge className="mt-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
              <Trophy className="w-3 h-3 mr-1" />
              Gamer
            </Badge>
          </Card>

          {/* RIGHT */}
          <Card className="p-6 border border-white/10 rounded-xl col-span-2">

            <div className="flex justify-between mb-4">
              <h2 className="font-semibold">Profile Info</h2>

              {!isEditing ? (
                <Button
                  onClick={() => setIsEditing(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                >
                  Edit
                </Button>
              ) : (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    className="bg-gradient-to-r from-blue-500 to-purple-600 text-white"
                  >
                    {isLoading ? "Saving..." : "Save"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => setIsEditing(false)}
                    className="border-white/10 hover:bg-white/10"
                  >
                    Cancel
                  </Button>
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

              {/* GAME */}
              <div>
                <Label>Favorite Game</Label>
                {isEditing ? (
                  <select
                    value={editForm.favoriteGame}
                    onChange={(e) =>
                      setEditForm({ ...editForm, favoriteGame: e.target.value })
                    }
                    className="w-full p-2 border border-white/10 bg-background rounded-md"
                  >
                    <option value="">Select</option>
                    <option>BGMI</option>
                    <option>Valorant</option>
                    <option>CSGO</option>
                    <option>COD</option>
                  </select>
                ) : (
                  <div className="p-2 border border-white/10 rounded-md">
                    {user.favoriteGame || "Not set"}
                  </div>
                )}
              </div>

            </div>
          </Card>
        </div>

        {/* AVATAR MODAL */}
        {previewOpen && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center"
            onClick={() => setPreviewOpen(false)}
          >
            <img src={user.avatar} className="max-w-xs rounded" />
          </div>
        )}

      </div>
    </section>
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
        <div className="p-2 border border-white/10 rounded-md">{value || "Not set"}</div>
      )}
    </div>
  );
}

function StaticField({ label, value }: any) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="p-2 border border-white/10 rounded-md">{value}</div>
    </div>
  );
}