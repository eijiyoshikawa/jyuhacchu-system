"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-3xl font-bold text-gray-900">エラーが発生しました</h1>
        <details className="rounded-md border bg-gray-50 p-4 text-sm text-gray-600">
          <summary className="cursor-pointer font-medium">エラー詳細</summary>
          <p className="mt-2">{error.message}</p>
        </details>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={reset}>再試行</Button>
          <Link
            href="/"
            className="inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm hover:bg-accent hover:text-accent-foreground"
          >
            ホームに戻る
          </Link>
        </div>
      </div>
    </div>
  )
}
