"use client"

import { useState } from "react"
import { OpportunitiesTable } from "@/components/opportunities-table"
import { OpportunityModal } from "@/components/opportunity-modal"
import { SubmitOpportunityModal } from "@/components/submit-opportunity-modal"
import type { Opportunity } from "@/types/opportunity"

export default function HomePage() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity | null>(null)
  const [submitModalOpen, setSubmitModalOpen] = useState(false)

  return (
    <main className="min-h-screen bg-background flex flex-col">
      {/* Hero Section - Minimal Centered */}
      <header className="relative overflow-hidden border-b border-border flex items-center justify-center">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24 text-center">
          <div className="space-y-4">
            <h1 className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light tracking-tight text-foreground leading-tight">
              Discover Opportunities
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              A curated, neutral platform aggregating active programs, grants, bootcamps, funding, and benefit programs
              for students and developers.
            </p>
          </div>
        </div>
      </header>

      {/* Content Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 w-full">
        {/* Section Header */}
        <div className="mb-12">
          <h2 id="opportunities" className="font-serif text-3xl font-light text-foreground mb-2">
            All Opportunities
          </h2>
          <p className="text-muted-foreground">Explore vetted programs from leading companies and organizations</p>
        </div>

        {/* Table */}
        <OpportunitiesTable onSelectOpportunity={setSelectedOpportunity} />
      </div>

      {/* Modal */}
      {selectedOpportunity && (
        <OpportunityModal opportunity={selectedOpportunity} onClose={() => setSelectedOpportunity(null)} />
      )}

      {/* Submit Modal */}
      <SubmitOpportunityModal open={submitModalOpen} onOpenChange={setSubmitModalOpen} />

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/30 py-8 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              © 2025 Student & Developer Opportunities. A neutral listing service.
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <button
                onClick={() => setSubmitModalOpen(true)}
                className="hover:text-foreground transition-colors cursor-pointer"
              >
                Submit Opportunities
              </button>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
