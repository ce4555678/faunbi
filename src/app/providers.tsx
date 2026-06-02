"use client"

import { authClient } from "@/lib/auth-client"
import useSessionStore from "@/store/session.store"
import { useEffect, useEffectEvent } from "react"
import { RealtimeProvider } from "@upstash/realtime/client"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
const Providers = ({ children }: { children: React.ReactNode }) => {
  const { setSession } = useSessionStore()

  const {
    data: session,
    isPending, //loading state
  } = authClient.useSession()
  const client = new QueryClient()

  const setSessionStore = useEffectEvent(() => {
    if (!isPending && session) {
      const { userId } = session.session
      const { image } = session.user
      setSession({
        ...session.user,
        id: userId,
        image: image || undefined,
      })
    }
  })

  useEffect(() => {
    setSessionStore()
  }, [session, isPending])

  return (
    <RealtimeProvider>
      <QueryClientProvider client={client}>{children}</QueryClientProvider>
    </RealtimeProvider>
  )
}

export default Providers
