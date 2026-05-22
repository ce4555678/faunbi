"use client"
import type { UIMessage } from "ai"
import { MessageResponse } from "@/components/ai-elements/message"
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning"

type ChatMessagePartsProps = {
  message: UIMessage
  isLastMessage: boolean
  isStreaming: boolean
}

export default function MessagePartsChatUi({
  message,
  isLastMessage,
  isStreaming,
}: ChatMessagePartsProps) {
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

      {message.parts.map((part, index) => {
        if (part.type !== "text") return null

        return (
          <MessageResponse key={`${message.id}-${index}`}>
            {part.text}
          </MessageResponse>
        )
      })}
    </>
  )
}