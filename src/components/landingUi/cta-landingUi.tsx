"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  ShieldCheck,
  Sparkles,
  Zap,
} from "lucide-react"
import { SignUpButton } from "@clerk/nextjs"

export function CTALandingUi() {
  return (
    <section className="relative isolate overflow-hidden bg-background py-20 text-foreground sm:py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_32%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_32%)]" />

        <div className="absolute top-0 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/15 blur-[120px] dark:bg-blue-400/15" />
        <div className="absolute right-0 bottom-0 h-80 w-80 rounded-full bg-cyan-500/10 blur-[130px] dark:bg-cyan-300/10" />

        <div
          className="absolute inset-0 opacity-[0.045] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/85 p-5 shadow-2xl shadow-blue-950/10 backdrop-blur-2xl sm:p-8 md:p-12 lg:p-16 dark:border-slate-800/80 dark:bg-slate-950/85 dark:shadow-blue-500/5">
          {/* Internal glow */}
          <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-400/15" />
          <div className="pointer-events-none absolute -right-32 -bottom-40 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-300/10" />

          <div className="relative z-10 mx-auto max-w-4xl text-center">
            {/* Logo badge */}
            <div className="mx-auto mb-7 flex h-20 w-20 items-center justify-center rounded-3xl border border-slate-200 bg-white p-4 shadow-xl shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-950 dark:shadow-black/30">
              <Image
                src="/faunbi.svg"
                alt="Faunbi"
                width={64}
                height={64}
                className="h-full w-full object-contain"
                priority
              />
            </div>

            {/* Badge */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50 px-4 py-2 text-xs font-bold tracking-wide text-blue-700 uppercase shadow-sm sm:text-sm dark:border-blue-400/20 dark:bg-blue-950/50 dark:text-blue-200">
              <Sparkles className="h-4 w-4" />
              Gestão inteligente para pequenos negócios
            </div>

            <h2 className="mx-auto max-w-3xl text-3xl font-black tracking-tight text-balance text-slate-950 sm:text-4xl md:text-5xl lg:text-6xl dark:text-white">
              Pare de administrar no improviso.{" "}
              <span className="bg-linear-to-r from-blue-700 via-cyan-500 to-blue-700 bg-clip-text text-transparent dark:from-blue-300 dark:via-cyan-200 dark:to-blue-300">
                Coloque seu negócio no piloto inteligente.
              </span>
            </h2>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-pretty text-slate-600 sm:text-lg md:text-xl dark:text-slate-300">
              Agenda, clientes, pedidos, estoque e financeiro em um só lugar —
              com um assistente de IA para reduzir retrabalho e acelerar sua
              operação todos os dias.
            </p>

            {/* CTAs */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <SignUpButton>
                <Button
                  size="lg"
                  className="group h-14 w-full rounded-full bg-blue-600 px-8 text-base font-bold text-white shadow-xl shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/35 sm:w-auto sm:text-lg dark:bg-blue-500 dark:hover:bg-blue-400"
                >
                  <Link
                    href="/chat"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-5 w-5" />
                    Começar grátis
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </SignUpButton>

              <Button
                size="lg"
                variant="outline"
                className="group h-14 w-full rounded-full border-slate-300 bg-white/80 px-8 text-base font-bold text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-100 sm:w-auto sm:text-lg dark:border-slate-700 dark:bg-slate-950/80 dark:text-white dark:hover:bg-slate-900"
              >
                <Link
                  href="#pricing"
                  className="flex items-center justify-center gap-2"
                >
                  Ver planos
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Trust */}
            <div className="mx-auto mt-8 grid max-w-3xl gap-3 text-left text-sm font-medium text-slate-600 sm:grid-cols-3 dark:text-slate-300">
              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-300" />
                14 dias grátis
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                <ShieldCheck className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-300" />
                Sem cartão de crédito
              </div>

              <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 dark:border-slate-800 dark:bg-slate-900/60">
                <Zap className="h-4 w-4 shrink-0 text-blue-600 dark:text-blue-300" />
                Ative em poucos minutos
              </div>
            </div>
          </div>

          {/* Corner lines */}
          <div className="pointer-events-none absolute top-5 left-5 h-24 w-24 rounded-tl-[1.5rem] border-t border-l border-blue-500/25 dark:border-blue-400/20" />
          <div className="pointer-events-none absolute right-5 bottom-5 h-24 w-24 rounded-br-[1.5rem] border-r border-b border-cyan-500/25 dark:border-cyan-400/20" />
        </div>
      </div>
    </section>
  )
}
