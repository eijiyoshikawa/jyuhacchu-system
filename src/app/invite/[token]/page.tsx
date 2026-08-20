"use client"

import { use, useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
// 招待受諾は電子取引類型ツール専用のフローのためブランドを固定する
import { DSYSTEM_BRAND } from "@/lib/brand"

interface PageProps {
  params: Promise<{ token: string }>
}

interface InvitationInfo {
  invitedCompanyName: string
  invitedContactName: string | null
  invitedContactEmail: string
  inviterUserName: string
  message: string | null
  expiresAt: string
  createdAt: string
}

export default function InviteAcceptPage({ params }: PageProps) {
  const { token } = use(params)
  const router = useRouter()
  const [invitation, setInvitation] = useState<InvitationInfo | null>(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    async function load() {
      const res = await fetch(`/api/invitations/${token}`)
      if (cancelled) return
      if (res.ok) {
        setInvitation(await res.json())
      } else {
        const data = await res.json().catch(() => ({}))
        setLoadError(data.error || "招待情報の取得に失敗しました")
      }
      setLoading(false)
    }
    void load()
    return () => {
      cancelled = true
    }
  }, [token])

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSubmitting(true)
    setSubmitError(null)

    const formData = new FormData(e.currentTarget)
    const body = {
      companyCode: formData.get("companyCode"),
      companyPostalCode: formData.get("companyPostalCode") || undefined,
      companyAddress: formData.get("companyAddress") || undefined,
      companyPhone: formData.get("companyPhone") || undefined,
      companyRegistrationNumber: formData.get("companyRegistrationNumber") || undefined,
      userName: formData.get("userName"),
      userEmail: formData.get("userEmail"),
      password: formData.get("password"),
    }

    const res = await fetch(`/api/invitations/${token}/accept`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })

    setSubmitting(false)

    if (res.ok) {
      setSuccessMessage("アカウントを作成しました。ログイン画面へ移動します。")
      setTimeout(() => router.push("/auth/login"), 2000)
    } else {
      const data = await res.json().catch(() => ({}))
      setSubmitError(data.error || "アカウント作成に失敗しました")
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <p className="text-sm text-slate-500">招待情報を読み込み中...</p>
      </div>
    )
  }

  if (loadError || !invitation) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-red-600">招待をご利用いただけません</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <p className="text-sm text-slate-700">{loadError}</p>
            <p className="text-xs text-slate-500">
              招待URLの有効期限が切れているか、既に受諾済み、または取消されている可能性があります。
              招待いただいた発注者へお問い合わせください。
            </p>
            <div className="pt-2">
              <Link href="/" className="text-xs text-orange-600 hover:underline">
                ホームに戻る
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-100 py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center">
          <h1 className="text-xl sm:text-2xl font-black text-slate-800">
            {DSYSTEM_BRAND.logoBase}
            <span className="text-orange-500">{DSYSTEM_BRAND.logoAccent}</span>
            {DSYSTEM_BRAND.logoSuffix}
          </h1>
          <p className="text-xs text-slate-500 mt-1">{DSYSTEM_BRAND.tagline}</p>
        </div>

        <Card className="border-orange-200">
          <CardHeader className="bg-orange-50 border-b border-orange-200">
            <CardTitle className="text-base text-orange-900">📨 招待を受け取りました</CardTitle>
            <CardDescription className="text-orange-800">
              <strong>{invitation.inviterUserName} 様</strong>より、電子取引プラットフォームへの
              招待をお受け取りいただきました。
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 pt-4">
            <dl className="text-sm space-y-2">
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 text-slate-500">招待先会社</dt>
                <dd className="font-medium">{invitation.invitedCompanyName}</dd>
              </div>
              {invitation.invitedContactName && (
                <div className="flex gap-2">
                  <dt className="w-28 shrink-0 text-slate-500">担当者</dt>
                  <dd>{invitation.invitedContactName} 様</dd>
                </div>
              )}
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 text-slate-500">メール</dt>
                <dd className="font-mono text-xs">{invitation.invitedContactEmail}</dd>
              </div>
              <div className="flex gap-2">
                <dt className="w-28 shrink-0 text-slate-500">有効期限</dt>
                <dd className="text-xs">{new Date(invitation.expiresAt).toLocaleString("ja-JP")}</dd>
              </div>
            </dl>
            {invitation.message && (
              <div className="rounded-sm border border-slate-200 bg-slate-50 p-3 text-sm">
                <p className="text-xs text-slate-500 mb-1">招待メッセージ</p>
                <p className="whitespace-pre-wrap">{invitation.message}</p>
              </div>
            )}
            <div className="rounded-sm border-2 border-green-400 bg-green-50 p-3 text-sm text-green-900">
              <p className="font-bold">✅ 受注側企業のご負担は一切ありません（完全無償）</p>
              <p className="text-xs mt-1">
                本アカウントは発注側企業が費用負担する電子取引プラットフォームの招待型アカウントです。
                貴社は費用ゼロで発注書受領・請求書提出等の電子取引機能をご利用いただけます。
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-base">アカウント作成フォーム</CardTitle>
            <CardDescription>
              以下の情報を入力してアカウントを作成してください。
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <section className="space-y-3">
                <h2 className="text-sm font-bold text-slate-700 border-l-4 border-orange-500 pl-2">
                  会社情報
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="companyCode">会社コード（社内識別用の英数字） *</Label>
                  <Input
                    id="companyCode"
                    name="companyCode"
                    required
                    maxLength={50}
                    placeholder="例: TANAKA-001"
                  />
                  <p className="text-[11px] text-slate-500">
                    貴社を一意に識別するコード。他社と重複しない英数字を指定してください。
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="companyPostalCode">郵便番号</Label>
                    <Input id="companyPostalCode" name="companyPostalCode" placeholder="150-0001" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="companyPhone">電話番号</Label>
                    <Input id="companyPhone" name="companyPhone" placeholder="03-1234-5678" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyAddress">住所</Label>
                  <Input id="companyAddress" name="companyAddress" placeholder="東京都渋谷区..." />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="companyRegistrationNumber">
                    適格請求書発行事業者登録番号（インボイス番号）
                  </Label>
                  <Input
                    id="companyRegistrationNumber"
                    name="companyRegistrationNumber"
                    placeholder="T1234567890123"
                    pattern="^T\d{13}$"
                    title="T + 13桁の数字"
                  />
                  <p className="text-[11px] text-slate-500">
                    T から始まる13桁の数字。未登録の場合は空欄で構いません（後から登録可）。
                  </p>
                </div>
              </section>

              <section className="space-y-3">
                <h2 className="text-sm font-bold text-slate-700 border-l-4 border-orange-500 pl-2">
                  管理者アカウント
                </h2>
                <div className="space-y-2">
                  <Label htmlFor="userName">担当者名 *</Label>
                  <Input id="userName" name="userName" required placeholder="田中 太郎" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="userEmail">ログイン用メールアドレス *</Label>
                  <Input
                    id="userEmail"
                    name="userEmail"
                    type="email"
                    required
                    defaultValue={invitation.invitedContactEmail}
                  />
                  <p className="text-[11px] text-slate-500">
                    招待時のメールアドレスを初期表示しています。別のアドレスに変更可能です。
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">パスワード *</Label>
                  <Input
                    id="password"
                    name="password"
                    type="password"
                    required
                    minLength={8}
                  />
                  <p className="text-[11px] text-slate-500">
                    8文字以上、英大文字・小文字・数字を各1文字以上含めてください。
                  </p>
                </div>
              </section>

              {submitError && (
                <div className="rounded-sm border border-red-300 bg-red-50 p-3 text-sm text-red-800">
                  {submitError}
                </div>
              )}
              {successMessage && (
                <div className="rounded-sm border border-green-300 bg-green-50 p-3 text-sm text-green-800">
                  {successMessage}
                </div>
              )}

              <div className="pt-2">
                <Button
                  type="submit"
                  disabled={submitting || !!successMessage}
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                >
                  {submitting ? "作成中..." : "無償アカウントを作成する"}
                </Button>
                <p className="text-[11px] text-slate-500 text-center mt-2">
                  作成することで
                  <Link href="/terms" className="text-orange-600 hover:underline">利用規約</Link>
                  および
                  <Link href="/privacy" className="text-orange-600 hover:underline">プライバシーポリシー</Link>
                  に同意したものとみなされます。
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
