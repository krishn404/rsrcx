"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface AuthContextType {
  isAuthenticated: boolean
  isAdmin: boolean
  user: { username: string; name: string } | null
  loading: boolean
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [user, setUser] = useState<{ username: string; name: string } | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem("admin_token")
      const storedUsername = localStorage.getItem("admin_username")

      if (token && storedUsername) {
        // TODO: Verify token with Convex backend
        setUser({ username: storedUsername, name: storedUsername })
        setIsAuthenticated(true)
        setIsAdmin(true)
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const login = async (username: string, password: string) => {
    const adminUsername = process.env.NEXT_PUBLIC_ADMIN_USERNAME
    const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

    if (!username || !password) {
      throw new Error("Username and password are required")
    }

    if (username !== adminUsername || password !== adminPassword) {
      throw new Error("Invalid credentials")
    }

    localStorage.setItem("admin_token", "temp_token_" + Date.now())
    localStorage.setItem("admin_username", username)

    setUser({ username, name: username })
    setIsAuthenticated(true)
    setIsAdmin(true)
  }

  const logout = async () => {
    localStorage.removeItem("admin_token")
    localStorage.removeItem("admin_username")
    setUser(null)
    setIsAuthenticated(false)
    setIsAdmin(false)
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, isAdmin, user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
