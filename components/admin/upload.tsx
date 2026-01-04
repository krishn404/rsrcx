"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface CloudinaryUploadWidgetProps {
  onUpload: (url: string) => void
  currentUrl: string
}

export function CloudinaryUploadWidget({ onUpload, currentUrl }: CloudinaryUploadWidgetProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [manualUrl, setManualUrl] = useState(currentUrl)
  const [error, setError] = useState<string | null>(null)

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME
      const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET

      if (!cloudName || !uploadPreset) {
        setError(
          "Cloudinary configuration is missing. Please add NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET env vars.",
        )
        setIsUploading(false)
        return
      }

      const formData = new FormData()
      formData.append("file", file)
      formData.append("upload_preset", uploadPreset)

      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      if (data.secure_url) {
        onUpload(data.secure_url)
        setManualUrl(data.secure_url)
      }
    } catch (err) {
      setError("Failed to upload image. Please try again.")
      console.error("Upload failed:", err)
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-3">
      {(currentUrl || manualUrl) && (
        <div className="relative inline-block">
          <div className="w-20 h-20 rounded-md border border-border overflow-hidden bg-muted">
            <Image
              src={currentUrl || manualUrl}
              alt="Logo preview"
              width={80}
              height={80}
              className="w-full h-full object-cover"
            />
          </div>
          <button
            type="button"
            onClick={() => {
              onUpload("")
              setManualUrl("")
            }}
            className="absolute -top-2 -right-2 bg-destructive rounded-full p-1 text-background hover:bg-destructive/80 transition-colors"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {error && (
        <div className="text-xs text-destructive bg-destructive/10 border border-destructive/20 rounded p-2">
          {error}
        </div>
      )}

      <div className="space-y-2">
        <div>
          <label htmlFor="file-upload" className="cursor-pointer">
            <Button
              type="button"
              variant="outline"
              className="gap-2 w-full bg-transparent"
              disabled={isUploading}
              asChild
            >
              <span>
                <Upload className="w-4 h-4" />
                {isUploading ? "Uploading..." : "Upload Logo"}
              </span>
            </Button>
          </label>
          <input
            id="file-upload"
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
            disabled={isUploading}
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground">Or paste Cloudinary URL</label>
          <Input
            value={manualUrl}
            onChange={(e) => {
              setManualUrl(e.target.value)
              onUpload(e.target.value)
            }}
            placeholder="https://res.cloudinary.com/..."
            className="text-xs mt-1"
          />
        </div>
      </div>
    </div>
  )
}
