import Link from "next/link"
import { prisma } from "@/lib/prisma"
import { PageHeader } from "@/components/ui/page-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { requireDsystem } from "@/lib/dsystem-guard"

export const metadata = {
  title: "電子取引アーカイブ",
}

/**
 * 電子取引アーカイブ（電子取引くん 固有機能）
 *
 * 電子帳簿保存法の電子取引データ保存における「検索要件」3項目
 *  ① 取引年月日 ② 取引金額 ③ 取引先
 * で、発注書・請求書を横断検索できる画面。
 * 各データの確定日時（タイムスタンプ）と SHA-256 ハッシュを併記し、
 * 改ざん防止措置が講じられていることを画面上で確認できる。
 */
type Search = {
  from?: string
  to?: string
  min?: string
  max?: string
  partner?: string
  kind?: string
}

function parseDate(v?: string): Date | undefined {
  if (!v) return undefined
  const d = new Date(v)
  return Number.isNaN(d.getTime()) ? undefined : d
}
function parseNum(v?: string): number | undefined {
  if (!v) return undefined
  const n = Number(v.replace(/[^\d.-]/g, ""))
  return Number.isFinite(n) ? n : undefined
}

export default async function ArchivePage({
  searchParams,
}: {
  searchParams: Promise<Search>
}) {
  await requireDsystem()
  const q = await searchParams

  const from = parseDate(q.from)
  const to = parseDate(q.to)
  const min = parseNum(q.min)
  const max = parseNum(q.max)
  const partner = (q.partner ?? "").trim()
  const kind = q.kind ?? ""

  const dateFilter =
    from || to ? { gte: from, lte: to ? new Date(to.getTime() + 86_400_000 - 1) : undefined } : undefined
  const amountFilter = min !== undefined || max !== undefined ? { gte: min, lte: max } : undefined
  const partnerFilter = partner
    ? { name: { contains: partner, mode: "insensitive" as const } }
    : undefined

  const [orders, invoices] = await Promise.all([
    kind === "invoice"
      ? Promise.resolve([])
      : prisma.purchaseOrder.findMany({
          where: {
            ...(dateFilter ? { createdAt: dateFilter } : {}),
            ...(amountFilter ? { totalAmount: amountFilter } : {}),
            ...(partnerFilter ? { receiver: partnerFilter } : {}),
          },
          include: { issuer: true, receiver: true },
          orderBy: { createdAt: "desc" },
          take: 100,
        }),
    kind === "order"
      ? Promise.resolve([])
      : prisma.invoice.findMany({
          where: {
            ...(dateFilter ? { createdAt: dateFilter } : {}),
            ...(amountFilter ? { totalAmount: amountFilter } : {}),
            ...(partnerFilter ? { issuer: partnerFilter } : {}),
          },
          include: { issuer: true, receiver: true },
          orderBy: { createdAt: "desc" },
          take: 100,
        }),
  ])

  type Row = {
    id: string
    kind: "発注書" | "請求書"
    number: string
    href: string
    date: Date
    amount: number
    counterparty: string
    confirmedAt: Date | null
    hash: string | null
  }

  const rows: Row[] = [
    ...orders.map((o) => ({
      id: o.id,
      kind: "発注書" as const,
      number: o.orderNumber,
      href: `/orders/${o.id}`,
      date: o.createdAt,
      amount: o.totalAmount,
      counterparty: o.receiver.name,
      confirmedAt: o.confirmedAt,
      hash: o.confirmedHash,
    })),
    ...invoices.map((i) => ({
      id: i.id,
      kind: "請求書" as const,
      number: i.invoiceNumber,
      href: `/invoices/${i.id}`,
      date: i.createdAt,
      amount: i.totalAmount,
      counterparty: i.issuer.name,
      confirmedAt: i.confirmedAt,
      hash: i.confirmedHash,
    })),
  ].sort((a, b) => b.date.getTime() - a.date.getTime())

  const inputClass =
    "w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-teal-500 focus:outline-none focus:ring-1 focus:ring-teal-500"

  return (
    <div className="space-y-6 py-6">
      <PageHeader
        title="電子取引アーカイブ"
        description="電子帳簿保存法の検索要件（取引年月日・取引金額・取引先）で、発注書・請求書を横断検索できます。"
      />

      <form
        method="get"
        className="rounded-xl border border-slate-200 bg-white p-4"
      >
        <p className="mb-3 text-xs font-bold text-teal-700">
          電子帳簿保存法 検索要件 3項目
        </p>
        <div className="grid gap-3 md:grid-cols-3">
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              ① 取引年月日（開始）
            </label>
            <input type="date" name="from" defaultValue={q.from} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              ① 取引年月日（終了）
            </label>
            <input type="date" name="to" defaultValue={q.to} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              ③ 取引先
            </label>
            <input
              type="text"
              name="partner"
              defaultValue={q.partner}
              placeholder="会社名の一部で検索"
              className={inputClass}
            />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              ② 取引金額（下限・税込）
            </label>
            <input type="number" name="min" defaultValue={q.min} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">
              ② 取引金額（上限・税込）
            </label>
            <input type="number" name="max" defaultValue={q.max} className={inputClass} />
          </div>
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-600">書類種別</label>
            <select name="kind" defaultValue={kind} className={inputClass}>
              <option value="">発注書・請求書の両方</option>
              <option value="order">発注書のみ</option>
              <option value="invoice">請求書のみ</option>
            </select>
          </div>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            type="submit"
            className="rounded-lg bg-teal-600 px-4 py-2 text-sm font-bold text-white hover:bg-teal-700"
          >
            検索
          </button>
          <Link
            href="/archive"
            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-50"
          >
            条件をクリア
          </Link>
        </div>
      </form>

      <div className="rounded-xl border border-slate-200 bg-white">
        <div className="border-b border-slate-200 px-4 py-2 text-xs text-slate-500">
          検索結果 {rows.length} 件（最新100件まで表示）
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>種別</TableHead>
              <TableHead>書類番号</TableHead>
              <TableHead>① 取引年月日</TableHead>
              <TableHead>③ 取引先</TableHead>
              <TableHead className="text-right">② 取引金額（税込）</TableHead>
              <TableHead>確定日時（タイムスタンプ）</TableHead>
              <TableHead>SHA-256 ハッシュ</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((r) => (
              <TableRow key={`${r.kind}-${r.id}`}>
                <TableCell>
                  <Badge
                    variant={r.kind === "発注書" ? "secondary" : "outline"}
                    className="rounded-full text-[10px]"
                  >
                    {r.kind}
                  </Badge>
                </TableCell>
                <TableCell className="font-mono text-xs">
                  <Link href={r.href} className="text-teal-700 hover:underline">
                    {r.number}
                  </Link>
                </TableCell>
                <TableCell className="text-xs">{r.date.toLocaleDateString("ja-JP")}</TableCell>
                <TableCell className="text-xs">{r.counterparty}</TableCell>
                <TableCell className="text-right font-mono text-xs">
                  ¥{r.amount.toLocaleString("ja-JP")}
                </TableCell>
                <TableCell className="text-xs">
                  {r.confirmedAt
                    ? r.confirmedAt.toLocaleString("ja-JP")
                    : <span className="text-slate-400">未確定</span>}
                </TableCell>
                <TableCell className="font-mono text-[10px] text-slate-500">
                  {r.hash ? `${r.hash.slice(0, 16)}…` : <span className="text-slate-400">—</span>}
                </TableCell>
              </TableRow>
            ))}
            {rows.length === 0 && (
              <TableRow>
                <TableCell colSpan={7} className="py-8 text-center text-sm text-slate-500">
                  該当する電子取引データはありません。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs leading-relaxed text-slate-500">
        確定した発注書・請求書には SHA-256 ハッシュとタイムスタンプ（確定日時）を自動付与し、
        改ざんの有無を検証できる状態で保存しています。上記の検索要件3項目（取引年月日・取引金額・取引先）は
        組み合わせ検索および範囲検索に対応しています。
      </p>
    </div>
  )
}
