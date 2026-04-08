"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Search } from "lucide-react"

interface StatusOption {
  value: string
  label: string
}

interface SearchFilterBarProps {
  searchPlaceholder: string
  statusOptions: StatusOption[]
  statusParamName?: string
  baseUrl: string
}

export function SearchFilterBar({
  searchPlaceholder,
  statusOptions,
  statusParamName = "status",
  baseUrl,
}: SearchFilterBarProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [searchValue, setSearchValue] = useState(searchParams.get("search") ?? "")

  // Sync search value when URL changes externally
  useEffect(() => {
    setSearchValue(searchParams.get("search") ?? "")
  }, [searchParams])

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      // Reset to page 1 when filters change
      params.delete("page")
      const qs = params.toString()
      router.push(qs ? `${baseUrl}?${qs}` : baseUrl)
    },
    [router, searchParams, baseUrl]
  )

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      const current = searchParams.get("search") ?? ""
      if (searchValue !== current) {
        updateParams("search", searchValue)
      }
    }, 400)
    return () => clearTimeout(timer)
  }, [searchValue, searchParams, updateParams])

  const currentStatus = searchParams.get(statusParamName) ?? ""

  return (
    <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder={searchPlaceholder}
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-9"
        />
      </div>
      <div className="w-full sm:w-48">
        <Select
          value={currentStatus}
          onChange={(e) => updateParams(statusParamName, e.target.value)}
        >
          {statusOptions.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}
