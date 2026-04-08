import { prisma } from "@/lib/prisma"
import { formatCurrency, formatDate } from "@/lib/utils"
import { notFound } from "next/navigation"
import { PrintButton } from "./print-button"

export default async function OrderPrintPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const order = await prisma.purchaseOrder.findUnique({
    where: { id },
    include: {
      items: { orderBy: { itemOrder: "asc" } },
      project: true,
      issuer: true,
      receiver: true,
      createdBy: true,
    },
  })

  if (!order) {
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

      <div className="mx-auto max-w-[210mm] p-8 font-sans text-sm text-gray-900">
        {/* Header: Issuer Info */}
        <div className="mb-8 text-right text-xs leading-relaxed">
          <p className="font-bold text-sm">{order.issuer.name}</p>
          {order.issuer.postalCode && <p>〒{order.issuer.postalCode}</p>}
          {order.issuer.address && <p>{order.issuer.address}</p>}
          {order.issuer.phone && <p>TEL: {order.issuer.phone}</p>}
          {order.issuer.registrationNumber && (
            <p>登録番号: {order.issuer.registrationNumber}</p>
          )}
        </div>

        {/* Title */}
        <h1 className="mb-8 text-center text-2xl font-bold tracking-widest border-b-2 border-gray-800 pb-4">
          発 注 書
        </h1>

        {/* Order Info and Receiver */}
        <div className="mb-6 flex justify-between">
          <div className="space-y-2">
            <p className="text-lg font-bold border-b border-gray-800 pb-1">
              {order.receiver.name}　御中
            </p>
            <p className="text-xs text-gray-600">下記のとおり発注いたします。</p>
          </div>
          <div className="text-right text-xs space-y-1">
            <p>発注番号: {order.orderNumber}</p>
            <p>発注日: {order.issuedAt ? formatDate(order.issuedAt) : formatDate(order.createdAt)}</p>
            {order.deliveryDeadline && (
              <p>納期: {formatDate(order.deliveryDeadline)}</p>
            )}
          </div>
        </div>

        {/* Subject and Total */}
        <div className="mb-6 rounded border border-gray-300 p-4">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-xs text-gray-500">件名</p>
              <p className="font-bold">{order.subject}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">合計金額（税込）</p>
              <p className="text-xl font-bold">{formatCurrency(order.totalAmount)}</p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <table className="mb-6 w-full border-collapse text-xs">
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
            {order.items.map((item) => (
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

        {/* Totals */}
        <div className="mb-8 flex justify-end">
          <table className="w-72 border-collapse text-sm">
            <tbody>
              <tr>
                <td className="border border-gray-300 bg-gray-50 px-3 py-2 font-medium">小計</td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  {formatCurrency(order.subtotal)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 bg-gray-50 px-3 py-2 font-medium">
                  消費税（{order.taxRate * 100}%）
                </td>
                <td className="border border-gray-300 px-3 py-2 text-right">
                  {formatCurrency(order.taxAmount)}
                </td>
              </tr>
              <tr>
                <td className="border border-gray-300 bg-gray-100 px-3 py-2 font-bold">
                  合計金額
                </td>
                <td className="border border-gray-300 bg-gray-100 px-3 py-2 text-right font-bold">
                  {formatCurrency(order.totalAmount)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Notes */}
        {order.notes && (
          <div className="mb-6 rounded border border-gray-200 p-4">
            <p className="mb-1 text-xs font-bold text-gray-600">備考</p>
            <p className="whitespace-pre-wrap text-xs">{order.notes}</p>
          </div>
        )}

        {/* Construction Law Fields */}
        {(order.constructionName ||
          order.constructionSite ||
          order.constructionPeriodStart ||
          order.paymentTerms) && (
          <div className="mb-6 rounded border border-gray-200 p-4">
            <p className="mb-2 text-xs font-bold text-gray-600">
              建設業法に基づく記載事項
            </p>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs">
              {order.constructionName && (
                <>
                  <dt className="font-medium text-gray-600">工事名称</dt>
                  <dd>{order.constructionName}</dd>
                </>
              )}
              {order.constructionSite && (
                <>
                  <dt className="font-medium text-gray-600">工事場所</dt>
                  <dd>{order.constructionSite}</dd>
                </>
              )}
              {(order.constructionPeriodStart || order.constructionPeriodEnd) && (
                <>
                  <dt className="font-medium text-gray-600">工期</dt>
                  <dd>
                    {order.constructionPeriodStart
                      ? formatDate(order.constructionPeriodStart)
                      : ""}
                    {order.constructionPeriodEnd
                      ? ` 〜 ${formatDate(order.constructionPeriodEnd)}`
                      : ""}
                  </dd>
                </>
              )}
              {order.paymentTerms && (
                <>
                  <dt className="font-medium text-gray-600">支払条件</dt>
                  <dd>{order.paymentTerms}</dd>
                </>
              )}
              {order.defectWarranty && (
                <>
                  <dt className="font-medium text-gray-600">瑕疵担保責任</dt>
                  <dd>{order.defectWarranty}</dd>
                </>
              )}
            </dl>
          </div>
        )}

        {/* Confirmation Hash and Timestamp */}
        {order.confirmedAt && order.confirmedHash && (
          <div className="mt-8 border-t border-gray-200 pt-4 text-xs text-gray-400">
            <p>確定日時: {new Date(order.confirmedAt).toLocaleString("ja-JP")}</p>
            <p>確認ハッシュ: {order.confirmedHash}</p>
          </div>
        )}
      </div>
    </>
  )
}
