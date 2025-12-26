"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

export function AdminLogoutButton() {
  const router = useRouter()

  const handleLogout = () => {
    router.push("/")
  }

  return (
    <Button variant="outline" size="sm" onClick={handleLogout} className="gap-2 bg-transparent">
      <LogOut className="w-4 h-4" />
      Back to Home
    </Button>
  )
}
