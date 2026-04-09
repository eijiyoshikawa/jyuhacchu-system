# 建設Lシステム - システム仕様書

## 1. 概要

建設業界向けの受発注管理プラットフォーム。
ANDPADの受発注機能を参考に、発注書作成・承認ワークフロー・請求管理・協力会社管理をデジタル化。
インボイス制度・電子帳簿保存法・建設業法に対応。

**公開URL**: Vercel にデプロイ済み

## 2. 技術スタック

| 項目 | 技術 | バージョン | 備考 |
|------|------|-----------|------|
| フレームワーク | Next.js (App Router) | 16.x | Turbopack |
| 言語 | TypeScript | 5.x | strict mode |
| DB | PostgreSQL | 16+ | Neon (本番) |
| ORM | Prisma | 5.x | v7はAPI互換性なし、v5推奨 |
| 認証 | NextAuth.js | v5 beta | JWT + Credentials |
| UI | Tailwind CSS + カスタムコンポーネント | 4.x | shadcn/ui互換の手動実装 |
| バリデーション | Zod | v4 | v3とAPI差異あり |
| フォーム | react-hook-form | 7.x | @hookform/resolvers |
| ホスティング | Vercel | Hobby | 東京リージョン (hnd1) |
| DBホスティング | Neon PostgreSQL | Free | |
| エラー監視 | Sentry | Free | @sentry/nextjs |
| CI/CD | GitHub Actions | - | lint + build + E2E |
| E2Eテスト | Playwright | - | Chromium |
| アイコン | Lucide React | - | |
| ユーティリティ | date-fns, clsx, tailwind-merge, class-variance-authority | - | |

## 3. プロジェクト構成

```
/
├── prisma/
│   ├── schema.prisma          # データベーススキーマ（11テーブル）
│   ├── seed.ts                # シードデータ
│   └── migrations/            # マイグレーションファイル
├── src/
│   ├── app/
│   │   ├── (dashboard)/       # ダッシュボード関連ページ
│   │   │   ├── page.tsx       # ダッシュボード
│   │   │   ├── orders/        # 発注管理（一覧/新規/詳細/印刷）
│   │   │   ├── invoices/      # 請求管理（一覧/新規/詳細/印刷）
│   │   │   ├── projects/      # 案件管理（一覧/新規/詳細）
│   │   │   ├── partners/      # 協力会社管理（一覧/新規/詳細）
│   │   │   ├── approvals/     # 承認管理
│   │   │   ├── settings/      # 設定（パスワード変更）
│   │   │   └── admin/         # 管理者機能（ユーザー管理/監査ログ）
│   │   ├── (legal)/           # 利用規約・プライバシーポリシー
│   │   ├── api/               # APIルート（25エンドポイント）
│   │   └── auth/              # 認証ページ（ログイン）
│   ├── components/
│   │   ├── ui/                # UIコンポーネント（23個）
│   │   ├── layout/            # レイアウト（header/sidebar/dashboard-shell）
│   │   └── orders/            # 発注関連（ステータスタイムライン）
│   └── lib/
│       ├── auth.ts            # NextAuth設定
│       ├── prisma.ts          # Prismaクライアント
│       ├── utils.ts           # ユーティリティ関数
│       └── validations/       # Zodスキーマ
├── e2e/                       # E2Eテスト
├── docs/                      # ドキュメント
├── .github/workflows/ci.yml   # CI/CD
├── Dockerfile                 # Docker設定
├── docker-compose.yml         # Docker Compose（app + db + migrate）
└── vercel.json                # Vercel設定（hnd1リージョン）
```

## 4. 実装機能一覧（全32機能）

### コア業務機能
| # | 機能 | 説明 |
|---|------|------|
| 1 | ユーザー認証 | NextAuth JWT、3ロール（ADMIN/CONTRACTOR/SUBCONTRACTOR） |
| 2 | ダッシュボード | サマリーカード、最近の発注/請求、会社スコープ表示 |
| 3 | 案件管理 | CRUD、コード自動生成（PJ-YYYYMMDD-XXXX） |
| 4 | 発注管理 | CRUD、明細項目、番号自動生成（PO-YYYYMMDD-XXXX）、ステータスワークフロー |
| 5 | 請求管理 | CRUD、明細項目、番号自動生成（INV-YYYYMMDD-XXXX）、発注書からの自動入力 |
| 6 | 協力会社管理 | CRUD、インボイス番号入力・国税庁API検証 |
| 7 | 承認ワークフロー | 多段階承認、承認/却下＋コメント |
| 8 | ユーザー管理 | ADMIN専用、CRUD |
| 9 | パスワード変更 | ポリシー検証付き |
| 10 | 監査ログ | ADMIN専用、全操作記録・閲覧 |

