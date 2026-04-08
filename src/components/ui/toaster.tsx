"use client"

import { useCallback, useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { type Toast, type ToastType, subscribe } from "@/lib/toast"

export { toast } from "@/lib/toast"

const toastStyles: Record<ToastType, string> = {
  success: "bg-green-600 text-white",
  error: "bg-red-600 text-white",
  info: "bg-blue-600 text-white",
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([])

  const addToast = useCallback((toast: Toast) => {
    setToasts((prev) => [...prev, toast])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id))
  }, [])

  useEffect(() => {
    const unsubscribe = subscribe(addToast)
    return unsubscribe
  }, [addToast])

  return { toasts, removeToast }
}

export function Toaster() {
  const { toasts, removeToast } = useToast()

  useEffect(() => {
    const timers = toasts.map((t) =>
      setTimeout(() => removeToast(t.id), 5000)
    )
    return () => timers.forEach(clearTimeout)
  }, [toasts, removeToast])

  return (
    <div className="fixed top-4 right-4 z-50 flex flex-col gap-2">
      {toasts.map((t) => (
        <div
          key={t.id}
          className={cn(
            "rounded-sm px-4 py-3 text-sm font-bold shadow-lg transition-all",
            "animate-in slide-in-from-top-2 fade-in duration-200",
            toastStyles[t.type]
          )}
        >
          <div className="flex items-center justify-between gap-4">
            <span>{t.message}</span>
            <button
              onClick={() => removeToast(t.id)}
              className="shrink-0 opacity-70 hover:opacity-100"
              aria-label="閉じる"
            >
              &times;
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
