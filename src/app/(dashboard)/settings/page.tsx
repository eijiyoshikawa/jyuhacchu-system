"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function SettingsPage() {
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const currentPassword = formData.get("currentPassword") as string
    const newPassword = formData.get("newPassword") as string
    const confirmPassword = formData.get("confirmPassword") as string

    // Client-side validation
    if (newPassword !== confirmPassword) {
      setMessage({ type: "error", text: "新しいパスワードが一致しません" })
      return
    }

    if (newPassword.length < 8) {
      setMessage({ type: "error", text: "パスワードは8文字以上で入力してください" })
      return
    }

    if (!/[A-Z]/.test(newPassword)) {
      setMessage({ type: "error", text: "パスワードに大文字のアルファベットを含めてください" })
      return
    }

    if (!/[a-z]/.test(newPassword)) {
      setMessage({ type: "error", text: "パスワードに小文字のアルファベットを含めてください" })
      return
    }

    if (!/[0-9]/.test(newPassword)) {
      setMessage({ type: "error", text: "パスワードに数字を含めてください" })
      return
    }

    setLoading(true)

    try {
      const res = await fetch("/api/users/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      })

      const data = await res.json()

      if (res.ok) {
        setMessage({ type: "success", text: "パスワードを変更しました" })
        e.currentTarget.reset()
      } else {
        setMessage({ type: "error", text: data.error || "パスワードの変更に失敗しました" })
      }
    } catch {
      setMessage({ type: "error", text: "パスワードの変更に失敗しました" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="max-w-2xl">
      <h1 className="mb-6 text-2xl font-bold">設定</h1>
      <Card>
        <CardHeader>
          <CardTitle>パスワード変更</CardTitle>
        </CardHeader>
        <CardContent>
          {message && (
            <div
              className={`mb-4 rounded-md p-3 text-sm ${
                message.type === "success"
                  ? "bg-green-50 text-green-800 border border-green-200"
                  : "bg-red-50 text-red-800 border border-red-200"
              }`}
            >
              {message.text}
            </div>
          )}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">現在のパスワード</Label>
              <Input
                id="currentPassword"
                name="currentPassword"
                type="password"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="newPassword">新しいパスワード</Label>
              <Input
                id="newPassword"
                name="newPassword"
                type="password"
                required
              />
              <p className="text-xs text-muted-foreground">
                8文字以上、大文字・小文字・数字を含めてください
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirmPassword">新しいパスワード（確認）</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
              />
            </div>
            <div className="pt-4">
              <Button type="submit" disabled={loading}>
                {loading ? "変更中..." : "パスワードを変更"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
