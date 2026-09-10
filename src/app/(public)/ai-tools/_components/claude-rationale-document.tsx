import { AiDocumentShell, AiSection } from "./ai-document-shell"
import {
  CLAUDE_MAKER_NAME,
  CLAUDE_PRODUCT_URL,
  CLAUDE_TOOL_NAME,
  COMPETITORS,
  DOCUMENT_DATE,
  FX_RATE_JPY_PER_USD,
  MINIMUM_SEATS,
  PCODE_LABEL,
  SCHEME_LABEL,
  STANDARD_PRICE,
  STANDARD_SEAT,
  seatYearlyJpy,
  yen,
} from "./claude-plans"

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={"border-2 border-black bg-slate-100 px-2 py-1.5 text-left text-xs font-bold " + className}>{children}</th>
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={"border-2 border-black px-2 py-1.5 text-sm align-top " + className}>{children}</td>
}

export function ClaudeRationaleDocument({
  providerName,
  variantSuffix = "",
}: {
  providerName: string
  variantSuffix?: string
}) {
  const usdYear = STANDARD_SEAT.usdPerSeatPerMonth * 12
  return (
    <AiDocumentShell
      title="申請価格理由書"
      subtitle={`${SCHEME_LABEL} 申請添付書類`}
      toolName={CLAUDE_TOOL_NAME}
      makerName={CLAUDE_MAKER_NAME}
      providerName={providerName}
      schemeLabel={SCHEME_LABEL}
      pcode={PCODE_LABEL}
      docNo="資料③ 申請価格理由書"
      documentDate={DOCUMENT_DATE}
      indexHref={`/ai-tools/claude/subsidy${variantSuffix}`}
    >
      <AiSection no="1" label="申請価格の設定根拠">
        <table className="w-full border-collapse">
          <tbody>
            {[
              ["製造元の公表定価", `${STANDARD_SEAT.name} 1席あたり 月額 ${STANDARD_SEAT.usdPerSeatPerMonth}米ドル（年払い）＝ 年額 ${usdYear}米ドル（${CLAUDE_PRODUCT_URL}）`],
              ["円換算レート", `1米ドル＝${FX_RATE_JPY_PER_USD}円（${DOCUMENT_DATE}時点の実勢レートに、登録価格が固定されることによる為替変動分として数%の余裕を含む）`],
              ["1席あたり年額（税抜）", yen(seatYearlyJpy(STANDARD_SEAT))],
              ["標準販売価格（税抜）", `${yen(STANDARD_PRICE)}＝ ${yen(seatYearlyJpy(STANDARD_SEAT))} × 最低契約席数 ${MINIMUM_SEATS}席`],
            ].map(([k, v]) => (
              <tr key={k}><Th className="w-48">{k}</Th><Td className="font-bold">{v}</Td></tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-sm leading-relaxed">
          本ITツールは他社製品（製造元 {CLAUDE_MAKER_NAME}）であり、申請価格は製造元が全世界共通で公表する定価の円換算です。
          IT導入支援事業者 {providerName} は定価に独自の上乗せを行っていないため、申請価格は一般的な市場価格と同一です。
          導入に伴う役務（導入コンサルティング・導入研修）はソフトウェア価格に含めず、別途役務として登録しています。
        </p>
      </AiSection>

      <AiSection no="2" label="類似ITツールの市場価格との比較">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead><tr><Th>製品名</Th><Th>提供企業</Th><Th>公表価格（USD／ユーザー／月・年払い）</Th></tr></thead>
            <tbody>
              {COMPETITORS.map((c, i) => (
                <tr key={c.name} className={i === 0 ? "bg-yellow-100 font-bold" : ""}>
                  <Td>{c.name}</Td><Td>{c.vendor}</Td><Td>{c.usdPerUserPerMonth}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-slate-600">※ {DOCUMENT_DATE}時点の各社公開情報に基づく。法人向け生成AIツールの標準的な価格帯（1ユーザーあたり月額 $14〜$40）の範囲内です。</p>
      </AiSection>

      <AiSection no="3" label="為替変動時の取扱い">
        <p className="text-sm leading-relaxed">
          登録価格は固定であり、交付申請時に登録価格を超える販売は行いません。製造元の定価改定または為替の大幅な変動により
          登録価格が市場価格と乖離した場合は、ITツール登録内容の変更申請を行います。
        </p>
      </AiSection>
    </AiDocumentShell>
  )
}
