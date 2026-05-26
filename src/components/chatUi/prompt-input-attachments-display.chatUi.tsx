"use client"
import { usePromptInputAttachments } from "@/components/ai-elements/prompt-input"
import { FileTextIcon, ImageIcon, XIcon } from "lucide-react"
import Image from "next/image"

export default function PromptInputAttachmentsDisplayChatUi() {
  const attachments = usePromptInputAttachments()

  if (attachments.files.length === 0) return null

  return (
    <div className="order-first mb-2 flex max-h-32 w-full flex-wrap gap-2 overflow-y-auto border-b border-slate-200 pb-2 dark:border-white/10">
      {attachments.files.map((attachment) => (
        <div
          key={attachment.id}
          className="group flex max-w-64 items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 p-1.5 pr-2 text-left text-sm text-slate-700 dark:border-white/10 dark:bg-black/20 dark:text-slate-200"
        >
          <div className="flex size-11 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-300">
            {attachment.mediaType?.startsWith("image/") && attachment.url ? (
              <Image
                src={attachment.url}
                alt={attachment.filename || "Imagem anexada"}
                width={44}
                height={44}
                className="size-full object-cover"
              />
            ) : attachment.mediaType === "application/pdf" ? (
              <FileTextIcon className="size-5 text-red-300" />
            ) : (
              <ImageIcon className="size-5" />
            )}
          </div>

          <div className="min-w-0">
            <p className="truncate text-xs font-medium text-slate-900 dark:text-slate-100">
              {attachment.filename || "Arquivo anexado"}
            </p>
            <p className="mt-0.5 text-[11px] text-slate-500">
              {attachment.mediaType === "application/pdf" ? "PDF" : "Imagem"}
            </p>
          </div>

          <button
            type="button"
            aria-label="Remover arquivo"
            onClick={() => attachments.remove(attachment.id)}
            className="ml-auto flex size-7 shrink-0 items-center justify-center rounded-full text-slate-400 opacity-80 transition group-hover:opacity-100 hover:bg-slate-200 hover:text-slate-950 dark:hover:bg-white/10 dark:hover:text-white"
          >
            <XIcon className="size-4" />
          </button>
        </div>
      ))}
    </div>
  )
}
