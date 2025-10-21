import { Navigation } from "@/components/navigation"
import { HeroSection } from "@/components/hero-section"
import { ProductPreview } from "@/components/product-preview"
import { StatsSection } from "@/components/stats-section"
import { Button } from "@/components/ui/button"
import { ArrowRight, Sparkles } from "lucide-react"
import Link from "next/link"
import { productService } from "@/lib/supabase"

// Fallback featured products when Supabase is not configured
const fallbackFeaturedProducts = [
  {
    id: "1",
    name: 'MacBook Pro 16" M3 Max',
    price: 3499,
    image: "/macbook-pro-16-inch-space-black.jpg",
    category: "Laptops",
    colors: ["#1a1a1a", "#e8e8e8"],
    compatibility: ["macOS Sonoma", "Thunderbolt 4", "MagSafe 3"],
    eta: "2-5 days",
    description: "Ultimate performance for professionals",
  },
  {
    id: "5",
    name: "AirPods Max",
    price: 549,
    image: "/airpods-max-silver-premium-headphones.jpg",
    category: "Audio",
    colors: ["#e8e8e8", "#1a1a1a", "#5e5e5e", "#b8a89a", "#a3c9d3"],
    compatibility: ["iPhone", "iPad", "Mac"],
    eta: "1-3 days",
    description: "Immersive spatial audio experience",
  },
  {
    id: "2",
    name: "Dell XPS 15 OLED",
    price: 2299,
    image: "/dell-xps-15-platinum-silver.jpg",
    category: "Laptops",
    colors: ["#c0c0c0", "#1a1a1a"],
    compatibility: ["Windows 11", "USB-C", "Thunderbolt 4"],
    eta: "3-7 days",
    description: "Stunning OLED display meets power",
  },
  {
    id: "9",
    name: "Magic Keyboard with Touch ID",
    price: 199,
    image: "/apple-magic-keyboard-with-touch-id-white.jpg",
    category: "Accessories",
    colors: ["#ffffff", "#1a1a1a"],
    compatibility: ["Mac with Apple Silicon"],
    eta: "1-2 days",
    description: "Seamless typing with security",
  },
]

export default async function Home() {
  let featuredProducts = fallbackFeaturedProducts

  try {
    // Check if Supabase is configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co') {
      const allProducts = await productService.getProducts()
      // Get first 4 products as featured products
      featuredProducts = allProducts.slice(0, 4)
    }
  } catch (error) {
    console.error('Error loading featured products:', error)
    // Use fallback data on error
    featuredProducts = fallbackFeaturedProducts
  }
  return (
    <main className="min-h-screen">
      <Navigation />
      <HeroSection />

      <section className="max-w-[1600px] mx-auto px-6 py-2 relative">
        {/* Ambient background effects */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[120px] animate-pulse delay-1000" />
        </div>
        <StatsSection />
        <div className="text-center mb-16 space-y-6 py-15">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass border border-border/50 mb-4">
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-medium">Featured Collection</span>
          </div>
        
          <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-tight">Curated Excellence</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Discover our handpicked selection of premium tech devices, designed for those who demand the best
          </p>
        </div>
        <ProductPreview products={featuredProducts} />

        <div className="mt-20 text-center">
          <Link href="/marketplace">
            <Button size="lg" className="group h-14 px-8 text-base rounded-2xl">
              Explore Full Marketplace
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </section>



      <footer className="border-t border-border/50 mt-24">
        <div className="max-w-[1600px] mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-sm text-muted-foreground">© 2025 Tevat. Premium tech marketplace.</div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