### インボイス制度対応
| # | 機能 | 説明 |
|---|------|------|
| 11 | インボイス番号検証 | 国税庁Web-API連携、フォーマット検証（T＋13桁数字） |
| 12 | 経過措置 税額計算 | 免税事業者の控除率自動計算（80%→50%→0%） |
| 13 | TaxSummary表示 | 控除可能/不可の消費税額を視覚的に表示 |

### 法令準拠
| # | 機能 | 説明 |
|---|------|------|
| 14 | 電子帳簿保存法対応 | SHA-256ハッシュ＋タイムスタンプで改ざん防止 |
| 15 | 建設業法対応 | 第19条 必須記載事項チェック |
| 16 | 法令準拠バッジ | 準拠/要確認の状態バッジ表示 |
| 17 | 利用規約 | /terms ページ |
| 18 | プライバシーポリシー | /privacy ページ |

### 出力機能
| # | 機能 | 説明 |
|---|------|------|
| 19 | 発注書印刷 | A4印刷最適化ページ、建設業法対応項目表示 |
| 20 | 請求書印刷 | 適格請求書フォーマット、インボイス番号表示 |
| 21 | CSV出力 | 請求一覧エクスポート（BOM付きUTF-8、Excel対応） |

### UI/UX
| # | 機能 | 説明 |
|---|------|------|
| 22 | レスポンシブデザイン | SP / タブレット / PC 対応 |
| 23 | 検索・フィルター | 全一覧ページ、ステータス/キーワード検索 |
| 24 | ページネーション | 全一覧ページ、20件/ページ |
| 25 | 確認ダイアログ | 削除・ステータス変更前の確認 |
| 26 | トースト通知 | 操作成功/失敗のフィードバック |
| 27 | エラーページ | error.tsx、not-found.tsx |
| 28 | ローディングUI | Skeleton Screen |

### セキュリティ・インフラ
| # | 機能 | 説明 |
|---|------|------|
| 29 | レート制限 | 認証API: 10req/min（インメモリ） |
| 30 | APIバリデーション | 全POST/PUTエンドポイントでZodスキーマ検証 |
| 31 | マルチテナントデータ分離 | 会社IDベースのスコープ、ADMINバイパス |
| 32 | トランザクション処理 | 発注/請求の作成時にPrisma.$transaction使用 |

### デプロイ・運用
| # | 機能 | 説明 |
|---|------|------|
| 33 | Docker対応 | Dockerfile + docker-compose.yml |
| 34 | CI/CD | GitHub Actions（lint, typecheck, build, E2E） |
| 35 | Sentry エラー監視 | ランタイムエラーの自動収集 |

## 5. データベース設計（11テーブル）

### テーブル一覧
| テーブル | 説明 | 主要カラム |
|---------|------|-----------|
| Company | 会社（元請・協力会社） | name, code, companyType, registrationNumber |
| User | ユーザー | email, name, password(bcrypt), role, companyId |
| Project | 案件 | projectCode, name, status, companyId, address |
| PurchaseOrder | 発注書 | orderNumber, subject, status, subtotal, taxAmount, totalAmount |
| PurchaseOrderItem | 発注明細 | name, specification, quantity, unit, unitPrice, amount |
| Invoice | 請求書 | invoiceNumber, subject, status, subtotal, taxAmount, totalAmount, dueDate |
| InvoiceItem | 請求明細 | name, specification, quantity, unit, unitPrice, amount |
| ApprovalFlow | 承認フロー | targetType(ORDER/INVOICE), status |
| ApprovalStep | 承認ステップ | stepOrder, approverId, status, comment, decidedAt |
| AuditLog | 監査ログ | userId, userName, action, targetType, targetId, details, ipAddress |

