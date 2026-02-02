import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { AlertCircle, ArrowLeft } from "lucide-react"

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Link href="/">
          <Button variant="ghost" className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Button>
        </Link>

        <Card className="border border-border shadow-lg">
          <CardContent className="pt-6 text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-foreground mb-2">Authentication Error</h2>
            <p className="text-muted-foreground mb-6">
              Something went wrong during the authentication process. This could be due to an expired link or an invalid request.
            </p>
            <div className="flex flex-col gap-2">
              <Link href="/auth/login">
                <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Try Again
                </Button>
              </Link>
              <Link href="/">
                <Button variant="outline" className="w-full">
                  Go to Homepage
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
