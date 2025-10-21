"use client"

import { useState } from "react"
import { ProductCard } from "./product-card"
import { ChevronRight } from "lucide-react"

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

interface ProductShelfProps {
  title: string
  products: Product[]
}

export function ProductShelf({ title, products }: ProductShelfProps) {
  const [expandedProduct, setExpandedProduct] = useState<string | null>(null)

  return (
    <div className="mb-12">
      <div className="flex items-center gap-3 mb-6 group cursor-pointer">
        <h2 className="text-3xl font-serif font-bold">{title}</h2>
        <ChevronRight className="w-6 h-6 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
      </div>

      <div className="glass rounded-3xl p-6 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              isExpanded={expandedProduct === product.id}
              onExpand={() => setExpandedProduct(expandedProduct === product.id ? null : product.id)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
