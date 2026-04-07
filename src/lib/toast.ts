export type ToastType = "success" | "error" | "info"

export type Toast = {
  id: string
  type: ToastType
  message: string
}

type ToastListener = (toast: Toast) => void

const listeners: Set<ToastListener> = new Set()

function generateId(): string {
  return Math.random().toString(36).substring(2, 9)
}

export function subscribe(listener: ToastListener): () => void {
  listeners.add(listener)
  return () => {
    listeners.delete(listener)
  }
}

function emit(type: ToastType, message: string) {
  const toast: Toast = { id: generateId(), type, message }
  listeners.forEach((listener) => listener(toast))
}

export const toast = {
  success: (message: string) => emit("success", message),
  error: (message: string) => emit("error", message),
  info: (message: string) => emit("info", message),
}
