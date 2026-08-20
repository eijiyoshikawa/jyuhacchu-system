-- =====================================================================
-- 審査提出用デモデータ投入 SQL（Neon SQL Editor 用）
-- prisma/seed.ts と同等の内容のうち、本番DBに不足しているレコードを追加する。
-- 冪等: 何度実行しても安全（既存レコードは維持・重複しない）。
-- 前提: 既存シード（会社 GC-001/SC-001/SC-002、ユーザー3件、
--       案件 PJ-20260401-0001/0002、発注書 PO-20260407-0001）が投入済みであること。
-- パスワードは全テストアカウント共通 password123（bcrypt ハッシュ埋め込み済み）。
-- =====================================================================

BEGIN;

-- ── 1) 受注側管理者（電子取引L: 招待受諾で作成された想定の無償アカウント） ──
INSERT INTO "User" (id, email, name, password, role, "companyId", "createdAt", "updatedAt")
SELECT 'seed_user_tanaka_admin_0001',
       'admin@tanaka-service.co.jp',
       '田中 一郎',
       '$2b$10$OdHOn3C5Kl53nv.PU5iiGu4vAHIOr4FYZYcDRWtLYyF4IvV9nOMdu',
       'ADMIN'::"UserRole",
       c.id, now(), now()
FROM "Company" c
WHERE c.code = 'SC-001'
ON CONFLICT (email) DO UPDATE
  SET name        = EXCLUDED.name,
      password    = EXCLUDED.password,
      role        = EXCLUDED.role,
      "companyId" = EXCLUDED."companyId",
      "updatedAt" = now();

-- ── 2) 既存3アカウントのパスワードを password123 に再設定（念のため） ──
UPDATE "User"
SET password = '$2b$10$OdHOn3C5Kl53nv.PU5iiGu4vAHIOr4FYZYcDRWtLYyF4IvV9nOMdu',
    "updatedAt" = now()
WHERE email IN (
  'admin@sample-trading.co.jp',
  'tanaka@sample-trading.co.jp',
  'suzuki@tanaka-service.co.jp'
);

-- ── 3) サンプル請求書（受注側 → 発注側・電帳法タイムスタンプ付与済み） ──
INSERT INTO "Invoice" (id, "invoiceNumber", "purchaseOrderId", "projectId",
                       "issuerId", "receiverId", "createdById",
                       subject, status, subtotal, "taxRate", "taxAmount", "totalAmount",
                       "dueDate", "confirmedAt", "confirmedHash", "createdAt", "updatedAt")
SELECT 'seed_inv_20260428_0001',
       'INV-20260428-0001',
       po.id, pj.id, sc.id, gc.id, u.id,
       'ネットワーク機器設置業務（2026年4月分）',
       'SUBMITTED'::"InvoiceStatus",
       5000000, 0.1, 500000, 5500000,
       timestamptz '2026-05-31 00:00:00+00',
       timestamptz '2026-04-28 00:00:00+00',
       '21764a93dd9817472471231474300fd511e3fdd615a39f4dc3c2ecb6f4e88b11',
       timestamptz '2026-04-28 00:00:00+00', now()
FROM "PurchaseOrder" po, "Project" pj, "Company" sc, "Company" gc, "User" u
WHERE po."orderNumber"  = 'PO-20260407-0001'
  AND pj."projectCode"  = 'PJ-20260401-0001'
  AND sc.code = 'SC-001'
  AND gc.code = 'GC-001'
  AND u.email = 'suzuki@tanaka-service.co.jp'
ON CONFLICT ("invoiceNumber") DO NOTHING;

-- 請求明細（invoiceId + itemOrder で存在チェック）
INSERT INTO "InvoiceItem" (id, "invoiceId", "itemOrder", name, specification,
                           quantity, unit, "unitPrice", amount)
SELECT 'seed_invitem_20260428_0001', i.id, 1,
       'ネットワーク配線敷設', '1F〜5F', 1, '式', 3000000, 3000000
FROM "Invoice" i
WHERE i."invoiceNumber" = 'INV-20260428-0001'
  AND NOT EXISTS (
    SELECT 1 FROM "InvoiceItem" x WHERE x."invoiceId" = i.id AND x."itemOrder" = 1
  );

INSERT INTO "InvoiceItem" (id, "invoiceId", "itemOrder", name, specification,
                           quantity, unit, "unitPrice", amount)
