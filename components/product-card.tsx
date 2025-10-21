"use client"

import { useState } from "react"
import { Lock, Plane, Info } from "lucide-react"
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
}

interface ProductCardProps {
  product: Product
  isExpanded: boolean
  onExpand: () => void
}

export function ProductCard({ product, isExpanded, onExpand }: ProductCardProps) {
  const [selectedColor, setSelectedColor] = useState(0)

  return (
    <div
      className={`group relative overflow-hidden rounded-2xl transition-all duration-500 ${
        isExpanded ? "col-span-full" : ""
      }`}
    >
      <div className={`glass-strong transition-all duration-500 ${isExpanded ? "p-8" : "p-4"}`}>
        {!isExpanded ? (
          <Link href={`/product/${product.id}`} className="block space-y-4">
            <div className="aspect-square relative overflow-hidden rounded-xl bg-muted/20">
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
            </div>

            <div className="space-y-2">
              <h3 className="font-serif font-semibold text-lg line-clamp-1">{product.name}</h3>
              <div className="flex items-center justify-between">
                <span className="text-2xl font-bold">${product.price}</span>
                {product.eta && (
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Plane className="w-3 h-3" />
                    <span>{product.eta}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        ) : (
          // Expanded Detail View
          <div className="grid md:grid-cols-2 gap-8" onClick={(e) => e.stopPropagation()}>
            {/* Left: 3D Product Carousel */}
            <div className="space-y-4">
              <div className="aspect-square relative overflow-hidden rounded-2xl bg-muted/20">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>

              {product.colors && product.colors.length > 0 && (
                <div className="flex items-center gap-3">
                  <span className="text-sm text-muted-foreground">Colors:</span>
                  <div className="flex gap-2">
                    {product.colors.map((color, idx) => (
                      <button
                        key={idx}
                        onClick={() => setSelectedColor(idx)}
                        className={`w-10 h-10 rounded-full border-2 transition-all hover:scale-110 ${
                          selectedColor === idx ? "border-primary ring-2 ring-primary/30" : "border-border"
                        }`}
                        style={{ backgroundColor: color }}
                        aria-label={`Select ${color} color`}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Right: Glass Info Column */}
            <div className="space-y-6">
              <div>
                <h3 className="text-4xl font-serif font-bold mb-2">{product.name}</h3>
                <div className="flex items-baseline gap-3">
                  <span className="text-5xl font-bold">${product.price}</span>
                  <button className="text-muted-foreground hover:text-foreground transition-colors">
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {product.compatibility && product.compatibility.length > 0 && (
                <div className="space-y-2">
                  <span className="text-sm text-muted-foreground">Compatible with:</span>
                  <div className="flex flex-wrap gap-2">
                    {product.compatibility.map((device, idx) => (
                      <Badge key={idx} variant="secondary" className="glass">
                        {device}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {product.eta && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground glass px-4 py-3 rounded-xl">
                  <Plane className="w-4 h-4" />
                  <span>Delivery: {product.eta}</span>
                </div>
              )}

              <div className="space-y-3 pt-4">
                <Link href={`/product/${product.id}`}>
                  <Button size="lg" className="w-full glass-strong text-lg py-6 hover:scale-105 transition-transform">
                    <Lock className="w-4 h-4 mr-2" />
                    View Details
                  </Button>
                </Link>
              </div>

              <div className="glass px-4 py-3 rounded-xl">
                <p className="text-sm text-muted-foreground">
                  <span className="font-semibold text-foreground">Reserve:</span> Hold this item for 24-48h with
                  priority import
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
