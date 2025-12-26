import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.opportunityName || !body.opportunityType || !body.description || !body.link) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // In production, this would call your Convex mutation directly
    // For now, we'll store in memory or database
    // The actual Convex integration happens once you set up Convex

    console.log("[krishnx] Submission received:", body)

    // TODO: Replace with actual Convex mutation call
    // const result = await ctx.api.submissions.create({
    //   opportunityName: body.opportunityName,
    //   opportunityType: body.opportunityType,
    //   description: body.description,
    //   link: body.link,
    //   userName: body.userName || undefined,
    //   userTwitter: body.userTwitter || undefined,
    // })

    return NextResponse.json(
      {
        success: true,
        message: "Opportunity submitted successfully. Admin will review shortly.",
      },
      { status: 200 },
    )
  } catch (error) {
    console.error("[krishnx] Submission error:", error)
    return NextResponse.json({ error: "Failed to submit opportunity" }, { status: 500 })
  }
}
