"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { countries, type Country } from "@/lib/data"

interface CountryContextType {
  selectedCountry: string
  setSelectedCountry: (country: string) => void
  countries: Country[]
  getCurrentCountry: () => Country | undefined
  formatPrice: (priceUSD: number) => string
}

const CountryContext = createContext<CountryContextType | undefined>(undefined)

export function CountryProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountryState] = useState<string>("India")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const stored = localStorage.getItem("esports-country")
    if (stored && countries.find(c => c.name === stored)) {
      setSelectedCountryState(stored)
    }
  }, [])

  const setSelectedCountry = (country: string) => {
    setSelectedCountryState(country)
    if (typeof window !== "undefined") {
      localStorage.setItem("esports-country", country)
    }
  }

  const getCurrentCountry = (): Country | undefined => {
    return countries.find(c => c.name === selectedCountry)
  }

  const formatPrice = (priceUSD: number): string => {
    const country = getCurrentCountry()
    if (!country) return `$${priceUSD.toFixed(2)}`
    const convertedPrice = priceUSD * country.rate
    return `${country.symbol}${convertedPrice.toFixed(convertedPrice < 10 ? 2 : 0)}`
  }

  return (
    <CountryContext.Provider
      value={{
        selectedCountry,
        setSelectedCountry,
        countries,
        getCurrentCountry,
        formatPrice,
      }}
    >
      {children}
    </CountryContext.Provider>
  )
}

export function useCountry() {
  const context = useContext(CountryContext)
  if (!context) {
    throw new Error("useCountry must be used within a CountryProvider")
  }
  return context
}
