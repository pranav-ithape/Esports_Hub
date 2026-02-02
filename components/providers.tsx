"use client"

import { ThemeProvider } from "next-themes"
import { AuthProvider } from "@/components/auth-provider"
import { CartProvider } from "@/components/cart-provider"
import { CountryProvider } from "@/components/country-provider"

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <AuthProvider>
        <CountryProvider>
          <CartProvider>
            {children}
          </CartProvider>
        </CountryProvider>
      </AuthProvider>
    </ThemeProvider>
  )
}
