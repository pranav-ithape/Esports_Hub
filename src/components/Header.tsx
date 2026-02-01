import { Button } from "./ui/button";
import {
  Menu,
  X,
  ShoppingCart,
  User,
  Sun,
  Moon,
  Globe,
  LogOut,
} from "lucide-react";
import { useState, useEffect } from "react";
import { useTheme } from "./ThemeProvider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { useCountry } from "./CountryContext";

interface HeaderProps {
  currentSection: string;
  onNavigate: (section: string) => void;
}

export function Header({
  currentSection,
  onNavigate,
}: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const { theme, setTheme } = useTheme();
  const { selectedCountry, setSelectedCountry, countries, getCurrentCountry } = useCountry();

  // Check for logged in user on component mount
  useEffect(() => {
    const savedUser = localStorage.getItem("esports-user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("esports-user");
    setUser(null);
    onNavigate("home");
  };

  const handleNavigation = (section: string) => {
    onNavigate(section);
    setIsMenuOpen(false);
  };

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => handleNavigation("home")}
          >
            <ImageWithFallback
              src="/assets/websitelogo/logo.png"
              alt="Esports Hub Logo"
              className="w-10 h-10 rounded object-cover"
            />
            <span className="text-xl font-bold text-foreground">
              Esports Hub
            </span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavigation("home")}
              className={`transition-colors ${currentSection === "home" ? "text-foreground border-b-2 border-blue-500" : "text-muted-foreground hover:text-foreground"}`}
            >
              Home
            </button>
            <button
              onClick={() => handleNavigation("teams")}
              className={`transition-colors ${currentSection === "teams" ? "text-foreground border-b-2 border-blue-500" : "text-muted-foreground hover:text-foreground"}`}
            >
              Teams
            </button>
            <button
              onClick={() => handleNavigation("players")}
              className={`transition-colors ${currentSection === "players" ? "text-foreground border-b-2 border-blue-500" : "text-muted-foreground hover:text-foreground"}`}
            >
              Players
            </button>
            <button
              onClick={() => handleNavigation("tournaments")}
              className={`transition-colors ${currentSection === "tournaments" ? "text-foreground border-b-2 border-blue-500" : "text-muted-foreground hover:text-foreground"}`}
            >
              Tournaments
            </button>
            <button
              onClick={() => handleNavigation("shop")}
              className={`transition-colors ${currentSection === "shop" ? "text-foreground border-b-2 border-blue-500" : "text-muted-foreground hover:text-foreground"}`}
            >
              Shop
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Country Selector */}
            <div className="flex items-center space-x-2">
              <Globe className="w-4 h-4 text-muted-foreground" />
              <Select
                value={selectedCountry}
                onValueChange={setSelectedCountry}
              >
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

            <Button
              variant="ghost"
              size="sm"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-foreground"
              title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
            >
              {theme === "dark" ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleNavigation("cart")}
              className="text-muted-foreground hover:text-foreground"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
            </Button>

            {user ? (
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation("profile")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ImageWithFallback
                    src={user.avatar}
                    alt={user.name}
                    className="w-6 h-6 rounded-full mr-2"
                  />
                  Profile
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleLogout}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleNavigation("login")}
              >
                <User className="w-4 h-4 mr-2" />
                Login
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden text-muted-foreground"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <nav className="flex flex-col space-y-4">
              <button
                onClick={() => handleNavigation("home")}
                className={`text-left transition-colors ${currentSection === "home" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Home
              </button>
              <button
                onClick={() => handleNavigation("teams")}
                className={`text-left transition-colors ${currentSection === "teams" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Teams
              </button>
              <button
                onClick={() => handleNavigation("players")}
                className={`text-left transition-colors ${currentSection === "players" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Players
              </button>
              <button
                onClick={() => handleNavigation("tournaments")}
                className={`text-left transition-colors ${currentSection === "tournaments" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Tournaments
              </button>
              <button
                onClick={() => handleNavigation("shop")}
                className={`text-left transition-colors ${currentSection === "shop" ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
              >
                Shop
              </button>
              <div className="flex flex-col space-y-2 pt-4">
                {/* Country Selector Mobile */}
                <div className="flex items-center space-x-2 px-3">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <Select
                    value={selectedCountry}
                    onValueChange={setSelectedCountry}
                  >
                    <SelectTrigger className="flex-1 h-8 text-xs">
                      <SelectValue placeholder="Select Country" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60">
                      {countries.map((country) => (
                        <SelectItem
                          key={country}
                          value={country}
                          className="text-xs"
                        >
                          {country}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleTheme}
                  className="text-muted-foreground hover:text-foreground justify-start"
                >
                  {theme === "dark" ? (
                    <Sun className="w-4 h-4 mr-2" />
                  ) : (
                    <Moon className="w-4 h-4 mr-2" />
                  )}
                  {theme === "dark"
                    ? "Light Mode"
                    : "Dark Mode"}
                </Button>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleNavigation("cart")}
                  className="text-muted-foreground hover:text-foreground justify-start"
                >
                  <ShoppingCart className="w-4 h-4 mr-2" />
                  Cart
                </Button>

                {user ? (
                  <div className="flex flex-col space-y-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleNavigation("profile")}
                      className="text-muted-foreground hover:text-foreground justify-start"
                    >
                      <ImageWithFallback
                        src={user.avatar}
                        alt={user.name}
                        className="w-6 h-6 rounded-full mr-2"
                      />
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="text-muted-foreground hover:text-foreground justify-start"
                    >
                      <LogOut className="w-4 h-4 mr-2" />
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleNavigation("login")}
                    className="justify-start"
                  >
                    <User className="w-4 h-4 mr-2" />
                    Login
                  </Button>
                )}
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}