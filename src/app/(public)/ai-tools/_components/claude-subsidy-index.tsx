import Link from "next/link"
import {
  CLAUDE_MAKER_NAME,
  CLAUDE_TOOL_NAME,
  PCODE_LABEL,
  SCHEME_LABEL,
  SERVICES,
  STANDARD_PRICE,
  yen,
} from "./claude-plans"

const DOCUMENTS = [
  {
    href: "/ai-tools/claude/subsidy/feature",
    label: "資料① 機能説明資料",
    description: "Pコード対応ページマップ、生成AI搭載の明示、機能詳細（8機能・画面キャプチャ）、業務フロー図、利用方法、類似ITツール比較、導入事例。",
  },
  {
    href: "/ai-tools/claude/subsidy/pricing",
    label: "資料② 価格説明資料",
    description: "プラン一覧、登録画面の入力値（標準販売価格・最小販売価格・ライセンス価格）、価格設定の内訳、紐付け役務（導入コンサルティング・導入研修）、交付申請の試算例。",
  },
  {
    href: "/ai-tools/claude/subsidy/pricing/rationale",
    label: "資料③ 申請価格理由書",
    description: "製造元定価の円換算根拠、類似ITツールの市場価格比較、為替変動時の取扱い。",
  },
]

export function ClaudeSubsidyIndex({
  providerName,
  variantSuffix = "",
}: {
  providerName: string
  variantSuffix?: string
}) {
  return (
    <div className="mx-auto max-w-4xl px-6 py-12">
      <p className="text-xs font-bold tracking-widest text-slate-600">{SCHEME_LABEL} ITツール登録申請</p>
      <h1 className="mt-2 text-3xl font-black">{CLAUDE_TOOL_NAME} 申請資料</h1>
      <table className="mt-6 w-full border-collapse text-sm">
        <tbody>
          {[
            ["開発メーカー", CLAUDE_MAKER_NAME],
            ["IT導入支援事業者", providerName],
            ["プロセス", PCODE_LABEL],
            ["AIを用いた機能", "生成AI 搭載"],
            ["標準販売価格（税抜・年額）", yen(STANDARD_PRICE)],
            ["紐付け役務", SERVICES.map((s) => `${s.name} ${yen(s.price)}`).join("、")],
          ].map(([k, v]) => (
            <tr key={k}>
              <th className="w-56 border-2 border-black px-3 py-1.5 text-left text-xs font-bold">{k}</th>
              <td className="border-2 border-black px-3 py-1.5 font-bold">{v}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <ul className="mt-8 space-y-4">
        {DOCUMENTS.map((d) => (
          <li key={d.href} className="border-2 border-black p-4">
            <Link href={`${d.href}${variantSuffix}`} className="text-lg font-black underline">
              {d.label}
            </Link>
            <p className="mt-1 text-sm text-slate-700">{d.description}</p>
          </li>
        ))}
      </ul>

      <p className="mt-8 text-xs text-slate-500">
        各資料はブラウザの「印刷 → PDFとして保存」で A4 PDF に出力できます。
        画面キャプチャは public/images/ai-tools/claude/ に配置すると表示されます。
      </p>
    </div>
  )
}
