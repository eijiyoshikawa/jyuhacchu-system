# 建設Lシステム 実装ログ

このドキュメントは、建設Lシステムの構築過程を時系列でまとめたものです。

---

## Phase 1: 初期構築

### 実施内容
- Next.js 16 プロジェクト初期化（App Router, TypeScript, Tailwind CSS）
- Prisma v5 セットアップ（※v7はAPI互換性問題でダウングレード）
- データベーススキーマ設計（9テーブル: Company, User, Project, PurchaseOrder, PurchaseOrderItem, Invoice, InvoiceItem, ApprovalFlow, ApprovalStep）
- NextAuth v5 beta 認証セットアップ（Credentials Provider, JWT）
- ダッシュボードレイアウト（サイドバー + ヘッダー）
- UIコンポーネント手動作成（shadcn/uiレジストリにアクセスできなかったため）
  - Button, Input, Label, Card, Table, Badge, Select, Dialog, Tabs, Textarea
- シードデータ作成（3社、3ユーザー、2案件、1発注書）

### 発生したエラー
1. Prisma v7 の PrismaClient コンストラクタAPI変更 → v5にダウングレード
2. Google Fonts（Noto Sans JP）アクセス不可 → システムフォント使用
3. shadcn/ui レジストリアクセス不可 → コンポーネント手動作成
4. Zod v4 の enum API変更 → v4構文に修正

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

---

## Phase 3: テストサービス準備（4エージェント並行実行）

**エージェントA: Docker化 + 環境設定**
- Dockerfile（マルチステージビルド）
- docker-compose.yml（app + db + migrate）
- .env.example
- ヘルスチェックAPI（/api/health）
- next.config.ts に output: "standalone" 追加

**エージェントB: エラーハンドリング + UI改善**
- エラーページ（error.tsx, not-found.tsx, dashboard error.tsx）
- ローディングページ（5ページ分のSkeleton UI）
- トースト通知システム（toast.ts + Toaster コンポーネント）

**エージェントC: APIセキュリティ**
- レート制限（インメモリ、トークンバケット方式）
- APIバリデーションヘルパー（validateBody, apiError, apiSuccess）
- 全APIルートにZodバリデーション適用
- パスワードポリシー（8文字以上、英大小文字+数字）

**エージェントD: 監査ログ + UI拡張**
- AuditLogテーブル追加 + マイグレーション
- 監査ログAPI + 管理者ページ
- ページネーションコンポーネント
- 確認ダイアログコンポーネント
- サイドバーに管理者メニュー追加

---

## Phase 4: 法令準拠（2エージェント並行実行）

**エージェントE: 利用規約・プライバシーポリシー**
- 利用規約ページ（全11条、日本語）
- プライバシーポリシーページ（全8セクション）
- 法的ページ専用レイアウト
- ログイン画面・サイドバーにリンク追加

**エージェントF: 電子帳簿保存法・建設業法**
- PurchaseOrder/Invoiceに confirmedAt, confirmedHash フィールド追加
- SHA-256ドキュメントハッシュ生成・検証ユーティリティ
- 建設業法第19条 必須記載事項チェック
- 確定API（/api/orders/[id]/confirm, /api/invoices/[id]/confirm）
- 法令準拠チェックAPI（/api/orders/[id]/compliance）
- 法令準拠バッジコンポーネント
- 確定済みドキュメントの編集禁止

---

## Phase 5: 機能拡充（4エージェント並行実行）

**エージェントA: レスポンシブ + 検索 + ページネーション**
- 全一覧ページにSearchFilterBarコンポーネント追加
- URLパラメータベースの検索・フィルター
- 全一覧ページにサーバーサイドページネーション（20件/ページ）
- テーブルの列の出し分け（SP: 重要列のみ、PC: 全列）

**エージェントB: パスワード変更 + ユーザー管理**
- パスワード変更API + ページ
- ユーザー管理API（CRUD、ADMIN専用）
- ユーザー一覧・作成・編集ページ
- サイドバーに「設定」「ユーザー管理」追加

