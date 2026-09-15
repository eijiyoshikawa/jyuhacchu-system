# 引き継ぎドキュメント（HANDOVER）

新セッション・新担当者が本プロジェクトを引き継ぐための全網羅ドキュメント。
URL 一覧・テストアカウントの速報版は `AGENTS.md` 冒頭を参照（セッション起動時に自動読込される）。

最終更新: 2026-08-07 ／ 対象ブランチ: `claude/handoff-document-pending-swoy5k`

---

## 1. 現状把握（申請 2 系統の状態）

本リポジトリは **1つの Next.js アプリで 2つの ITツール登録申請** を運用している。

### 1-1. 受発注Lシステム（インボイス枠・インボイス対応類型）

| 項目 | 状態 |
|---|---|
| 申請状況 | **登録済み**（不備対応 計7回を経て） |
| 補助上限 | 50万円（1機能） |
| 申請構成 | TX.企画申請（開発メーカー: 株式会社LET ／ IT導入支援事業者: 株式会社TX.企画）＋ LET申請（`/let` バリアント） |
| Pコード | 主: 共P-02 単独（7回目の指摘で共P-03 副を削除） |
| 公開ドメイン | `lsystem.let-inc.net`（稼働中） |
| 資料 | `/subsidy/*`（TX.企画版）＋ `/subsidy/*/let`（LET版） |

### 1-2. 電子取引くん（インボイス枠・電子取引類型）

| 項目 | 状態 |
|---|---|
| 申請状況 | 🕒 **再申請提出済み・審査待ち（2026-09-09）**。旧「電子取引Lシステム」が 2026-08 に不採択（理由の記載なし）→ 名称を **「電子取引くん」** に変更し、価格改定・実績反映・ソフトウェア差別化を行って再提出。`it_tool_id = a51a4327-ddae-43c7-bbed-5e75292f4055`。全画面の提出値は `docs/VENDOR_APPLICATION_GUIDE.md` §8 |
| 不採択への対応 | ① 標準販売価格 300万→**240万円**（要領 2-3(1)9(ウ) 市場価格超過の疑いを解消）② 導入事例を「（想定）」から**実在の有償契約**（株式会社Cometa・最小プラン年額120万円・2026年9月締結）に差し替え ③ 受発注Lシステムとの**機能・UI・デモデータ・連絡先の実態分離**（招待/アカウント利用状況/電子取引アーカイブを電子取引くん専用化、配色・レイアウト・資料デザインを全面刷新） |
| 補助上限 | 350万円（補助率 中小企業 2/3） |
| 申請構成 | **LET版**（申請済み・IT導入支援事業者 株式会社LET）と **TX.企画版**（`/tx` バリアント・IT導入支援事業者 株式会社TX.企画）の 2 版。開発メーカーはどちらも 株式会社LET 固定 |
| Pコード | 主: 共P-02 単独（業務プロセスと汎用プロセスは同時選択不可のため 汎P-07 は選択しない。フォームで確認済み） |
| 公開ドメイン | `dlsystem.aigrowthx.pro`（✅ Vercel 紐付け済み・ホスト別ブランドでシステム本体も配信） |
| 資料 | LET版 `/transact/subsidy/*` ／ TX.企画版 `/transact/subsidy/*/tx`（各**7書類**＋インデックス。機能説明資料は全30ページ・Fig.1〜12 の画面画像入り）。**資料本文は `_components/transact-*-document.tsx` を両版で共有**し、IT導入支援事業者名のみ props で差し替えるため、不備対応の修正は 1 箇所で両版に反映される |
| 追加実装 | 招待型・受注側無償アカウント発行（Invitation モデル＋招待フロー） |
| 提出時の主な対応 | AI搭載=なし／プラン別アカウント発行上限（標準200社・ミドル100社・最小50社）を価格資料に明記／申告理由・要件説明等の入力文例は本書§3と会話ログ参照 |

**不備通知が来た場合**: 通知文を新セッションの Claude に貼り、`docs/APPLICATION_PLAYBOOK.md` §8
（過去7回の不備対応と教訓15項目）と照合して対応すること。資料修正 → PR → マージ →
**CLI デプロイ**（GitHub 自動連携は停止中。AGENTS.md 運用ルール1）→ PDF再出力 → 再提出。
⚠️ 別紙1(2)「資料内で前回からの修正箇所を明記すること」を必ず実施する。

