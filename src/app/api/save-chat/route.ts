// app/api/workflow/route.ts
import { saveChat } from "@/lib/chat-store"
import { serve } from "@upstash/workflow/nextjs"
import { UIDataTypes, UIMessage, UITools } from "ai"

interface ServeBody {
  chatId: string
  userId: string
  messages: UIMessage<unknown, UIDataTypes, UITools>[]
}
export const { POST } = serve<ServeBody>(async (context) => {
  const { userId, chatId, messages } = context.requestPayload

  await context.run("salvando-chat", async () => {
    await saveChat({
      userId,
      chatId,
      messages,
    })
  })
})
