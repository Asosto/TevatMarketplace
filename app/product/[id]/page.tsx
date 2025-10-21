import { Navigation } from "@/components/navigation"
import { ProductDetail } from "@/components/product-detail"
import { notFound } from "next/navigation"
import { productService } from "@/lib/supabase"

// Fallback product data when Supabase is not configured
const fallbackProducts = [
  {
    id: "1",
    name: 'MacBook Pro 16" M3 Max',
    price: 3499,
    image: "/macbook-pro-16-inch-space-black.jpg",
    category: "Laptops",
    colors: ["#1a1a1a", "#e8e8e8"],
    compatibility: ["macOS Sonoma", "Thunderbolt 4", "MagSafe 3"],
    eta: "2-5 days",
    description:
      "The most powerful MacBook Pro ever. With the M3 Max chip, you get unprecedented performance for professional workflows.",
    specs: [
      "Apple M3 Max chip with 16-core CPU",
      "40-core GPU",
      "48GB unified memory",
      "1TB SSD storage",
      "16.2-inch Liquid Retina XDR display",
      "Up to 22 hours battery life",
    ],
    images: [
      "/macbook-pro-16-inch-space-black.jpg",
      "/macbook-pro-side-view.jpg",
      "/macbook-pro-keyboard.png",
      "/macbook-pro-ports.jpg",
    ],
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
    description:
      "Stunning OLED display meets powerful performance. The XPS 15 delivers professional-grade power in a sleek design.",
    specs: [
      "Intel Core i9-13900H processor",
      "NVIDIA GeForce RTX 4070",
      "32GB DDR5 RAM",
      "1TB PCIe SSD",
      "15.6-inch 3.5K OLED touchscreen",
      "Up to 13 hours battery life",
    ],
    images: [
      "/dell-xps-15-platinum-silver.jpg",
      "/dell-xps-15-side-view.jpg",
      "/dell-xps-15-display.jpg",
      "/dell-xps-15-keyboard.jpg",
    ],
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
    description:
      "The legendary ThinkPad, reimagined. Ultra-light carbon fiber construction with enterprise-grade security.",
    specs: [
      "Intel Core i7-1365U processor",
      "Intel Iris Xe Graphics",
      "16GB LPDDR5 RAM",
      "512GB PCIe SSD",
      "14-inch 2.8K OLED display",
      "Up to 16 hours battery life",
    ],
    images: [
      "/lenovo-thinkpad-x1-carbon-black.jpg",
      "/thinkpad-x1-carbon-side.jpg",
      "/thinkpad-x1-carbon-keyboard.jpg",
      "/thinkpad-x1-carbon-ports.jpg",
    ],
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
    description:
      "Gaming powerhouse in a compact form. The Zephyrus G14 delivers desktop-class performance in a portable package.",
    specs: [
      "AMD Ryzen 9 7940HS processor",
      "NVIDIA GeForce RTX 4060",
      "16GB DDR5 RAM",
      "1TB PCIe 4.0 SSD",
      "14-inch QHD+ 165Hz display",
      "Up to 10 hours battery life",
    ],
    images: [
      "/asus-rog-zephyrus-g14-gaming-laptop.jpg",
      "/asus-rog-zephyrus-g14-side.jpg",
      "/asus-rog-zephyrus-g14-display.jpg",
      "/asus-rog-zephyrus-g14-keyboard.jpg",
    ],
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
    description:
      "Computational audio meets luxury design. AirPods Max deliver unparalleled sound quality with Apple's signature ease of use.",
    specs: [
      "Apple H1 chip in each ear cup",
      "Active Noise Cancellation",
      "Transparency mode",
      "Spatial audio with dynamic head tracking",
      "Up to 20 hours battery life",
      "Premium materials and build",
    ],
    images: [
      "/airpods-max-silver-premium-headphones.jpg",
      "/airpods-max-side-view.jpg",
      "/airpods-max-ear-cups.jpg",
      "/airpods-max-case.jpg",
    ],
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
    description:
      "Industry-leading noise cancellation. The WH-1000XM5 sets the standard for premium wireless headphones.",
    specs: [
      "Integrated Processor V1",
      "Industry-leading noise cancellation",
      "30mm driver units",
      "LDAC, DSEE Extreme audio",
      "Up to 30 hours battery life",
      "Multipoint connection",
    ],
    images: [
      "/sony-wh1000xm5-black-headphones.jpg",
      "/sony-wh1000xm5-side.jpg",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
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
    description:
      "Immersive audio with world-class noise cancellation. Bose's flagship headphones deliver premium comfort and sound.",
    specs: [
      "CustomTune technology",
      "Immersive Audio with head tracking",
      "World-class noise cancellation",
      "Bluetooth 5.3 with multipoint",
      "Up to 24 hours battery life",
      "Premium materials",
    ],
    images: [
      "/bose-quietcomfort-ultra-headphones.jpg",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
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
    description:
      "Audiophile-grade sound meets modern convenience. The Momentum 4 delivers exceptional audio quality with incredible battery life.",
    specs: [
      "42mm transducer system",
      "Adaptive Noise Cancellation",
      "aptX Adaptive codec support",
      "Bluetooth 5.2",
      "Up to 60 hours battery life",
      "Sound personalization",
    ],
    images: [
      "/sennheiser-momentum-4-wireless-headphones.jpg",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
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
    description:
      "Seamless authentication meets elegant design. The Magic Keyboard with Touch ID brings security and style to your desk.",
    specs: [
      "Touch ID sensor",
      "Scissor mechanism keys",
      "Rechargeable battery",
      "Lightning to USB-C cable",
      "Wireless Bluetooth connection",
      "Compatible with Mac with Apple Silicon",
    ],
    images: [
      "/apple-magic-keyboard-with-touch-id-white.jpg",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
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
    description:
      "The ultimate productivity mouse. MX Master 3S features quiet clicks, precise tracking, and customizable controls.",
    specs: [
      "8K DPI sensor",
      "Quiet clicks",
      "MagSpeed scroll wheel",
      "USB-C quick charging",
      "Up to 70 days battery life",
      "Multi-device connectivity",
    ],
    images: [
      "/logitech-mx-master-3s-mouse-graphite.jpg",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
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
    description:
      "The ultimate desktop hub. TS4 provides 18 ports of connectivity with 98W charging through a single cable.",
    specs: [
      "18 ports total",
      "98W laptop charging",
      "Thunderbolt 4 connectivity",
      "Dual 4K or single 8K display support",
      "2.5 Gigabit Ethernet",
      "SD and microSD card readers",
    ],
    images: [
      "/caldigit-ts4-thunderbolt-dock-space-gray.jpg",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
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
    description:
      "Massive power in a portable package. The 747 Power Bank can charge laptops, tablets, and phones at full speed.",
    specs: [
      "25,600mAh capacity",
      "140W USB-C output",
      "Dual USB-C ports",
      "One USB-A port",
      "Smart temperature control",
      "Can charge MacBook Pro to 50% in 28 minutes",
    ],
    images: [
      "/anker-747-power-bank-black.jpg",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
      "/placeholder.svg?height=800&width=800",
    ],
  },
]

export default async function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  let product = null

  try {
    // Check if Supabase is configured
    if (process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_URL !== 'https://placeholder.supabase.co') {
      product = await productService.getProduct(id)
    } else {
      // Use fallback data when Supabase is not configured
      product = fallbackProducts.find((p) => p.id === id)
    }
  } catch (error) {
    console.error('Error loading product:', error)
    // Try fallback data on error
    product = fallbackProducts.find((p) => p.id === id)
  }

  if (!product) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <ProductDetail product={product} />
    </main>
  )
}