### Enum定義
| Enum | 値 |
|------|-----|
| UserRole | ADMIN, CONTRACTOR, SUBCONTRACTOR |
| CompanyType | GENERAL_CONTRACTOR, SUBCONTRACTOR |
| ProjectStatus | IN_PROGRESS, COMPLETED, CANCELLED |
| OrderStatus | DRAFT, PENDING_APPROVAL, APPROVED, ORDERED, ACCEPTED, DELIVERY_REPORTED, INSPECTED, REJECTED, CANCELLED |
| InvoiceStatus | DRAFT, SUBMITTED, APPROVED, REJECTED, PAID |
| ApprovalTargetType | ORDER, INVOICE |
| ApprovalStatus | PENDING, APPROVED, REJECTED |

### ER図（テキスト）
```
Company ─1:N─ User
Company ─1:N─ Project
Company ─1:N─ PurchaseOrder (issuer/receiver の2つのリレーション)
Company ─1:N─ Invoice (issuer/receiver の2つのリレーション)
Project ─1:N─ PurchaseOrder
Project ─1:N─ Invoice
PurchaseOrder ─1:N─ PurchaseOrderItem (onDelete: Cascade)
PurchaseOrder ─0..1:1─ ApprovalFlow
PurchaseOrder ─1:N─ Invoice
Invoice ─1:N─ InvoiceItem (onDelete: Cascade)
Invoice ─0..1:1─ ApprovalFlow
ApprovalFlow ─1:N─ ApprovalStep (onDelete: Cascade)
User ─1:N─ ApprovalStep (approver)
User ─1:N─ PurchaseOrder (createdBy)
User ─1:N─ Invoice (createdBy)
User ─1:N─ ApprovalFlow (requestedBy)
AuditLog (独立テーブル、外部キー制約なし)
```

### 電子帳簿保存法対応カラム
PurchaseOrder と Invoice に以下のカラムを追加：
- `confirmedAt` (DateTime) - 確定日時（タイムスタンプ）
- `confirmedHash` (String) - 確定時のSHA-256ハッシュ値（改ざん防止）

### 建設業法対応カラム（PurchaseOrder）
- `constructionName` - 工事名称
- `constructionSite` - 工事場所
- `constructionPeriodStart` / `constructionPeriodEnd` - 工期
- `paymentTerms` - 支払条件
- `defectWarranty` - 瑕疵担保責任

## 6. 認証・認可

### ロール
| ロール | 日本語 | 権限 |
|--------|--------|------|
| ADMIN | 管理者 | 全操作、ユーザー管理、監査ログ閲覧、全社データ参照 |
| CONTRACTOR | 元請 | 発注作成、承認、案件管理、自社データのみ |
| SUBCONTRACTOR | 協力会社 | 受注確認、請求書作成、自社データのみ |

### 認証方式
- NextAuth.js v5 (beta) + Credentials Provider
- JWT セッション戦略（DBセッション不使用）
- bcryptjs によるパスワードハッシュ化
- Cookie ベースのセッション管理
- ミドルウェアで未認証リクエストをリダイレクト（Edge Runtime 互換）

### JWTトークンに含まれる情報
- `sub` - ユーザーID
- `role` - ユーザーロール
- `companyId` - 所属会社ID
- `companyName` - 所属会社名

### 重要な制約
- ミドルウェアでは Prisma をインポートしない（Edge Runtime 制限）
- NextAuth route handler はラップせず直接エクスポート
- `trustHost: true` を設定（Vercel対応）

## 7. API一覧（全25エンドポイント）

### 認証
| Method | Endpoint | 説明 |
|--------|----------|------|
| GET/POST | `/api/auth/[...nextauth]` | NextAuth 認証 |

### 会社（協力会社管理）
| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | `/api/companies` | 一覧取得（search, type クエリ対応） |
| POST | `/api/companies` | 新規作成（ADMIN） |
| GET | `/api/companies/[id]` | 詳細取得 |
| PUT | `/api/companies/[id]` | 更新 |
| DELETE | `/api/companies/[id]` | 削除 |

### 案件
| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | `/api/projects` | 一覧取得 |
| POST | `/api/projects` | 新規作成（コード自動生成） |
| GET | `/api/projects/[id]` | 詳細取得 |
| PUT | `/api/projects/[id]` | 更新 |
| DELETE | `/api/projects/[id]` | 削除 |

