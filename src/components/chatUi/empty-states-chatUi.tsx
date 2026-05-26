"use client"
import {
  ArrowRightIcon,
  BarChart3Icon,
  BoxesIcon,
  SparklesIcon,
  UserRoundPlusIcon,
  WalletCardsIcon,
} from "lucide-react"
import type {
  ChatRequestOptions,
  FileUIPart,
  UIDataTypes,
  UIMessage,
  UITools,
} from "ai"

type ChatEmptyStateProps = {
  onExampleClick: (
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
}

const examples = [
  {
    title: "Gerar orcamento",
    description: "Crie um orcamento rapido para um cliente",
    prompt: "Gere um orcamento rapido para um cliente",
    icon: WalletCardsIcon,
    tone: "bg-blue-500/15 text-blue-300",
  },
  {
    title: "Cadastrar cliente",
    description: "Adicione um novo cliente ao sistema",
    prompt: "Cadastre um novo cliente",
    icon: UserRoundPlusIcon,
    tone: "bg-violet-500/15 text-violet-300",
  },
  {
    title: "Adicionar ao estoque",
    description: "Inclua novos itens no seu estoque",
    prompt: "Adicione itens ao estoque",
    icon: BoxesIcon,
    tone: "bg-emerald-500/15 text-emerald-300",
  },
  {
    title: "Relatorio mensal",
    description: "Mostre o relatorio de vendas do mes",
    prompt: "Mostre o relatorio mensal",
    icon: BarChart3Icon,
    tone: "bg-amber-500/15 text-amber-300",
  },
]

export default function EmptyStateChatUi({
  onExampleClick,
}: ChatEmptyStateProps) {
  return (
    <div className="relative flex min-h-[44vh] flex-col items-center justify-center overflow-hidden px-4 py-8 text-center sm:min-h-[52vh]">
      <div className="pointer-events-none absolute inset-0 [background-image:linear-gradient(to_right,rgba(59,130,246,.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(59,130,246,.10)_1px,transparent_1px)] [background-size:72px_72px] opacity-30 dark:opacity-40" />
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_10%,rgba(37,99,235,.14),transparent_34%),radial-gradient(circle_at_8%_12%,rgba(124,58,237,.10),transparent_28%),radial-gradient(circle_at_92%_18%,rgba(124,58,237,.10),transparent_24%)] dark:bg-[radial-gradient(circle_at_50%_10%,rgba(37,99,235,.26),transparent_34%),radial-gradient(circle_at_8%_12%,rgba(124,58,237,.22),transparent_28%),radial-gradient(circle_at_92%_18%,rgba(124,58,237,.2),transparent_24%)]" />
      <div className="relative mx-auto w-full max-w-5xl space-y-7">
        {/* Ícone do Topo - Contraste melhorado na borda, fundo e ícone */}
        <div className="mx-auto flex size-20 items-center justify-center rounded-3xl border border-blue-400/60 bg-blue-500/20 text-blue-600 shadow-2xl ring-1 shadow-blue-700/25 ring-violet-400/25 dark:text-blue-400">
          <SparklesIcon className="size-9" />
        </div>

        <div className="space-y-2">
          {/* Título - Gradiente adaptativo para modo claro e escuro */}
          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 sm:text-4xl dark:text-white">
            Como posso{" "}
            <span className="bg-linear-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-violet-400">
              acelerar
            </span>{" "}
            seu trabalho hoje?
          </h1>

          {/* Subtítulo - Cores mais intensas para leitura */}
          <p className="mx-auto max-w-xl text-sm leading-6 text-slate-700 sm:text-base dark:text-slate-300">
            Gerencie clientes, orçamentos, estoque e financeiro usando linguagem
            natural.
          </p>
        </div>

        {/* Grid de Exemplos */}
        <div className="hidden gap-4 text-left sm:grid-cols-2 lg:grid lg:grid-cols-4">
          {examples.map((item) => (
            <button
              key={item.title}
              type="button"
              onClick={() =>
                onExampleClick({
                  text: item.prompt,
                })
              }
              className="group min-h-40 rounded-xl border border-slate-300 bg-white/90 p-4 text-slate-700 shadow-xl shadow-slate-950/5 transition hover:border-blue-500 hover:bg-white hover:text-slate-950 dark:border-slate-700 dark:bg-slate-950/80 dark:text-slate-200 dark:shadow-black/20 dark:hover:border-blue-400 dark:hover:bg-slate-900 dark:hover:text-white"
            >
              <span
                className={`mb-5 flex size-12 items-center justify-center rounded-xl ${item.tone}`}
              >
                <item.icon className="size-6" />
              </span>
              <span className="block text-base font-medium text-slate-950 dark:text-white">
                {item.title}
              </span>
              {/* Texto de descrição interno mais legível */}
              <span className="mt-2 block text-sm leading-5 text-slate-600 dark:text-slate-400">
                {item.description}
              </span>
              {/* Seta com mais destaque antes e durante o hover */}
              <ArrowRightIcon className="mt-4 size-5 text-slate-500 transition group-hover:translate-x-1 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400" />
            </button>
          ))}
        </div>

        {/* Rodapé de Dica */}
        <p className="flex items-center justify-center gap-2 text-xs text-slate-600 sm:text-sm dark:text-slate-300">
          <SparklesIcon className="size-4 text-blue-600 dark:text-blue-400" />
          Dica: você pode enviar arquivos, fotos ou documentos.
        </p>
      </div>
    </div>
  )
}
