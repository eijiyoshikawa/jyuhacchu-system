"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { InvoiceStatusBadge } from "@/components/ui/status-badge"
import { formatCurrency, formatDate } from "@/lib/utils"

interface InvoiceDetail {
  id: string
  invoiceNumber: string
  subject: string
  status: string
  subtotal: number
  taxRate: number
  taxAmount: number
  totalAmount: number
  dueDate: string | null
  notes: string | null
  createdAt: string
  project: { id: string; name: string; projectCode: string }
  issuer: { id: string; name: string }
  receiver: { id: string; name: string }
  createdBy: { id: string; name: string }
  purchaseOrder: { id: string; orderNumber: string; subject: string } | null
  items: {
    id: string
    itemOrder: number
    name: string
    specification: string | null
    quantity: number
    unit: string
    unitPrice: number
    amount: number
    remarks: string | null
  }[]
  approvalFlow: {
    id: string
    status: string
    steps: {
      id: string
      stepOrder: number
      status: string
      comment: string | null
      decidedAt: string | null
      approver: { id: string; name: string }
    }[]
  } | null
}

export default function InvoiceDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [invoice, setInvoice] = useState<InvoiceDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [actionLoading, setActionLoading] = useState(false)

  const fetchInvoice = useCallback(async () => {
    const res = await fetch(`/api/invoices/${params.id}`)
    if (res.ok) {
      setInvoice(await res.json())
    }
    setLoading(false)
  }, [params.id])

  useEffect(() => {
    fetchInvoice()
  }, [fetchInvoice])

  async function handleSubmit() {
    setActionLoading(true)
    const res = await fetch(`/api/invoices/${params.id}/submit`, { method: "POST" })
    setActionLoading(false)
    if (res.ok) fetchInvoice()
  }

  async function handleApprove() {
    setActionLoading(true)
    const res = await fetch(`/api/invoices/${params.id}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
    setActionLoading(false)
    if (res.ok) fetchInvoice()
  }

  async function handleReject() {
    const comment = prompt("却下理由を入力してください")
    if (comment === null) return

    setActionLoading(true)
    const res = await fetch(`/api/invoices/${params.id}/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment }),
    })
    setActionLoading(false)
    if (res.ok) fetchInvoice()
  }

  async function handleDelete() {
    if (!confirm("この請求書を削除しますか？")) return
    const res = await fetch(`/api/invoices/${params.id}`, { method: "DELETE" })
    if (res.ok) {
      router.push("/invoices")
      router.refresh()
    }
  }

  if (loading) {
    return <div className="py-8 text-center text-muted-foreground">読み込み中...</div>
  }

  if (!invoice) {
    return <div className="py-8 text-center text-muted-foreground">請求書が見つかりません</div>
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{invoice.invoiceNumber}</h1>
          <p className="text-sm text-muted-foreground mt-1">{invoice.subject}</p>
        </div>
        <div className="flex items-center gap-2">
          <InvoiceStatusBadge status={invoice.status} />
          {invoice.status === "DRAFT" && (
            <>
              <Button onClick={handleSubmit} disabled={actionLoading}>
                提出
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={actionLoading}>
                削除
              </Button>
            </>
          )}
          {invoice.status === "SUBMITTED" && (
            <>
              <Button onClick={handleApprove} disabled={actionLoading}>
                承認
              </Button>
              <Button variant="destructive" onClick={handleReject} disabled={actionLoading}>
                却下
              </Button>
            </>
          )}
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>請求情報</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-medium text-muted-foreground">案件</dt>
              <dd>{invoice.project.projectCode} - {invoice.project.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">請求元</dt>
              <dd>{invoice.issuer.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">請求先</dt>
              <dd>{invoice.receiver.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">作成者</dt>
              <dd>{invoice.createdBy.name}</dd>
            </div>
            {invoice.purchaseOrder && (
              <div>
                <dt className="font-medium text-muted-foreground">関連発注書</dt>
                <dd>{invoice.purchaseOrder.orderNumber} - {invoice.purchaseOrder.subject}</dd>
              </div>
            )}
            <div>
              <dt className="font-medium text-muted-foreground">支払期限</dt>
              <dd>{invoice.dueDate ? formatDate(invoice.dueDate) : "-"}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">作成日</dt>
              <dd>{formatDate(invoice.createdAt)}</dd>
            </div>
            {invoice.notes && (
              <div className="col-span-2">
                <dt className="font-medium text-muted-foreground">備考</dt>
                <dd className="whitespace-pre-wrap">{invoice.notes}</dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>明細</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-8">#</TableHead>
                <TableHead>品名</TableHead>
                <TableHead>仕様</TableHead>
                <TableHead className="text-right">数量</TableHead>
                <TableHead>単位</TableHead>
                <TableHead className="text-right">単価</TableHead>
                <TableHead className="text-right">金額</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell>{item.itemOrder}</TableCell>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>{item.specification || "-"}</TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell>{item.unit}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.unitPrice)}</TableCell>
                  <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          <div className="mt-4 flex justify-end">
            <div className="w-64 space-y-2">
              <div className="flex justify-between text-sm">
                <span>小計</span>
                <span>{formatCurrency(invoice.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>消費税（{invoice.taxRate * 100}%）</span>
                <span>{formatCurrency(invoice.taxAmount)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 font-bold">
                <span>合計</span>
                <span>{formatCurrency(invoice.totalAmount)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {invoice.approvalFlow && (
        <Card>
          <CardHeader>
            <CardTitle>承認フロー</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>順序</TableHead>
                  <TableHead>承認者</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead>コメント</TableHead>
                  <TableHead>決定日時</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.approvalFlow.steps.map((step) => (
                  <TableRow key={step.id}>
                    <TableCell>{step.stepOrder}</TableCell>
                    <TableCell>{step.approver.name}</TableCell>
                    <TableCell>
                      <InvoiceStatusBadge status={step.status === "PENDING" ? "SUBMITTED" : step.status} />
                    </TableCell>
                    <TableCell>{step.comment || "-"}</TableCell>
                    <TableCell>{step.decidedAt ? formatDate(step.decidedAt) : "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
