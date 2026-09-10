-- 電子取引くん 専用デモデータ（本番DB投入・修復用）
-- Neon SQL Editor に貼り付けて全文を実行する。何度実行しても安全（冪等）。
--
-- 2026-09-10 改訂: 審査員が「ログインの実行」に失敗（Vercel ログ: CredentialsSignin ×9）した
-- 不備を受け、既存行があっても パスワード・所属会社・ロール を必ず上書きする ON CONFLICT DO UPDATE に変更。
-- 会社・ユーザー等の ID は固定値に依存せず、code / email / 各番号 で解決する
-- （旧版は ID 固定＋DO NOTHING のため、会社が別IDで既に存在すると外部キー違反で
--   ユーザー投入が丸ごと失敗し、ログイン不能のまま気付けなかった）。
--
-- パスワードは全テストアカウント共通 password123（bcrypt ハッシュ埋め込み済み）。
-- 会社名・所在地・登録番号・メールアドレスはすべて架空。

-- ── 1) 会社（code で解決） ──
INSERT INTO "Company" ("id", "name", "code", "companyType", "postalCode", "address", "phone", "email", "registrationNumber", "createdAt", "updatedAt") VALUES
  ('cmtjuctja000pmrihc0i6o2kr', '株式会社アオバ産業', 'DK-GC-001', 'GENERAL_CONTRACTOR', '220-0011', '神奈川県横浜市西区高島2-10-1', '045-100-2000', 'info@aoba-sangyo.example.jp', 'T2020304050607', '2026-09-02T08:35:41.831Z', now()),
  ('cmtjuctje000qmrih0fbmxzrk', 'ケヤキ工房株式会社', 'DK-SC-001', 'SUBCONTRACTOR', '231-0023', '神奈川県横浜市中区山下町5-8', '045-300-4000', 'info@keyaki-koubou.example.jp', 'T7070808090901', '2026-09-02T08:35:41.835Z', now())
ON CONFLICT ("code") DO UPDATE SET
  "name" = EXCLUDED."name",
  "companyType" = EXCLUDED."companyType",
  "postalCode" = EXCLUDED."postalCode",
  "address" = EXCLUDED."address",
  "phone" = EXCLUDED."phone",
  "email" = EXCLUDED."email",
  "registrationNumber" = EXCLUDED."registrationNumber",
  "updatedAt" = now();

-- ── 2) ユーザー（email で解決・パスワードは必ず password123 に上書き） ──
INSERT INTO "User" ("id", "email", "name", "password", "role", "companyId", "createdAt", "updatedAt") VALUES
  ('cmtjuctji000smrihrx1q1ewf', 'admin@aoba-sangyo.example.jp',   '青葉 一郎', '$2b$10$iqEkHTXFY22ryrDjH2md.u8rBZQBeAryY7Z0mCieMTnZX0js6dJ3e', 'ADMIN',         (SELECT id FROM "Company" WHERE code = 'DK-GC-001'), '2026-09-02T08:35:41.838Z', now()),
  ('cmtjuctjn000umrihx3zr2uic', 'kimura@aoba-sangyo.example.jp',  '木村 二郎', '$2b$10$iqEkHTXFY22ryrDjH2md.u8rBZQBeAryY7Z0mCieMTnZX0js6dJ3e', 'CONTRACTOR',    (SELECT id FROM "Company" WHERE code = 'DK-GC-001'), '2026-09-02T08:35:41.843Z', now()),
  ('cmtjuctjq000wmrih23bqnuhy', 'admin@keyaki-koubou.example.jp', '欅 三郎',   '$2b$10$iqEkHTXFY22ryrDjH2md.u8rBZQBeAryY7Z0mCieMTnZX0js6dJ3e', 'ADMIN',         (SELECT id FROM "Company" WHERE code = 'DK-SC-001'), '2026-09-02T08:35:41.846Z', now()),
  ('cmtjuctjs000ymrihos3deu2k', 'mori@keyaki-koubou.example.jp',  '森 四郎',   '$2b$10$iqEkHTXFY22ryrDjH2md.u8rBZQBeAryY7Z0mCieMTnZX0js6dJ3e', 'SUBCONTRACTOR', (SELECT id FROM "Company" WHERE code = 'DK-SC-001'), '2026-09-02T08:35:41.849Z', now())
ON CONFLICT ("email") DO UPDATE SET
  "name" = EXCLUDED."name",
  "password" = EXCLUDED."password",
  "role" = EXCLUDED."role",
  "companyId" = EXCLUDED."companyId",
  "updatedAt" = now();

