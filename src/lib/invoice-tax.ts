// インボイス制度（適格請求書等保存方式）に基づく税額計算

// 免税事業者からの仕入税額控除の経過措置
// https://www.nta.go.jp/taxes/shiraberu/zeimokubetsu/shohi/keigenzeiritsu/invoice.htm
const TRANSITIONAL_PERIODS = [
  { from: new Date("2023-10-01"), to: new Date("2026-09-30"), rate: 0.8 }, // 80%控除
  { from: new Date("2026-10-01"), to: new Date("2029-09-30"), rate: 0.5 }, // 50%控除
  // 2029/10/01以降は0%（控除不可）
]

export interface TaxCalculation {
  subtotal: number
  taxRate: number
  taxAmount: number
  totalAmount: number
  // インボイス関連
  hasInvoiceNumber: boolean
  deductionRate: number        // 控除率（1.0 = 100%, 0.8 = 80%, etc.）
  deductibleTaxAmount: number  // 控除可能な税額
  nonDeductibleTaxAmount: number // 控除不可の税額
  periodLabel: string          // 経過措置の期間表示
}

// 現在の経過措置による控除率を取得
export function getDeductionRate(date?: Date): { rate: number; label: string } {
  const now = date || new Date()

  for (const period of TRANSITIONAL_PERIODS) {
    if (now >= period.from && now <= period.to) {
      return {
        rate: period.rate,
        label: `${period.from.getFullYear()}/${period.from.getMonth() + 1}〜${period.to.getFullYear()}/${period.to.getMonth() + 1}：${period.rate * 100}%控除`,
      }
    }
  }

  // 経過措置期間外（2029/10以降）
  if (now >= new Date("2029-10-01")) {
    return { rate: 0, label: "2029/10以降：控除不可" }
  }

  // 2023/10以前（インボイス制度開始前）
  return { rate: 1.0, label: "インボイス制度開始前：100%控除" }
}

// 税額計算（インボイス制度対応）
export function calculateTax(params: {
  subtotal: number
  taxRate?: number
  hasInvoiceNumber: boolean
  date?: Date
}): TaxCalculation {
  const { subtotal, taxRate = 0.1, hasInvoiceNumber, date } = params
  const taxAmount = Math.floor(subtotal * taxRate)
  const totalAmount = subtotal + taxAmount

  if (hasInvoiceNumber) {
    // 適格請求書発行事業者 → 全額控除
    return {
      subtotal,
      taxRate,
      taxAmount,
      totalAmount,
      hasInvoiceNumber: true,
      deductionRate: 1.0,
      deductibleTaxAmount: taxAmount,
      nonDeductibleTaxAmount: 0,
      periodLabel: "適格請求書発行事業者：100%控除",
    }
  }

  // 免税事業者 → 経過措置適用
  const { rate, label } = getDeductionRate(date)
  const deductibleTaxAmount = Math.floor(taxAmount * rate)
  const nonDeductibleTaxAmount = taxAmount - deductibleTaxAmount

  return {
    subtotal,
    taxRate,
    taxAmount,
    totalAmount,
    hasInvoiceNumber: false,
    deductionRate: rate,
    deductibleTaxAmount,
    nonDeductibleTaxAmount,
    periodLabel: label,
  }
}
