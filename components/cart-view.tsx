"use client"

import { useState, useEffect } from "react"
import { Trash2, Plus, Minus, ShoppingBag, MessageCircle, Lock } from "lucide-react"
import { Button } from "./ui/button"
import { Badge } from "./ui/badge"
import Link from "next/link"

interface CartItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
  selectedColor?: string
}

export function CartView() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("tevat-cart")
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("tevat-cart", JSON.stringify(cartItems))
  }, [cartItems])

  const updateQuantity = (id: string, delta: number) => {
    setCartItems((items) =>
      items
        .map((item) => (item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item))
        .filter((item) => item.quantity > 0),
    )
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 0 ? 50 : 0
  const total = subtotal + shipping

  const handleWhatsAppCheckout = () => {
    setIsCheckingOut(true)

    // Build WhatsApp message
    let message = "🛍️ *TEVAT Order Request*\n\n"
    message += "*Items:*\n"

    cartItems.forEach((item, index) => {
      message += `${index + 1}. ${item.name}\n`
      message += `   Quantity: ${item.quantity}\n`
      message += `   Price: $${item.price} each\n`
      if (item.selectedColor) {
        message += `   Color: ${item.selectedColor}\n`
      }
      message += `   Subtotal: $${item.price * item.quantity}\n\n`
    })

    message += `*Order Summary:*\n`
    message += `Subtotal: $${subtotal}\n`
    message += `Shipping: $${shipping}\n`
    message += `*Total: $${total}*\n\n`
    message += "Please confirm this order and provide payment details."

    // Encode message for URL
    const encodedMessage = encodeURIComponent(message)

    // Replace with your actual WhatsApp business number
    const whatsappNumber = "1234567890" // Format: country code + number (no + or spaces)
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`

    // Open WhatsApp
    window.open(whatsappUrl, "_blank")

    // Reset checkout state after a delay
    setTimeout(() => {
      setIsCheckingOut(false)
    }, 2000)
  }

  if (cartItems.length === 0) {
    return (
      <div className="max-w-[1600px] mx-auto px-6 py-24">
        <div className="glass rounded-3xl p-16 text-center space-y-6">
          <div className="w-24 h-24 mx-auto glass-strong rounded-full flex items-center justify-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground" />
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-serif font-bold">Your Cart is Empty</h2>
            <p className="text-muted-foreground">Start adding premium tech products to your cart</p>
          </div>
          <Link href="/#products">
            <Button size="lg" className="text-lg px-8 py-6">
              Browse Products
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-[1600px] mx-auto px-6 py-12">
      <div className="mb-8">
        <h1 className="text-5xl font-serif font-bold mb-2">Shopping Cart</h1>
        <p className="text-muted-foreground">
          {cartItems.length} {cartItems.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cartItems.map((item) => (
            <div key={item.id} className="glass rounded-2xl p-6">
              <div className="flex gap-6">
                {/* Product Image */}
                <div className="w-32 h-32 flex-shrink-0 rounded-xl overflow-hidden bg-muted/20">
                  <img src={item.image || "/placeholder.svg"} alt={item.name} className="w-full h-full object-cover" />
                </div>

                {/* Product Details */}
                <div className="flex-1 space-y-4">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="font-serif font-semibold text-xl mb-1">{item.name}</h3>
                      <p className="text-2xl font-bold">${item.price}</p>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-muted-foreground hover:text-destructive transition-colors p-2"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {item.selectedColor && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">Color:</span>
                      <div
                        className="w-6 h-6 rounded-full border-2 border-border"
                        style={{ backgroundColor: item.selectedColor }}
                      />
                    </div>
                  )}

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-3">
                    <span className="text-sm text-muted-foreground">Quantity:</span>
                    <div className="flex items-center gap-2 glass-strong rounded-xl p-1">
                      <button
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="w-12 text-center font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-2 hover:bg-primary/10 rounded-lg transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Item Subtotal */}
                  <div className="pt-2 border-t border-border/50">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Item Total:</span>
                      <span className="text-xl font-bold">${item.price * item.quantity}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="glass rounded-3xl p-8 space-y-6 sticky top-6">
            <h2 className="text-2xl font-serif font-bold">Order Summary</h2>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-lg">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold">${subtotal}</span>
              </div>

              <div className="flex items-center justify-between text-lg">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-semibold">${shipping}</span>
              </div>

              <div className="pt-4 border-t border-border/50">
                <div className="flex items-center justify-between text-2xl">
                  <span className="font-serif font-bold">Total</span>
                  <span className="font-bold">${total}</span>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-4">
              <Button
                size="lg"
                className="w-full text-lg py-7 hover:scale-105 transition-all"
                onClick={handleWhatsAppCheckout}
                disabled={isCheckingOut}
              >
                {isCheckingOut ? (
                  <>
                    <div className="w-5 h-5 mr-2 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    Opening WhatsApp...
                  </>
                ) : (
                  <>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Checkout via WhatsApp
                  </>
                )}
              </Button>

              <div className="glass-strong px-4 py-3 rounded-xl">
                <div className="flex items-start gap-3">
                  <Lock className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                  <p className="text-xs text-muted-foreground">
                    Secure checkout via WhatsApp. We'll confirm your order and arrange payment through our business
                    account.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-border/50 space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary" className="glass">
                  Fast Delivery
                </Badge>
                <span className="text-muted-foreground">2-7 days</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary" className="glass">
                  Secure Payment
                </Badge>
                <span className="text-muted-foreground">Via WhatsApp Business</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="secondary" className="glass">
                  Support
                </Badge>
                <span className="text-muted-foreground">24/7 Customer Service</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
