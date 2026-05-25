"use client"
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputFooter,
  PromptInputHeader,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
} from "@/components/ai-elements/prompt-input"
import ChatUi from "."
import { ChatStatus } from "ai"

type ChatInputProps = {
  text: string
  setText: (text: string) => void
  status: ChatStatus
  isBusy: boolean
  onSubmit: (message: PromptInputMessage) => void
}

export default function InputChatUi({
  text,
  setText,
  status,
  isBusy,
  onSubmit,
}: ChatInputProps) {
  return (
    <div className="shrink-0 pt-3">
      <PromptInput
        onSubmit={onSubmit}
        className="overflow-hidden rounded-3xl border bg-background shadow-lg shadow-black/5"
        globalDrop
        multiple
      >
        <PromptInputHeader>
          <ChatUi.PromptInputAttachmentsDisplay />
        </PromptInputHeader>

        <PromptInputBody>
          <PromptInputTextarea
            onChange={(event) => setText(event.target.value)}
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
            disabled={isBusy || !text.trim()}
            status={status}
          />
        </PromptInputFooter>
      </PromptInput>
    </div>
  )
}
