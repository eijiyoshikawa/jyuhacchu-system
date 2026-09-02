"use client"

import { useState } from "react"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useSystemBrand } from "@/components/use-system-brand"

export default function LoginPage() {
  const router = useRouter()
  const brand = useSystemBrand()
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get("email") as string
    const password = formData.get("password") as string

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    })

    setLoading(false)

    if (result?.error) {
      setError("メールアドレスまたはパスワードが正しくありません")
    } else {
      router.push("/")
      router.refresh()
    }
  }

  const legal = (
    <p className="text-center text-xs text-slate-400">
      ログインすることで、
      <Link href="/terms" className="underline hover:no-underline">
        利用規約
      </Link>
      {" "}および{" "}
      <Link href="/privacy" className="underline hover:no-underline">
        プライバシーポリシー
      </Link>
      {" "}に同意したものとみなされます。
    </p>
  )

  const fields = (
    <>
            {error && (
              <div className="rounded border border-red-300 bg-red-50 p-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700">
                メールアドレス
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@company.co.jp"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-slate-700">
                パスワード
              </Label>
              <Input id="password" name="password" type="password" required />
            </div>
    </>
  )

  // ── 電子取引くん: 左に製品紹介パネル・右にフォームの2カラム構成 ──
  // 受発注Lシステム（濃紺背景に中央カード）とは骨格から分ける。
  if (brand.key === "dsystem") {
    return (
      <div className="flex min-h-screen flex-col lg:flex-row">
        <aside className="flex flex-col justify-between bg-slate-900 px-8 py-10 text-white lg:w-[46%] lg:px-14 lg:py-16">
          <div>
            <p className="text-2xl font-black tracking-tight">
              {brand.logoBase}
              <span className={brand.theme.accentTextOnDark}>{brand.logoAccent}</span>
              {brand.logoSuffix}
            </p>
            <p className="mt-1 text-xs text-slate-400">{brand.tagline}</p>
          </div>
          <div className="mt-10 lg:mt-0">
            <h1 className="text-xl font-bold leading-relaxed lg:text-2xl">
              取引先を<span className={brand.theme.accentTextOnDark}>無償で招待</span>して、
              <br />
              発注から請求までを電子化する。
            </h1>
            <ul className="mt-6 space-y-3 text-sm text-slate-300">
              {[
                "受注側企業のアカウント利用料は 0円",
                "適格請求書発行事業者登録番号を国税庁APIで自動検証",
                "電子帳簿保存法の検索要件3項目に標準対応",
              ].map((t) => (
                <li key={t} className="flex gap-2">
                  <span className={brand.theme.accentTextOnDark}>―</span>
                  <span>{t}</span>
                </li>
              ))}
            </ul>
          </div>
          <p className="mt-10 text-[11px] text-slate-500 lg:mt-0">
            © 2026 株式会社LET
          </p>
        </aside>

        <main className="flex flex-1 items-center justify-center px-6 py-12">
          <div className="w-full max-w-sm">
            <h2 className="text-lg font-bold text-slate-900">ログイン</h2>
            <p className="mt-1 text-xs text-slate-500">
              発注側企業・受注側企業のどちらのアカウントでもご利用いただけます。
            </p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              {fields}
              <Button
                type="submit"
                className="w-full rounded-lg bg-teal-600 text-white hover:bg-teal-700"
                disabled={loading}
              >
                {loading ? "ログイン中..." : "ログイン"}
              </Button>
            </form>
            <div className="mt-6">{legal}</div>
          </div>
        </main>
      </div>
    )
  }

  // ── 受発注Lシステム: 従来デザイン（変更しない） ──
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a2332] px-4 sm:px-0">
      <Card className="w-full max-w-md border-0 rounded-sm shadow-2xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-black tracking-tight text-slate-800">
            {brand.logoBase}<span className="text-orange-500">{brand.logoAccent}</span>{brand.logoSuffix}
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            {brand.tagline}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields}
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={loading}>
              {loading ? "ログイン中..." : "ログイン"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <div className="w-full">{legal}</div>
        </CardFooter>
      </Card>
        </div>
  )
}
