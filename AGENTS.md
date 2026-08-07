<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# 🚀 セッション開始時にユーザーへ表示する内容

**新しいセッションを開始したら、まず以下を必ず表示してください。**

## 📋 現在申請中のITツール（2 系統）

### ① 受発注Lシステム（インボイス対応類型）
| 種別 | URL |
|---|---|
| サービス LP | https://lsystem.let-inc.net/ |
| 申請資料一覧 | https://lsystem.let-inc.net/subsidy |
| 機能説明資料（TX.企画版） | https://lsystem.let-inc.net/subsidy/feature |
| 機能説明資料（LET版） | https://lsystem.let-inc.net/subsidy/feature/let |
| 価格説明資料（デフォルト） | https://lsystem.let-inc.net/subsidy/pricing |
| 価格説明資料（TX.企画版） | https://lsystem.let-inc.net/subsidy/pricing/tx |
| 価格説明資料（LET版） | https://lsystem.let-inc.net/subsidy/pricing/let |
| 申請価格理由書（TX.企画版） | https://lsystem.let-inc.net/subsidy/pricing/rationale |
| 申請価格理由書（LET版） | https://lsystem.let-inc.net/subsidy/pricing/rationale/let |
| その他要件（TX.企画版） | https://lsystem.let-inc.net/subsidy/requirements |
| その他要件（LET版） | https://lsystem.let-inc.net/subsidy/requirements/let |
| デモ機情報（TX.企画版） | https://lsystem.let-inc.net/subsidy/demo-info |
| デモ機情報（LET版） | https://lsystem.let-inc.net/subsidy/demo-info/let |
| 適格請求書サンプル（TX.企画版） | https://lsystem.let-inc.net/subsidy/invoice-sample |
| 適格請求書サンプル（LET版） | https://lsystem.let-inc.net/subsidy/invoice-sample/let |

### ② 電子取引Lシステム（電子取引類型／補助上限 350 万円・補助率 2/3）
| 種別 | URL |
|---|---|
| サービス LP | https://dlsystem.aigrowthx.pro/ |
| 申請資料一覧（LP非公開・直打ちのみ） | https://dlsystem.aigrowthx.pro/transact/subsidy |
| 機能説明資料 | https://dlsystem.aigrowthx.pro/transact/subsidy/feature |
| 価格説明資料 | https://dlsystem.aigrowthx.pro/transact/subsidy/pricing |
| 申請価格理由書 | https://dlsystem.aigrowthx.pro/transact/subsidy/pricing/rationale |
| その他要件 | https://dlsystem.aigrowthx.pro/transact/subsidy/requirements |
| デモ機情報 | https://dlsystem.aigrowthx.pro/transact/subsidy/demo-info |
| 適格請求書サンプル | https://dlsystem.aigrowthx.pro/transact/subsidy/invoice-sample |

### ③ 共通（ログイン・招待）
| 種別 | URL |
|---|---|
| システム本体ログイン | https://jyuhacchu-system.vercel.app/auth/login |
| 取引先招待発行（要 ADMIN ログイン） | https://jyuhacchu-system.vercel.app/partners/invite |
| 招待受諾ページ | https://dlsystem.aigrowthx.pro/invite/[token] |

### 🔑 テストアカウント（審査確認用）
- 発注側管理者: `admin@sample-trading.co.jp` / `password123`
- 発注側担当者: `tanaka@sample-trading.co.jp` / `password123`
- 受注側担当者: `suzuki@tanaka-service.co.jp` / `password123`

---

# 📖 詳細ハンドオーバー

前セッションからの引き継ぎ内容は **`docs/HANDOVER.md`** を参照してください。
（現状・残タスク・運用ルール・審査対応履歴などを網羅）

## 主要ドキュメント
- `docs/HANDOVER.md` — セッション引き継ぎ／現状サマリ
- `docs/APPLICATION_PLAYBOOK.md` — IT導入補助金 申請 Playbook（全 §1-§11）
- `docs/DEPLOY_GUIDE.md` — デプロイ手順
- `docs/SYSTEM_SPEC.md` — システム仕様
- `docs/ERROR_HISTORY.md` — 過去のエラー履歴
- `docs/IMPLEMENTATION_LOG.md` — 実装ログ

## 運用ルール（重要）
- **Vercel と GitHub が連携済み**。`git push` すれば Vercel が自動デプロイする運用に一本化。
  ターミナルからの `vercel deploy` / `vercel link` 等は使わない。
- **開発ブランチ**: `claude/create-marketing-materials-FirCs`（Vercel Production Branch）と `it-hojo`（サブ）
- **GitHub auto-merge 有効化済み**。PR 作成 → CI 緑 → 自動マージの流れ。
- **デフォルトブランチ**: `claude/construction-order-system-Ph84i`（PR のマージ先）
