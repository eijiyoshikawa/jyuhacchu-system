import { handlers } from "@/lib/auth"
import { NextRequest } from "next/server"
import { rateLimit, authRateLimitOptions } from "@/lib/rate-limit"
import { apiError } from "@/lib/api-helpers"

const { GET: originalGET, POST: originalPOST } = handlers

export const GET = originalGET

export async function POST(req: NextRequest) {
  const { success, remaining } = rateLimit(req, authRateLimitOptions)

  if (!success) {
    return apiError("リクエストが多すぎます。しばらく待ってから再試行してください。", 429)
  }

  const response = await originalPOST(req)
  if (response) {
    response.headers.set("X-RateLimit-Remaining", String(remaining))
  }
  return response
}
