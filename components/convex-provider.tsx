"use client"

import { ConvexProvider as ConvexProviderBase } from "convex/react"
import { convex } from "@/lib/convex-client"

export function ConvexProvider({ children }: { children: React.ReactNode }) {
  return <ConvexProviderBase client={convex}>{children}</ConvexProviderBase>
}

