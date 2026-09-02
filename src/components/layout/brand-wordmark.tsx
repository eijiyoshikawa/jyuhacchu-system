"use client"

import { useSystemBrand } from "@/components/use-system-brand"

/** ロゴ表記（<前半><アクセント><後半>）をブランド定義から描画する */
export function BrandWordmark({ onDark = false }: { onDark?: boolean }) {
  const brand = useSystemBrand()
  const accent = onDark ? brand.theme.accentTextOnDark : brand.theme.accentText
  return (
    <>
      {brand.logoBase}
      <span className={accent}>{brand.logoAccent}</span>
      {brand.logoSuffix}
    </>
  )
}
