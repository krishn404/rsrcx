"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { X, CheckCircle2 } from "lucide-react"

interface SubmitOpportunityModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

interface FormData {
  opportunityName: string
  opportunityType: string
  description: string
  link: string
  userName: string
  userTwitter: string
}

export function SubmitOpportunityModal({ open, onOpenChange }: SubmitOpportunityModalProps) {
  const [formData, setFormData] = useState<FormData>({
    opportunityName: "",
    opportunityType: "",
    description: "",
    link: "",
    userName: "",
    userTwitter: "",
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.opportunityName || !formData.opportunityType || !formData.description || !formData.link) {
      alert("Please fill in all required fields")
      return
    }

    setIsSubmitting(true)

    try {
      // Send to Convex mutation to create submission
      const response = await fetch("/api/submit-opportunity", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error("Failed to submit")

      setShowSuccess(true)

      // Auto-dismiss after 3 seconds
      setTimeout(() => {
        setShowSuccess(false)
        setFormData({
          opportunityName: "",
          opportunityType: "",
          description: "",
          link: "",
          userName: "",
          userTwitter: "",
        })
        onOpenChange(false)
      }, 3000)
    } catch (error) {
      console.error("Submission error:", error)
      alert("Failed to submit. Please try again.")
      setIsSubmitting(false)
    }
  }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => !isSubmitting && onOpenChange(false)}
            className="fixed inset-0 bg-black/50 z-40"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", damping: 20, stiffness: 300 }}
            className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
          >
            <motion.div
              layout
              className="w-full max-w-md bg-background border border-border rounded-2xl shadow-2xl overflow-hidden"
            >
              {!showSuccess ? (
                <>
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-border">
                    <h2 className="font-serif text-2xl font-light text-foreground">Submit Opportunity</h2>
                    <button
                      onClick={() => onOpenChange(false)}
                      disabled={isSubmitting}
                      className="p-1 hover:bg-muted rounded-lg transition-colors disabled:opacity-50"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="p-6 space-y-4 max-h-[70vh] overflow-y-auto">
                    {/* Opportunity Fields */}
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Opportunity Name <span className="text-destructive">*</span>
                        </label>
                        <Input
                          type="text"
                          name="opportunityName"
                          value={formData.opportunityName}
                          onChange={handleChange}
                          placeholder="e.g., Y Combinator Startup School"
                          className="bg-muted/50 border-muted focus:border-foreground"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Opportunity Type <span className="text-destructive">*</span>
                        </label>
                        <select
                          name="opportunityType"
                          value={formData.opportunityType}
                          onChange={handleChange}
                          className="w-full px-3 py-2 bg-muted/50 border border-muted rounded-lg text-sm focus:outline-none focus:border-foreground transition-colors disabled:opacity-50"
                          disabled={isSubmitting}
                        >
                          <option value="">Select type</option>
                          <option value="bootcamp">Bootcamp</option>
                          <option value="grant">Grant</option>
                          <option value="fellowship">Fellowship</option>
                          <option value="funding">Funding</option>
                          <option value="credits">Credits</option>
                          <option value="program">Program</option>
                          <option value="scholarship">Scholarship</option>
                          <option value="other">Other</option>
                        </select>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Description <span className="text-destructive">*</span>
                        </label>
                        <textarea
                          name="description"
                          value={formData.description}
                          onChange={handleChange}
                          placeholder="Brief description of the opportunity..."
                          rows={3}
                          className="w-full px-3 py-2 bg-muted/50 border border-muted rounded-lg text-sm focus:outline-none focus:border-foreground transition-colors disabled:opacity-50"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">
                          Link <span className="text-destructive">*</span>
                        </label>
                        <Input
                          type="url"
                          name="link"
                          value={formData.link}
                          onChange={handleChange}
                          placeholder="https://..."
                          className="bg-muted/50 border-muted focus:border-foreground"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* User Fields */}
                    <div className="pt-4 border-t border-border space-y-4">
                      <p className="text-xs text-muted-foreground font-medium">Optional</p>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Your Name</label>
                        <Input
                          type="text"
                          name="userName"
                          value={formData.userName}
                          onChange={handleChange}
                          placeholder="Your name"
                          className="bg-muted/50 border-muted focus:border-foreground"
                          disabled={isSubmitting}
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-foreground mb-2 block">Twitter / Linktree</label>
                        <Input
                          type="text"
                          name="userTwitter"
                          value={formData.userTwitter}
                          onChange={handleChange}
                          placeholder="@username or linktree.com/..."
                          className="bg-muted/50 border-muted focus:border-foreground"
                          disabled={isSubmitting}
                        />
                      </div>
                    </div>

                    {/* Submit Button */}
                    <Button type="submit" disabled={isSubmitting} className="w-full mt-6">
                      {isSubmitting ? "Submitting..." : "Submit Opportunity"}
                    </Button>
                  </form>
                </>
              ) : (
                /* Success State */
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-12 flex flex-col items-center justify-center text-center"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.1, type: "spring", damping: 15, stiffness: 200 }}
                  >
                    <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-4" />
                  </motion.div>
                  <h3 className="font-serif text-2xl font-light text-foreground mb-2">Thank You!</h3>
                  <p className="text-sm text-muted-foreground">Your opportunity has been submitted for review.</p>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
