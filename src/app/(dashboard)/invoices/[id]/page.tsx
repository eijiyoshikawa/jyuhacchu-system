"use client"

import { useState, useEffect, useCallback } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { InvoiceStatusBadge } from "@/components/ui/status-badge"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { formatCurrency, formatDate } from "@/lib/utils"
import Link from "next/link"
import { Printer } from "lucide-react"

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
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [showApproveConfirm, setShowApproveConfirm] = useState(false)
  const [showRejectConfirm, setShowRejectConfirm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [rejectComment, setRejectComment] = useState("")
  const [showRejectForm, setShowRejectForm] = useState(false)

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
    setActionLoading(true)
    const res = await fetch(`/api/invoices/${params.id}/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: rejectComment }),
    })
    setActionLoading(false)
    if (res.ok) {
      setShowRejectForm(false)
      setRejectComment("")
      fetchInvoice()
    }
  }

  async function handleDelete() {
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
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">{invoice.invoiceNumber}</h1>
          <p className="text-sm text-muted-foreground mt-1">{invoice.subject}</p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link href={`/invoices/${invoice.id}/print`} target="_blank">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              印刷/PDF
            </Button>
          </Link>
          <InvoiceStatusBadge status={invoice.status} />
          {invoice.status === "DRAFT" && (
            <>
              <Button onClick={() => setShowSubmitConfirm(true)} disabled={actionLoading}>
                提出
              </Button>
              <Button variant="destructive" onClick={() => setShowDeleteConfirm(true)} disabled={actionLoading}>
                削除
              </Button>
            </>
          )}
          {invoice.status === "SUBMITTED" && (
            <>
              <Button onClick={() => setShowApproveConfirm(true)} disabled={actionLoading}>
                承認
              </Button>
              <Button variant="destructive" onClick={() => setShowRejectForm(!showRejectForm)} disabled={actionLoading}>
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
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
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
          <div className="overflow-x-auto">
            <Table className="min-w-[600px]">
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">#</TableHead>
                  <TableHead>品名</TableHead>
                  <TableHead className="hidden sm:table-cell">仕様</TableHead>
                  <TableHead className="text-right">数量</TableHead>
                  <TableHead>単位</TableHead>
                  <TableHead className="text-right hidden sm:table-cell">単価</TableHead>
                  <TableHead className="text-right">金額</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoice.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.itemOrder}</TableCell>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell className="hidden sm:table-cell">{item.specification || "-"}</TableCell>
                    <TableCell className="text-right">{item.quantity}</TableCell>
                    <TableCell>{item.unit}</TableCell>
                    <TableCell className="text-right hidden sm:table-cell">{formatCurrency(item.unitPrice)}</TableCell>
                    <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          <div className="mt-4 flex justify-end">
            <div className="w-full sm:w-64 space-y-2">
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
            <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>順序</TableHead>
                  <TableHead>承認者</TableHead>
                  <TableHead>ステータス</TableHead>
                  <TableHead className="hidden sm:table-cell">コメント</TableHead>
                  <TableHead className="hidden sm:table-cell">決定日時</TableHead>
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
                    <TableCell className="hidden sm:table-cell">{step.comment || "-"}</TableCell>
                    <TableCell className="hidden sm:table-cell">{step.decidedAt ? formatDate(step.decidedAt) : "-"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Reject Comment Form */}
      {showRejectForm && (
        <Card>
          <CardHeader>
            <CardTitle>却下理由</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              value={rejectComment}
              onChange={(e) => setRejectComment(e.target.value)}
              placeholder="却下理由を入力してください"
              rows={3}
            />
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowRejectConfirm(true)} disabled={actionLoading}>
                {actionLoading ? "処理中..." : "却下を確定"}
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setShowRejectForm(false)
                  setRejectComment("")
                }}
              >
                キャンセル
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <ConfirmDialog
        open={showSubmitConfirm}
        onOpenChange={setShowSubmitConfirm}
        title="請求書の提出"
        description="請求書を提出しますか？提出後は編集できなくなります。"
        onConfirm={handleSubmit}
        confirmLabel="提出"
      />

      <ConfirmDialog
        open={showApproveConfirm}
        onOpenChange={setShowApproveConfirm}
        title="請求書の承認"
        description="この請求書を承認しますか？"
        onConfirm={handleApprove}
        confirmLabel="承認"
      />

      <ConfirmDialog
        open={showRejectConfirm}
        onOpenChange={setShowRejectConfirm}
        title="請求書の却下"
        description="この請求書を却下しますか？"
        onConfirm={handleReject}
        confirmLabel="却下"
        variant="destructive"
      />

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="請求書の削除"
        description="この請求書を削除してもよろしいですか？この操作は取り消せません。"
        onConfirm={handleDelete}
        confirmLabel="削除"
        variant="destructive"
      />
    </div>
  )
}