背景・全経緯は `docs/APPLICATION_PLAYBOOK.md` §11 を参照。IT導入支援事業者バリアント（TX.企画版）の構成と追加手順は §11-A を参照。

## 2. 手動作業（すべて完了 — 2026-08-07）

1. ✅ **`dlsystem.aigrowthx.pro` のドメイン紐付け** — Vercel Domains に追加済み。
   `src/middleware.ts` の `DSYSTEM_HOST` ルーティングが有効（システム本体も電子取引Lブランドで配信）
2. ✅ **環境変数 `NEXT_PUBLIC_INVITE_ORIGIN`** — 設定・再デプロイ済み
3. ✅ **本番DBへのデモデータ投入** — Neon SQL Editor で `prisma/demo-seed-neon.sql` 実行済み
   （確認クエリ `4 / 1 / 2 / 2`）。動作確認時のテストデータ（取引先「あ」等）も削除済み。
   再投入が必要な場合は同 SQL（冪等）または `DATABASE_URL="..." npx prisma db seed`
4. ✅ **本番反映** — デフォルトブランチ（`claude/construction-order-system-Ph84i`）へのマージで
   Production デプロイが自動作成される運用を確認（`target: production`）。手動 Promote は不要

## 3. 申請時の入力値（ITツール登録画面向け・電子取引くん）

受発注Lシステム側の全入力値は `docs/APPLICATION_PLAYBOOK.md` §10 に記録済み。
以下は電子取引くんの新規申請で使う値。

| 項目 | 入力値 |
|---|---|
| ITツール正式名称 | 電子取引くん |
| 開発メーカー | 自社製品（株式会社LET） |
| IT導入支援事業者 | 株式会社LET |
| 申請枠・類型 | インボイス枠（**電子取引類型**）← 10-4 相当の設問で「電子取引類型での導入を希望する」に **チェックする** |
| 主Pコード | 共P-02（決済・債権債務・資金回収）**単独選択** |
| 副Pコード | 選択しない（申請フォーム上、業務プロセスと汎用プロセスの同時選択は不可。旧計画の 汎P-07 は 2026-08-07 に資料からも削除済み） |
| 標準販売価格（税抜） | 2,400,000円（月額 200,000円 × 12ヶ月＝標準プラン） |
| 最小販売価格（税抜） | 1,200,000円（月額 100,000円 × 12ヶ月＝最小プラン） |
| プラン構成 | 3プラン: 標準 240万円／ミドル 180万円（月額 150,000円）／最小 120万円（年・税抜）。機能差はなく上限のみ段階設定。**価格は `_components/denshi-plans.ts` を唯一の正とし、資料は全てそこから描画する** |
| WEB掲載用URL | `https://dlsystem.aigrowthx.pro/` |
| 参考URL | `https://dlsystem.aigrowthx.pro/transact/subsidy` |
| 価格設定の内訳 | 受発注L版（Playbook §10-2）をベースに、**保守サポート系文言を含めない**こと。「クラウドホスティング・SSL・日次バックアップは運用インフラとして内包（カテゴリー7 保守サポート役務は含まない）」を PDF と一字一句整合させる |
| 電子取引類型の要件説明 | 発注者・受注者双方が利用可能（招待型・受注側無償アカウント）／両社間で発注書・請求書を電子的に授受、を明記 |

### 添付 PDF の取得元（ブラウザ印刷 → A4・背景グラフィック ON）

| 添付枠 | 取得元 URL |
|---|---|
| 機能説明資料 | `/transact/subsidy/feature` |
| 価格説明資料 | `/transact/subsidy/pricing` |
| 申請価格理由書 | `/transact/subsidy/pricing/rationale` |
| その他要件説明資料 | `/transact/subsidy/requirements` |
| デモ機・テストアカウント情報 | `/transact/subsidy/demo-info` |
| インボイス説明資料 | `/transact/subsidy/invoice-sample` |

## 4. リポジトリ・ブランチ状況

