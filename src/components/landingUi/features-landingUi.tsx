"use client"
import {
  MessageSquare,
  Zap,
  Shield,
  Smartphone,
  Brain,
  Clock,
  BarChart3,
  Globe,
  ArrowUpRight,
  CheckCircle2,
} from "lucide-react"

import { cn } from "@/lib/utils"

const features = [
  {
    icon: MessageSquare,
    title: "Interface Conversacional",
    description:
      "Esqueça menus complicados. Digite ou fale o que precisa e a IA executa tarefas reais para você.",
    highlight: true,
  },
  {
    icon: Brain,
    title: "IA que Aprende",
    description:
      "Entende seus padrões, seu contexto e reduz tarefas repetitivas com inteligência.",
    highlight: false,
  },
  {
    icon: Zap,
    title: "Execução Instantânea",
    description:
      "Agenda compromissos, cria orçamentos e registra vendas em poucos segundos.",
    highlight: false,
  },
  {
    icon: Smartphone,
    title: "Mobile First",
    description:
      "Controle seu negócio direto do celular, sem depender de planilhas ou computador.",
    highlight: false,
  },
  {
    icon: Shield,
    title: "Dados Protegidos",
    description:
      "Mais segurança para informações financeiras, clientes, pedidos e documentos.",
    highlight: false,
  },
  {
    icon: Clock,
    title: "Disponível 24/7",
    description:
      "Consulte, registre e organize informações a qualquer hora do dia.",
    highlight: false,
  },
  {
    icon: BarChart3,
    title: "Relatórios Inteligentes",
    description:
      "Pergunte como foi seu mês e receba uma visão clara do desempenho.",
    highlight: false,
  },
  {
    icon: Globe,
    title: "Português Natural",
    description:
      "Fale como você fala no dia a dia. A IA entende contexto e linguagem simples.",
    highlight: false,
  },
]

