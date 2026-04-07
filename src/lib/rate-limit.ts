interface TokenBucket {
  tokens: number
  lastRefill: number
}

interface RateLimitOptions {
  maxRequests?: number
  windowMs?: number
}

interface RateLimitResult {
  success: boolean
  remaining: number
}

const buckets = new Map<string, TokenBucket>()

// Clean up old entries every 5 minutes
const CLEANUP_INTERVAL_MS = 5 * 60 * 1000

setInterval(() => {
  const now = Date.now()
  for (const [key, bucket] of buckets.entries()) {
    // Remove entries that haven't been accessed in over 10 minutes
    if (now - bucket.lastRefill > 10 * 60 * 1000) {
      buckets.delete(key)
    }
  }
}, CLEANUP_INTERVAL_MS)

function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for")
  if (forwarded) {
    return forwarded.split(",")[0].trim()
  }
  const realIp = req.headers.get("x-real-ip")
  if (realIp) {
    return realIp
  }
  return "unknown"
}

export function rateLimit(
  req: Request,
  options: RateLimitOptions = {}
): RateLimitResult {
  const { maxRequests = 60, windowMs = 60 * 1000 } = options

  const ip = getClientIp(req)
  const key = `${ip}:${maxRequests}:${windowMs}`
  const now = Date.now()

  let bucket = buckets.get(key)

  if (!bucket) {
    bucket = { tokens: maxRequests - 1, lastRefill: now }
    buckets.set(key, bucket)
    return { success: true, remaining: maxRequests - 1 }
  }

  // Refill tokens based on elapsed time
  const elapsed = now - bucket.lastRefill
  const refillAmount = (elapsed / windowMs) * maxRequests
  bucket.tokens = Math.min(maxRequests, bucket.tokens + refillAmount)
  bucket.lastRefill = now

  if (bucket.tokens < 1) {
    return { success: false, remaining: 0 }
  }

  bucket.tokens -= 1
  return { success: true, remaining: Math.floor(bucket.tokens) }
}

/** Preset for auth endpoints: 10 requests per minute */
export const authRateLimitOptions: RateLimitOptions = {
  maxRequests: 10,
  windowMs: 60 * 1000,
}