| 項目 | 内容 |
|---|---|
| リポジトリ | `eijiyoshikawa/jyuhacchu-system` |
| 現行作業ブランチ | `claude/handoff-document-pending-swoy5k`（`origin/it-hojo` をマージ済みで全コミットを包含） |
| デフォルトブランチ（PR マージ先） | `claude/construction-order-system-Ph84i`（PR #1 のマージ先。やや古い状態のため最新 PR の取り込みで追従させる） |
| Vercel Production Branch | `claude/create-marketing-materials-FirCs`（`it-hojo` と同一コミットで同期運用） |
| 開発用ブランチ | `it-hojo`（並行運用。`git merge --ff-only` で同期を維持する運用） |
| マージ運用 | PR は CI グリーンを条件に auto-merge を有効化して取り込む |

⚠️ **本番デプロイの反映には注意**: PR をデフォルトブランチにマージしただけでは
Vercel Production Branch（`claude/create-marketing-materials-FirCs`）に反映されない。
最新内容を本番に出すには FirCs / `it-hojo` ブランチを同コミットまで進める（fast-forward）か、
Vercel の Production Branch 設定を付け替える。

### CI 構成（`.github/workflows/ci.yml`）

- トリガ（2026-09-15 変更）: デフォルトブランチ `claude/construction-order-system-Ph84i`（と `main`）への PR と push のみ。
  作業ブランチ（`claude/*`）への push では起動しない（GitHub フラグ再発防止・AGENTS.md 運用ルール6）。
  同一 ref の実行は `concurrency` で古い方を取り消し、各ジョブに `timeout-minutes` を設定
- ジョブ: `lint-and-typecheck`（ESLint + `tsc --noEmit`）→ `build`（PostgreSQL 16 サービスコンテナ + `prisma migrate deploy` + `next build`）→ `e2e`（Playwright/Chromium）
- Node 22 / npm ci / `prisma generate` 前提

### デプロイ

GitHub → Vercel 自動連携。**push するだけで本番反映**（数十秒〜数分）。
`vercel deploy` / `vercel link` / `vercel env pull` は非推奨・使用しない。
環境変数は Vercel ダッシュボード管理（`DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL`, `NTA_APP_ID`, `NEXT_PUBLIC_INVITE_ORIGIN` 等）。
例外: DB シード再投入のみローカルから `DATABASE_URL` を渡して実行（Playbook §3-5）。

## 5. アーキテクチャ概要

### 5-1. 3 ドメイン構成（`src/middleware.ts` + `next.config.ts` でホスト分岐）

| ドメイン | 用途 | 配信内容 |
|---|---|---|
| `lsystem.let-inc.net` | 受発注Lシステム（インボイス対応類型） | `/` → `/lp` rewrite ／ `/subsidy/*` ／ `/terms` ／ `/privacy`。対象外パスは `jyuhacchu-system.vercel.app` へ 302 |
| `dlsystem.aigrowthx.pro` | 電子取引くん（電子取引類型） | `/` → 未ログイン時 `/transact` rewrite（ログイン時はダッシュボード）／ `/transact/*` ／ `/invite/*` ／ **システム本体（`/auth/login`・ダッシュボード・API）を電子取引Lブランドで配信** ／ 法務ページ。`/lp`・`/subsidy` のみ本体ドメインへ 302 |
| `jyuhacchu-system.vercel.app` | システム本体・フォールバック | 全ルート（ダッシュボード・`/auth/login` 等、システム本体は要ログイン） |

定数: `src/middleware.ts` の `LSYSTEM_HOST` / `DSYSTEM_HOST` / `SYSTEM_FALLBACK_HOST`、`next.config.ts` の `MARKETING_HOST`。

**ホスト別ブランディング**（`src/lib/brand.ts`・2026-08-07 導入）:
システム本体（ログイン画面・サイドバー・タブタイトル・利用規約/プライバシー）は
リクエストホストで名称を切替（`dlsystem.*` → 電子取引くん／それ以外 → 受発注Lシステム）。
公開サイトのヘッダ/フッタは `(public)/_components/marketing-chrome.tsx` を
`lp`・`subsidy`（受発注L）／`transact`（電子取引L）の各セグメントレイアウトで適用。
**電子取引Lの審査デモは必ず `dlsystem.aigrowthx.pro` の URL で案内すること**
（`jyuhacchu-system.vercel.app` では受発注L表記になりツール名混在で不備になる）。

### 5-2. 技術スタック

