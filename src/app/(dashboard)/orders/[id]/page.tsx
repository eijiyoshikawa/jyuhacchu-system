"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Textarea } from "@/components/ui/textarea"
import { OrderStatusBadge } from "@/components/ui/status-badge"
import { OrderStatusTimeline } from "@/components/orders/order-status-timeline"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"
import { formatCurrency, formatDate } from "@/lib/utils"
import { orderStatusLabels } from "@/lib/auth-helpers"
import Link from "next/link"
import { Printer } from "lucide-react"

interface OrderItem {
  id: string
  itemOrder: number
  name: string
  specification: string | null
  quantity: number
  unit: string
  unitPrice: number
  amount: number
}

interface ApprovalStep {
  id: string
  stepOrder: number
  status: string
  comment: string | null
  decidedAt: string | null
  approver: { id: string; name: string; email: string }
}

interface ApprovalFlow {
  id: string
  status: string
  steps: ApprovalStep[]
}

interface Order {
  id: string
  orderNumber: string
  subject: string
  orderType: string | null
  status: string
  subtotal: number
  taxRate: number
  taxAmount: number
  totalAmount: number
  notes: string | null
  deliveryDeadline: string | null
  createdAt: string
  issuedAt: string | null
  project: { id: string; name: string; projectCode: string }
  issuer: { id: string; name: string }
  receiver: { id: string; name: string }
  createdBy: { id: string; name: string }
  items: OrderItem[]
  approvalFlow: ApprovalFlow | null
}

