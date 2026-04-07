// 建設業法第19条に基づく必要記載事項チェック
export interface ComplianceCheckResult {
  isCompliant: boolean
  missingFields: { field: string; label: string }[]
}

export function checkConstructionLawCompliance(order: {
  subject?: string | null
  constructionName?: string | null
  constructionSite?: string | null
  constructionPeriodStart?: Date | null
  constructionPeriodEnd?: Date | null
  totalAmount?: number | null
  paymentTerms?: string | null
  issuedAt?: Date | null
  items?: { name: string }[]
}): ComplianceCheckResult {
  const required: { field: keyof typeof order; label: string }[] = [
    { field: "subject", label: "工事内容" },
    { field: "constructionSite", label: "工事場所" },
    { field: "constructionPeriodStart", label: "工期開始日" },
    { field: "constructionPeriodEnd", label: "工期終了日" },
    { field: "totalAmount", label: "請負金額" },
    { field: "paymentTerms", label: "支払条件" },
    { field: "issuedAt", label: "契約日" },
  ]

  const missingFields = required.filter(r => !order[r.field])
  return { isCompliant: missingFields.length === 0, missingFields }
}

// 電子帳簿保存法チェック
export function checkElectronicBookCompliance(doc: {
  confirmedAt?: Date | null
  confirmedHash?: string | null
  createdAt?: Date | null
}): ComplianceCheckResult {
  const missing: { field: string; label: string }[] = []
  if (!doc.confirmedAt) missing.push({ field: "confirmedAt", label: "確定タイムスタンプ" })
  if (!doc.confirmedHash) missing.push({ field: "confirmedHash", label: "改ざん防止ハッシュ" })
  return { isCompliant: missing.length === 0, missingFields: missing }
}
