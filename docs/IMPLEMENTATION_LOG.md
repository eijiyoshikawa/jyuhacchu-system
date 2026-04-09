# 建設Lシステム 実装ログ

このドキュメントは、建設Lシステムの構築過程を時系列でまとめたものです。
各フェーズで実装した機能、発生したエラー、および解決策を記録しています。

---

## Phase 1: 初期構築

### 実施内容
- Next.js 16 プロジェクト初期化（App Router, TypeScript, Tailwind CSS 4）
- Prisma v5 セットアップ（※v7はAPI互換性問題でダウングレード）
- データベーススキーマ設計（初期9テーブル: Company, User, Project, PurchaseOrder, PurchaseOrderItem, Invoice, InvoiceItem, ApprovalFlow, ApprovalStep）
- NextAuth v5 beta 認証セットアップ（Credentials Provider, JWT戦略）
- ダッシュボードレイアウト構築（サイドバー + ヘッダー + DashboardShell）
- UIコンポーネント手動作成（shadcn/uiレジストリにアクセスできなかったため）
  - Button, Input, Label, Card, Table, Badge, Select, Dialog, Tabs, Textarea
- シードデータ作成（3社、3ユーザー、2案件、1発注書）

### 発生したエラー
1. **Prisma v7 互換性問題** - PrismaClient コンストラクタAPI変更 → v5にダウングレード
2. **Google Fonts アクセスエラー** - Noto Sans JP取得不可 → システムフォント使用
3. **shadcn/ui レジストリアクセスエラー** - 認証失敗 → コンポーネント手動作成
4. **Zod v4 enum API変更** - required_error非対応 → v4構文に修正

### 成果物
- プロジェクト基盤（Next.js 16 + TypeScript + Tailwind CSS 4）
- prisma/schema.prisma（9テーブル）
- src/lib/auth.ts（NextAuth設定）
- src/lib/prisma.ts（Prismaクライアント）
- src/components/ui/（10コンポーネント）
- src/components/layout/（header, sidebar, dashboard-shell）

---

## Phase 2: コア機能実装

### 実施内容（3エージェント並行実行）

**エージェント1: 案件管理**
- API: /api/projects (GET, POST), /api/projects/[id] (GET, PUT, DELETE)
- ページ: 一覧、新規作成、詳細/編集
- 案件コード自動生成（PJ-YYYYMMDD-XXXX）

**エージェント2: 発注管理（コア機能）**
- API: /api/orders + /api/orders/[id]/{submit,approve,reject}
- ページ: 一覧、新規作成（明細テーブル付き）、詳細（ステータスタイムライン付き）
- 発注番号自動生成（PO-YYYYMMDD-XXXX）
- 承認ワークフロー（ApprovalFlow + ApprovalStep）
- ステータス管理: 下書き→申請中→承認済→発注済→検収完了

**エージェント3: 請求管理 + 承認 + ダッシュボード**
- API: /api/invoices + /api/invoices/[id]/{submit,approve,reject}
- 請求番号自動生成（INV-YYYYMMDD-XXXX）
- 発注書からの明細自動入力
- 承認待ち一覧ページ
- ダッシュボード（サマリーカード、最近の発注/請求）

**直接実装: 協力会社管理**
- API: /api/companies (GET, POST), /api/companies/[id] (GET, PUT, DELETE)
- ページ: 一覧、新規作成、詳細/編集

### 成果物
- src/app/(dashboard)/orders/（一覧/新規/詳細）
- src/app/(dashboard)/invoices/（一覧/新規/詳細）
- src/app/(dashboard)/projects/（一覧/新規/詳細）
- src/app/(dashboard)/partners/（一覧/新規/詳細）
- src/app/(dashboard)/approvals/（承認待ち一覧）
- src/app/api/ 配下の各APIルート
- src/components/orders/order-status-timeline.tsx

---

## Phase 3: テストサービス準備（4エージェント並行実行）

**エージェントA: Docker化 + 環境設定**
- Dockerfile（マルチステージビルド）
- docker-compose.yml（app + db + migrate サービス）
- .env.example（全環境変数テンプレート）
- ヘルスチェックAPI（/api/health）
- next.config.ts に output: "standalone" 追加

**エージェントB: エラーハンドリング + UI改善**
- エラーページ（error.tsx, not-found.tsx, dashboard error.tsx）
- ローディングページ（5ページ分のSkeleton UI）
- トースト通知システム（toast.ts + Toaster コンポーネント）

**エージェントC: APIセキュリティ**
- レート制限（インメモリ、トークンバケット方式、認証API: 10req/min）
- APIバリデーションヘルパー（validateBody, apiError, apiSuccess）
- 全APIルートにZodバリデーション適用
- パスワードポリシー（8文字以上、英大小文字+数字）

