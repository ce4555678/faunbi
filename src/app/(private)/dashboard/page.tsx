import {
  ArrowUpRightIcon,
  BarChart3Icon,
  BoxesIcon,
  CalendarClockIcon,
  CircleDollarSignIcon,
  FileTextIcon,
  MessageSquareTextIcon,
  UserRoundIcon,
} from "lucide-react"
import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Dashboard",
}

const metrics = [
  {
    title: "Faturamento",
    value: "R$ 24.350,00",
    detail: "+12% vs. mes anterior",
    icon: CircleDollarSignIcon,
    tone: "bg-blue-500/15 text-blue-300 ring-blue-400/25",
  },
  {
    title: "Orcamentos abertos",
    value: "18",
    detail: "6 aguardando retorno",
    icon: FileTextIcon,
    tone: "bg-violet-500/15 text-violet-300 ring-violet-400/25",
  },
  {
    title: "Clientes ativos",
    value: "126",
    detail: "9 novos esta semana",
    icon: UserRoundIcon,
    tone: "bg-emerald-500/15 text-emerald-300 ring-emerald-400/25",
  },
  {
    title: "Estoque baixo",
    value: "7 itens",
    detail: "Repor nas proximas 48h",
    icon: BoxesIcon,
    tone: "bg-amber-500/15 text-amber-300 ring-amber-400/25",
  },
]

const activities = [
  "Orcamento #1842 enviado para Joao Pereira",
  "Cliente Ana Martins cadastrado pelo assistente",
  "Entrada de estoque: 24 unidades de papel A4",
  "Relatorio financeiro mensal gerado",
]

const pipeline = [
  { label: "Novos", value: 12, color: "bg-blue-400" },
  { label: "Em negociacao", value: 8, color: "bg-violet-400" },
  { label: "Aprovados", value: 5, color: "bg-emerald-400" },
  { label: "Vencidos", value: 3, color: "bg-amber-400" },
]

export default function DashboardPage() {
  return (
    <main className="h-full overflow-auto bg-slate-50 px-4 py-5 text-slate-950 sm:px-6 lg:px-8 dark:bg-[#020711] dark:text-slate-100">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-5">
        <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5 dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-2xl dark:shadow-black/20">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-medium text-blue-600 dark:text-blue-300">
                Dashboard
              </p>
              <h1 className="mt-1 text-2xl font-semibold tracking-tight text-slate-950 sm:text-3xl dark:text-white">
                Visao geral da operacao
              </h1>
              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">
                Acompanhe clientes, orcamentos, estoque e financeiro em um unico
                lugar.
              </p>
            </div>

            <Link
              href="/chat"
              className="inline-flex h-11 items-center justify-center gap-2 rounded-full border border-blue-400/30 bg-blue-600 px-5 text-sm font-medium text-white shadow-lg shadow-blue-600/25 transition hover:bg-blue-500"
            >
              <MessageSquareTextIcon className="size-4" />
              Abrir assistente
            </Link>
          </div>
        </section>

        <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => {
            const Icon = metric.icon

            return (
              <article
                key={metric.title}
                className="rounded-xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-950/5 dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-black/15"
              >
                <div className="flex items-start justify-between gap-3">
                  <div
                    className={`flex size-11 items-center justify-center rounded-xl ring-1 ${metric.tone}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <ArrowUpRightIcon className="size-4 text-slate-500" />
                </div>
                <p className="mt-5 text-sm text-slate-500 dark:text-slate-400">
                  {metric.title}
                </p>
                <p className="mt-1 text-2xl font-semibold text-slate-950 dark:text-white">
                  {metric.value}
                </p>
                <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
                  {metric.detail}
                </p>
              </article>
            )
          })}
        </section>

        <section className="grid gap-5 xl:grid-cols-[1.35fr_.65fr]">
          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5 dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-black/15">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-950 dark:text-white">
                  Pipeline de orcamentos
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Distribuicao dos atendimentos comerciais.
                </p>
              </div>
              <BarChart3Icon className="size-5 text-blue-500 dark:text-blue-300" />
            </div>

            <div className="mt-6 space-y-5">
              {pipeline.map((item) => (
                <div key={item.label}>
                  <div className="mb-2 flex items-center justify-between text-sm">
                    <span className="text-slate-600 dark:text-slate-300">
                      {item.label}
                    </span>
                    <span className="font-medium text-slate-950 dark:text-white">
                      {item.value}
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-800">
                    <div
                      className={`h-full rounded-full ${item.color}`}
                      style={{ width: `${item.value * 6}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="rounded-xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5 dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-black/15">
            <div className="flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-semibold text-slate-950 dark:text-white">
                  Agenda de hoje
                </h2>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  Proximas acoes sugeridas.
                </p>
              </div>
              <CalendarClockIcon className="size-5 text-violet-500 dark:text-violet-300" />
            </div>

            <div className="mt-6 space-y-3">
              {[
                "Revisar 3 orcamentos",
                "Ligar para 2 clientes",
                "Repor 7 itens",
              ].map((item) => (
                <div
                  key={item}
                  className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-600 dark:border-slate-800/80 dark:bg-slate-900/60 dark:text-slate-300"
                >
                  {item}
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-xl shadow-slate-950/5 dark:border-slate-800/80 dark:bg-slate-950/70 dark:shadow-black/15">
          <h2 className="text-base font-semibold text-slate-950 dark:text-white">
            Atividades recentes
          </h2>
          <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-800/80">
            {activities.map((activity) => (
              <div
                key={activity}
                className="flex items-center justify-between gap-4 py-3 text-sm"
              >
                <span className="text-slate-600 dark:text-slate-300">
                  {activity}
                </span>
                <span className="shrink-0 text-xs text-slate-500">agora</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
