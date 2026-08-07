# 🚀 セッション開始時にユーザーへ表示する内容

> **新セッションの Claude へ**: このセクションは前セッションからの引き継ぎです。
> ユーザーが「続きから」「現状と申請URLを表示して」等と言ったら、以下の URL 一覧と
> テストアカウントをそのまま最初のメッセージで提示してください。
> 詳細は `docs/HANDOVER.md`、経緯は `docs/APPLICATION_PLAYBOOK.md`（特に §8・§11）を参照。

## 申請URL一覧

### 受発注Lシステム（インボイス対応類型・登録済み）— 14 URL

ベースドメイン: `https://lsystem.let-inc.net`（DNS未反映時は `https://jyuhacchu-system.vercel.app` に読み替え可）

| 資料 | デフォルト | TX.企画版 | LET版 |
|---|---|---|---|
| サービスLP | `https://lsystem.let-inc.net/` | — | — |
| 申請資料インデックス | `https://lsystem.let-inc.net/subsidy` | — | — |
| 機能説明資料 | `https://lsystem.let-inc.net/subsidy/feature` | — | `https://lsystem.let-inc.net/subsidy/feature/let` |
| 価格説明資料 | `https://lsystem.let-inc.net/subsidy/pricing` | `https://lsystem.let-inc.net/subsidy/pricing/tx` | `https://lsystem.let-inc.net/subsidy/pricing/let` |
| 申請価格理由書 | `https://lsystem.let-inc.net/subsidy/pricing/rationale` | — | `https://lsystem.let-inc.net/subsidy/pricing/rationale/let` |
| その他要件説明 | `https://lsystem.let-inc.net/subsidy/requirements` | — | `https://lsystem.let-inc.net/subsidy/requirements/let` |
| 適格請求書サンプル | `https://lsystem.let-inc.net/subsidy/invoice-sample` | — | `https://lsystem.let-inc.net/subsidy/invoice-sample/let` |
| デモ機・テストアカウント情報 | `https://lsystem.let-inc.net/subsidy/demo-info` | — | `https://lsystem.let-inc.net/subsidy/demo-info/let` |

### 電子取引Lシステム（電子取引類型・申請準備中）— 8 URL

ベースドメイン: `https://dlsystem.aigrowthx.pro`
⚠️ **Vercel への紐付けが未完了**（`docs/HANDOVER.md` §2 参照）。反映まで
`https://jyuhacchu-system.vercel.app` + パスで確認すること（LP は `/transact`）。

| 資料 | URL |
|---|---|
| サービスLP | `https://dlsystem.aigrowthx.pro/`（内部的に `/transact` へ rewrite） |
| 申請資料インデックス | `https://dlsystem.aigrowthx.pro/transact/subsidy` |
| 機能説明資料 | `https://dlsystem.aigrowthx.pro/transact/subsidy/feature` |
| 価格説明資料 | `https://dlsystem.aigrowthx.pro/transact/subsidy/pricing` |
| 申請価格理由書 | `https://dlsystem.aigrowthx.pro/transact/subsidy/pricing/rationale` |
| その他要件説明 | `https://dlsystem.aigrowthx.pro/transact/subsidy/requirements` |
| デモ機・テストアカウント情報 | `https://dlsystem.aigrowthx.pro/transact/subsidy/demo-info` |
| 適格請求書サンプル | `https://dlsystem.aigrowthx.pro/transact/subsidy/invoice-sample` |

### 共通（システム本体）

| 用途 | URL |
|---|---|
| ログイン | `https://jyuhacchu-system.vercel.app/auth/login` |
| 招待発行画面（発注側管理者・要ログイン） | `https://jyuhacchu-system.vercel.app/partners/invite` |
| 招待受諾ページ（公開） | `https://dlsystem.aigrowthx.pro/invite/[token]`（未紐付け時は `jyuhacchu-system.vercel.app/invite/[token]`） |

## テストアカウント（4種・共通パスワード `password123`）

| ロール | メールアドレス |
|---|---|
| 発注側 管理者 | `admin@sample-trading.co.jp` |
| 発注側 発注担当 | `tanaka@sample-trading.co.jp` |
| 受注側 管理者（電子取引L 招待受諾想定） | `admin@tanaka-service.co.jp` |
| 受注側 受注担当 | `suzuki@tanaka-service.co.jp` |

※ 受注側管理者ほか新デモデータは seed 反映待ちの場合あり（`docs/HANDOVER.md` §2）。

## 詳細ドキュメント

| ドキュメント | 内容 |
|---|---|
| `docs/HANDOVER.md` | 引き継ぎ詳細（現状・残作業・申請入力値・トラブルシューティング 全10節） |
| `docs/APPLICATION_PLAYBOOK.md` | 申請 Playbook（§8 不備対応履歴、§10 入力チェックリスト、§11 電子取引Lシステム） |
| `docs/ERROR_HISTORY.md` | 構築中エラーと解決策 |
| `docs/SYSTEM_SPEC.md` / `docs/DEPLOY_GUIDE.md` | システム仕様・デプロイ手順 |

## 運用ルール要点

1. **デプロイは git push のみ**。GitHub → Vercel 自動連携。`vercel deploy` は使用しない。
2. **申請資料の装飾は背景色に依存させない**（黒塗り反転＋黒太枠＋大型太字。審査員は背景グラフィック無効で印刷する）。
3. **「仮例示」表記は絶対 NG**。導入事例は実名 or「想定顧客」明記＋根拠ある数値。
4. **ソフトウェア価格の説明に保守サポート系文言を入れない**（カテゴリー7 混在と判定される）。
5. **ブランチ**: 開発は現行の claude ブランチ、`it-hojo` と同期運用。詳細は `docs/HANDOVER.md` §4。

---

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
