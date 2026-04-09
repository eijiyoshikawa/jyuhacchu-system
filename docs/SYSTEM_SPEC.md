# 建設Lシステム - システム仕様書

## 1. 概要

建設業界向けの受発注管理プラットフォーム。ANDPADの受発注機能を参考に、発注書作成・承認ワークフロー・請求管理・協力会社管理をデジタル化。インボイス制度・電子帳簿保存法・建設業法に対応。

**公開URL**: https://jyuhacchu-system.vercel.app

## 2. 技術スタック

| 項目 | 技術 | バージョン | 備考 |
|------|------|-----------|------|
| フレームワーク | Next.js (App Router) | 16.x | Turbopack |
| 言語 | TypeScript | 5.x | strict mode |
| DB | PostgreSQL | 16+ | Neon (本番) |
| ORM | Prisma | 5.x | ※v7はAPI互換性なし |
| 認証 | NextAuth.js | v5 beta | JWT + Credentials |
| UI | Tailwind CSS | 4.x | カスタムコンポーネント |
| バリデーション | Zod | v4 | ※v3とAPI差異あり |
| フォーム | react-hook-form | 7.x | |
| ホスティング | Vercel | Hobby | 東京リージョン |
| DBホスティング | Neon PostgreSQL | Free | シンガポールリージョン |
| エラー監視 | Sentry | Free | 月5,000エラー |
| CI/CD | GitHub Actions | - | lint + build + E2E |
| E2Eテスト | Playwright | - | 13テストケース |

## 3. 実装機能一覧（全32機能）

### コア業務機能
| # | 機能 | 説明 |
|---|------|------|
| 1 | ユーザー認証 | NextAuth JWT、3ロール（管理者/元請/協力会社） |
| 2 | ダッシュボード | サマリーカード、最近の発注/請求、会社スコープ |
| 3 | 案件管理 | CRUD、コード自動生成（PJ-YYYYMMDD-XXXX） |
| 4 | 発注管理 | CRUD、明細、ステータスワークフロー、番号自動生成 |
| 5 | 請求管理 | CRUD、明細、発注書からの自動入力、番号自動生成 |
| 6 | 協力会社管理 | CRUD、インボイス番号入力・検証 |
| 7 | 承認ワークフロー | 多段階承認、承認/却下+コメント |
| 8 | ユーザー管理 | ADMIN専用、CRUD |
| 9 | パスワード変更 | ポリシー検証（8文字以上、英大小文字+数字） |
| 10 | 監査ログ | 全操作記録、ADMIN閲覧 |

### インボイス制度対応
| # | 機能 | 説明 |
|---|------|------|
| 11 | インボイス番号検証 | 国税庁API連携、フォーマット検証（T+13桁） |
| 12 | 経過措置 税額計算 | 免税事業者の控除率自動計算（80%→50%→0%） |
| 13 | TaxSummary表示 | 控除可能/不可の消費税額を視覚的に表示 |

### 法令準拠
| # | 機能 | 説明 |
|---|------|------|
| 14 | 電子帳簿保存法対応 | SHA-256ハッシュ、タイムスタンプで改ざん防止 |
| 15 | 建設業法対応 | 第19条必須記載事項チェック |
| 16 | 法令準拠バッジ | 準拠/要確認の状態表示 |
| 17 | 利用規約 | 全11条の日本語利用規約 |
| 18 | プライバシーポリシー | 個人情報保護法準拠 |

### 出力機能
| # | 機能 | 説明 |
|---|------|------|
| 19 | 発注書印刷 | A4印刷最適化、建設業法対応項目表示 |
| 20 | 請求書印刷 | 適格請求書フォーマット、インボイス番号表示 |
| 21 | CSV出力 | 請求一覧エクスポート（BOM付きExcel対応） |

### UI/UX
| # | 機能 | 説明 |
|---|------|------|
| 22 | レスポンシブデザイン | SP(<640px)/タブレット/PC対応 |
| 23 | 検索・フィルター | 全一覧ページ、ステータス/キーワード |
| 24 | ページネーション | 全一覧ページ、20件/ページ |
| 25 | 確認ダイアログ | 削除・ステータス変更前の確認 |
| 26 | トースト通知 | 操作成功/失敗のフィードバック |
| 27 | エラーページ | error.tsx、not-found.tsx |
| 28 | ローディングUI | Skeleton Screen |

### セキュリティ・インフラ
| # | 機能 | 説明 |
|---|------|------|
| 29 | レート制限 | 認証API: 10req/min |
| 30 | APIバリデーション | 全POST/PUTでZodスキーマ検証 |
| 31 | マルチテナント分離 | 会社IDベースのデータ分離 |
| 32 | トランザクション処理 | 発注/請求の作成時 |

## 4. データベース設計（11テーブル）

```
Company ─1:N─ User
Company ─1:N─ Project
Company ─1:N─ PurchaseOrder (issuer/receiver)
Company ─1:N─ Invoice (issuer/receiver)
Project ─1:N─ PurchaseOrder
Project ─1:N─ Invoice
PurchaseOrder ─1:N─ PurchaseOrderItem
PurchaseOrder ─1:1─ ApprovalFlow
PurchaseOrder ─1:N─ Invoice
Invoice ─1:N─ InvoiceItem
Invoice ─1:1─ ApprovalFlow
ApprovalFlow ─1:N─ ApprovalStep
User ─1:N─ ApprovalStep (approver)
AuditLog (独立テーブル)
```

