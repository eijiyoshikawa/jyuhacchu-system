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

### 電子取引くん（電子取引類型・**旧「電子取引Lシステム」で不採択 → 改名して再申請準備中**）— 17 URL

ベースドメイン: `https://dlsystem.aigrowthx.pro`（✅ Vercel 紐付け済み・稼働中。ホスト名は旧名称由来だが継続使用）
不備通知が来たら通知文をそのまま Claude に貼ること（Playbook §8 の教訓と照合して対応）。

> ⚠️ **再申請前の最重要事項**: 価格説明資料の「導入事例・実績」は、登録要領 別紙1（1）2.⑥ および
> ITツール登録の手引き ❻ で **「過去の導入事例・実績」** と明記されている（手引きの書式例は
> 「20YY年MM月 導入社数3000社達成」「AA株式会社、BB会社」といった実在の実績）。
> 手引きには **「❸〜❼の項目で不備が頻発しています」** とも書かれている。
> 現行資料は導入事例を「（想定）」と明記しており、この要件を満たしていない。
> **名称変更だけでは同じ結果になる可能性が高い。** 詳細は `docs/APPLICATION_PLAYBOOK.md` §11-B。

開発メーカーは **株式会社LET 固定**。IT導入支援事業者だけが版によって変わる。
資料本文は同一コンポーネント（`_components/transact-*-document.tsx`）を共有しているため、
**不備対応の修正は片方に入れれば両版に反映される**（版ごとに書き分けないこと）。

| 資料 | LET版（申請済み・IT導入支援事業者 株式会社LET） | TX.企画版（IT導入支援事業者 株式会社TX.企画） |
|---|---|---|
| サービスLP | `https://dlsystem.aigrowthx.pro/`（内部的に `/transact` へ rewrite） | 同左（共通） |
| 申請資料インデックス | `https://dlsystem.aigrowthx.pro/transact/subsidy` | `https://dlsystem.aigrowthx.pro/transact/subsidy/tx` |
| 機能説明資料 | `https://dlsystem.aigrowthx.pro/transact/subsidy/feature` | `https://dlsystem.aigrowthx.pro/transact/subsidy/feature/tx` |
| 価格説明資料 | `https://dlsystem.aigrowthx.pro/transact/subsidy/pricing` | `https://dlsystem.aigrowthx.pro/transact/subsidy/pricing/tx` |
| 申請価格理由書 | `https://dlsystem.aigrowthx.pro/transact/subsidy/pricing/rationale` | `https://dlsystem.aigrowthx.pro/transact/subsidy/pricing/rationale/tx` |
| その他要件説明 | `https://dlsystem.aigrowthx.pro/transact/subsidy/requirements` | `https://dlsystem.aigrowthx.pro/transact/subsidy/requirements/tx` |
| デモ機・テストアカウント情報 | `https://dlsystem.aigrowthx.pro/transact/subsidy/demo-info` | `https://dlsystem.aigrowthx.pro/transact/subsidy/demo-info/tx` |
| 適格請求書サンプル | `https://dlsystem.aigrowthx.pro/transact/subsidy/invoice-sample` | `https://dlsystem.aigrowthx.pro/transact/subsidy/invoice-sample/tx` |
| 料金表（別添） | `https://dlsystem.aigrowthx.pro/transact/subsidy/price-list` | `https://dlsystem.aigrowthx.pro/transact/subsidy/price-list/tx` |

### 共通（システム本体）

⚠️ システム画面は**ホスト別ブランド表示**（`src/lib/brand.ts`）。電子取引くんの審査デモは
必ず `dlsystem.aigrowthx.pro` 側 URL を案内すること（`jyuhacchu-system.vercel.app` では
受発注Lシステム表記になり、ツール名混在で不備になる）。

