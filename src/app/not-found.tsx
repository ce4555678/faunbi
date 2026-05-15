// src/app/not-found.tsx

import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Home, SearchX, MessageSquare } from "lucide-react"

export default function NotFound() {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4 py-16 text-foreground">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.16),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(6,182,212,0.12),transparent_32%)] dark:bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.22),transparent_34%),radial-gradient(circle_at_bottom_right,rgba(34,211,238,0.12),transparent_32%)]" />

        <div className="absolute top-0 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/15 blur-[120px] dark:bg-blue-400/15" />
        <div className="absolute right-0 bottom-0 h-96 w-96 rounded-full bg-cyan-500/10 blur-[130px] dark:bg-cyan-300/10" />

        <div
          className="absolute inset-0 opacity-[0.045] dark:opacity-[0.06]"
          style={{
            backgroundImage:
              "linear-gradient(currentColor 1px, transparent 1px), linear-gradient(90deg, currentColor 1px, transparent 1px)",
            backgroundSize: "52px 52px",
          }}
        />
      </div>

      <section className="mx-auto w-full max-w-4xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-slate-200/80 bg-white/85 p-6 text-center shadow-2xl shadow-blue-950/10 backdrop-blur-2xl sm:p-8 md:p-12 lg:p-16 dark:border-slate-800/80 dark:bg-slate-950/85 dark:shadow-blue-500/5">
          {/* Glow interno */}
          <div className="pointer-events-none absolute -top-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-blue-500/20 blur-3xl dark:bg-blue-400/15" />
          <div className="pointer-events-none absolute -right-32 -bottom-40 h-96 w-96 rounded-full bg-cyan-400/20 blur-3xl dark:bg-cyan-300/10" />

          <div className="relative z-10">
            {/* Logo */}
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
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-500/20 bg-blue-50 px-4 py-2 text-xs font-bold tracking-wide text-blue-700 uppercase shadow-sm sm:text-sm dark:border-blue-400/20 dark:bg-blue-950/50 dark:text-blue-200">
              <SearchX className="h-4 w-4" />
              Página não encontrada
            </div>

            <div className="mx-auto mb-6 flex items-center justify-center gap-3 sm:gap-5">
              <span className="text-7xl font-black tracking-tighter text-slate-950 sm:text-8xl md:text-9xl dark:text-white">
                4
              </span>

              <div className="relative flex h-24 w-24 items-center justify-center rounded-full border border-blue-200 bg-linear-to-b from-white to-blue-50 shadow-inner shadow-blue-200/60 sm:h-28 sm:w-28 md:h-32 md:w-32 dark:border-blue-900/70 dark:from-slate-950 dark:to-blue-950/40 dark:shadow-blue-950/50">
                <div className="absolute inset-3 rounded-full border border-blue-100 dark:border-blue-900/60" />
                <SearchX className="relative h-10 w-10 text-blue-600 sm:h-12 sm:w-12 dark:text-blue-300" />
              </div>

              <span className="text-7xl font-black tracking-tighter text-slate-950 sm:text-8xl md:text-9xl dark:text-white">
                4
              </span>
            </div>

            <h1 className="mx-auto max-w-3xl text-3xl font-black tracking-tight text-balance text-slate-950 sm:text-4xl md:text-5xl dark:text-white">
              Ops, essa rota saiu do mapa.
            </h1>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-pretty text-slate-600 sm:text-lg dark:text-slate-300">
              A página que você tentou acessar não existe, foi removida ou teve
              o endereço alterado. Mas não precisa travar a operação: volte para
              o início ou acesse o assistente.
            </p>

            {/* Ações */}
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                size="lg"
                className="group h-14 w-full rounded-full bg-blue-600 px-8 text-base font-bold text-white shadow-xl shadow-blue-600/25 transition-all hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-blue-600/35 sm:w-auto sm:text-lg dark:bg-blue-500 dark:hover:bg-blue-400"
              >
                <Link prefetch
                  href="/"
                  className="flex items-center justify-center gap-2"
                >
                  <Home className="h-5 w-5" />
                  Voltar para início
                </Link>
              </Button>

              <Button
                size="lg"
                variant="outline"
                className="group h-14 w-full rounded-full border-slate-300 bg-white/80 px-8 text-base font-bold text-slate-900 shadow-sm transition-all hover:-translate-y-0.5 hover:bg-slate-100 sm:w-auto sm:text-lg dark:border-slate-700 dark:bg-slate-950/80 dark:text-white dark:hover:bg-slate-900"
              >
                <Link prefetch
                  href="/chatbot"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-5 w-5" />
                  Abrir assistente
                </Link>
              </Button>
            </div>

            <Link prefetch
              href="/"
              className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-500 transition-colors hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-300"
            >
              <ArrowLeft className="h-4 w-4" />
              Ir para a página inicial
            </Link>
          </div>

          {/* Decoração */}
          <div className="pointer-events-none absolute top-5 left-5 h-24 w-24 rounded-tl-[1.5rem] border-t border-l border-blue-500/25 dark:border-blue-400/20" />
          <div className="pointer-events-none absolute right-5 bottom-5 h-24 w-24 rounded-br-[1.5rem] border-r border-b border-cyan-500/25 dark:border-cyan-400/20" />
        </div>
      </section>
    </main>
  )
}
