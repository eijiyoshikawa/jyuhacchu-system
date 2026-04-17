import Link from "next/link"

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <style>{`
        @media print {
          .print-hide { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { margin: 15mm; size: A4; }
          .page-break-before { page-break-before: always; }
          .avoid-break { page-break-inside: avoid; }
        }
      `}</style>

      <header className="print-hide border-b border-slate-200 bg-white sticky top-0 z-10">
        <div className="mx-auto max-w-6xl flex items-center justify-between px-6 py-4">
          <Link href="/lp" className="text-lg font-black tracking-tight text-slate-900">
            受発注<span className="text-orange-500">L</span>システム
          </Link>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <Link href="/lp#features" className="hover:text-slate-900">機能</Link>
            <Link href="/lp#pricing" className="hover:text-slate-900">料金</Link>
            <Link href="/subsidy" className="hover:text-slate-900">IT導入補助金</Link>
            <Link href="/lp#faq" className="hover:text-slate-900">FAQ</Link>
            <Link
              href="/auth/login"
              className="rounded-sm bg-orange-500 px-4 py-2 text-white hover:bg-orange-600"
            >
              ログイン
            </Link>
          </nav>
        </div>
      </header>

      <main className="flex-1">{children}</main>

      <footer className="print-hide border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-6xl px-6 py-10 text-sm text-slate-600">
          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
            <div>
              <p className="text-base font-bold text-slate-900">
                受発注<span className="text-orange-500">L</span>システム
              </p>
              <p className="mt-2 text-xs">
                インボイス対応クラウド受発注・請求管理プラットフォーム
              </p>
              <p className="mt-4 text-xs">
                IT導入補助金（デジタル化・AI導入補助金2026）<br />
                インボイス枠 インボイス対応類型 対応ITツール
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 text-xs">
              <div>
                <p className="mb-2 font-bold text-slate-900">プロダクト</p>
                <ul className="space-y-1">
                  <li><Link href="/lp#features" className="hover:underline">機能</Link></li>
                  <li><Link href="/lp#pricing" className="hover:underline">料金</Link></li>
                  <li><Link href="/subsidy" className="hover:underline">IT導入補助金</Link></li>
                </ul>
              </div>
              <div>
                <p className="mb-2 font-bold text-slate-900">法令</p>
                <ul className="space-y-1">
                  <li><Link href="/terms" className="hover:underline">利用規約</Link></li>
                  <li><Link href="/privacy" className="hover:underline">プライバシーポリシー</Link></li>
                </ul>
              </div>
            </div>
          </div>
          <p className="mt-8 border-t border-slate-200 pt-4 text-xs text-slate-400">
            © 2026 受発注Lシステム. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
