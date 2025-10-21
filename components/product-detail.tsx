"use client"

import { useState, useEffect } from "react"
import { Lock, ShoppingCart, Plane, Check, Info, ChevronLeft, ChevronRight, MessageCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import Link from "next/link"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  colors?: string[]
  compatibility?: string[]
  eta?: string
  description?: string
  specs?: string[]
  images?: string[]
}

interface ProductDetailProps {
  product: Product
}

export function ProductDetail({ product }: ProductDetailProps) {
  const [selectedColor, setSelectedColor] = useState(0)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isReserving, setIsReserving] = useState(false)
  const [reserved, setReserved] = useState(false)
  const [addedToCart, setAddedToCart] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  const images = product.images || [product.image]

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const handleReserve = () => {
    setIsReserving(true)
    setTimeout(() => {
      setIsReserving(false)
      setReserved(true)
    }, 1500)
  }

  const handleAddToCart = () => {
    const existingCart = localStorage.getItem("tevat-cart")
    const cart = existingCart ? JSON.parse(existingCart) : []

    const existingItemIndex = cart.findIndex((item: any) => item.id === product.id)

    if (existingItemIndex >= 0) {
      cart[existingItemIndex].quantity += 1
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        quantity: 1,
        selectedColor: product.colors?.[selectedColor],
      })
    }

    localStorage.setItem("tevat-cart", JSON.stringify(cart))
    setAddedToCart(true)
    setTimeout(() => setAddedToCart(false), 2000)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const handleWhatsAppContact = () => {
    const message = `Hi! I'm interested in the ${product.name} (${product.colors?.[selectedColor] ? "Color: " + product.colors[selectedColor] : ""}) priced at $${product.price}. Can you provide more details?`
    const whatsappUrl = `https://wa.me/1234567890?text=${encodeURIComponent(message)}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12">
      <div className="mb-8">
        <Link href="/#products" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ← Back to Products
        </Link>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <div className="relative group">
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
            style={{
              background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
            }}
          />
          <div className="glass rounded-3xl p-8 space-y-6 border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] relative">
            <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted/20 group/image">
              <img
                src={images[currentImageIndex] || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/image:scale-105"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 glass-strong p-3 rounded-full opacity-0 group-hover/image:opacity-100 transition-all hover:scale-110 border border-purple-500/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 glass-strong p-3 rounded-full opacity-0 group-hover/image:opacity-100 transition-all hover:scale-110 border border-purple-500/30 hover:shadow-[0_0_20px_rgba(139,92,246,0.5)]"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>

                  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                    {images.map((_, idx) => (
                      <button
                        key={idx}
                        onClick={() => setCurrentImageIndex(idx)}
                        className={`h-2 rounded-full transition-all ${
                          idx === currentImageIndex
                            ? "bg-purple-500 w-8 shadow-[0_0_10px_rgba(139,92,246,0.8)]"
                            : "bg-muted-foreground/50 w-2"
                        }`}
                        aria-label={`View image ${idx + 1}`}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>

            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentImageIndex(idx)}
                    className={`aspect-square rounded-xl overflow-hidden transition-all hover:scale-105 border ${
                      idx === currentImageIndex
                        ? "ring-2 ring-purple-500 border-purple-500 shadow-[0_0_15px_rgba(139,92,246,0.5)]"
                        : "opacity-60 hover:opacity-100 border-white/10"
                    }`}
                  >
                    <img
                      src={img || "/placeholder.svg"}
                      alt={`${product.name} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div className="glass-strong rounded-2xl p-6 border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-medium">Available Colors</span>
                  <span className="text-xs text-muted-foreground">{product.colors.length} options</span>
                </div>
                <div className="flex gap-3">
                  {product.colors.map((color, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedColor(idx)}
                      className={`w-12 h-12 rounded-full border-2 transition-all hover:scale-110 ${
                        selectedColor === idx
                          ? "border-purple-500 ring-4 ring-purple-500/30 scale-110 shadow-[0_0_20px_rgba(139,92,246,0.6)]"
                          : "border-border hover:border-purple-500/50"
                      }`}
                      style={{ backgroundColor: color }}
                      aria-label={`Select color ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="relative group">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
              }}
            />
            <div className="glass rounded-3xl p-8 space-y-6 border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] relative">
              <div>
                <Badge variant="secondary" className="mb-3 border border-purple-500/30">
                  {product.category}
                </Badge>
                <h1 className="text-5xl font-serif font-bold mb-4 text-balance text-foreground">
                  {product.name}
                </h1>
                <p className="text-lg text-muted-foreground text-pretty">{product.description}</p>
              </div>

              <div className="flex items-baseline gap-4">
                <span className="text-6xl font-bold text-foreground">
                  ${product.price}
                </span>
                <button className="text-muted-foreground hover:text-purple-400 transition-colors">
                  <Info className="w-5 h-5" />
                </button>
              </div>

              {product.eta && (
                <div className="flex items-center gap-3 glass-strong px-5 py-4 rounded-xl border border-purple-500/20">
                  <Plane className="w-5 h-5 text-purple-400" />
                  <div>
                    <div className="text-sm font-medium">Fast Delivery</div>
                    <div className="text-xs text-muted-foreground">Estimated arrival: {product.eta}</div>
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="relative group">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(34, 197, 94, 0.15), transparent 40%)`,
              }}
            />
            <div className="glass rounded-3xl p-8 space-y-4 border border-white/10 hover:border-green-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(34,197,94,0.3)] relative">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-green-500/10 border border-green-500/30">
                  <MessageCircle className="w-6 h-6 text-green-400" />
                </div>
                <div>
                  <h3 className="text-xl font-serif font-semibold">Contact Us on WhatsApp</h3>
                  <p className="text-sm text-muted-foreground">Get instant answers about this product</p>
                </div>
              </div>

              <Button
                size="lg"
                className="w-full text-lg py-7 bg-green-600 hover:bg-green-700 hover:scale-105 transition-all shadow-[0_0_20px_rgba(34,197,94,0.3)] hover:shadow-[0_0_30px_rgba(34,197,94,0.5)]"
                onClick={handleWhatsAppContact}
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Chat on WhatsApp
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                Available 24/7 • Instant responses • Secure communication
              </p>
            </div>
          </div>

          <div className="relative group">
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
              style={{
                background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
              }}
            />
            <div className="glass rounded-3xl p-8 space-y-6 border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] relative">
              <div className="space-y-4">
                <h3 className="text-xl font-serif font-semibold">Reserve This Item</h3>
                <p className="text-sm text-muted-foreground text-pretty">
                  Reserve this product for 24-48 hours with priority import. We'll hold it exclusively for you while we
                  arrange fast shipping.
                </p>
              </div>

              <div className="space-y-3">
                <Button
                  size="lg"
                  className="w-full text-lg py-7 hover:scale-105 transition-all shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:shadow-[0_0_30px_rgba(139,92,246,0.5)]"
                  onClick={handleReserve}
                  disabled={isReserving || reserved}
                >
                  {reserved ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Reserved Successfully
                    </>
                  ) : isReserving ? (
                    <>
                      <div className="w-5 h-5 mr-2 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Reserving...
                    </>
                  ) : (
                    <>
                      <Lock className="w-5 h-5 mr-2" />
                      Reserve Now
                    </>
                  )}
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="w-full glass text-lg py-7 bg-transparent hover:bg-purple-500/10 border-purple-500/30 hover:border-purple-500 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                  onClick={handleAddToCart}
                  disabled={addedToCart}
                >
                  {addedToCart ? (
                    <>
                      <Check className="w-5 h-5 mr-2" />
                      Added to Cart
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="w-5 h-5 mr-2" />
                      Add to Cart
                    </>
                  )}
                </Button>
              </div>

              {reserved && (
                <div className="glass-strong px-5 py-4 rounded-xl border-2 border-purple-500/30 shadow-[0_0_20px_rgba(139,92,246,0.3)]">
                  <div className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-purple-400 mt-0.5" />
                    <div className="space-y-1">
                      <div className="font-semibold text-sm">Item Reserved!</div>
                      <div className="text-xs text-muted-foreground">
                        We'll contact you via WhatsApp within 2 hours to confirm your order and arrange payment.
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {product.compatibility && product.compatibility.length > 0 && (
            <div className="relative group">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{
                  background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
                }}
              />
              <div className="glass rounded-3xl p-8 space-y-4 border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] relative">
                <h3 className="text-lg font-serif font-semibold">Compatibility</h3>
                <div className="flex flex-wrap gap-2">
                  {product.compatibility.map((item, idx) => (
                    <Badge
                      key={idx}
                      variant="secondary"
                      className="glass-strong px-4 py-2 border border-purple-500/20 hover:border-purple-500/50 transition-all"
                    >
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          )}

          {product.specs && product.specs.length > 0 && (
            <div className="relative group">
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-3xl"
                style={{
                  background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
                }}
              />
              <div className="glass rounded-3xl p-8 space-y-4 border border-white/10 hover:border-purple-500/30 transition-all duration-500 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] relative">
                <h3 className="text-lg font-serif font-semibold">Technical Specifications</h3>
                <ul className="space-y-3">
                  {product.specs.map((spec, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-sm">
                      <Check className="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
