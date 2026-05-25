"use client"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

type ChatHeaderProps = {
  hasMessages: boolean
  isBusy: boolean
  onNewChat: () => void
}

export default function HeaderChatUi({
  hasMessages,
  isBusy,
  onNewChat,
}: ChatHeaderProps) {
  return (
    <div className="mb-3 flex shrink-0 items-center justify-between gap-3">
      <div className="min-w-0">
        <h2 className="truncate text-sm font-semibold tracking-tight sm:text-base">
          Conversa
        </h2>

        <p className="hidden text-xs text-muted-foreground sm:block">
          Use o assistente para analisar arquivos, resumir conteúdos e tirar
          dúvidas.
        </p>
      </div>

      <Button
        className="h-9 shrink-0 gap-2 rounded-full px-3 text-xs sm:h-10 sm:px-4 sm:text-sm"
        onClick={onNewChat}
        variant="outline"
        disabled={!hasMessages || isBusy}
      >
        <PlusIcon className="size-4" />
        <span className="hidden sm:inline">Nova conversa</span>
        <span className="sm:hidden">Novo</span>
      </Button>
    </div>
  )
}
