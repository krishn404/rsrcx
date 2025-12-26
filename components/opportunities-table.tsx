"use client"

import { useState, useMemo } from "react"
import { useQuery } from "convex/react"
import { api } from "@/convex/_generated/api"
import Image from "next/image"
import type { Opportunity } from "@/types/opportunity"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface OpportunitiesTableProps {
  onSelectOpportunity: (opportunity: Opportunity) => void
}

export function OpportunitiesTable({ onSelectOpportunity }: OpportunitiesTableProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  // Fetch opportunities from Convex
  const opportunities = useQuery(api.opportunities.list, {
    status: "active",
  })

  const filteredOpportunities = useMemo(() => {
    if (!opportunities) return []

    return opportunities.filter((opp) => {
      const matchesSearch =
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.provider.toLowerCase().includes(searchQuery.toLowerCase())

      const matchesCategory = !selectedCategory || opp.categoryTags.includes(selectedCategory)

      return matchesSearch && matchesCategory
    })
  }, [opportunities, searchQuery, selectedCategory])

  // Get unique categories for filter
  const allCategories = useMemo(() => {
    if (!opportunities) return []
    return Array.from(new Set(opportunities.flatMap((opp) => opp.categoryTags))).sort()
  }, [opportunities])

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-4">
        <Input
          type="search"
          placeholder="Search opportunities, providers..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="h-10"
        />

        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="text-xs"
          >
            All
          </Button>
          {allCategories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-xs"
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Results Count */}
      <div className="text-sm text-muted-foreground">
        {filteredOpportunities.length}{" "}
        {filteredOpportunities.length > 1 ? "opportunities" : "opportunity"}
      </div>


      {/* Table */}
      <div className="border border-border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-muted/50">
                <th className="text-left px-4 py-3 font-semibold text-foreground w-16">Logo</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground flex-1 min-w-64">Title</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground w-64">Tags</th>
                <th className="text-left px-4 py-3 font-semibold text-foreground w-40">Deadline</th>
                <th className="text-right px-4 py-3 font-semibold text-foreground w-32">Action</th>
              </tr>
            </thead>
            <tbody>
              {opportunities === undefined ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    Loading opportunities...
                  </td>
                </tr>
              ) : filteredOpportunities.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-4 py-8 text-center text-muted-foreground">
                    No opportunities match your search
                  </td>
                </tr>
              ) : (
                filteredOpportunities.map((opportunity) => (
                  <tr
                    key={opportunity._id}
                    className="border-b border-border hover:bg-muted/30 cursor-pointer transition-colors"
                    onClick={() => onSelectOpportunity(opportunity)}
                  >
                    {/* Logo */}
                    <td className="px-4 py-3">
                      <div className="w-12 h-12 rounded bg-muted flex items-center justify-center flex-shrink-0 overflow-hidden">
                        {opportunity.logoUrl ? (
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
                        ) : (
                          <div className="w-full h-full bg-muted"></div>
                        )}
                      </div>
                    </td>

                    {/* Title and Description */}
                    <td className="px-4 py-3">
                      <div className="space-y-1">
                        <p className="font-semibold text-foreground line-clamp-1">{opportunity.title}</p>
                        <p className="text-xs text-muted-foreground line-clamp-2">{opportunity.description}</p>
                      </div>
                    </td>

                    {/* Tags */}
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-1">
                        {opportunity.categoryTags.slice(0, 2).map((tag) => (
                          <Badge key={tag} variant="secondary" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                        {opportunity.categoryTags.length > 2 && (
                          <Badge variant="outline" className="text-xs">
                            +{opportunity.categoryTags.length - 2}
                          </Badge>
                        )}
                      </div>
                    </td>

                    {/* Deadline */}
                    <td className="px-4 py-3 text-xs text-muted-foreground whitespace-nowrap">
                      {new Date(opportunity.deadline).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>

                    {/* Apply Button */}
                    <td className="px-4 py-3 text-right">
                      <Button
                        size="sm"
                        className="text-xs"
                        onClick={(e) => {
                          e.stopPropagation()
                          window.open(opportunity.applyUrl, "_blank")
                        }}
                      >
                        Apply
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
