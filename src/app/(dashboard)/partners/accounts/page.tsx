import { prisma } from "@/lib/prisma"
import { PageHeader } from "@/components/ui/page-header"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { requireDsystem } from "@/lib/dsystem-guard"
import { STANDARD_PLAN } from "@/app/(public)/transact/subsidy/_components/denshi-plans"

export const metadata = {
  title: "アカウント利用状況",
}

/**
 * 取引先アカウント利用状況（電子取引くん 固有機能）
 *
 * ITツール登録の手引き 1-3「インボイス枠（電子取引類型）にかかる入力情報・提出書類」の
 *  3.「取引先（中小企業・小規模事業者等）のアカウント利用一覧の画面キャプチャの提出」
 * に直接対応する画面。発注側の管理者が、無償発行した受注側アカウントの
 * 利用状況（事業者名・インボイス管理番号・利用者数・直近取引）を一覧で確認できる。
 *
 * あわせて 登録要領 2-3(1)8.(オ)「受注者側のアカウントを上限なく発行できる契約では
 * ないこと」の裏づけとして、契約プランの発行上限に対する消化状況を表示する。
 */
export default async function PartnerAccountsPage() {
  await requireDsystem()

  const [invitations, subcontractors] = await Promise.all([
    prisma.invitation.findMany({ orderBy: { createdAt: "desc" } }),
    prisma.company.findMany({
      where: { companyType: "SUBCONTRACTOR" },
      include: {
        users: { select: { id: true, name: true, email: true, role: true } },
        issuedInvoices: { select: { id: true, totalAmount: true, createdAt: true } },
        receivedOrders: { select: { id: true, totalAmount: true, createdAt: true } },
      },
      orderBy: { createdAt: "asc" },
    }),
  ])

  const acceptedByCompanyId = new Map(
    invitations
      .filter((i) => i.status === "ACCEPTED" && i.acceptedCompanyId)
      .map((i) => [i.acceptedCompanyId as string, i])
  )

  const issuedCount = subcontractors.length
  const limit = STANDARD_PLAN.partnerAccountLimit
  const usagePct = Math.min(100, Math.round((issuedCount / limit) * 100))

  const pendingCount = invitations.filter((i) => i.status === "PENDING").length

  function latest(dates: Date[]): string {
    if (dates.length === 0) return "—"
    const d = dates.reduce((a, b) => (a > b ? a : b))
    return d.toLocaleDateString("ja-JP")
  }

  return (
    <div className="space-y-6 py-6">
      <PageHeader
        title="アカウント利用状況"
        description="無償発行した受注側企業アカウントの利用状況と、契約プランの発行上限に対する消化状況を確認できます。"
      />

      {/* 発行上限の消化状況 */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">発行済みアカウント（社）</p>
          <p className="mt-1 text-3xl font-black text-slate-900">{issuedCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">招待中（未受諾）</p>
          <p className="mt-1 text-3xl font-black text-slate-900">{pendingCount}</p>
        </div>
        <div className="rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-medium text-slate-500">
            契約プランの発行上限（{STANDARD_PLAN.name}）
          </p>
          <p className="mt-1 text-3xl font-black text-slate-900">{limit} 社</p>
          <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-200">
            <div className="h-full rounded-full bg-teal-600" style={{ width: `${usagePct}%` }} />
          </div>
          <p className="mt-1 text-[11px] text-slate-500">
            上限に達すると新規の招待発行はできません（無制限発行は提供していません）。
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-200 bg-white">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>事業者名</TableHead>
              <TableHead>インボイス管理番号</TableHead>
              <TableHead>アカウント発行</TableHead>
              <TableHead className="text-right">利用者数</TableHead>
              <TableHead>直近の取引</TableHead>
              <TableHead className="text-right">受領発注 / 発行請求</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {subcontractors.map((c) => {
              const inv = acceptedByCompanyId.get(c.id)
              const dates = [
                ...c.receivedOrders.map((o) => o.createdAt),
                ...c.issuedInvoices.map((i) => i.createdAt),
              ]
              return (
                <TableRow key={c.id}>
                  <TableCell className="font-medium">{c.name}</TableCell>
                  <TableCell className="font-mono text-xs">
                    {c.registrationNumber ?? <span className="text-slate-400">未登録</span>}
                  </TableCell>
                  <TableCell>
                    {inv ? (
                      <Badge variant="secondary" className="rounded-full text-[10px]">
                        招待受諾 {inv.acceptedAt?.toLocaleDateString("ja-JP")}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="rounded-full text-[10px]">
                        直接登録
                      </Badge>
                    )}
                    <span className="ml-2 text-[11px] font-bold text-teal-700">利用料 0円</span>
                  </TableCell>
                  <TableCell className="text-right font-mono">{c.users.length}</TableCell>
                  <TableCell className="text-xs">{latest(dates)}</TableCell>
                  <TableCell className="text-right font-mono text-xs">
                    {c.receivedOrders.length} / {c.issuedInvoices.length}
                  </TableCell>
                </TableRow>
              )
            })}
            {subcontractors.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="py-8 text-center text-sm text-slate-500">
                  受注側企業のアカウントはまだ発行されていません。
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <p className="text-xs leading-relaxed text-slate-500">
        受注側企業のアカウントは発注側企業の契約に含まれ、受注側企業に利用料は一切発生しません（0円）。
        発行できるアカウント数は契約プランごとに上限が定められており、上限なく発行できる契約は提供していません。
      </p>
    </div>
  )
}
