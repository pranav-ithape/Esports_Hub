import { useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { Home } from "./components/Home";
import { Teams } from "./components/Teams";
import { PlayerStats } from "./components/PlayerStats";
import { Tournaments } from "./components/Tournaments";
import { Shop } from "./components/Shop";
import { Cart } from "./components/Cart";
import { Login } from "./components/Login";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";
import { CartProvider } from "./components/CartContext";
import { Toaster } from "./components/ui/sonner";

export default function App() {
  const [currentSection, setCurrentSection] = useState("home");

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const renderContent = () => {
    switch (currentSection) {
      case "home":
        return (
          <>
            <Hero />
            <Home onNavigate={handleNavigate} />
          </>
        );
      case "teams":
        return <Teams onNavigate={handleNavigate} />;
      case "players":
        return <PlayerStats />;
      case "tournaments":
        return <Tournaments />;
      case "shop":
        return <Shop onNavigate={handleNavigate} />;
      case "cart":
        return <Cart onNavigate={handleNavigate} />;
      case "login":
        return <Login onNavigate={handleNavigate} />;
      default:
        return (
          <>
            <Hero />
            <Home onNavigate={handleNavigate} />
          </>
        );
    }
  };

  return (
    <ThemeProvider defaultTheme="dark" storageKey="esports-theme">
      <CartProvider>
        <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
          <Header currentSection={currentSection} onNavigate={handleNavigate} />
          <main>
            {renderContent()}
          </main>
          <Footer />
          <Toaster />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}