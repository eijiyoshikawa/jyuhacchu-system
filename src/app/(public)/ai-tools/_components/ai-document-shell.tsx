"use client"

import Link from "next/link"

/**
 * 他社製 生成AIツール（通常枠）の申請資料シェル。
 *
 * 受発注Lシステム・電子取引くんのどちらのブランドにも属さないため、
 * 製品ロゴやテーマ色を持たない無地のレイアウトにする。識別情報は
 * 「ITツール名／開発メーカー名／IT導入支援事業者名／申請枠／プロセス」のみ。
 *
 * 印刷時の可読性: 見出し・区切りは黒の太罫＋太字で表現し、背景色に依存させない
 * （審査員は背景グラフィック無効で印刷する。Playbook §8-7 教訓1）。
 */
interface Props {
  title: string
  subtitle?: string
  toolName: string
  makerName: string
  providerName: string
  schemeLabel: string
  pcode?: string
  aiLabel?: string
  docNo?: string
  documentDate: string
  indexHref: string
  children: React.ReactNode
}

export function AiDocumentShell({
  title,
  subtitle,
  toolName,
  makerName,
  providerName,
  schemeLabel,
  pcode,
  aiLabel,
  docNo,
  documentDate,
  indexHref,
  children,
}: Props) {
  function handlePrint() {
    if (typeof window !== "undefined") window.print()
  }

  const idRows: [string, string][] = [
    ["ITツール正式名称", toolName],
    ["開発メーカー名", makerName],
    ["IT導入支援事業者名", providerName],
    ["申請枠", schemeLabel],
    ...(pcode ? ([["プロセス", pcode]] as [string, string][]) : []),
    ...(aiLabel ? ([["AIを用いた機能", aiLabel]] as [string, string][]) : []),
    ["資料作成年月", documentDate],
  ]

  return (
    <div>
      <div className="print-hide sticky top-14 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-4xl flex items-center justify-between px-6 py-3">
          <Link href={indexHref} className="text-sm text-slate-600 hover:text-slate-900">
            ← 申請資料一覧に戻る
          </Link>
          <button
            type="button"
            onClick={handlePrint}
            className="rounded bg-black px-4 py-2 text-xs font-bold text-white hover:bg-slate-800"
          >
            🖨 PDFとして保存 / 印刷
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-[210mm] px-6 py-10 print:py-0 print:max-w-none print:px-0 text-slate-900">
        <header className="mb-6 avoid-break">
          <div className="flex items-stretch justify-between border-4 border-black">
            <div className="bg-black px-4 py-2 text-white">
              <span className="text-lg font-black tracking-wide">{toolName}</span>
            </div>
            <div className="flex items-center px-3 py-2 text-right">
              <span className="text-[11px] font-bold leading-tight">
                {schemeLabel}
                {docNo && (
                  <>
                    <br />
                    <span className="text-sm font-black">{docNo}</span>
                  </>
                )}
              </span>
            </div>
          </div>

          <div className="mt-5 border-y-4 border-double border-black py-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-black tracking-[0.25em]">{title}</h1>
            {subtitle && <p className="mt-2 text-xs font-bold tracking-widest">{subtitle}</p>}
          </div>

          <table className="mt-5 w-full border-collapse text-sm">
            <tbody>
              {idRows.map(([k, v]) => (
                <tr key={k}>
                  <th className="w-52 border-2 border-black px-3 py-1.5 text-left text-xs font-bold">
                    {k}
                  </th>
                  <td className="border-2 border-black px-3 py-1.5 text-base font-black">{v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </header>

        {children}

        <footer className="mt-12 avoid-break">
          <div className="border-t-4 border-black pt-3 text-xs">
            <p className="font-bold">
              {toolName} ／ 開発メーカー: {makerName} ／ IT導入支援事業者: {providerName}
            </p>
            <p className="mt-1 text-slate-600">
              本資料は {schemeLabel} のITツール登録申請 添付書類として IT導入支援事業者 {providerName} が作成したものです。
              製品仕様・価格は開発メーカー {makerName} の公開情報（{documentDate}時点）に基づきます。
            </p>
          </div>
        </footer>
      </article>
    </div>
  )
}

/** 章見出し（黒枠＋章番号の黒ベタ） */
export function AiSection({
  label,
  no,
  children,
}: {
  label: string
  no?: string
  children: React.ReactNode
}) {
  return (
    <section className="mb-8 avoid-break">
      <h2 className="mb-4 flex items-stretch border-2 border-black">
        {no && (
          <span className="flex items-center bg-black px-3 text-lg font-black text-white">{no}</span>
        )}
        <span className="flex-1 px-3 py-2 text-xl font-black">{label}</span>
      </h2>
      <div className="border-l-4 border-black pl-4">{children}</div>
    </section>
  )
}

/** Pコード対応マーカー（Playbook §8-7 教訓12） */
export function PcodeBadge({ label }: { label: string }) {
  return (
    <span className="inline-block border-2 border-black bg-yellow-100 px-2 py-0.5 text-[11px] font-black">
      {label} 対応
    </span>
  )
}

/** 章扉ページ */
export function ChapterCover({
  no,
  title,
  lead,
}: {
  no: string
  title: string
  lead: string
}) {
  return (
    <section className="mb-8 page-break-before avoid-break">
      <div className="border-4 border-black p-8 text-center">
        <p className="text-sm font-bold tracking-widest">§{no}</p>
        <h2 className="text-3xl sm:text-4xl font-black tracking-widest border-y-4 border-black py-4 my-3">
          {title}
        </h2>
        <p className="mt-4 text-sm font-bold leading-relaxed">{lead}</p>
      </div>
    </section>
  )
}
