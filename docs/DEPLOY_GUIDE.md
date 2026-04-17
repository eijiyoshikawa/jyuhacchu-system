# 受発注Lシステム - デプロイ手順書

## 概要

受発注Lシステムの本番環境を構築する手順です。全て無料プランで運用可能です。

| サービス | 用途 | プラン |
|---------|------|--------|
| Neon PostgreSQL | データベース | Free（0.5GB、自動バックアップ） |
| Vercel | ホスティング | Hobby（SSL自動、CDN付き） |
| Sentry | エラー監視 | Free（月5,000エラー） |
| GitHub Actions | CI/CD | Free（プライベートリポ: 2,000分/月） |

---

## Step 1: Neon PostgreSQL セットアップ（5分）

1. https://neon.tech にアクセス → **Sign Up**（GitHub連携推奨）
2. **Create Project** をクリック
   - Project name: `juhacchu-l-system`
   - Region: **Asia Pacific (Tokyo)** を選択（利用可能な場合）
   - PostgreSQL version: `16`
3. 作成完了後、**Connection Details** から接続URLをコピー
4. **重要**: 接続URLから `channel_binding=require` パラメータを**削除**する

```
# OK（使用する形式）
postgresql://username:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require

# NG（Prismaと互換性なし）
postgresql://username:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require
```

この接続URLを控えておく（Step 2で使用）。

---

## Step 2: Vercel デプロイ（10分）

1. https://vercel.com にアクセス → **Sign Up**（GitHub連携）
2. **Add New → Project** をクリック
3. **Import Git Repository** からリポジトリを選択
4. **Configure Project**:
   - **Framework Preset**: Next.js（自動検出）
   - **Root Directory**: `./`（デフォルト）
   - **Build Command**: 自動設定（vercel.json で定義済み）

5. **Environment Variables** を設定（**重要**）:

   | 変数名 | 必須 | 値 |
   |--------|------|-----|
   | `DATABASE_URL` | Yes | Step 1でコピーしたNeonの接続URL（channel_bindingなし） |
   | `NEXTAUTH_SECRET` | Yes | `openssl rand -base64 32` で生成した値 |
   | `NEXTAUTH_URL` | Yes | `https://your-project.vercel.app`（デプロイ後に更新） |
   | `NTA_APP_ID` | No | 国税庁API アプリケーションID（後述） |

   **NEXTAUTH_SECRET の生成方法**（ターミナルで実行）:
   ```bash
   openssl rand -base64 32
   ```

6. **Deploy** をクリック → ビルド・デプロイ開始

7. デプロイ完了後、表示されるURL（例: `https://jyuhacchu-system.vercel.app`）を確認

8. **NEXTAUTH_URL を更新**:
   - Vercelダッシュボード → Settings → Environment Variables
   - `NEXTAUTH_URL` を実際のURLに更新
   - **Redeploy** を実行

### vercel.json の設定内容

```json
{
  "buildCommand": "npx prisma generate && npx prisma migrate deploy && npm run build",
  "framework": "nextjs",
  "regions": ["hnd1"]
}
```

- `prisma generate`: Prisma Client 生成
- `prisma migrate deploy`: DBマイグレーション実行
- `regions: ["hnd1"]`: 東京リージョン

---

## Step 3: DBマイグレーション・シードデータ

Vercelのデプロイ時に自動実行されますが、手動で行う場合：

```bash
# ローカルからNeonに接続してマイグレーション
DATABASE_URL="postgresql://..." npx prisma migrate deploy

# シードデータ投入
DATABASE_URL="postgresql://..." npx tsx prisma/seed.ts
```

または Neon の **SQL Editor** で直接マイグレーションSQLを実行できます。

### シードデータの内容
- 会社3社（発注企業1社 + 受注企業2社）
- ユーザー3名（各社1名）
- 案件2件
- 発注書1件（明細付き）

---

## Step 4: 国税庁API 設定（任意、5分）

インボイス番号検証機能を有効にするには、国税庁APIのアプリケーションIDが必要です。

1. https://www.invoice-kohyo.nta.go.jp/web-api/ にアクセス
2. 利用規約に同意し、アプリケーションIDを取得
3. Vercelダッシュボード → Settings → Environment Variables に追加:

   | 変数名 | 値 |
   |--------|-----|
   | `NTA_APP_ID` | 取得したアプリケーションID |

4. **Redeploy** を実行

**未設定の場合**: インボイス番号のフォーマットチェック（T+13桁）のみ実行されます。国税庁APIでの有効性確認は行われません。

---

## Step 5: Sentry エラー監視（任意、5分）

1. https://sentry.io にアクセス → **Sign Up**（GitHub連携）
2. **Create Project**:
   - Platform: **Next.js**
   - Project name: `juhacchu-l-system`
3. 表示される **DSN** をコピー
4. Vercelダッシュボード → Settings → Environment Variables に追加:

   | 変数名 | 値 |
   |--------|-----|
   | `NEXT_PUBLIC_SENTRY_DSN` | コピーしたDSN |
   | `SENTRY_ORG` | Sentryの組織名 |
   | `SENTRY_PROJECT` | `juhacchu-l-system` |

