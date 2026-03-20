import { useState } from "react";
import { Card, CardContent, CardHeader } from "./ui/card";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";

import { auth, db } from "../lib/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

interface LoginProps {
  onNavigate?: (section: string) => void;
}

export function Login({ onNavigate }: LoginProps) {
  const [isLoading, setIsLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  // ✅ LOGIN
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      await signInWithEmailAndPassword(
        auth,
        loginForm.email,
        loginForm.password
      );

      toast.success("Login successful!");
      onNavigate?.("profile");
    } catch (error: any) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ SIGNUP
  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    if (signupForm.password !== signupForm.confirmPassword) {
      setErrors({ confirmPassword: "Passwords do not match" });
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signupForm.email,
        signupForm.password
      );

      await setDoc(doc(db, "users", userCredential.user.uid), {
        name: signupForm.name,
        email: signupForm.email,
        avatar: "",
        createdAt: new Date(),
      });

      toast.success("Account created successfully!");
      onNavigate?.("profile");
    } catch (error: any) {
      setErrors({ general: error.message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="py-20 bg-background min-h-screen">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">

          {/* BACK BUTTON */}
          <Button
            onClick={() => onNavigate?.("home")}
            variant="outline"
            className="mb-6 border-white/10 hover:bg-white/10 transition"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>

          {/* CARD */}
          <Card className="rounded-xl border border-white/10 bg-background shadow-md hover:shadow-lg transition-all">

            <CardHeader>
              <h1 className="text-2xl font-semibold text-center">
                Esports Hub
              </h1>
            </CardHeader>

            <CardContent>

              <Tabs defaultValue="login">

                {/* TABS */}
                <TabsList className="grid grid-cols-2 bg-muted/30 rounded-lg p-1">
                  <TabsTrigger
                    value="login"
                    className="data-[state=active]:bg-gradient-to-r 
                    data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 
                    data-[state=active]:text-white rounded-md"
                  >
                    Login
                  </TabsTrigger>

                  <TabsTrigger
                    value="signup"
                    className="data-[state=active]:bg-gradient-to-r 
                    data-[state=active]:from-blue-500 data-[state=active]:to-purple-500 
                    data-[state=active]:text-white rounded-md"
                  >
                    Signup
                  </TabsTrigger>
                </TabsList>

                {/* LOGIN */}
                <TabsContent value="login">
                  <form onSubmit={handleLogin} className="space-y-4 mt-4">

                    <Input
                      type="email"
                      placeholder="Email"
                      value={loginForm.email}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, email: e.target.value })
                      }
                      className="bg-background border border-white/10 rounded-lg 
                      focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />

                    <Input
                      type="password"
                      placeholder="Password"
                      value={loginForm.password}
                      onChange={(e) =>
                        setLoginForm({ ...loginForm, password: e.target.value })
                      }
                      className="bg-background border border-white/10 rounded-lg 
                      focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />

                    {errors.general && (
                      <p className="text-red-500 text-sm">{errors.general}</p>
                    )}

                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 
                      hover:from-blue-400 hover:to-purple-500 
                      text-white font-medium rounded-lg transition-all duration-300"
                    >
                      {isLoading ? "Loading..." : "Login"}
                    </Button>
                  </form>
                </TabsContent>

                {/* SIGNUP */}
                <TabsContent value="signup">
                  <form onSubmit={handleSignup} className="space-y-4 mt-4">

                    <Input
                      placeholder="Name"
                      value={signupForm.name}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, name: e.target.value })
                      }
                      className="bg-background border border-white/10 rounded-lg 
                      focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />

                    <Input
                      type="email"
                      placeholder="Email"
                      value={signupForm.email}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, email: e.target.value })
                      }
                      className="bg-background border border-white/10 rounded-lg 
                      focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />

                    <Input
                      type="password"
                      placeholder="Password"
                      value={signupForm.password}
                      onChange={(e) =>
                        setSignupForm({ ...signupForm, password: e.target.value })
                      }
                      className="bg-background border border-white/10 rounded-lg 
                      focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />

                    <Input
                      type="password"
                      placeholder="Confirm Password"
                      value={signupForm.confirmPassword}
                      onChange={(e) =>
                        setSignupForm({
                          ...signupForm,
                          confirmPassword: e.target.value,
                        })
                      }
                      className="bg-background border border-white/10 rounded-lg 
                      focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    />

                    {errors.confirmPassword && (
                      <p className="text-red-500 text-sm">
                        {errors.confirmPassword}
                      </p>
                    )}

                    {errors.general && (
                      <p className="text-red-500 text-sm">{errors.general}</p>
                    )}

                    <Button
                      className="w-full bg-gradient-to-r from-blue-500 to-purple-600 
                      hover:from-blue-400 hover:to-purple-500 
                      text-white font-medium rounded-lg transition-all duration-300"
                    >
                      {isLoading ? "Loading..." : "Signup"}
                    </Button>
                  </form>
                </TabsContent>

              </Tabs>
            </CardContent>
          </Card>

        </div>
      </div>
    </section>
  );
}