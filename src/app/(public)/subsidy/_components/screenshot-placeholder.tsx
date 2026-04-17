interface ScreenshotProps {
  figure: string
  caption: string
  sourceUrl: string
  /**
   * Path under /public (e.g. "/images/subsidy/dashboard.png").
   * When omitted, a dashed placeholder is shown with the source URL.
   */
  src?: string
  aspect?: string
}

/**
 * Renders a screenshot either as an <img> (when `src` is provided and the file
 * has been placed under /public) or as a placeholder with the expected source
 * URL documented via `data-screenshot-source`. This lets us ship the subsidy
 * document pages before all captures are placed, and swap in real images by
 * dropping files into public/images/subsidy/ without further code changes.
 */
export function ScreenshotPlaceholder({
  figure,
  caption,
  sourceUrl,
  src,
  aspect = "16/10",
}: ScreenshotProps) {
  if (src) {
    return (
      <figure className="my-6 avoid-break">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={`${figure}: ${caption}`}
          className="w-full rounded border border-slate-300"
          data-screenshot-source={sourceUrl}
        />
        <figcaption className="mt-2 text-center text-xs text-slate-600">
          {figure}: {caption}
        </figcaption>
      </figure>
    )
  }

  return (
    <figure className="my-6 avoid-break">
      <div
        data-screenshot-source={sourceUrl}
        className="w-full rounded border border-dashed border-slate-400 bg-slate-50 flex items-center justify-center text-center text-xs text-slate-500"
        style={{ aspectRatio: aspect }}
      >
        <div className="px-4">
          <p className="font-bold text-slate-700">[{figure}] {caption}</p>
          <p className="mt-2">画面キャプチャ未配置</p>
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
