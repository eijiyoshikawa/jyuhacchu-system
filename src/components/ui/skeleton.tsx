import { cn } from "@/lib/utils"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

/**
 * スケルトンローディング部品。
 *
 * - 画面遷移時は各セグメントの `loading.tsx` から使う（Next.js が Suspense 境界として表示）。
 * - クライアント側で fetch してから描画する画面では、データ到着前の表示として使う。
 *
 * 実画面と同じ外枠（PageHeader / テーブル / Card）の寸法に合わせているので、
 * データが入った瞬間にレイアウトが動かない。
 */

export function Skeleton({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-sm bg-gray-200", className)}
      {...props}
    />
  )
}

/** スクリーンリーダー向けの「読み込み中」。見た目には出ない。 */
export function LoadingAnnouncement({ label = "読み込み中" }: { label?: string }) {
  return (
    <span role="status" aria-live="polite" className="sr-only">
      {label}
    </span>
  )
}

// ── 見出し ─────────────────────────────────────────────

/** `PageHeader` と同じ余白・高さ。 */
export function PageHeaderSkeleton({
  action = true,
  description = true,
}: {
  action?: boolean
  description?: boolean
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Skeleton className="h-8 w-40" />
        {description && <Skeleton className="mt-2 h-4 w-72 max-w-full" />}
      </div>
      {action && <Skeleton className="h-9 w-28" />}
    </div>
  )
}

/** 詳細画面の見出し（タイトル＋番号、右側に印刷ボタンとステータスバッジ）。 */
export function DetailHeaderSkeleton({ actions = 1 }: { actions?: number }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div>
        <Skeleton className="h-7 w-40" />
        <Skeleton className="mt-2 h-4 w-32" />
      </div>
      <div className="flex items-center gap-2">
        {Array.from({ length: actions }).map((_, i) => (
          <Skeleton key={i} className="h-8 w-24" />
        ))}
        <Skeleton className="h-6 w-16 rounded-full" />
      </div>
    </div>
  )
}

// ── 一覧 ───────────────────────────────────────────────

/** `SearchFilterBar` と同じ高さの検索欄＋ステータス選択。 */
export function FilterBarSkeleton() {
  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row">
      {/* 縦並び時に flex-1 を付けると高さが 0 になるため、横並び（sm 以上）でだけ伸ばす */}
      <Skeleton className="h-10 w-full sm:flex-1" />
      <Skeleton className="h-10 w-full sm:w-44" />
    </div>
  )
}

const CELL_WIDTHS = ["w-24", "w-40", "w-32", "w-48", "w-20", "w-16", "w-24", "w-28", "w-20"]

/**
 * テーブルのスケルトン。`Table` と同じ thead 背景・行の罫線・セル余白。
 * `bare` を付けると外枠（border / 白背景）を省き、Card の中に置ける。
 */
