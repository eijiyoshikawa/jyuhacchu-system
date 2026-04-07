"use client"

import { Badge } from "@/components/ui/badge"

interface ComplianceBadgeProps {
  isCompliant: boolean
  missingFields: { label: string }[]
}

export function ComplianceBadge({ isCompliant, missingFields }: ComplianceBadgeProps) {
  if (isCompliant) {
    return (
      <Badge variant="success">
        法令準拠
      </Badge>
    )
  }

  return (
    <span className="group relative inline-block">
      <Badge variant="warning">
        要確認
      </Badge>
      <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 -translate-x-1/2 whitespace-nowrap rounded bg-gray-900 px-3 py-2 text-xs text-white opacity-0 shadow-lg transition-opacity group-hover:opacity-100">
        <span className="font-semibold">不足項目:</span>
        <ul className="mt-1 list-disc pl-4">
          {missingFields.map((f) => (
            <li key={f.label}>{f.label}</li>
          ))}
        </ul>
      </span>
    </span>
  )
}
