"use client"

import { authClient } from "@/lib/auth-client"
import useSessionStore from "@/store/session.store"
import { useTheme } from "next-themes"
import { useEffect, useEffectEvent } from "react"

const Providers = ({ children }: { children: React.ReactNode }) => {
  const { setSession } = useSessionStore()
  const { resolvedTheme, theme } = useTheme()

  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession()

  const dinamicTheme = useEffectEvent(() => {
    let metaThemeColor = document.querySelector("meta[name=theme-color]")
    if (!metaThemeColor) {
      metaThemeColor = document.createElement("meta")
      metaThemeColor.setAttribute("name", "theme-color")
      document.head.appendChild(metaThemeColor)
    }

    // Define a cor baseada no tema
    metaThemeColor.setAttribute(
      "content",
      resolvedTheme == "dark" ? "#09090b" : "#ffffff"
    )
  })
  const setSessionStore = useEffectEvent(() => {
    if (!isPending && session) {
      const { userId } = session.session
      const { name, email, image } = session.user
      setSession({
        id: userId,
        name: name,
        email: email,
        image: image || undefined,
      })
    }
  })

  useEffect(() => {
    setSessionStore()
    dinamicTheme()
  }, [session, isPending, resolvedTheme, theme])

  return <>{children}</>
}

export default Providers
