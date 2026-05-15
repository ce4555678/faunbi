"use client"

import { authClient } from "@/lib/auth-client"
import useSessionStore from "@/store/session.store"
import { useEffect, useEffectEvent } from "react"

const Providers = ({ children }: { children: React.ReactNode }) => {
  const { setSession } = useSessionStore()

  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession()

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
  }, [session, isPending])

  return <>{children}</>
}

export default Providers
