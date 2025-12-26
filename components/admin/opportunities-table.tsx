"use client"

import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Pencil, Copy, Archive, Trash2 } from "lucide-react"
import { useState } from "react"
import { EditOpportunityDialog } from "./edit-opportunity-dialog"

interface OpportunitiesTableProps {
  opportunities: any[]
  onRefresh: () => void
}

export function OpportunitiesTable({ opportunities, onRefresh }: OpportunitiesTableProps) {
  const [editingOpportunity, setEditingOpportunity] = useState<any>(null)

  return (
    <>
      <div className="border border-border rounded-lg overflow-hidden bg-card">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/40">
                <th className="text-left px-4 py-3 font-semibold text-foreground w-12">Logo</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground flex-1">Details</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground w-32">Deadline</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground w-20">Status</th>
                <th className="text-right px-4 py-3 font-semibold text-foreground w-40">Actions</th>
              </tr>
            </thead>
            <tbody>
              {opportunities.map((opportunity) => (
                <tr key={opportunity._id} className="border-b border-border hover:bg-muted/20 transition-colors">
                  <td className="px-4 py-3">
                    <div className="w-10 h-10 rounded bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                      {opportunity.logoUrl ? (
                        <Image
                          src={opportunity.logoUrl || "/placeholder.svg"}
                          alt={opportunity.provider}
                          width={40}
                          height={40}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-semibold">−</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="space-y-1">
                      <p className="font-medium text-foreground text-sm">{opportunity.title}</p>
                      <p className="text-xs text-muted-foreground">{opportunity.provider}</p>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-muted-foreground">
                    {new Date(opportunity.deadline).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-3">
                    <Badge variant={opportunity.status === "active" ? "default" : "outline"}>
                      {opportunity.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right flex items-center justify-end gap-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setEditingOpportunity(opportunity)}
                      className="text-xs"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Copy className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs">
                      <Archive className="w-3.5 h-3.5" />
                    </Button>
                    <Button variant="ghost" size="sm" className="text-xs text-destructive">
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingOpportunity && (
        <EditOpportunityDialog
          opportunity={editingOpportunity}
          onClose={() => setEditingOpportunity(null)}
          onSuccess={() => {
            setEditingOpportunity(null)
            onRefresh()
          }}
        />
      )}
    </>
  )
}