### 発注
| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | `/api/orders` | 一覧取得（status, search, page） |
| POST | `/api/orders` | 新規作成（明細含む、トランザクション） |
| GET | `/api/orders/[id]` | 詳細取得（明細、承認フロー含む） |
| PUT | `/api/orders/[id]` | 更新 |
| DELETE | `/api/orders/[id]` | 削除（DRAFT のみ） |
| POST | `/api/orders/[id]/submit` | 申請（DRAFT→PENDING_APPROVAL） |
| POST | `/api/orders/[id]/approve` | 承認 |
| POST | `/api/orders/[id]/reject` | 却下 |
| POST | `/api/orders/[id]/confirm` | 確定（タイムスタンプ＋SHA-256ハッシュ記録） |
| GET | `/api/orders/[id]/compliance` | 建設業法・電子帳簿保存法 準拠チェック |

### 請求
| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | `/api/invoices` | 一覧取得 |
| POST | `/api/invoices` | 新規作成（明細含む、トランザクション） |
| GET | `/api/invoices/[id]` | 詳細取得 |
| PUT | `/api/invoices/[id]` | 更新 |
| DELETE | `/api/invoices/[id]` | 削除（DRAFT のみ） |
| POST | `/api/invoices/[id]/submit` | 提出 |
| POST | `/api/invoices/[id]/approve` | 承認 |
| POST | `/api/invoices/[id]/reject` | 却下 |
| POST | `/api/invoices/[id]/confirm` | 確定（タイムスタンプ＋SHA-256ハッシュ記録） |
| GET | `/api/invoices/export` | CSV出力（BOM付きUTF-8） |

### ユーザー
| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | `/api/users` | 一覧取得（ADMIN） |
| POST | `/api/users` | 新規作成（ADMIN） |
| GET | `/api/users/[id]` | 詳細取得 |
| PUT | `/api/users/[id]` | 更新 |
| DELETE | `/api/users/[id]` | 削除 |
| POST | `/api/users/change-password` | パスワード変更 |

### インボイス検証
| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | `/api/invoice-check?number=T1234567890123` | インボイス番号検証（国税庁API） |

### その他
| Method | Endpoint | 説明 |
|--------|----------|------|
| GET | `/api/health` | ヘルスチェック |
| GET | `/api/audit-logs` | 監査ログ一覧（ADMIN） |

## 8. 業務フロー

### 発注フロー
```
下書き(DRAFT)
  ↓ 申請
申請中(PENDING_APPROVAL)
  ↓ 承認           ↓ 却下
承認済(APPROVED)    却下(REJECTED) → 下書きに戻る
  ↓ 発注
発注済(ORDERED)
  ↓ 受諾
請負済(ACCEPTED)
  ↓ 納品報告
納品完了(DELIVERY_REPORTED)
  ↓ 検収
検収完了(INSPECTED) → 確定（タイムスタンプ + ハッシュ）
```

### 請求フロー
```
下書き(DRAFT)
  ↓ 提出
提出済(SUBMITTED)
  ↓ 承認           ↓ 却下
承認済(APPROVED)    却下(REJECTED) → 下書きに戻る
  ↓ 支払
支払済(PAID)
```

### インボイス制度 経過措置の控除率
```
2023年10月〜2026年9月: 免税事業者からの仕入税額控除 80%
2026年10月〜2029年9月: 免税事業者からの仕入税額控除 50%
2029年10月〜:          免税事業者からの仕入税額控除  0%（控除不可）
```

## 9. セキュリティ対策

| 対策 | 実装方法 |
|------|----------|
| 認証 | NextAuth v5 JWT + Credentials Provider |
| CSRF保護 | NextAuth 組み込み |
| レート制限 | インメモリ、認証API: 10req/min |
| APIバリデーション | Zod スキーマ（全POST/PUTエンドポイント） |
| パスワード | bcryptjs ハッシュ化 |
| パスワードポリシー | 8文字以上、英大小文字＋数字 |
| マルチテナント分離 | 会社IDベースのクエリフィルタ、ADMINバイパス |
| 監査ログ | 全操作をAuditLogテーブルに記録 |
| 改ざん防止 | SHA-256ハッシュ + タイムスタンプ（電子帳簿保存法） |
| Edge Runtime安全性 | ミドルウェアでDB非依存（Cookie確認のみ） |
| SSL/TLS | Vercel 自動SSL + Neon sslmode=require |

## 10. UIコンポーネント一覧

