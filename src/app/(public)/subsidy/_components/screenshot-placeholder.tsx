interface ScreenshotPlaceholderProps {
  figure: string
  caption: string
  sourceUrl: string
  aspect?: string
}

/**
 * Placeholder for screenshots that will be inserted before subsidy filing.
 * The `data-screenshot-source` attribute documents which page capture
 * is expected for each figure.
 */
export function ScreenshotPlaceholder({
  figure,
  caption,
  sourceUrl,
  aspect = "16/10",
}: ScreenshotPlaceholderProps) {
  return (
    <figure className="my-6 avoid-break">
      <div
        data-screenshot-source={sourceUrl}
        className="w-full rounded border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center text-center text-xs text-slate-500"
        style={{ aspectRatio: aspect }}
      >
        <div className="px-4">
          <p className="font-bold text-slate-700">[{figure}] {caption}</p>
          <p className="mt-2">画面キャプチャを差し込む位置</p>
          <p className="mt-1 font-mono text-[10px] text-slate-400">
            対象画面: <span className="text-slate-600">{sourceUrl}</span>
          </p>
        </div>
      </div>
      <figcaption className="mt-2 text-center text-xs text-slate-600">
        {figure}: {caption}
      </figcaption>
    </figure>
  )
}
