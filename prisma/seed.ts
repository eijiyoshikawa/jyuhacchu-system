import "dotenv/config"
import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"
import { createHash } from "node:crypto"

const prisma = new PrismaClient()

// 本シードは冪等（何度実行しても同じ状態に収束）。
// 稼働中の審査用DBに対して `prisma migrate reset` なしで安全に追加投入できるよう、
// 全レコードを一意キー（code / email / projectCode / orderNumber / invoiceNumber / token）で upsert する。
async function main() {
  const hashedPassword = await bcrypt.hash("password123", 10)

  // ── 会社 ──────────────────────────────────────────────
  const generalContractor = await prisma.company.upsert({
    where: { code: "GC-001" },
    update: {},
    create: {
      name: "サンプル商事株式会社",
      code: "GC-001",
      companyType: "GENERAL_CONTRACTOR",
      postalCode: "100-0001",
      address: "東京都千代田区千代田1-1-1",
      phone: "03-1234-5678",
      email: "info@sample-trading.co.jp",
      registrationNumber: "T1234567890123",
    },
  })

  const subcontractor1 = await prisma.company.upsert({
    where: { code: "SC-001" },
    update: {},
    create: {
      name: "田中サービス株式会社",
      code: "SC-001",
      companyType: "SUBCONTRACTOR",
      postalCode: "150-0001",
      address: "東京都渋谷区神宮前1-2-3",
      phone: "03-2345-6789",
      email: "info@tanaka-service.co.jp",
      registrationNumber: "T9876543210987",
    },
  })

  await prisma.company.upsert({
    where: { code: "SC-002" },
    update: {},
    create: {
      name: "山田物産株式会社",
      code: "SC-002",
      companyType: "SUBCONTRACTOR",
      postalCode: "160-0001",
      address: "東京都新宿区新宿2-3-4",
      phone: "03-3456-7890",
      email: "info@yamada-bussan.co.jp",
      registrationNumber: "T1111222233334",
    },
  })

  // ── テストアカウント（審査提出用: demo-info 記載と一致させること） ──
  const admin = await prisma.user.upsert({
    where: { email: "admin@sample-trading.co.jp" },
    update: {
      name: "管理者 太郎",
      password: hashedPassword,
      role: "ADMIN",
      companyId: generalContractor.id,
    },
    create: {
      email: "admin@sample-trading.co.jp",
      name: "管理者 太郎",
      password: hashedPassword,
      role: "ADMIN",
      companyId: generalContractor.id,
    },
  })

  const contractor = await prisma.user.upsert({
    where: { email: "tanaka@sample-trading.co.jp" },
    update: {
      name: "田中 次郎",
      password: hashedPassword,
      role: "CONTRACTOR",
      companyId: generalContractor.id,
    },
    create: {
      email: "tanaka@sample-trading.co.jp",
      name: "田中 次郎",
      password: hashedPassword,
      role: "CONTRACTOR",
      companyId: generalContractor.id,
    },
  })

  // 受注側管理者（電子取引Lシステム: 招待受諾で作成された想定の無償アカウント）
  const subAdmin = await prisma.user.upsert({
    where: { email: "admin@tanaka-service.co.jp" },
    update: {
      name: "田中 一郎",
      password: hashedPassword,
      role: "ADMIN",
      companyId: subcontractor1.id,
    },
    create: {
      email: "admin@tanaka-service.co.jp",
      name: "田中 一郎",
      password: hashedPassword,
      role: "ADMIN",
      companyId: subcontractor1.id,
    },
  })

  const subUser1 = await prisma.user.upsert({
    where: { email: "suzuki@tanaka-service.co.jp" },
    update: {
      name: "鈴木 三郎",
      password: hashedPassword,
      role: "SUBCONTRACTOR",
      companyId: subcontractor1.id,
    },
    create: {
      email: "suzuki@tanaka-service.co.jp",
      name: "鈴木 三郎",
      password: hashedPassword,
      role: "SUBCONTRACTOR",
      companyId: subcontractor1.id,
    },
  })

  // ── 案件 ──────────────────────────────────────────────
  const project1 = await prisma.project.upsert({
    where: { projectCode: "PJ-20260401-0001" },
    update: {},
    create: {
      projectCode: "PJ-20260401-0001",
      name: "本社オフィス什器導入プロジェクト",
      description: "本社移転に伴うオフィス什器・OA機器の一括導入",
      status: "IN_PROGRESS",
      companyId: generalContractor.id,
      address: "東京都渋谷区渋谷3-1-1",
      startDate: new Date("2026-04-01"),
      endDate: new Date("2027-03-31"),
    },
  })

  await prisma.project.upsert({
    where: { projectCode: "PJ-20260401-0002" },
    update: {},
    create: {
      projectCode: "PJ-20260401-0002",
      name: "基幹システム改修プロジェクト",
      description: "販売管理システムのリプレイスおよび保守",
      status: "IN_PROGRESS",
      companyId: generalContractor.id,
      address: "東京都新宿区西新宿5-2-3",
      startDate: new Date("2026-05-01"),
      endDate: new Date("2026-12-31"),
    },
  })

  // ── サンプル発注書 ─────────────────────────────────────
  const order1 = await prisma.purchaseOrder.upsert({
    where: { orderNumber: "PO-20260407-0001" },
    update: {},
    create: {
      orderNumber: "PO-20260407-0001",
      projectId: project1.id,
      issuerId: generalContractor.id,
      receiverId: subcontractor1.id,
      createdById: contractor.id,
      subject: "ネットワーク機器設置業務",
      orderType: "業務",
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
            name: "ネットワーク配線敷設",
            specification: "1F〜5F",
            quantity: 1,
            unit: "式",
            unitPrice: 3000000,
            amount: 3000000,
          },
          {
            itemOrder: 2,
            name: "無線AP設置・設定",
            specification: "Wi-Fi 6対応 100台",
            quantity: 100,
            unit: "台",
            unitPrice: 20000,
            amount: 2000000,
          },
        ],
      },
    },
  })

  // ── サンプル請求書（受注側 → 発注側・電帳法タイムスタンプ付与済み） ──
  const invoiceNumber = "INV-20260428-0001"
  const confirmedHash = createHash("sha256")
    .update(
      JSON.stringify({
        invoiceNumber,
        issuer: "田中サービス株式会社",
        receiver: "サンプル商事株式会社",
        subtotal: 5000000,
        taxAmount: 500000,
        totalAmount: 5500000,
        confirmedAt: "2026-04-28T00:00:00.000Z",
      })
    )
    .digest("hex")

  await prisma.invoice.upsert({
    where: { invoiceNumber },
    update: {},
    create: {
      invoiceNumber,
      purchaseOrderId: order1.id,
      projectId: project1.id,
      issuerId: subcontractor1.id,
      receiverId: generalContractor.id,
      createdById: subUser1.id,
      subject: "ネットワーク機器設置業務（2026年4月分）",
      status: "SUBMITTED",
      subtotal: 5000000,
      taxRate: 0.1,
      taxAmount: 500000,
      totalAmount: 5500000,
      dueDate: new Date("2026-05-31"),
      confirmedAt: new Date("2026-04-28T00:00:00.000Z"),
      confirmedHash,
      items: {
        create: [
          {
            itemOrder: 1,
            name: "ネットワーク配線敷設",
            specification: "1F〜5F",
            quantity: 1,
            unit: "式",
            unitPrice: 3000000,
            amount: 3000000,
          },
          {
            itemOrder: 2,
            name: "無線AP設置・設定",
            specification: "Wi-Fi 6対応 100台",
            quantity: 100,
            unit: "台",
            unitPrice: 20000,
            amount: 2000000,
          },
        ],
      },
    },
  })

  // ── 招待レコード（電子取引類型: 招待ライフサイクルの審査確認用） ──
  // 受諾済み: 田中サービス株式会社が招待を受諾し無償アカウントが発行された記録
  await prisma.invitation.upsert({
    where: { token: "demo-accepted-7f3d9c1e5a8b4f60" },
    update: {
      status: "ACCEPTED",
      acceptedCompanyId: subcontractor1.id,
      acceptedUserId: subAdmin.id,
    },
    create: {
      token: "demo-accepted-7f3d9c1e5a8b4f60",
      inviterCompanyId: generalContractor.id,
      inviterUserId: admin.id,
      inviterUserName: "管理者 太郎",
      invitedCompanyName: "田中サービス株式会社",
      invitedContactName: "田中 一郎",
      invitedContactEmail: "admin@tanaka-service.co.jp",
      message:
        "電子取引Lシステムへご招待します。貴社のご負担なく無償でアカウントを発行いただけます。",
      status: "ACCEPTED",
      acceptedCompanyId: subcontractor1.id,
      acceptedUserId: subAdmin.id,
      acceptedAt: new Date("2026-04-10T01:00:00.000Z"),
      expiresAt: new Date("2026-05-10T01:00:00.000Z"),
    },
  })

  // 招待中（PENDING）: 招待一覧でのステータス表示・取消操作の確認用
  // 期限は審査期間中に失効しないよう長めに設定（再実行時にも延長される）
  await prisma.invitation.upsert({
    where: { token: "demo-pending-2b6e0a4c9d1f7e83" },
    update: {
      status: "PENDING",
      revokedAt: null,
      expiresAt: new Date("2027-03-31T14:59:59.000Z"),
    },
    create: {
      token: "demo-pending-2b6e0a4c9d1f7e83",
      inviterCompanyId: generalContractor.id,
      inviterUserId: admin.id,
      inviterUserName: "管理者 太郎",
      invitedCompanyName: "佐藤製作所株式会社",
      invitedContactName: "佐藤 五郎",
      invitedContactEmail: "sato@sato-mfg.co.jp",
      message: "電子取引Lシステムのご利用招待です。",
      status: "PENDING",
      expiresAt: new Date("2027-03-31T14:59:59.000Z"),
    },
  })

  console.log("シードデータを作成しました（冪等: 既存レコードは維持されます）")
  console.log("---")
  console.log("テストアカウント（審査提出用）:")
  console.log("発注側 管理者:   admin@sample-trading.co.jp / password123")
  console.log("発注側 発注担当: tanaka@sample-trading.co.jp / password123")
  console.log("受注側 管理者:   admin@tanaka-service.co.jp / password123")
  console.log("受注側 受注担当: suzuki@tanaka-service.co.jp / password123")
  console.log("---")
  console.log("サンプル発注書: PO-20260407-0001 ／ サンプル請求書: INV-20260428-0001")
  console.log("招待レコード: 受諾済み1件・招待中(PENDING)1件")
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