-- ── 3) 案件 ──
INSERT INTO "Project" ("id", "projectCode", "name", "description", "status", "companyId", "address", "startDate", "endDate", "createdAt", "updatedAt") VALUES
  ('cmtjuctjv0010mrihivh4fozg', 'PJ-20260420-0101', 'コーポレートサイト全面リニューアル', '自社サイトの設計・制作および公開後の運用移行', 'IN_PROGRESS', (SELECT id FROM "Company" WHERE code = 'DK-GC-001'), '神奈川県横浜市西区高島2-10-1', '2026-04-20T00:00:00.000Z', '2026-10-31T00:00:00.000Z', '2026-09-02T08:35:41.851Z', now())
ON CONFLICT ("projectCode") DO UPDATE SET
  "name" = EXCLUDED."name",
  "status" = EXCLUDED."status",
  "companyId" = EXCLUDED."companyId",
  "updatedAt" = now();

-- ── 4) 発注書 ──
INSERT INTO "PurchaseOrder" ("id", "orderNumber", "projectId", "issuerId", "receiverId", "createdById", "subject", "orderType", "status", "subtotal", "taxRate", "taxAmount", "totalAmount", "notes", "issuedAt", "deliveryDeadline", "confirmedAt", "confirmedHash", "constructionName", "constructionSite", "constructionPeriodStart", "constructionPeriodEnd", "paymentTerms", "defectWarranty", "createdAt", "updatedAt") VALUES
  ('cmtjuctk10012mrihvknla5j5', 'PO-20260422-0101',
   (SELECT id FROM "Project" WHERE "projectCode" = 'PJ-20260420-0101'),
   (SELECT id FROM "Company" WHERE code = 'DK-GC-001'),
   (SELECT id FROM "Company" WHERE code = 'DK-SC-001'),
   (SELECT id FROM "User" WHERE email = 'kimura@aoba-sangyo.example.jp'),
   'コーポレートサイト制作業務', '業務', 'ORDERED', 1800000, 0.1, 180000, 1980000, NULL, '2026-04-22T00:00:00.000Z', '2026-08-31T00:00:00.000Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-04-22T01:00:00.000Z', now())
ON CONFLICT ("orderNumber") DO UPDATE SET
  "projectId" = EXCLUDED."projectId",
  "issuerId" = EXCLUDED."issuerId",
  "receiverId" = EXCLUDED."receiverId",
  "createdById" = EXCLUDED."createdById",
  "status" = EXCLUDED."status",
  "updatedAt" = now();

INSERT INTO "PurchaseOrderItem" ("id", "purchaseOrderId", "itemOrder", "name", "specification", "quantity", "unit", "unitPrice", "amount", "remarks") VALUES
  ('cmtjuctk10013mrihryy1acfh', (SELECT id FROM "PurchaseOrder" WHERE "orderNumber" = 'PO-20260422-0101'), 1, 'サイト設計・ワイヤーフレーム作成', '全28ページ', 1, '式', 600000, 600000, NULL),
  ('cmtjuctk10014mrihipjjgvu4', (SELECT id FROM "PurchaseOrder" WHERE "orderNumber" = 'PO-20260422-0101'), 2, 'デザイン・実装', 'レスポンシブ対応', 28, 'ページ', 40000, 1120000, NULL),
  ('cmtjuctk10015mrih23xsskl5', (SELECT id FROM "PurchaseOrder" WHERE "orderNumber" = 'PO-20260422-0101'), 3, '公開作業・運用引継ぎ', '手順書作成含む', 1, '式', 80000, 80000, NULL)
ON CONFLICT ("id") DO UPDATE SET
  "purchaseOrderId" = EXCLUDED."purchaseOrderId";

-- ── 5) 請求書 ──
INSERT INTO "Invoice" ("id", "invoiceNumber", "purchaseOrderId", "projectId", "issuerId", "receiverId", "createdById", "subject", "status", "subtotal", "taxRate", "taxAmount", "totalAmount", "dueDate", "notes", "confirmedAt", "confirmedHash", "createdAt", "updatedAt") VALUES
  ('cmtjuctkb0017mrihfjuew4la', 'INV-20260630-0101',
   (SELECT id FROM "PurchaseOrder" WHERE "orderNumber" = 'PO-20260422-0101'),
   (SELECT id FROM "Project" WHERE "projectCode" = 'PJ-20260420-0101'),
   (SELECT id FROM "Company" WHERE code = 'DK-SC-001'),
   (SELECT id FROM "Company" WHERE code = 'DK-GC-001'),
   (SELECT id FROM "User" WHERE email = 'mori@keyaki-koubou.example.jp'),
   'コーポレートサイト制作業務（中間金）', 'SUBMITTED', 900000, 0.1, 90000, 990000, '2026-07-31T00:00:00.000Z', NULL, '2026-06-30T00:00:00.000Z', 'b623568243c6107e7dc4c1f8bdf7ec1a227b5ac7902716faf50f859f2027d56e', '2026-06-30T00:00:00.000Z', now())
