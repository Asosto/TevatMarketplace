"use client"

import { useState, useEffect } from "react"
import { AdminLogin } from "@/components/admin-login"
import { AdminDashboard } from "@/components/admin-dashboard"

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check if already authenticated
    const authStatus = sessionStorage.getItem("tevat-admin-auth")
    if (authStatus === "authenticated") {
      setIsAuthenticated(true)
    }
    setIsLoading(false)
  }, [])

  const handleLogin = (success: boolean) => {
    if (success) {
      sessionStorage.setItem("tevat-admin-auth", "authenticated")
      setIsAuthenticated(true)
    }
  }

  const handleLogout = () => {
    sessionStorage.removeItem("tevat-admin-auth")
    setIsAuthenticated(false)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <AdminLogin onLogin={handleLogin} />
  }

  return <AdminDashboard onLogout={handleLogout} />
}
