# HANDOVER — 次セッション引き継ぎ資料

**最終更新**: 2026-08-07 / **セッション**: 電子取引Lシステム 追加＋ドメイン分離＋CI緑化

---

## 1. 現在の状況（ワンショット把握）

### 進行中の申請案件

| 系統 | 類型 | 補助上限 | 補助率 | 状態 |
|---|---|---|---|---|
| ① 受発注Lシステム | インボイス対応類型 | 50 万円（1機能） | 3/4 | 既存申請中 |
| ② 電子取引Lシステム | 電子取引類型 | **350 万円** | 中小 2/3 | **今セッションで新規追加**、Vercel デプロイ後に登録申請 |

### 直近セッションで完了したこと（PR #1 マージ済み）
- `Invitation` モデル＋招待型アカウント発行機能一式
- 電子取引Lシステム 用の LP `/transact` と申請資料 6 種を `/transact/subsidy` 配下に配置
- ドメイン分離: `dlsystem.aigrowthx.pro`（電子取引L 専用）を追加、middleware で 3 ドメイン振り分け
- `/transact/subsidy` を LP から到達不能化＋ noindex + robots.txt で検索除外（審査員は URL 直打ちのみ）
- CI lint／build／e2e を全て緑化
- ドキュメント（APPLICATION_PLAYBOOK.md §11 追記）

---

## 2. 残っている手動作業（Vercel 側／ユーザー実施）

### 🔴 必須：`dlsystem.aigrowthx.pro` のドメイン紐付け

1. Vercel Dashboard → **jyuhacchu-system** プロジェクト → **Settings → Domains**
2. `dlsystem.aigrowthx.pro` を追加（`aigrowthx.pro` は Vercel 取得ドメインのため DNS 設定不要）
3. Vercel が自動で SSL 発行

### 🟡 推奨：招待URL のブランド化

1. Vercel Dashboard → **Settings → Environment Variables**
2. `NEXT_PUBLIC_INVITE_ORIGIN` = `https://dlsystem.aigrowthx.pro`
3. Environments: Production / Preview / Development
4. 設定後、`/partners/invite` で発行される招待URLが `https://dlsystem.aigrowthx.pro/invite/[token]` 形式になる

### 🟢 デプロイ反映

Vercel の Production Branch は `claude/create-marketing-materials-FirCs`。GitHub auto-merge 有効化済みで、PR マージ後は自動でプレビューデプロイが作成される。

**過去の運用**: プレビュー → 手動で「Promote to Production」が必要だった。
**現在**: auto-merge が有効化されたので、マージされたコミットは自動でプロダクション反映される見込み（要確認）。

---

## 3. IT 導入補助金 電子取引類型 での申請時の値

### ITツール登録画面に入力する値

| 項目 | 値 |
|---|---|
| ITツール正式名称 | 電子取引Lシステム |
| 開発メーカー名 | 株式会社LET |
| IT導入支援事業者名 | 株式会社LET |
| 申請枠・類型 | インボイス枠（電子取引類型） |
| 補助上限額 | 350 万円 |
| 補助率 | 中小企業 2/3 ／ 小規模事業者 1/2 |
| 主Pコード | 共P-02（決済・債権債務・資金回収） |
| 副Pコード | 汎P-07（グループウェア／コラボレーション） |
| 標準販売価格 | 月額 250,000 円 ／ 年額 3,000,000 円 |
| 最小販売価格 | 月額 150,000 円 ／ 年額 1,800,000 円 |
| 初期費用 | なし |
| 契約期間 | 月額（最短）／年額（10% OFF） |

### 添付書類の URL（全 6 点）

**セッション開始時に AGENTS.md に表示される URL 一覧を利用してください。**

---

## 4. リポジトリ・ブランチ状況

- **リポジトリ**: `eijiyoshikawa/jyuhacchu-system`
- **デフォルトブランチ**: `claude/construction-order-system-Ph84i`
- **開発ブランチ（Vercel Production Branch）**: `claude/create-marketing-materials-FirCs`
- **サブブランチ**: `it-hojo`（両ブランチ同期プッシュ運用）
- **auto-merge**: 有効化済み（squash マージ）
- **CI**: `.github/workflows/ci.yml` — lint-and-typecheck → build → e2e の 3 ジョブ

---

## 5. アーキテクチャ概要

### ドメイン構成（middleware.ts）

| ドメイン | 用途 | ルート挙動 |
|---|---|---|
| `lsystem.let-inc.net` | 受発注Lシステム LP／申請資料 | `/` → `/lp` rewrite ／ `/subsidy/*` ／ 法務 |
| `dlsystem.aigrowthx.pro` | 電子取引Lシステム LP／招待受諾 | `/` → `/transact` rewrite ／ `/transact/*` ／ `/invite/*` ／ `/api/invitations/*` ／ 法務 |
| `jyuhacchu-system.vercel.app` | システム本体（フォールバック） | 全ルート |

