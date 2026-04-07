import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  // 会社データ作成
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

  const hashedPassword = await bcrypt.hash("password123", 10)

  // ユーザー作成
  const admin = await prisma.user.create({
    data: {
      email: "admin@sample-kensetsu.co.jp",
      name: "管理者 太郎",
      password: hashedPassword,
      role: "ADMIN",
      companyId: generalContractor.id,
    },
  })

  const contractor = await prisma.user.create({
    data: {
      email: "tanaka@sample-kensetsu.co.jp",
      name: "田中 次郎",
      password: hashedPassword,
      role: "CONTRACTOR",
      companyId: generalContractor.id,
    },
  })

  const subUser1 = await prisma.user.create({
    data: {
      email: "suzuki@tanaka-denki.co.jp",
      name: "鈴木 三郎",
      password: hashedPassword,
      role: "SUBCONTRACTOR",
      companyId: subcontractor1.id,
    },
  })

  // 案件作成
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

  const project2 = await prisma.project.create({
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

  // サンプル発注書
  const order1 = await prisma.purchaseOrder.create({
    data: {
      orderNumber: "PO-20260407-0001",
      projectId: project1.id,
      issuerId: generalContractor.id,
      receiverId: subcontractor1.id,
      createdById: contractor.id,
      subject: "電気設備工事",
      orderType: "工事",
      status: "ORDERED",
      subtotal: 5000000,
      taxRate: 0.1,
      taxAmount: 500000,
      totalAmount: 5500000,
      issuedAt: new Date("2026-04-07"),
      deliveryDeadline: new Date("2026-06-30"),
      items: {
        create: [
          {
            itemOrder: 1,
            name: "電気配線工事",
            specification: "1F〜5F",
            quantity: 1,
            unit: "式",
            unitPrice: 3000000,
            amount: 3000000,
          },
          {
            itemOrder: 2,
            name: "照明器具取付工事",
            specification: "LED照明 100台",
            quantity: 100,
            unit: "台",
            unitPrice: 20000,
            amount: 2000000,
          },
        ],
      },
    },
  })

  console.log("シードデータを作成しました")
  console.log("---")
  console.log("ログイン情報:")
  console.log("管理者: admin@sample-kensetsu.co.jp / password123")
  console.log("元請担当: tanaka@sample-kensetsu.co.jp / password123")
  console.log("協力会社: suzuki@tanaka-denki.co.jp / password123")
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