export default function FeaturesLandingUi() {
  return (
    <section
      id="features"
      className="relative overflow-hidden bg-background py-24 text-foreground md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-10 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px] dark:bg-blue-500/10" />
        <div className="absolute right-0 bottom-0 h-105 w-105 rounded-full bg-cyan-500/10 blur-[120px] dark:bg-cyan-400/10" />
        <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.08),transparent_35%),linear-gradient(to_bottom,transparent,rgba(255,255,255,0.7))] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.12),transparent_35%),linear-gradient(to_bottom,transparent,rgba(2,6,23,0.8))]" />

        <div
          className="absolute inset-0 opacity-[0.045] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm dark:border-blue-400/20 dark:bg-blue-950/40 dark:text-blue-200">
            <SparkBadge />
            FUNCIONALIDADES
          </div>

          <h2 className="mb-6 text-3xl font-black tracking-tight text-balance text-slate-950 sm:text-4xl md:text-5xl dark:text-white">
            Tudo que você precisa,{" "}
            <span className="bg-linear-to-r from-blue-700 via-cyan-500 to-blue-700 bg-clip-text text-transparent dark:from-blue-300 dark:via-cyan-200 dark:to-blue-300">
              sem complicação
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-pretty text-slate-600 dark:text-slate-300">
            Uma plataforma para autônomos que querem operar com mais velocidade,
            menos retrabalho e uma gestão com mentalidade de empresa grande.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <article
              key={feature.title}
              className={cn(
                "group relative overflow-hidden rounded-3xl border transition-all duration-300",
                "hover:-translate-y-1 hover:shadow-2xl",
                feature.highlight
                  ? "border-blue-500/25 bg-blue-600 p-7 text-white shadow-2xl shadow-blue-600/25 lg:col-span-2 lg:row-span-2 lg:min-h-107.5 dark:border-blue-400/20 dark:bg-blue-500/95"
                  : "border-slate-200 bg-white/80 p-6 shadow-sm shadow-slate-950/5 backdrop-blur-xl hover:border-blue-500/30 hover:shadow-blue-950/10 dark:border-slate-800 dark:bg-slate-950/70 dark:hover:border-blue-400/30 dark:hover:shadow-blue-500/10"
              )}
              style={{
                animationDelay: `${index * 80}ms`,
              }}
            >
              {/* Decorative layers */}
              {feature.highlight ? (
                <>
                  <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-white/20 blur-3xl" />
                  <div className="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-cyan-300/20 blur-3xl" />
                  <div
                    className="absolute inset-0 opacity-20"
                    style={{
                      backgroundImage:
                        "linear-gradient(rgba(255,255,255,0.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.35) 1px, transparent 1px)",
                      backgroundSize: "42px 42px",
                    }}
                  />
                </>
              ) : (
                <div className="absolute inset-0 bg-linear-to-br from-blue-50/0 via-blue-50/0 to-cyan-50/0 transition-colors duration-300 group-hover:from-blue-50 group-hover:to-cyan-50 dark:group-hover:from-blue-950/20 dark:group-hover:to-cyan-950/10" />
              )}

              <div className="relative z-10 flex h-full flex-col">
                {/* Top */}
                <div className="mb-5 flex items-start justify-between gap-4">
                  <div
                    className={cn(
                      "inline-flex items-center justify-center rounded-2xl transition-all duration-300",
                      feature.highlight
                        ? "h-14 w-14 bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-xl"
                        : "h-12 w-12 bg-slate-100 text-blue-700 group-hover:bg-blue-600 group-hover:text-white dark:bg-slate-900 dark:text-blue-300 dark:group-hover:bg-blue-500"
                    )}
                  >
                    <feature.icon
                      className={cn(feature.highlight ? "h-7 w-7" : "h-6 w-6")}
                    />
                  </div>

                  {feature.highlight ? (
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-xs font-bold text-white ring-1 ring-white/20 backdrop-blur-xl">
                      <Zap className="h-3.5 w-3.5" />
                      Principal
                    </span>
                  ) : (
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border border-slate-200 bg-white/70 text-slate-400 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:border-slate-800 dark:bg-slate-900/70 dark:text-slate-500">
                      <ArrowUpRight className="h-4 w-4" />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className={cn(feature.highlight && "mt-auto")}>
                  <h3
                    className={cn(
                      "font-bold tracking-tight",
                      feature.highlight
                        ? "mb-4 max-w-md text-3xl sm:text-4xl"
                        : "mb-2 text-lg text-slate-950 dark:text-white"
                    )}
                  >
                    {feature.title}
                  </h3>

                  <p
                    className={cn(
                      "leading-relaxed",
                      feature.highlight
                        ? "max-w-lg text-base text-blue-50 sm:text-lg"
                        : "text-sm text-slate-600 dark:text-slate-400"
                    )}
                  >
                    {feature.description}
                  </p>
                </div>

                {/* Highlight extra content */}
                {feature.highlight && (
                  <div className="mt-8 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-2xl bg-white/12 p-4 ring-1 ring-white/15 backdrop-blur-xl">
                      <div className="mb-2 flex items-center gap-2 text-sm font-bold">
                        <CheckCircle2 className="h-4 w-4" />
                        Menos cliques
                      </div>
                      <p className="text-sm leading-relaxed text-blue-50/90">
                        Transforme comandos simples em ações de gestão.
                      </p>
                    </div>

                    <div className="rounded-2xl bg-white/12 p-4 ring-1 ring-white/15 backdrop-blur-xl">
                      <div className="mb-2 flex items-center gap-2 text-sm font-bold">
                        <CheckCircle2 className="h-4 w-4" />
                        Mais controle
                      </div>
                      <p className="text-sm leading-relaxed text-blue-50/90">
                        Centralize agenda, pedidos, estoque e financeiro.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function SparkBadge() {
  return (
    <span className="relative flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white shadow-sm shadow-blue-600/30 dark:bg-blue-400 dark:text-blue-950">
      <Zap className="h-3 w-3" />
      <span className="absolute inset-0 rounded-full bg-blue-600 opacity-30 blur-md dark:bg-blue-300" />
    </span>
  )
}
