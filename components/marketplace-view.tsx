"use client"

import type React from "react"

import { useState, useMemo, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { Search, SlidersHorizontal, X, Sparkles, TrendingUp } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Product {
  id: string
  name: string
  price: number
  image: string
  category: string
  description?: string
  colors?: string[]
  specs?: string[]
}

interface MarketplaceViewProps {
  products: Product[]
}

export function MarketplaceView({ products }: MarketplaceViewProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("All")
  const [priceRange, setPriceRange] = useState<string>("All")
  const [showFilters, setShowFilters] = useState(false)
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const [mousePosition, setMousePosition] = useState<{ [key: string]: { x: number; y: number } }>({})
  const cardRefs = useRef<{ [key: string]: HTMLDivElement | null }>({})

  const categories = ["All", ...Array.from(new Set(products.map((p) => p.category)))]

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesSearch =
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = selectedCategory === "All" || product.category === selectedCategory

      let matchesPrice = true
      if (priceRange === "Under $500") matchesPrice = product.price < 500
      else if (priceRange === "$500 - $1000") matchesPrice = product.price >= 500 && product.price < 1000
      else if (priceRange === "$1000 - $2000") matchesPrice = product.price >= 1000 && product.price < 2000
      else if (priceRange === "Over $2000") matchesPrice = product.price >= 2000

      return matchesSearch && matchesCategory && matchesPrice
    })
  }, [products, searchQuery, selectedCategory, priceRange])

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
    <div className="max-w-[1800px] mx-auto px-6 py-12">
      {/* Header */}
      <div className="mb-12 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl glass border border-primary/30 shadow-[0_0_20px_rgba(139,92,246,0.2)]">
            <Sparkles className="w-5 h-5 text-primary animate-pulse" />
          </div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text">
            Marketplace
          </h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl">
          Explore our complete collection of premium tech devices. {filteredProducts.length} products available.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-12 space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search bar */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-14 rounded-2xl glass border-primary/20 text-base focus:border-primary/40 focus:shadow-[0_0_20px_rgba(139,92,246,0.2)] transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-muted rounded-full transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Filter toggle */}
          <Button
            variant="outline"
            size="lg"
            onClick={() => setShowFilters(!showFilters)}
            className="h-14 px-6 rounded-2xl glass border-primary/20 hover:border-primary/40 hover:shadow-[0_0_15px_rgba(139,92,246,0.2)] transition-all"
          >
            <SlidersHorizontal className="w-5 h-5 mr-2" />
            Filters
            {(selectedCategory !== "All" || priceRange !== "All") && (
              <span className="ml-2 w-2 h-2 rounded-full bg-primary" />
            )}
          </Button>
        </div>

        {/* Filter panel */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="glass rounded-2xl p-6 border border-primary/20 shadow-[0_0_30px_rgba(139,92,246,0.1)] space-y-6">
                {/* Category filter */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Category</label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          selectedCategory === category
                            ? "bg-gradient-to-r from-primary to-purple-600 text-primary-foreground shadow-[0_0_20px_rgba(139,92,246,0.4)]"
                            : "glass border border-primary/20 hover:border-primary/40 hover:shadow-[0_0_10px_rgba(139,92,246,0.2)]"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price filter */}
                <div>
                  <label className="text-sm font-medium mb-3 block">Price Range</label>
                  <div className="flex flex-wrap gap-2">
                    {["All", "Under $500", "$500 - $1000", "$1000 - $2000", "Over $2000"].map((range) => (
                      <button
                        key={range}
                        onClick={() => setPriceRange(range)}
                        className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                          priceRange === range
                            ? "bg-primary text-primary-foreground"
                            : "glass border border-primary/50 hover:border-primary/30"
                        }`}
                      >
                        {range}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Clear filters */}
                {(selectedCategory !== "All" || priceRange !== "All") && (
                  <Button
                    variant="ghost"
                    onClick={() => {
                      setSelectedCategory("All")
                      setPriceRange("All")
                    }}
                    className="w-full"
                  >
                    Clear all filters
                  </Button>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Products grid */}
      <AnimatePresence mode="wait">
        {filteredProducts.length > 0 ? (
          <motion.div
            key="products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          >
            {filteredProducts.map((product, index) => (
              <motion.div
                key={product.id}
                ref={(el) => {
                  cardRefs.current[product.id] = el
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05, duration: 0.4 }}
                onMouseEnter={() => setHoveredCard(product.id)}
                onMouseLeave={() => setHoveredCard(null)}
                onMouseMove={(e) => handleMouseMove(e, product.id)}
              >
                <Link href={`/product/${product.id}`}>
                  <div className="group relative overflow-hidden rounded-2xl glass border border-primary/20 hover:border-primary/40 transition-all duration-500 cursor-pointer h-full glow-border-hover">
                    {/* Aceternity UI spotlight effect */}
                    {hoveredCard === product.id && mousePosition[product.id] && (
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                        style={{
                          background: `radial-gradient(300px circle at ${mousePosition[product.id].x}px ${mousePosition[product.id].y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
                        }}
                      />
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    <div className="relative p-6 flex flex-col h-full">
                      {/* Category badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-xs font-medium px-2.5 py-1 rounded-lg bg-primary/10 text-primary border border-primary/30 shadow-[0_0_10px_rgba(139,92,246,0.2)]">
                          {product.category}
                        </span>
                        {product.price >= 2000 && (
                          <div className="flex items-center gap-1 text-xs text-primary">
                            <TrendingUp className="w-3 h-3 animate-pulse" />
                            <span>Premium</span>
                          </div>
                        )}
                      </div>

                      {/* Product image */}
                      <div className="relative h-48 mb-4 flex items-center justify-center">
                        <Image
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          fill
                          className="object-contain group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>

                      {/* Product info */}
                      <div className="space-y-2 flex-1">
                        <h3 className="text-lg font-serif font-bold group-hover:text-primary transition-colors line-clamp-2">
                          {product.name}
                        </h3>
                        {product.description && (
                          <p className="text-sm text-muted-foreground line-clamp-2">{product.description}</p>
                        )}
                      </div>

                      {/* Price and colors */}
                      <div className="mt-4 pt-4 border-t border-primary/20 flex items-center justify-between">
                        <div className="text-2xl font-bold bg-gradient-to-r from-foreground to-primary bg-clip-text">
                          ${product.price.toLocaleString()}
                        </div>
                        {product.colors && product.colors.length > 0 && (
                          <div className="flex items-center gap-1">
                            {product.colors.slice(0, 3).map((color, i) => (
                              <div
                                key={i}
                                className="w-5 h-5 rounded-full border border-border/50"
                                style={{ backgroundColor: color }}
                              />
                            ))}
                            {product.colors.length > 3 && (
                              <span className="text-xs text-muted-foreground ml-1">+{product.colors.length - 3}</span>
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center py-24"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl glass border border-primary/50 mb-6">
              <Search className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-serif font-bold mb-2">No products found</h3>
            <p className="text-muted-foreground mb-6">Try adjusting your search or filters</p>
            <Button
              onClick={() => {
                setSearchQuery("")
                setSelectedCategory("All")
                setPriceRange("All")
              }}
            >
              Clear all filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