Next.js 16（App Router）／ React 19 ／ TypeScript 5 ／ Tailwind CSS 4 ／
Prisma 5 + PostgreSQL 16（Neon 東京）／ NextAuth.js v5（JWT + bcryptjs）／ Zod 4 ／
Vercel（hnd1）／ Sentry ／ GitHub Actions ／ Playwright。

### 5-3. Prisma モデル（`prisma/schema.prisma`）

`Company` / `User` / `Project` / `PurchaseOrder` / `PurchaseOrderItem` /
`Invoice` / `InvoiceItem` / `ApprovalFlow` / `ApprovalStep` / `Invitation` / `AuditLog`。
enum: `UserRole`, `CompanyType`, `ProjectStatus`, `OrderStatus`, `InvoiceStatus`,
`ApprovalTargetType`, `ApprovalStatus`, `InvitationStatus`（PENDING/ACCEPTED/REVOKED/EXPIRED）。

### 5-4. 招待フロー（電子取引類型の必須要件）

1. 発注側管理者が `/partners/invite`（要ログイン）で招待を発行 → `POST /api/invitations`
2. 招待URL `{NEXT_PUBLIC_INVITE_ORIGIN}/invite/[token]` を受注側へ送付
3. 受注側が公開ページ `/invite/[token]` で受諾 → `POST /api/invitations/[token]/accept`
4. 受注側の Company・User が **無償で** 作成される（課金なし）
5. 以後、両社間で Order／Invoice を電子的に授受（電帳法: 確定時 SHA-256＋タイムスタンプ、検索3項目対応）

API: `/api/invitations`（GET一覧・POST発行）、`/api/invitations/[token]`（GET公開・DELETE取消）、`/api/invitations/[token]/accept`（POST公開）。

## 6. テストアカウント一覧

すべてパスワード `password123`（`prisma/seed.ts` で投入。審査用の簡易パスワード）。

| ロール | メール | 用途 |
|---|---|---|
| 発注側 管理者 | `admin@sample-trading.co.jp` | 全機能・ユーザー管理・監査ログ・**取引先招待発行** |
| 発注側 発注担当 | `tanaka@sample-trading.co.jp` | 発注書作成・承認フロー確認 |
| 受注側 管理者 | `admin@tanaka-service.co.jp` | **招待受諾で作成された想定の無償アカウント**（電子取引類型の審査確認用） |
| 受注側 受注担当 | `suzuki@tanaka-service.co.jp` | 受注側視点・請求書作成/提出 |

シードには上記4アカウントに加え、審査書類（`/transact/subsidy/demo-info`）記載どおりの
サンプル発注書（`PO-20260407-0001`）・サンプル請求書（`INV-20260428-0001`・電帳法タイムスタンプ付き）・
招待レコード（ACCEPTED 1件・PENDING 1件）が含まれる。
seed は**冪等（upsert）**なので、稼働中DBへ `migrate reset` なしで安全に再投入できる:

```bash
DATABASE_URL="<VercelダッシュボードからコピーしたNeon接続文字列>" npx prisma db seed
```

ログイン: 受発注L審査用 `https://jyuhacchu-system.vercel.app/auth/login` ／
電子取引L審査用 `https://dlsystem.aigrowthx.pro/auth/login`（ホスト別ブランド表示のため使い分け必須）。
審査提出用のまとめページは `/subsidy/demo-info`（TX.企画版）・`/subsidy/demo-info/let`（LET版）・`/transact/subsidy/demo-info`（電子取引L版）。

## 7. 過去の不備対応履歴（全7回まとめ）

詳細は `docs/APPLICATION_PLAYBOOK.md` §8（教訓15項目を含む）。要点のみ:

