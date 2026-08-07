import Link from "next/link"

export default function LegalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-4">
          <Link href="/" className="text-lg font-bold text-gray-900">
            受発注Lシステム
          </Link>
          <Link
            href="/auth/login"
            className="text-sm text-blue-600 hover:text-blue-800 hover:underline"
          >
            ログイン
          </Link>
        </div>
      </header>
      <main className="py-8">{children}</main>
    </div>
  )
}
