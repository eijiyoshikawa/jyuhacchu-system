"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function NewPartnerPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      code: formData.get("code"),
      companyType: formData.get("companyType"),
      postalCode: formData.get("postalCode") || undefined,
      address: formData.get("address") || undefined,
      phone: formData.get("phone") || undefined,
      email: formData.get("email") || undefined,
      registrationNumber: formData.get("registrationNumber") || undefined,
    }

    const res = await fetch("/api/companies", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })

    setLoading(false)

    if (res.ok) {
      router.push("/partners")
      router.refresh()
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">会社新規登録</h1>
      <Card>
        <CardHeader>
          <CardTitle>会社情報</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="code">会社コード *</Label>
                <Input id="code" name="code" required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyType">会社種別 *</Label>
                <Select id="companyType" name="companyType" required>
                  <option value="">選択してください</option>
                  <option value="GENERAL_CONTRACTOR">元請会社</option>
                  <option value="SUBCONTRACTOR">協力会社</option>
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">会社名 *</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="postalCode">郵便番号</Label>
                <Input id="postalCode" name="postalCode" placeholder="100-0001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">電話番号</Label>
                <Input id="phone" name="phone" placeholder="03-1234-5678" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">住所</Label>
              <Input id="address" name="address" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">メールアドレス</Label>
              <Input id="email" name="email" type="email" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="registrationNumber">適格請求書発行事業者登録番号</Label>
              <Input id="registrationNumber" name="registrationNumber" placeholder="T1234567890123" />
            </div>
            <div className="flex gap-2 pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "保存中..." : "登録"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()}>
                キャンセル
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
