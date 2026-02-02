"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useAuth } from "@/components/auth-provider"
import { useCart } from "@/components/cart-provider"
import { useCountry } from "@/components/country-provider"
import { useTheme } from "next-themes"
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Sun,
  Moon,
  Globe,
  LogOut,
} from "lucide-react"
import { useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/teams", label: "Teams" },
  { href: "/players", label: "Players" },
  { href: "/tournaments", label: "Tournaments" },
  { href: "/shop", label: "Shop" },
]

export function Header() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { getCartItemsCount } = useCart()
  const { selectedCountry, setSelectedCountry, countries } = useCountry()
  const { theme, setTheme } = useTheme()
  const cartCount = getCartItemsCount()

  const handleSignOut = async () => {
    await signOut()
  }

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <img
              src="/assets/websitelogo/logo.png"
              alt="Esports Hub"
              className="w-10 h-10 rounded object-cover"
            />
            <span className="text-xl font-bold text-foreground">
              Esports Hub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  pathname === link.href
                    ? "text-foreground border-b-2 border-blue-500"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Country Selector */}
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-32 h-8 text-xs">
                  <SelectValue placeholder="Country" />
                </SelectTrigger>
                <SelectContent className="max-h-60">
                  {countries.map((country) => (
                    <SelectItem
                      key={country.name}
                      value={country.name}
                      className="text-xs"
                    >
                      {country.name} ({country.currency})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Theme Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-muted-foreground hover:text-foreground"
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            {/* Cart */}
            <Link href="/cart">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground relative"
              >
                <ShoppingCart className="w-4 h-4 mr-2" />
                Cart
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </Button>
            </Link>

            {/* User Menu */}
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <Avatar className="w-6 h-6">
                      <AvatarImage src={user.user_metadata?.avatar_url} />
                      <AvatarFallback>
                        {user.email?.charAt(0).toUpperCase()}
                      </AvatarFallback>
                    </Avatar>
                    <span className="hidden lg:inline">
                      {user.user_metadata?.full_name || user.email?.split("@")[0]}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href="/profile">
                      <User className="w-4 h-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth/login">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-muted-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`transition-colors ${
                    pathname === link.href
                      ? "text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}

              <div className="flex flex-col gap-2 pt-4 border-t border-border">
                <Link href="/cart" onClick={() => setIsMenuOpen(false)}>
                  <Button variant="ghost" size="sm" className="w-full justify-start">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Cart {cartCount > 0 && `(${cartCount})`}
                  </Button>
                </Link>

                {user ? (
                  <>
                    <Link href="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" size="sm" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" />
                        Profile
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full justify-start"
                      onClick={handleSignOut}
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <Link href="/auth/login" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" size="sm" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
