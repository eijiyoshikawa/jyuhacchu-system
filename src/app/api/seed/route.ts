import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

// ワンタイムシードAPI - 初期データ投入後に削除すること
export async function POST(req: NextRequest) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.NEXTAUTH_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // 既にデータがある場合はスキップ
  const existingUsers = await prisma.user.count()
  if (existingUsers > 0) {
    return NextResponse.json({ message: "データは既に存在します", userCount: existingUsers })
  }

  const hashedPassword = await bcrypt.hash("password123", 10)

  const generalContractor = await prisma.company.create({
    data: {
      name: "サンプル建設株式会社",
      code: "GC-001",
      companyType: "GENERAL_CONTRACTOR",
      postalCode: "100-0001",
      address: "東京都千代田区千代田1-1-1",
      phone: "03-1234-5678",
      email: "info@sample-kensetsu.co.jp",
      registrationNumber: "T1234567890123",
    },
  })

  const subcontractor1 = await prisma.company.create({
    data: {
      name: "田中電気工業株式会社",
      code: "SC-001",
      companyType: "SUBCONTRACTOR",
      postalCode: "150-0001",
      address: "東京都渋谷区神宮前1-2-3",
      phone: "03-2345-6789",
      email: "info@tanaka-denki.co.jp",
      registrationNumber: "T9876543210987",
    },
  })

  const subcontractor2 = await prisma.company.create({
    data: {
      name: "山田設備株式会社",
      code: "SC-002",
      companyType: "SUBCONTRACTOR",
      postalCode: "160-0001",
      address: "東京都新宿区新宿2-3-4",
      phone: "03-3456-7890",
      email: "info@yamada-setsubi.co.jp",
      registrationNumber: "T1111222233334",
    },
  })

  await prisma.user.create({
    data: {
      email: "admin@sample-kensetsu.co.jp",
      name: "管理者 太郎",
      password: hashedPassword,
      role: "ADMIN",
      companyId: generalContractor.id,
    },
  })

  await prisma.user.create({
    data: {
      email: "tanaka@sample-kensetsu.co.jp",
      name: "田中 次郎",
      password: hashedPassword,
      role: "CONTRACTOR",
      companyId: generalContractor.id,
    },
  })

  await prisma.user.create({
    data: {
      email: "suzuki@tanaka-denki.co.jp",
      name: "鈴木 三郎",
      password: hashedPassword,
      role: "SUBCONTRACTOR",
      companyId: subcontractor1.id,
    },
  })

  const project1 = await prisma.project.create({
    data: {
      projectCode: "PJ-20260401-0001",
      name: "渋谷オフィスビル新築工事",
      description: "地上10階建てオフィスビルの新築工事",
      status: "IN_PROGRESS",
      companyId: generalContractor.id,
      address: "東京都渋谷区渋谷3-1-1",
      startDate: new Date("2026-04-01"),
      endDate: new Date("2027-03-31"),
    },
  })

  await prisma.project.create({
    data: {
      projectCode: "PJ-20260401-0002",
      name: "新宿マンション改修工事",
      description: "築30年マンションの大規模改修工事",
      status: "IN_PROGRESS",
      companyId: generalContractor.id,
      address: "東京都新宿区西新宿5-2-3",
      startDate: new Date("2026-05-01"),
      endDate: new Date("2026-12-31"),
    },
  })

  return NextResponse.json({
    message: "シードデータを作成しました",
    accounts: [
      { role: "管理者", email: "admin@sample-kensetsu.co.jp", password: "password123" },
      { role: "元請担当", email: "tanaka@sample-kensetsu.co.jp", password: "password123" },
      { role: "協力会社", email: "suzuki@tanaka-denki.co.jp", password: "password123" },
    ],
  })
}
