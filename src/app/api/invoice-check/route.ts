import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"

// 適格請求書発行事業者登録番号の検証API
// 国税庁 適格請求書発行事業者公表システム Web-API を利用
// https://www.invoice-kohyo.nta.go.jp/web-api/

interface NtaResponse {
  count: string
  "lastUpdateDate": string
  "divisionInformation": Array<{
    "registratedNumber": string
    "process": string
    "correct": string
    "kind": string
    "country": string
    "latest": string
    "registrationDate": string
    "updateDate": string
    "disposalDate": string
    "expireDate": string
    "address": string
    "addressPrefectureCode": string
    "addressCityCode": string
    "addressRequest": string
    "addressRequestPrefectureCode": string
    "addressRequestCityCode": string
    "kana": string
    "name": string
    "addressInside": string
    "addressInsidePrefectureCode": string
    "addressInsideCityCode": string
    "tradeName": string
    "popularName_previousName": string
  }>
}

// フォーマット検証: T + 13桁の数字
export function validateInvoiceNumberFormat(number: string): { valid: boolean; message: string } {
  if (!number) {
    return { valid: false, message: "番号を入力してください" }
  }

  const cleaned = number.trim().toUpperCase()

  if (!/^T\d{13}$/.test(cleaned)) {
    return { valid: false, message: "形式が正しくありません（T + 13桁の数字）" }
  }

  return { valid: true, message: "形式は正しいです" }
}

export async function GET(req: NextRequest) {
  const session = await auth()
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const number = req.nextUrl.searchParams.get("number")
  if (!number) {
    return NextResponse.json({ error: "番号が指定されていません" }, { status: 400 })
  }

  // フォーマット検証
  const formatCheck = validateInvoiceNumberFormat(number)
  if (!formatCheck.valid) {
    return NextResponse.json({
      valid: false,
      formatValid: false,
      message: formatCheck.message,
    })
  }

  // 国税庁API で検証
  const appId = process.env.NTA_APP_ID
  if (!appId) {
    // API IDが未設定の場合はフォーマットチェックのみ
    return NextResponse.json({
      valid: null,
      formatValid: true,
      message: "形式は正しいです（国税庁APIは未設定のため、有効性は未確認）",
      hint: "NTA_APP_ID環境変数を設定すると国税庁APIで有効性を確認できます",
    })
  }

  try {
    const apiUrl = `https://web-api.invoice-kohyo.nta.go.jp/1/num?id=${appId}&number=${number}&type=21`
    const response = await fetch(apiUrl, {
      headers: { Accept: "application/json" },
    })

    if (!response.ok) {
      return NextResponse.json({
        valid: null,
        formatValid: true,
        message: "国税庁APIへの接続に失敗しました",
      })
    }

    const data: NtaResponse = await response.json()

    if (data.count === "0" || !data.divisionInformation?.length) {
      return NextResponse.json({
        valid: false,
        formatValid: true,
        message: "この番号は登録されていません",
      })
    }

    const info = data.divisionInformation[0]
    const isActive = !info.disposalDate && !info.expireDate

    return NextResponse.json({
      valid: isActive,
      formatValid: true,
      message: isActive
        ? "有効な適格請求書発行事業者です"
        : "この事業者の登録は失効しています",
      details: {
        name: info.name,
        address: info.address,
        registrationDate: info.registrationDate,
        tradeName: info.tradeName || null,
        disposalDate: info.disposalDate || null,
        expireDate: info.expireDate || null,
      },
    })
  } catch {
    return NextResponse.json({
      valid: null,
      formatValid: true,
      message: "国税庁APIへの接続に失敗しました",
    })
  }
}