5. **Redeploy** を実行

---

## Step 6: 動作確認

1. デプロイURLにアクセス → ログイン画面が表示される
2. シードデータでログイン:
   - 管理者: `admin@sample-trading.co.jp` / `password123`
3. 以下を確認:
   - ダッシュボードが表示される
   - 案件・発注・請求の一覧が動作する
   - 発注書の作成→申請→承認フローが動作する
   - 取引先のインボイス番号検証が動作する
4. ヘルスチェック: `https://your-url/api/health` にアクセス

---

## Step 7: カスタムドメイン（オプション）

1. Vercelダッシュボード → Settings → Domains
2. カスタムドメインを追加
3. DNS設定（CNAME → `cname.vercel-dns.com`）
4. SSL証明書は自動発行
5. **NEXTAUTH_URL** をカスタムドメインに更新 → Redeploy

---

## Docker でのローカル実行

```bash
# .env ファイルを作成
cp .env.example .env
# 必要に応じて .env を編集

# Docker Compose で起動
docker compose up -d

# ブラウザで http://localhost:3000 にアクセス
```

docker-compose.yml の構成：
- **db**: PostgreSQL 16 Alpine（ヘルスチェック付き）
- **migrate**: prisma migrate deploy（DB起動後に自動実行）
- **app**: Next.js アプリ（マイグレーション完了後に起動）

---

## デプロイ時の既知の問題と対策

### 1. MIDDLEWARE_INVOCATION_FAILED
**原因**: ミドルウェアで `auth()` を使用すると、内部でPrismaがインポートされ、Edge Runtimeで動作しない。
**対策**: src/middleware.ts は Cookie ベースのセッション確認のみ行う実装に変更済み。Prismaをインポートしないこと。

### 2. TypeError: Invalid URL at /api/auth/session
**原因**: NextAuth v5 で `NEXTAUTH_URL` が未設定または不正。
**対策**: src/lib/auth.ts に `trustHost: true` を設定済み。`NEXTAUTH_URL` 環境変数も正しく設定すること。

### 3. NextAuth route handler 500エラー
**原因**: NextAuth v5 beta の route handler をラッパーで囲むと互換性問題が発生。
**対策**: src/app/api/auth/[...nextauth]/route.ts で `export const { GET, POST } = handlers` と直接エクスポートする。

### 4. Neon接続エラー（channel_binding）
**原因**: `channel_binding=require` パラメータがPrismaと互換性なし。
**対策**: DATABASE_URL から `&channel_binding=require` を削除する。

### 5. ビルドキャッシュ問題
**原因**: デザイン変更後にVercelのキャッシュと新コードが不整合。
**対策**: Vercelダッシュボード → Redeploy → 「Override Build Cache」にチェック。

---

## 環境変数一覧

| 変数名 | 必須 | 説明 | 例 |
|--------|------|------|-----|
| `DATABASE_URL` | Yes | PostgreSQL接続URL | `postgresql://user:pass@host/db?sslmode=require` |
| `NEXTAUTH_SECRET` | Yes | NextAuth暗号化キー | `openssl rand -base64 32` で生成 |
| `NEXTAUTH_URL` | Yes | サイトURL | `https://your-app.vercel.app` |
| `NTA_APP_ID` | No | 国税庁API アプリケーションID | 未設定時はフォーマットチェックのみ |
| `NEXT_PUBLIC_SENTRY_DSN` | No | Sentry DSN | `https://xxx@xxx.ingest.sentry.io/xxx` |
| `SENTRY_ORG` | No | Sentry組織名 | |
| `SENTRY_PROJECT` | No | Sentryプロジェクト名 | |

---

## 無料プランの制限

| サービス | 制限 |
|---------|------|
| Vercel | 帯域: 100GB/月、ビルド: 6,000分/月、サーバーレス実行: 100GB-hr/月 |
| Neon | ストレージ: 0.5GB、コンピュート: 190時間/月、ブランチ: 10 |
| Sentry | エラー: 5,000/月、トランザクション: 10K/月 |
| GitHub Actions | プライベートリポ: 2,000分/月 |

---

## セキュリティチェックリスト

- [ ] NEXTAUTH_SECRET を強力なランダム値に変更済み
- [ ] テスト用パスワード（password123）を本番用に変更済み
- [ ] DATABASE_URL が環境変数で管理されている（コードにハードコードしない）
- [ ] .env ファイルが .gitignore に含まれている
- [ ] NTA_APP_ID を設定済み（インボイス番号検証を使用する場合）
- [ ] Sentry DSN を設定済み（エラー監視を使用する場合）

---

## 法的チェックリスト（テスト公開時）

- [ ] 利用規約ページ（/terms）の内容確認
- [ ] プライバシーポリシーページ（/privacy）の内容確認
- [ ] テストサービスである旨の表示確認
- [ ] 本番運用前に弁護士レビューを予定
