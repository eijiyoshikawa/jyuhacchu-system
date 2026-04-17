# エラー履歴と解決策

このドキュメントは、受発注Lシステム（旧称: 建設Lシステム）の構築中に発生したエラーと解決策をまとめたものです。
同様のプロジェクトを構築する際の参考にしてください。

---

## 1. Prisma v7 互換性問題

### エラー内容
Prisma v7 では `datasourceUrl` や `datasources` オプションが `PrismaClient` コンストラクタから削除された。
`adapter` または `accelerateUrl` が必要になった。

### 解決策
Prisma v5 にダウングレード（`npm install prisma@5 @prisma/client@5`）。
v5 では従来通り `env("DATABASE_URL")` を schema.prisma で使用可能。

### 予防策
- `package.json` で Prisma のバージョンを `"prisma": "^5"` に固定する
- Prisma v7 を使う場合は driver adapter パターンに移行する

---

## 2. Google Fonts アクセスエラー

### エラー内容
```
Failed to fetch `Noto Sans JP` from Google Fonts.
```
ビルド環境からGoogle Fontsにアクセスできなかった。

### 解決策
`next/font/google` の使用をやめ、CSS の `font-family` でシステムフォントを指定。
```css
font-family: 'Hiragino Sans', 'Noto Sans JP', Meiryo, sans-serif;
```

### 予防策
- ビルド環境でインターネットアクセスが制限される可能性を考慮
- ローカルフォントファイルの使用を検討する

---

## 3. shadcn/ui レジストリアクセスエラー

### エラー内容
```
You are not authorized to access the item at https://ui.shadcn.com/...
```
shadcn/ui のコンポーネントレジストリにアクセスできなかった。

### 解決策
UIコンポーネント（button, input, card, table, badge 等）を手動で作成。
shadcn/ui のソースコードを参考に、Tailwind CSS + CVA パターンで実装。

### 予防策
- shadcn/ui コンポーネントのソースコードをローカルに保持
- components.json は正しいスタイル設定で作成しておく

---

## 4. Zod v4 の enum API変更

### エラー内容
```
Type error: No overload matches this call... 'required_error' does not exist
```
Zod v4 では `z.enum()` の第2引数の形式が変更された。

### 解決策
```typescript
// v3 (旧)
z.enum(["A", "B"], { required_error: "選択してください" })
// v4 (新)
z.enum(["A", "B"], "選択してください")
```

### 予防策
- Zod のバージョンを確認し、対応するAPIを使用する
- `zod@3` を使用するか、v4 の新しいAPI形式に従う

---

## 5. Next.js 16 ミドルウェア非推奨警告

### エラー内容
```
The "middleware" file convention is deprecated. Please use "proxy" instead.
```
Next.js 16 では middleware が非推奨になった。

### 解決策
現時点では middleware.ts をそのまま使用（動作には問題なし）。
将来的には proxy パターンへの移行が必要。

### 予防策
- Next.js のバージョンアップ時にマイグレーションガイドを確認
- proxy パターンの採用を検討

---

## 6. Vercel Edge Runtime での Prisma 読み込みエラー

### エラー内容
```
500: INTERNAL_SERVER_ERROR - Code: MIDDLEWARE_INVOCATION_FAILED
```
ミドルウェアで `auth()` を使用→内部で Prisma をインポート→ Edge Runtime で PrismaClient が動作しない。

### 解決策
ミドルウェアを Cookie ベースのセッション確認に変更：
```typescript
// NG: Edge Runtime で Prisma が動かない
import { auth } from "@/lib/auth"
export default auth((req) => { ... })

// OK: Cookie ベースで軽量チェック
export function middleware(req: NextRequest) {
  const sessionToken = req.cookies.get("authjs.session-token") ?? 
    req.cookies.get("__Secure-authjs.session-token")
  // ...
}
```

### 予防策
- ミドルウェアでは DB アクセスを含むモジュールをインポートしない
- Edge Runtime の制限を理解する（Node.js API の一部が使えない）
- セッション確認は Cookie の存在チェックのみにする

---

## 7. NextAuth v5 の NEXTAUTH_URL / trustHost エラー

### エラー内容
```
TypeError: Invalid URL at /api/auth/session
```
Vercel デプロイ時に `NEXTAUTH_URL` が未設定または不正だった。

### 解決策
1. NextAuth 設定に `trustHost: true` を追加
2. Vercel の環境変数で `NEXTAUTH_URL` を正しいURLに設定

```typescript
export const { handlers, signIn, signOut, auth } = NextAuth({
  trustHost: true,
  // ...
})
```

### 予防策
- Vercel デプロイ時は必ず `trustHost: true` を設定
- `NEXTAUTH_URL` にデプロイ先の正しい URL を設定
- デプロイ前に環境変数の設定を確認するチェックリストを用意

