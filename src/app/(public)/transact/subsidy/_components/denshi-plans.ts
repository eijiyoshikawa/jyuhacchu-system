/**
 * 電子取引くん の料金プラン定義。
 *
 * ⚠️ 価格を変更するときは必ずこのファイルだけを直すこと。
 * 価格説明資料・申請価格理由書・補助額試算は全てここから描画しているため、
 * 個々の資料に金額をハードコードすると整合性が崩れる。
 *
 * ITツール登録の手引き 3-5 ❺ は
 * 「料金体系ごとに価格が記載されていること → システム上で入力する
 *  『価格設定の内訳』と整合性がとれる内容となっていること」
 * を求めており、資料間で金額が食い違うと不備になる。
 */

export type DenshiPlan = {
  /** 表示順（① ② ③） */
  mark: string
  name: string
  /** 月額（税抜・円） */
  monthly: number
  /** 申請書上の区分 */
  applicationCategory: string
  /** 申請書に入力する価格かどうか（標準販売価格／最小販売価格） */
  isApplicationPrice: boolean
  /** 受注側アカウント発行上限（社） */
  partnerAccountLimit: number
  /** 月次取引件数上限（件） */
  monthlyTransactionLimit: number
}

/** 補助率（中小企業・小規模事業者） */
export const SUBSIDY_RATE = 2 / 3
/** インボイス枠（電子取引類型）の補助上限額 */
export const SUBSIDY_CAP = 3_500_000
/** 補助対象となる利用年数（交付申請時に2年分を申請する） */
export const SUBSIDY_YEARS = 2

export const DENSHI_PLANS: DenshiPlan[] = [
  {
    mark: "①",
    name: "標準プラン",
    monthly: 200_000,
    applicationCategory: "標準販売価格（ソフトウェアの標準販売価格）",
    isApplicationPrice: true,
    partnerAccountLimit: 200,
    monthlyTransactionLimit: 3_000,
  },
  {
    mark: "②",
    name: "ミドルプラン",
    monthly: 150_000,
    applicationCategory: "中間プラン（申請書への入力対象外）",
    isApplicationPrice: false,
    partnerAccountLimit: 100,
    monthlyTransactionLimit: 1_500,
  },
  {
    mark: "③",
    name: "最小プラン",
    monthly: 100_000,
    applicationCategory: "最小販売価格（ソフトウェアの最小販売価格）",
    isApplicationPrice: true,
    partnerAccountLimit: 50,
    monthlyTransactionLimit: 500,
  },
]

export const STANDARD_PLAN = DENSHI_PLANS[0]
export const MIDDLE_PLAN = DENSHI_PLANS[1]
export const MINIMUM_PLAN = DENSHI_PLANS[2]

/** 年額（税抜） */
export function yearly(plan: DenshiPlan): number {
  return plan.monthly * 12
}
/** 補助対象範囲（2年分）の利用料 */
export function subsidyBase(plan: DenshiPlan): number {
  return yearly(plan) * SUBSIDY_YEARS
}
/** 補助額（補助率適用後・上限適用後）。1円未満は切り捨て */
export function subsidyAmount(plan: DenshiPlan): number {
  return Math.min(Math.floor(subsidyBase(plan) * SUBSIDY_RATE), SUBSIDY_CAP)
}
/** 自己負担額 */
export function selfPay(plan: DenshiPlan): number {
  return subsidyBase(plan) - subsidyAmount(plan)
}
/** 補助上限に達しているか（達している場合は資料に「上限適用」と注記する） */
export function isCapped(plan: DenshiPlan): boolean {
  return Math.floor(subsidyBase(plan) * SUBSIDY_RATE) > SUBSIDY_CAP
}

/** 3,000,000 → "3,000,000円" */
export function jpy(n: number): string {
  return `${n.toLocaleString("ja-JP")}円`
}
/** 3,000,000 → "¥3,000,000" */
export function yen(n: number): string {
  return `¥${n.toLocaleString("ja-JP")}`
}
