"use client"

import { ArrowDown } from "lucide-react"
import { Button } from "./ui/button"
import { useEffect, useRef, useState } from "react"

export function HeroSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const heroRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect()
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        })
      }
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(600px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 40%)`,
        }}
      />

      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/20 rounded-full blur-3xl animate-float glow-orb" />
        <div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-float glow-orb"
          style={{ animationDelay: "2s" }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl animate-glow" />

        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2B234610_1px,transparent_1px),linear-gradient(to_bottom,#2B234610_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
        <div className="space-y-8">
          <div className="inline-block">
            <span className="text-sm font-medium tracking-widest uppercase text-muted-foreground glass px-6 py-2 rounded-full border border-primary/20 glow-border">
              Premium Tech Marketplace
            </span>
          </div>

          <h1 className="text-7xl md:text-8xl lg:text-9xl font-serif font-bold tracking-tight text-balance">
            Creation Without
            <br />
            <span className="bg-gradient-to-r from-primary via-purple-400 to-primary bg-clip-text text-transparent animate-gradient">
              Limitation
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed">
            Discover cutting-edge technology that empowers your creative vision. Premium devices, curated for
            innovators.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Button
              size="lg"
              className="glass-strong text-lg px-8 py-6 hover:scale-105 transition-all glow-border border border-primary/30 hover:shadow-[0_0_30px_rgba(139,92,246,0.3)]"
              onClick={scrollToProducts}
            >
              Explore Collection
            </Button>
          </div>
        </div>

        <button
          onClick={scrollToProducts}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 text-muted-foreground hover:text-foreground transition-colors animate-bounce"
          aria-label="Scroll to products"
        >
          <ArrowDown className="w-6 h-6" />
        </button>
      </div>
    </section>
  )
}
