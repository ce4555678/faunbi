"use client"

import {
  Attachment,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
} from "@/components/ai-elements/attachments"
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputFooter,
  PromptInputTools,
  usePromptInputAttachments,
} from "@/components/ai-elements/prompt-input"
import { useState } from "react"
import { UIMessage, useChat } from "@ai-sdk/react"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation"
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message"
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning"
import { Spinner } from "@/components/ui/spinner"
import { Button } from "@/components/ui/button"
import {
  PlusIcon,
  SparklesIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

const PromptInputAttachmentsDisplay = () => {
  const attachments = usePromptInputAttachments()

  if (attachments.files.length === 0) {
    return null
  }

  return (
    <Attachments
      variant="inline"
      className="max-h-32 overflow-y-auto border-b px-3 py-2"
    >
      {attachments.files.map((attachment) => (
        <Attachment
          data={attachment}
          key={attachment.id}
          onRemove={() => attachments.remove(attachment.id)}
        >
          <AttachmentPreview />
          <AttachmentRemove />
        </Attachment>
      ))}
    </Attachments>
  )
}

const ChatBot = () => {
  const [text, setText] = useState<string>("")

  const { messages, status, sendMessage, setMessages } = useChat()

  const isStreaming = status === "streaming"
  const isSubmitted = status === "submitted"
  const isBusy = isStreaming || isSubmitted

  const handleSubmit = (message: PromptInputMessage) => {
    const hasText = Boolean(message.text?.trim())
    const hasAttachments = Boolean(message.files?.length)

    if (!(hasText || hasAttachments)) {
      return
    }

    sendMessage(
      {
        text: message.text || "Arquivo enviado",
        files: message.files,
      },
      {
        body: {},
      }
    )

    setText("")
  }

  return (
    <div className="flex h-full w-full overflow-hidden bg-muted/20">
      <section className="mx-auto flex h-full w-full max-w-5xl flex-col px-3 py-3 sm:px-4 lg:px-6">
        <div className="mb-3 flex shrink-0 items-center justify-between gap-3">
          <div className="min-w-0">
            <h2 className="truncate text-sm font-semibold tracking-tight sm:text-base">
              Conversa
            </h2>
            <p className="hidden text-xs text-muted-foreground sm:block">
              Use o assistente para analisar arquivos, resumir conteúdos e tirar dúvidas.
            </p>
          </div>

          <Button
            className="h-9 shrink-0 gap-2 rounded-full px-3 text-xs sm:h-10 sm:px-4 sm:text-sm"
            onClick={() => {
              setMessages([])
              setText("")
            }}
            variant="outline"
            disabled={messages.length === 0 || isBusy}
          >
            <PlusIcon className="size-4" />
            <span className="hidden sm:inline">Nova conversa</span>
            <span className="sm:hidden">Novo</span>
          </Button>
        </div>

        <div className="min-h-0 flex-1 overflow-hidden rounded-3xl border bg-background shadow-sm">
          <Conversation className="h-full">
            <ConversationContent className="space-y-5 px-3 py-4 sm:px-6 sm:py-6">
              {messages.length === 0 && (
                <div className="flex h-full min-h-[52vh] items-center justify-center px-4 text-center">
                  <div className="mx-auto max-w-md space-y-5">
                    <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border bg-primary/10 text-primary shadow-sm">
                      <SparklesIcon className="size-6" />
                    </div>

                    <div className="space-y-2">
                      <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
                        Como posso acelerar seu trabalho hoje?
                      </h1>

                      <p className="text-sm leading-6 text-muted-foreground">
                        Envie uma pergunta, anexe um arquivo ou peça para o assistente organizar suas informações.
                      </p>
                    </div>

                    <div className="grid gap-2 text-left sm:grid-cols-2">
                      {[
                        "Resuma este documento",
                        "Extraia os pontos principais",
                        "Crie uma resposta profissional",
                        "Organize isso em tópicos",
                      ].map((item) => (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setText(item)}
                          className="rounded-2xl border bg-muted/30 px-4 py-3 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
                        >
                          {item}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {messages.map((message, index) => (
                <Message from={message.role} key={message.id}>
                  <MessageContent
                    className={cn(
                      "max-w-[92%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[78%] sm:px-5 sm:text-base",
                      message.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "border bg-muted/40 text-foreground"
                    )}
                  >
                    <MessageParts
                      message={message}
                      isLastMessage={index === messages.length - 1}
                      isStreaming={isStreaming}
                    />
                  </MessageContent>
                </Message>
              ))}

              {isSubmitted && (
                <Message from="assistant">
                  <MessageContent className="max-w-[92%] rounded-3xl border bg-muted/40 px-4 py-3 shadow-sm sm:max-w-[78%]">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Spinner />
                      Pensando...
                    </div>
                  </MessageContent>
                </Message>
              )}
            </ConversationContent>

            <ConversationScrollButton />
          </Conversation>
        </div>

        <div className="shrink-0 pt-3">
          <PromptInput
            onSubmit={handleSubmit}
            className="overflow-hidden rounded-3xl border bg-background shadow-lg shadow-black/5"
            globalDrop
            multiple
          >
            <PromptInputHeader>
              <PromptInputAttachmentsDisplay />
            </PromptInputHeader>

            <PromptInputBody>
              <PromptInputTextarea
                onChange={(e) => setText(e.target.value)}
                value={text}
                placeholder="Digite sua mensagem..."
                className="max-h-40 min-h-14 resize-none px-4 py-4 text-sm sm:text-base"
              />
            </PromptInputBody>

            <PromptInputFooter className="flex items-center justify-between gap-2 px-3 pb-3">
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
              </PromptInputTools>

              <PromptInputSubmit
                disabled={!text.trim() && !isBusy}
                status={status}
              />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </section>
    </div>
  )
}

const MessageParts = ({
  message,
  isLastMessage,
  isStreaming,
}: {
  message: UIMessage
  isLastMessage: boolean
  isStreaming: boolean
}) => {
  const reasoningParts = message.parts.filter(
    (part) => part.type === "reasoning"
  )

  const reasoningText = reasoningParts.map((part) => part.text).join("\n\n")
  const hasReasoning = reasoningParts.length > 0

  const lastPart = message.parts.at(-1)

  const isReasoningStreaming =
    isLastMessage && isStreaming && lastPart?.type === "reasoning"

  return (
    <>
      {hasReasoning && (
        <Reasoning className="w-full" isStreaming={isReasoningStreaming}>
          <ReasoningTrigger />
          <ReasoningContent>{reasoningText}</ReasoningContent>
        </Reasoning>
      )}

      {message.parts.map((part, i) => {
        if (part.type === "text") {
          return (
            <MessageResponse key={`${message.id}-${i}`}>
              {part.text}
            </MessageResponse>
          )
        }

        return null
      })}
    </>
  )
}

export default ChatBot