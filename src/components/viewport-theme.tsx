"use client"

import { useTheme } from "next-themes"
import { useEffect, useEffectEvent } from "react"
import { usePathname } from "next/navigation"
export function ViewportTheme() {
  const pathname = usePathname()

  const { resolvedTheme } = useTheme()
  const dinamicTheme = useEffectEvent(() => {
    const metaThemeColor = document.querySelector("meta[name=theme-color]")
    // ... (seu código de criação da tag)

    const newColor = resolvedTheme === "dark" ? "#09090b" : "#ffffff"

    // SÓ ATUALIZA SE A COR FOR DIFERENTE DA ATUAL
    if (metaThemeColor?.getAttribute("content") !== newColor) {
      metaThemeColor?.setAttribute("content", newColor)
    }
  })

  useEffect(() => {
    dinamicTheme()
  }, [resolvedTheme, pathname])

  return null
}
