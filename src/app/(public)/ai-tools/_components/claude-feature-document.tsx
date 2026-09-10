import { ScreenshotPlaceholder } from "@/app/(public)/subsidy/_components/screenshot-placeholder"
import {
  AiDocumentShell,
  AiSection,
  ChapterCover,
  PcodeBadge,
} from "./ai-document-shell"
import {
  CASE_STUDIES,
  CLAUDE_MAKER_NAME,
  CLAUDE_PRODUCT_URL,
  CLAUDE_TOOL_NAME,
  COMPETITORS,
  DOCUMENT_DATE,
  LICENSE2_PRICE,
  MINIMUM_SEATS,
  PCODE_LABEL,
  PREMIUM_SEAT,
  SCHEME_LABEL,
  STANDARD_PRICE,
  STANDARD_SEAT,
  seatYearlyJpy,
  yen,
} from "./claude-plans"

const TOOL_NAME = CLAUDE_TOOL_NAME
const MAKER_NAME = CLAUDE_MAKER_NAME
const PCODE = "汎P-07"
const AI_LABEL = "生成AI（大規模言語モデル）を搭載"

/**
 * 画面キャプチャ（別紙1(1)1. No.4「ITツール名が分かる画面キャプチャ」）。
 * 自社契約の Claude Team ワークスペースで撮影し public/images/ai-tools/claude/ に置くと
 * プレースホルダから実画像に差し替わる（ファイル名は src に合わせる）。
 * 他社サイトの画像を転載しないこと。
 */
const FIGURES = [
  { id: "fig1", figure: "Fig.1", caption: "チャット画面（文書作成・要約の指示と出力）", src: "/images/ai-tools/claude/chat.png", sourceUrl: "claude.ai（ワークスペース）／新規チャット" },
  { id: "fig2", figure: "Fig.2", caption: "ファイル添付（PDF・Excel・画像）とデータ分析の出力", src: "/images/ai-tools/claude/analysis.png", sourceUrl: "claude.ai／チャットにファイルを添付" },
  { id: "fig3", figure: "Fig.3", caption: "Projects（業務別の参考資料・指示のチーム共有）", src: "/images/ai-tools/claude/projects.png", sourceUrl: "claude.ai／Projects" },
  { id: "fig4", figure: "Fig.4", caption: "Artifacts（資料・図表・簡易ツールの生成プレビュー）", src: "/images/ai-tools/claude/artifacts.png", sourceUrl: "claude.ai／Artifacts パネル" },
  { id: "fig5", figure: "Fig.5", caption: "連携設定（Google Drive・Gmail・Slack 等）", src: "/images/ai-tools/claude/connectors.png", sourceUrl: "claude.ai／設定 → 連携" },
  { id: "fig6", figure: "Fig.6", caption: "組織管理（メンバー招待・席の割当・ロール）", src: "/images/ai-tools/claude/admin-members.png", sourceUrl: "claude.ai／管理者設定 → メンバー" },
  { id: "fig7", figure: "Fig.7", caption: "データ設定（学習利用の既定オフ・保持設定）", src: "/images/ai-tools/claude/admin-data.png", sourceUrl: "claude.ai／管理者設定 → データ・プライバシー" },
  { id: "fig8", figure: "Fig.8", caption: "Claude Code（プレミアム席・コード生成環境）", src: "/images/ai-tools/claude/claude-code.png", sourceUrl: "Claude Code（ターミナル／デスクトップ）" },
] as const

function figure(id: (typeof FIGURES)[number]["id"]) {
  const f = FIGURES.find((x) => x.id === id)!
  return <ScreenshotPlaceholder figure={f.figure} caption={f.caption} sourceUrl={f.sourceUrl} src={f.src} />
}

const TOC = [
  { no: "★0", label: "Pコード対応ページマップ（汎P-07 の機能例 × 本資料の該当節）", page: "P.3" },
  { no: "★0-1", label: "AIを用いた機能の明示（生成AI 搭載／生成AI以外のAI なし）", page: "P.4" },
  { no: "★0-2", label: "画面キャプチャ一覧（Fig.1〜8）", page: "P.5" },
  { no: "1", label: "製品概要（ITツール正式名称・開発メーカー名・IT導入支援事業者名・プラン名と価格）", page: "P.6" },
  { no: "2", label: "解決する業務課題と導入効果", page: "P.6" },
  { no: "★3", label: "機能詳細（3-1 文書作成・要約・翻訳／3-2 データ分析／3-3 Projects／3-4 Artifacts／3-5 連携／3-6 組織管理／3-7 データ保護／3-8 Claude Code）", page: "P.7〜12" },
  { no: "★4", label: "業務フロー図（導入前後の比較・利用フロー）［図1］［図2］", page: "P.13〜14" },
  { no: "★5", label: "ITツールの利用方法（5-1 組織開設〜5-5 定着運用）", page: "P.15" },
  { no: "6", label: "技術仕様・動作環境", page: "P.16" },
  { no: "7", label: "導入プロセス（3営業日）", page: "P.16" },
  { no: "8", label: "類似ITツール比較", page: "P.17" },
  { no: "9", label: "導入事例・実績", page: "P.18" },
  { no: "10", label: "導入支援体制・お問い合わせ", page: "P.18" },
]

