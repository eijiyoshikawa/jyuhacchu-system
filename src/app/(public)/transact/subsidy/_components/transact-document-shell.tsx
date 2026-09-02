"use client"

import Link from "next/link"
import { DSYSTEM_BRAND } from "@/lib/brand"

/**
 * 電子取引くん の申請資料シェル。
 *
 * 受発注Lシステム の申請資料（`(public)/subsidy/_components/document-shell.tsx`）とは
 * レイアウトを意図的に分けている。同一の開発メーカーが2つのITツールを登録するため、
 * 資料の体裁まで同じだと「同一製品の二重登録」と見られかねない。
 *
 * 印刷時の可読性:
 * 見出し・区切りは必ず「黒の太罫 + 太字」で表現し、背景色だけに依存させない
 * （審査員が背景グラフィックを無効にして印刷しても構造が失われないようにする）。
 * 黒ベタ反転は装飾用の帯にとどめ、本文の情報は白地・黒文字で読めるようにする。
 */
interface Props {
  title: string
  subtitle?: string
  pcode?: string
  toolName?: string
  makerName?: string
  providerName?: string
  indexHref?: string
  indexLabel?: string
  schemeLabel?: string
  /** 資料番号（例: 資料① 機能説明資料） */
  docNo?: string
  children: React.ReactNode
}

export function TransactDocumentShell({
  title,
  subtitle,
  pcode,
  toolName = DSYSTEM_BRAND.toolName,
  makerName = "株式会社LET",
  providerName,
  indexHref = "/transact/subsidy",
  indexLabel = "← 申請資料一覧に戻る",
  schemeLabel = "デジタル化・AI導入補助金2026 インボイス枠（電子取引類型）",
  docNo,
  children,
}: Props) {
  function handlePrint() {
    if (typeof window !== "undefined") window.print()
  }

  const idRows: [string, string][] = [
    ["ITツール正式名称", toolName],
    ["開発メーカー名", makerName],
    ...(providerName ? ([["IT導入支援事業者名", providerName]] as [string, string][]) : []),
    ["申請枠・類型", "インボイス枠（電子取引類型）"],
    ...(pcode ? ([["プロセス", pcode]] as [string, string][]) : []),
    ["資料作成年月", "2026年8月"],
  ]

  return (
    <div>
      <div className="print-hide sticky top-14 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-4xl flex items-center justify-between px-6 py-3">
          <Link href={indexHref} className="text-sm text-slate-600 hover:text-slate-900">
            {indexLabel}
          </Link>
          <button
            type="button"
            onClick={handlePrint}
            className="rounded-lg bg-teal-700 px-4 py-2 text-xs font-bold text-white hover:bg-teal-800"
          >
            🖨 PDFとして保存 / 印刷
          </button>
        </div>
      </div>

      <article className="mx-auto max-w-[210mm] px-6 py-10 print:py-0 print:max-w-none print:px-0 text-slate-900">
        {/* マストヘッド: 黒帯（装飾）。情報は下の白地部分にも必ず出す */}
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

          {/* 表題: 二重罫で挟む（背景色に依存しない） */}
          <div className="mt-5 border-y-4 border-double border-black py-4 text-center">
            <h1 className="text-3xl sm:text-4xl font-black tracking-[0.25em]">{title}</h1>
            {subtitle && <p className="mt-2 text-xs font-bold tracking-widest">{subtitle}</p>}
          </div>

          {/* 識別情報: 横長テーブル（受発注L版は右上の小ボックス） */}
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
              {toolName} ／ 開発メーカー: {makerName}
              {providerName && <> ／ IT導入支援事業者: {providerName}</>}
            </p>
            <p className="mt-1 text-slate-600">
              本資料は {schemeLabel} のITツール登録申請 添付書類として作成されたものです。
            </p>
            <p className="mt-1 text-slate-500">© 2026 {makerName}. All rights reserved.</p>
          </div>
        </footer>
      </article>
    </div>
  )
}

/**
 * 電子取引くん 資料の章見出し。
 * 受発注L版（`【label】` + 左太罫）とは別形状にする。
 */
export function TransactSection({
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
          <span className="flex items-center bg-black px-3 text-lg font-black text-white">
            {no}
          </span>
        )}
        <span className="flex-1 px-3 py-2 text-xl font-black">{label}</span>
      </h2>
      <div className="border-l-4 border-black pl-4">{children}</div>
    </section>
  )
}
