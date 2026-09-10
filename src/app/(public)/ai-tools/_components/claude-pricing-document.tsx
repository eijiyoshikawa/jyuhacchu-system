import { AiDocumentShell, AiSection } from "./ai-document-shell"
import {
  CASE_STUDIES,
  CLAUDE_MAKER_NAME,
  CLAUDE_TOOL_NAME,
  DOCUMENT_DATE,
  FX_RATE_JPY_PER_USD,
  LICENSE1_PRICE,
  LICENSE2_PRICE,
  MINIMUM_PRICE,
  MINIMUM_SEATS,
  PCODE_LABEL,
  PREMIUM_SEAT,
  SCHEME_LABEL,
  SEAT_PLANS,
  SERVICES,
  STANDARD_PRICE,
  STANDARD_SEAT,
  SUBSIDY_MIN,
  SUBSIDY_RATE_BASIC,
  jpy,
  seatYearlyJpy,
  yen,
} from "./claude-plans"

const TOOL_NAME = CLAUDE_TOOL_NAME
const MAKER_NAME = CLAUDE_MAKER_NAME

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={"border-2 border-black bg-slate-100 px-2 py-1.5 text-left text-xs font-bold " + className}>{children}</th>
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={"border-2 border-black px-2 py-1.5 text-sm align-top " + className}>{children}</td>
}

/** 交付申請の試算例（構成A: 会計ソフト＋本ITツール＋役務） */
const EXAMPLES = [
  { label: `${STANDARD_SEAT.name} ${MINIMUM_SEATS}席（最低構成）`, seatsStd: MINIMUM_SEATS, seatsPrem: 0 },
  { label: `${STANDARD_SEAT.name} 5席`, seatsStd: 5, seatsPrem: 0 },
  { label: `${STANDARD_SEAT.name} 4席＋${PREMIUM_SEAT.name} 1席`, seatsStd: 4, seatsPrem: 1 },
]

