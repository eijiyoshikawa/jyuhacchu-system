import Link from "next/link"
import { PrintButton } from "@/app/(public)/subsidy/_components/print-button"
import { DSYSTEM_BRAND } from "@/lib/brand"

/** ITツール正式名称。改名時は src/lib/brand.ts のみを直す */
const TOOL_NAME = DSYSTEM_BRAND.toolName

const sample = {
  invoiceNumber: "INV-20260401-0001",
  issuedAt: "2026年4月1日",
  transactionDate: "2026年3月25日",
  transactionPeriodStart: "2026年3月1日",
  transactionPeriodEnd: "2026年3月25日",
  dueDate: "2026年5月31日",
  subject: "2026年3月分 ネットワーク機器設置業務",
  issuer: {
    name: "ケヤキ工房株式会社（招待受諾で作成された無償アカウント）",
    postal: "150-0001",
    address: "東京都渋谷区神宮前1-2-3",
    tel: "03-2345-6789",
    registrationNumber: "T7070808090901",
  },
  receiver: {
    name: "株式会社アオバ産業（発注側・招待発行元）",
    postal: "100-0001",
    address: "東京都千代田区千代田1-1-1",
    tel: "03-1234-5678",
    registrationNumber: "T2020304050607",
  },
  items: [
    {
      no: 1,
      name: "ネットワーク配線敷設作業",
      spec: "1F〜5F 一式",
      qty: 1,
      unit: "式",
      unitPrice: 3_000_000,
      amount: 3_000_000,
      taxRate: 10,
      transactionDate: "2026/03/20",
    },
    {
      no: 2,
      name: "無線AP設置・設定",
      spec: "Wi-Fi 6対応機器 100台",
      qty: 100,
      unit: "台",
      unitPrice: 20_000,
      amount: 2_000_000,
      taxRate: 10,
      transactionDate: "2026/03/25",
    },
    {
      no: 3,
      name: "作業員向け弁当支給（軽減税率対象）",
      spec: "現地提供",
      qty: 20,
      unit: "食",
      unitPrice: 1_000,
      amount: 20_000,
      taxRate: 8,
      transactionDate: "2026/03/15",
    },
  ],
}

function yen(n: number) {
  return `¥${n.toLocaleString("ja-JP")}`
}

