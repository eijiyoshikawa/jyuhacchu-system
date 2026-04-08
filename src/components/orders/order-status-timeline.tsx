"use client"

import { cn } from "@/lib/utils"

const TIMELINE_STEPS = [
  { status: "DRAFT", label: "下書き" },
  { status: "PENDING_APPROVAL", label: "申請中" },
  { status: "APPROVED", label: "承認済" },
  { status: "ORDERED", label: "発注済" },
  { status: "INSPECTED", label: "検収完了" },
]

const STATUS_ORDER: Record<string, number> = {
  DRAFT: 0,
  PENDING_APPROVAL: 1,
  APPROVED: 2,
  ORDERED: 3,
  ACCEPTED: 3,
  DELIVERY_REPORTED: 4,
  INSPECTED: 4,
  REJECTED: -1,
  CANCELLED: -1,
}

interface OrderStatusTimelineProps {
  currentStatus: string
}

export function OrderStatusTimeline({ currentStatus }: OrderStatusTimelineProps) {
  const currentIndex = STATUS_ORDER[currentStatus] ?? -1
  const isRejectedOrCancelled = currentStatus === "REJECTED" || currentStatus === "CANCELLED"

  return (
    <div className="rounded-sm border bg-white p-3 sm:p-4">
      <div className="flex items-center justify-between overflow-x-auto min-w-0 pb-1">
        {TIMELINE_STEPS.map((step, index) => {
          const isCompleted = currentIndex > index
          const isCurrent = currentIndex === index && !isRejectedOrCancelled
          const isUpcoming = currentIndex < index || isRejectedOrCancelled

          return (
            <div key={step.status} className="flex flex-1 items-center min-w-0">
              <div className="flex flex-col items-center shrink-0">
                <div
                  className={cn(
                    "flex h-6 w-6 sm:h-8 sm:w-8 items-center justify-center rounded-full border-2 text-xs font-bold",
                    isCompleted && "border-green-500 bg-green-500 text-white",
                    isCurrent && "border-blue-500 bg-blue-50 text-blue-600",
                    isUpcoming && "border-gray-300 bg-white text-gray-400"
                  )}
                >
                  {isCompleted ? (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </div>
                <span
                  className={cn(
                    "mt-1 text-[10px] sm:text-xs whitespace-nowrap",
                    isCompleted && "font-medium text-green-600",
                    isCurrent && "font-bold text-blue-600",
                    isUpcoming && "text-gray-400"
                  )}
                >
                  {step.label}
                </span>
              </div>
              {index < TIMELINE_STEPS.length - 1 && (
                <div
                  className={cn(
                    "mx-2 h-0.5 flex-1",
                    currentIndex > index ? "bg-green-500" : "bg-gray-200"
                  )}
                />
              )}
            </div>
          )
        })}
      </div>
      {isRejectedOrCancelled && (
        <div className="mt-3 rounded-sm bg-red-50 border border-red-200 px-3 py-2 text-center text-sm font-bold text-red-700">
          {currentStatus === "REJECTED" ? "却下されました" : "取消されました"}
        </div>
      )}
    </div>
  )
}
