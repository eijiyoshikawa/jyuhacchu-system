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

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#1a2332] px-4 sm:px-0">
      <Card className="w-full max-w-md border-0 rounded-sm shadow-2xl">
        <CardHeader className="text-center pb-2">
          <CardTitle className="text-2xl font-black tracking-tight text-slate-800">
            {brand.namePrefix}<span className="text-orange-500">L</span>システム
          </CardTitle>
          <CardDescription className="text-sm text-slate-500">
            {brand.tagline}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="rounded-sm border border-red-300 bg-red-50 p-3 text-sm font-medium text-red-700">
                {error}
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-semibold text-slate-700">メールアドレス</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="example@company.co.jp"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-semibold text-slate-700">パスワード</Label>
              <Input
                id="password"
                name="password"
                type="password"
                required
              />
            </div>
            <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white" disabled={loading}>
              {loading ? "ログイン中..." : "ログイン"}
            </Button>
          </form>
        </CardContent>
        <CardFooter>
          <p className="w-full text-center text-xs text-slate-400">
            ログインすることで、
            <Link href="/terms" className="text-orange-500 hover:underline">
              利用規約
            </Link>
            {" "}および{" "}
            <Link href="/privacy" className="text-orange-500 hover:underline">
              プライバシーポリシー
            </Link>
            {" "}に同意したものとみなされます。
          </p>
        </CardFooter>
      </Card>
    </div>
  )
}
