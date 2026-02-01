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
import { ImageWithFallback } from "./figma/ImageWithFallback";
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

  useEffect(() => {
    const checkUser = async () => {
      const savedUser = localStorage.getItem("esports-user");
      if (savedUser) {
        try {
          const userData = JSON.parse(savedUser);
          setUser(userData);
          setEditForm({
            name: userData.name || "",
            email: userData.email || "",
            avatar: userData.avatar || ""
          });
        } catch (error) {
          console.error("Error parsing user data:", error);
          localStorage.removeItem("esports-user");
          onNavigate?.("login");
        }
      } else {
        // Redirect to login if no user data
        onNavigate?.("login");
      }
    };

    checkUser();
  }, []); // Remove onNavigate from dependencies to prevent infinite loops

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Update Supabase profile
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: editForm.name,
          avatar_url: editForm.avatar,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error("Supabase update error:", error);
        toast.error("Failed to update profile");
        setIsLoading(false);
        return;
      }

      // Update localStorage
      const updatedUser = {
        ...user,
        name: editForm.name,
        avatar: editForm.avatar
      };
      localStorage.setItem("esports-user", JSON.stringify(updatedUser));
      setUser(updatedUser);
      setIsEditing(false);
      toast.success("Profile updated successfully!");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to update profile");
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
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">Loading profile...</p>
          </div>
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
              onClick={() => onNavigate?.('home')}
              variant="outline"
              className="mr-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Card */}
            <div className="lg:col-span-1">
              <Card className="border border-border shadow-lg">
                <CardHeader className="text-center pb-4">
                  <div className="flex justify-center mb-4">
                    <Avatar className="w-24 h-24">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>
                        <User className="w-12 h-12" />
                      </AvatarFallback>
                    </Avatar>
                  </div>
                  <CardTitle className="text-xl">{user.name}</CardTitle>
                  <p className="text-muted-foreground">{user.email}</p>
                  <Badge variant="secondary" className="mt-2">
                    <Trophy className="w-3 h-3 mr-1" />
                    Esports Enthusiast
                  </Badge>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-2" />
                    Joined {new Date(user.joinDate).toLocaleDateString()}
                  </div>
                  <Separator />
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm">Quick Stats</h4>
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-blue-500">0</div>
                        <div className="text-xs text-muted-foreground">Tournaments</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-green-500">0</div>
                        <div className="text-xs text-muted-foreground">Purchases</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Profile Details */}
            <div className="lg:col-span-2">
              <Card className="border border-border shadow-lg">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Profile Information
                    </CardTitle>
                    {!isEditing ? (
                      <Button
                        onClick={() => setIsEditing(true)}
                        variant="outline"
                        size="sm"
                      >
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                      </Button>
                    ) : (
                      <div className="flex space-x-2">
                        <Button
                          onClick={handleSave}
                          size="sm"
                          disabled={isLoading}
                        >
                          <Save className="w-4 h-4 mr-2" />
                          {isLoading ? "Saving..." : "Save"}
                        </Button>
                        <Button
                          onClick={handleCancel}
                          variant="outline"
                          size="sm"
                        >
                          <X className="w-4 h-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      {isEditing ? (
                        <Input
                          id="name"
                          value={editForm.name}
                          onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                          placeholder="Enter your full name"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-muted rounded-md">
                          <User className="w-4 h-4 mr-3 text-muted-foreground" />
                          <span>{user.name}</span>
                        </div>
                      )}
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      {isEditing ? (
                        <Input
                          id="email"
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm({...editForm, email: e.target.value})}
                          placeholder="Enter your email"
                        />
                      ) : (
                        <div className="flex items-center p-3 bg-muted rounded-md">
                          <Mail className="w-4 h-4 mr-3 text-muted-foreground" />
                          <span>{user.email}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {isEditing && (
                    <div className="space-y-2">
                      <Label htmlFor="avatar">Avatar URL</Label>
                      <Input
                        id="avatar"
                        value={editForm.avatar}
                        onChange={(e) => setEditForm({...editForm, avatar: e.target.value})}
                        placeholder="Enter avatar image URL"
                      />
                    </div>
                  )}

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Account Settings</h4>
                    <div className="space-y-3">
                      <Button variant="outline" className="w-full justify-start">
                        <Trophy className="w-4 h-4 mr-2" />
                        View Tournament History
                      </Button>
                      <Button variant="outline" className="w-full justify-start">
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        View Purchase History
                      </Button>
                      <Button variant="outline" className="w-full justify-start text-red-600 hover:text-red-700">
                        Change Password
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