各カスタムドメインで対象外パスは本体ドメインへ 302 リダイレクト。

### 主要データモデル（Prisma）
- `Company` — 会社（発注側 CONTRACTOR / 受注側 SUBCONTRACTOR）
- `User` — ロールベース（ADMIN / CONTRACTOR / SUBCONTRACTOR）
- `Invitation` — 招待型アカウント発行（PENDING / ACCEPTED / REVOKED / EXPIRED）
- `Project` / `Order` / `Invoice` / `ApprovalFlow` / `AuditLog`

### 招待フロー
1. 発注側 ADMIN → `/partners/invite` から取引先を招待発行
2. crypto.randomBytes(24) の URL トークン、30 日有効期限
3. 受注側企業が招待 URL から `/invite/[token]` で会社情報・管理者情報を入力
4. `POST /api/invitations/[token]/accept` で Company + User を同時作成（受注側は費用ゼロ）
5. 以降、両社間で電子取引データを授受可能

---

## 6. テストアカウント（審査確認用・シード）

| ロール | Email | Password |
|---|---|---|
| 発注側 ADMIN | admin@sample-trading.co.jp | password123 |
| 発注側 CONTRACTOR | tanaka@sample-trading.co.jp | password123 |
| 受注側 SUBCONTRACTOR | suzuki@tanaka-service.co.jp | password123 |

シードは `prisma/seed.ts` に定義。本番 DB へのシード投入は
`cp .env.production.local .env && npx prisma migrate reset --force` で実行済み。

---

## 7. 過去の不備対応履歴（要点のみ）

`docs/APPLICATION_PLAYBOOK.md §8` に詳細。

| 回 | 主な指摘 | 対応 |
|---|---|---|
| 1 | 機能説明が抽象的 | セクション再構成 |
| 2 | 業務フロー図が不足 | SVG 業務フロー図追加 |
| 3 | 目次・章扉が無く読みにくい | 目次・章扉ページ追加、比較表を具体製品名 8-10 件に |
| 4 | 受発注機能の明示が不足／取引年月日 | 「受発注機能有」専用ページ追加、取引年月日カラム独立 |
| 5 | Pコード対応ページが不明 | Pコード対応マップ＋マーカーバッジ配置 |
| 6 | カテゴリー7 混在 | 「保守サポート」等の言及を全削除、カテゴリー1肯定形 |
| 7 | 共P-03（デモで確認できない） | 共P-03 削除、共P-02 単独申請に統一 |
| —（今回） | 電子取引類型 で 150万円以上 を狙う | 別ツール「電子取引Lシステム」新設 |

---

## 8. 運用ルール

- **デプロイ**: `git push` → Vercel 自動デプロイ。ターミナルからの `vercel *` は使わない
- **開発ブランチ**: `claude/create-marketing-materials-FirCs` と `it-hojo` の両方に push（両ブランチ同期）
- **PR**: `claude/create-marketing-materials-FirCs` → `claude/construction-order-system-Ph84i` へマージ。auto-merge 有効
- **DB 操作**: `.env` に `.env.production.local` をコピーしてから Prisma コマンド実行
- **カスタムドメイン**: DNS 設定は `let-inc.net` 側のみ（`aigrowthx.pro` は Vercel 内で完結）

---

## 9. トラブルシューティング

### 404 が出る場合
1. Vercel Dashboard で最新デプロイの `target` を確認（`production` か `preview` か）
2. `preview` なら Vercel Dashboard で「Promote to Production」する
3. auto-merge 有効化後は自動反映されるはず

### DB unreachable エラー（CI/デプロイ時）
- Neon（PostgreSQL）が cold start する場合の一時エラー
- 自動リトライで解消することが多い
- 頻発する場合は Neon 側の設定を確認

### Playwright E2E strict mode violation
- レスポンシブ実装で同要素が desktop/mobile 両方に描画されている
- `.first()` を locator に付ける

---

## 10. 未着手・将来 TODO

- [ ] 電子取引Lシステム の IT導入補助金ポータルへの登録申請（Vercel ドメイン紐付け完了後）
- [ ] CSV による一括招待機能（現状は個別のみ）
- [ ] 招待メール自動送信（現状は URL をコピーして手動送付）
- [ ] E2E テストの網羅範囲拡大（招待フロー、`/transact/*` の表示確認）
- [ ] 受発注Lシステム の TX.企画 と LET 版のバリアント切替を環境変数で一元化（現状は別ページ）
