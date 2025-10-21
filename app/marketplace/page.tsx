import { Navigation } from "@/components/navigation"
import { MarketplaceView } from "@/components/marketplace-view"
import { productService } from "@/lib/supabase"

export default async function MarketplacePage() {
  let products = []
  
  try {
    // Check if Supabase is configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co') {
      products = await productService.getProducts()
    } else {
      // Fallback to mock data when Supabase is not configured
      products = [
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
          specs: ["M3 Max chip", "36GB RAM", "1TB SSD", "16-inch Liquid Retina XDR"],
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
          specs: ["Intel Core i9", "32GB RAM", "1TB SSD", "15.6-inch OLED"],
        },
        {
          id: "3",
          name: "ThinkPad X1 Carbon Gen 11",
          price: 1899,
          image: "/lenovo-thinkpad-x1-carbon-black.jpg",
          category: "Laptops",
          colors: ["#000000"],
          compatibility: ["Windows 11 Pro", "USB-C", "HDMI 2.1"],
          eta: "2-4 days",
          description: "Business-class ultrabook",
          specs: ["Intel Core i7", "16GB RAM", "512GB SSD", "14-inch WUXGA"],
        },
        {
          id: "4",
          name: "ASUS ROG Zephyrus G14",
          price: 1799,
          image: "/asus-rog-zephyrus-g14-gaming-laptop.jpg",
          category: "Laptops",
          colors: ["#1a1a1a", "#ffffff"],
          compatibility: ["Windows 11", "AMD Ryzen 9", "RTX 4060"],
          eta: "4-6 days",
          description: "Compact gaming powerhouse",
          specs: ["AMD Ryzen 9", "16GB RAM", "1TB SSD", "RTX 4060"],
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
          specs: ["Active Noise Cancellation", "Spatial Audio", "20-hour battery"],
        },
        {
          id: "6",
          name: "Sony WH-1000XM5",
          price: 399,
          image: "/sony-wh1000xm5-black-headphones.jpg",
          category: "Audio",
          colors: ["#000000", "#e8e8e8"],
          compatibility: ["Bluetooth 5.2", "USB-C", "3.5mm"],
          eta: "2-4 days",
          description: "Industry-leading noise cancellation",
          specs: ["30-hour battery", "LDAC support", "Multipoint connection"],
        },
        {
          id: "7",
          name: "Bose QuietComfort Ultra",
          price: 429,
          image: "/bose-quietcomfort-ultra-headphones.jpg",
          category: "Audio",
          colors: ["#000000", "#ffffff"],
          compatibility: ["Bluetooth 5.3", "USB-C"],
          eta: "3-5 days",
          description: "Premium comfort and sound",
          specs: ["Immersive Audio", "24-hour battery", "CustomTune technology"],
        },
        {
          id: "8",
          name: "Sennheiser Momentum 4",
          price: 379,
          image: "/sennheiser-momentum-4-wireless-headphones.jpg",
          category: "Audio",
          colors: ["#000000", "#ffffff"],
          compatibility: ["Bluetooth 5.2", "aptX Adaptive"],
          eta: "2-5 days",
          description: "Audiophile-grade wireless",
          specs: ["60-hour battery", "aptX Adaptive", "Sound Personalization"],
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
          specs: ["Touch ID", "Rechargeable battery", "Scissor mechanism"],
        },
        {
          id: "10",
          name: "Logitech MX Master 3S",
          price: 99,
          image: "/logitech-mx-master-3s-mouse-graphite.jpg",
          category: "Accessories",
          colors: ["#4a4a4a", "#e8e8e8"],
          compatibility: ["Windows", "macOS", "Linux"],
          eta: "1-3 days",
          description: "Precision meets productivity",
          specs: ["8K DPI sensor", "Quiet clicks", "Multi-device support"],
        },
        {
          id: "11",
          name: "CalDigit TS4 Thunderbolt 4 Dock",
          price: 399,
          image: "/caldigit-ts4-thunderbolt-dock-space-gray.jpg",
          category: "Accessories",
          colors: ["#5e5e5e"],
          compatibility: ["Thunderbolt 4", "USB-C", "macOS/Windows"],
          eta: "3-6 days",
          description: "Ultimate connectivity hub",
          specs: ["18 ports", "98W charging", "Dual 4K displays"],
        },
        {
          id: "12",
          name: "Anker 747 Power Bank",
          price: 149,
          image: "/anker-747-power-bank-black.jpg",
          category: "Accessories",
          colors: ["#000000"],
          compatibility: ["USB-C PD", "140W Output"],
          eta: "2-4 days",
          description: "Power on the go",
          specs: ["25,600mAh", "140W output", "Smart temperature control"],
        },
      ]
    }
  } catch (error) {
    console.error('Error loading products:', error)
    // Use empty array as fallback
    products = []
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <MarketplaceView products={products} />
    </main>
  )
}
