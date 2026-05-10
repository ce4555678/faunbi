"use client"

import { Check, Sparkles, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"

const plans = [
  {
    name: "Starter",
    price: "12",
    cents: "90",
    period: "/mês",
    description: "Para quem está começando a organizar o negócio.",
    features: [
      "Até 50 pedidos/mês",
      "1 usuário",
      "Agenda básica",
      "Cadastro de clientes",
      "Controle financeiro simples",
      "Suporte por email",
    ],
    cta: "Começar Grátis",
    popular: false,
    variant: "outline" as const,
  },
  {
    name: "Pro",
    price: "29",
    cents: "90",
    period: "/mês",
    description: "Para profissionais que querem crescer com inteligência.",
    features: [
      "Pedidos ilimitados",
      "Até 3 usuários",
      "Todos os módulos",
      "IA conversacional avançada",
      "Comandos por voz",
      "Relatórios completos",
      "Integração WhatsApp",
      "Suporte prioritário",
    ],
    cta: "Começar Grátis",
    popular: true,
    variant: "default" as const,
  },
  {
    name: "Premium",
    price: "49",
    cents: "90",
    period: "/mês",
    description: "Para quem quer o máximo em automação e controle.",
    features: [
      "Tudo do Pro",
      "Usuários ilimitados",
      "Contratos digitais",
      "Assinatura eletrônica",
      "API de integração",
      "Relatórios personalizados",
      "Backup em tempo real",
      "Gerente de conta dedicado",
    ],
    cta: "Falar com Vendas",
    popular: false,
    variant: "outline" as const,
  },
]

export function PricingLandingUi() {
  return (
    <section
      id="pricing"
      className="relative overflow-hidden bg-muted/30 py-24 md:py-32"
    >
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-96 w-96 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute bottom-0 left-0 h-96 w-96 rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold text-primary">
            PLANOS
          </span>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Escolha o plano{" "}
            <span className="text-primary">ideal para você</span>
          </h2>
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            Comece grátis por 14 dias. Sem cartão de crédito. Cancele quando
            quiser.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3 lg:gap-8">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={cn(
                "relative rounded-2xl border p-6 transition-all duration-300 lg:p-8",
                plan.popular
                  ? "scale-[1.02] border-primary/50 bg-card shadow-xl shadow-primary/10 lg:scale-105"
                  : "border-border bg-card/50 hover:border-primary/30 hover:bg-card"
              )}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-primary px-4 py-1.5 text-sm font-medium text-primary-foreground shadow-lg">
                    <Sparkles className="h-4 w-4" />
                    Mais Popular
                  </span>
                </div>
              )}

              {/* Plan Header */}
              <div className="mb-6">
                <h3 className="mb-2 text-xl font-bold">{plan.name}</h3>
                <p className="text-sm text-muted-foreground">
                  {plan.description}
                </p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-sm text-muted-foreground">R$</span>
                  <span className="text-5xl font-bold tracking-tight">
                    {plan.price}
                  </span>
                  <span className="text-xl font-semibold">,{plan.cents}</span>
                  <span className="text-muted-foreground">{plan.period}</span>
                </div>
              </div>

              {/* Features */}
              <ul className="mb-8 space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-3">
                    <div
                      className={cn(
                        "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                        plan.popular ? "bg-primary/20" : "bg-muted"
                      )}
                    >
                      <Check
                        className={cn(
                          "h-3 w-3",
                          plan.popular
                            ? "text-primary"
                            : "text-muted-foreground"
                        )}
                      />
                    </div>
                    <span className="text-sm">{feature}</span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Button
                variant={plan.variant}
                className={cn(
                  "w-full gap-2",
                  plan.popular && "shadow-lg shadow-primary/20"
                )}
              >
                <Link href={plan.name === "Premium" ? "/contact" : "/chat"}>
                  {plan.popular && <Zap className="h-4 w-4" />}
                  {plan.cta}
                </Link>
              </Button>
            </div>
          ))}
        </div>

        {/* FAQ Teaser */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground">
            Dúvidas sobre os planos?{" "}
            <Link
              href="#faq"
              className="font-medium text-primary hover:underline"
            >
              Veja as perguntas frequentes
            </Link>
          </p>
        </div>
      </div>
    </section>
  )
}
