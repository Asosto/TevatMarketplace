"use client"

import type React from "react"

import { useState } from "react"
import { Lock, Eye, EyeOff, AlertCircle } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"

interface AdminLoginProps {
  onLogin: (success: boolean) => void
}

export function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Simple password check (in production, use proper authentication)
  const ADMIN_PASSWORD = "tevat2025"

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    // Simulate authentication delay
    setTimeout(() => {
      if (password === ADMIN_PASSWORD) {
        onLogin(true)
      } else {
        setError("Invalid password. Please try again.")
        setPassword("")
        onLogin(false)
      }
      setIsLoading(false)
    }, 800)
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="glass rounded-3xl p-8 space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="w-16 h-16 mx-auto rounded-2xl bg-primary/10 flex items-center justify-center">
              <Lock className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h1 className="text-3xl font-serif font-bold mb-2">Admin Access</h1>
              <p className="text-sm text-muted-foreground">Enter your password to continue</p>
            </div>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-medium">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter admin password"
                  className="pr-12 glass-strong"
                  disabled={isLoading}
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {error && (
              <div className="glass-strong px-4 py-3 rounded-xl border-2 border-destructive/30">
                <div className="flex items-center gap-3">
                  <AlertCircle className="w-5 h-5 text-destructive flex-shrink-0" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              </div>
            )}

            <Button type="submit" size="lg" className="w-full text-lg py-6" disabled={isLoading || !password}>
              {isLoading ? (
                <>
                  <div className="w-5 h-5 mr-2 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                  Authenticating...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Sign In
                </>
              )}
            </Button>
          </form>

          {/* Demo Hint */}
          <div className="pt-6 border-t border-border/50">
            <p className="text-xs text-center text-muted-foreground">
              Demo password: <span className="font-mono font-semibold">tevat2025</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
