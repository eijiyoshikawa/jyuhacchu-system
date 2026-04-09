"use client"

import { formatCurrency } from "@/lib/utils"
import { AlertTriangle, CheckCircle, Info } from "lucide-react"

interface TaxSummaryProps {
  subtotal: number
  taxRate: number
  taxAmount: number
  totalAmount: number
  hasInvoiceNumber: boolean
  companyName?: string
  deductionRate: number
  deductibleTaxAmount: number
  nonDeductibleTaxAmount: number
  periodLabel: string
}

export function TaxSummary({
  subtotal,
  taxAmount,
  totalAmount,
  hasInvoiceNumber,
  companyName,
  deductionRate,
  deductibleTaxAmount,
  nonDeductibleTaxAmount,
  periodLabel,
}: TaxSummaryProps) {
  return (
    <div className="space-y-3">
      {/* 基本金額 */}
      <div className="space-y-1">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">小計</span>
          <span className="font-medium">{formatCurrency(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">消費税（10%）</span>
          <span className="font-medium">{formatCurrency(taxAmount)}</span>
        </div>
        <div className="flex justify-between border-t pt-1 text-base font-bold">
          <span>合計</span>
          <span>{formatCurrency(totalAmount)}</span>
        </div>
      </div>

      {/* インボイス制度情報 */}
      <div className={`rounded-sm border p-3 text-xs ${
        hasInvoiceNumber
          ? "border-green-200 bg-green-50"
          : deductionRate > 0
          ? "border-amber-200 bg-amber-50"
          : "border-red-200 bg-red-50"
      }`}>
        <div className="flex items-start gap-2">
          {hasInvoiceNumber ? (
            <CheckCircle className="h-4 w-4 shrink-0 text-green-600 mt-0.5" />
          ) : deductionRate > 0 ? (
            <AlertTriangle className="h-4 w-4 shrink-0 text-amber-600 mt-0.5" />
          ) : (
            <AlertTriangle className="h-4 w-4 shrink-0 text-red-600 mt-0.5" />
          )}
          <div className="space-y-1">
            <div className="font-bold">
              {hasInvoiceNumber
                ? "適格請求書発行事業者"
                : `免税事業者${companyName ? `（${companyName}）` : ""}`
              }
            </div>

            {!hasInvoiceNumber && (
              <>
                <div className="flex items-center gap-1 text-gray-600">
                  <Info className="h-3 w-3" />
                  <span>経過措置: {periodLabel}</span>
                </div>
                <div className="space-y-0.5 mt-1">
                  <div className="flex justify-between">
                    <span>控除可能な消費税額</span>
                    <span className="font-medium">{formatCurrency(deductibleTaxAmount)}</span>
                  </div>
                  <div className="flex justify-between text-red-700">
                    <span>控除不可の消費税額</span>
                    <span className="font-medium">{formatCurrency(nonDeductibleTaxAmount)}</span>
                  </div>
                </div>
              </>
            )}

            {hasInvoiceNumber && (
              <div className="text-green-700">消費税全額が仕入税額控除の対象です</div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
