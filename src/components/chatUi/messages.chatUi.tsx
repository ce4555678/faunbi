"use client"
import type {
  ChatRequestOptions,
  FileUIPart,
  UIDataTypes,
  UIMessage,
  UITools,
} from "ai"
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation"
import { Message, MessageContent } from "@/components/ai-elements/message"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

import ChatUi from "."

type ChatMessagesProps = {
  messages: UIMessage[]
  text: string
  setText: (text: string) => void
  status: string
  sendMessage: (
    message?:
      | (Omit<UIMessage<unknown, UIDataTypes, UITools>, "id" | "role"> & {
          id?: string | undefined
          role?: "system" | "user" | "assistant" | undefined
        } & {
          text?: never
          files?: never
          messageId?: string
        })
      | {
          text: string
          files?: FileList | FileUIPart[]
          metadata?: unknown
          parts?: never
          messageId?: string
        }
      | {
          files: FileList | FileUIPart[]
          metadata?: unknown
          parts?: never
          messageId?: string
        }
      | undefined,
    options?: ChatRequestOptions
  ) => void
  isStreaming: boolean
  isSubmitted: boolean
}

export default function MessagesChatUi({
  messages,
  // setText,
  sendMessage,
  isStreaming,
  isSubmitted,
}: ChatMessagesProps) {
  return (
    <div className="min-h-0 flex-1 overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-950/5 dark:border-slate-700/80 dark:bg-[#050b16] dark:shadow-2xl dark:shadow-black/30">
      <Conversation className="no-scrollbar h-full">
        <ConversationContent className="no-scrollbar space-y-5 px-0 py-0">
          {messages.length === 0 && (
            <ChatUi.empty onExampleClick={sendMessage} />
          )}

          {messages.length > 0 && (
            <div className="space-y-5 px-3 py-4 sm:px-6 sm:py-6">
              {messages.map((message, index) => (
                <Message from={message.role} key={`${message.id}${index}`}>
                  <MessageContent
                    className={cn(
                      "max-w-[92%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[78%] sm:px-5 sm:text-base",
                      message.role === "user"
                        ? "bg-blue-600 text-white"
                        : "border border-slate-200 bg-slate-50 text-slate-900 dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100"
                    )}
                  >
                    <ChatUi.messagePart
                      message={message}
                      isLastMessage={index === messages.length - 1}
                      isStreaming={isStreaming}
                    />
                  </MessageContent>
                </Message>
              ))}
            </div>
          )}

          {isSubmitted && (
            <div className="px-3 pb-4 sm:px-6 sm:pb-6">
              <Message from="assistant">
                <MessageContent className="max-w-[92%] rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-900 shadow-sm sm:max-w-[78%] dark:border-slate-700/80 dark:bg-slate-900/80 dark:text-slate-100">
                  <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                    <Spinner />
                    Pensando...
                  </div>
                </MessageContent>
              </Message>
            </div>
          )}
        </ConversationContent>

        <ConversationScrollButton />
      </Conversation>
    </div>
  )
}
