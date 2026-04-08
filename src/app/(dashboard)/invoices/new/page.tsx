"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { Plus, Trash2 } from "lucide-react"

interface ItemRow {
  name: string
  specification: string
  quantity: number
  unit: string
  unitPrice: number
  amount: number
}

interface Project {
  id: string
  name: string
  projectCode: string
}

interface Company {
  id: string
  name: string
  code: string
}

interface Order {
  id: string
  orderNumber: string
  subject: string
  items: {
    name: string
    specification: string | null
    quantity: number
    unit: string
    unitPrice: number
    amount: number
  }[]
}

const emptyItem: ItemRow = {
  name: "",
  specification: "",
  quantity: 0,
  unit: "式",
  unitPrice: 0,
  amount: 0,
}

export default function NewInvoicePage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [projectId, setProjectId] = useState("")
  const [receiverId, setReceiverId] = useState("")
  const [purchaseOrderId, setPurchaseOrderId] = useState("")
  const [subject, setSubject] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [notes, setNotes] = useState("")
  const [items, setItems] = useState<ItemRow[]>([{ ...emptyItem }])

  useEffect(() => {
    fetch("/api/projects").then((r) => r.json()).then(setProjects)
    fetch("/api/companies?type=GENERAL_CONTRACTOR").then((r) => r.json()).then(setCompanies)
    fetch("/api/orders").then((r) => r.json()).then(setOrders)
  }, [])

  const calcItem = useCallback((item: ItemRow): ItemRow => {
    return { ...item, amount: item.quantity * item.unitPrice }
  }, [])

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  const taxAmount = Math.floor(subtotal * 0.1)
  const totalAmount = subtotal + taxAmount

  function updateItem(index: number, field: keyof ItemRow, value: string | number) {
    setItems((prev) => {
      const updated = [...prev]
      const item = { ...updated[index], [field]: value }
      updated[index] = calcItem(item)
      return updated
    })
  }

  function addItem() {
    setItems((prev) => [...prev, { ...emptyItem }])
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  function handleOrderChange(orderId: string) {
    setPurchaseOrderId(orderId)
    if (!orderId) return

    const order = orders.find((o) => o.id === orderId)
    if (order && order.items && order.items.length > 0) {
      setItems(
        order.items.map((item) => ({
          name: item.name,
          specification: item.specification || "",
          quantity: item.quantity,
          unit: item.unit,
          unitPrice: item.unitPrice,
          amount: item.amount,
        }))
      )
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const data = {
      projectId,
      receiverId,
      purchaseOrderId: purchaseOrderId || undefined,
      subject,
      dueDate: dueDate || undefined,
      notes: notes || undefined,
      items: items.filter((item) => item.name),
    }

    const res = await fetch("/api/invoices", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    setLoading(false)

    if (res.ok) {
      router.push("/invoices")
      router.refresh()
    }
  }

  return (
    <div className="max-w-4xl">
      <h1 className="mb-6 text-2xl font-bold">請求書新規作成</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectId">案件選択 *</Label>
                <select
                  id="projectId"
                  className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm"
                  value={projectId}
                  onChange={(e) => setProjectId(e.target.value)}
                  required
                >
                  <option value="">選択してください</option>
                  {projects.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.projectCode} - {p.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="receiverId">請求先選択 *</Label>
                <select
                  id="receiverId"
                  className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm"
                  value={receiverId}
                  onChange={(e) => setReceiverId(e.target.value)}
                  required
                >
                  <option value="">選択してください</option>
                  {companies.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchaseOrderId">関連発注書</Label>
              <select
                id="purchaseOrderId"
                className="flex h-10 w-full rounded-sm border border-input bg-background px-3 py-2 text-sm"
                value={purchaseOrderId}
                onChange={(e) => handleOrderChange(e.target.value)}
              >
                <option value="">なし</option>
                {orders.map((o) => (
                  <option key={o.id} value={o.id}>
                    {o.orderNumber} - {o.subject}
                  </option>
                ))}
              </select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="subject">件名 *</Label>
              <Input
                id="subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="dueDate">支払期限</Label>
                <Input
                  id="dueDate"
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">備考</Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              明細
              <Button type="button" variant="outline" size="sm" onClick={addItem}>
                <Plus className="mr-1 h-4 w-4" />
                行追加
              </Button>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-8">#</TableHead>
                  <TableHead>品名</TableHead>
                  <TableHead>仕様</TableHead>
                  <TableHead className="w-20">数量</TableHead>
                  <TableHead className="w-20">単位</TableHead>
                  <TableHead className="w-28">単価</TableHead>
                  <TableHead className="w-28 text-right">金額</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>
                      <Input
                        value={item.name}
                        onChange={(e) => updateItem(index, "name", e.target.value)}
                        placeholder="品名"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.specification}
                        onChange={(e) => updateItem(index, "specification", e.target.value)}
                        placeholder="仕様"
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.quantity || ""}
                        onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        value={item.unit}
                        onChange={(e) => updateItem(index, "unit", e.target.value)}
                      />
                    </TableCell>
                    <TableCell>
                      <Input
                        type="number"
                        value={item.unitPrice || ""}
                        onChange={(e) => updateItem(index, "unitPrice", Number(e.target.value))}
                      />
                    </TableCell>
                    <TableCell className="text-right">{formatCurrency(item.amount)}</TableCell>
                    <TableCell>
                      {items.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(index)}
                        >
                          <Trash2 className="h-4 w-4 text-red-500" />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>

            <div className="mt-4 flex justify-end">
              <div className="w-64 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>小計</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>消費税（10%）</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 font-bold">
                  <span>合計</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-2">
          <Button type="submit" disabled={loading}>
            {loading ? "保存中..." : "登録"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.back()}>
            キャンセル
          </Button>
        </div>
      </form>
    </div>
  )
}
