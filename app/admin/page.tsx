"use client"

import { useState } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import { AdminHeader } from "@/components/admin/admin-header"
import { OpportunitiesManagement } from "@/components/admin/opportunities-management"
import { AddOpportunityDialog } from "@/components/admin/add-opportunity-dialog"

export default function AdminPage() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [refreshTrigger, setRefreshTrigger] = useState(0)

  const opportunities = useQuery(api.opportunities.list, {
    status: "all",
    includeArchived: true,
  })

  const handleAddSuccess = () => {
    setIsAddDialogOpen(false)
    setRefreshTrigger((prev) => prev + 1)
  }

  return (
    <main className="min-h-screen bg-background">
      <AdminHeader onAddClick={() => setIsAddDialogOpen(true)} totalOpportunities={opportunities?.length || 0} />

      <div className="max-w-7xl mx-auto px-6 py-8">
        <OpportunitiesManagement key={refreshTrigger} onRefresh={handleAddSuccess} />
      </div>

      <AddOpportunityDialog
        isOpen={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        onSuccess={handleAddSuccess}
      />
    </main>
  )
}
