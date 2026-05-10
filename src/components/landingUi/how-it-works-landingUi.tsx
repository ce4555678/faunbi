"use client"

import { useState } from "react"
import {
  MessageSquare,
  Sparkles,
  CheckCircle2,
  Calendar,
  FileText,
  TrendingUp,
  ArrowRight,
  Send,
  Mic,
} from "lucide-react"

import { cn } from "@/lib/utils"

const steps = [
  {
    number: "01",
    title: "Fale o que precisa",
    description:
      "Digite ou use voz para pedir uma ação. A IA entende comandos do jeito que você fala no dia a dia.",
    icon: MessageSquare,
    example: {
      user: "Agendar corte masculino para João Silva amanhã às 10h",
      response:
        "Agendei o corte masculino para João Silva amanhã (11/05) às 10h. Deseja enviar uma confirmação por WhatsApp?",
    },
  },
  {
    number: "02",
    title: "A IA entende e executa",
    description:
      "O sistema identifica a intenção, encontra o módulo correto e transforma sua mensagem em ação.",
    icon: Sparkles,
    example: {
      user: "Criar orçamento: pintura apartamento 2 quartos, sala e cozinha",
      response:
        "Criei o orçamento #247 com 4 ambientes. Valor estimado: R$ 2.800. Incluí materiais básicos. Quer adicionar mão de obra?",
    },
  },
  {
    number: "03",
    title: "Confirme e acompanhe",
    description:
      "Revise, confirme, ajuste ou acompanhe os resultados sem precisar navegar por telas complexas.",
    icon: CheckCircle2,
    example: {
      user: "Quanto recebi de clientes novos este mês?",
      response:
        "Este mês você recebeu R$ 4.250 de 8 clientes novos. Isso representa 35% do faturamento total. Ticket médio: R$ 531.",
    },
  },
]

const useCases = [
  { icon: Calendar, label: "Agenda", color: "text-blue-600 dark:text-blue-300" },
  {
    icon: FileText,
    label: "Orçamentos",
    color: "text-emerald-600 dark:text-emerald-300",
  },
  {
    icon: TrendingUp,
    label: "Finanças",
    color: "text-violet-600 dark:text-violet-300",
  },
]

