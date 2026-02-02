import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Hero } from "@/components/hero"
import { HomeContent } from "@/components/home-content"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <HomeContent />
      </main>
      <Footer />
    </div>
  )
}
