"use client"

import Link from "next/link"

interface DocumentShellProps {
  title: string
  subtitle?: string
  pcode?: string
  /** Tool / maker identification displayed in the document header */
  toolName?: string
  makerName?: string
  children: React.ReactNode
}

export function DocumentShell({
  title,
  subtitle,
  pcode,
  toolName = "受発注Lシステム",
  makerName = "株式会社LET",
  children,
}: DocumentShellProps) {
  function handlePrint() {
    if (typeof window !== "undefined") {
      window.print()
    }
  }

  return (
    <div>
      {/* Print toolbar (screen only) */}
      <div className="print-hide sticky top-14 z-10 border-b border-slate-200 bg-white/95 backdrop-blur">
        <div className="mx-auto max-w-4xl flex items-center justify-between px-6 py-3">
          <Link
            href="/subsidy"
            className="text-sm text-slate-600 hover:text-slate-900"
          >
            ← 申請資料一覧に戻る
          </Link>
          <button
            type="button"
            onClick={handlePrint}
            className="rounded-sm bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700"
          >
            🖨 PDFとして保存 / 印刷
          </button>
        </div>
      </div>

      {/* Print-friendly document body */}
      <article className="mx-auto max-w-[210mm] px-6 py-10 print:py-0 print:max-w-none print:px-0 text-slate-900">
        {/* Document Header (visible in print) */}
        <header className="mb-8 border-b-2 border-slate-800 pb-4 avoid-break">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-black leading-tight">{title}</h1>
              {subtitle && (
                <p className="mt-2 text-sm text-slate-600">{subtitle}</p>
              )}
            </div>
            <div className="text-right text-xs text-slate-700 shrink-0 leading-relaxed border-2 border-black p-2">
              <p className="font-black text-base text-black">{toolName}</p>
              <p className="text-[10px] text-slate-500">ITツール正式名称</p>
              <p className="font-black text-sm text-black mt-1">{makerName}</p>
              <p className="text-[10px] text-slate-500">開発メーカー名</p>
              <p className="text-[10px] mt-1">2026年4月 版</p>
              {pcode && (
                <p className="mt-1 rounded bg-black text-white px-2 py-0.5 font-mono">{pcode}</p>
              )}
            </div>
          </div>
        </header>

        {children}

        {/* Footer */}
        <footer className="mt-12 border-t border-slate-300 pt-4 text-xs text-slate-500 avoid-break">
          <p>© 2026 受発注Lシステム. All rights reserved.</p>
          <p>
            本資料はデジタル化・AI導入補助金2026 インボイス枠（インボイス対応類型）
            の申請添付書類として作成されたものです。
          </p>
        </footer>
      </article>
    </div>
  )
}
