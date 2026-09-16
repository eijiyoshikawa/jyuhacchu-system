import { NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"

/** 電子取引くん 審査用デモアカウント（docs/AGENTS.md・デモ機資料と同一） */
const DENSHI_KUN_DEMO_EMAILS = [
  "admin@aoba-sangyo.example.jp",
  "kimura@aoba-sangyo.example.jp",
  "admin@keyaki-koubou.example.jp",
  "mori@keyaki-koubou.example.jp",
]

export async function GET() {
  let dbConnected = false
  let denshiKunDemoUsers: number | null = null

  try {
    await prisma.$queryRaw`SELECT 1`
    dbConnected = true
    // デモアカウントが本番DBに投入済みかを外部から確認できるようにする
    // （2026-09-10 審査員がログインできない不備が出たため。存在数のみ返し、内容は返さない）
    denshiKunDemoUsers = await prisma.user.count({
      where: { email: { in: DENSHI_KUN_DEMO_EMAILS } },
    })
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
      denshiKunDemoUsers,
      denshiKunDemoUsersExpected: DENSHI_KUN_DEMO_EMAILS.length,
    },
    { status: statusCode }
  )
}
