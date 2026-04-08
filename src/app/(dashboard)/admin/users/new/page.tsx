"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface Company {
  id: string
  name: string
}

export default function NewUserPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [companies, setCompanies] = useState<Company[]>([])

  useEffect(() => {
    fetch("/api/companies")
      .then((res) => res.json())
      .then((data) => setCompanies(data))
  }, [])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      name: formData.get("name"),
      email: formData.get("email"),
      password: formData.get("password"),
      role: formData.get("role"),
      companyId: formData.get("companyId"),
    }

    try {
      const res = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push("/admin/users")
        router.refresh()
      } else {
        const result = await res.json()
        setError(result.error || "ユーザーの作成に失敗しました")
      }
    } catch {
      setError("ユーザーの作成に失敗しました")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">ユーザー新規登録</h1>
      <Card>
        <CardHeader>
          <CardTitle>ユーザー情報</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">名前 *</Label>
              <Input id="name" name="name" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">メール *</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード *</Label>
              <Input id="password" name="password" type="password" required />
              <p className="text-xs text-muted-foreground">
                8文字以上、大文字・小文字・数字を含めてください
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">ロール *</Label>
                <Select id="role" name="role" required>
                  <option value="">選択してください</option>
                  <option value="ADMIN">管理者</option>
                  <option value="CONTRACTOR">元請</option>
                  <option value="SUBCONTRACTOR">協力会社</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyId">会社 *</Label>
                <Select id="companyId" name="companyId" required>
                  <option value="">選択してください</option>
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </Select>
              </div>
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
