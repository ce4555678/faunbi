"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  MessageSquare,
  ArrowRight,
  Calendar,
  Users,
  Package,
  Wallet,
  Sparkles,
  Mic,
  Send,
} from "lucide-react"
import { cn } from "@/lib/utils"

const typingExamples = [
  "Agendar corte para Maria às 15h amanhã",
  "Quanto faturei essa semana?",
  "Criar orçamento para pintura 3 quartos",
  "Listar clientes com serviço pendente",
  "Adicionar 10 esmaltes ao estoque",
]

const floatingIcons = [
  { Icon: Calendar, delay: 0, position: "top-20 left-[10%]" },
  { Icon: Users, delay: 1, position: "top-32 right-[15%]" },
  { Icon: Package, delay: 2, position: "bottom-32 left-[20%]" },
  { Icon: Wallet, delay: 3, position: "bottom-20 right-[10%]" },
]

export default function HeroLandingUi() {
  const [currentExample, setCurrentExample] = useState(0)
  const [displayText, setDisplayText] = useState("")
  const [isTyping, setIsTyping] = useState(true)

  useEffect(() => {
    const example = typingExamples[currentExample]

    if (isTyping) {
      if (displayText.length < example.length) {
        const timeout = window.setTimeout(() => {
          setDisplayText(example.slice(0, displayText.length + 1))
        }, 50)

        return () => window.clearTimeout(timeout)
      }

      const timeout = window.setTimeout(() => {
        setIsTyping(false)
      }, 2000)

      return () => window.clearTimeout(timeout)
    }

    if (displayText.length > 0) {
      const timeout = window.setTimeout(() => {
        setDisplayText(displayText.slice(0, -1))
      }, 30)

      return () => window.clearTimeout(timeout)
    }

    const timeout = window.setTimeout(() => {
      setCurrentExample((prev) => (prev + 1) % typingExamples.length)
      setIsTyping(true)
    }, 300)

    return () => window.clearTimeout(timeout)
  }, [displayText, isTyping, currentExample])

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background pt-16 text-foreground">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        {/* Gradient Orbs */}
        <div className="absolute top-1/4 left-1/2 h-150 w-150 -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full bg-blue-600/25 blur-[120px] dark:bg-blue-500/20" />
        <div className="absolute right-1/4 bottom-1/4 h-100 w-100 animate-pulse rounded-full bg-cyan-500/20 blur-[100px] delay-1000 dark:bg-cyan-400/15" />

        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-[0.06] dark:opacity-[0.08]"
          style={{
            backgroundImage: `linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />

        {/* Subtle Vignette */}
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-transparent to-background/80" />
      </div>

      {/* Floating Icons */}
      {floatingIcons.map(({ Icon, delay, position }, index) => (
        <div
          key={index}
          className={cn(
            "absolute hidden h-12 w-12 items-center justify-center rounded-2xl border border-blue-500/25 bg-background/90 shadow-xl shadow-blue-950/10 backdrop-blur-md lg:flex dark:border-blue-400/20 dark:bg-slate-950/80",
            position
          )}
          style={{
            animation: `float 6s ease-in-out infinite`,
            animationDelay: `${delay}s`,
          }}
        >
          <Icon className="h-5 w-5 text-blue-600 dark:text-blue-300" />
        </div>
      ))}

      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 md:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Badge */}
          <div className="mb-8 inline-flex animate-in items-center gap-2 rounded-full border border-blue-500/30 bg-blue-50 px-4 py-2 shadow-sm duration-700 fade-in slide-in-from-bottom-4 dark:border-blue-400/25 dark:bg-blue-950/40">
            <Sparkles className="h-4 w-4 text-blue-600 dark:text-blue-300" />
            <span className="text-sm font-semibold text-blue-700 dark:text-blue-200">
              Gestão por IA Conversacional
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 animate-in text-4xl leading-[1.1] font-bold tracking-tight text-slate-950 delay-100 duration-700 fade-in slide-in-from-bottom-4 sm:text-5xl md:text-6xl lg:text-7xl dark:text-white">
            <span className="text-balance">Gerencie seu negócio</span>
            <br />
            <span className="animate-gradient bg-linear-to-r from-blue-700 via-cyan-500 to-blue-700 bg-size-[200%_auto] bg-clip-text text-transparent dark:from-blue-300 dark:via-cyan-200 dark:to-blue-300">
              apenas conversando
            </span>
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl animate-in text-lg leading-relaxed text-pretty text-slate-700 delay-200 duration-700 fade-in slide-in-from-bottom-4 sm:text-xl dark:text-slate-300">
            Agenda, clientes, pedidos, estoque e finanças — tudo em um chat
            inteligente. Feito para pintores, eletricistas, manicures,
            cabeleireiros e autônomos.
          </p>

          {/* Chat Preview */}
          <div className="relative mx-auto mb-10 max-w-xl animate-in delay-300 duration-700 fade-in slide-in-from-bottom-4">
            <div className="relative rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-2xl shadow-blue-950/10 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 dark:shadow-blue-500/5">
              <div className="mb-4 flex items-center gap-3 border-b border-slate-200 pb-3 dark:border-slate-800">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/20">
                  <Sparkles className="h-4 w-4 text-blue-700 dark:text-blue-300" />
                </div>

                <div className="text-left">
                  <p className="text-sm font-semibold text-slate-950 dark:text-white">
                    Assistente Faunbi
                  </p>
                  <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                    Online • Pronto para ajudar
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-900">
                <div className="flex min-w-0 flex-1 items-center gap-2">
                  <span className="truncate text-sm font-medium text-slate-800 dark:text-slate-100">
                    {displayText}
                    <span className="ml-0.5 inline-block h-4 w-0.5 animate-pulse bg-blue-600 align-middle dark:bg-blue-300" />
                  </span>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <button
                    type="button"
                    aria-label="Enviar áudio"
                    className="rounded-lg p-2 text-slate-500 transition-colors hover:bg-slate-200 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-white"
                  >
                    <Mic className="h-4 w-4" />
                  </button>

                  <button
                    type="button"
                    aria-label="Enviar mensagem"
                    className="rounded-lg bg-blue-600 p-2 text-white shadow-lg shadow-blue-600/20 transition-colors hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* Glow Effect */}
            <div className="absolute -inset-1 -z-10 rounded-2xl bg-linear-to-r from-blue-600/25 via-cyan-500/20 to-blue-600/25 opacity-70 blur-xl dark:from-blue-400/20 dark:via-cyan-300/15 dark:to-blue-400/20" />
          </div>

          {/* CTAs */}
          <div className="flex animate-in flex-col items-center justify-center gap-4 delay-400 duration-700 fade-in slide-in-from-bottom-4 sm:flex-row">
            <Button
              size="lg"
              className="h-12 gap-2 bg-blue-600 px-8 text-base font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
            >
              <Link href="/chat" className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Começar Grátis
              </Link>
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="group h-12 gap-2 border-slate-300 bg-white px-8 text-base font-semibold text-slate-900 shadow-sm hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
            >
              <Link href="#how-it-works" className="flex items-center gap-2">
                Ver como funciona
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="mt-16 flex animate-in flex-wrap items-center justify-center gap-8 text-slate-600 delay-500 duration-700 fade-in dark:text-slate-300">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                {[1, 2, 3, 4].map((i) => (
                  <div
                    key={i}
                    className="h-8 w-8 rounded-full border-2 border-background bg-linear-to-br from-blue-500 to-cyan-400 shadow-sm"
                  />
                ))}
              </div>

              <span className="text-sm font-medium">+2.000 profissionais</span>
            </div>

            <div className="hidden h-4 w-px bg-slate-300 sm:block dark:bg-slate-700" />

            <div className="flex items-center gap-2">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((i) => (
                  <svg
                    key={i}
                    className="h-4 w-4 fill-current text-yellow-500"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                  </svg>
                ))}
              </div>

              <span className="text-sm font-medium">4.9/5 avaliação</span>
            </div>

            <div className="hidden h-4 w-px bg-slate-300 sm:block dark:bg-slate-700" />

            <span className="text-sm font-medium">Sem cartão de crédito</span>
          </div>
        </div>
      </div>

      {/* Animation Keyframes */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .animate-gradient {
          animation: gradient 4s ease infinite;
        }
      `}</style>
    </section>
  )
}