**エージェントD: 監査ログ + UI拡張**
- AuditLogテーブル追加（10番目のテーブル）+ マイグレーション
- 監査ログAPI（/api/audit-logs）+ 管理者ページ
- ページネーションコンポーネント
- 確認ダイアログコンポーネント
- サイドバーに管理者メニュー追加

### 成果物
- Dockerfile, docker-compose.yml, .env.example
- src/app/(dashboard)/admin/audit-logs/
- src/components/ui/（pagination, confirm-dialog, toaster 追加）

---

## Phase 4: 法令準拠（2エージェント並行実行）

**エージェントE: 利用規約・プライバシーポリシー**
- 利用規約ページ（/terms）- 全11条、日本語
- プライバシーポリシーページ（/privacy）- 全8セクション
- 法的ページ専用レイアウト（src/app/(legal)/）
- ログイン画面・サイドバーにリンク追加

**エージェントF: 電子帳簿保存法・建設業法**
- PurchaseOrder/Invoice に confirmedAt, confirmedHash フィールド追加
- SHA-256ドキュメントハッシュ生成・検証ユーティリティ
- 建設業法第19条 必須記載事項カラム追加（constructionName, constructionSite, constructionPeriodStart/End, paymentTerms, defectWarranty）
- 確定API（/api/orders/[id]/confirm, /api/invoices/[id]/confirm）
- 法令準拠チェックAPI（/api/orders/[id]/compliance）
- 法令準拠バッジコンポーネント（ComplianceBadge）
- 確定済みドキュメントの編集禁止制御

### 成果物
- src/app/(legal)/terms/, privacy/
- 電子帳簿保存法対応API（confirm エンドポイント）
- 建設業法準拠チェックAPI（compliance エンドポイント）
- src/components/ui/compliance-badge.tsx

---

## Phase 5: 機能拡充（4エージェント並行実行）

**エージェントA: レスポンシブ + 検索 + ページネーション**
- 全一覧ページにSearchFilterBarコンポーネント追加
- URLパラメータベースの検索・フィルター
- 全一覧ページにサーバーサイドページネーション（20件/ページ）
- テーブルの列の出し分け（SP: 重要列のみ、PC: 全列）

**エージェントB: パスワード変更 + ユーザー管理**
- パスワード変更API（/api/users/change-password）+ 設定ページ
- ユーザー管理API（CRUD、ADMIN専用）
- ユーザー一覧・作成・編集ページ（/admin/users/）
- サイドバーに「設定」「ユーザー管理」追加

**エージェントC: 印刷/CSV出力**
- 発注書印刷ページ（/orders/[id]/print）- A4最適化、建設業法対応項目表示
- 請求書印刷ページ（/invoices/[id]/print）- 適格請求書フォーマット、インボイス番号表示
- CSV出力API（/api/invoices/export）- BOM付きUTF-8、Excel対応
- 詳細ページに「印刷/PDF」「CSV出力」ボタン追加

**エージェントD: トランザクション + テナント分離 + 確認ダイアログ**
- 発注/請求作成をPrisma.$transaction で囲む
- 全APIにマルチテナントデータ分離（会社IDスコープ、ADMINバイパス）
- 全詳細ページの破壊的操作に確認ダイアログ適用

### 成果物
- src/app/(dashboard)/orders/[id]/print/
- src/app/(dashboard)/invoices/[id]/print/
- src/app/api/invoices/export/
- src/app/(dashboard)/settings/
- src/app/(dashboard)/admin/users/（一覧/新規/詳細）
- src/components/ui/search-filter-bar.tsx

---

## Phase 6: デプロイ・CI/CD（3エージェント並行実行）

**エージェント1: CI/CD + Vercel設定**
- GitHub Actions CI パイプライン（.github/workflows/ci.yml）
  - lint-and-typecheck → build → e2e の3ジョブ
  - PostgreSQL Service Container使用
- vercel.json（東京リージョン hnd1、Prisma migrate deploy 自動実行）

**エージェント2: E2Eテスト**
- Playwright設定（日本語ロケール、devサーバー自動起動）
- テストケース:
  - 認証テスト（4テスト）
  - ダッシュボードテスト（3テスト）
  - 発注テスト（4テスト）
  - 協力会社テスト（2テスト）
- 合計13テストケース

**エージェント3: Sentry統合**
- sentry.client.config.ts / sentry.server.config.ts / sentry.edge.config.ts
- next.config.ts にwithSentryConfig適用
- エラーページにSentry.captureException追加

### デプロイ作業
1. Neon PostgreSQL セットアップ
2. Vercel デプロイ + 環境変数設定
3. ワンタイムシードAPI作成・実行・削除
4. 本番動作確認

