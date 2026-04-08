"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { formatCurrency } from "@/lib/utils"
import { Plus, Trash2 } from "lucide-react"

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

interface OrderItem {
  name: string
  specification: string
  quantity: number
  unit: string
  unitPrice: number
  amount: number
}

const UNITS = ["式", "m", "m²", "m³", "kg", "本", "台", "個", "セット"]

function createEmptyItem(): OrderItem {
  return { name: "", specification: "", quantity: 1, unit: "式", unitPrice: 0, amount: 0 }
}

export default function NewOrderPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])
  const [companies, setCompanies] = useState<Company[]>([])
  const [items, setItems] = useState<OrderItem[]>([createEmptyItem()])

  useEffect(() => {
    fetch("/api/projects")
      .then((res) => res.json())
      .then(setProjects)
    fetch("/api/companies?type=SUBCONTRACTOR")
      .then((res) => res.json())
      .then(setCompanies)
  }, [])

  function updateItem(index: number, field: keyof OrderItem, value: string | number) {
    setItems((prev) => {
      const updated = [...prev]
      updated[index] = { ...updated[index], [field]: value }
      // Auto-calculate amount
      if (field === "quantity" || field === "unitPrice") {
        const quantity = field === "quantity" ? Number(value) : updated[index].quantity
        const unitPrice = field === "unitPrice" ? Number(value) : updated[index].unitPrice
        updated[index].amount = quantity * unitPrice
      }
      return updated
    })
  }

  function addItem() {
    setItems((prev) => [...prev, createEmptyItem()])
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index))
  }

  const subtotal = items.reduce((sum, item) => sum + item.amount, 0)
  const taxAmount = Math.floor(subtotal * 0.1)
  const totalAmount = subtotal + taxAmount

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      projectId: formData.get("projectId"),
      receiverId: formData.get("receiverId"),
      subject: formData.get("subject"),
      orderType: formData.get("orderType"),
      deliveryDeadline: formData.get("deliveryDeadline") || undefined,
      notes: formData.get("notes") || undefined,
      items: items.filter((item) => item.name),
    }

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    setLoading(false)

    if (res.ok) {
      router.push("/orders")
      router.refresh()
    }
  }

  return (
    <div className="max-w-5xl">
      <h1 className="mb-6 text-2xl font-bold">発注書新規作成</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>基本情報</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="projectId">案件選択 *</Label>
                <Select id="projectId" name="projectId" required>
                  <option value="">選択してください</option>
                  {projects.map((project) => (
                    <option key={project.id} value={project.id}>
                      {project.projectCode} - {project.name}
                    </option>
                  ))}
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="receiverId">協力会社選択 *</Label>
                <Select id="receiverId" name="receiverId" required>
                  <option value="">選択してください</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="subject">件名 *</Label>
                <Input id="subject" name="subject" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="orderType">発注種別</Label>
                <Select id="orderType" name="orderType">
                  <option value="">選択してください</option>
                  <option value="工事">工事</option>
                  <option value="材料">材料</option>
                  <option value="その他">その他</option>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deliveryDeadline">納期</Label>
                <Input id="deliveryDeadline" name="deliveryDeadline" type="date" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="notes">備考</Label>
              <Textarea id="notes" name="notes" rows={3} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>明細</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-sm border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-8">#</TableHead>
                    <TableHead>品名</TableHead>
                    <TableHead>仕様</TableHead>
                    <TableHead className="w-24">数量</TableHead>
                    <TableHead className="w-24">単位</TableHead>
                    <TableHead className="w-32">単価</TableHead>
                    <TableHead className="w-32 text-right">金額</TableHead>
                    <TableHead className="w-12"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {items.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell className="text-center">{index + 1}</TableCell>
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
                          value={item.quantity}
                          onChange={(e) => updateItem(index, "quantity", Number(e.target.value))}
                          min={0}
                          step="0.01"
                        />
                      </TableCell>
                      <TableCell>
                        <Select
                          value={item.unit}
                          onChange={(e) => updateItem(index, "unit", e.target.value)}
                        >
                          {UNITS.map((unit) => (
                            <option key={unit} value={unit}>
                              {unit}
                            </option>
                          ))}
                        </Select>
                      </TableCell>
                      <TableCell>
                        <Input
                          type="number"
                          value={item.unitPrice}
                          onChange={(e) => updateItem(index, "unitPrice", Number(e.target.value))}
                          min={0}
                        />
                      </TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(item.amount)}
                      </TableCell>
                      <TableCell>
                        {items.length > 1 && (
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => removeItem(index)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="mt-4">
              <Button type="button" variant="outline" onClick={addItem}>
                <Plus className="mr-2 h-4 w-4" />
                行を追加
              </Button>
            </div>
            <div className="mt-6 flex justify-end">
              <div className="w-72 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>小計</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>消費税（10%）</span>
                  <span>{formatCurrency(taxAmount)}</span>
                </div>
                <div className="flex justify-between border-t pt-2 text-lg font-bold">
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
