import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
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
  Image,
  ImageIcon
} from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <ImageWithFallback
                            src="/assets/websitelogo/logo.png"
                            alt="Esports Hub Logo"
                            className="w-8 h-8 rounded object-cover"
                          />
              <span className="text-xl text-foreground">Esports Hub</span>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              The ultimate destination for professional esports. Follow teams, track stats, 
              and get exclusive merchandise from top gaming organizations worldwide.
            </p>
            <div className="flex space-x-4">
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
            <h3 className="text-foreground">Quick Links</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#home" className="text-muted-foreground hover:text-foreground transition-colors">
                Home
              </a>
              <a href="#teams" className="text-muted-foreground hover:text-foreground transition-colors">
                Teams
              </a>
              <a href="#players" className="text-muted-foreground hover:text-foreground transition-colors">
                Players
              </a>
              <a href="#shop" className="text-muted-foreground hover:text-foreground transition-colors">
                Shop
              </a>
              <a href="#tournaments" className="text-muted-foreground hover:text-foreground transition-colors">
                Tournaments
              </a>
              <a href="#about" className="text-muted-foreground hover:text-foreground transition-colors">
                About Us
              </a>
            </nav>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h3 className="text-foreground">Support</h3>
            <nav className="flex flex-col space-y-2">
              <a href="#help" className="text-muted-foreground hover:text-foreground transition-colors">
                Help Center
              </a>
              <a href="#contact" className="text-muted-foreground hover:text-foreground transition-colors">
                Contact Us
              </a>
              <a href="#shipping" className="text-muted-foreground hover:text-foreground transition-colors">
                Shipping Info
              </a>
              <a href="#returns" className="text-muted-foreground hover:text-foreground transition-colors">
                Returns
              </a>
              <a href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">
                Privacy Policy
              </a>
              <a href="#terms" className="text-muted-foreground hover:text-foreground transition-colors">
                Terms of Service
              </a>
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-foreground">Stay Updated</h3>
            <p className="text-muted-foreground">
              Get the latest esports news, match results, and exclusive offers.
            </p>
            <div className="space-y-2">
              <Input 
                placeholder="Enter your email" 
                className="bg-muted border-border text-foreground placeholder:text-muted-foreground"
              />
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                Subscribe
              </Button>
            </div>
            
            {/* Contact Info */}
            <div className="space-y-2 pt-4">
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Mail className="w-4 h-4" />
                <span>pranavithape3@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <Phone className="w-4 h-4" />
                <span>+91 7499198297</span>
              </div>
              <div className="flex items-center space-x-2 text-muted-foreground">
                <MapPin className="w-4 h-4" />
                <span>SSPM's COE, Kankavli</span>
              </div>
            </div>
          </div>
        </div>

        <Separator className="my-8 bg-border" />

        {/* Bottom */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="text-muted-foreground">
            © 2025 Esports Hub. All rights reserved.
          </div>
          <div className="flex space-x-6">
            <a href="#privacy" className="text-muted-foreground hover:text-foreground transition-colors">
              Privacy
            </a>
            <a href="#terms" className="text-muted-foreground hover:text-foreground transition-colors">
              Terms
            </a>
            <a href="#cookies" className="text-muted-foreground hover:text-foreground transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}