export function ClaudePricingDocument({
  providerName,
  variantSuffix = "",
}: {
  providerName: string
  variantSuffix?: string
}) {
  const servicesTotal = SERVICES.reduce((s, x) => s + x.price, 0)
  return (
    <AiDocumentShell
      title="価格説明資料"
      subtitle={`${SCHEME_LABEL} 申請添付書類`}
      toolName={TOOL_NAME}
      makerName={MAKER_NAME}
      providerName={providerName}
      schemeLabel={SCHEME_LABEL}
      pcode={PCODE_LABEL}
      docNo="資料② 価格説明資料"
      documentDate={DOCUMENT_DATE}
      indexHref={`/ai-tools/claude/subsidy${variantSuffix}`}
    >
      <AiSection no="1" label="価格体系（プラン一覧）">
        <p className="mb-3 text-sm leading-relaxed">
          本ITツールは席（ユーザー）数に応じた年額サブスクリプションです。価格は開発メーカー {MAKER_NAME} の
          公表定価（米ドル・年払い）を 1米ドル＝{FX_RATE_JPY_PER_USD}円で円換算した税抜価格で、
          IT導入支援事業者 {providerName} が導入企業に販売する一般販売価格です。
        </p>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <Th className="w-10">No.</Th><Th>プラン名</Th><Th>製造元定価（USD／席／月・年払い）</Th><Th>年額（税抜・円／席）</Th><Th>内容</Th><Th>申請書上の区分</Th>
            </tr>
          </thead>
          <tbody>
            {SEAT_PLANS.map((p) => (
              <tr key={p.name}>
                <Td className="text-center font-bold">{p.mark}</Td>
                <Td className="font-black">{p.name}</Td>
                <Td>${p.usdPerSeatPerMonth}</Td>
                <Td className="text-base font-black">{yen(seatYearlyJpy(p))}</Td>
                <Td>{p.summary}</Td>
                <Td className="text-xs">{p.applicationCategory}</Td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-slate-600">最低契約席数は {MINIMUM_SEATS}席。席の組み合わせ（標準席・プレミアム席の混在）は自由です。</p>
      </AiSection>

      <AiSection no="2" label="ITツール登録申請の価格（登録画面の入力値）">
        <table className="w-full border-collapse">
          <tbody>
            {[
              ["販売形態", "サブスクリプション（年額）"],
              ["標準販売価格（税抜）", `${yen(STANDARD_PRICE)}（${STANDARD_SEAT.name} ${MINIMUM_SEATS}席 × ${yen(seatYearlyJpy(STANDARD_SEAT))} × 1年）`],
              ["最小販売価格（税抜）", `${yen(MINIMUM_PRICE)}（最低構成と同額）`],
              ["包括されているライセンス数", `${MINIMUM_SEATS}`],
              ["ライセンス1価格（税抜）", `${yen(LICENSE1_PRICE)}（${STANDARD_SEAT.name} 追加1席・年額）`],
              ["ライセンス2価格（税抜）", `${yen(LICENSE2_PRICE)}（${PREMIUM_SEAT.name} 1席・年額）`],
            ].map(([k, v]) => (
              <tr key={k}><Th className="w-56">{k}</Th><Td className="text-base font-black">{v}</Td></tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4 border-2 border-black p-3">
          <p className="text-xs font-bold">価格設定の内訳（登録画面の入力文と同一）</p>
          <p className="mt-1 text-sm leading-relaxed">
            標準販売価格 {yen(STANDARD_PRICE)}（税抜）は、{STANDARD_SEAT.name} {MINIMUM_SEATS}席（最低契約席数）の年額利用料であり、
            製造元 {MAKER_NAME} の公表定価（1席あたり月額{STANDARD_SEAT.usdPerSeatPerMonth}米ドル・年払い）を円換算したものです。
            追加席は{STANDARD_SEAT.name} {yen(LICENSE1_PRICE)}／席・年、{PREMIUM_SEAT.name} {yen(LICENSE2_PRICE)}／席・年。
            価格にはクラウド上のAIモデル利用、組織管理機能、連携機能を含みます。
            導入コンサルティング・導入研修・保守サポートの役務は含みません。
          </p>
        </div>
      </AiSection>

      <AiSection no="3" label="価格に含まれるもの／含まれないもの">
        <table className="w-full border-collapse">
          <thead><tr><Th className="w-1/2">含まれる（ソフトウェア利用料）</Th><Th>含まれない（別カテゴリー・別契約）</Th></tr></thead>
          <tbody>
            <tr>
              <Td>
                <ul className="list-disc pl-5">
                  <li>生成AIモデルの利用（席ごとの利用上限内）</li>
                  <li>Web・デスクトップ・モバイルの各アプリ</li>
                  <li>Projects・Artifacts・連携機能</li>
                  <li>組織管理機能・データ保護設定</li>
                  <li>開発メーカーによる機能改善の自動適用</li>
                </ul>
              </Td>
              <Td>
                <ul className="list-disc pl-5">
                  <li>導入コンサルティング（役務・§4）</li>
                  <li>導入研修（役務・§4）</li>
                  <li>保守サポート（カテゴリー7）に該当する役務</li>
                  <li>プレミアム席の上限超過分の追加利用（管理者が上限額を設定）</li>
                  <li>導入企業側の端末・ネットワーク</li>
                </ul>
              </Td>
            </tr>
          </tbody>
        </table>
      </AiSection>

      <div className="page-break-before" />
      <AiSection no="4" label="本ITツールに紐付けて登録する役務">
        <p className="mb-3 text-sm leading-relaxed">
          以下の役務はソフトウェア価格には含まれず、それぞれ独立したITツール（役務）として登録し、
          本ITツール（カテゴリー1）に紐付けます。価格は本ITツール1本あたりの役務価格として設定しています。
        </p>
        {SERVICES.map((s) => (
          <div key={s.name} className="mb-4 border-2 border-black avoid-break">
            <div className="flex items-stretch border-b-2 border-black">
              <span className="bg-black px-3 py-2 text-base font-black text-white">{s.name}</span>
              <span className="flex-1 px-3 py-2 text-sm">{s.category}</span>
              <span className="px-3 py-2 text-base font-black">{yen(s.price)}（税抜）</span>
            </div>
            <div className="p-3">
              <p className="text-xs">内訳: {s.breakdown}</p>
              <table className="mt-2 w-full border-collapse">
                <thead><tr><Th>作業内容</Th><Th className="w-44">成果物</Th></tr></thead>
                <tbody>
                  {s.works.map((w) => (
                    <tr key={w.task}><Td>{w.task}</Td><Td className="font-bold">{w.deliverable}</Td></tr>
                  ))}
                </tbody>
              </table>
              <p className="mt-2 text-xs text-slate-700">含まない内容: {s.excludes}</p>
            </div>
          </div>
        ))}
        <p className="text-xs text-slate-600">役務合計 {yen(servicesTotal)}（税抜）。</p>
      </AiSection>

      <AiSection no="5" label="交付申請の試算例（通常枠・補助率 1/2 の場合）">
        <p className="mb-3 text-sm leading-relaxed">
          本ITツールは {PCODE_LABEL} のみに該当するため、通常枠では会計・受発注等の業務プロセスを持つ
          ITツールと同一の交付申請に組み合わせます。以下は本ITツールと役務の部分のみの試算です
          （補助率は事業者区分により 1/2〜4/5。補助額の下限は {yen(SUBSIDY_MIN)}）。
        </p>
        <table className="w-full border-collapse">
          <thead>
            <tr><Th>構成</Th><Th>ソフトウェア年額</Th><Th>役務</Th><Th>合計（税抜）</Th><Th>補助額（1/2）</Th><Th>自己負担</Th></tr>
          </thead>
          <tbody>
            {EXAMPLES.map((e) => {
              const sw = e.seatsStd * seatYearlyJpy(STANDARD_SEAT) + e.seatsPrem * seatYearlyJpy(PREMIUM_SEAT)
              const total = sw + servicesTotal
              const subsidy = Math.floor(total * SUBSIDY_RATE_BASIC)
              return (
                <tr key={e.label}>
                  <Td className="font-bold">{e.label}</Td>
                  <Td>{yen(sw)}</Td>
                  <Td>{yen(servicesTotal)}</Td>
                  <Td className="font-black">{yen(total)}</Td>
                  <Td className="font-black">{yen(subsidy)}</Td>
                  <Td>{yen(total - subsidy)}</Td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-slate-600">※ 1円未満切り捨て。同一申請に含める会計ソフト等の金額は含みません。</p>
      </AiSection>

      <div className="page-break-before" />
      <AiSection no="6" label="導入事例・実績">
        {CASE_STUDIES.length === 0 && (
          <p className="print-hide border-2 border-dashed border-red-400 bg-red-50 p-3 text-sm font-bold text-red-700">
            【未記入】導入事例・実績は実在の有償契約のみを claude-plans.ts の CASE_STUDIES に記入すること（印刷時は非表示）。
          </p>
        )}
        {CASE_STUDIES.map((c) => (
          <div key={c.name} className="mb-4 border-2 border-black p-4 avoid-break">
            <p className="text-base font-black">{c.name}（{c.industry}・従業員 {c.employees}）</p>
            <p className="mt-1 text-sm">席数: {c.seats} ／ 利用開始: {c.startedAt} ／ 契約: {c.contract}</p>
            <ul className="mt-2 list-disc pl-5 text-sm">{c.effects.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        ))}
        <p className="mt-2 text-xs text-slate-600">
          参考: 1米ドル＝{FX_RATE_JPY_PER_USD}円換算。{STANDARD_SEAT.name} 1席の月額換算は約 {jpy(Math.round(seatYearlyJpy(STANDARD_SEAT) / 12))}円。
        </p>
      </AiSection>
    </AiDocumentShell>
  )
}
