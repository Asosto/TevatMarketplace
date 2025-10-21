"use client"

import { useEffect, useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { Package, Users, TrendingUp, Award } from "lucide-react"

const stats = [
  {
    icon: Package,
    value: 500,
    suffix: "+",
    label: "Premium Devices",
    description: "Curated tech collection",
  },
  {
    icon: Users,
    value: 10000,
    suffix: "+",
    label: "Happy Customers",
    description: "Worldwide satisfaction",
  },
  {
    icon: TrendingUp,
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
    description: "Quality guaranteed",
  },
  {
    icon: Award,
    value: 50,
    suffix: "+",
    label: "Top Brands",
    description: "Industry leaders",
  },
]

function CountUp({ end, duration = 2 }: { end: number; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (!isInView) return

    let startTime: number
    let animationFrame: number

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

      setCount(Math.floor(progress * end))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [end, duration, isInView])

  return <span ref={ref}>{count.toLocaleString()}</span>
}

export function StatsSection() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return
      const rect = containerRef.current.getBoundingClientRect()
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      })
    }

    const container = containerRef.current
    container?.addEventListener("mousemove", handleMouseMove)

    return () => container?.removeEventListener("mousemove", handleMouseMove)
  }, [])

  return (
    <section className="relative py-10 overflow-hidden" ref={containerRef}>
      {/* Spotlight effect */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `radial-gradient(200px circle at ${mousePosition.x}px ${mousePosition.y}px, rgba(50, 35, 70, 0.15), transparent 90%)`,
        }}
      />

      {/* Animated grid background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#2B234610_1px,transparent_1px),linear-gradient(to_bottom,#2B234610_1px,transparent_1px)] bg-[size:4rem_4rem]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-transparent to-background" />
      </div>

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/20 rounded-full blur-[100px] animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-pulse delay-1000" />

      <div className="max-w-[1600px] mx-auto px-6 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20 space-y-4"
        >
          <h2 className="text-5xl md:text-6xl font-serif font-bold tracking-tight text-foreground">
            Trusted by Thousands
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Join our growing community of tech enthusiasts
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="group relative"
            >
              {/* Card with glowing border effect */}
              <div className="relative h-full p-8 rounded-3xl bg-background/50 backdrop-blur-xl border border-border/50 overflow-hidden transition-all duration-500 hover:border-primary/50 hover:shadow-[0_0_30px_rgba(43,35,70,0.3)]">
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Glowing border effect */}
                <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  <div className="absolute inset-[-1px] rounded-3xl bg-gradient-to-r from-primary/50 via-primary/30 to-transparent blur-sm" />
                </div>

                <div className="relative space-y-6">
                  {/* Icon */}
                  <div className="inline-flex p-3 rounded-2xl bg-primary/10 border border-primary/20 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-500">
                    <stat.icon className="w-6 h-6 text-primary" />
                  </div>

                  {/* Number */}
                  <div className="space-y-2">
                    <div className="text-5xl font-bold font-serif text-foreground">
                      <CountUp end={stat.value} />
                      {stat.suffix}
                    </div>
                    <div className="text-lg font-semibold">{stat.label}</div>
                    <div className="text-sm text-muted-foreground">{stat.description}</div>
                  </div>
                </div>

                {/* Bottom accent line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Outer glow */}
              <div className="absolute inset-0 -z-10 rounded-3xl bg-primary/20 blur-2xl opacity-0 group-hover:opacity-50 transition-opacity duration-500" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
