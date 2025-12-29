/**
 * Generates a data URL for a placeholder favicon with domain initial
 */
function generatePlaceholderFavicon(domain: string): string {
  // Get the first letter of the domain (after removing www.)
  const initial = domain.charAt(0).toUpperCase()
  
  // Create a simple SVG favicon
  const svg = `<svg width="64" height="64" xmlns="http://www.w3.org/2000/svg"><rect width="64" height="64" fill="#000000"/><text x="32" y="42" font-family="Arial, sans-serif" font-size="36" font-weight="bold" fill="#FFFFFF" text-anchor="middle" dominant-baseline="middle">${initial}</text></svg>`
  
  // Use encodeURIComponent for proper SVG encoding
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`
}

/**
 * Extracts domain from URL
 */
function extractDomain(websiteUrl: string): string | null {
  try {
    const url = new URL(websiteUrl)
    return url.hostname.replace("www.", "")
  } catch {
    const match = websiteUrl.match(/(?:https?:\/\/)?(?:www\.)?([^\/]+)/)
    return match ? match[1] : null
  }
}

/**
 * Fetches favicon URL from a website URL
 * Uses Google's favicon service as primary, with generated placeholder fallback
 */
export async function getFaviconUrl(websiteUrl: string): Promise<string> {
  const domain = extractDomain(websiteUrl)
  if (!domain) {
    return generatePlaceholderFavicon("?")
  }

  // Try Google's favicon service first (most reliable)
  const googleFaviconUrl = `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
  
  try {
    // Try to verify the favicon exists
    const response = await fetch(googleFaviconUrl, { method: "HEAD", mode: "no-cors" })
    // If we can't verify (CORS), we'll still use it as it's generally reliable
    return googleFaviconUrl
  } catch {
    // If Google service fails, try direct favicon.ico
    try {
      const url = new URL(websiteUrl)
      const faviconUrl = `${url.protocol}//${url.hostname}/favicon.ico`
      // Try to verify it exists
      const response = await fetch(faviconUrl, { method: "HEAD", mode: "no-cors" })
      return faviconUrl
    } catch {
      // If both fail, generate placeholder
      return generatePlaceholderFavicon(domain)
    }
  }
}

/**
 * Synchronous version that returns a favicon URL without verification
 * Useful for immediate display while async fetch happens
 * Returns Google's favicon service URL (fast) or generated placeholder
 */
export function getFaviconUrlSync(websiteUrl: string): string {
  const domain = extractDomain(websiteUrl)
  if (!domain) {
    return generatePlaceholderFavicon("?")
  }
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`
}

/**
 * Gets favicon URL with fallback - tries to load favicon, falls back to placeholder if it fails
 * This is the recommended function to use in components
 */
export async function getFaviconUrlWithFallback(websiteUrl: string): Promise<string> {
  const domain = extractDomain(websiteUrl)
  if (!domain) {
    return generatePlaceholderFavicon("?")
  }

  try {
    const faviconUrl = await getFaviconUrl(websiteUrl)
    // Verify the image loads
    return new Promise((resolve) => {
      const img = new Image()
      img.onload = () => resolve(faviconUrl)
      img.onerror = () => resolve(generatePlaceholderFavicon(domain))
      img.src = faviconUrl
      // Timeout after 2 seconds
      setTimeout(() => resolve(generatePlaceholderFavicon(domain)), 2000)
    })
  } catch {
    return generatePlaceholderFavicon(domain)
  }
}

