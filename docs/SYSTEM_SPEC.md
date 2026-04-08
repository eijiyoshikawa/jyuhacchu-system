# 建設Lシステム - システム仕様書

## 1. 概要

建設業界向けの受発注管理プラットフォーム。
ANDPADの受発注機能を参考に、発注書作成・承認ワークフロー・請求管理・協力会社管理をデジタル化。

## 2. 技術スタック

| 項目 | 技術 | バージョン |
|------|------|-----------|
| フレームワーク | Next.js (App Router) | 16.x |
| 言語 | TypeScript | 5.x |
| DB | PostgreSQL | 16+ |
| ORM | Prisma | 5.x（※v7はAPI変更あり、v5推奨） |
| 認証 | NextAuth.js | v5 beta |
| UI | Tailwind CSS + カスタムコンポーネント | 4.x |
| バリデーション | Zod | v4（※v3とAPI差異あり） |
| フォーム | react-hook-form | 7.x |
| ホスティング | Vercel | - |
| DB ホスティング | Neon PostgreSQL | - |
| エラー監視 | Sentry | - |
| CI/CD | GitHub Actions | - |
| E2Eテスト | Playwright | - |

## 3. プロジェクト構成

```
/
├── prisma/                    # Prisma スキーマ・マイグレーション
│   ├── schema.prisma          # データベーススキーマ
│   ├── seed.ts                # シードデータ
│   └── migrations/            # マイグレーションファイル
├── src/
│   ├── app/                   # Next.js App Router
│   │   ├── (dashboard)/       # ダッシュボード関連ページ
│   │   │   ├── page.tsx       # ダッシュボード
│   │   │   ├── orders/        # 発注管理
│   │   │   ├── invoices/      # 請求管理
│   │   │   ├── projects/      # 案件管理
│   │   │   ├── partners/      # 協力会社管理
│   │   │   ├── approvals/     # 承認管理
│   │   │   ├── settings/      # 設定
│   │   │   └── admin/         # 管理者機能
│   │   ├── (legal)/           # 利用規約・プライバシーポリシー
│   │   ├── api/               # APIルート
│   │   └── auth/              # 認証ページ
│   ├── components/
│   │   ├── ui/                # UIコンポーネント
│   │   ├── layout/            # レイアウト
│   │   └── orders/            # 発注関連コンポーネント
│   └── lib/                   # ユーティリティ
│       ├── auth.ts            # NextAuth設定
│       ├── prisma.ts          # Prismaクライアント
│       ├── utils.ts           # ユーティリティ関数
│       └── validations/       # Zodスキーマ
├── e2e/                       # E2Eテスト
├── docs/                      # ドキュメント
├── .github/workflows/         # CI/CD
├── Dockerfile                 # Docker設定
├── docker-compose.yml         # Docker Compose
└── vercel.json                # Vercel設定
```

## 4. データベース設計

### テーブル一覧
| テーブル | 説明 |
|---------|------|
| Company | 会社（元請・協力会社） |
| User | ユーザー（ADMIN/CONTRACTOR/SUBCONTRACTOR） |
| Project | 案件 |
| PurchaseOrder | 発注書 |
| PurchaseOrderItem | 発注明細 |
| Invoice | 請求書 |
| InvoiceItem | 請求明細 |
| ApprovalFlow | 承認フロー |
| ApprovalStep | 承認ステップ |
| AuditLog | 監査ログ |

### ER図（テキスト）
- Company 1:N User
- Company 1:N Project
- Company 1:N PurchaseOrder (issuer/receiver)
- Project 1:N PurchaseOrder
- PurchaseOrder 1:N PurchaseOrderItem
- PurchaseOrder 1:1 ApprovalFlow
- Invoice 1:N InvoiceItem
- Invoice 1:1 ApprovalFlow
- ApprovalFlow 1:N ApprovalStep

## 5. 認証・認可

### ロール
| ロール | 日本語 | 権限 |
|--------|--------|------|
| ADMIN | 管理者 | 全操作、ユーザー管理、監査ログ閲覧 |
| CONTRACTOR | 元請 | 発注作成、承認、案件管理 |
| SUBCONTRACTOR | 協力会社 | 受注確認、請求書作成 |

### 認証方式
- NextAuth.js v5 (beta) + Credentials Provider
- JWT セッション戦略
- Cookie ベースのセッション管理
- ミドルウェアで未認証リクエストをリダイレクト（Edge Runtime 互換）

### 重要な制約
- ミドルウェアでは Prisma をインポートしない（Edge Runtime 制限）
- NextAuth route handler はラップせず直接エクスポート
- `trustHost: true` を本番環境で設定

## 6. 業務フロー

### 発注フロー
```
下書き → 申請中 → 承認済 → 発注済 → 請負済 → 納品完了 → 検収完了
                ↓（却下）
              却下 → 下書きに戻る
```

### 請求フロー
```
下書き → 提出済 → 承認済 → 支払済
              ↓（却下）
            却下 → 下書きに戻る
```

## 7. API一覧

### 認証
- POST /api/auth/[...nextauth] - NextAuth

### 会社
- GET/POST /api/companies
- GET/PUT/DELETE /api/companies/[id]

### 案件
- GET/POST /api/projects
- GET/PUT/DELETE /api/projects/[id]

### 発注
- GET/POST /api/orders
- GET/PUT/DELETE /api/orders/[id]
- POST /api/orders/[id]/submit (申請)
- POST /api/orders/[id]/approve (承認)
- POST /api/orders/[id]/reject (却下)
- POST /api/orders/[id]/confirm (確定・タイムスタンプ)
- GET /api/orders/[id]/compliance (法令準拠チェック)

### 請求
- GET/POST /api/invoices
- GET/PUT/DELETE /api/invoices/[id]
- POST /api/invoices/[id]/submit
- POST /api/invoices/[id]/approve
- POST /api/invoices/[id]/reject
- POST /api/invoices/[id]/confirm
- GET /api/invoices/export (CSV出力)

### ユーザー
- GET/POST /api/users
- GET/PUT/DELETE /api/users/[id]
- POST /api/users/change-password

### その他
- GET /api/health (ヘルスチェック)
- GET /api/audit-logs (監査ログ)

## 8. セキュリティ対策

- JWT ベース認証 + CSRF 保護（NextAuth）
- レート制限（インメモリ、認証API: 10req/min）
- APIバリデーション（Zod スキーマ）
- マルチテナントデータ分離（会社ID ベース）
- 監査ログ
- 電子帳簿保存法対応（SHA-256ハッシュ、タイムスタンプ）
- 建設業法対応（必須記載事項チェック）

## 9. デプロイ手順

docs/DEPLOY_GUIDE.md を参照。

## 10. 環境変数

| 変数名 | 必須 | 説明 |
|--------|------|------|
| DATABASE_URL | Yes | PostgreSQL接続URL |
| NEXTAUTH_SECRET | Yes | NextAuth暗号化キー |
| NEXTAUTH_URL | Yes | サイトURL |
| NEXT_PUBLIC_SENTRY_DSN | No | Sentry DSN |
| SENTRY_ORG | No | Sentry組織名 |
| SENTRY_PROJECT | No | Sentryプロジェクト名 |
