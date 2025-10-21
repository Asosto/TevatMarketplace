"use client"

import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"

export function Navigation() {
  const [cartCount, setCartCount] = useState(0)
  const pathname = usePathname()

  useEffect(() => {
    const updateCartCount = () => {
      const savedCart = localStorage.getItem("tevat-cart")
      if (savedCart) {
        const cart = JSON.parse(savedCart)
        const totalItems = cart.reduce((sum: number, item: any) => sum + item.quantity, 0)
        setCartCount(totalItems)
      } else {
        setCartCount(0)
      }
    }

    updateCartCount()
    window.addEventListener("storage", updateCartCount)
    const interval = setInterval(updateCartCount, 500)

    return () => {
      window.removeEventListener("storage", updateCartCount)
      clearInterval(interval)
    }
  }, [])

  return (
    <nav className="sticky top-0 z-50 glass-strong border-b border-primary/20 glow-border-bottom backdrop-blur-xl">
      <div className="max-w-[1600px] mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="group-hover:scale-110 transition-transform">
              <Image 
                src="/logo.svg" 
                alt="Tevat Logo" 
                width={20} 
                height={20}
                className="w-20 h-20"
              />
            </div>
            <span className="text-2xl font-serif font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text">
              TEVAT
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              href="/marketplace"
              className={`text-sm font-medium transition-all relative ${
                pathname === "/marketplace"
                  ? "text-foreground after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-gradient-to-r after:from-primary after:to-purple-400 after:rounded-full after:shadow-[0_0_10px_rgba(139,92,246,0.5)]"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Marketplace
            </Link>
            <Link
              href="/#products"
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              Products
            </Link>
            <Link
              href="/cart"
              className="relative p-2 hover:bg-primary/10 rounded-xl transition-all group border border-transparent hover:border-primary/30 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)]"
              aria-label="Shopping cart"
            >
              <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-br from-primary to-purple-600 text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(139,92,246,0.5)] animate-pulse">
                  {cartCount > 9 ? "9+" : cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
