export interface Opportunity {
  _id: string
  title: string
  description: string
  description_full: string
  provider: string
  logoUrl: string
  categoryTags: string[]
  applicableGroups: string[]
  applyUrl: string
  deadline: number // Unix timestamp
  status: "active" | "inactive" | "archived"
  regions?: string[]
  fundingTypes?: string[]
  eligibility?: string
  createdAt: number
  updatedAt: number
  verifiedAt?: number
  archivedAt?: number
  createdBy: string
}
