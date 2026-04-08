"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConfirmDialog } from "@/components/ui/confirm-dialog"

interface Company {
  id: string
  name: string
  code: string
  companyType: string
  postalCode: string | null
  address: string | null
  phone: string | null
  email: string | null
  registrationNumber: string | null
}

export default function PartnerDetailPage() {
  const router = useRouter()
  const params = useParams()
  const [company, setCompany] = useState<Company | null>(null)
  const [loading, setLoading] = useState(false)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    fetch(`/api/companies/${params.id}`)
      .then((res) => res.json())
      .then(setCompany)
  }, [params.id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      code: formData.get("code"),
      companyType: formData.get("companyType"),
      postalCode: formData.get("postalCode") || null,
      address: formData.get("address") || null,
      phone: formData.get("phone") || null,
      email: formData.get("email") || null,
      registrationNumber: formData.get("registrationNumber") || null,
    }

    const res = await fetch(`/api/companies/${params.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    setLoading(false)
    if (res.ok) {
      router.push("/partners")
      router.refresh()
    }
  }

  async function handleDelete() {
    const res = await fetch(`/api/companies/${params.id}`, {
      method: "DELETE",
    })
    if (res.ok) {
      router.push("/partners")
      router.refresh()
    }
  }

  if (!company) return <div className="text-center py-8">読み込み中...</div>

  return (
    <div className="max-w-2xl mx-auto sm:mx-0">
      <h1 className="mb-6 text-xl sm:text-2xl font-bold">会社情報編集</h1>
      <Card>
        <CardHeader>
          <CardTitle>{company.name}</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">会社コード</Label>
                <Input id="code" name="code" defaultValue={company.code} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyType">会社種別</Label>
                <Select id="companyType" name="companyType" defaultValue={company.companyType} required>
                  <option value="GENERAL_CONTRACTOR">元請会社</option>
                  <option value="SUBCONTRACTOR">協力会社</option>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">会社名</Label>
              <Input id="name" name="name" defaultValue={company.name} required />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">郵便番号</Label>
                <Input id="postalCode" name="postalCode" defaultValue={company.postalCode || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">電話番号</Label>
                <Input id="phone" name="phone" defaultValue={company.phone || ""} />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">住所</Label>
              <Input id="address" name="address" defaultValue={company.address || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" name="email" type="email" defaultValue={company.email || ""} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">適格請求書発行事業者登録番号</Label>
              <Input id="registrationNumber" name="registrationNumber" defaultValue={company.registrationNumber || ""} />
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? "保存中..." : "更新"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
                戻る
              </Button>
              <Button
                type="button"
                variant="destructive"
                onClick={() => setShowDeleteConfirm(true)}
                className="w-full sm:w-auto sm:ml-auto"
              >
                削除
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <ConfirmDialog
        open={showDeleteConfirm}
        onOpenChange={setShowDeleteConfirm}
        title="会社情報の削除"
        description="この会社情報を削除してもよろしいですか？この操作は取り消せません。"
        onConfirm={handleDelete}
        confirmLabel="削除"
        variant="destructive"
      />
    </div>
  )
}
