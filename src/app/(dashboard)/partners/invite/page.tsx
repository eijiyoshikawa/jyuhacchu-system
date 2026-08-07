"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatDate } from "@/lib/utils"

interface Invitation {
  id: string
  token: string
  invitedCompanyName: string
  invitedContactName: string | null
  invitedContactEmail: string
  inviterUserName: string
  status: "PENDING" | "ACCEPTED" | "REVOKED" | "EXPIRED"
  createdAt: string
  expiresAt: string
  acceptedAt: string | null
}

const STATUS_LABELS: Record<Invitation["status"], string> = {
  PENDING: "招待中",
  ACCEPTED: "受諾済",
  REVOKED: "取消済",
  EXPIRED: "期限切れ",
}

function statusColor(s: Invitation["status"]) {
  switch (s) {
    case "PENDING": return "bg-yellow-100 text-yellow-800 border-yellow-300"
    case "ACCEPTED": return "bg-green-100 text-green-800 border-green-300"
    case "REVOKED": return "bg-slate-200 text-slate-600 border-slate-300"
    case "EXPIRED": return "bg-red-100 text-red-800 border-red-300"
  }
}

export default function InvitePartnerPage() {
  const [invitations, setInvitations] = useState<Invitation[]>([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string; url?: string } | null>(null)
  const [origin, setOrigin] = useState("")

  useEffect(() => {
    if (typeof window !== "undefined") setOrigin(window.location.origin)
    void refresh()
  }, [])

  async function refresh() {
    const res = await fetch("/api/invitations")
    if (res.ok) setInvitations(await res.json())
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)
    setMessage(null)

    const formData = new FormData(e.currentTarget)
    const body = {
      invitedCompanyName: formData.get("invitedCompanyName"),
      invitedContactName: formData.get("invitedContactName") || undefined,
      invitedContactEmail: formData.get("invitedContactEmail"),
      message: formData.get("message") || undefined,
    }

    const res = await fetch("/api/invitations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    setLoading(false)

    if (res.ok) {
      const data = await res.json()
      const url = `${origin}/invite/${data.token}`
      setMessage({
        type: "success",
        text: "招待を発行しました。以下のURLを取引先へ送付してください（受注企業側は無料でアカウント作成できます）。",
        url,
      })
      e.currentTarget.reset()
      void refresh()
    } else {
      const data = await res.json().catch(() => ({}))
      setMessage({ type: "error", text: data.error || "招待の発行に失敗しました" })
    }
  }

  async function handleRevoke(token: string) {
    if (!confirm("この招待を取消しますか？取消後は受注側は招待URLを利用できなくなります。")) return
    const res = await fetch(`/api/invitations/${token}`, { method: "DELETE" })
    if (res.ok) void refresh()
  }

  async function copyToClipboard(text: string) {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text)
      setMessage({ type: "success", text: "URLをクリップボードにコピーしました" })
    }
  }

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-xl sm:text-2xl font-bold">取引先招待（無償アカウント発行）</h1>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          発注側企業から取引先（受注側企業）に対して、
          <strong className="text-orange-600">無償でアカウントを発行</strong>
          するためのフローです。
          発行された招待URLを取引先にメール等でお伝えください。
          取引先はURLから会社情報・担当者情報を入力してアカウントを作成でき、
          <strong>受注側の費用負担は発生しません</strong>。
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>新規招待の発行</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="invitedCompanyName">招待先 会社名 *</Label>
              <Input id="invitedCompanyName" name="invitedCompanyName" required placeholder="例: 株式会社 田中サービス" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="invitedContactName">担当者名</Label>
                <Input id="invitedContactName" name="invitedContactName" placeholder="例: 田中 太郎" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="invitedContactEmail">担当者メールアドレス *</Label>
                <Input id="invitedContactEmail" name="invitedContactEmail" type="email" required placeholder="tanaka@example.co.jp" />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">招待メッセージ（任意）</Label>
              <Textarea id="message" name="message" rows={3} placeholder="例: 弊社の受発注システムをご案内します。無料でアカウント発行いたしますので、以下のリンクからご登録をお願いします。" />
            </div>
            <div className="rounded-sm border border-orange-300 bg-orange-50 p-3 text-xs leading-relaxed text-orange-900">
              <p className="font-bold mb-1">📌 電子取引プラットフォーム 招待型アカウント発行について</p>
              <p>本機能は「発注側企業が取引先（受注側企業）に無償でアカウントを発行するクラウド型電子取引プラットフォーム」の仕組みです。招待URLを受け取った取引先は、費用負担なくアカウントを作成し、発注書受領・請求書提出等の電子取引を行えます。</p>
            </div>
            <div className="flex gap-2 pt-2">
              <Button type="submit" disabled={loading}>
                {loading ? "発行中..." : "招待URLを発行"}
              </Button>
            </div>
          </form>

          {message && (
            <div className={
              "mt-4 rounded-sm border p-3 text-sm " +
              (message.type === "success"
                ? "border-green-300 bg-green-50 text-green-900"
                : "border-red-300 bg-red-50 text-red-900")
            }>
              <p>{message.text}</p>
              {message.url && (
                <div className="mt-2 flex flex-col sm:flex-row gap-2 sm:items-center">
                  <input
                    type="text"
                    value={message.url}
                    readOnly
                    className="flex-1 rounded-sm border border-slate-300 bg-white px-3 py-2 text-xs font-mono"
                    onFocus={(e) => e.currentTarget.select()}
                  />
                  <Button type="button" variant="outline" size="sm" onClick={() => copyToClipboard(message.url!)}>
                    URLをコピー
                  </Button>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>発行済みの招待一覧</CardTitle>
        </CardHeader>
        <CardContent>
          {invitations.length === 0 ? (
            <p className="text-sm text-slate-500 py-4 text-center">まだ招待を発行していません。</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 text-left text-xs text-slate-600">
                    <th className="py-2 pr-3">招待先</th>
                    <th className="py-2 pr-3">担当者</th>
                    <th className="py-2 pr-3">メール</th>
                    <th className="py-2 pr-3">ステータス</th>
                    <th className="py-2 pr-3">発行日</th>
                    <th className="py-2 pr-3">期限</th>
                    <th className="py-2 pr-3">操作</th>
                  </tr>
                </thead>
                <tbody>
                  {invitations.map((inv) => {
                    const url = `${origin}/invite/${inv.token}`
                    return (
                      <tr key={inv.id} className="border-b border-slate-100">
                        <td className="py-2 pr-3">{inv.invitedCompanyName}</td>
                        <td className="py-2 pr-3">{inv.invitedContactName || "-"}</td>
                        <td className="py-2 pr-3 font-mono text-xs">{inv.invitedContactEmail}</td>
                        <td className="py-2 pr-3">
                          <span className={"inline-block rounded-sm border px-2 py-0.5 text-xs font-bold " + statusColor(inv.status)}>
                            {STATUS_LABELS[inv.status]}
                          </span>
                        </td>
                        <td className="py-2 pr-3 text-xs">{formatDate(inv.createdAt)}</td>
                        <td className="py-2 pr-3 text-xs">{formatDate(inv.expiresAt)}</td>
                        <td className="py-2 pr-3">
                          {inv.status === "PENDING" && (
                            <div className="flex flex-col gap-1">
                              <Button type="button" variant="outline" size="sm" onClick={() => copyToClipboard(url)}>
                                URLコピー
                              </Button>
                              <Button type="button" variant="outline" size="sm" onClick={() => handleRevoke(inv.token)}>
                                取消
                              </Button>
                            </div>
                          )}
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