### 発生したエラーと修正
- **MIDDLEWARE_INVOCATION_FAILED** → Cookie ベースセッション確認に変更
- **TypeError: Invalid URL** → trustHost: true 追加
- **NextAuth handler wrapper エラー** → 直接エクスポートに変更
- **channel_binding=require** → パラメータ削除
- **環境変数未設定** → Vercelダッシュボードで設定

### 成果物
- .github/workflows/ci.yml
- e2e/ テストファイル群
- vercel.json
- 本番環境デプロイ完了

---

## Phase 7: デザイン・ブランディング

### 実施内容（3エージェント並行実行）
1. **デザインリニューアル**: 角型デザイン（rounded-sm）、プロフェッショナルな建設業向けUI
2. **サービス名変更**: 「受発注管理システム」→「建設Lシステム」に全ファイル統一
3. **ドキュメント作成**: エラー履歴（ERROR_HISTORY.md）、システム仕様書（SYSTEM_SPEC.md）

### 追加のデザイン調整
- サイドバーを白背景に変更
- 色味の統一（グレー系テキスト、オレンジアクセントカラー）
- ステータスバッジの色分け改善

### 発生したエラー
- **Vercel ビルドキャッシュ問題** → キャッシュ無効化再デプロイで解決

---

## Phase 8: インボイス制度対応

### 実施内容
1. **インボイス番号入力・検証コンポーネント**
   - InvoiceNumberInput: 入力フィールド + 「確認」ボタン
   - フォーマット検証（T + 13桁の数字）
   - 国税庁 適格請求書発行事業者公表システム Web-API 連携
   - 事業者名・住所・登録日の取得・表示
   - NTA_APP_ID 環境変数で制御（未設定時はフォーマットチェックのみ）

2. **インボイス制度 経過措置 税額計算**
   - calculateTax() ユーティリティ関数
   - 免税事業者の控除率自動判定
     - 2023/10〜2026/9: 80%控除
     - 2026/10〜2029/9: 50%控除
     - 2029/10〜: 0%控除（控除不可）
   - TaxSummary コンポーネント（控除可能/不可の消費税額内訳表示）

3. **発注書作成画面への統合**
   - 協力会社選択時にインボイス登録状況を表示
   - 「（免税事業者）」ラベル
   - 金額サマリーに控除情報を表示

4. **レスポンシブ対応の仕上げ**
   - 全20ファイルのSP/タブレット/PC対応
   - テーブル横スクロール + 列の出し分け
   - フォーム1列/2列切り替え
   - ページネーション簡略化（SPはprev/nextのみ）

### 成果物
- src/components/ui/invoice-number-input.tsx
- src/components/ui/tax-summary.tsx
- src/app/api/invoice-check/route.ts
- .env.example に NTA_APP_ID 追加

---

## 統計

| 項目 | 数値 |
|------|------|
| 実装した機能数 | 35（コア業務10 + インボイス3 + 法令5 + 出力3 + UI7 + セキュリティ4 + インフラ3） |
| APIエンドポイント数 | 25 |
| DBテーブル数 | 11（AuditLog含む） |
| UIコンポーネント数 | 23 |
| ページ数 | 21（ダッシュボード、各CRUD、印刷、設定、管理者、法的ページ） |
| E2Eテストケース数 | 13 |
| 並行エージェント使用回数 | 8回（最大4並行） |
| 発生・解決したエラー | 11件 |
| 環境変数数 | 10（必須3 + 任意7） |

---

## 技術的な判断記録

### Prisma v5 を選択した理由
- v7 は PrismaClient コンストラクタの API が大幅に変更された
- driver adapter パターンへの移行が必要で、開発コストが高い
- v5 は安定しており、従来の `env("DATABASE_URL")` パターンが使用可能

### shadcn/ui を手動実装した理由
- レジストリへのアクセスが認証エラーで失敗
- CVA (class-variance-authority) + Tailwind CSS で同等の品質を実現
- コンポーネントのカスタマイズが容易

### Cookie ベースのミドルウェアを選択した理由
- Edge Runtime では PrismaClient が動作しない
- NextAuth の auth() 関数は内部で Prisma をインポートする
- Cookie の存在チェックのみで認証状態を軽量に判定可能

### JWT セッション戦略を選択した理由
- Edge Runtime との互換性確保
- DBアクセスなしでセッション検証可能
- Vercel のサーバーレス環境に最適

---

## 今後の課題

1. Next.js の proxy パターンへの移行（middleware 非推奨対応）
2. Prisma v7+ への移行（driver adapter パターン導入時）
3. 本番用パスワードへの変更（シードデータのデフォルトパスワード）
4. 法務レビュー（利用規約・プライバシーポリシーの弁護士確認）
5. パフォーマンス最適化（大量データ時のクエリ最適化）
6. テストカバレッジの拡充（単体テスト追加）
7. Neon PostgreSQL の東京リージョン移行検討
