"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "./auth-provider"
import { Spinner } from "@/components/ui/spinner"

interface AdminRedirectProps {
  children: React.ReactNode
}

export function AdminRedirect({ children }: AdminRedirectProps) {
  const router = useRouter()
  const { isAdmin, loading } = useAuth()

  useEffect(() => {
    if (!loading && !isAdmin) {
      router.push("/login")
    }
  }, [isAdmin, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Spinner />
      </div>
    )
  }

  if (!isAdmin) {
    return null
  }

  return <>{children}</>
}
