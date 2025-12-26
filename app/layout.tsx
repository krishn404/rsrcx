import type React from "react"
import type { Metadata } from "next"

import { Analytics } from "@vercel/analytics/next"
import { ConvexProvider } from "@/components/convex-provider"
import { AuthProvider } from "@/components/admin/auth-provider"
import "./globals.css"
import { Instrument_Serif, Share_Tech_Mono } from "next/font/google"

// Instrument Serif for headings only
const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-serif",
})

// Share Tech Mono as default font for all UI, data, and interface elements
const shareTechMono = Share_Tech_Mono({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: "Student & Developer Opportunities - Discover Programs, Grants & Funding",
  description:
    "Curated platform aggregating active opportunities for students and developers including bootcamps, grants, funding, credits, and benefit programs.",
  generator: "krixnx.xyz",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${instrumentSerif.variable} ${shareTechMono.variable}`}>
      <body className="font-sans antialiased">
        <ConvexProvider>
        <AuthProvider>{children}</AuthProvider>
        </ConvexProvider>
        <Analytics />
      </body>
    </html>
  )
}