### テーブル詳細
| テーブル | 主要カラム |
|---------|-----------|
| Company | name, code, companyType, registrationNumber(インボイス番号) |
| User | email, name, password(bcrypt), role, companyId |
| Project | projectCode, name, status, companyId, startDate, endDate |
| PurchaseOrder | orderNumber, subject, status, subtotal, taxAmount, totalAmount, confirmedAt, confirmedHash |
| PurchaseOrderItem | name, specification, quantity, unit, unitPrice, amount |
| Invoice | invoiceNumber, subject, status, subtotal, taxAmount, totalAmount, dueDate |
| InvoiceItem | name, specification, quantity, unit, unitPrice, amount |
| ApprovalFlow | targetType(ORDER/INVOICE), status(PENDING/APPROVED/REJECTED) |
| ApprovalStep | stepOrder, approverId, status, comment, decidedAt |
| AuditLog | userId, userName, action, targetType, targetId, details, ipAddress |

## 5. API一覧

### 認証
| Method | Endpoint | 説明 |
|--------|----------|------|
| GET/POST | /api/auth/[...nextauth] | NextAuth |

### 会社
| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | /api/companies | 一覧（search, type） |
| POST | /api/companies | 新規作成（ADMIN） |
| GET/PUT/DELETE | /api/companies/[id] | 詳細/更新/削除 |

### 案件
| Method | Endpoint | 説明 |
|--------|----------|------|
| GET/POST | /api/projects | 一覧/作成 |
| GET/PUT/DELETE | /api/projects/[id] | 詳細/更新/削除 |

### 発注
| Method | Endpoint | 説明 |
|--------|----------|------|
| GET/POST | /api/orders | 一覧/作成 |
| GET/PUT/DELETE | /api/orders/[id] | 詳細/更新/削除 |
| POST | /api/orders/[id]/submit | 申請（DRAFT→PENDING_APPROVAL） |
| POST | /api/orders/[id]/approve | 承認 |
| POST | /api/orders/[id]/reject | 却下 |
| POST | /api/orders/[id]/confirm | 確定（タイムスタンプ+ハッシュ） |
| GET | /api/orders/[id]/compliance | 法令準拠チェック |

### 請求
| Method | Endpoint | 説明 |
|--------|----------|------|
| GET/POST | /api/invoices | 一覧/作成 |
| GET/PUT/DELETE | /api/invoices/[id] | 詳細/更新/削除 |
| POST | /api/invoices/[id]/submit | 提出 |
| POST | /api/invoices/[id]/approve | 承認 |
| POST | /api/invoices/[id]/reject | 却下 |
| POST | /api/invoices/[id]/confirm | 確定 |
| GET | /api/invoices/export | CSV出力 |

### ユーザー
| Method | Endpoint | 説明 |
|--------|----------|------|
| GET/POST | /api/users | 一覧/作成（ADMIN） |
| GET/PUT/DELETE | /api/users/[id] | 詳細/更新/削除 |
| POST | /api/users/change-password | パスワード変更 |

### その他
| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | /api/health | ヘルスチェック |
| GET | /api/audit-logs | 監査ログ（ADMIN） |
| GET | /api/invoice-check | インボイス番号検証 |

## 6. 業務フロー

### 発注フロー
```
下書き → 申請中 → 承認済 → 発注済 → 請負済 → 納品完了 → 検収完了
              ↓
            却下 → 下書きに戻る
```

### 請求フロー
```
下書き → 提出済 → 承認済 → 支払済
              ↓
            却下 → 下書きに戻る
```

### インボイス制度 経過措置
```
2023/10〜2026/9:  免税事業者からの仕入税額控除 80%
2026/10〜2029/9:  免税事業者からの仕入税額控除 50%
2029/10〜:        免税事業者からの仕入税額控除 0%（控除不可）
```

## 7. セキュリティ

- JWT認証 + CSRF保護（NextAuth）
- レート制限（認証API: 10req/min）
- Zodバリデーション（全APIエンドポイント）
- マルチテナントデータ分離（会社IDスコープ、ADMINバイパス）
- パスワードポリシー（8文字以上、英大小文字+数字）
- bcryptハッシュ化
- 監査ログ
- 電子帳簿保存法対応（SHA-256ハッシュ + タイムスタンプ）
- Edge Runtime互換ミドルウェア（Prisma非依存）
- trustHost設定（Vercel対応）

## 8. 環境変数

| 変数名 | 必須 | 説明 |
|--------|------|------|
| DATABASE_URL | Yes | PostgreSQL接続URL（sslmode=require、channel_binding不可） |
| NEXTAUTH_SECRET | Yes | NextAuth暗号化キー（openssl rand -base64 32） |
| NEXTAUTH_URL | Yes | サイトURL |
| NTA_APP_ID | No | 国税庁API アプリケーションID（インボイス番号検証） |
| NEXT_PUBLIC_SENTRY_DSN | No | Sentry DSN |
| SENTRY_ORG | No | Sentry組織名 |
| SENTRY_PROJECT | No | Sentryプロジェクト名 |

## 9. 既知の注意点

1. **Prisma v7は使用不可** - v5を使用すること
2. **Zod v4はv3と非互換** - enum等のAPIが異なる
3. **ミドルウェアでPrismaをインポートしない** - Edge Runtime制限
4. **NextAuth route handlerはラップしない** - 直接エクスポート
5. **Neon接続URLからchannel_bindingを削除** - Prisma非互換
6. **Vercelデプロイ時はtrustHost: true必須**
