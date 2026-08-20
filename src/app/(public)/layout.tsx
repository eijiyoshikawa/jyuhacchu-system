export default function PublicLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // ヘッダ／フッタはツールごとにブランドが異なるため、
  // 配下の lp / subsidy（受発注Lシステム）・transact（電子取引くん）の
  // 各セグメントレイアウトで MarketingChrome を適用する。
  return (
    <div className="min-h-screen flex flex-col bg-white text-slate-900">
      <style>{`
        @media print {
          .print-hide { display: none !important; }
          body { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
          @page { margin: 15mm; size: A4; }
          .page-break-before { page-break-before: always; }
          .page-break-after { page-break-after: always; }
          .avoid-break { page-break-inside: avoid; }
        }
      `}</style>
      {children}
    </div>
  )
}
