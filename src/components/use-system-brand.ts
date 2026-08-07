"use client"

import { createContext, createElement, useContext, useEffect, useState } from "react"
import { LSYSTEM_BRAND, brandFromHost, type SystemBrand } from "@/lib/brand"

const SystemBrandContext = createContext<SystemBrand | null>(null)

/**
 * サーバーレイアウトで解決したブランドをクライアントへ受け渡す Provider。
 * （SSR 時点から正しいブランドで描画され、初期表示のちらつきを防ぐ）
 */
export function SystemBrandProvider({
  brand,
  children,
}: {
  brand: SystemBrand
  children: React.ReactNode
}) {
  return createElement(SystemBrandContext.Provider, { value: brand }, children)
}

/**
 * クライアントコンポーネント用: システムブランドを返す。
 * Provider があればその値（SSRから正確）、無ければホスト名から解決する。
 */
export function useSystemBrand(): SystemBrand {
  const fromContext = useContext(SystemBrandContext)
  const [fallback, setFallback] = useState<SystemBrand>(LSYSTEM_BRAND)
  useEffect(() => {
    if (!fromContext) setFallback(brandFromHost(window.location.hostname))
  }, [fromContext])
  return fromContext ?? fallback
}
