"use client"

import { useState, Suspense } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp"
import { ArrowLeft, Mail, CheckCircle } from "lucide-react"
import { toast } from "sonner"

function VerifyEmailContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const email = searchParams.get("email") || ""
  const [otp, setOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isVerified, setIsVerified] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleVerify = async () => {
    if (otp.length !== 6) {
      setError("Please enter the complete 6-digit code")
      return
    }

    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
      })

      if (error) throw error

      setIsVerified(true)
      toast.success("Email verified successfully!")
      
      setTimeout(() => {
        router.push("/")
        router.refresh()
      }, 2000)
    } catch (error: any) {
      setError(error.message)
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  const handleResend = async () => {
    setIsLoading(true)
    setError(null)

    const supabase = createClient()

    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email,
      })

      if (error) throw error

      toast.success("Verification email sent!")
    } catch (error: any) {
      toast.error(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  if (isVerified) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-md border border-border shadow-lg">
          <CardContent className="pt-6 text-center">
            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Email Verified!</h2>
            <p className="text-muted-foreground mb-4">
              Your email has been verified successfully. Redirecting you to the homepage...
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/auth/signup">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Sign Up
          </Button>
        </Link>

        <Card className="border border-border shadow-lg">
          <CardHeader className="text-center pb-4">
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-blue-500/10 rounded-full flex items-center justify-center">
                <Mail className="w-8 h-8 text-blue-500" />
              </div>
            </div>
            <CardTitle className="text-2xl">Verify Your Email</CardTitle>
            <CardDescription>
              {"We've sent a 6-digit verification code to"}{" "}
              <span className="font-medium text-foreground">{email}</span>
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={otp}
                onChange={(value) => setOtp(value)}
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {error && <p className="text-sm text-red-500 text-center">{error}</p>}

            <Button
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={handleVerify}
              disabled={isLoading || otp.length !== 6}
            >
              {isLoading ? "Verifying..." : "Verify Email"}
            </Button>

            <div className="text-center">
              <p className="text-sm text-muted-foreground mb-2">
                {"Didn't receive the code?"}
              </p>
              <Button
                variant="link"
                onClick={handleResend}
                disabled={isLoading}
                className="text-blue-500"
              >
                Resend verification email
              </Button>
            </div>

            <p className="text-xs text-center text-muted-foreground">
              Check your spam folder if you {"don't"} see the email in your inbox
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    }>
      <VerifyEmailContent />
    </Suspense>
  )
}
