"use client"

import { useState } from "react"
import { ChevronDown, MessageSquare } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const faqs = [
  {
    question: "Preciso saber usar computador para usar a Faunbi?",
    answer:
      "Não! A Faunbi foi feita para ser simples como conversar no WhatsApp. Você digita ou fala o que precisa, e a IA faz o resto. Sem menus complicados, sem treinamentos. Se você sabe mandar mensagem, sabe usar a Faunbi.",
  },
  {
    question: "A IA entende português informal e gírias?",
    answer:
      "Sim! Nossa IA foi treinada com português brasileiro real. Ela entende 'agenda o de sempre', 'quanto tá o caixa?', 'bota 10 esmaltes no estoque', e muito mais. Fale como você fala no dia a dia.",
  },
  {
    question: "Posso usar pelo celular?",
    answer:
      "Claro! A Faunbi funciona perfeitamente no celular, tablet e computador. A interface se adapta automaticamente. Você pode gerenciar seu negócio de onde estiver, a qualquer hora.",
  },
  {
    question: "Meus dados estão seguros?",
    answer:
      "Absolutamente. Usamos criptografia de ponta a ponta, os mesmos padrões de segurança de bancos. Seus dados e de seus clientes ficam protegidos 24/7. Fazemos backups automáticos em tempo real.",
  },
  {
    question: "Posso cancelar quando quiser?",
    answer:
      "Sim! Sem multas, sem burocracia. Você cancela direto pelo chat ou nas configurações. Se cancelar, seus dados ficam disponíveis por 30 dias para você baixar ou reativar a conta.",
  },
  {
    question: "A IA funciona offline?",
    answer:
      "A Faunbi precisa de internet para funcionar, pois processa suas mensagens em tempo real. Porém, você pode consultar informações já carregadas mesmo com conexão lenta. Estamos trabalhando em funcionalidades offline.",
  },
  {
    question: "Vocês integram com WhatsApp?",
    answer:
      "Sim! No plano Pro e Premium, você pode enviar confirmações de agendamento, orçamentos e lembretes diretamente pelo WhatsApp dos seus clientes. Tudo automático.",
  },
  {
    question: "Quanto tempo leva para começar a usar?",
    answer:
      "Minutos! Crie sua conta, responda algumas perguntas sobre seu negócio, e já pode começar a usar. Não precisa configurar nada. A IA aprende seus padrões conforme você usa.",
  },
]

export function FAQLandingUi() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-muted/30 py-24 md:py-32"
    >
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold text-primary">
            FAQ
          </span>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Perguntas <span className="text-primary">frequentes</span>
          </h2>
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            Tudo que você precisa saber para começar.
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={cn(
                "rounded-2xl border transition-all duration-300",
                openIndex === index
                  ? "border-primary/30 bg-card shadow-lg shadow-primary/5"
                  : "border-border bg-card/50 hover:border-primary/20"
              )}
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex w-full items-center justify-between gap-4 p-6 text-left"
              >
                <span className="font-semibold">{faq.question}</span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300",
                    openIndex === index && "rotate-180 text-primary"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all duration-300",
                  openIndex === index ? "max-h-96" : "max-h-0"
                )}
              >
                <p className="px-6 pb-6 leading-relaxed text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Still Have Questions */}
        <div className="mt-12 text-center">
          <p className="mb-4 text-muted-foreground">Ainda tem dúvidas?</p>
          <Button variant="outline" className="gap-2">
            <Link href="/contact" className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4" />
              Fale conosco
            </Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
