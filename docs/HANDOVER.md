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

### 1-2. 電子取引Lシステム（インボイス枠・電子取引類型）

| 項目 | 状態 |
|---|---|
| 申請状況 | **申請準備中**（コード実装は完了、ドメイン紐付けが未了） |
| 補助上限 | 350万円（補助率 中小企業 2/3） |
| 申請構成 | 開発メーカー・IT導入支援事業者ともに 株式会社LET |
| Pコード | 主: 共P-02 単独（業務プロセスと汎用プロセスは同時選択不可のため 汎P-07 は選択しない） |
| 公開ドメイン | `dlsystem.aigrowthx.pro`（**Vercel 紐付け未完了** → §2） |
| 資料 | `/transact/subsidy/*`（6書類＋インデックス＋LP） |
| 追加実装 | 招待型・受注側無償アカウント発行（Invitation モデル＋招待フロー） |

背景・全経緯は `docs/APPLICATION_PLAYBOOK.md` §11 を参照。

## 2. 残っている手動作業（Vercel ダッシュボード操作）

コードは push 済みだが、以下は **Vercel ダッシュボードでの手動操作** が必要（未実施）。

1. **`dlsystem.aigrowthx.pro` のドメイン紐付け**
   - Vercel → jyuhacchu-system プロジェクト → Settings → Domains → `dlsystem.aigrowthx.pro` を追加
   - `aigrowthx.pro` は Vercel 内で取得済みドメインのため **DNS 側の CNAME 設定は不要**
   - 追加すると SSL 自動発行 → `src/middleware.ts` の `DSYSTEM_HOST` ルーティングが即有効
2. **環境変数 `NEXT_PUBLIC_INVITE_ORIGIN` の設定**
   - Settings → Environment Variables に `NEXT_PUBLIC_INVITE_ORIGIN=https://dlsystem.aigrowthx.pro` を追加
   - `/partners/invite` で発行される招待URLが `https://dlsystem.aigrowthx.pro/invite/[token]` 形式になる
   - `NEXT_PUBLIC_*` はビルド時埋め込みのため **設定後に再デプロイが必要**
3. ~~**本番DBへのデモデータ投入（デモアカウント反映）**~~ ✅ **完了（2026-08-07）**
   - Neon Console SQL Editor で `prisma/demo-seed-neon.sql` を実行済み（確認クエリ `4 / 1 / 2 / 2` を確認）
   - 再投入が必要になった場合も同 SQL（冪等）または `DATABASE_URL="<Vercelからコピー>" npx prisma db seed` で安全に実行可能
4. **本番へのプロモート**
   - 最新コミット（`573b58d` 以降）が Production に反映されているか Deployments タブで確認
   - Production Branch 設定と現行開発ブランチが一致しない場合、対象デプロイを「Promote to Production」するか、Production Branch を付け替える（→ §4）

完了確認: `curl -I https://dlsystem.aigrowthx.pro/transact/subsidy` が HTTP 200 を返し、
招待発行画面の URL が `dlsystem.aigrowthx.pro` ドメインになっていれば完了。

## 3. 申請時の入力値（ITツール登録画面向け・電子取引Lシステム）

受発注Lシステム側の全入力値は `docs/APPLICATION_PLAYBOOK.md` §10 に記録済み。
以下は電子取引Lシステムの新規申請で使う値。

| 項目 | 入力値 |
|---|---|
| ITツール正式名称 | 電子取引Lシステム |
| 開発メーカー | 自社製品（株式会社LET） |
| IT導入支援事業者 | 株式会社LET |
| 申請枠・類型 | インボイス枠（**電子取引類型**）← 10-4 相当の設問で「電子取引類型での導入を希望する」に **チェックする** |
| 主Pコード | 共P-02（決済・債権債務・資金回収）**単独選択** |
| 副Pコード | 選択しない（申請フォーム上、業務プロセスと汎用プロセスの同時選択は不可。旧計画の 汎P-07 は 2026-08-07 に資料からも削除済み） |
| 標準販売価格（税抜） | 3,000,000円（月額 250,000円 × 12ヶ月＝標準プラン） |
| 最小販売価格（税抜） | 1,800,000円（月額 150,000円 × 12ヶ月＝最小プラン） |
| プラン構成 | 3プラン: 標準 300万円／ミドル 240万円（月額 200,000円）／最小 180万円（年・税抜）。機能差なし・招待企業数と月次取引件数の上限のみ段階設定。フォームの標準・最小販売価格はミドル追加後も不変 |
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

- トリガ: `main`・`claude/*` への push、`main` への PR
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
| `dlsystem.aigrowthx.pro` | 電子取引Lシステム（電子取引類型） | `/` → 未ログイン時 `/transact` rewrite（ログイン時はダッシュボード）／ `/transact/*` ／ `/invite/*` ／ **システム本体（`/auth/login`・ダッシュボード・API）を電子取引Lブランドで配信** ／ 法務ページ。`/lp`・`/subsidy` のみ本体ドメインへ 302 |
| `jyuhacchu-system.vercel.app` | システム本体・フォールバック | 全ルート（ダッシュボード・`/auth/login` 等、システム本体は要ログイン） |

定数: `src/middleware.ts` の `LSYSTEM_HOST` / `DSYSTEM_HOST` / `SYSTEM_FALLBACK_HOST`、`next.config.ts` の `MARKETING_HOST`。

**ホスト別ブランディング**（`src/lib/brand.ts`・2026-08-07 導入）:
システム本体（ログイン画面・サイドバー・タブタイトル・利用規約/プライバシー）は
リクエストホストで名称を切替（`dlsystem.*` → 電子取引Lシステム／それ以外 → 受発注Lシステム）。
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

## 10. 未着手・将来 TODO

### 短期（申請完了に直結）

- [x] 本番DBへのデモデータ投入（2026-08-07 完了・確認クエリ 4/1/2/2）
- [ ] §2 の残る手動作業3点（ドメイン紐付け・`NEXT_PUBLIC_INVITE_ORIGIN`・プロモート）
- [ ] `dlsystem.aigrowthx.pro` 全 8 URL の疎通確認と PDF 出力検証（A4・10MB以下）
- [ ] 電子取引Lシステムの ITツール登録申請をポータルから提出（§3 の入力値）
- [ ] Vercel の Production Branch 設定を現行ブランチ体制に合わせて整理（旧 `claude/create-marketing-materials-FirCs` が残っていないか）

### 中期（Playbook §9 より）

- [ ] 公式テンプレ（`ITツール登録における注意ポイント_機能説明資料.pdf` 等）との構成突き合わせ
- [ ] 実名導入事例の追加（想定顧客 → 契約締結済み実名 1〜2件）
- [ ] 開発工数（8人月／12百万円）の根拠資料を社内保管
- [ ] シードデータ変更後のスクリーンショット再撮影

### 長期（改善候補）

- [ ] 変数テンプレート化（`config/application.ts` へ集約、1ファイルでブランド差し替え）
- [ ] PDF 自動生成 CI（Playwright でマージごとにアーティファクト化）
- [ ] 画面キャプチャの Playwright 自動撮影
- [ ] プラン情報の DB 管理化・CMS 化・多言語対応
