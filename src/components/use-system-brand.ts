"use client"

import { createContext, createElement, useContext, useSyncExternalStore } from "react"
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

// ホスト名は遷移しないため購読は不要（マウント時に一度読めばよい）
const emptySubscribe = () => () => {}

/**
 * クライアントコンポーネント用: システムブランドを返す。
 * Provider があればその値（SSRから正確）、無ければホスト名から解決する
 * （SSR/プリレンダー中は受発注L=既定でレンダリングされる）。
 */
export function useSystemBrand(): SystemBrand {
  const fromContext = useContext(SystemBrandContext)
  const fromHost = useSyncExternalStore(
    emptySubscribe,
    () => brandFromHost(window.location.hostname),
    () => LSYSTEM_BRAND
  )
  return fromContext ?? fromHost
}
