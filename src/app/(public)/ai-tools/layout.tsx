/**
 * 他社製 生成AIツール（通常枠）の申請資料領域。
 * 受発注Lシステム・電子取引くんの MarketingChrome は使わず、製品ブランドを持たない
 * 無地のヘッダだけを表示する（審査でツール名の混在と見られないため）。
 */
export default function AiToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="print-hide sticky top-0 z-10 border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-4 text-sm font-bold text-slate-700">
          デジタル化・AI導入補助金2026 通常枠 ITツール登録 申請資料
        </div>
      </header>
      {children}
    </>
  )
}
