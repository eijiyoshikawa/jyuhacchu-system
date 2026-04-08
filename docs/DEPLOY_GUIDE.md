# デプロイ手順書（Neon + Vercel 無料プラン）

## 概要
本番環境を **全て無料** で構築する手順です。
- **DB**: Neon PostgreSQL（無料: 0.5GB、自動バックアップ）
- **ホスティング**: Vercel（無料: SSL自動、CDN付き）
- **エラー監視**: Sentry（無料: 月5,000エラー）

---

## Step 1: Neon PostgreSQL セットアップ（5分）

1. https://neon.tech にアクセス → **Sign Up**（GitHub連携推奨）
2. **Create Project** をクリック
   - Project name: `jyuhacchu-system`
   - Region: **Asia Pacific (Tokyo)** を選択
   - PostgreSQL version: `16`
3. 作成完了後、**Connection Details** から接続URLをコピー：
   ```
   postgresql://username:password@ep-xxx.ap-southeast-1.aws.neon.tech/neondb?sslmode=require
   ```
4. この接続URLを控えておく（Step 2で使用）

---

## Step 2: Vercel デプロイ（10分）

1. https://vercel.com にアクセス → **Sign Up**（GitHub連携）
2. **Add New → Project** をクリック
3. **Import Git Repository** から `eijiyoshikawa/jyuhacchu-system` を選択
4. **Configure Project**:
   - **Framework Preset**: Next.js（自動検出）
   - **Root Directory**: `./`（デフォルト）
   - **Build Command**: `npx prisma generate && npm run build`（自動設定済み）

5. **Environment Variables** を設定（重要）:

   | 変数名 | 値 |
   |--------|-----|
   | `DATABASE_URL` | Step 1でコピーしたNeonの接続URL |
   | `NEXTAUTH_SECRET` | `openssl rand -base64 32` で生成した値 |
   | `NEXTAUTH_URL` | `https://your-project.vercel.app`（デプロイ後に更新） |

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

---

## Step 3: DBマイグレーション実行

Vercelのデプロイ時に自動実行されますが、手動で行う場合：

```bash
# ローカルからNeonに接続してマイグレーション
DATABASE_URL="postgresql://..." npx prisma migrate deploy

# シードデータ投入
DATABASE_URL="postgresql://..." npx tsx prisma/seed.ts
```

または Neon の **SQL Editor** で直接マイグレーションSQLを実行できます。

---

## Step 4: Sentry エラー監視（5分）

1. https://sentry.io にアクセス → **Sign Up**（GitHub連携）
2. **Create Project**:
   - Platform: **Next.js**
   - Project name: `jyuhacchu-system`
3. 表示される **DSN** をコピー（例: `https://xxx@xxx.ingest.sentry.io/xxx`）
4. Vercelダッシュボード → Settings → Environment Variables に追加:

   | 変数名 | 値 |
   |--------|-----|
   | `NEXT_PUBLIC_SENTRY_DSN` | コピーしたDSN |
   | `SENTRY_ORG` | Sentryの組織名 |
   | `SENTRY_PROJECT` | `jyuhacchu-system` |

5. **Redeploy** を実行

---

## Step 5: 動作確認

1. デプロイURLにアクセス → ログイン画面が表示される
2. シードデータでログイン:
   - 管理者: `admin@sample-kensetsu.co.jp` / `password123`
3. 以下を確認:
   - ダッシュボードが表示される
   - 案件・発注・請求の一覧が動作する
   - 発注書の作成→申請→承認フローが動作する
4. ヘルスチェック: `https://your-url/api/health` にアクセス

---

## Step 6: カスタムドメイン（オプション）

1. Vercelダッシュボード → Settings → Domains
2. カスタムドメインを追加
3. DNS設定（CNAME → `cname.vercel-dns.com`）
4. SSL証明書は自動発行

---

## 注意事項

### 無料プランの制限
| サービス | 制限 |
|---------|------|
| Vercel | 帯域: 100GB/月、ビルド: 6,000分/月、サーバーレス実行: 100GB-hr/月 |
| Neon | ストレージ: 0.5GB、コンピュート: 190時間/月、ブランチ: 10 |
| Sentry | エラー: 5,000/月、トランザクション: 10K/月 |
| GitHub Actions | プライベートリポ: 2,000分/月 |

### セキュリティチェックリスト
- [ ] NEXTAUTH_SECRET を強力なランダム値に変更済み
- [ ] テスト用パスワード（password123）を本番用に変更済み
- [ ] DATABASE_URL が環境変数で管理されている
- [ ] .env ファイルが .gitignore に含まれている

### 法的チェックリスト（テスト公開時）
- [ ] 利用規約ページ（/terms）の内容確認
- [ ] プライバシーポリシーページ（/privacy）の内容確認
- [ ] テストサービスである旨の表示確認
- [ ] 本番運用前に弁護士レビューを予定