export function TransactInvoiceSampleDocument({
  providerName,
  variantSuffix = "",
}: {
  providerName: string
  /** バリアント用のURLサフィックス（TX.企画版は "/tx"） */
  variantSuffix?: string
}) {
  const subtotal10 = sample.items
    .filter((i) => i.taxRate === 10)
    .reduce((s, i) => s + i.amount, 0)
  const subtotal8 = sample.items
    .filter((i) => i.taxRate === 8)
    .reduce((s, i) => s + i.amount, 0)
  const tax10 = Math.floor(subtotal10 * 0.1)
  const tax8 = Math.floor(subtotal8 * 0.08)
  const subtotal = subtotal10 + subtotal8
  const taxAmount = tax10 + tax8
  const total = subtotal + taxAmount

  return (
    <>
      <style>{`
        @media print {
          .print-hide { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { margin: 15mm; size: A4; }
        }
      `}</style>

      <div className="print-hide sticky top-14 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-4xl flex items-center justify-between px-6 py-3">
          <Link href={`/transact/subsidy${variantSuffix}`} className="text-sm text-slate-600 hover:text-slate-900">
            ← 申請資料一覧に戻る
          </Link>
          <PrintButton />
        </div>
      </div>

      <div className="print-hide mx-auto max-w-4xl px-6 pt-8">
        <div className="rounded border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed">
          <p className="font-bold mb-1">本ページについて（{TOOL_NAME}／電子取引類型 申請版）</p>
          <p>
            本ページは、<strong>開発メーカー 株式会社LET ／ IT導入支援事業者 {providerName}</strong>
            による IT導入補助金 電子取引類型 申請用に作成された、{TOOL_NAME}が出力する
            <strong>適格請求書（インボイス）のサンプル</strong>です。
            本サンプルは、<strong>招待受諾で無償アカウントを作成した受注側企業（ケヤキ工房株式会社）</strong>
            が、発注側企業（株式会社アオバ産業）に対して発行する請求書を想定しています。
            デジタル化・AI導入補助金2026 インボイス枠 電子取引類型 の申請時に求められる
            「インボイス制度に対応していることがわかる請求書等の出力帳票サンプル」として、
            本ページをブラウザの印刷機能（Ctrl+P / ⌘+P）で PDF 保存してご提出ください。
          </p>
          <p className="mt-2 text-xs text-slate-600">
            記載されている会社名・金額等はすべてダミーデータです。
            実運用時は各社の登録情報と実取引内容が表示されます。
          </p>
        </div>

        <div className="mt-4 rounded border border-orange-200 bg-orange-50 p-4 text-xs leading-relaxed">
          <p className="font-bold mb-1">適格請求書の必要記載事項チェック</p>
          <ul className="list-disc pl-5 space-y-0.5">
            <li>① 発行者（適格請求書発行事業者）の氏名又は名称および登録番号</li>
            <li>
              <strong className="bg-yellow-200">② 取引年月日</strong>
              （= 消費税法上の課税資産の譲渡等の年月日 = 役務提供完了日／商品引渡日）。
              <strong>請求書発行日とは異なる</strong>ことに注意。
            </li>
            <li>
              <strong className="bg-green-200">③ 取引内容</strong>
              （軽減税率対象品目はその旨を明記）。
            </li>
            <li>④ 税率ごとに区分して合計した対価の額（税抜 or 税込）および適用税率</li>
            <li>⑤ 税率ごとに区分した消費税額</li>
            <li>⑥ 書類の交付を受ける事業者の氏名又は名称</li>
          </ul>
        </div>

        <div className="mt-4 rounded border border-green-300 bg-green-50 p-4 text-xs leading-relaxed">
          <p className="font-bold mb-1">📨 電子取引類型 の要件対応</p>
          <p>
            本請求書は、発注側企業が発行した招待により<strong>無償で作成された受注側企業のアカウント</strong>
            から、{TOOL_NAME}上で発行されます。両社は同一プラットフォーム内で
            発注書・請求書の電子授受を行い、確定時にはSHA-256 ハッシュ＋タイムスタンプが
            自動付与されるため、<strong>電子帳簿保存法の電子取引データ保存義務</strong>
            にも完全対応します。
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-[210mm] p-4 sm:p-8 font-sans text-sm text-gray-900">
        <div className="mb-8 text-right text-xs leading-relaxed">
          <p className="font-bold text-sm">{sample.issuer.name}</p>
          <p>〒{sample.issuer.postal}</p>
          <p>{sample.issuer.address}</p>
          <p>TEL: {sample.issuer.tel}</p>
          <p className="mt-1 rounded bg-orange-100 inline-block px-2 py-0.5 font-bold text-orange-800">
            登録番号: {sample.issuer.registrationNumber}
          </p>
        </div>

        <h1 className="mb-8 text-center text-2xl font-bold tracking-widest border-b-2 border-gray-800 pb-4">
          適 格 請 求 書
        </h1>

        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <div className="space-y-2">
            <p className="text-base sm:text-lg font-bold border-b border-gray-800 pb-1">
              {sample.receiver.name}　御中
            </p>
            <p className="text-xs text-gray-600">
              下記のとおりご請求申し上げます。
            </p>
          </div>
          <div className="text-left sm:text-right text-xs space-y-1">
            <p>請求番号: {sample.invoiceNumber}</p>
            <p>発行日: {sample.issuedAt}</p>
            <p className="border-2 border-black inline-block px-2 py-1 font-bold text-sm bg-yellow-100">
              取引年月日: {sample.transactionDate}
            </p>
            <p className="text-[10px] text-gray-600">
              （取引期間: {sample.transactionPeriodStart} 〜 {sample.transactionPeriodEnd}）
            </p>
            <p>支払期限: {sample.dueDate}</p>
          </div>
        </div>

        <div className="mb-6 rounded border border-gray-300 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <p className="text-xs text-gray-500">件名</p>
              <p className="font-bold">{sample.subject}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs text-gray-500">ご請求金額（税込）</p>
              <p className="text-lg sm:text-xl font-bold">{yen(total)}</p>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto mb-6">
          <table className="w-full border-collapse text-xs min-w-[600px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-2 py-2 text-center w-8">No.</th>
                <th className="border-2 border-black bg-yellow-200 px-2 py-2 text-center w-24 font-black">取引年月日</th>
                <th className="border-2 border-black bg-yellow-200 px-2 py-2 text-left font-black" colSpan={2}>
                  取引内容（品名／仕様）
                </th>
                <th className="border border-gray-300 px-2 py-2 text-right w-16">数量</th>
                <th className="border border-gray-300 px-2 py-2 text-center w-12">単位</th>
                <th className="border border-gray-300 px-2 py-2 text-right w-24">単価</th>
                <th className="border border-gray-300 px-2 py-2 text-center w-12">税率</th>
                <th className="border border-gray-300 px-2 py-2 text-right w-28">金額</th>
              </tr>
            </thead>
            <tbody>
              {sample.items.map((item) => (
                <tr key={item.no}>
                  <td className="border border-gray-300 px-2 py-1.5 text-center">{item.no}</td>
                  <td className="border-2 border-black bg-yellow-50 px-2 py-1.5 text-center font-bold text-xs">
                    {item.transactionDate}
                  </td>
                  <td className={"px-2 py-1.5 " + (item.taxRate === 8 ? "border-2 border-black bg-green-50" : "border border-gray-300")}>
                    <div className="font-bold">{item.name}</div>
                    {item.taxRate === 8 && (
                      <span className="inline-block mt-1 border-2 border-black bg-green-200 px-2 py-0.5 text-xs font-black">
                        ※ 軽減税率（8%）対象品目
                      </span>
                    )}
                  </td>
                  <td className={"px-2 py-1.5 " + (item.taxRate === 8 ? "border-2 border-black bg-green-50" : "border border-gray-300")}>
                    {item.spec}
                  </td>
                  <td className="border border-gray-300 px-2 py-1.5 text-right">{item.qty}</td>
                  <td className="border border-gray-300 px-2 py-1.5 text-center">{item.unit}</td>
                  <td className="border border-gray-300 px-2 py-1.5 text-right">{yen(item.unitPrice)}</td>
                  <td className="border border-gray-300 px-2 py-1.5 text-center">{item.taxRate}%</td>
                  <td className="border border-gray-300 px-2 py-1.5 text-right">{yen(item.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mb-6 flex justify-end">
          <table className="w-full sm:w-[28rem] border-collapse text-sm">
            <tbody>
              <tr>
                <td className="border border-gray-300 bg-gray-50 px-3 py-2 font-medium">
                  10% 対象　税抜合計
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">{yen(subtotal10)}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 bg-gray-50 px-3 py-2 font-medium">
                  10% 消費税額
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">{yen(tax10)}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 bg-green-50 px-3 py-2 font-medium">
                  8%（軽減）対象　税抜合計
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">{yen(subtotal8)}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 bg-green-50 px-3 py-2 font-medium">
                  8%（軽減）消費税額
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">{yen(tax8)}</td>
              </tr>
              <tr>
                <td className="border border-gray-300 bg-gray-100 px-3 py-2 font-bold">
                  税抜合計
                </td>
                <td className="border border-gray-300 bg-gray-100 px-3 py-2 text-right font-bold">
                  {yen(subtotal)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 bg-gray-100 px-3 py-2 font-bold">
                  消費税合計
                </td>
                <td className="border border-gray-300 bg-gray-100 px-3 py-2 text-right font-bold">
                  {yen(taxAmount)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 bg-gray-800 text-white px-3 py-2 font-bold">
                  税込合計
                </td>
                <td className="border border-gray-300 bg-gray-800 text-white px-3 py-2 text-right font-bold">
                  {yen(total)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="mb-6 border-2 border-black p-3 text-xs leading-relaxed">
          <p className="font-bold mb-1">記載事項について（適格請求書等保存方式 必要記載事項対応）</p>
          <p>
            <strong className="bg-yellow-200">※「取引年月日」</strong>欄は、消費税法における
            「課税資産の譲渡等の年月日」（役務の提供完了日／商品の引渡日）を記載しています。
            <strong>請求書発行日とは別の日付</strong>として、ヘッダ右上および
            明細表に明示的な独立カラムとして表示されます。
          </p>
          <p>
            ※ 上記金額は、適格請求書等保存方式（インボイス制度）に基づき、
            税率ごとに区分した対価の額・消費税額および適用税率を明記しています。
          </p>
          <p>
            ※「軽減税率対象」マーク（※）が付いた品目は、消費税法上の軽減税率（8%）が
            適用される対象品です。
          </p>
          <p>
            ※ 登録番号: {sample.issuer.registrationNumber}（国税庁 公表サイトで有効性を検証可能）
          </p>
        </div>

        <div className="mb-6 border-2 border-black p-3 text-xs leading-relaxed avoid-break">
          <p className="font-bold mb-2">
            適格請求書（インボイス）の必要記載事項チェックリスト
          </p>
          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-400 px-2 py-1 text-left w-56">必要記載事項</th>
                <th className="border border-gray-400 px-2 py-1 text-center w-14">対応</th>
                <th className="border border-gray-400 px-2 py-1 text-left">本サンプル上の該当箇所</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-400 px-2 py-1">① 適格請求書発行事業者の氏名又は名称及び登録番号</td>
                <td className="border border-gray-400 px-2 py-1 text-center font-bold">✓</td>
                <td className="border border-gray-400 px-2 py-1">ヘッダ右上『ケヤキ工房株式会社』『登録番号: {sample.issuer.registrationNumber}』</td>
              </tr>
              <tr className="bg-yellow-100">
                <td className="border border-gray-400 px-2 py-1 font-bold">② 取引年月日</td>
                <td className="border border-gray-400 px-2 py-1 text-center font-bold">✓</td>
                <td className="border border-gray-400 px-2 py-1 font-bold">
                  ヘッダ右側（黄色枠『取引年月日: {sample.transactionDate}』）／
                  明細表 第2列（黄色背景列、明細ごとに役務提供完了日／商品引渡日を記載）
                </td>
              </tr>
              <tr className="bg-green-50">
                <td className="border border-gray-400 px-2 py-1 font-bold">③ 取引内容（軽減税率対象品目はその旨）</td>
                <td className="border border-gray-400 px-2 py-1 text-center font-bold">✓</td>
                <td className="border border-gray-400 px-2 py-1 font-bold">
                  明細表 第3列「<strong>取引内容（品名／仕様）</strong>」／
                  軽減税率対象品目には行全体を緑色枠で囲み、<strong>「※ 軽減税率（8%）対象品目」</strong>マークを明示
                </td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-2 py-1">④ 税率ごとに区分して合計した対価の額及び適用税率</td>
                <td className="border border-gray-400 px-2 py-1 text-center font-bold">✓</td>
                <td className="border border-gray-400 px-2 py-1">税額集計表『10% 対象 税抜合計 / 8% 対象 税抜合計』</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-2 py-1">⑤ 税率ごとに区分した消費税額</td>
                <td className="border border-gray-400 px-2 py-1 text-center font-bold">✓</td>
                <td className="border border-gray-400 px-2 py-1">税額集計表『10% 消費税額 / 8% 消費税額』</td>
              </tr>
              <tr>
                <td className="border border-gray-400 px-2 py-1">⑥ 書類の交付を受ける事業者の氏名又は名称</td>
                <td className="border border-gray-400 px-2 py-1 text-center font-bold">✓</td>
                <td className="border border-gray-400 px-2 py-1">本文左上『株式会社アオバ産業　御中』</td>
              </tr>
            </tbody>
          </table>
          <p className="mt-2 text-[10px] text-slate-600">
            ※「取引年月日」とは、消費税法上の「課税資産の譲渡等の年月日」を指し、
            役務提供の完了日（請負・サービスの場合）または商品の引渡日（物品販売の場合）を記載します。
            請求書発行日や納品書発行日とは異なる概念です。
          </p>
        </div>

        <div className="border-t border-gray-300 pt-3 text-xs text-gray-500 text-center">
          <p>本サンプルは{TOOL_NAME}の出力レイアウトを示すためのダミーデータです。</p>
          <p>© 2026 {TOOL_NAME} / デジタル化・AI導入補助金 2026 電子取引類型 申請添付書類</p>
        </div>
      </div>
    </>
  )
}
