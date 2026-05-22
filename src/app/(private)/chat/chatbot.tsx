"use client"

import { useState } from "react"
import { UIMessage, useChat } from "@ai-sdk/react"
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input"
import ChatUi from "@/components/chatUi"
import { usePathname, useRouter } from "next/navigation"
import { generateId } from "ai"

export default function ChatBot({
  id,
  initialMessages,
}: {
  id?: string
  initialMessages?: UIMessage[]
}) {
  const [text, setText] = useState("")
  const pathname = usePathname()
  const router = useRouter()
  const [chatId] = useState(() => id || generateId())

  const { messages, status, sendMessage } = useChat({
    messages: initialMessages,
    id: chatId,
  })

  const isStreaming = status === "streaming"
  const isSubmitted = status === "submitted"
  const isBusy = isStreaming || isSubmitted

  function handleSubmit(message: PromptInputMessage) {
    const hasText = Boolean(message.text?.trim())
    const hasAttachments = Boolean(message.files?.length)

    if (!hasText && !hasAttachments) return

    sendMessage({
      text: message.text,
    })

    setText("")
  }

  function handleNewChat() {
    if (pathname === "/chat") {
      // Se já estiver em /chat, recarrega a página completamente
      window.location.reload()
    } else if (pathname.startsWith("/chat/")) {
      // Se for /chat/[id] (ou qualquer subpágina), redireciona para /chat
      router.push("/chat")
    }
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-muted/20">
      <section className="mx-auto flex h-full w-full max-w-5xl flex-col px-3 py-3 sm:px-4 lg:px-6">
        <ChatUi.header
          hasMessages={messages.length > 0}
          isBusy={isBusy}
          onNewChat={handleNewChat}
        />

        <ChatUi.messages
          messages={messages}
          text={text}
          sendMessage={sendMessage}
          setText={setText}
          status={status}
          isStreaming={isStreaming}
          isSubmitted={isSubmitted}
        />
        <ChatUi.input
          text={text}
          setText={setText}
          status={status}
          isBusy={isBusy}
          onSubmit={handleSubmit}
        />
      </section>
    </div>
  )
}
