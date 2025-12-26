"use client"

import { useState } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { AdminHeader } from "./admin-header"
import { OpportunitiesTable } from "./opportunities-table"
import { CreateOpportunityForm } from "./create-opportunity-form"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"

export function AdminDashboard() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "inactive" | "archived">("all")

  const opportunities = useQuery(api.opportunities.list, {
    status: statusFilter,
    search: searchQuery,
    includeArchived: true,
  })

  return (
    <div className="min-h-screen bg-background">
      <AdminHeader onCreateClick={() => setIsCreateOpen(true)} totalOpportunities={opportunities?.length || 0} />

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Search and Filters */}
        <div className="space-y-4">
          <input
            type="search"
            placeholder="Search opportunities by title, provider, description..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 border border-border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary/20"
          />

          <div className="flex gap-2">
            {["all", "active", "inactive", "archived"].map((status) => (
              <button
                key={status}
                onClick={() => setStatusFilter(status as typeof statusFilter)}
                className={`px-3 py-1.5 text-sm font-medium rounded-md transition-colors ${
                  statusFilter === status
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-foreground hover:bg-muted/80"
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Opportunities Table */}
        {opportunities && <OpportunitiesTable opportunities={opportunities} onRefresh={() => {}} />}
      </main>

      {/* Create Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-serif">Create Opportunity</DialogTitle>
          </DialogHeader>
          <CreateOpportunityForm onSuccess={() => setIsCreateOpen(false)} />
        </DialogContent>
      </Dialog>
    </div>
  )
}