手動実装したshadcn/ui互換コンポーネント：
| コンポーネント | ファイル | 説明 |
|---------------|---------|------|
| Button | button.tsx | バリアント対応（default/destructive/outline/ghost） |
| Input | input.tsx | フォーム入力 |
| Label | label.tsx | フォームラベル |
| Select | select.tsx | セレクトボックス |
| Textarea | textarea.tsx | テキストエリア |
| Card | card.tsx | カードレイアウト |
| Table | table.tsx | テーブル |
| Badge | badge.tsx | バッジ |
| StatusBadge | status-badge.tsx | ステータス別色分けバッジ |
| ComplianceBadge | compliance-badge.tsx | 法令準拠バッジ |
| Dialog | dialog.tsx | ダイアログ |
| ConfirmDialog | confirm-dialog.tsx | 確認ダイアログ |
| Tabs | tabs.tsx | タブ |
| Pagination | pagination.tsx | ページネーション |
| SearchFilterBar | search-filter-bar.tsx | 検索・フィルターバー |
| PageHeader | page-header.tsx | ページヘッダー |
| Toaster | toaster.tsx | トースト通知 |
| InvoiceNumberInput | invoice-number-input.tsx | インボイス番号入力・検証 |
| TaxSummary | tax-summary.tsx | 経過措置税額サマリー |
| OrderStatusTimeline | order-status-timeline.tsx | 発注ステータスタイムライン |
| Header | header.tsx | アプリヘッダー |
| Sidebar | sidebar.tsx | サイドバーナビゲーション |
| DashboardShell | dashboard-shell.tsx | ダッシュボードレイアウト |

## 11. 環境変数

| 変数名 | 必須 | 説明 | 例 |
|--------|------|------|-----|
| DATABASE_URL | Yes | PostgreSQL接続URL | postgresql://user:pass@host/db?sslmode=require |
| NEXTAUTH_SECRET | Yes | NextAuth暗号化キー | openssl rand -base64 32 で生成 |
| NEXTAUTH_URL | Yes | サイトURL | https://your-app.vercel.app |
| NTA_APP_ID | No | 国税庁API アプリケーションID | 未設定時はフォーマットチェックのみ |
| NEXT_PUBLIC_SENTRY_DSN | No | Sentry DSN | https://xxx@xxx.ingest.sentry.io/xxx |
| SENTRY_ORG | No | Sentry組織名 | |
| SENTRY_PROJECT | No | Sentryプロジェクト名 | |
| POSTGRES_USER | No | Docker用 PostgreSQLユーザー | postgres |
| POSTGRES_PASSWORD | No | Docker用 PostgreSQLパスワード | postgres |
| POSTGRES_DB | No | Docker用 データベース名 | jyuhacchu |

## 12. デプロイ構成

### Vercel設定（vercel.json）
```json
{
  "buildCommand": "npx prisma generate && npx prisma migrate deploy && npm run build",
  "framework": "nextjs",
  "regions": ["hnd1"]
}
```

### CI/CDパイプライン（GitHub Actions）
```
Push to main/claude/* → lint-and-typecheck → build → e2e
Pull Request to main  → lint-and-typecheck → build → e2e
```

ジョブ構成：
1. **lint-and-typecheck**: ESLint + TypeScript型チェック
2. **build**: Prisma migrate + Next.js ビルド（PostgreSQL Service Container使用）
3. **e2e**: Playwright テスト実行（シードデータ投入 + Chromium）

### Docker構成
- **db**: PostgreSQL 16 Alpine + ヘルスチェック
- **migrate**: prisma migrate deploy（DB起動後に実行）
- **app**: Next.js アプリケーション（マイグレーション完了後に起動）

## 13. 既知の制約・注意事項

1. **Prisma v7は使用不可** - v5を固定使用すること（v7はAPIが大幅変更）
2. **Zod v4はv3と非互換** - enum等のAPIが異なる
3. **ミドルウェアでPrismaをインポートしない** - Edge Runtime制限
4. **NextAuth route handlerはラップしない** - 直接エクスポートすること
5. **Neon接続URLからchannel_bindingを削除** - Prisma非互換
6. **Vercelデプロイ時はtrustHost: true必須** - NextAuth設定
7. **Next.js 16でmiddlewareは非推奨** - 現時点では動作するが将来的にproxyへ移行必要
8. **Google Fonts不使用** - ビルド環境でのアクセス制限のためシステムフォント使用

詳細はdocs/ERROR_HISTORY.mdを参照。
デプロイ手順はdocs/DEPLOY_GUIDE.mdを参照。
