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
import { SpeechInput } from "@/components/ai-elements/speech-input"
import ChatUi from "."
import { ChatStatus } from "ai"
import { PlusIcon } from "lucide-react"
import { useCallback, useEffect, useRef } from "react"
import { toast } from "sonner"
import { transcribeChatAudio } from "@/app/(private)/assistente/actions"

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
    <div className="w-full shrink-0 pt-3">
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
        className="overflow-hidden rounded-3xl border border-slate-200 bg-white px-3 py-2 shadow-[0_18px_45px_rgba(15,23,42,.08)] transition focus-within:border-blue-400/70 focus-within:shadow-[0_0_0_1px_rgba(59,130,246,.24),0_20px_60px_rgba(37,99,235,.10)] dark:border-slate-700/80 dark:bg-slate-950/95 dark:shadow-[0_0_0_1px_rgba(59,130,246,.18),0_18px_60px_rgba(0,0,0,.36)] dark:focus-within:border-blue-400/60 dark:focus-within:shadow-[0_0_0_1px_rgba(59,130,246,.45),0_20px_70px_rgba(37,99,235,.14)] [&_[data-slot=input-group]]:h-auto [&_[data-slot=input-group]]:flex-wrap [&_[data-slot=input-group]]:border-0 [&_[data-slot=input-group]]:bg-transparent"
        globalDrop
        multiple
      >
        <ChatUi.PromptInputAttachmentsDisplay />

        <PromptInputBody className="flex w-full items-center gap-2">
          <UploadButton />
          <PromptInputTextarea
            onChange={(event) => setText(event.target.value)}
            value={text}
            placeholder="Pergunte alguma coisa"
            rows={1}
            className="no-scrollbar max-h-32 min-h-11 flex-1 resize-none px-2 py-3 text-[15px] leading-5 text-slate-900 placeholder:text-slate-400 sm:text-base dark:text-slate-100 dark:placeholder:text-slate-500"
          />
          <AudioButton text={text} setText={setText} disabled={isBusy} />
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
      className="size-11 rounded-full bg-blue-600 text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 disabled:bg-slate-100 disabled:text-slate-400 disabled:shadow-none dark:disabled:bg-slate-900 dark:disabled:text-slate-600"
      disabled={isBusy || !hasMessage}
      status={status}
    />
  )
}

function UploadButton() {
  const attachments = usePromptInputAttachments()

  return (
    <PromptInputButton
      className="size-11 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
      onClick={attachments.openFileDialog}
      tooltip="Anexar imagem ou PDF"
    >
      <PlusIcon className="size-5" />
    </PromptInputButton>
  )
}

function AudioButton({
  disabled,
  text,
  setText,
}: {
  disabled: boolean
  text: string
  setText: (text: string) => void
}) {
  const latestTextRef = useRef(text)

  useEffect(() => {
    latestTextRef.current = text
  }, [text])

  const handleTranscriptionChange = useCallback(
    (transcript: string) => {
      setText(
        [latestTextRef.current.trim(), transcript.trim()]
          .filter(Boolean)
          .join(" ")
      )
    },
    [setText]
  )

  const handleAudioRecorded = useCallback(
    async (audioBlob: Blob, durationMs: number) => {
      const audioFile = new File([audioBlob], "audio.webm", {
        type: audioBlob.type,
      })

      const result = await transcribeChatAudio({ audio: audioFile, durationMs })

      if (result?.serverError || result?.validationErrors) {
        toast.error(
          result?.serverError ?? "O audio deve ter no maximo 30 segundos."
        )
        return ""
      }

      return result?.data?.text ?? ""
    },
    []
  )

  return (
    <SpeechInput
      className="size-11 rounded-full bg-transparent text-slate-500 shadow-none hover:bg-slate-100 hover:text-slate-950 data-[recording=true]:bg-red-500/15 data-[recording=true]:text-red-600 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white dark:data-[recording=true]:bg-red-500/20 dark:data-[recording=true]:text-red-100"
      disabled={disabled}
      lang="pt-BR"
      maxDurationMs={30_000}
      onAudioRecorded={handleAudioRecorded}
      onTranscriptionChange={handleTranscriptionChange}
      size="icon"
      type="button"
      variant="ghost"
    />
  )
}
