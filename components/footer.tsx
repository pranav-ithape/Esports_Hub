"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Twitch,
  MessageCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img
                src="/assets/websitelogo/logo.png"
                alt="Esports Hub"
                className="w-8 h-8 rounded object-cover"
              />
              <span className="text-xl font-bold text-foreground">Esports Hub</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The ultimate destination for professional esports. Follow teams,
              track stats, and get exclusive merchandise.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-2">
                <Facebook className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-2">
                <Twitter className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-2">
                <Instagram className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-2">
                <Youtube className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-2">
                <Twitch className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground p-2">
                <MessageCircle className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </Link>
              <Link href="/teams" className="text-muted-foreground hover:text-foreground transition-colors">
                Teams
              </Link>
              <Link href="/players" className="text-muted-foreground hover:text-foreground transition-colors">
                Players
              </Link>
              <Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors">
                Shop
              </Link>
              <Link href="/tournaments" className="text-muted-foreground hover:text-foreground transition-colors">
                Tournaments
              </Link>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Support</h3>
            <nav className="flex flex-col gap-2">
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Shipping Info
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Returns
              </Link>
              <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </Link>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="font-semibold text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground">
              Get the latest esports news and exclusive offers.
            </p>
            <div className="space-y-2">
              <Input
                placeholder="Enter your email"
                className="bg-muted border-border"
              />
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Subscribe
              </Button>
            </div>

            <div className="space-y-2 pt-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>pranavithape3@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+91 7499198297</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>{"SSPM's COE, Kankavli"}</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8" />

        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-muted-foreground">
            2025 Esports Hub. All rights reserved.
          </div>
          <div className="flex gap-6">
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
