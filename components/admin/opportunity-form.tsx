"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface OpportunityFormProps {
  defaultValues?: any
  onSubmit: (data: any) => Promise<void>
  isSubmitting: boolean
  submitLabel: string
}

export function OpportunityForm({ defaultValues, onSubmit, isSubmitting, submitLabel }: OpportunityFormProps) {
  const [formData, setFormData] = useState({
    title: defaultValues?.title || "",
    provider: defaultValues?.provider || "",
    logoUrl: defaultValues?.logoUrl || "",
    description: defaultValues?.description || "",
    description_full: defaultValues?.description_full || "",
    applyUrl: defaultValues?.applyUrl || "",
    deadline: defaultValues?.deadline ? new Date(defaultValues.deadline).toISOString().split("T")[0] : "",
    status: defaultValues?.status || "active",
    categoryTags: defaultValues?.categoryTags?.join(", ") || "",
    applicableGroups: defaultValues?.applicableGroups?.join(", ") || "",
    regions: defaultValues?.regions?.join(", ") || "",
    fundingTypes: defaultValues?.fundingTypes?.join(", ") || "",
    eligibility: defaultValues?.eligibility || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await onSubmit({
      ...formData,
      categoryTags: formData.categoryTags.split(",").map((t) => t.trim()),
      applicableGroups: formData.applicableGroups.split(",").map((t) => t.trim()),
      regions: formData.regions.split(",").map((t) => t.trim()),
      fundingTypes: formData.fundingTypes.split(",").map((t) => t.trim()),
      deadline: new Date(formData.deadline).getTime(),
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-foreground">Title *</label>
          <Input
            required
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="e.g., Y Combinator Startup School"
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground">Provider *</label>
          <Input
            required
            value={formData.provider}
            onChange={(e) => setFormData({ ...formData, provider: e.target.value })}
            placeholder="e.g., Y Combinator"
            className="mt-1"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold text-foreground">Logo URL (Cloudinary)</label>
          <Input
            value={formData.logoUrl}
            onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
            placeholder="https://res.cloudinary.com/..."
            className="mt-1"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold text-foreground">Short Description *</label>
          <Input
            required
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder="Brief description shown in table"
            className="mt-1"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold text-foreground">Full Description *</label>
          <Textarea
            required
            value={formData.description_full}
            onChange={(e) => setFormData({ ...formData, description_full: e.target.value })}
            placeholder="Detailed description for modal"
            rows={4}
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground">Application URL *</label>
          <Input
            required
            type="url"
            value={formData.applyUrl}
            onChange={(e) => setFormData({ ...formData, applyUrl: e.target.value })}
            placeholder="https://example.com/apply"
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground">Deadline *</label>
          <Input
            required
            type="date"
            value={formData.deadline}
            onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
            className="mt-1"
          />
        </div>

        <div>
          <label className="text-sm font-semibold text-foreground">Status</label>
          <Select value={formData.status} onValueChange={(value) => setFormData({ ...formData, status: value })}>
            <SelectTrigger className="mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="archived">Archived</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold text-foreground">Category Tags (comma-separated)</label>
          <Input
            value={formData.categoryTags}
            onChange={(e) => setFormData({ ...formData, categoryTags: e.target.value })}
            placeholder="Bootcamp, Grant, Education, Startup"
            className="mt-1"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold text-foreground">Applicable Groups (comma-separated)</label>
          <Input
            value={formData.applicableGroups}
            onChange={(e) => setFormData({ ...formData, applicableGroups: e.target.value })}
            placeholder="Students, Developers, Entrepreneurs"
            className="mt-1"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold text-foreground">Regions (comma-separated)</label>
          <Input
            value={formData.regions}
            onChange={(e) => setFormData({ ...formData, regions: e.target.value })}
            placeholder="North America, Europe, Asia"
            className="mt-1"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold text-foreground">Funding Types (comma-separated)</label>
          <Input
            value={formData.fundingTypes}
            onChange={(e) => setFormData({ ...formData, fundingTypes: e.target.value })}
            placeholder="Grants, Credits, Equity"
            className="mt-1"
          />
        </div>

        <div className="col-span-2">
          <label className="text-sm font-semibold text-foreground">Eligibility Criteria</label>
          <Textarea
            value={formData.eligibility}
            onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
            placeholder="Who is eligible for this opportunity?"
            rows={2}
            className="mt-1"
          />
        </div>
      </div>

      <div className="flex gap-2 justify-end pt-4 border-t border-border">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Saving..." : submitLabel}
        </Button>
      </div>
    </form>
  )
}
