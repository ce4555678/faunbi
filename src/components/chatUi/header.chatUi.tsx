"use client"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"

type ChatHeaderProps = {
  hasMessages: boolean
  isBusy: boolean
  onNewChat: () => void
}

export default function HeaderChatUi({ isBusy, onNewChat }: ChatHeaderProps) {
  return (
    <div className="mb-4 flex shrink-0 items-center justify-end">
      <Button
        className="h-10 shrink-0 gap-2 rounded-full border border-blue-400/30 bg-blue-600 px-4 text-sm font-medium text-white shadow-lg shadow-blue-600/25 hover:bg-blue-500 disabled:opacity-50 sm:h-11 sm:px-5"
        onClick={onNewChat}
        disabled={isBusy}
      >
        <PlusIcon className="size-4" />
        <span className="hidden sm:inline">Novo atendimento</span>
        <span className="sm:hidden">Novo</span>
      </Button>
    </div>
  )
}