---

## 8. NextAuth ルートハンドラーのラッパー互換性

### エラー内容
NextAuth の route handler をレート制限でラップしたところ、500エラーが発生。

### 解決策
ラッパーを除去し、シンプルなエクスポートに変更：
```typescript
// NG: ラッパーが NextAuth v5 beta と互換性なし
const { GET: originalGET, POST: originalPOST } = handlers
export async function POST(req) { ... originalPOST(req) ... }

// OK: シンプルなエクスポート
import { handlers } from "@/lib/auth"
export const { GET, POST } = handlers
```

### 予防策
- NextAuth v5 beta の route handler はラップせず直接エクスポート
- レート制限は別のミドルウェアレイヤーで実装する

---

## 9. Neon PostgreSQL 接続パラメータ

### エラー内容
`channel_binding=require` パラメータが Prisma と互換性がなかった。

### 解決策
DATABASE_URL から `&channel_binding=require` を削除：
```
postgresql://user:pass@host/db?sslmode=require
```

### 予防策
- Neon の接続 URL はシンプルな形式を使用
- `sslmode=require` のみ付与
- Pooler URL vs 直接接続 URL の違いを理解する

---

## 10. Vercel 環境変数未設定

### エラー内容
```
Error: Environment variable not found: DATABASE_URL
```

### 解決策
Vercel ダッシュボード → Settings → Environment Variables で必要な変数を設定。

### 予防策
- `.env.example` を参照して必要な環境変数を事前に把握
- デプロイチェックリストに環境変数確認を含める

---

## 11. Vercel ビルドキャッシュ問題

### エラー内容
デザイン変更後、ローカルでは正常にビルドできるが、Vercel デプロイ時にビルドが失敗する。
キャッシュされた古いアーティファクトと新しいコードの間で不整合が発生。

### 解決策
Vercel ダッシュボードからキャッシュを無効化して再デプロイ：
1. Vercel ダッシュボード → Deployments
2. 最新のデプロイメントを選択
3. 「Redeploy」をクリック
4. 「Override Build Cache」にチェックを入れて再デプロイ

### 予防策
- デザインの大幅変更後はキャッシュクリアデプロイを行う
- `vercel.json` の `buildCommand` を確認し、`prisma generate` が含まれていることを確認
- ビルド失敗時はまずキャッシュ無効化デプロイを試す

---

## エラー発生順サマリー

| # | エラー | 原因 | 影響度 |
|---|--------|------|--------|
| 1 | Prisma v7 互換性 | メジャーバージョンのAPI変更 | 高 |
| 2 | Google Fonts | ネットワークアクセス制限 | 低 |
| 3 | shadcn/ui レジストリ | 認証/アクセス制限 | 中 |
| 4 | Zod v4 enum API | メジャーバージョンのAPI変更 | 中 |
| 5 | Next.js 16 middleware | 非推奨化 | 低 |
| 6 | Edge Runtime + Prisma | ランタイム互換性 | 高 |
| 7 | NextAuth trustHost | デプロイ環境固有 | 高 |
| 8 | NextAuth handler wrapper | ライブラリ互換性 | 中 |
| 9 | Neon channel_binding | DB接続パラメータ | 高 |
| 10 | Vercel 環境変数 | 設定漏れ | 高 |
| 11 | Vercel ビルドキャッシュ | キャッシュ不整合 | 中 |

---

## 環境別チェックリスト

### ローカル開発
- [ ] PostgreSQL が起動している
- [ ] `.env` ファイルに DATABASE_URL が設定されている
- [ ] `npx prisma migrate dev` が成功する
- [ ] `npm run dev` でエラーなく起動する

### Vercel デプロイ
- [ ] DATABASE_URL（Neon の接続 URL、`channel_binding` パラメータなし）
- [ ] NEXTAUTH_SECRET（`openssl rand -base64 32` で生成）
- [ ] NEXTAUTH_URL（デプロイ先の正しい URL）
- [ ] NTA_APP_ID（国税庁API、任意）
- [ ] NextAuth 設定に `trustHost: true` がある
- [ ] ミドルウェアが Edge Runtime 互換（Prisma 未インポート）
- [ ] vercel.json の buildCommand に `prisma migrate deploy` が含まれる
- [ ] デザイン変更後はキャッシュ無効化デプロイを検討

### トラブルシューティング手順
1. Vercel のデプロイログを確認（Build & Function Logs）
2. ローカルで `npm run build` が通ることを確認
3. 環境変数が全て設定されていることを確認
4. キャッシュ無効化デプロイを試す
5. Sentry でランタイムエラーを確認
