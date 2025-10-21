"use client"

import type React from "react"

import { useState, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowUpRight, Zap } from "lucide-react"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description?: string
  colors?: string[]
}

interface ProductPreviewProps {
  products: Product[]
}

export function ProductPreview({ products }: ProductPreviewProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState<{ [key: string]: { x: number; y: number } }>({})
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const handleMouseMove = (e: React.MouseEvent, productId: string) => {
    const card = cardRefs.current[productId]
    if (card) {
      const rect = card.getBoundingClientRect()
      setMousePosition((prev) => ({
        ...prev,
        [productId]: {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        },
      }))
    }
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {products.map((product, index) => (
        <Link href={`/product/${product.id}`} key={product.id}>
          <motion.div
            ref={(el) => {
              cardRefs.current[product.id] = el
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            onHoverStart={() => setHoveredId(product.id)}
            onHoverEnd={() => setHoveredId(null)}
            onMouseMove={(e) => handleMouseMove(e, product.id)}
            className="group relative overflow-hidden rounded-3xl glass border border-primary/20 hover:border-primary/40 transition-all duration-500 cursor-pointer glow-border-hover"
          >
            {hoveredId === product.id && mousePosition[product.id] && (
              <div
                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: `radial-gradient(400px circle at ${mousePosition[product.id].x}px ${mousePosition[product.id].y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
                }}
              />
            )}

            <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-8 flex flex-col h-full min-h-[400px]">
              <div className="flex items-center justify-between mb-6">
                <span className="text-xs font-medium px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
                  {product.category}
                </span>
                <motion.div
                  animate={{
                    rotate: hoveredId === product.id ? 45 : 0,
                    scale: hoveredId === product.id ? 1.1 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <ArrowUpRight className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </motion.div>
              </div>

              {/* Product image */}
              <div className="relative flex-1 flex items-center justify-center mb-6">
                <motion.div
                  animate={{
                    scale: hoveredId === product.id ? 1.05 : 1,
                    rotateY: hoveredId === product.id ? 5 : 0,
                  }}
                  transition={{ duration: 0.5 }}
                  className="relative w-full h-64"
                >
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-contain drop-shadow-2xl"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: hoveredId === product.id ? 1 : 0,
                    scale: hoveredId === product.id ? 1 : 0.8,
                  }}
                  transition={{ duration: 0.3 }}
                  className="absolute top-4 right-4 px-4 py-2 rounded-2xl glass-strong border border-primary/30 backdrop-blur-xl shadow-[0_0_20px_rgba(139,92,246,0.3)]"
                >
                  <div className="flex items-center gap-1.5">
                    <Zap className="w-3.5 h-3.5 text-primary animate-pulse" />
                    <span className="text-sm font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                </motion.div>
              </div>

              {/* Product info */}
              <div className="space-y-3">
                <h3 className="text-2xl font-serif font-bold group-hover:text-primary transition-colors">
                  {product.name}
                </h3>
                {product.description && (
                  <p className="text-sm text-muted-foreground leading-relaxed">{product.description}</p>
                )}

                {/* Color options */}
                {product.colors && product.colors.length > 0 && (
                  <div className="flex items-center gap-2 pt-2">
                    {product.colors.slice(0, 4).map((color, i) => (
                      <div
                        key={i}
                        className="w-6 h-6 rounded-full border-2 border-border/50 group-hover:border-primary/30 transition-colors"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                    {product.colors.length > 4 && (
                      <span className="text-xs text-muted-foreground">+{product.colors.length - 4}</span>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[0_0_20px_rgba(139,92,246,0.5)]" />
          </motion.div>
        </Link>
      ))}
    </div>
  )
}