ON CONFLICT ("invoiceNumber") DO UPDATE SET
  "purchaseOrderId" = EXCLUDED."purchaseOrderId",
  "projectId" = EXCLUDED."projectId",
  "issuerId" = EXCLUDED."issuerId",
  "receiverId" = EXCLUDED."receiverId",
  "createdById" = EXCLUDED."createdById",
  "status" = EXCLUDED."status",
  "updatedAt" = now();

INSERT INTO "InvoiceItem" ("id", "invoiceId", "itemOrder", "name", "specification", "quantity", "unit", "unitPrice", "amount", "remarks") VALUES
  ('cmtjuctkb0018mrih0iw9qaxm', (SELECT id FROM "Invoice" WHERE "invoiceNumber" = 'INV-20260630-0101'), 1, 'サイト設計・ワイヤーフレーム作成', '全28ページ', 1, '式', 600000, 600000, NULL),
  ('cmtjuctkb0019mrihi1oel9mu', (SELECT id FROM "Invoice" WHERE "invoiceNumber" = 'INV-20260630-0101'), 2, 'デザイン・実装（中間金分）', 'レスポンシブ対応', 1, '式', 300000, 300000, NULL)
ON CONFLICT ("id") DO UPDATE SET
  "invoiceId" = EXCLUDED."invoiceId";

-- ── 6) 招待（受諾済み1件・招待中1件） ──
INSERT INTO "Invitation" ("id", "token", "inviterCompanyId", "inviterUserId", "inviterUserName", "invitedCompanyName", "invitedContactName", "invitedContactEmail", "message", "status", "acceptedCompanyId", "acceptedUserId", "acceptedAt", "revokedAt", "expiresAt", "createdAt", "updatedAt") VALUES
  ('cmtjuctkk001amrihhqu2x93k', 'dk-accepted-4c8e1a2f6b9d3e70',
   (SELECT id FROM "Company" WHERE code = 'DK-GC-001'),
   (SELECT id FROM "User" WHERE email = 'admin@aoba-sangyo.example.jp'),
   '青葉 一郎', 'ケヤキ工房株式会社', '欅 三郎', 'admin@keyaki-koubou.example.jp', '電子取引くんへご招待します。貴社のご負担なく無償でアカウントを発行いただけます。', 'ACCEPTED',
   (SELECT id FROM "Company" WHERE code = 'DK-SC-001'),
   (SELECT id FROM "User" WHERE email = 'admin@keyaki-koubou.example.jp'),
   '2026-04-21T01:00:00.000Z', NULL, '2026-05-20T01:00:00.000Z', '2026-04-20T01:00:00.000Z', now()),
  ('cmtjuctkp001bmrihd6vv1qt8', 'dk-pending-9a3f7c1e5d8b2046',
   (SELECT id FROM "Company" WHERE code = 'DK-GC-001'),
   (SELECT id FROM "User" WHERE email = 'admin@aoba-sangyo.example.jp'),
   '青葉 一郎', '株式会社ハルカゼ物流', '春風 五郎', 'harukaze@harukaze-logi.example.jp', '電子取引くんのご利用招待です。費用のご負担はありません。', 'PENDING', NULL, NULL, NULL, NULL, '2027-03-31T14:59:59.000Z', '2026-09-02T08:35:41.881Z', now())
ON CONFLICT ("token") DO UPDATE SET
  "inviterCompanyId" = EXCLUDED."inviterCompanyId",
  "inviterUserId" = EXCLUDED."inviterUserId",
  "status" = EXCLUDED."status",
  "acceptedCompanyId" = EXCLUDED."acceptedCompanyId",
  "acceptedUserId" = EXCLUDED."acceptedUserId",
  "expiresAt" = EXCLUDED."expiresAt",
  "updatedAt" = now();

-- ── 確認クエリ（最後の1本が 4 行返り、company_code が全行埋まっていれば成功） ──
SELECT COUNT(*) AS "会社"   FROM "Company"       WHERE code LIKE 'DK-%';
SELECT COUNT(*) AS "案件"   FROM "Project"       WHERE "projectCode" = 'PJ-20260420-0101';
SELECT COUNT(*) AS "発注書" FROM "PurchaseOrder" WHERE "orderNumber" = 'PO-20260422-0101';
SELECT COUNT(*) AS "請求書" FROM "Invoice"       WHERE "invoiceNumber" = 'INV-20260630-0101';
SELECT COUNT(*) AS "招待"   FROM "Invitation"    WHERE token LIKE 'dk-%';
SELECT u.email, u.role, c.code AS company_code,
       (u.password = '$2b$10$iqEkHTXFY22ryrDjH2md.u8rBZQBeAryY7Z0mCieMTnZX0js6dJ3e') AS password_is_password123
FROM "User" u LEFT JOIN "Company" c ON c.id = u."companyId"
WHERE u.email IN ('admin@aoba-sangyo.example.jp','kimura@aoba-sangyo.example.jp','admin@keyaki-koubou.example.jp','mori@keyaki-koubou.example.jp')
ORDER BY u.email;
