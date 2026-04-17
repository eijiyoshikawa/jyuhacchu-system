"use client"

import Link from "next/link"

interface DocumentShellProps {
  title: string
  subtitle?: string
  pcode?: string
  children: React.ReactNode
}

export function DocumentShell({ title, subtitle, pcode, children }: DocumentShellProps) {
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
            <div className="text-right text-xs text-slate-500 shrink-0 leading-relaxed">
              <p className="font-bold text-slate-800">受発注Lシステム</p>
              <p>株式会社 受発注Lシステム</p>
              <p>2026年4月 版</p>
              {pcode && (
                <p className="mt-1 rounded bg-slate-100 px-2 py-0.5 font-mono">{pcode}</p>
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
