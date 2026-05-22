"use client"
import type { ChatRequestOptions, FileUIPart, UIDataTypes, UIMessage, UITools } from "ai"
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
  sendMessage: (message?: (Omit<UIMessage<unknown, UIDataTypes, UITools>, "id" | "role"> & {
    id?: string | undefined;
    role?: "system" | "user" | "assistant" | undefined;
} & {
    text?: never;
    files?: never;
    messageId?: string;
}) | {
    text: string;
    files?: FileList | FileUIPart[];
    metadata?: unknown;
    parts?: never;
    messageId?: string;
} | {
    files: FileList | FileUIPart[];
    metadata?: unknown;
    parts?: never;
    messageId?: string;
} | undefined, options?: ChatRequestOptions) => void
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
    <div className="min-h-0 flex-1 overflow-hidden rounded-3xl border bg-background shadow-sm">
      <Conversation className="h-full">
        <ConversationContent className="space-y-5 px-3 py-4 sm:px-6 sm:py-6">
          {messages.length === 0 && <ChatUi.empty onExampleClick={sendMessage} />}

          {messages.map((message, index) => (
            <Message from={message.role} key={`${message.id}${index}`}>
              <MessageContent
                className={cn(
                  "max-w-[92%] rounded-3xl px-4 py-3 text-sm leading-6 shadow-sm sm:max-w-[78%] sm:px-5 sm:text-base",
                  message.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "border bg-muted/40 text-foreground"
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
  )
}