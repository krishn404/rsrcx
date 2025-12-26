"use client"

import { Button } from "@/components/ui/button"
import { AdminLogoutButton } from "./admin-logout-button"
import { Plus } from "lucide-react"

interface AdminHeaderProps {
  onAddClick: () => void
  onCreateClick?: () => void
  totalOpportunities?: number
}

export function AdminHeader({ onAddClick, onCreateClick, totalOpportunities }: AdminHeaderProps) {
  return (
    <header className="border-b border-border sticky top-0 bg-background/95 backdrop-blur-sm z-40">
      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-serif font-medium tracking-tight text-foreground">Opportunities</h1>
          <p className="text-sm text-muted-foreground">Manage and curate {totalOpportunities || 0} opportunities</p>
        </div>
        <div className="flex items-center gap-3">
          <Button onClick={onCreateClick || onAddClick} className="gap-2" size="sm">
            <Plus className="w-4 h-4" />
            Add Opportunity
          </Button>
          <AdminLogoutButton />
        </div>
      </div>
    </header>
  )
}