export default function HowItWorksLandingUi() {
  const [activeStep, setActiveStep] = useState(0)

  const active = steps[activeStep]

  return (
    <section
      id="how-it-works"
      className="relative overflow-hidden bg-slate-50 py-24 text-slate-950 md:py-32 dark:bg-slate-950 dark:text-white"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-1/2 h-130 w-130 -translate-x-1/2 rounded-full bg-blue-600/10 blur-[130px] dark:bg-blue-500/10" />
        <div className="absolute right-0 bottom-0 h-105 w-105 rounded-full bg-cyan-500/10 blur-[120px] dark:bg-cyan-400/10" />

        <div
          className="absolute inset-0 opacity-[0.05] dark:opacity-[0.08]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)",
            backgroundSize: "42px 42px",
          }}
        />

        <div className="absolute inset-0 bg-linear-to-b from-transparent via-slate-50/70 to-slate-50 dark:via-slate-950/70 dark:to-slate-950" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-white px-4 py-2 text-sm font-bold text-blue-700 shadow-sm dark:border-blue-400/20 dark:bg-blue-950/40 dark:text-blue-200">
            <Sparkles className="h-4 w-4" />
            COMO FUNCIONA
          </div>

          <h2 className="mb-6 text-3xl font-black tracking-tight text-balance sm:text-4xl md:text-5xl">
            Três passos para{" "}
            <span className="bg-linear-to-r from-blue-700 via-cyan-500 to-blue-700 bg-clip-text text-transparent dark:from-blue-300 dark:via-cyan-200 dark:to-blue-300">
              simplificar tudo
            </span>
          </h2>

          <p className="mx-auto max-w-2xl text-lg leading-relaxed text-pretty text-slate-600 dark:text-slate-300">
            Sem treinamento, sem manual e sem fricção operacional. Você fala, a
            IA organiza, executa e te entrega controle em tempo real.
          </p>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          {/* Steps */}
          <div className="space-y-4">
            {steps.map((step, index) => {
              const isActive = activeStep === index

              return (
                <button
                  key={step.number}
                  type="button"
                  onClick={() => setActiveStep(index)}
                  className={cn(
                    "group relative w-full overflow-hidden rounded-3xl border p-5 text-left transition-all duration-300 sm:p-6",
                    isActive
                      ? "border-blue-500/30 bg-white shadow-2xl shadow-blue-950/10 dark:border-blue-400/25 dark:bg-slate-900 dark:shadow-blue-500/10"
                      : "border-slate-200 bg-white/70 shadow-sm shadow-slate-950/5 hover:-translate-y-0.5 hover:border-blue-500/25 hover:bg-white hover:shadow-xl dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-blue-400/25 dark:hover:bg-slate-900"
                  )}
                >
                  <div
                    className={cn(
                      "absolute inset-y-0 left-0 w-1 transition-all duration-300",
                      isActive
                        ? "bg-blue-600 dark:bg-blue-400"
                        : "bg-transparent"
                    )}
                  />

                  <div className="flex items-start gap-4">
                    <div
                      className={cn(
                        "flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-all duration-300",
                        isActive
                          ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25 dark:bg-blue-500"
                          : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-700 dark:bg-slate-800 dark:text-slate-400 dark:group-hover:bg-blue-950/40 dark:group-hover:text-blue-200"
                      )}
                    >
                      <step.icon className="h-6 w-6" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="mb-2 flex flex-wrap items-center gap-3">
                        <span
                          className={cn(
                            "rounded-full px-2.5 py-1 font-mono text-xs font-bold transition-colors",
                            isActive
                              ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200"
                              : "bg-slate-100 text-slate-500 dark:bg-slate-800 dark:text-slate-400"
                          )}
                        >
                          {step.number}
                        </span>

                        <h3 className="text-lg font-bold tracking-tight text-slate-950 dark:text-white">
                          {step.title}
                        </h3>
                      </div>

                      <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                        {step.description}
                      </p>
                    </div>

                    <div
                      className={cn(
                        "hidden h-9 w-9 shrink-0 items-center justify-center rounded-full transition-all duration-300 sm:flex",
                        isActive
                          ? "bg-blue-50 text-blue-700 dark:bg-blue-950/50 dark:text-blue-200"
                          : "bg-slate-100 text-slate-400 opacity-0 group-hover:opacity-100 dark:bg-slate-800 dark:text-slate-500"
                      )}
                    >
                      <ArrowRight
                        className={cn(
                          "h-4 w-4 transition-transform duration-300",
                          isActive && "translate-x-0.5"
                        )}
                      />
                    </div>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Interactive Demo */}
          <div className="relative">
            <div className="absolute -top-6 -right-6 h-32 w-32 rounded-full bg-blue-600/15 blur-3xl dark:bg-blue-400/10" />
            <div className="absolute -bottom-6 -left-6 h-40 w-40 rounded-full bg-cyan-500/15 blur-3xl dark:bg-cyan-400/10" />

            <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white shadow-2xl shadow-blue-950/10 dark:border-slate-800 dark:bg-slate-950 dark:shadow-blue-500/5">
              {/* Browser Header */}
              <div className="flex items-center gap-3 border-b border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/80">
                <div className="flex gap-1.5">
                  <div className="h-3 w-3 rounded-full bg-red-500/80" />
                  <div className="h-3 w-3 rounded-full bg-yellow-500/80" />
                  <div className="h-3 w-3 rounded-full bg-emerald-500/80" />
                </div>

                <div className="flex flex-1 justify-center">
                  <span className="rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-semibold text-slate-500 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
                    Faunbi Chat
                  </span>
                </div>

                <div className="hidden gap-2 sm:flex">
                  {useCases.map((uc) => (
                    <div
                      key={uc.label}
                      className="group/usecase flex items-center gap-1.5 rounded-full border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300"
                    >
                      <uc.icon className={cn("h-3.5 w-3.5", uc.color)} />
                      <span className="hidden md:inline">{uc.label}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Chat Content */}
              <div className="relative min-h-90 space-y-5 bg-linear-to-b from-white to-slate-50 p-5 sm:p-6 dark:from-slate-950 dark:to-slate-900">
                {/* Active status */}
                <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-200 bg-white/80 p-3 shadow-sm dark:border-slate-800 dark:bg-slate-950/70">
                  <div className="flex items-center gap-3">
                    <div className="relative flex h-9 w-9 items-center justify-center rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950/60 dark:text-blue-200">
                      <Sparkles className="h-4 w-4" />
                      <span className="absolute right-0 bottom-0 h-2.5 w-2.5 rounded-full border-2 border-white bg-emerald-500 dark:border-slate-950" />
                    </div>

                    <div>
                      <p className="text-sm font-bold text-slate-950 dark:text-white">
                        Assistente Faunbi
                      </p>
                      <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        Entendendo comando • Etapa {active.number}
                      </p>
                    </div>
                  </div>

                  <span className="hidden rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300 sm:inline-flex">
                    Online
                  </span>
                </div>

                {/* User Message */}
                <div className="flex justify-end">
                  <div className="max-w-[88%] rounded-3xl rounded-tr-md bg-blue-600 px-4 py-3 text-white shadow-lg shadow-blue-600/20 dark:bg-blue-500">
                    <p className="text-sm leading-relaxed">
                      {active.example.user}
                    </p>
                  </div>
                </div>

                {/* AI Response */}
                <div className="flex gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-linear-to-br from-blue-100 to-cyan-100 text-blue-700 ring-1 ring-blue-500/10 dark:from-blue-950 dark:to-cyan-950 dark:text-blue-200 dark:ring-blue-400/10">
                    <Sparkles className="h-4 w-4" />
                  </div>

                  <div className="max-w-[88%] rounded-3xl rounded-tl-md border border-slate-200 bg-white px-4 py-3 shadow-sm dark:border-slate-800 dark:bg-slate-950">
                    <p className="text-sm leading-relaxed text-slate-700 dark:text-slate-200">
                      {active.example.response}
                    </p>
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="flex flex-wrap gap-2 pt-1">
                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 rounded-full bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                  >
                    <CheckCircle2 className="h-3.5 w-3.5" />
                    Confirmar
                  </button>

                  <button
                    type="button"
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                  >
                    Editar
                  </button>

                  <button
                    type="button"
                    className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-950 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 dark:hover:bg-slate-900 dark:hover:text-white"
                  >
                    Cancelar
                  </button>
                </div>
              </div>

              {/* Input Area */}
              <div className="border-t border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-950">
                <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2.5 shadow-inner dark:border-slate-800 dark:bg-slate-900">
                  <button
                    type="button"
                    aria-label="Enviar áudio"
                    className="rounded-xl p-2 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    <Mic className="h-4 w-4" />
                  </button>

                  <input
                    type="text"
                    placeholder="Digite sua mensagem..."
                    className="min-w-0 flex-1 bg-transparent text-sm font-medium text-slate-900 outline-none placeholder:text-slate-400 dark:text-white dark:placeholder:text-slate-500"
                    readOnly
                  />

                  <button
                    type="button"
                    aria-label="Enviar mensagem"
                    className="rounded-xl bg-blue-600 p-2.5 text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Floating badge */}
            <div className="absolute -bottom-5 left-1/2 hidden -translate-x-1/2 rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-600 shadow-xl shadow-slate-950/10 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-300 sm:flex">
              <span className="mr-2 h-2 w-2 rounded-full bg-emerald-500" />
              Ação pronta para confirmação
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}