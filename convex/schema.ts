import { defineSchema, defineTable } from "convex/server"
import { v } from "convex/values"

export default defineSchema({
  opportunities: defineTable({
    title: v.string(),
    description: v.string(),
    description_full: v.string(),
    provider: v.string(),
    logoUrl: v.string(),
    categoryTags: v.array(v.string()),
    applicableGroups: v.array(v.string()),
    applyUrl: v.string(),
    deadline: v.optional(v.number()), // Unix timestamp
    status: v.union(v.literal("active"), v.literal("inactive"), v.literal("archived")),
    regions: v.optional(v.array(v.string())),
    fundingTypes: v.optional(v.array(v.string())),
    eligibility: v.optional(v.string()),
    createdAt: v.number(),
    updatedAt: v.number(),
    verifiedAt: v.optional(v.number()),
    createdBy: v.string(),
    archivedAt: v.optional(v.number()),
    archivedBy: v.optional(v.string()),
    sortOrder: v.optional(v.number()), // For manual ordering
  })
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"])
    .index("by_deadline", ["deadline"])
    .index("by_verified", ["verifiedAt"]),

  submissions: defineTable({
    opportunityName: v.string(),
    opportunityType: v.string(),
    description: v.string(),
    link: v.string(),
    userName: v.optional(v.string()),
    userTwitter: v.optional(v.string()),
    status: v.union(v.literal("pending"), v.literal("approved"), v.literal("rejected")),
    createdAt: v.number(),
    reviewedAt: v.optional(v.number()),
  })
    .index("by_status", ["status"])
    .index("by_created", ["createdAt"]),

  admins: defineTable({
    email: v.string(),
    name: v.string(),
    role: v.union(v.literal("editor"), v.literal("manager"), v.literal("admin")),
    createdAt: v.number(),
    isActive: v.boolean(),
    lastLogin: v.optional(v.number()),
  }).index("by_email", ["email"]),

  auditLog: defineTable({
    adminId: v.string(),
    adminEmail: v.string(),
    action: v.string(),
    resourceType: v.string(),
    resourceId: v.string(),
    changes: v.any(),
    timestamp: v.number(),
  })
    .index("by_timestamp", ["timestamp"])
    .index("by_admin", ["adminId"]),
})
