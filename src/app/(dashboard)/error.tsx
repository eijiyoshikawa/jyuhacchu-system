"use client"

import { useEffect } from "react"
import Link from "next/link"
import * as Sentry from "@sentry/nextjs"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
    Sentry.captureException(error)
  }, [error])

  return (
    <div className="flex items-center justify-center p-6">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-center text-xl">エラーが発生しました</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
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
        </CardContent>
      </Card>
    </div>
  )
}
