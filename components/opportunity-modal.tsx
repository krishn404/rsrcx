"use client"

import { useEffect } from "react"
import Image from "next/image"
import type { Opportunity } from "@/types/opportunity"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"

interface OpportunityModalProps {
  opportunity: Opportunity
  onClose: () => void
}

export function OpportunityModal({ opportunity, onClose }: OpportunityModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
    }
    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [onClose])

  const daysUntilDeadline = Math.ceil((opportunity.deadline.getTime() - Date.now()) / (1000 * 60 * 60 * 24))

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50 z-40 transition-opacity" onClick={onClose} aria-hidden="true" />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-background border border-border rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-lg"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="sticky top-0 bg-background border-b border-border px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-4">
              {opportunity.logoUrl && (
                <div className="w-12 h-12 rounded bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                  <Image
                    src={opportunity.logoUrl || "/placeholder.svg"}
                    alt={opportunity.provider}
                    width={48}
                    height={48}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.src = "/placeholder.svg?height=48&width=48"
                    }}
                  />
                </div>
              )}
              <div className="min-w-0">
                <h2 className="font-semibold text-foreground truncate">{opportunity.title}</h2>
                <p className="text-sm text-muted-foreground">{opportunity.provider}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="px-6 py-6 space-y-6">
            {/* Description */}
            <div>
              <h3 className="font-semibold text-foreground text-sm mb-2">About this opportunity</h3>
              <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                {opportunity.description_full}
              </p>
            </div>

            {/* Key Details Grid */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-1">Deadline</p>
                <p className="text-sm font-medium text-foreground">
                  {opportunity.deadline.toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
                <p className="text-xs text-muted-foreground mt-1">
                  {daysUntilDeadline > 0
                    ? `${daysUntilDeadline} day${daysUntilDeadline !== 1 ? "s" : ""} remaining`
                    : "Deadline passed"}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground font-semibold mb-1">Last Updated</p>
                <p className="text-sm font-medium text-foreground">
                  {opportunity.updatedAt.toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-2">Categories</p>
              <div className="flex flex-wrap gap-2">
                {opportunity.categoryTags.map((tag) => (
                  <Badge key={tag} variant="secondary">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Applicable Groups */}
            <div>
              <p className="text-xs text-muted-foreground font-semibold mb-2">For Whom</p>
              <div className="flex flex-wrap gap-2">
                {opportunity.applicableGroups.map((group) => (
                  <Badge key={group} variant="outline">
                    {group}
                  </Badge>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="pt-4 border-t border-border">
              <Button onClick={() => window.open(opportunity.applyUrl, "_blank")} className="w-full h-10">
                Apply Now
              </Button>
              <p className="text-xs text-muted-foreground text-center mt-3">
                You'll be redirected to the official application page
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
