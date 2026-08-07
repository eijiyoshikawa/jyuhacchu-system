# /images/subsidy/ — 申請資料用スクリーンショット配置

このディレクトリには、IT導入補助金 申請資料（`/subsidy/feature` 等）および
サービスLP（`/lp`）に埋め込むスクリーンショット画像を配置します。

## 配置するファイル一覧

| ファイル名 | 対象画面 URL | 用途 | 状態 |
|-----------|------------|------|------|
| `dashboard.png` | `/` （ログイン後トップ） | LPヒーロー / Fig.1（機能説明資料） | ★ 受領済み（要配置） |
| `orders-list.png` | `/orders` | Fig.2（発注管理 一覧） | ★ 受領済み（要配置） |
| `orders-new.png` | `/orders/new` | Fig.3（発注書 新規作成） | ★ 受領済み（要配置） |
| `orders-detail.png` | `/orders/[id]` | Fig.4（発注書 詳細） | **未受領** |
| `orders-print.png` | `/orders/[id]/print` | Fig.5（発注書 印刷プレビュー） | **未受領** |
| `partners-list.png` | `/partners` | Fig.6（取引先管理 一覧） | ★ 受領済み（要配置） |
| `partners-new.png` | `/partners/new` | Fig.7（取引先 新規登録） | ★ 受領済み（要配置） |
| `invoices-list.png` | `/invoices` | Fig.8（請求書 一覧） | ★ 受領済み（要配置） |
| `invoices-new.png` | `/invoices/new` | Fig.9（請求書 新規作成） | ★ 受領済み（要配置） |
| `users.png` | `/admin/users` | Fig.10（ユーザー管理） | ★ 受領済み（要配置） |
| `audit-logs.png` | `/admin/audit-logs` | Fig.11（監査ログ） | ★ 受領済み（要配置） |

## 配置手順

1. 受領したスクリーンショットを、上表の「ファイル名」で本ディレクトリ
   （`public/images/subsidy/`）に保存。
2. 該当ファイルが存在すれば自動的に `<img>` として表示されます
   （`ScreenshotPlaceholder` コンポーネントは `src` 指定があれば画像表示、
   なければプレースホルダーを表示します）。
3. 配置後、`npm run dev` で `/subsidy/feature` と `/lp` を開いて表示確認。
4. 印刷プレビュー（Ctrl+P / ⌘+P）で PDF 出力時にも画像が切れていないか確認。

## 撮影条件（推奨）

- ブラウザ: Chrome 最新版 / ウィンドウ幅 1280〜1440px
- ログイン: 管理者ユーザー（`admin@sample-trading.co.jp`）
- デモデータ投入済み（`npx prisma db seed` 実行後）
- 形式: PNG（可逆圧縮）／長辺 1920px 以内
- サイドバー含めた全画面を撮影し、不要部分はトリミング

## 命名規約

- `^[a-z0-9-]+\.png$` の形式（小文字＋ハイフン）
- URL パスとファイル名を揃える（例: `/orders/new` → `orders-new.png`）

## 注意: 現状のシードデータについて

既に受領済みの画像では、右上の会社名が「サンプル建設株式会社」と表示されています。
これはシードデータ再投入前の状態です。申請資料では画面の **機能・レイアウトが主** の
確認対象となりますが、以下いずれかの対応を推奨します:

**A案**: このまま採用（旧社名表示のまま）。審査上は機能面が重視されるため実質影響なし。
**B案**: `npx prisma db seed` 実行後に再撮影し、「サンプル商事株式会社」で統一。
