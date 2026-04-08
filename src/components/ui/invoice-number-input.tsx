"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CheckCircle, XCircle, AlertCircle, Loader2 } from "lucide-react"

interface InvoiceCheckResult {
  valid: boolean | null
  formatValid: boolean
  message: string
  details?: {
    name: string
    address: string
    registrationDate: string
    tradeName: string | null
  }
}

interface InvoiceNumberInputProps {
  id?: string
  name?: string
  defaultValue?: string
  placeholder?: string
}

export function InvoiceNumberInput({ id, name, defaultValue, placeholder }: InvoiceNumberInputProps) {
  const [value, setValue] = useState(defaultValue || "")
  const [checking, setChecking] = useState(false)
  const [result, setResult] = useState<InvoiceCheckResult | null>(null)

  async function handleCheck() {
    if (!value.trim()) return
    setChecking(true)
    setResult(null)

    try {
      const res = await fetch(`/api/invoice-check?number=${encodeURIComponent(value.trim())}`)
      const data: InvoiceCheckResult = await res.json()
      setResult(data)
    } catch {
      setResult({ valid: null, formatValid: false, message: "検証に失敗しました" })
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-2">
        <Input
          id={id}
          name={name}
          value={value}
          onChange={(e) => {
            setValue(e.target.value)
            setResult(null)
          }}
          placeholder={placeholder || "T1234567890123"}
          className="flex-1"
        />
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={handleCheck}
          disabled={checking || !value.trim()}
          className="shrink-0"
        >
          {checking ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            "確認"
          )}
        </Button>
      </div>

      {result && (
        <div className={`flex items-start gap-2 rounded-sm border p-2 text-xs ${
          result.valid === true
            ? "border-green-300 bg-green-50 text-green-800"
            : result.valid === false
            ? "border-red-300 bg-red-50 text-red-800"
            : "border-yellow-300 bg-yellow-50 text-yellow-800"
        }`}>
          {result.valid === true ? (
            <CheckCircle className="h-4 w-4 shrink-0 mt-0.5" />
          ) : result.valid === false ? (
            <XCircle className="h-4 w-4 shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
          )}
          <div>
            <div className="font-medium">{result.message}</div>
            {result.details && (
              <div className="mt-1 space-y-0.5 text-[11px] opacity-80">
                <div>事業者名: {result.details.name}</div>
                {result.details.address && <div>所在地: {result.details.address}</div>}
                <div>登録日: {result.details.registrationDate}</div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