const PCODE_MAP = [
  { example: "文書・メール・報告書の作成、要約、翻訳", section: "§3-1", page: "P.7" },
  { example: "表計算・PDF・画像データの読み取りと分析、グラフ化", section: "§3-2", page: "P.8" },
  { example: "業務ナレッジ・定型指示のテンプレート化と共有（業務の標準化・自動化）", section: "§3-3", page: "P.9" },
  { example: "資料・図表・簡易ツールの生成", section: "§3-4", page: "P.9" },
  { example: "メール・ファイル・チャット等の既存ツールとの連携による自動化", section: "§3-5", page: "P.10" },
  { example: "組織単位の利用管理（席・権限・データ設定）", section: "§3-6 / §3-7", page: "P.11" },
  { example: "プログラムの作成・修正の自動化", section: "§3-8", page: "P.12" },
]

function Cover({ providerName }: { providerName: string }) {
  return (
    <section className="mb-8 page-break-after avoid-break">
      <div className="border-4 border-black p-8">
        <p className="text-center text-sm font-bold tracking-widest">{SCHEME_LABEL} ITツール登録申請</p>
        <h2 className="mt-4 text-center text-2xl font-black tracking-widest border-y-4 border-black py-3">
          機能説明資料
        </h2>
        <table className="mt-6 w-full border-collapse text-sm">
          <tbody>
            {[
              ["ITツール正式名称", TOOL_NAME],
              ["開発メーカー名", MAKER_NAME],
              ["IT導入支援事業者名", providerName],
              ["申請枠", SCHEME_LABEL],
              ["プロセス", PCODE_LABEL],
              ["AIを用いた機能", AI_LABEL],
              ["プラン名と価格（税抜・年額）", `${STANDARD_SEAT.name} ${yen(seatYearlyJpy(STANDARD_SEAT))}／席（最低 ${MINIMUM_SEATS}席＝${yen(STANDARD_PRICE)}）、${PREMIUM_SEAT.name} ${yen(LICENSE2_PRICE)}／席`],
              ["製品URL", CLAUDE_PRODUCT_URL],
              ["資料作成年月", DOCUMENT_DATE],
            ].map(([k, v]) => (
              <tr key={k}>
                <th className="w-56 border-2 border-black px-3 py-2 text-left text-xs font-bold">{k}</th>
                <td className="border-2 border-black px-3 py-2 text-base font-black">{v}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-8 border-t-4 border-black pt-4">
          <p className="text-xs leading-relaxed">
            本資料は、{SCHEME_LABEL} の ITツール登録申請における「機能説明資料」として、
            IT導入支援事業者 {providerName} が、開発メーカー {MAKER_NAME} が提供するITツール
            「{TOOL_NAME}」の機能内容、業務フロー、利用方法を説明するために作成したものです。
            機能・価格は {DOCUMENT_DATE}時点の開発メーカー公開情報に基づきます。
          </p>
        </div>
      </div>
    </section>
  )
}

function Toc() {
  return (
    <section className="mb-8 page-break-after avoid-break">
      <div className="border-4 border-black p-6">
        <h2 className="text-center text-2xl font-black tracking-widest border-y-4 border-black py-3 mb-4">目　次</h2>
        <table className="w-full border-collapse text-sm">
          <tbody>
            {TOC.map((row) => (
              <tr key={row.no}>
                <td className={"border-2 border-black px-3 py-2 text-center font-bold w-20 " + (row.no.startsWith("★") ? "bg-black text-white text-base" : "")}>
                  §{row.no}
                </td>
                <td className={"border-2 border-black px-3 py-2 " + (row.no.startsWith("★") ? "bg-yellow-100 font-bold text-base" : "")}>
                  {row.label}
                </td>
                <td className="border-2 border-black px-3 py-2 text-center w-24 font-mono whitespace-nowrap">{row.page}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

function Th({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <th className={"border-2 border-black bg-slate-100 px-2 py-1.5 text-left text-xs font-bold " + className}>{children}</th>
}
function Td({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <td className={"border-2 border-black px-2 py-1.5 text-sm align-top " + className}>{children}</td>
}

function Feature({
  no,
  title,
  children,
}: {
  no: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="mb-6 avoid-break">
      <h3 className="mb-2 flex flex-wrap items-center gap-2 border-l-4 border-black pl-3 text-lg font-bold">
        <span>{no} {title}</span>
        <PcodeBadge label={PCODE} />
      </h3>
      {children}
    </div>
  )
}

function FlowBeforeAfter() {
  const rows = [
    { task: "議事録・報告書の作成", before: "録音を聞き直し手入力 60分", after: "文字起こしを添付し要約指示 10分" },
    { task: "取引先への提案書・メール", before: "過去資料を探して書き起こし 90分", after: "Project の雛形から生成・推敲 20分" },
    { task: "売上・在庫データの集計", before: "関数・ピボットを手作業 60分", after: "Excel を添付し分析・グラフ化 10分" },
    { task: "英文契約・海外問い合わせ", before: "外部翻訳へ依頼 1〜2日", after: "その場で翻訳・要点整理 5分" },
  ]
  return (
    <figure className="my-4 avoid-break">
      <figcaption className="mb-2 flex items-center gap-2">
        <span className="border-2 border-black bg-black px-2 py-0.5 text-[11px] font-black text-white">［図1］</span>
        <span className="text-sm font-bold">導入前後の業務フロー比較（代表的な4業務）</span>
      </figcaption>
      <svg viewBox="0 0 900 420" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label="導入前後の業務フロー比較">
        <defs>
          <marker id="arrowA" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
          </marker>
        </defs>
        <rect x="10" y="10" width="200" height="34" fill="#000" />
        <text x="110" y="33" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">業務</text>
        <rect x="230" y="10" width="300" height="34" fill="#fff" stroke="#000" strokeWidth="3" />
        <text x="380" y="33" textAnchor="middle" fontSize="15" fontWeight="bold">導入前（手作業）</text>
        <rect x="590" y="10" width="300" height="34" fill="#000" />
        <text x="740" y="33" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">導入後（{TOOL_NAME.split("（")[0]}）</text>
        {rows.map((r, i) => {
          const y = 70 + i * 85
          return (
            <g key={r.task}>
              <rect x="10" y={y} width="200" height="60" fill="#fff" stroke="#000" strokeWidth="2" />
              <text x="110" y={y + 36} textAnchor="middle" fontSize="14" fontWeight="bold">{r.task}</text>
              <rect x="230" y={y} width="300" height="60" fill="#fff" stroke="#000" strokeWidth="2" />
              <text x="380" y={y + 36} textAnchor="middle" fontSize="13">{r.before}</text>
              <line x1="535" y1={y + 30} x2="585" y2={y + 30} stroke="#000" strokeWidth="3" markerEnd="url(#arrowA)" />
              <rect x="590" y={y} width="300" height="60" fill="#fff" stroke="#000" strokeWidth="4" />
              <text x="740" y={y + 36} textAnchor="middle" fontSize="13" fontWeight="bold">{r.after}</text>
            </g>
          )
        })}
      </svg>
      <p className="mt-2 text-xs text-slate-600">※ 所要時間は IT導入支援事業者による標準的な導入時の目安であり、業務内容により異なります。</p>
    </figure>
  )
}

function FlowUsage() {
  const steps = [
    { t1: "① 参考資料・指示の登録", t2: "Project に社内規程・雛形・口調を登録", lane: 0 },
    { t1: "② 指示（プロンプト）", t2: "担当者が自然言語で依頼・ファイル添付", lane: 0 },
    { t1: "③ 生成", t2: "大規模言語モデルが下書き・分析結果を生成", lane: 1 },
    { t1: "④ 確認・修正", t2: "担当者が内容を確認し追加指示", lane: 0 },
    { t1: "⑤ 成果物の出力", t2: "Artifacts から文書・表・図を出力", lane: 1 },
    { t1: "⑥ 共有・保存", t2: "Google Drive・Slack 等の連携先へ保存", lane: 1 },
  ]
  return (
    <figure className="my-4 avoid-break">
      <figcaption className="mb-2 flex items-center gap-2">
        <span className="border-2 border-black bg-black px-2 py-0.5 text-[11px] font-black text-white">［図2］</span>
        <span className="text-sm font-bold">{TOOL_NAME} を用いた業務の利用フロー（利用者と生成AIの役割分担）</span>
      </figcaption>
      <svg viewBox="0 0 900 640" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto" role="img" aria-label="利用フロー図">
        <defs>
          <marker id="arrowB" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="#000" />
          </marker>
        </defs>
        <rect x="10" y="10" width="430" height="34" fill="#000" />
        <text x="225" y="33" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">利用者（導入企業の担当者）</text>
        <rect x="460" y="10" width="430" height="34" fill="#000" />
        <text x="675" y="33" textAnchor="middle" fill="#fff" fontSize="15" fontWeight="bold">{TOOL_NAME.split("（")[0]}（生成AI）</text>
        {steps.map((s, i) => {
          const y = 70 + i * 92
          const x = s.lane === 0 ? 40 : 490
          const cx = x + 185
          return (
            <g key={s.t1}>
              <rect x={x} y={y} width="370" height="62" fill="#fff" stroke="#000" strokeWidth="3" />
              <text x={cx} y={y + 26} textAnchor="middle" fontSize="15" fontWeight="bold">{s.t1}</text>
              <text x={cx} y={y + 48} textAnchor="middle" fontSize="12">{s.t2}</text>
              {i < steps.length - 1 && (
                <line
                  x1={cx}
                  y1={y + 62}
                  x2={(steps[i + 1].lane === 0 ? 40 : 490) + 185}
                  y2={y + 92}
                  stroke="#000"
                  strokeWidth="3"
                  markerEnd="url(#arrowB)"
                />
              )}
            </g>
          )
        })}
      </svg>
    </figure>
  )
}

export function ClaudeFeatureDocument({
  providerName,
  variantSuffix = "",
}: {
  providerName: string
  variantSuffix?: string
}) {
  return (
    <AiDocumentShell
      title="機能説明資料"
      subtitle={`${SCHEME_LABEL} 申請添付書類`}
      toolName={TOOL_NAME}
      makerName={MAKER_NAME}
      providerName={providerName}
      schemeLabel={SCHEME_LABEL}
      pcode={PCODE_LABEL}
      aiLabel={AI_LABEL}
      docNo="資料① 機能説明資料"
      documentDate={DOCUMENT_DATE}
      indexHref={`/ai-tools/claude/subsidy${variantSuffix}`}
    >
      <Cover providerName={providerName} />
      <Toc />

      {/* ★0 Pコード対応ページマップ */}
      <section className="mb-8 page-break-after avoid-break">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">★0 Pコード対応ページマップ</h2>
        <p className="mb-3 text-sm leading-relaxed">
          本ITツールが選択するプロセスは <strong>{PCODE_LABEL}</strong> のみです（業務プロセスは選択しません）。
          汎P-07 の機能例と、本資料内で当該機能を確認できる節・ページを以下に示します。
          各機能の見出しには <PcodeBadge label={PCODE} /> のマーカーを付しています。
        </p>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <Th className="w-24">Pコード</Th>
              <Th>汎P-07 の機能例（本ITツールで実現する内容）</Th>
              <Th className="w-28">該当節</Th>
              <Th className="w-20">ページ</Th>
            </tr>
          </thead>
          <tbody>
            {PCODE_MAP.map((r) => (
              <tr key={r.example}>
                <Td className="bg-yellow-100 font-black text-center">{PCODE}</Td>
                <Td>{r.example}</Td>
                <Td className="font-bold">{r.section}</Td>
                <Td className="font-mono text-center">{r.page}</Td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* ★0-1 AI搭載の明示 */}
      <section className="mb-8 page-break-after avoid-break">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">★0-1 AIを用いた機能の明示</h2>
        <table className="w-full border-collapse">
          <tbody>
            <tr>
              <Th className="w-48">生成AI の搭載</Th>
              <Td className="bg-yellow-100 text-base font-black">あり（搭載）</Td>
            </tr>
            <tr>
              <Th>生成AI以外の AI の搭載</Th>
              <Td className="font-bold">なし</Td>
            </tr>
            <tr>
              <Th>AI技術の内容</Th>
              <Td>
                開発メーカー {MAKER_NAME} が開発・提供する大規模言語モデル（LLM）「Claude」ファミリー。
                自然言語（日本語・英語ほか）と画像・PDF・表計算ファイルを入力として受け取り、
                文章生成・要約・翻訳・分類・データ分析・図表生成・プログラム生成を行う生成AIです。
                モデルは開発メーカーのクラウド基盤上で稼働し、利用者はブラウザ・デスクトップ・
                モバイルの各アプリから利用します。
              </Td>
            </tr>
            <tr>
              <Th>AI が担う業務範囲</Th>
              <Td>
                §3-1〜§3-5・§3-8 の各機能（文書作成、要約、翻訳、データ分析、資料生成、連携先データの
                取り込みと整理、コード生成）はすべて生成AIによって実行されます。§3-6・§3-7 の組織管理・
                データ保護機能は管理機能であり AI は用いません。
              </Td>
            </tr>
            <tr>
              <Th>学習への利用</Th>
              <Td>Team プランでは、利用者の入力・出力データは既定でモデルの学習に利用されません（§3-7）。</Td>
            </tr>
          </tbody>
        </table>
        <p className="mt-3 text-xs text-slate-600">
          ※ 本表は ITツール登録申請画面「AIを用いた機能の搭載有無」の申告（生成AI: 搭載）と一致させています。
        </p>
      </section>

      {/* ★0-2 画面キャプチャ一覧 */}
      <section className="mb-8 page-break-after avoid-break">
        <h2 className="mb-3 bg-black text-white px-4 py-2 text-xl font-black">★0-2 画面キャプチャ一覧</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <Th className="w-16">図番</Th>
              <Th>画面</Th>
              <Th className="w-24">掲載節</Th>
            </tr>
          </thead>
          <tbody>
            {FIGURES.map((f, i) => (
              <tr key={f.id}>
                <Td className="font-bold">{f.figure}</Td>
                <Td>{f.caption}</Td>
                <Td className="font-mono">{["§3-1", "§3-2", "§3-3", "§3-4", "§3-5", "§3-6", "§3-7", "§3-8"][i]}</Td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-3 text-xs text-slate-600">
          ※ 画面キャプチャは IT導入支援事業者 {providerName} が契約する {TOOL_NAME} のワークスペースで撮影したものです。
        </p>
      </section>

      {/* 1 製品概要 */}
      <AiSection no="1" label="製品概要">
        <table className="mb-4 w-full border-collapse">
          <tbody>
            <tr><Th className="w-48">ITツール正式名称</Th><Td className="text-base font-black">{TOOL_NAME}</Td></tr>
            <tr><Th>開発メーカー名</Th><Td className="font-bold">{MAKER_NAME}（米国）</Td></tr>
            <tr><Th>IT導入支援事業者名</Th><Td className="font-bold">{providerName}</Td></tr>
            <tr><Th>製品URL</Th><Td>{CLAUDE_PRODUCT_URL}</Td></tr>
            <tr><Th>提供形態</Th><Td>クラウド（SaaS）・席数課金のサブスクリプション（年額）</Td></tr>
            <tr>
              <Th>プラン名と価格（税抜・年額）</Th>
              <Td>
                <ul className="list-disc pl-5">
                  <li><strong>{STANDARD_SEAT.name}</strong>: {yen(seatYearlyJpy(STANDARD_SEAT))}／席。{STANDARD_SEAT.summary}。最低 {MINIMUM_SEATS}席（標準販売価格 {yen(STANDARD_PRICE)}）</li>
                  <li><strong>{PREMIUM_SEAT.name}</strong>: {yen(LICENSE2_PRICE)}／席。{PREMIUM_SEAT.summary}</li>
                </ul>
              </Td>
            </tr>
            <tr><Th>AIを用いた機能</Th><Td className="font-bold">{AI_LABEL}（生成AI以外のAI: なし）</Td></tr>
            <tr><Th>対象業種</Th><Td>すべての業種（業種を問わない）</Td></tr>
          </tbody>
        </table>
        <p className="text-sm leading-relaxed">
          {TOOL_NAME} は {MAKER_NAME} が提供する法人向け生成AIプラットフォームです。自然言語による指示で、
          文書作成・要約・翻訳、議事録や報告書のドラフト作成、表計算データの分析とグラフ化、社内資料の検索・整理、
          プログラムの作成・修正といった業種を問わない汎用業務を自動化・効率化します。組織管理者がユーザー（席）と
          アクセス権限を一元管理でき、業務データは既定でAIモデルの学習に利用されません。
        </p>
      </AiSection>

      {/* 2 課題と効果 */}
      <AiSection no="2" label="解決する業務課題と導入効果">
        <table className="w-full border-collapse">
          <thead>
            <tr><Th className="w-1/2">導入企業の業務課題</Th><Th>本ITツールによる解決・効果</Th></tr>
          </thead>
          <tbody>
            {[
              ["報告書・議事録・提案書などの文書作成に担当者の時間が取られている", "下書き生成と要約により作成時間を短縮し、担当者は確認・判断に集中できる"],
              ["Excel・PDF に散在するデータの集計・分析が属人化している", "ファイルを添付して自然言語で指示するだけで集計・グラフ化・要点抽出ができる"],
              ["社内の書き方・規程・過去資料が共有されず品質がばらつく", "Projects に参考資料と指示を登録し、チーム全員が同じ品質の出力を再現できる"],
              ["海外取引先との英文対応を外部に依頼している", "翻訳と要点整理をその場で行い、外注のリードタイムを解消する"],
              ["生成AIの個人利用が広がり、情報管理が統制できていない", "組織管理者が席・権限・データ設定を一元管理し、学習不使用の設定で機密情報を保護する"],
            ].map(([a, b]) => (
              <tr key={a}><Td>{a}</Td><Td className="font-bold">{b}</Td></tr>
            ))}
          </tbody>
        </table>
      </AiSection>

      {/* ★3 機能詳細 */}
      <ChapterCover
        no="3"
        title="機能詳細"
        lead={`${PCODE_LABEL} に該当する機能を、画面キャプチャとともに機能単位で説明します。`}
      />

      <AiSection no="3" label="機能詳細">
        <Feature no="3-1" title="対話型の文書作成・要約・翻訳">
          <ul className="list-disc pl-5 text-sm leading-relaxed">
            <li>日本語の自然な指示で、メール・報告書・議事録・提案書・社内通知などの文書を生成します。</li>
            <li>長文の資料・会議の文字起こしを要約し、決定事項・ToDo を抽出します。</li>
            <li>日本語⇔英語をはじめ多言語の翻訳と、専門用語の言い換え・トーン調整ができます。</li>
            <li>会話は履歴として保存され、続きから追加指示・修正が可能です。</li>
          </ul>
          {figure("fig1")}
        </Feature>

        <div className="page-break-before" />
        <Feature no="3-2" title="ファイル読み込みとデータ分析">
          <ul className="list-disc pl-5 text-sm leading-relaxed">
            <li>PDF・Word・Excel／CSV・画像・テキストを添付し、内容の読み取り・比較・要約ができます。</li>
            <li>売上・在庫・勤怠などの表データを集計し、傾向の説明とグラフを生成します。</li>
            <li>複数ファイルの突合（見積と請求、旧版と新版の差分 等）を指示だけで実行できます。</li>
          </ul>
          {figure("fig2")}
        </Feature>

        <div className="page-break-before" />
        <Feature no="3-3" title="Projects（業務ナレッジと指示のチーム共有）">
          <ul className="list-disc pl-5 text-sm leading-relaxed">
            <li>業務ごとに Project を作成し、参考資料（規程・雛形・過去文書）と共通の指示を登録します。</li>
            <li>Project 内の会話は登録資料を参照して回答するため、社内ルールに沿った出力が得られます。</li>
            <li>Project をチームで共有することで、担当者が変わっても同じ品質で業務を再現できます（業務の標準化・自動化）。</li>
          </ul>
          {figure("fig3")}
        </Feature>

        <Feature no="3-4" title="Artifacts（資料・図表・簡易ツールの生成）">
          <ul className="list-disc pl-5 text-sm leading-relaxed">
            <li>生成した文書・表・図・簡易な計算ツールをプレビュー画面に出力し、そのまま修正・保存できます。</li>
            <li>出力はコピー・ダウンロードして Word・Excel・PDF 等の既存の業務ファイルに利用できます。</li>
          </ul>
          {figure("fig4")}
        </Feature>

        <div className="page-break-before" />
        <Feature no="3-5" title="既存業務ツールとの連携">
          <ul className="list-disc pl-5 text-sm leading-relaxed">
            <li>Google Drive・Gmail・Google カレンダー・Slack・Microsoft 365・GitHub 等と連携し、ファイルやメールの内容を取り込んで要約・返信案の作成ができます。</li>
            <li>連携は管理者が組織単位で許可し、利用者は自分のアカウントで認可します。</li>
          </ul>
          {figure("fig5")}
        </Feature>

        <div className="page-break-before" />
        <Feature no="3-6" title="組織管理（席・権限・利用状況）">
          <ul className="list-disc pl-5 text-sm leading-relaxed">
            <li>組織管理者がメンバーを招待し、{STANDARD_SEAT.name}／{PREMIUM_SEAT.name}を割り当てます。最低 {MINIMUM_SEATS}席から利用できます。</li>
            <li>オーナー・管理者・メンバーのロールで操作範囲を分け、退職時はメンバーを削除して席を再割当できます。</li>
            <li>{PREMIUM_SEAT.name}の追加利用（Claude Code）には管理者が上限額を設定できます。</li>
          </ul>
          {figure("fig6")}
        </Feature>

        <Feature no="3-7" title="データ保護">
          <ul className="list-disc pl-5 text-sm leading-relaxed">
            <li>Team プランでは、入力・出力データは既定でモデルの学習に利用されません。</li>
            <li>通信は暗号化（TLS）され、データは開発メーカーのクラウド基盤上で暗号化して保管されます。</li>
            <li>管理者がデータ保持設定・連携先の許可を組織単位で管理します。</li>
          </ul>
          {figure("fig7")}
        </Feature>

        <div className="page-break-before" />
        <Feature no="3-8" title="Claude Code（プログラムの作成・修正の自動化・プレミアム席）">
          <ul className="list-disc pl-5 text-sm leading-relaxed">
            <li>ターミナル・デスクトップ・Web から、自然言語の指示でプログラムの作成・修正・テストを行います。</li>
            <li>社内の業務用スクリプト（データ変換、定型レポート作成 等）の内製化に利用できます。</li>
            <li>{PREMIUM_SEAT.name}に含まれます（{STANDARD_SEAT.name}は対象外）。</li>
          </ul>
          {figure("fig8")}
        </Feature>
      </AiSection>

      {/* ★4 業務フロー図 */}
      <ChapterCover
        no="4"
        title="業務フロー図"
        lead="導入前後の業務フローの比較［図1］と、利用者と生成AIの役割分担を示す利用フロー［図2］。"
      />
      <AiSection no="4" label="業務フロー図">
        <FlowBeforeAfter />
        <div className="page-break-before" />
        <FlowUsage />
      </AiSection>

      {/* ★5 利用方法 */}
      <ChapterCover no="5" title="ITツールの利用方法" lead="組織の開設から日常利用・定着運用までの手順。" />
      <AiSection no="5" label="ITツールの利用方法">
        <table className="w-full border-collapse">
          <thead>
            <tr><Th className="w-32">手順</Th><Th>操作</Th><Th className="w-40">担当</Th></tr>
          </thead>
          <tbody>
            {[
              ["5-1 組織開設", `IT導入支援事業者が Team プランを契約し、導入企業の組織（ワークスペース）を開設。オーナー権限を導入企業の管理者に設定`, "IT導入支援事業者"],
              ["5-2 メンバー招待", "管理者がメールアドレスで利用者を招待し、席（標準席／プレミアム席）を割当。ロールを設定", "導入企業 管理者"],
              ["5-3 初期設定", "データ設定（学習不使用の確認）、連携先の許可、業務別 Project の作成と参考資料の登録", "IT導入支援事業者＋管理者"],
              ["5-4 日常利用", "利用者がチャットで指示・ファイル添付 → 生成結果を確認・修正 → Artifacts から出力 → 連携先へ保存", "利用者"],
              ["5-5 定着運用", "管理者が席の追加・削除、Project の更新、利用ガイドラインの見直しを実施", "導入企業 管理者"],
            ].map(([a, b, c]) => (
              <tr key={a}><Td className="font-bold">{a}</Td><Td>{b}</Td><Td>{c}</Td></tr>
            ))}
          </tbody>
        </table>
      </AiSection>

      {/* 6 技術仕様 */}
      <div className="page-break-before" />
      <AiSection no="6" label="技術仕様・動作環境">
        <table className="w-full border-collapse">
          <tbody>
            {[
              ["提供形態", "クラウド（SaaS）。開発メーカーのクラウド基盤上で稼働し、導入企業側のサーバーは不要"],
              ["利用環境", "Web ブラウザ（Chrome・Edge・Safari 等）、Windows／macOS デスクトップアプリ、iOS／Android アプリ"],
              ["入力形式", "テキスト、PDF、Word、Excel／CSV、画像（PNG・JPEG）ほか"],
              ["出力形式", "テキスト、表、図、Artifacts（HTML・コード・文書）。コピー・ダウンロード可"],
              ["連携", "Google Drive・Gmail・Google カレンダー・Slack・Microsoft 365・GitHub 等"],
              ["セキュリティ", "通信の暗号化（TLS）、保存データの暗号化、組織単位のデータ設定、既定で学習不使用"],
              ["言語", "日本語を含む多言語対応"],
            ].map(([a, b]) => (
              <tr key={a}><Th className="w-40">{a}</Th><Td>{b}</Td></tr>
            ))}
          </tbody>
        </table>
      </AiSection>

      {/* 7 導入プロセス */}
      <AiSection no="7" label="導入プロセス（標準 3営業日）">
        <table className="w-full border-collapse">
          <thead>
            <tr><Th className="w-24">日程</Th><Th>作業</Th></tr>
          </thead>
          <tbody>
            {[
              ["1日目", "組織開設・オーナー設定・メンバー招待・席の割当"],
              ["2日目", "データ設定と連携先の許可、業務別 Project の初期作成"],
              ["3日目", "動作確認と利用開始。利用ガイドラインの配布"],
            ].map(([a, b]) => (
              <tr key={a}><Td className="font-bold">{a}</Td><Td>{b}</Td></tr>
            ))}
          </tbody>
        </table>
        <p className="mt-2 text-xs text-slate-600">
          ※ 導入コンサルティング・導入研修は本ITツールに紐付く役務として別途登録しています（価格説明資料 §4）。
        </p>
      </AiSection>

      {/* 8 類似ITツール比較 */}
      <div className="page-break-before" />
      <AiSection no="8" label="類似ITツール比較">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr>
                <Th>製品名</Th><Th>提供企業</Th><Th>公表価格（USD／ユーザー／月・年払い）</Th><Th>生成AI</Th><Th>ナレッジ共有</Th><Th>外部連携</Th><Th>学習不使用（既定）</Th><Th>コード生成</Th>
              </tr>
            </thead>
            <tbody>
              {COMPETITORS.map((c, i) => (
                <tr key={c.name} className={i === 0 ? "bg-yellow-100 font-bold" : ""}>
                  <Td>{c.name}</Td><Td>{c.vendor}</Td><Td>{c.usdPerUserPerMonth}</Td><Td>{c.generativeAi}</Td><Td>{c.sharedKnowledge}</Td><Td>{c.connectors}</Td><Td>{c.noTraining}</Td><Td>{c.codeGen}</Td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-2 text-xs text-slate-600">
          ※ {DOCUMENT_DATE}時点の各社公開情報・公表価格に基づく比較です。◎: 標準機能として提供、○: 提供（範囲限定）、△: 限定的、—: 該当なし。
        </p>
      </AiSection>

      {/* 9 導入事例 */}
      <div className="page-break-before" />
      <AiSection no="9" label="導入事例・実績">
        {CASE_STUDIES.length === 0 && (
          <p className="print-hide border-2 border-dashed border-red-400 bg-red-50 p-3 text-sm font-bold text-red-700">
            【未記入】導入事例・実績は実在の有償契約のみを claude-plans.ts の CASE_STUDIES に記入すること（印刷時は非表示）。
          </p>
        )}
        {CASE_STUDIES.map((c) => (
          <div key={c.name} className="mb-4 border-2 border-black p-4 avoid-break">
            <p className="text-base font-black">{c.name}（{c.industry}・従業員 {c.employees}）</p>
            <p className="mt-1 text-sm">席数: {c.seats} ／ 利用開始: {c.startedAt} ／ 契約: {c.contract}</p>
            <p className="mt-2 text-sm font-bold">課題</p>
            <ul className="list-disc pl-5 text-sm">{c.challenges.map((x) => <li key={x}>{x}</li>)}</ul>
            <p className="mt-2 text-sm font-bold">効果</p>
            <ul className="list-disc pl-5 text-sm">{c.effects.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        ))}
      </AiSection>

      {/* 10 導入支援体制 */}
      <AiSection no="10" label="導入支援体制・お問い合わせ">
        <p className="text-sm leading-relaxed">
          IT導入支援事業者 {providerName} が、導入支援（組織開設・初期設定）、定着支援（利用状況の確認）、
          活用支援（生成AIの高度な利用方法のレクチャー）、フォローアップを行います。
          導入コンサルティングおよび導入研修は本ITツールに紐付く役務として別途登録しています。
        </p>
        <p className="mt-2 text-sm">お問い合わせ: {providerName}（連絡先は IT事業者ポータル登録情報のとおり）</p>
      </AiSection>
    </AiDocumentShell>
  )
}
