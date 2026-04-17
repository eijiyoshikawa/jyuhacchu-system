# 画面キャプチャ 提供依頼一覧

申請資料（`/subsidy/feature` ページ＝機能説明資料）とサービスLP（`/lp` ページ）に
差し込むスクリーンショットの一覧です。各画像の差し込み位置には
`data-screenshot-source="..."` 属性付きのプレースホルダー要素が配置済みで、
後日 `<img>` に差し替えることができます。

## 撮影条件（推奨）

- ブラウザ: Chrome 最新版
- ウィンドウ幅: 1280〜1440px（ダッシュボード系） / 1024px（モバイル風見せが必要な場合）
- ログインアカウント: シードデータの管理者（`admin@sample-trading.co.jp`）
- デモデータが入った状態で撮影（`npx prisma db seed` 実行済み）
- OS のメニューバーや URL バーは除外して良い（切り抜き可）
- ファイル形式: PNG（可逆圧縮）、長辺 1920px 以内
- ファイル命名: `fig-01-dashboard.png` のように連番＋内容
- 保存先: `public/images/subsidy/` に配置（そのまま `/images/subsidy/xxx.png` で参照）

---

## 依頼画像一覧

### LP / サービス紹介（`/lp`）

| # | 参照ID | 撮影ページ（URL） | 画面内容 |
|---|--------|---------------|---------|
| L1 | hero | `/`（ログイン後トップ・ダッシュボード） | サマリカード4枚＋最近の発注テーブルが写る全景 |

### 機能説明資料（`/subsidy/feature`）

| # | 参照ID | 撮影ページ（URL） | 画面内容 | 備考 |
|---|--------|---------------|---------|------|
| F1 | Fig.1 | `/` | ダッシュボード（サマリカード＋最近の発注／請求テーブル） | サイドバー含めて撮影 |
| F2 | Fig.2 | `/orders/new` | 発注書 新規作成画面（明細2〜3行入力済み、税額計算が表示された状態） | TaxSummary が見える状態で |
| F3 | Fig.3 | `/orders/[id]` | 発注書 詳細画面（承認フロー・ステータスタイムライン付き） | 承認者複数名のサンプル |
| F4 | Fig.4 | `/orders/[id]/print` | 発注書 印刷プレビュー（取引契約必要記載事項の欄が表示された状態） | 印刷プレビューは A4 表示で |
| F5 | Fig.5 | `/partners` | 取引先管理 一覧画面 | インボイス番号列が見える幅で |
| F6 | Fig.6 | `/partners/new` | 取引先 新規登録画面（インボイス番号入力欄＋検証結果表示） | T1234567890123 等で検証済み表示 |
| F7 | Fig.7 | `/invoices` | 請求書 一覧画面 | ステータスバッジ（提出済・承認済・支払済）が混在 |
| F8 | Fig.8 | `/admin/audit-logs` | 監査ログ 一覧画面（ADMIN） | 絞り込みバー＋数件のログ |

---

## 差し替え手順（画像を受領した後の作業メモ）

1. 受領画像を `public/images/subsidy/` 配下に保存（例: `fig-02-orders-new.png`）。
2. 対象ページ内の以下のプレースホルダーを `<img>` に置換:

```tsx
// before
<ScreenshotPlaceholder
  figure="Fig.2"
  caption="発注書 新規作成画面（明細入力・税率自動計算）"
  sourceUrl="https://juhacchu-l.jp/orders/new"
/>

// after
<figure className="my-6 avoid-break">
  <img
    src="/images/subsidy/fig-02-orders-new.png"
    alt="発注書 新規作成画面"
    className="w-full rounded border border-slate-300"
  />
  <figcaption className="mt-2 text-center text-xs text-slate-600">
    Fig.2: 発注書 新規作成画面（明細入力・税率自動計算）
  </figcaption>
</figure>
```

3. LP のヒーロー右側プレースホルダーも同様に `<img>` に置換。
4. ローカルで `/lp` および `/subsidy/feature` を開き、レイアウト崩れがないか確認。
5. ブラウザ印刷プレビュー（Ctrl+P / ⌘+P）で PDF 出力時にも画像が見切れないか確認。

---

## 参考: プレースホルダーの実装

- コンポーネント: `src/app/(public)/subsidy/_components/screenshot-placeholder.tsx`
- LP ヒーロー内のプレースホルダー: `src/app/(public)/lp/page.tsx` の "Dashboard Preview" ブロック
- 属性 `data-screenshot-source` に撮影対象URLを記載済み。DOM 検索（`grep data-screenshot-source`）で全箇所を一覧化可能。
