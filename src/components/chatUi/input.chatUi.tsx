"use client"
import {
  PromptInput,
  PromptInputBody,
  PromptInputButton,
  type PromptInputMessage,
  PromptInputSubmit,
  PromptInputTextarea,
  usePromptInputAttachments,
} from "@/components/ai-elements/prompt-input"
import ChatUi from "."
import { ChatStatus } from "ai"
import { PlusIcon } from "lucide-react"
import { toast } from "sonner"

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
    <div className="w-full shrink-0 pt-3 dark:bg-background">
      <PromptInput
        onSubmit={onSubmit}
        onError={(error) => {
          const messages = {
            accept: "Envie somente imagens ou PDFs.",
            max_file_size: "Cada arquivo deve ter ate 10 MB.",
            max_files: "Voce pode anexar no maximo 3 arquivos.",
          }
          toast.error(messages[error.code])
        }}
        accept="image/*,application/pdf"
        maxFileSize={10 * 1024 * 1024}
        maxFiles={3}
        className="rounded-3xl focus-within:ring-0 focus-within:shadow-none  border border-slate-200 bg-background px-3 py-2 shadow-[0_18px_45px_rgba(15,23,42,.08)] transition dark:border-slate-700/80 dark:shadow-[0_0_0_1px_rgba(59,130,246,.18),0_18px_60px_rgba(0,0,0,.36)] **:data-[slot=input-group]:h-auto **:data-[slot=input-group]:flex-wrap **:data-[slot=input-group]:border-0 **:data-[slot=input-group]:bg-transparent"
        globalDrop
        multiple
      >
        <ChatUi.PromptInputAttachmentsDisplay />

        <PromptInputBody className="flex w-full items-center gap-2 bg-background **:data-[slot=prompt-input-textarea]:focus:outline-none **:data-[slot=prompt-input-textarea]:focus:ring-0 focus-within:ring-0 focus-within:shadow-none">
          <UploadButton />
        
          <PromptInputTextarea
            onChange={(event) => setText(event.target.value)}
            value={text}
            placeholder="Pergunte alguma coisa"
            rows={1}
  className="overflow-hidden bg-background no-scrollbar max-h-32 min-h-11 flex-1 resize-none px-2 py-3 text-[15px] leading-5 text-slate-900 placeholder:text-slate-600 sm:text-base dark:text-slate-100 dark:placeholder:text-slate-500 focus-visible:ring-0! focus-visible:border-transparent!"
          />
          <SubmitButton text={text} isBusy={isBusy} status={status} />
        </PromptInputBody>
      </PromptInput>
      <p className="mt-2 text-center text-[11px] leading-4 text-slate-500 sm:text-xs">
        O assistente pode cometer erros. Por isso, lembre-se de conferir
        informacoes relevantes.
      </p>
    </div>
  )
}

function SubmitButton({
  isBusy,
  status,
  text,
}: {
  isBusy: boolean
  status: ChatStatus
  text: string
}) {
  const attachments = usePromptInputAttachments()
  const hasMessage = Boolean(text.trim() || attachments.files.length)

  return (
    <PromptInputSubmit
      className="size-11 rounded-lg bg-gray-600 text-white hover:bg-gray-500 active:bg-gray-700 disabled:bg-slate-200 disabled:text-slate-400 disabled:shadow-none dark:bg-gray-500 dark:hover:bg-gray-400 dark:active:bg-gray-600 dark:shadow-gray-500/25 dark:disabled:bg-slate-800 dark:disabled:text-slate-600"
      disabled={isBusy || !hasMessage}
      status={status}
    />
  )
}

function UploadButton() {
  const attachments = usePromptInputAttachments()

  return (
    <PromptInputButton
      className="size-11 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
      onClick={attachments.openFileDialog}
      tooltip="Anexar imagem ou PDF"
    >
      <PlusIcon className="size-5" />
    </PromptInputButton>
  )
}