| 回 | 申請 | 指摘概要 | 対応の要点 | コミット |
|---|---|---|---|---|
| 1 | TX.企画 | ツール名・メーカー名・業務フロー図・利用方法・類似比較の5項目が「確認できない」 | 識別情報ボックス、§4 フロー図、§5 利用方法、比較表を追加 | `d7cd6f9` |
| 2 | TX.企画 | 1回目対応が不十分（6項目）。背景色欠落・HTMLリストが図と認識されず | 黒塗り表紙、SVG フローチャート、実名導入事例、カテゴリー7 文言削除 | `302d96a` |
| 3 | TX.企画 | 再々「確認できない」（4項目）。構造が審査手順に非最適 | 目次＋章扉ページ、毎ページ右上の識別ヘッダ、比較表を実在10製品名＋提供企業名に | `8b69f6e` |
| 4 | TX.企画 | 受発注機能の明示不足・「取引年月日」不在 | 「受発注機能を有します」専用ページ、取引年月日フィールド＋カラム＋チェックリスト表 | `14a1521` |
| 5 | LET | 選択Pコードに該当する機能がページから確認できない | Pコード対応ページマップ専用ページ＋各節にマーカーバッジ（黄=共P-02／青=共P-03） | `8437940` |
| 6 | LET | 類似比較（再々）・カテゴリー7 整合・「取引内容」不在・デモ機情報 | 章扉＋目次、入力欄文言の統一指示、「取引内容（品名／仕様）」統合ヘッダ、`/subsidy/demo-info` 新設 | `c9c384d` |
| 7 | LET | 副Pコード 共P-03 の削除指摘 | 主Pコード=共P-02 の単独申請に統一（資料側の共P-03 記載を削除） | `5257328` |

**新しい不備が来たらまず §8 の教訓と照合すること**（背景色依存NG／「仮例示」NG／
具体製品名必須／目次・章扉必須／入力欄と PDF の文言一致、など再発パターンが多い）。

## 8. 運用ルール

1. **デプロイは git push のみ**。Vercel 自動連携。`vercel deploy` 禁止。反映確認は Deployments タブか `curl -I`。
2. **申請資料の装飾は印刷耐性デザイン**: 黒塗り反転＋2px黒枠＋大型太字。背景色のみの装飾は審査員の印刷設定で消える。
3. **導入事例に「仮例示」と書かない**。実名 or「想定顧客」明記＋根拠ある数値。
4. **ソフトウェア価格説明に保守・サポート系文言を入れない**（カテゴリー7 混在判定）。ポータル入力欄と PDF の文言を一致させる。
5. **重要セクションは `page-break-before` で独立ページ化**し、章扉＋黒帯見出しを付ける。
6. **ブランチ同期**: 作業ブランチと `it-hojo` を `--ff-only` マージで同期。CI グリーンを確認してから push/マージ。
7. **PDF は A4・背景グラフィック ON で出力**、10MB 以下を厳守（付録A参照）。
8. **無料プラン制限に注意**: Vercel（帯域100GB/月）、Neon（コンピュート190h/月）、Sentry（5,000件/月）。

## 9. トラブルシューティング

### 9-0. デプロイしたのに本番に反映されない（2026-09-04 発生）

**症状**: `vercel deploy --prod --yes` が `✓ Ready` で終わるのに、
`dlsystem.aigrowthx.pro` / `lsystem.let-inc.net` が古い内容を配信し続ける。

**原因**: `vercel deploy --prod` はデプロイを作るだけで、カスタムドメインを張り替えない。
Vercel の Production Branch が `claude/create-marketing-materials-FirCs` のままのため、
別ブランチからの CLI デプロイでは本番ドメインが自動割当されない。
CLI の出力で `▲ Aliased` にカスタムドメインが出ていなければ未反映。

**対処**: `vercel promote <Production URL>` を実行する。

```
vercel promote jyuhacchu-system-xxxxxxxxx-eijiyoshikawas-projects.vercel.app
```

`vercel alias set ... dlsystem.aigrowthx.pro` は
「You don't have access to the domain」で失敗するため使わない
（apex `aigrowthx.pro` がチームのドメイン一覧に無い）。promote なら3ドメインとも張り替わる。

**確認方法**: 配信中のビルドは HTML の `data-dpl-id` 属性で分かる。
手軽な判別としては `curl -s https://dlsystem.aigrowthx.pro/robots.txt` に
`Disallow: /invite/` が含まれていれば PR #15 以降のビルド。

**恒久対策**: Vercel ダッシュボード → Settings → Git → Production Branch を
`claude/construction-order-system-Ph84i`（GitHub デフォルトブランチ）に変更すると、
`vercel deploy --prod` だけで本番ドメインが張り替わるようになる。


### 9-1. カスタムドメインで 404 / 意図しないリダイレクト

