# カスタムドメイン `lsystem.let-inc.net` セットアップ手順

本プロジェクトは、マーケティング用のカスタムドメイン `lsystem.let-inc.net` を
「LP・IT導入補助金 申請資料」のみに割り当て、システム本体（ログイン・ダッシュボード等）
は Vercel の既定ドメイン（`https://jyuhacchu-system.vercel.app`）で引き続き運用する
構成を取っています。

## 構成サマリ

| ホスト | 役割 | 主な公開URL |
|-------|------|-----------|
| `lsystem.let-inc.net` | マーケティング（LP + 補助金申請資料） | `/`（LP）／`/subsidy/*`／`/terms`／`/privacy` |
| `jyuhacchu-system.vercel.app` | システム本体（要ログイン） | `/auth/login` ほか全システム機能 |

LP は `/lp` としても実装していますが、カスタムドメインでは `/lp` に来たリクエストを
`/` に 301 リダイレクトし、URL の重複を避けます。逆にシステムパス（`/orders` 等）を
カスタムドメインで踏んだ場合は `jyuhacchu-system.vercel.app` 側に自動転送します。

## 反映済みの公開URL

| 用途 | URL |
|------|-----|
| サービスLP | `https://lsystem.let-inc.net/` |
| 申請資料インデックス | `https://lsystem.let-inc.net/subsidy` |
| 機能説明資料 | `https://lsystem.let-inc.net/subsidy/feature` |
| 価格説明資料 | `https://lsystem.let-inc.net/subsidy/pricing` |
| その他要件の説明資料 | `https://lsystem.let-inc.net/subsidy/requirements` |
| 利用規約 | `https://lsystem.let-inc.net/terms` |
| プライバシーポリシー | `https://lsystem.let-inc.net/privacy` |

## Vercel 側のセットアップ手順

1. Vercelダッシュボード → 当プロジェクト（`jyuhacchu-system`）→ **Settings → Domains**
   を開く。
2. 入力欄に `lsystem.let-inc.net` を入力し **Add** をクリック。
3. Vercel が表示する DNS レコードの設定値を控える（下記「DNS設定」参照）。
4. ドメインレジストラ（`let-inc.net` の管理ツール）で、サブドメイン `lsystem` 用に
   Vercel 指定の DNS レコードを追加する。
5. DNS 伝播後（通常数分〜最大48時間）、Vercel 側で自動的に SSL 証明書（Let's Encrypt）
   が発行される。
6. 発行完了後、`https://lsystem.let-inc.net/` にアクセスし LP が表示されることを確認。

## DNS設定

`let-inc.net` のネームサーバー管理画面で、以下いずれかのレコードを追加します。
Vercel 側で自動表示される指示に従ってください。

### パターンA（推奨・CNAME）

| Type | Name | Value |
|------|------|-------|
| CNAME | `lsystem` | `cname.vercel-dns.com.` |

### パターンB（A/AAAA）

CNAME が使えない場合は、Vercel が提示する IPv4 / IPv6 アドレスを A / AAAA レコードで登録。

## コード側で設定済みの動作

本リポジトリの以下ファイルで、カスタムドメイン用の動作を設定済みです。

### `next.config.ts`
- **rewrites**: `host === lsystem.let-inc.net` のとき `/` を `/lp` に内部書き換え
- **redirects**: `host === lsystem.let-inc.net` のとき `/lp` を `/` に 301 リダイレクト
  （重複URL防止）

### `src/middleware.ts`
- カスタムドメインで「マーケティングパス」以外（`/orders`, `/auth/login`, `/api/*` など）
  にアクセスされた場合、`https://jyuhacchu-system.vercel.app` の同パスに外部リダイレクト
- マーケティングパス一覧: `/`, `/lp*`, `/subsidy*`, `/terms`, `/privacy`, `/favicon.ico`,
  `/images/*`

### 環境変数（`NEXTAUTH_URL`）

`NEXTAUTH_URL` は **システム本体のドメイン**（`https://jyuhacchu-system.vercel.app`）
のままにしておいてください。これはログイン・セッションがシステム本体ドメインで
完結するためで、マーケティングドメイン側に変える必要はありません。

もし将来 `auth.let-inc.net` のような形で認証も移行する場合は、
別途 `NEXTAUTH_URL` と認証フロー全体の見直しが必要になります。

## 動作確認チェックリスト

DNS 反映後、以下を順に確認してください。

- [ ] `https://lsystem.let-inc.net/` → LP が表示される（証明書エラーなし）
- [ ] `https://lsystem.let-inc.net/lp` → `/` に 301 リダイレクト
- [ ] `https://lsystem.let-inc.net/subsidy` → 申請資料インデックスが表示
- [ ] `https://lsystem.let-inc.net/subsidy/feature` → 機能説明資料が表示
- [ ] `https://lsystem.let-inc.net/subsidy/pricing` → 価格説明資料が表示
- [ ] `https://lsystem.let-inc.net/subsidy/requirements` → その他要件説明が表示
- [ ] `https://lsystem.let-inc.net/orders` → `https://jyuhacchu-system.vercel.app/orders`
      に転送（ログイン画面に飛ぶ）
- [ ] `https://lsystem.let-inc.net/auth/login` → システム本体に転送

## 補助金申請書類に記載するURL

IT導入補助金の交付申請で「公開Webサイト URL」「機能説明資料 URL」「価格説明資料 URL」
を求められる場合は、以下をご使用ください（いずれも認証不要で誰でも閲覧可能）。

```
サービスLP       https://lsystem.let-inc.net/
機能説明資料     https://lsystem.let-inc.net/subsidy/feature
価格説明資料     https://lsystem.let-inc.net/subsidy/pricing
その他要件説明   https://lsystem.let-inc.net/subsidy/requirements
```

各資料ページはブラウザの印刷機能（Ctrl+P / ⌘+P）で A4 PDF として保存でき、
申請書類へのファイル添付にそのまま利用可能です。

## ドメイン反映前（DNS伝播中）のアクセス

DNSが反映されるまでは、現行の Vercel ドメインから同じコンテンツにアクセスできます。

```
サービスLP       https://jyuhacchu-system.vercel.app/lp
機能説明資料     https://jyuhacchu-system.vercel.app/subsidy/feature
価格説明資料     https://jyuhacchu-system.vercel.app/subsidy/pricing
その他要件説明   https://jyuhacchu-system.vercel.app/subsidy/requirements
```
