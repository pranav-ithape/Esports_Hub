"use client"

import { useState } from "react"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { toast } from "sonner"

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/reset-password`,
      })

      if (error) throw error

      setIsSubmitted(true)
      toast.success("Password reset email sent!")
    } catch (error: any) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border border-border shadow-lg">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Check Your Email</h2>
            <p className="text-muted-foreground mb-4">
              {"We've sent a password reset link to"}{" "}
              <span className="font-medium text-foreground">{email}</span>
            </p>
            <p className="text-sm text-muted-foreground mb-6">
              {"Didn't receive the email? Check your spam folder or"}
            </p>
            <Button
              variant="outline"
              onClick={() => setIsSubmitted(false)}
            >
              Try again with a different email
            </Button>
            <div className="mt-4">
              <Link href="/auth/login">
                <Button variant="link" className="text-blue-500">
                  Back to Login
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/auth/login">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Login
          </Button>
        </Link>

        <Card className="border border-border shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <CardTitle className="text-2xl">Forgot Password?</CardTitle>
            <CardDescription>
              {"Enter your email address and we'll send you a link to reset your password"}
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {error && <p className="text-sm text-red-500">{error}</p>}

              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                disabled={isLoading}
              >
                {isLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </form>

            <div className="text-center text-sm">
              Remember your password?{" "}
              <Link href="/auth/login" className="text-blue-500 hover:underline">
                Sign in
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