- ホスト分岐は `src/middleware.ts`（`LSYSTEM_HOST`/`DSYSTEM_HOST` の許可パスリスト）と `next.config.ts` の rewrites が担う。新ページを追加したら **許可パスリストへの追記漏れ** を疑う
- `dlsystem.aigrowthx.pro` が丸ごと 404/未解決の場合は Vercel Domains 未紐付け（→ §2）
- カスタムドメインの対象外パスは仕様として `jyuhacchu-system.vercel.app` へ 302 される（バグではない）
- `/transact/subsidy` は LP から意図的にリンクしていない（`573b58d`）。直リンクでアクセスする

### 9-2. DB unreachable（Prisma が Neon に接続できない）

- `DATABASE_URL` から **`channel_binding=require` を削除**する必要あり（Prisma 5 非対応）
- Neon 無料プランはアイドルでコンピュートが自動サスペンドされる → 初回アクセスの数秒遅延・タイムアウトは再試行で解消
- シード再投入は `DATABASE_URL="<Vercelからコピー>" npx prisma db seed`（Playbook §3-5 例外運用）

### 9-3. E2E（Playwright）strict mode violation

- 同一テキスト・ロールの要素が複数ヒットすると `locator resolved to N elements` で失敗する
- 対処は **`.first()` の付与** か、より特定的なロケータへの変更（先例: `d904511`）
- バリアントページ（`/let`, `/tx`）追加で同名見出しが増えたときに再発しやすい

その他の既知エラー（Prisma v7 非互換 → v5 固定、Google Fonts ビルド失敗 → システムフォント等)は `docs/ERROR_HISTORY.md` を参照。

## 10. 現在の状態（2026-09-09 提出完了）

### A. 完了したこと

- [x] **ITツール登録申請を提出**（2026-09-09・IT事業者ポータル）
      `it_tool_id = a51a4327-ddae-43c7-bbed-5e75292f4055`
      全画面の提出値は `docs/VENDOR_APPLICATION_GUIDE.md` §8 に記録済み
- [x] 旧「電子取引Lシステム」からの改名（電子取引くん）
- [x] 標準販売価格の引き下げ（300万 → 240万円）／3プラン構成（240/180/120万円）
- [x] 導入事例を実績ベースに刷新（株式会社Cometa・最小プラン年額120万円・2026年9月 有償契約締結）
- [x] 受発注Lシステムとの分離（デモデータ・アカウント・連絡先・機能構成・配色・資料デザイン）
- [x] 料金表の別添を追加（手引き ❼ 対応）
- [x] 機能説明資料 30ページ化・プラン名／AI搭載有無を追加（別紙1 No.2・No.5 の未充足を解消）
- [x] 本番DBへの SQL 実行（Neon SQL Editor・2本とも実行済み）
- [x] `@aigrowthx.pro` メールボックス開設（ImprovMX catch-all → Gmail 転送・受信確認済み）
- [x] 本番デプロイ（`dlsystem.aigrowthx.pro` が最新ビルドを配信中）

### B. 不備対応中（2026-09-10 通知・2項目）

2026-09-10 に不備通知（①標準販売価格の適正性が確認できない → 申請価格理由書を「その他説明資料」に添付し備考欄に記載、
②デモ機でログインできない）。原因と対応は `docs/APPLICATION_PLAYBOOK.md` §8-8、再提出手順は
`docs/VENDOR_APPLICATION_GUIDE.md` §8-11。**ユーザー側の残作業: Neon で修復SQL実行 → ログイン確認 →
PRマージ → CLIデプロイ → `/transact/subsidy/attachments` をPDF化 → 再提出（備考欄テンプレH）。**
Vercel 環境変数 `NEXTAUTH_URL`（`AUTH_URL`）は削除推奨（ログアウト先が本体ドメインになる原因）。

以下は通知前の記述（参考）。審査は概ね1〜3週間で回転する。

不備通知が来たら **通知文を全文そのまま Claude に貼る**こと。
`docs/APPLICATION_PLAYBOOK.md` §8（過去7回の不備対応・教訓）および §11-B と照合して対応する。
⚠️ 別紙1(2)「**資料内で前回からの修正箇所を明記すること**」を必ず実施する
（過去4回の不備対応でこれを怠っていた）。

修正 → PR → マージ の後、**本番反映には CLI デプロイが必要**（AGENTS.md 運用ルール1）。
PDFを再出力して再提出する。

