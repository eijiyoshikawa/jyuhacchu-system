-- 電子取引くん 専用デモデータ（本番DB投入用）
-- Neon SQL Editor に貼り付けて実行する。ON CONFLICT DO NOTHING のため何度実行しても安全。
--
-- 受発注Lシステム（サンプル商事／田中サービス）とデモ企業・アカウントを分けるためのデータ。
-- 会社名・所在地・登録番号・メールアドレスはすべて架空。パスワードは全て password123。

INSERT INTO "Company" ("id", "name", "code", "companyType", "postalCode", "address", "phone", "email", "registrationNumber", "createdAt", "updatedAt") VALUES
  ('cmtjuctja000pmrihc0i6o2kr', '株式会社アオバ産業', 'DK-GC-001', 'GENERAL_CONTRACTOR', '220-0011', '神奈川県横浜市西区高島2-10-1', '045-100-2000', 'info@aoba-sangyo.example.jp', 'T2020304050607', '2026-09-02T08:35:41.831Z', '2026-09-02T08:35:41.831Z'),
  ('cmtjuctje000qmrih0fbmxzrk', 'ケヤキ工房株式会社', 'DK-SC-001', 'SUBCONTRACTOR', '231-0023', '神奈川県横浜市中区山下町5-8', '045-300-4000', 'info@keyaki-koubou.example.jp', 'T7070808090901', '2026-09-02T08:35:41.835Z', '2026-09-02T08:35:41.835Z')
ON CONFLICT ("code") DO NOTHING;

INSERT INTO "User" ("id", "email", "name", "password", "role", "companyId", "createdAt", "updatedAt") VALUES
  ('cmtjuctji000smrihrx1q1ewf', 'admin@aoba-sangyo.example.jp', '青葉 一郎', '$2b$10$iqEkHTXFY22ryrDjH2md.u8rBZQBeAryY7Z0mCieMTnZX0js6dJ3e', 'ADMIN', 'cmtjuctja000pmrihc0i6o2kr', '2026-09-02T08:35:41.838Z', '2026-09-02T08:43:31.490Z'),
  ('cmtjuctjn000umrihx3zr2uic', 'kimura@aoba-sangyo.example.jp', '木村 二郎', '$2b$10$iqEkHTXFY22ryrDjH2md.u8rBZQBeAryY7Z0mCieMTnZX0js6dJ3e', 'CONTRACTOR', 'cmtjuctja000pmrihc0i6o2kr', '2026-09-02T08:35:41.843Z', '2026-09-02T08:43:31.493Z'),
  ('cmtjuctjq000wmrih23bqnuhy', 'admin@keyaki-koubou.example.jp', '欅 三郎', '$2b$10$iqEkHTXFY22ryrDjH2md.u8rBZQBeAryY7Z0mCieMTnZX0js6dJ3e', 'ADMIN', 'cmtjuctje000qmrih0fbmxzrk', '2026-09-02T08:35:41.846Z', '2026-09-02T08:43:31.495Z'),
  ('cmtjuctjs000ymrihos3deu2k', 'mori@keyaki-koubou.example.jp', '森 四郎', '$2b$10$iqEkHTXFY22ryrDjH2md.u8rBZQBeAryY7Z0mCieMTnZX0js6dJ3e', 'SUBCONTRACTOR', 'cmtjuctje000qmrih0fbmxzrk', '2026-09-02T08:35:41.849Z', '2026-09-02T08:43:31.497Z')
ON CONFLICT ("email") DO NOTHING;

INSERT INTO "Project" ("id", "projectCode", "name", "description", "status", "companyId", "address", "startDate", "endDate", "createdAt", "updatedAt") VALUES
  ('cmtjuctjv0010mrihivh4fozg', 'PJ-20260420-0101', 'コーポレートサイト全面リニューアル', '自社サイトの設計・制作および公開後の運用移行', 'IN_PROGRESS', 'cmtjuctja000pmrihc0i6o2kr', '神奈川県横浜市西区高島2-10-1', '2026-04-20T00:00:00.000Z', '2026-10-31T00:00:00.000Z', '2026-09-02T08:35:41.851Z', '2026-09-02T08:35:41.851Z')
ON CONFLICT ("projectCode") DO NOTHING;

INSERT INTO "PurchaseOrder" ("id", "orderNumber", "projectId", "issuerId", "receiverId", "createdById", "subject", "orderType", "status", "subtotal", "taxRate", "taxAmount", "totalAmount", "notes", "issuedAt", "deliveryDeadline", "confirmedAt", "confirmedHash", "constructionName", "constructionSite", "constructionPeriodStart", "constructionPeriodEnd", "paymentTerms", "defectWarranty", "createdAt", "updatedAt") VALUES
  ('cmtjuctk10012mrihvknla5j5', 'PO-20260422-0101', 'cmtjuctjv0010mrihivh4fozg', 'cmtjuctja000pmrihc0i6o2kr', 'cmtjuctje000qmrih0fbmxzrk', 'cmtjuctjn000umrihx3zr2uic', 'コーポレートサイト制作業務', '業務', 'ORDERED', 1800000, 0.1, 180000, 1980000, NULL, '2026-04-22T00:00:00.000Z', '2026-08-31T00:00:00.000Z', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '2026-04-22T01:00:00.000Z', '2026-09-02T08:35:41.857Z')
ON CONFLICT ("orderNumber") DO NOTHING;

