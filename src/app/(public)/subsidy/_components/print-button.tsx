"use client"

export function PrintButton({
  label = "🖨 PDFとして保存 / 印刷",
  className = "rounded-sm bg-slate-900 px-4 py-2 text-xs font-bold text-white hover:bg-slate-700",
}: {
  label?: string
  className?: string
}) {
  return (
    <button
      type="button"
      onClick={() => {
        if (typeof window !== "undefined") window.print()
      }}
      className={className}
    >
      {label}
    </button>
  )
}
