import Link from "next/link"

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold text-gray-300">404</h1>
        <h2 className="text-2xl font-bold text-gray-900">ページが見つかりません</h2>
        <p className="text-gray-600">お探しのページは存在しないか、移動した可能性があります。</p>
        <Link
          href="/"
          className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90"
        >
          ダッシュボードに戻る
        </Link>
      </div>
    </div>
  )
}