**エージェントC: PDF/CSV出力**
- 発注書印刷ページ（A4最適化、建設業法対応項目表示）
- 請求書印刷ページ（適格請求書フォーマット、インボイス番号表示）
- CSV出力API（BOM付き、Excel対応）
- 詳細ページに「印刷/PDF」「CSV出力」ボタン追加

**エージェントD: トランザクション + テナント分離 + 確認ダイアログ**
- 発注/請求作成をPrisma $transaction で囲む
- 全APIにマルチテナントデータ分離（会社IDスコープ、ADMINバイパス）
- 全詳細ページの破壊的操作に確認ダイアログ適用

---

## Phase 6: デプロイ・CI/CD（3エージェント並行実行）

**エージェント1: CI/CD + Vercel設定**
- GitHub Actions CI（lint → build → E2E の3ジョブ）
- vercel.json（東京リージョン、Prisma migrate deploy 自動実行）
- .vercelignore

**エージェント2: E2Eテスト**
- Playwright設定（日本語ロケール、devサーバー自動起動）
- 認証テスト（4テスト）
- ダッシュボードテスト（3テスト）
- 発注テスト（4テスト）
- 協力会社テスト（2テスト）
- 合計13テストケース

**エージェント3: Sentry統合**
- sentry.client.config.ts / server / edge
- next.config.ts にwithSentryConfig適用
- エラーページにSentry.captureException追加

### デプロイ作業
1. Neon PostgreSQL セットアップ（シンガポールリージョン）
2. Vercel デプロイ + 環境変数設定
3. ワンタイムシードAPI作成・実行・削除

### 発生したエラーと修正
- MIDDLEWARE_INVOCATION_FAILED → Cookie ベースセッション確認に変更
- TypeError: Invalid URL → trustHost: true 追加
- NextAuth handler wrapper → 直接エクスポートに変更
- channel_binding=require → パラメータ削除
- 環境変数未設定 → Vercelダッシュボードで設定
- Sentry hideSourceMaps → sourcemaps.disable に修正

---

## Phase 7: デザイン・ブランディング

### 実施内容（3エージェント並行実行）
1. **デザインリニューアル**: 角型デザイン（rounded-sm）、ダークネイビー→白サイドバー、オレンジアクセント、プロフェッショナルな建設業向けUI
2. **サービス名変更**: 「受発注管理システム」→「建設Lシステム」に全ファイル統一
3. **ドキュメント作成**: エラー履歴、システム仕様書

### 追加のデザイン調整
- サイドバーを白背景に変更（ユーザーリクエスト）
- 色味の統一（グレー系テキスト、オレンジアクティブ）

---

## Phase 8: インボイス制度対応

### 実施内容
1. **インボイス番号入力・検証コンポーネント**
   - InvoiceNumberInput: 入力+「確認」ボタン
   - フォーマット検証（T + 13桁の数字）
   - 国税庁 適格請求書発行事業者公表システム Web-API 連携
   - 事業者名・住所・登録日の取得・表示

2. **インボイス制度 経過措置 税額計算**
   - calculateTax() ユーティリティ
   - 免税事業者の控除率自動判定
   - TaxSummary コンポーネント（控除可能/不可の内訳表示）

3. **発注書作成画面への統合**
   - 協力会社選択時にインボイス登録状況を表示
   - 「（免税事業者）」ラベル
   - 金額サマリーに控除情報を表示

### レスポンシブ対応（別エージェント）
- 全20ファイルのSP/タブレット/PC対応
- テーブル横スクロール + 列の出し分け
- フォーム1列/2列切り替え
- ページネーション簡略化（SPはprev/nextのみ）

---

## 統計

| 項目 | 数値 |
|------|------|
| 総コミット数 | 約20 |
| 実装した機能数 | 32 |
| APIエンドポイント数 | 25+ |
| DBテーブル数 | 11 |
| UIコンポーネント数 | 20+ |
| E2Eテストケース数 | 13 |
| 並行エージェント使用回数 | 8回（最大4並行） |
| 発生・解決したエラー | 11件 |
