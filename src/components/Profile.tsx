import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { ArrowLeft, Edit, Save, X, User, Mail, Calendar, Trophy, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "../utils/supabase/supabaseclient.js";

interface ProfileProps {
  onNavigate?: (section: string) => void;
}

export function Profile({ onNavigate }: ProfileProps) {
  const [user, setUser] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({
    name: "",
    email: "",
    avatar: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  // ✅ Get real authenticated user
  useEffect(() => {
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (!user) {
        onNavigate?.("login");
        return;
      }

      // Fetch profile data from profiles table
      const { data: profileData, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      }

      const userData = {
        id: user.id,
        name: profileData?.full_name || user.user_metadata?.name || "",
        email: user.email,
        avatar: profileData?.avatar_url || "",
        joinDate: user.created_at
      };

      setUser(userData);

      setEditForm({
        name: userData.name,
        email: userData.email || "",
        avatar: userData.avatar || ""
      });
    };

    checkUser();
  }, []);

  // ✅ Save updated profile
  const handleSave = async () => {
    setIsLoading(true);

    try {
      const { error } = await supabase
        .from("profiles")
        .update({
          full_name: editForm.name,
          avatar_url: editForm.avatar,
          updated_at: new Date().toISOString()
        })
        .eq("id", user.id);

      if (error) {
        toast.error(error.message);
        setIsLoading(false);
        return;
      }

      setUser({
        ...user,
        name: editForm.name,
        avatar: editForm.avatar
      });

      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error("Something went wrong!");
    }

    setIsLoading(false);
  };

  const handleCancel = () => {
    setEditForm({
      name: user?.name || "",
      email: user?.email || "",
      avatar: user?.avatar || ""
    });
    setIsEditing(false);
  };

  if (!user) {
    return (
      <section className="py-20 bg-background min-h-screen">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">

          <div className="flex items-center mb-8">
            <Button
              onClick={() => onNavigate?.("home")}
              variant="outline"
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

            {/* Left Profile Card */}
            <div>
              <Card className="shadow-lg">
                <CardHeader className="text-center">
                  <Avatar className="w-24 h-24 mx-auto mb-4">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>
                      <User className="w-12 h-12" />
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle>{user.name}</CardTitle>
                  <p className="text-muted-foreground">{user.email}</p>
                  <Badge className="mt-2">
                    <Trophy className="w-3 h-3 mr-1" />
                    Esports Enthusiast
                  </Badge>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Profile Details */}
            <div className="lg:col-span-2">
              <Card className="shadow-lg">
                <CardHeader className="flex justify-between items-center">
                  <CardTitle>Profile Information</CardTitle>

                  {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)} size="sm">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit
                    </Button>
                  ) : (
                    <div className="flex gap-2">
                      <Button onClick={handleSave} size="sm" disabled={isLoading}>
                        <Save className="w-4 h-4 mr-2" />
                        {isLoading ? "Saving..." : "Save"}
                      </Button>
                      <Button onClick={handleCancel} size="sm" variant="outline">
                        <X className="w-4 h-4 mr-2" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </CardHeader>

                <CardContent className="space-y-6">

                  <div>
                    <Label>Full Name</Label>
                    {isEditing ? (
                      <Input
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                      />
                    ) : (
                      <div className="p-3 bg-muted rounded-md">{user.name}</div>
                    )}
                  </div>

                  <div>
                    <Label>Email</Label>
                    <div className="p-3 bg-muted rounded-md">
                      {user.email}
                    </div>
                  </div>

                  {isEditing && (
                    <div>
                      <Label>Avatar URL</Label>
                      <Input
                        value={editForm.avatar}
                        onChange={(e) =>
                          setEditForm({ ...editForm, avatar: e.target.value })
                        }
                      />
                    </div>
                  )}

                </CardContent>
              </Card>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}