| 用途 | 受発注Lシステム | 電子取引くん |
|---|---|---|
| ログイン | `https://jyuhacchu-system.vercel.app/auth/login` | `https://dlsystem.aigrowthx.pro/auth/login` |
| 招待発行画面（発注側管理者・要ログイン） | — | `https://dlsystem.aigrowthx.pro/partners/invite` |
| 招待受諾ページ（公開） | — | `https://dlsystem.aigrowthx.pro/invite/[token]` |

## テストアカウント（共通パスワード `password123`）

⚠️ **2つのITツールでデモアカウントを分離している**（同一システムの二重登録と見られないため）。
審査の案内では必ず該当ツールのアカウントを使うこと。

### 受発注Lシステム（登録済み）

| ロール | メールアドレス |
|---|---|
| 発注側 管理者 | `admin@sample-trading.co.jp` |
| 発注側 発注担当 | `tanaka@sample-trading.co.jp` |
| 受注側 管理者 | `admin@tanaka-service.co.jp` |
| 受注側 受注担当 | `suzuki@tanaka-service.co.jp` |

### 電子取引くん（再申請準備中）

デモ企業: 発注側 **株式会社アオバ産業** ／ 受注側 **ケヤキ工房株式会社**（いずれも架空）

| ロール | メールアドレス |
|---|---|
| 発注側 管理者 | `admin@aoba-sangyo.example.jp` |
| 発注側 発注担当 | `kimura@aoba-sangyo.example.jp` |
| 受注側 管理者（招待受諾済み） | `admin@keyaki-koubou.example.jp` |
| 受注側 受注担当 | `mori@keyaki-koubou.example.jp` |

サンプル発注書 `PO-20260422-0101` ／ サンプル請求書 `INV-20260630-0101` ／
招待中トークン `dk-pending-9a3f7c1e5d8b2046`

※ 本番DBへの投入は Neon SQL Editor で `prisma/denshi-kun-demo-seed-neon.sql` を実行する（冪等）。

## 連絡先メールアドレス（ツール別に分離）

| ツール | ドメイン |
|---|---|
| 受発注Lシステム | `@juhacchu-l.jp`（sales / support / billing / subsidy） |
| 電子取引くん | `@aigrowthx.pro`（sales / support / billing / transact） |

⚠️ **`@aigrowthx.pro` のメールボックスは申請前に必ず実際に受信できる状態にすること。**
事務局からの連絡がここに届く。

## 詳細ドキュメント

| ドキュメント | 内容 |
|---|---|
| `docs/HANDOVER.md` | 引き継ぎ詳細（現状・残作業・申請入力値・トラブルシューティング 全10節） |
| `docs/VENDOR_APPLICATION_GUIDE.md` | ベンダー向け ITツール登録 申請手順書（電子取引類型・画面別入力値/テンプレ/ハマりどころ） |
| `docs/APPLICATION_PLAYBOOK.md` | 申請 Playbook（§8 不備対応履歴、§10 入力チェックリスト、§11 電子取引くん） |
| `docs/ERROR_HISTORY.md` | 構築中エラーと解決策 |
| `docs/SYSTEM_SPEC.md` / `docs/DEPLOY_GUIDE.md` | システム仕様・デプロイ手順 |

## 運用ルール要点

1. **デプロイは git push のみ**。GitHub → Vercel 自動連携。`vercel deploy` は使用しない。
2. **申請資料の装飾は背景色に依存させない**（黒塗り反転＋黒太枠＋大型太字。審査員は背景グラフィック無効で印刷する）。
3. **「仮例示」表記は絶対 NG**。導入事例は実名 or「想定顧客」明記＋根拠ある数値。
4. **ソフトウェア価格の説明に保守サポート系文言を入れない**（カテゴリー7 混在と判定される）。
5. **ブランチ**: 開発は現行の claude ブランチ、`it-hojo`・`claude/create-marketing-materials-FirCs`（Vercel Production Branch）と同期運用。
   PR のマージ先（GitHub デフォルトブランチ）は `claude/construction-order-system-Ph84i`。auto-merge（CI 緑で自動マージ）有効。詳細は `docs/HANDOVER.md` §4。

---

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->
