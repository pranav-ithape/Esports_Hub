import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Country {
  name: string;
  currency: string;
  symbol: string;
  rate: number;
}

const countries: Country[] = [
  { name: "Argentina", currency: "ARS", symbol: "$", rate: 850 },
  { name: "Australia", currency: "AUD", symbol: "A$", rate: 1.55 },
  { name: "Austria", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Belgium", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Brazil", currency: "BRL", symbol: "R$", rate: 5.2 },
  { name: "Bulgaria", currency: "BGN", symbol: "лв", rate: 1.8 },
  { name: "Canada", currency: "CAD", symbol: "C$", rate: 1.35 },
  { name: "Chile", currency: "CLP", symbol: "$", rate: 920 },
  { name: "China", currency: "CNY", symbol: "¥", rate: 7.2 },
  { name: "Colombia", currency: "COP", symbol: "$", rate: 4200 },
  { name: "Croatia", currency: "HRK", symbol: "kn", rate: 6.9 },
  { name: "Czech Republic", currency: "CZK", symbol: "Kč", rate: 23 },
  { name: "Denmark", currency: "DKK", symbol: "kr", rate: 6.9 },
  { name: "Estonia", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Finland", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "France", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Germany", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Greece", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Hungary", currency: "HUF", symbol: "Ft", rate: 360 },
  { name: "India", currency: "INR", symbol: "₹", rate: 83 },
  { name: "Indonesia", currency: "IDR", symbol: "Rp", rate: 15800 },
  { name: "Italy", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Japan", currency: "JPY", symbol: "¥", rate: 148 },
  { name: "Latvia", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Lithuania", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Malaysia", currency: "MYR", symbol: "RM", rate: 4.7 },
  { name: "Mexico", currency: "MXN", symbol: "$", rate: 18 },
  { name: "Netherlands", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Norway", currency: "NOK", symbol: "kr", rate: 10.8 },
  { name: "Peru", currency: "PEN", symbol: "S/", rate: 3.7 },
  { name: "Philippines", currency: "PHP", symbol: "₱", rate: 56 },
  { name: "Poland", currency: "PLN", symbol: "zł", rate: 4.1 },
  { name: "Portugal", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Romania", currency: "RON", symbol: "lei", rate: 4.6 },
  { name: "Russia", currency: "RUB", symbol: "₽", rate: 92 },
  { name: "Serbia", currency: "RSD", symbol: "дин", rate: 108 },
  { name: "Singapore", currency: "SGD", symbol: "S$", rate: 1.35 },
  { name: "Slovakia", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Slovenia", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "South Korea", currency: "KRW", symbol: "₩", rate: 1320 },
  { name: "Spain", currency: "EUR", symbol: "€", rate: 0.92 },
  { name: "Sweden", currency: "SEK", symbol: "kr", rate: 10.5 },
  { name: "Switzerland", currency: "CHF", symbol: "CHF", rate: 0.88 },
  { name: "Thailand", currency: "THB", symbol: "฿", rate: 36 },
  { name: "Turkey", currency: "TRY", symbol: "₺", rate: 30 },
  { name: "Ukraine", currency: "UAH", symbol: "₴", rate: 37 },
  { name: "United Kingdom", currency: "GBP", symbol: "£", rate: 0.79 },
  { name: "United States", currency: "USD", symbol: "$", rate: 1 },
  { name: "Vietnam", currency: "VND", symbol: "₫", rate: 24500 }
];

interface CountryContextType {
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  countries: Country[];
  getCurrentCountry: () => Country | undefined;
  formatPrice: (priceUSD: number) => string;
}

const CountryContext = createContext<CountryContextType | undefined>(undefined);

export function CountryProvider({ children }: { children: ReactNode }) {
  const [selectedCountry, setSelectedCountryState] = useState<string>("India");

  useEffect(() => {
    const stored = localStorage.getItem('esports-country');
    if (stored && countries.find(c => c.name === stored)) {
      setSelectedCountryState(stored);
    }
  }, []);

  const setSelectedCountry = (country: string) => {
    setSelectedCountryState(country);
    localStorage.setItem('esports-country', country);
  };

  const getCurrentCountry = (): Country | undefined => {
    return countries.find(c => c.name === selectedCountry);
  };

  const formatPrice = (priceUSD: number): string => {
    const country = getCurrentCountry();
    if (!country) return `$${priceUSD.toFixed(2)}`;

    const convertedPrice = priceUSD * country.rate;
    return `${country.symbol}${convertedPrice.toFixed(convertedPrice < 10 ? 2 : 0)}`;
  };

  return (
    <CountryContext.Provider value={{
      selectedCountry,
      setSelectedCountry,
      countries,
      getCurrentCountry,
      formatPrice
    }}>
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}
