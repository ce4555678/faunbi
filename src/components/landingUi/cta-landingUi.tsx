"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react"

export function CTALandingUi() {
  return (
    <section className="relative overflow-hidden bg-background py-24 text-foreground md:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_35%),linear-gradient(to_bottom,transparent,rgba(37,99,235,0.04))] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.18),transparent_35%),linear-gradient(to_bottom,transparent,rgba(2,6,23,0.7))]" />
        <div className="absolute top-1/2 left-1/2 h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-600/15 blur-[150px] dark:bg-blue-500/15" />
        <div className="absolute right-0 bottom-0 h-[360px] w-[360px] rounded-full bg-cyan-500/10 blur-[120px] dark:bg-cyan-400/10" />

        <div
          className="absolute inset-0 opacity-[0.045] dark:opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />
      </div>

      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200 bg-white/90 p-6 text-center shadow-2xl shadow-blue-950/10 backdrop-blur-2xl sm:p-8 md:p-12 lg:p-16 dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-blue-500/5">
          {/* Decorative Glow */}
          <div className="absolute -top-32 left-1/2 h-64 w-64 -translate-x-1/2 rounded-full bg-blue-600/20 blur-3xl dark:bg-blue-400/15" />
          <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-cyan-500/15 blur-3xl dark:bg-cyan-400/10" />

          {/* Top Icon */}
          <div className="relative mx-auto mb-8 flex h-20 w-20 items-center justify-center rounded-3xl bg-blue-600 text-white shadow-xl shadow-blue-600/25 dark:bg-blue-500">
            <Sparkles className="h-10 w-10" />
            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-white/25 via-transparent to-transparent" />
            <div className="absolute -inset-3 rounded-3xl bg-blue-500/30 blur-2xl" />
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50 px-4 py-2 text-sm font-bold text-blue-700 shadow-sm dark:border-blue-400/20 dark:bg-blue-950/40 dark:text-blue-200">
              <ShieldCheck className="h-4 w-4" />
              Comece sem risco
            </div>

            <h2 className="mx-auto mb-6 max-w-3xl text-3xl font-black tracking-tight text-balance text-slate-950 sm:text-4xl md:text-5xl dark:text-white">
              Pronto para simplificar{" "}
              <span className="bg-linear-to-r from-blue-700 via-cyan-500 to-blue-700 bg-clip-text text-transparent dark:from-blue-300 dark:via-cyan-200 dark:to-blue-300">
                seu negócio?
              </span>
            </h2>

            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-pretty text-slate-600 dark:text-slate-300">
              Pare de perder tempo com planilhas, anotações soltas e retrabalho.
              Organize agenda, clientes, pedidos, estoque e financeiro em uma
              experiência simples, rápida e conversacional.
            </p>

            {/* CTAs */}
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                
                className="group h-14 rounded-full bg-blue-600 px-9 text-base font-bold text-white shadow-xl shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/35 sm:text-lg dark:bg-blue-500 dark:hover:bg-blue-400"
              >
                <Link href="/chat" className="flex items-center gap-2">
                  <MessageSquare className="h-5 w-5" />
                  Começar Grátis Agora
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                
                className="group h-14 rounded-full border-slate-300 bg-white px-8 text-base font-bold text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-100 sm:text-lg dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
              >
                <Link href="#pricing" className="flex items-center gap-2">
                  Ver planos
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </div>

            {/* Trust */}
            <div className="mt-8 flex flex-col items-center justify-center gap-3 text-sm font-medium text-slate-600 sm:flex-row sm:flex-wrap dark:text-slate-300">
              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                14 dias grátis
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block dark:bg-slate-700" />

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                Sem cartão de crédito
              </span>

              <span className="hidden h-1 w-1 rounded-full bg-slate-300 sm:block dark:bg-slate-700" />

              <span className="inline-flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                Cancele quando quiser
              </span>
            </div>
          </div>

          {/* Corner Decorations */}
          <div className="pointer-events-none absolute top-5 left-5 h-24 w-24 rounded-tl-[1.5rem] border-t border-l border-blue-500/25 dark:border-blue-400/20" />
          <div className="pointer-events-none absolute right-5 bottom-5 h-24 w-24 rounded-br-[1.5rem] border-r border-b border-cyan-500/25 dark:border-cyan-400/20" />
        </div>
      </div>
    </section>
  )
}