SELECT 'seed_invitem_20260428_0002', i.id, 2,
       '無線AP設置・設定', 'Wi-Fi 6対応 100台', 100, '台', 20000, 2000000
FROM "Invoice" i
WHERE i."invoiceNumber" = 'INV-20260428-0001'
  AND NOT EXISTS (
    SELECT 1 FROM "InvoiceItem" x WHERE x."invoiceId" = i.id AND x."itemOrder" = 2
  );

-- ── 4) 招待レコード: 受諾済み（田中サービスが招待受諾 → 無償アカウント発行） ──
INSERT INTO "Invitation" (id, token, "inviterCompanyId", "inviterUserId", "inviterUserName",
                          "invitedCompanyName", "invitedContactName", "invitedContactEmail",
                          message, status, "acceptedCompanyId", "acceptedUserId",
                          "acceptedAt", "expiresAt", "createdAt", "updatedAt")
SELECT 'seed_invite_accepted_0001',
       'demo-accepted-7f3d9c1e5a8b4f60',
       gc.id, u.id, '管理者 太郎',
       '田中サービス株式会社', '田中 一郎', 'admin@tanaka-service.co.jp',
       '電子取引くんへご招待します。貴社のご負担なく無償でアカウントを発行いただけます。',
       'ACCEPTED'::"InvitationStatus",
       sc.id, su.id,
       timestamptz '2026-04-10 01:00:00+00',
       timestamptz '2026-05-10 01:00:00+00',
       timestamptz '2026-04-08 01:00:00+00', now()
FROM "Company" gc, "Company" sc, "User" u, "User" su
WHERE gc.code = 'GC-001'
  AND sc.code = 'SC-001'
  AND u.email  = 'admin@sample-trading.co.jp'
  AND su.email = 'admin@tanaka-service.co.jp'
ON CONFLICT (token) DO UPDATE
  SET status              = 'ACCEPTED'::"InvitationStatus",
      "acceptedCompanyId" = EXCLUDED."acceptedCompanyId",
      "acceptedUserId"    = EXCLUDED."acceptedUserId",
      "updatedAt"         = now();

-- ── 5) 招待レコード: 招待中 PENDING（招待一覧のステータス表示・取消操作の確認用） ──
--     期限は審査期間中に失効しないよう 2027-03-31 に設定（再実行時にも延長される）
INSERT INTO "Invitation" (id, token, "inviterCompanyId", "inviterUserId", "inviterUserName",
                          "invitedCompanyName", "invitedContactName", "invitedContactEmail",
                          message, status, "expiresAt", "createdAt", "updatedAt")
SELECT 'seed_invite_pending_0001',
       'demo-pending-2b6e0a4c9d1f7e83',
       gc.id, u.id, '管理者 太郎',
       '佐藤製作所株式会社', '佐藤 五郎', 'sato@sato-mfg.co.jp',
       '電子取引くんのご利用招待です。',
       'PENDING'::"InvitationStatus",
       timestamptz '2027-03-31 14:59:59+00',
       now(), now()
FROM "Company" gc, "User" u
WHERE gc.code = 'GC-001'
  AND u.email = 'admin@sample-trading.co.jp'
ON CONFLICT (token) DO UPDATE
  SET status      = 'PENDING'::"InvitationStatus",
      "revokedAt" = NULL,
      "expiresAt" = EXCLUDED."expiresAt",
      "updatedAt" = now();

COMMIT;

-- ── 確認クエリ（任意・実行するとサマリが表示される） ──
SELECT
  (SELECT count(*) FROM "User"        WHERE email IN ('admin@sample-trading.co.jp','tanaka@sample-trading.co.jp','admin@tanaka-service.co.jp','suzuki@tanaka-service.co.jp')) AS demo_users_expect_4,
  (SELECT count(*) FROM "Invoice"     WHERE "invoiceNumber" = 'INV-20260428-0001') AS invoice_expect_1,
  (SELECT count(*) FROM "InvoiceItem" i JOIN "Invoice" v ON v.id = i."invoiceId" WHERE v."invoiceNumber" = 'INV-20260428-0001') AS invoice_items_expect_2,
  (SELECT count(*) FROM "Invitation"  WHERE token LIKE 'demo-%') AS invitations_expect_2;
