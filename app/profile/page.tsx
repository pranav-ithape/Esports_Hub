"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client"
import { useAuth } from "@/components/auth-provider"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  User,
  Mail,
  Calendar,
  Trophy,
  ShoppingBag,
  Edit,
  Save,
  X,
  Camera,
  Lock,
  Phone,
  Globe,
  Gamepad2,
} from "lucide-react"
import { toast } from "sonner"
import { countries } from "@/lib/data"

const games = [
  "Counter Strike",
  "League of Legends",
  "Valorant",
  "Dota 2",
  "Overwatch 2",
  "Fortnite",
  "PUBG",
  "Apex Legends",
]

export default function ProfilePage() {
  const router = useRouter()
  const { user, isLoading: authLoading, refreshUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [showPasswordDialog, setShowPasswordDialog] = useState(false)
  
  const [profile, setProfile] = useState({
    full_name: "",
    username: "",
    bio: "",
    phone: "",
    country: "India",
    favorite_game: "",
    avatar_url: "",
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })

  useEffect(() => {
    if (user) {
      setProfile({
        full_name: user.user_metadata?.full_name || user.user_metadata?.name || "",
        username: user.user_metadata?.username || "",
        bio: user.user_metadata?.bio || "",
        phone: user.phone || "",
        country: user.user_metadata?.country || "India",
        favorite_game: user.user_metadata?.favorite_game || "",
        avatar_url: user.user_metadata?.avatar_url || "",
      })
    }
  }, [user])

  const handleSave = async () => {
    setIsSaving(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          full_name: profile.full_name,
          username: profile.username,
          bio: profile.bio,
          country: profile.country,
          favorite_game: profile.favorite_game,
          avatar_url: profile.avatar_url,
        },
      })

      if (error) throw error

      await refreshUser()
      setIsEditing(false)
      toast.success("Profile updated successfully!")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // For now, we'll use a URL input instead of file upload
    // In production, you'd upload to Supabase Storage
    toast.info("Please enter an image URL in the Avatar URL field")
  }

  const handlePasswordChange = async () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    if (passwordForm.newPassword.length < 8) {
      toast.error("Password must be at least 8 characters")
      return
    }

    setIsSaving(true)
    const supabase = createClient()

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwordForm.newPassword,
      })

      if (error) throw error

      setShowPasswordDialog(false)
      setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" })
      toast.success("Password changed successfully!")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsSaving(false)
    }
  }

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    )
  }

  if (!user || !isSupabaseConfigured) {
    router.push("/auth/login")
    return null
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold text-foreground mb-8">My Profile</h1>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Profile Card */}
              <div className="lg:col-span-1">
                <Card className="border border-border">
                  <CardContent className="pt-6 text-center">
                    <div className="relative inline-block mb-4">
                      <Avatar className="w-24 h-24">
                        <AvatarImage src={profile.avatar_url} />
                        <AvatarFallback className="text-2xl">
                          {profile.full_name?.charAt(0) || user.email?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      {isEditing && (
                        <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600">
                          <Camera className="w-4 h-4 text-white" />
                          <input
                            type="file"
                            className="hidden"
                            accept="image/*"
                            onChange={handleAvatarChange}
                          />
                        </label>
                      )}
                    </div>

                    <h2 className="text-xl font-semibold text-foreground">
                      {profile.full_name || "Esports Fan"}
                    </h2>
                    {profile.username && (
                      <p className="text-muted-foreground">@{profile.username}</p>
                    )}
                    <p className="text-sm text-muted-foreground mt-1">{user.email}</p>
                    
                    <div className="flex justify-center gap-2 mt-4">
                      <Badge variant="secondary">
                        <Trophy className="w-3 h-3 mr-1" />
                        Esports Enthusiast
                      </Badge>
                    </div>

                    <Separator className="my-4" />

                    <div className="text-left space-y-3">
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        Joined {new Date(user.created_at).toLocaleDateString()}
                      </div>
                      {profile.country && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Globe className="w-4 h-4" />
                          {profile.country}
                        </div>
                      )}
                      {profile.favorite_game && (
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Gamepad2 className="w-4 h-4" />
                          {profile.favorite_game}
                        </div>
                      )}
                    </div>

                    <Separator className="my-4" />

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
                  </CardContent>
                </Card>
              </div>

              {/* Profile Details */}
              <div className="lg:col-span-2">
                <Card className="border border-border">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="flex items-center gap-2">
                        <User className="w-5 h-5" />
                        Profile Information
                      </CardTitle>
                      {!isEditing ? (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setIsEditing(true)}
                        >
                          <Edit className="w-4 h-4 mr-2" />
                          Edit Profile
                        </Button>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            onClick={handleSave}
                            disabled={isSaving}
                          >
                            <Save className="w-4 h-4 mr-2" />
                            {isSaving ? "Saving..." : "Save"}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setIsEditing(false)}
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <Tabs defaultValue="general">
                      <TabsList>
                        <TabsTrigger value="general">General</TabsTrigger>
                        <TabsTrigger value="security">Security</TabsTrigger>
                      </TabsList>

                      <TabsContent value="general" className="space-y-4 mt-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="fullName">Full Name</Label>
                            {isEditing ? (
                              <Input
                                id="fullName"
                                value={profile.full_name}
                                onChange={(e) =>
                                  setProfile({ ...profile, full_name: e.target.value })
                                }
                                placeholder="Enter your full name"
                              />
                            ) : (
                              <div className="flex items-center p-3 bg-muted rounded-md">
                                <User className="w-4 h-4 mr-3 text-muted-foreground" />
                                <span>{profile.full_name || "Not set"}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="username">Username</Label>
                            {isEditing ? (
                              <Input
                                id="username"
                                value={profile.username}
                                onChange={(e) =>
                                  setProfile({ ...profile, username: e.target.value })
                                }
                                placeholder="Choose a username"
                              />
                            ) : (
                              <div className="flex items-center p-3 bg-muted rounded-md">
                                <span className="text-muted-foreground mr-1">@</span>
                                <span>{profile.username || "Not set"}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <div className="flex items-center p-3 bg-muted rounded-md">
                              <Mail className="w-4 h-4 mr-3 text-muted-foreground" />
                              <span>{user.email}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <div className="flex items-center p-3 bg-muted rounded-md">
                              <Phone className="w-4 h-4 mr-3 text-muted-foreground" />
                              <span>{user.phone || "Not verified"}</span>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="country">Country</Label>
                            {isEditing ? (
                              <Select
                                value={profile.country}
                                onValueChange={(value) =>
                                  setProfile({ ...profile, country: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select country" />
                                </SelectTrigger>
                                <SelectContent className="max-h-60">
                                  {countries.map((country) => (
                                    <SelectItem key={country.name} value={country.name}>
                                      {country.name}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <div className="flex items-center p-3 bg-muted rounded-md">
                                <Globe className="w-4 h-4 mr-3 text-muted-foreground" />
                                <span>{profile.country || "Not set"}</span>
                              </div>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="favoriteGame">Favorite Game</Label>
                            {isEditing ? (
                              <Select
                                value={profile.favorite_game}
                                onValueChange={(value) =>
                                  setProfile({ ...profile, favorite_game: value })
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select game" />
                                </SelectTrigger>
                                <SelectContent>
                                  {games.map((game) => (
                                    <SelectItem key={game} value={game}>
                                      {game}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <div className="flex items-center p-3 bg-muted rounded-md">
                                <Gamepad2 className="w-4 h-4 mr-3 text-muted-foreground" />
                                <span>{profile.favorite_game || "Not set"}</span>
                              </div>
                            )}
                          </div>
                        </div>

                        {isEditing && (
                          <div className="space-y-2">
                            <Label htmlFor="avatarUrl">Avatar URL</Label>
                            <Input
                              id="avatarUrl"
                              value={profile.avatar_url}
                              onChange={(e) =>
                                setProfile({ ...profile, avatar_url: e.target.value })
                              }
                              placeholder="Enter avatar image URL"
                            />
                          </div>
                        )}

                        <div className="space-y-2">
                          <Label htmlFor="bio">Bio</Label>
                          {isEditing ? (
                            <Textarea
                              id="bio"
                              value={profile.bio}
                              onChange={(e) =>
                                setProfile({ ...profile, bio: e.target.value })
                              }
                              placeholder="Tell us about yourself..."
                              rows={4}
                            />
                          ) : (
                            <div className="p-3 bg-muted rounded-md min-h-[100px]">
                              <span className="text-muted-foreground">
                                {profile.bio || "No bio yet"}
                              </span>
                            </div>
                          )}
                        </div>
                      </TabsContent>

                      <TabsContent value="security" className="space-y-4 mt-4">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                            <div>
                              <h4 className="font-medium">Password</h4>
                              <p className="text-sm text-muted-foreground">
                                Change your account password
                              </p>
                            </div>
                            <Dialog open={showPasswordDialog} onOpenChange={setShowPasswordDialog}>
                              <DialogTrigger asChild>
                                <Button variant="outline">
                                  <Lock className="w-4 h-4 mr-2" />
                                  Change Password
                                </Button>
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>Change Password</DialogTitle>
                                  <DialogDescription>
                                    Enter your new password below
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="space-y-4 py-4">
                                  <div className="space-y-2">
                                    <Label>New Password</Label>
                                    <Input
                                      type="password"
                                      value={passwordForm.newPassword}
                                      onChange={(e) =>
                                        setPasswordForm({
                                          ...passwordForm,
                                          newPassword: e.target.value,
                                        })
                                      }
                                      placeholder="Enter new password"
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label>Confirm Password</Label>
                                    <Input
                                      type="password"
                                      value={passwordForm.confirmPassword}
                                      onChange={(e) =>
                                        setPasswordForm({
                                          ...passwordForm,
                                          confirmPassword: e.target.value,
                                        })
                                      }
                                      placeholder="Confirm new password"
                                    />
                                  </div>
                                  <Button
                                    className="w-full"
                                    onClick={handlePasswordChange}
                                    disabled={isSaving}
                                  >
                                    {isSaving ? "Updating..." : "Update Password"}
                                  </Button>
                                </div>
                              </DialogContent>
                            </Dialog>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                            <div>
                              <h4 className="font-medium">Email Verification</h4>
                              <p className="text-sm text-muted-foreground">
                                {user.email_confirmed_at
                                  ? "Your email is verified"
                                  : "Verify your email address"}
                              </p>
                            </div>
                            <Badge variant={user.email_confirmed_at ? "default" : "secondary"}>
                              {user.email_confirmed_at ? "Verified" : "Not Verified"}
                            </Badge>
                          </div>

                          <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                            <div>
                              <h4 className="font-medium">Account Activity</h4>
                              <p className="text-sm text-muted-foreground">
                                View your recent login history
                              </p>
                            </div>
                            <Button variant="outline" size="sm">
                              View History
                            </Button>
                          </div>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
