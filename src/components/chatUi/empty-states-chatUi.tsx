"use client"
import { SparklesIcon } from "lucide-react"
import type { ChatRequestOptions, FileUIPart, UIDataTypes, UIMessage, UITools } from "ai"

type ChatEmptyStateProps = {
  onExampleClick: (message?: (Omit<UIMessage<unknown, UIDataTypes, UITools>, "id" | "role"> & {
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
}

const examples = [
  "Gere um orçamento rápido",
  "Cadastre um novo cliente",
  "Adicione itens ao estoque",
  "Mostre o relatório mensal",
]

export default function EmptyStateChatUi({ onExampleClick }: ChatEmptyStateProps) {
  return (
    <div className="flex h-full min-h-[52vh] items-center justify-center px-4 text-center">
      <div className="mx-auto max-w-md space-y-5">
        <div className="mx-auto flex size-14 items-center justify-center rounded-2xl border bg-primary/10 text-primary shadow-sm">
          <SparklesIcon className="size-6 dark:text-blue-300" />
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">
            Como posso acelerar seu trabalho hoje?
          </h1>

          <p className="text-sm leading-6 text-muted-foreground">
            Envie uma pergunta, anexe um arquivo ou peça para o assistente
            organizar suas informações.
          </p>
        </div>

        <div className="grid gap-2 text-left sm:grid-cols-2">
          {examples.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => onExampleClick({
                text: item
              })}
              className="rounded-2xl border bg-muted/30 px-4 py-3 text-sm text-muted-foreground transition hover:bg-muted hover:text-foreground"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}