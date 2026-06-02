"use client"

import { useState } from "react"
import { UIMessage, useChat } from "@ai-sdk/react"
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input"
import ChatUi from "@/components/chatUi"
import { generateId } from "ai"

export default function ChatBot({
  id,
  initialMessages,
}: {
  id?: string
  initialMessages?: UIMessage[]
}) {
  const [text, setText] = useState("")
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
      files: message.files,
    })

    setText("")
  }

  function handleNewChat() {
    window.location.reload()
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-slate-50 text-slate-950 dark:bg-[#020711] dark:text-slate-100">
      <section className="mx-auto flex h-full w-full max-w-7xl flex-col px-3 py-4 sm:px-5 lg:px-6">
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
