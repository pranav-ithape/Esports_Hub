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
import { Profile } from "./components/Profile";
import { Footer } from "./components/Footer";
import { ThemeProvider } from "./components/ThemeProvider";
import { CartProvider } from "./components/CartContext";
import { CountryProvider } from "./components/CountryContext";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider } from "./components/AuthContext";
import { GameDetails } from "./components/GameDetails";

// 🔥 ADMIN IMPORTS
import AdminDashboard from "./components/AdminDashboard";
import AddPlayer from "./components/AddPlayer";
import AddProduct from "./components/AddProduct";
import AdminReviews from "./components/AdminReviews";
import AddTournament from "./components/AddTournament"; // ✅ ADDED
import AddTeam from "./components/AddTeam";
// 🔥 CHECKOUT
import Checkout from "./components/Checkout";

export default function App() {
  const [currentSection, setCurrentSection] = useState("home");

  const handleNavigate = (section: string) => {
    setCurrentSection(section);
  };

  const renderContent = () => {
    // ✅ Dynamic Game Page
    if (currentSection.startsWith("game-")) {
      const gameId = currentSection.replace("game-", "");
      return <GameDetails gameId={gameId} />;
    }

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
        return <Shop />;

      case "cart":
        return <Cart onNavigate={handleNavigate} />;

      case "checkout":
        return <Checkout onNavigate={handleNavigate} />;

      case "login":
        return <Login onNavigate={handleNavigate} />;

      case "profile":
        return <Profile onNavigate={handleNavigate} />;

      // 🔥 ADMIN DASHBOARD
      case "admin":
        return <AdminDashboard onNavigate={handleNavigate} />;

      // 🔥 ADD PLAYER
      case "add-player":
        return <AddPlayer />;

      // 🔥 ADD PRODUCT
      case "add-product":
        return <AddProduct />;

      // 🔥 ADD TOURNAMENT ✅ FIXED
      case "add-tournament":
        return <AddTournament />;

      // 🔥 ADMIN REVIEWS (already in dashboard)
      case "admin-reviews":
        return <AdminReviews />;

      // 🔥 ADD TEAM
      case "add-team":
        return <AddTeam />;

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
      <AuthProvider>
        <CountryProvider>
          <CartProvider>
            <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
              
              <Header
                currentSection={currentSection}
                onNavigate={handleNavigate}
              />

              <main>{renderContent()}</main>

              <Footer />
              <Toaster />
            </div>
          </CartProvider>
        </CountryProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}