export default function OrderDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [order, setOrder] = useState<Order | null>(null)
  const [loading, setLoading] = useState(false)
  const [rejectComment, setRejectComment] = useState("")
  const [showRejectForm, setShowRejectForm] = useState(false)
  const [showSubmitConfirm, setShowSubmitConfirm] = useState(false)
  const [showApproveConfirm, setShowApproveConfirm] = useState(false)
  const [showRejectConfirm, setShowRejectConfirm] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  function fetchOrder() {
    fetch(`/api/orders/${params.id}`)
      .then((res) => res.json())
      .then(setOrder)
  }

  useEffect(() => {
    fetchOrder()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id])

  async function handleSubmit() {
    setLoading(true)
    const res = await fetch(`/api/orders/${params.id}/submit`, { method: "POST" })
    setLoading(false)
    if (res.ok) {
      fetchOrder()
    } else {
      const data = await res.json()
      alert(data.error || "エラーが発生しました")
    }
  }

  async function handleApprove() {
    setLoading(true)
    const res = await fetch(`/api/orders/${params.id}/approve`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({}),
    })
    setLoading(false)
    if (res.ok) {
      fetchOrder()
    } else {
      const data = await res.json()
      alert(data.error || "エラーが発生しました")
    }
  }

  async function handleReject() {
    setLoading(true)
    const res = await fetch(`/api/orders/${params.id}/reject`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comment: rejectComment }),
    })
    setLoading(false)
    if (res.ok) {
      setShowRejectForm(false)
      setRejectComment("")
      fetchOrder()
    } else {
      const data = await res.json()
      alert(data.error || "エラーが発生しました")
    }
  }

  async function handleDelete() {
    setLoading(true)
    const res = await fetch(`/api/orders/${params.id}`, { method: "DELETE" })
    setLoading(false)
    if (res.ok) {
      router.push("/orders")
      router.refresh()
    }
  }

  if (!order) return <div className="text-center py-8">読み込み中...</div>

  const orderTypeLabel = order.orderType || "-"

  return (
    <div className="max-w-5xl space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold">発注書詳細</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {order.orderNumber}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Link href={`/orders/${order.id}/print`} target="_blank">
            <Button variant="outline" size="sm">
              <Printer className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">印刷/PDF</span>
              <span className="sm:hidden">印刷</span>
            </Button>
          </Link>
          <OrderStatusBadge status={order.status} />
        </div>
      </div>

      <OrderStatusTimeline currentStatus={order.status} />

      <Card>
        <CardHeader>
          <CardTitle>発注情報</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="font-medium text-muted-foreground">発注番号</dt>
              <dd className="mt-1">{order.orderNumber}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">案件</dt>
              <dd className="mt-1">{order.project.projectCode} - {order.project.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">発注企業</dt>
              <dd className="mt-1">{order.issuer.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">取引先</dt>
              <dd className="mt-1">{order.receiver.name}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">件名</dt>
              <dd className="mt-1">{order.subject}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">発注種別</dt>
              <dd className="mt-1">{orderTypeLabel}</dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">納期</dt>
              <dd className="mt-1">
                {order.deliveryDeadline ? formatDate(order.deliveryDeadline) : "-"}
              </dd>
            </div>
            <div>
              <dt className="font-medium text-muted-foreground">作成者</dt>
              <dd className="mt-1">{order.createdBy.name}</dd>
            </div>
          </dl>
          {order.notes && (
            <div className="mt-4">
              <dt className="text-sm font-medium text-muted-foreground">備考</dt>
              <dd className="mt-1 text-sm whitespace-pre-wrap">{order.notes}</dd>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>明細</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto rounded-sm border">
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
                {order.items.map((item) => (
                  <TableRow key={item.id}>
                    <TableCell className="text-center">{item.itemOrder}</TableCell>
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
          <div className="mt-6 flex justify-end">
            <div className="w-full sm:w-72 space-y-2">
              <div className="flex justify-between text-sm">
                <span>小計</span>
                <span>{formatCurrency(order.subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>消費税（{order.taxRate * 100}%）</span>
                <span>{formatCurrency(order.taxAmount)}</span>
              </div>
              <div className="flex justify-between border-t pt-2 text-lg font-bold">
                <span>合計</span>
                <span>{formatCurrency(order.totalAmount)}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Approval Flow Info */}
      {order.approvalFlow && (
        <Card>
          <CardHeader>
            <CardTitle>承認フロー</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {order.approvalFlow.steps.map((step) => (
                <div
                  key={step.id}
                  className="flex items-center justify-between rounded-sm border p-3"
                >
                  <div>
                    <p className="text-sm font-medium">
                      ステップ {step.stepOrder}: {step.approver.name}
                    </p>
                    {step.comment && (
                      <p className="mt-1 text-sm text-muted-foreground">
                        コメント: {step.comment}
                      </p>
                    )}
                  </div>
                  <div className="text-sm">
                    <OrderStatusBadge
                      status={
                        step.status === "PENDING"
                          ? "PENDING_APPROVAL"
                          : step.status === "APPROVED"
                          ? "APPROVED"
                          : "REJECTED"
                      }
                    />
                    {step.decidedAt && (
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(step.decidedAt)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-2">
        {order.status === "DRAFT" && (
          <>
            <Button onClick={() => setShowSubmitConfirm(true)} disabled={loading} className="w-full sm:w-auto">
              {loading ? "処理中..." : "申請"}
            </Button>
            <Button variant="outline" onClick={() => setShowDeleteConfirm(true)} disabled={loading} className="w-full sm:w-auto">
              削除
            </Button>
          </>
        )}
        {order.status === "PENDING_APPROVAL" && (
          <>
            <Button onClick={() => setShowApproveConfirm(true)} disabled={loading} className="w-full sm:w-auto">
              {loading ? "処理中..." : "承認"}
            </Button>
            <Button
              variant="outline"
              onClick={() => setShowRejectForm(!showRejectForm)}
              disabled={loading}
              className="w-full sm:w-auto"
            >
              却下
            </Button>
          </>
        )}
        <Button variant="outline" onClick={() => router.push("/orders")} className="w-full sm:w-auto">
          一覧に戻る
        </Button>
      </div>

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
              <Button variant="outline" onClick={() => setShowRejectConfirm(true)} disabled={loading}>
                {loading ? "処理中..." : "却下を確定"}
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
        title="発注書の申請"
        description="発注書を申請しますか？申請後は編集できなくなります。"
        onConfirm={handleSubmit}
        confirmLabel="申請"
      />

      <ConfirmDialog
        open={showApproveConfirm}
        onOpenChange={setShowApproveConfirm}
        title="発注書の承認"
        description="この発注書を承認しますか？"
        onConfirm={handleApprove}
        confirmLabel="承認"
      />

      <ConfirmDialog
        open={showRejectConfirm}
        onOpenChange={setShowRejectConfirm}
        title="発注書の却下"
        description="この発注書を却下しますか？"
        onConfirm={handleReject}
        confirmLabel="却下"
        variant="destructive"
      />

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="発注書の削除"
        description="この発注書を削除してもよろしいですか？この操作は取り消せません。"
        onConfirm={handleDelete}
        confirmLabel="削除"
        variant="destructive"
      />
    </div>
  )
}
