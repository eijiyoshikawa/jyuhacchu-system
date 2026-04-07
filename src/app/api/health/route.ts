import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

export async function GET() {
  let dbConnected = false

  try {
    await prisma.$queryRaw`SELECT 1`
    dbConnected = true
  } catch {
    // DB is not reachable
  }

  const status = dbConnected ? "ok" : "error"
  const statusCode = dbConnected ? 200 : 503

  return NextResponse.json(
    {
      status,
      timestamp: new Date().toISOString(),
      dbConnected,
    },
    { status: statusCode }
  )
}