INSERT INTO "PurchaseOrderItem" ("id", "purchaseOrderId", "itemOrder", "name", "specification", "quantity", "unit", "unitPrice", "amount", "remarks") VALUES
  ('cmtjuctk10013mrihryy1acfh', 'cmtjuctk10012mrihvknla5j5', 1, 'サイト設計・ワイヤーフレーム作成', '全28ページ', 1, '式', 600000, 600000, NULL),
  ('cmtjuctk10014mrihipjjgvu4', 'cmtjuctk10012mrihvknla5j5', 2, 'デザイン・実装', 'レスポンシブ対応', 28, 'ページ', 40000, 1120000, NULL),
  ('cmtjuctk10015mrih23xsskl5', 'cmtjuctk10012mrihvknla5j5', 3, '公開作業・運用引継ぎ', '手順書作成含む', 1, '式', 80000, 80000, NULL)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Invoice" ("id", "invoiceNumber", "purchaseOrderId", "projectId", "issuerId", "receiverId", "createdById", "subject", "status", "subtotal", "taxRate", "taxAmount", "totalAmount", "dueDate", "notes", "confirmedAt", "confirmedHash", "createdAt", "updatedAt") VALUES
  ('cmtjuctkb0017mrihfjuew4la', 'INV-20260630-0101', 'cmtjuctk10012mrihvknla5j5', 'cmtjuctjv0010mrihivh4fozg', 'cmtjuctje000qmrih0fbmxzrk', 'cmtjuctja000pmrihc0i6o2kr', 'cmtjuctjs000ymrihos3deu2k', 'コーポレートサイト制作業務（中間金）', 'SUBMITTED', 900000, 0.1, 90000, 990000, '2026-07-31T00:00:00.000Z', NULL, '2026-06-30T00:00:00.000Z', 'b623568243c6107e7dc4c1f8bdf7ec1a227b5ac7902716faf50f859f2027d56e', '2026-06-30T00:00:00.000Z', '2026-09-02T08:35:41.868Z')
ON CONFLICT ("invoiceNumber") DO NOTHING;

INSERT INTO "InvoiceItem" ("id", "invoiceId", "itemOrder", "name", "specification", "quantity", "unit", "unitPrice", "amount", "remarks") VALUES
  ('cmtjuctkb0018mrih0iw9qaxm', 'cmtjuctkb0017mrihfjuew4la', 1, 'サイト設計・ワイヤーフレーム作成', '全28ページ', 1, '式', 600000, 600000, NULL),
  ('cmtjuctkb0019mrihi1oel9mu', 'cmtjuctkb0017mrihfjuew4la', 2, 'デザイン・実装（中間金分）', 'レスポンシブ対応', 1, '式', 300000, 300000, NULL)
ON CONFLICT ("id") DO NOTHING;

INSERT INTO "Invitation" ("id", "token", "inviterCompanyId", "inviterUserId", "inviterUserName", "invitedCompanyName", "invitedContactName", "invitedContactEmail", "message", "status", "acceptedCompanyId", "acceptedUserId", "acceptedAt", "revokedAt", "expiresAt", "createdAt", "updatedAt") VALUES
  ('cmtjuctkk001amrihhqu2x93k', 'dk-accepted-4c8e1a2f6b9d3e70', 'cmtjuctja000pmrihc0i6o2kr', 'cmtjuctji000smrihrx1q1ewf', '青葉 一郎', 'ケヤキ工房株式会社', '欅 三郎', 'admin@keyaki-koubou.example.jp', '電子取引くんへご招待します。貴社のご負担なく無償でアカウントを発行いただけます。', 'ACCEPTED', 'cmtjuctje000qmrih0fbmxzrk', 'cmtjuctjq000wmrih23bqnuhy', '2026-04-21T01:00:00.000Z', NULL, '2026-05-20T01:00:00.000Z', '2026-04-20T01:00:00.000Z', '2026-09-02T08:43:31.508Z'),
  ('cmtjuctkp001bmrihd6vv1qt8', 'dk-pending-9a3f7c1e5d8b2046', 'cmtjuctja000pmrihc0i6o2kr', 'cmtjuctji000smrihrx1q1ewf', '青葉 一郎', '株式会社ハルカゼ物流', '春風 五郎', 'harukaze@harukaze-logi.example.jp', '電子取引くんのご利用招待です。費用のご負担はありません。', 'PENDING', NULL, NULL, NULL, NULL, '2027-03-31T14:59:59.000Z', '2026-09-02T08:35:41.881Z', '2026-09-02T08:43:31.511Z')
ON CONFLICT ("token") DO NOTHING;

-- 確認クエリ: 2 / 4 / 1 / 1 / 1 / 2 になれば成功
SELECT COUNT(*) AS "会社"   FROM "Company"    WHERE code LIKE 'DK-%';
SELECT COUNT(*) AS "ユーザー" FROM "User"      WHERE email LIKE '%@aoba-sangyo.example.jp' OR email LIKE '%@keyaki-koubou.example.jp';
SELECT COUNT(*) AS "案件"   FROM "Project"    WHERE "projectCode" = 'PJ-20260420-0101';
SELECT COUNT(*) AS "発注書" FROM "PurchaseOrder" WHERE "orderNumber" = 'PO-20260422-0101';
SELECT COUNT(*) AS "請求書" FROM "Invoice"    WHERE "invoiceNumber" = 'INV-20260630-0101';
SELECT COUNT(*) AS "招待"   FROM "Invitation" WHERE token LIKE 'dk-%';