### B-2. 次の登録計画（生成AIツール・通常枠）— 2026-09-10 着手

会計freee（登録済み・共P-01）と組み合わせ、他社製の生成AIツール（まず Claude Team）を
通常枠向けに登録する。計画・画面別入力値・価格設計・役務（導入コンサルティング／導入研修）の
相場・未決事項は **`docs/AI_TOOLS_REGISTRATION_PLAN.md`**。資料は
`/ai-tools/claude/subsidy/*`（LET版）と `/ai-tools/claude/subsidy/*/tx`（TX.企画版）。
未決事項（同書 §8: プラン・名義・換算レート・導入事例・登録画面の分岐）の回答後に、
画面キャプチャ配置 → 導入事例記入 → PR → CLI デプロイ → PDF出力 → 登録の順で進める。

### C. 保留中（申請には影響しない）

- [x] **GitHub 連携の復旧** — 2026-09-15 にフラグ解除。再発防止策（push 頻度フック・CI トリガ縮小・週次監視 Routine）は AGENTS.md 運用ルール6
- [ ] **Vercel の Production Branch 変更** — Vercel → Settings → Git で `claude/construction-order-system-Ph84i` に変更し、
      PR マージで `dlsystem.aigrowthx.pro` が自動更新されることを 1 回確認する。確認できるまで本番反映は CLI 手順

### D. 登録完了後

交付申請フェーズへ移行する。導入企業側に GビズID・SECURITY ACTION・みらデジ経営チェックが必要。

### E. 申請フォーム入力値（サマリ）

| 項目 | 値 |
|---|---|
| ITツール名 | 電子取引くん |
| 申請区分・類型 | インボイス枠／電子取引類型 |
| 標準販売価格（税抜） | `2400000` |
| 最小販売価格（税抜） | `1200000` |
| プロセス | 共P-02 単独 |
| AI搭載 | なし |
| 自社が顧客へ導入した会社数 | `1` |
| 販売開始日 | `2026/04/20` |
| 機能説明資料の総ページ数 | 30ページ |
| 業務フロー図の該当ページ | P.25〜26 |
| Fig.11 アカウント利用状況 / Fig.12 電子取引アーカイブ | P.23 / P.24 |
| 添付ファイル | 計6点（画面4に3点・画面5に1点・画面7に3点／価格説明資料は重複利用） |

全文テンプレと画面別の詳細は `docs/VENDOR_APPLICATION_GUIDE.md` §2〜§8。

## 11. `@aigrowthx.pro` メールボックス開設手順

⚠️ **Vercel はメールサーバーを提供していない。** Vercel でできるのは DNS レコードの管理だけ。
メール事業者を別途契約し、そこへ向ける MX レコードを Vercel の DNS に追加する、という2段構え。

### 11-0. ドメインを持っているチームを特定する

Vercel アカウントにはチームが2つある。

| チーム | slug |
|---|---|
| LET | `let-9aa5c48c` |
| eijiyoshikawa's projects | `eijiyoshikawas-projects` |

`dlsystem.aigrowthx.pro` は `eijiyoshikawas-projects` の `jyuhacchu-system` プロジェクトに
付いているが、**apex の `aigrowthx.pro` は別チームで管理されている可能性が高い**
（`vercel alias set ... dlsystem.aigrowthx.pro` が "You don't have access to the domain" で
失敗するため）。ダッシュボードでチームを切り替え、Domains タブに `aigrowthx.pro` が
現れる方で DNS 作業を行う。

### 11-1. メール事業者の選択

| | ImprovMX（推奨） | Google Workspace |
|---|---|---|
| 費用 | 無料 | 約¥1,000/月〜（1ユーザー） |
| 機能 | 受信のみ（Gmail へ転送） | 送受信（当該アドレスから返信可） |
| 所要時間 | 約10分 | 約30分 |
| 4アドレス | catch-all `*` で一括 | 1ユーザー＋エイリアス3つ（無料） |

**申請提出の要件は「届くこと」なので ImprovMX で足りる。** 返信が必要になったら
MX レコードを差し替えるだけで Google Workspace へ移行できる。両方を同時には設定できない。

### 11-2. ImprovMX 側