export function TableSkeleton({
  columns,
  rows = 8,
  bare = false,
  className,
}: {
  columns: number
  rows?: number
  bare?: boolean
  className?: string
}) {
  return (
    <div
      className={cn(
        "relative w-full overflow-x-auto",
        !bare && "rounded-sm border bg-white",
        className
      )}
    >
      <table className="w-full text-sm">
        <thead className="bg-slate-50 [&_tr]:border-b">
          <tr>
            {Array.from({ length: columns }).map((_, c) => (
              <th key={c} className="h-10 px-3 text-left align-middle">
                <Skeleton className={cn("h-3", c === 0 ? "w-16" : "w-12")} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr:last-child]:border-0">
          {Array.from({ length: rows }).map((_, r) => (
            <tr key={r} className="border-b">
              {Array.from({ length: columns }).map((_, c) => (
                <td key={c} className="p-3 align-middle">
                  <Skeleton className={cn("h-4", CELL_WIDTHS[(r + c) % CELL_WIDTHS.length])} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

/** 一覧画面（見出し＋検索バー＋テーブル）。発注・請求・案件・取引先の一覧と同じ骨格。 */
export function ListPageSkeleton({
  columns,
  rows = 8,
  filter = true,
  action = true,
  description = true,
}: {
  columns: number
  rows?: number
  filter?: boolean
  action?: boolean
  description?: boolean
}) {
  return (
    <div>
      <LoadingAnnouncement />
      <PageHeaderSkeleton action={action} description={description} />
      {filter && <FilterBarSkeleton />}
      <TableSkeleton columns={columns} rows={rows} />
    </div>
  )
}

// ── カード類 ───────────────────────────────────────────

/** ダッシュボード上段のサマリーカード。 */
export function StatCardsSkeleton({ count = 4 }: { count?: number }) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-5 w-5" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-8 w-20" />
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

/** `<dl>` 形式の項目カード（発注情報・請求情報など）。 */
export function FieldCardSkeleton({
  fields = 8,
  columns = 2,
}: {
  fields?: number
  columns?: 1 | 2
}) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-24" />
      </CardHeader>
      <CardContent>
        <dl
          className={cn(
            "grid grid-cols-1 gap-4 text-sm",
            columns === 2 && "sm:grid-cols-2"
          )}
        >
          {Array.from({ length: fields }).map((_, i) => (
            <div key={i}>
              <Skeleton className="h-3 w-16" />
              <Skeleton className={cn("mt-2 h-4", i % 3 === 0 ? "w-48" : i % 3 === 1 ? "w-32" : "w-40")} />
            </div>
          ))}
        </dl>
      </CardContent>
    </Card>
  )
}

/** 明細テーブルを内包するカード（発注明細・請求明細）。 */
export function ItemsCardSkeleton({
  columns = 5,
  rows = 3,
}: {
  columns?: number
  rows?: number
}) {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-5 w-20" />
      </CardHeader>
      <CardContent>
        <TableSkeleton columns={columns} rows={rows} bare />
        <div className="mt-4 flex justify-end">
          <div className="w-56 space-y-2">
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-24" />
            </div>
            <div className="flex justify-between">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-4 w-20" />
            </div>
            <div className="flex justify-between border-t pt-2">
              <Skeleton className="h-5 w-16" />
              <Skeleton className="h-5 w-28" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/** ステータスのタイムライン（発注書詳細の上部）。 */
export function TimelineSkeleton({ steps = 5 }: { steps?: number }) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto py-2">
      {Array.from({ length: steps }).map((_, i) => (
        <div key={i} className="flex min-w-0 flex-1 items-center gap-2">
          <div className="flex flex-col items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-3 w-12" />
          </div>
          {i < steps - 1 && <Skeleton className="h-0.5 flex-1" />}
        </div>
      ))}
    </div>
  )
}

// ── 画面単位 ───────────────────────────────────────────

/** 発注書・請求書の詳細画面。 */
export function DetailPageSkeleton({
  fields = 8,
  itemColumns = 5,
  itemRows = 3,
  timeline = true,
  actions = 1,
  className = "max-w-5xl",
}: {
  fields?: number
  itemColumns?: number
  itemRows?: number
  timeline?: boolean
  actions?: number
  className?: string
}) {
  return (
    <div className={cn("space-y-6", className)}>
      <LoadingAnnouncement />
      <DetailHeaderSkeleton actions={actions} />
      {timeline && <TimelineSkeleton />}
      <FieldCardSkeleton fields={fields} />
      <ItemsCardSkeleton columns={itemColumns} rows={itemRows} />
    </div>
  )
}

/** 入力フォーム画面（新規作成・編集・設定）。見出し＋カード内のラベル付き入力欄。 */
export function FormPageSkeleton({
  fields = 5,
  pairedFields = 0,
  buttons = 2,
  className = "max-w-2xl",
}: {
  fields?: number
  /** 2 列で並ぶ入力欄のペア数（先頭に配置） */
  pairedFields?: number
  buttons?: number
  className?: string
}) {
  return (
    <div className={cn("mx-auto sm:mx-0", className)}>
      <LoadingAnnouncement />
      <Skeleton className="mb-6 h-7 w-32" />
      <Card>
        <CardHeader>
          <Skeleton className="h-5 w-48" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {Array.from({ length: pairedFields }).map((_, i) => (
              <div key={`pair-${i}`} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <FormFieldSkeleton />
                <FormFieldSkeleton />
              </div>
            ))}
            {Array.from({ length: fields }).map((_, i) => (
              <FormFieldSkeleton key={i} />
            ))}
            <div className="flex gap-2 pt-2">
              {Array.from({ length: buttons }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-24" />
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export function FormFieldSkeleton() {
  return (
    <div className="space-y-2">
      <Skeleton className="h-3.5 w-20" />
      <Skeleton className="h-10 w-full" />
    </div>
  )
}
