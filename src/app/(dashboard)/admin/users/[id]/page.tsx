"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface User {
  id: string
  name: string
  email: string
  role: string
  companyId: string
  company: { id: string; name: string }
}

interface Company {
  id: string
  name: string
}

export default function EditUserPage() {
  const router = useRouter()
  const params = useParams()
  const [user, setUser] = useState<User | null>(null)
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch(`/api/users/${params.id}`).then((res) => res.json()),
      fetch("/api/companies").then((res) => res.json()),
    ]).then(([userData, companiesData]) => {
      setUser(userData)
      setCompanies(companiesData)
    })
  }, [params.id])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const data: Record<string, unknown> = {
      name: formData.get("name"),
      email: formData.get("email"),
      role: formData.get("role"),
      companyId: formData.get("companyId"),
    }

    const password = formData.get("password") as string
    if (password) {
      data.password = password
    }

    try {
      const res = await fetch(`/api/users/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (res.ok) {
        router.push("/admin/users")
        router.refresh()
      } else {
        const result = await res.json()
        setError(result.error || "ユーザーの更新に失敗しました")
      }
    } catch {
      setError("ユーザーの更新に失敗しました")
    } finally {
      setLoading(false)
    }
  }

  async function handleDelete() {
    setLoading(true)
    try {
      const res = await fetch(`/api/users/${params.id}`, {
        method: "DELETE",
      })

      if (res.ok) {
        router.push("/admin/users")
        router.refresh()
      } else {
        const result = await res.json()
        setError(result.error || "ユーザーの削除に失敗しました")
      }
    } catch {
      setError("ユーザーの削除に失敗しました")
    } finally {
      setLoading(false)
      setShowDeleteConfirm(false)
    }
  }

  if (!user) return <div className="text-center py-8">読み込み中...</div>

  return (
    <div className="max-w-2xl mx-auto sm:mx-0">
      <h1 className="mb-6 text-xl sm:text-2xl font-bold">ユーザー編集</h1>
      <Card>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
        </CardHeader>
        <CardContent>
          {error && (
            <div className="mb-4 rounded-sm border border-red-200 bg-red-50 p-3 text-sm text-red-800">
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">名前</Label>
              <Input id="name" name="name" defaultValue={user.name} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">メール</Label>
              <Input
                id="email"
                name="email"
                type="email"
                defaultValue={user.email}
                required
              />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="role">ロール</Label>
                <Select id="role" name="role" defaultValue={user.role} required>
                  <option value="ADMIN">管理者</option>
                  <option value="CONTRACTOR">発注担当</option>
                  <option value="SUBCONTRACTOR">受注担当</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="companyId">会社</Label>
                <Select
                  id="companyId"
                  name="companyId"
                  defaultValue={user.companyId}
                  required
                >
                  {companies.map((company) => (
                    <option key={company.id} value={company.id}>
                      {company.name}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">パスワード（変更する場合のみ）</Label>
              <Input id="password" name="password" type="password" />
              <p className="text-xs text-muted-foreground">
                空欄の場合、パスワードは変更されません
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 pt-4">
              <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                {loading ? "保存中..." : "更新"}
              </Button>
              <Button type="button" variant="outline" onClick={() => router.back()} className="w-full sm:w-auto">
                戻る
              </Button>
              <div className="hidden sm:block sm:flex-1" />
              {showDeleteConfirm ? (
                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <span className="text-sm text-red-600">本当に削除しますか？</span>
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={handleDelete}
                    disabled={loading}
                    className="w-full sm:w-auto"
                  >
                    削除する
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowDeleteConfirm(false)}
                    className="w-full sm:w-auto"
                  >
                    キャンセル
                  </Button>
                </div>
              ) : (
                <Button
                  type="button"
                  variant="destructive"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full sm:w-auto"
                >
                  削除
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