improvmx.com でドメイン `aigrowthx.pro` を登録し、エイリアスを `*`（catch-all）、
転送先を運用中の受信可能なアドレスにする。catch-all にしておけば
`sales@` `support@` `billing@` `transact@` を含め取りこぼしがない。

### 11-3. Vercel DNS へのレコード追加

ダッシュボード → 該当チーム → **Domains** → `aigrowthx.pro` → **DNS Records** → **Add**。

| Type | Name | Value | Priority |
|---|---|---|---|
| MX | （空欄） | `mx1.improvmx.com` | `10` |
| MX | （空欄） | `mx2.improvmx.com` | `20` |
| TXT | （空欄） | `v=spf1 include:spf.improvmx.com ~all` | — |

- **Name は空欄のまま**にする。空欄が apex を意味する。`@` や `aigrowthx.pro` と
  入力すると `@.aigrowthx.pro` のような誤ったレコードになることがある。
- ⚠️ **既存レコードを消さない・編集しない。** 特に `dlsystem` の A / CNAME に触ると
  本番サイトが落ちる。今回は追加のみ。
- ⚠️ SPF（`v=spf1` で始まる TXT）が既にある場合は新規追加せず、既存のものに
  `include:spf.improvmx.com` を書き足す。**SPF はドメインに1つまで**で、
  2つあると両方が無効になる。

### 11-4. 反映確認

DNS 反映は通常5〜30分。ImprovMX の管理画面が緑（MX records are valid）になれば成功。

コマンドで確認する場合（macOS 標準）:

```
dig +short MX aigrowthx.pro
```

`10 mx1.improvmx.com.` `20 mx2.improvmx.com.` の2行が返れば OK。

**最終確認は実送信で行う。** 4アドレスすべてに1通ずつ送り、転送先に届くことを確認する。
これが通れば申請提出のブロッカーは解消。

⚠️ **転送先の Gmail アカウント自身から送ってはいけない（2026-09-09 に実際にハマった）。**
`eiji.yoshikawa@let-inc.net` は `eiyoshi99@gmail.com` の「他のアドレスから送信」エイリアス
であるため、そこから `transact@aigrowthx.pro` に送ると **送信元と転送先が同一アカウント**になる。
Gmail は自分が送ったメールが返ってきた場合に重複排除するため、転送されたコピーは
**受信トレイに現れず SENT ラベルだけが付く**（迷惑メールでもなく、転送失敗でもない）。
`in:anywhere aigrowthx.pro` で検索すると SENT のみのメールが1通見つかり、これが証拠になる。
**テストは必ず別のメールボックス**（同僚のアドレス、スマホのキャリアメール等）から行う。
事務局からのメールは外部送信なのでこの事象には該当しない。

転送が生きているかどうかは、以下のどれかで判断できる。

- ImprovMX のドメイン詳細ページが 🟢 **Active**（ドメイン一覧側のバッジは古いまま赤く残ることがある。要リロード）
- Logs タブに `DELIVERED` と Gmail の `2.0.0 OK ... gsmtp` 応答が出ている
- ImprovMX から「Forwarding active for aigrowthx.pro」通知メールが届いている

**Gmail 側のフィルタも確認すること。** 上記の ImprovMX 通知2通が未読のままゴミ箱に入っていた。
「削除する」動作のフィルタがあると事務局からの連絡を取り逃す。
設定 → フィルタとブロック中のアドレス を確認し、To に `aigrowthx.pro` を含むメールへ
「迷惑メールにしない」＋ラベル付与のフィルタを作っておく。

### 11-5. Google Workspace を選ぶ場合の差分

11-2・11-3 のみ変わる。主アドレスを `sales@aigrowthx.pro` として1ユーザー契約し、
`support@` `billing@` `transact@` を管理コンソールでエイリアス登録（追加料金なし・最大30個）。
DNS は Google の管理画面が表示する値をそのまま入れる。現行の推奨は以下。

| Type | Name | Value | Priority |
|---|---|---|---|
| MX | （空欄） | `smtp.google.com` | `1` |
| TXT | （空欄） | `v=spf1 include:_spf.google.com ~all` | — |
| TXT | （空欄） | Google が表示する `google-site-verification=` で始まる文字列 | — |

古い形式（`aspmx.l.google.com` など5本）が表示された場合は画面の指示に従う。
