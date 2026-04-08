import { prisma } from "@/lib/prisma"
import { formatCurrency, formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"
import { PrintButton } from "./print-button"

export default async function InvoicePrintPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const invoice = await prisma.invoice.findUnique({
    where: { id },
    include: {
      items: { orderBy: { itemOrder: "asc" } },
      project: true,
      issuer: true,
      receiver: true,
      createdBy: true,
    },
  })

  if (!invoice) {
    notFound()
  }

  return (
    <>
      <style>{`
        @media print {
          .print-hide {
            display: none !important;
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
          }
          @page {
            margin: 15mm;
            size: A4;
          }
        }
      `}</style>

      <div className="print-hide fixed top-4 right-4 z-50">
        <PrintButton />
      </div>

      <div className="mx-auto max-w-[210mm] p-4 sm:p-8 font-sans text-sm text-gray-900">
        {/* Header: Issuer (Subcontractor) Info */}
        <div className="mb-8 text-right text-xs leading-relaxed">
          <p className="font-bold text-sm">{invoice.issuer.name}</p>
          {invoice.issuer.postalCode && <p>〒{invoice.issuer.postalCode}</p>}
          {invoice.issuer.address && <p>{invoice.issuer.address}</p>}
          {invoice.issuer.phone && <p>TEL: {invoice.issuer.phone}</p>}
          {invoice.issuer.email && <p>Email: {invoice.issuer.email}</p>}
          {invoice.issuer.registrationNumber && (
            <p className="mt-1 font-medium">
              インボイス番号: {invoice.issuer.registrationNumber}
            </p>
          )}
        </div>

        {/* Title */}
        <h1 className="mb-8 text-center text-2xl font-bold tracking-widest border-b-2 border-gray-800 pb-4">
          請 求 書
        </h1>

        {/* Invoice Info and Receiver */}
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:justify-between">
          <div className="space-y-2">
            <p className="text-base sm:text-lg font-bold border-b border-gray-800 pb-1">
              {invoice.receiver.name}　御中
            </p>
            <p className="text-xs text-gray-600">下記のとおりご請求申し上げます。</p>
          </div>
          <div className="text-left sm:text-right text-xs space-y-1">
            <p>請求番号: {invoice.invoiceNumber}</p>
            <p>請求日: {formatDate(invoice.createdAt)}</p>
            {invoice.dueDate && (
              <p>支払期限: {formatDate(invoice.dueDate)}</p>
            )}
          </div>
        </div>

        {/* Subject and Total */}
        <div className="mb-6 rounded border border-gray-300 p-4">
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <p className="text-xs text-gray-500">件名</p>
              <p className="font-bold">{invoice.subject}</p>
            </div>
            <div className="sm:text-right">
              <p className="text-xs text-gray-500">合計金額（税込）</p>
              <p className="text-lg sm:text-xl font-bold">{formatCurrency(invoice.totalAmount)}</p>
            </div>
          </div>
        </div>

        {/* Qualified Invoice Notice */}
        {invoice.issuer.registrationNumber && (
          <div className="mb-4 rounded bg-gray-50 border border-gray-200 px-4 py-2 text-xs text-gray-600">
            本請求書は適格請求書（インボイス）です。登録番号: {invoice.issuer.registrationNumber}
          </div>
        )}

        {/* Items Table */}
        <div className="overflow-x-auto mb-6">
        <table className="w-full border-collapse text-xs min-w-[500px]">
          <thead>
            <tr className="bg-gray-100">
              <th className="border border-gray-300 px-2 py-2 text-center w-8">No.</th>
              <th className="border border-gray-300 px-2 py-2 text-left">品名</th>
              <th className="border border-gray-300 px-2 py-2 text-left">仕様</th>
              <th className="border border-gray-300 px-2 py-2 text-right w-16">数量</th>
              <th className="border border-gray-300 px-2 py-2 text-center w-12">単位</th>
              <th className="border border-gray-300 px-2 py-2 text-right w-24">単価</th>
              <th className="border border-gray-300 px-2 py-2 text-right w-28">金額</th>
            </tr>
          </thead>
          <tbody>
            {invoice.items.map((item) => (
              <tr key={item.id}>
                <td className="border border-gray-300 px-2 py-1.5 text-center">
                  {item.itemOrder}
                </td>
                <td className="border border-gray-300 px-2 py-1.5">{item.name}</td>
                <td className="border border-gray-300 px-2 py-1.5">
                  {item.specification || ""}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-right">
                  {item.quantity}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-center">
                  {item.unit}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-right">
                  {formatCurrency(item.unitPrice)}
                </td>
                <td className="border border-gray-300 px-2 py-1.5 text-right">
                  {formatCurrency(item.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>

        {/* Totals */}
        <div className="mb-8 flex justify-end">
          <table className="w-72 border-collapse text-sm">
            <tbody>
              <tr>
                <td className="border border-gray-300 bg-gray-50 px-3 py-2 font-medium">小計</td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  {formatCurrency(invoice.subtotal)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 bg-gray-50 px-3 py-2 font-medium">
                  消費税（{invoice.taxRate * 100}%）
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  {formatCurrency(invoice.taxAmount)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 bg-gray-100 px-3 py-2 font-bold">
                  合計金額
                </td>
                <td className="border border-gray-300 bg-gray-100 px-3 py-2 text-right font-bold">
                  {formatCurrency(invoice.totalAmount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Notes */}
        {invoice.notes && (
          <div className="mb-6 rounded border border-gray-200 p-4">
            <p className="mb-1 text-xs font-bold text-gray-600">備考</p>
            <p className="whitespace-pre-wrap text-xs">{invoice.notes}</p>
          </div>
        )}

        {/* Bank Info placeholder - shown if issuer has relevant info */}
        {invoice.issuer.registrationNumber && (
          <div className="mb-6 rounded border border-gray-200 p-4">
            <p className="mb-1 text-xs font-bold text-gray-600">振込先情報</p>
            <p className="text-xs text-gray-500">
              お振込先については、別途ご案内いたします。
            </p>
          </div>
        )}

        {/* Confirmation Hash and Timestamp */}
        {invoice.confirmedAt && invoice.confirmedHash && (
          <div className="mt-8 border-t border-gray-200 pt-4 text-xs text-gray-400">
            <p>確定日時: {new Date(invoice.confirmedAt).toLocaleString("ja-JP")}</p>
            <p>確認ハッシュ: {invoice.confirmedHash}</p>
          </div>
        )}
      </div>
    </>
  )
}
