# 電子取引くん 機能説明資料 用スクリーンショット

`/transact/subsidy/feature` の機能説明資料に埋め込む画面キャプチャの配置先。
**必ず `dlsystem.aigrowthx.pro`（電子取引くん ブランド表示）で撮影すること。**
`jyuhacchu-system.vercel.app` で撮ると受発注Lシステムのロゴ・左サイドバーが写り込み、
審査でツール名混在と判定される。

登録要領 別紙1（1）1.【大分類Ⅰソフトウェア】No.4 は
「**ＩＴツール名が分かる画面キャプチャであること**」を求めているため、
上部ナビゲーションのロゴ（電子取引くん）が必ず写る状態で撮影する。

## 必要ファイル（12枚・ファイル名固定）

| ファイル名 | Fig | 撮影画面 | 撮影URL |
|---|---|---|---|
| `dashboard.png` | Fig.1 | ダッシュボード | `/` |
| `partners-invite.png` | Fig.2 | 取引先招待（無償アカウント発行） | `/partners/invite` |
| `invite-accept.png` | Fig.3 | 招待受諾ページ（公開・未ログイン） | `/invite/[token]` |
| `orders-list.png` | Fig.4 | 発注管理 一覧 | `/orders` |
| `orders-new.png` | Fig.5 | 発注書 新規作成 | `/orders/new` |
| `partners-list.png` | Fig.6 | 取引先管理 一覧 | `/partners` |
| `invoices-list.png` | Fig.7 | 請求管理 一覧 | `/invoices` |
| `seller-orders.png` | Fig.8 | 【売り手側】受領した発注書一覧 | `/orders` |
| `seller-invoices.png` | Fig.9 | 【売り手側】発行した請求書一覧 | `/invoices` |
| `seller-invoice-new.png` | Fig.10 | 【売り手側】適格請求書 新規作成 | `/invoices/new` |
| `partner-accounts.png` | Fig.11 | アカウント利用状況（本ツール固有） | `/partners/accounts` |
| `archive.png` | Fig.12 | 電子取引アーカイブ（本ツール固有） | `/archive` |

Fig.1〜7・11・12 は発注側管理者 `admin@sample-trading.co.jp`、
Fig.8〜10 は受注側管理者 `admin@tanaka-service.co.jp` でログインして撮影する
（いずれもパスワード `password123`）。

## 撮影条件

- ビューポート 1440×900、PNG
- 上部ナビゲーションのロゴが「電子取引くん」になっていることを確認してから撮影
- 図を追加・削除したら **必ず PDF を生成し直して Fig の実ページ番号を再計測**し、
  `transact-feature-document.tsx` の `SCREEN_CAPTURES` と目次を更新すること
  （申請フォームが該当ページ番号の入力を求めるため）
