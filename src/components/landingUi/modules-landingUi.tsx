"use client"

import { useState } from "react"
import {
  Calendar,
  Users,
  ClipboardList,
  Package,
  Wallet,
  ChevronRight,
  Check,
  ArrowRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const modules = [
  {
    id: "agenda",
    icon: Calendar,
    name: "Agenda",
    tagline: "Nunca mais perca um compromisso",
    description:
      "Gerencie horários, compromissos e disponibilidade com comandos simples.",
    features: [
      "Agendamento por voz ou texto",
      "Confirmação automática via WhatsApp",
      "Bloqueio de horários e folgas",
      "Visualização diária, semanal e mensal",
      "Lembretes inteligentes",
    ],
    commands: [
      "Agendar corte para Maria às 15h",
      "Quais meus compromissos de amanhã?",
      "Bloquear sexta-feira à tarde",
    ],
    color: "from-blue-500/20 to-blue-600/5",
    iconColor: "text-blue-500",
    borderColor: "border-blue-500/30",
  },
  {
    id: "clients",
    icon: Users,
    name: "Clientes",
    tagline: "Conheça quem você atende",
    description:
      "Base de clientes organizada com histórico completo e preferências.",
    features: [
      "Cadastro automático via conversa",
      "Histórico de atendimentos",
      "Preferências e observações",
      "Tags e segmentação",
      "Aniversários e datas especiais",
    ],
    commands: [
      "Cadastrar novo cliente João Silva",
      "Histórico da cliente Maria",
      "Clientes que não vêm há 30 dias",
    ],
    color: "from-green-500/20 to-green-600/5",
    iconColor: "text-green-500",
    borderColor: "border-green-500/30",
  },
  {
    id: "orders",
    icon: ClipboardList,
    name: "Pedidos",
    tagline: "Do orçamento à conclusão",
    description:
      "Controle orçamentos, serviços em andamento e trabalhos concluídos.",
    features: [
      "Orçamentos detalhados",
      "Status: orçamento, em andamento, concluído",
      "Histórico de alterações",
      "Fotos e anexos",
      "Assinaturas digitais",
    ],
    commands: [
      "Criar orçamento pintura 2 quartos",
      "Pedidos em andamento",
      "Marcar pedido #45 como concluído",
    ],
    color: "from-orange-500/20 to-orange-600/5",
    iconColor: "text-orange-500",
    borderColor: "border-orange-500/30",
  },
  {
    id: "inventory",
    icon: Package,
    name: "Estoque",
    tagline: "Materiais sempre sob controle",
    description: "Gerencie produtos, materiais e insumos do seu negócio.",
    features: [
      "Entrada e saída de produtos",
      "Alertas de estoque baixo",
      "Histórico de movimentações",
      "Custo médio automático",
      "Lista de compras inteligente",
    ],
    commands: [
      "Adicionar 10 esmaltes cor rosa",
      "Quais produtos estão acabando?",
      "Usar 2L de tinta branca no pedido #45",
    ],
    color: "from-purple-500/20 to-purple-600/5",
    iconColor: "text-purple-500",
    borderColor: "border-purple-500/30",
  },
  {
    id: "finance",
    icon: Wallet,
    name: "Financeiro",
    tagline: "Dinheiro no lugar certo",
    description:
      "Controle receitas, despesas e tenha visão clara do seu lucro.",
    features: [
      "Receitas e despesas",
      "Contas a receber e pagar",
      "Relatórios automáticos",
      "Fluxo de caixa",
      "Metas e projeções",
    ],
    commands: [
      "Quanto faturei esta semana?",
      "Registrar despesa R$150 materiais",
      "Qual meu lucro do mês?",
    ],
    color: "from-emerald-500/20 to-emerald-600/5",
    iconColor: "text-emerald-500",
    borderColor: "border-emerald-500/30",
  },
]

export default function ModulesLandingUi() {
  const [activeModule, setActiveModule] = useState(modules[0])

  return (
    <section id="modules" className="relative overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-1/2 h-200 w-200 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[150px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold text-primary">
            MÓDULOS
          </span>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Cinco pilares, <span className="text-primary">um só chat</span>
          </h2>
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            Todos os módulos integrados e acessíveis através de conversas
            naturais. Sem trocar de tela, sem decorar menus.
          </p>
        </div>

        {/* Module Tabs - Mobile */}
        <div className="scrollbar-hide -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-4 lg:hidden">
          {modules.map((module) => (
            <button
              key={module.id}
              onClick={() => setActiveModule(module)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full border px-4 py-2 transition-all",
                activeModule.id === module.id
                  ? "border-primary/30 bg-primary/10 text-foreground"
                  : "border-border bg-card text-muted-foreground"
              )}
            >
              <module.icon
                className={cn(
                  "h-4 w-4",
                  activeModule.id === module.id && module.iconColor
                )}
              />
              <span className="text-sm font-medium whitespace-nowrap">
                {module.name}
              </span>
            </button>
          ))}
        </div>

        <div className="grid gap-8 lg:grid-cols-12">
          {/* Module List - Desktop */}
          <div className="hidden space-y-3 lg:col-span-4 lg:block">
            {modules.map((module) => (
              <button
                key={module.id}
                onClick={() => setActiveModule(module)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-300",
                  activeModule.id === module.id
                    ? `bg-linear-to-r ${module.color} ${module.borderColor}`
                    : "border-border bg-card/50 hover:border-primary/20 hover:bg-card"
                )}
              >
                <div
                  className={cn(
                    "flex h-12 w-12 shrink-0 items-center justify-center rounded-xl transition-colors",
                    activeModule.id === module.id
                      ? `bg-linear-to-br ${module.color} ${module.iconColor}`
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  <module.icon className="h-6 w-6" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-semibold">{module.name}</h3>
                  <p className="truncate text-sm text-muted-foreground">
                    {module.tagline}
                  </p>
                </div>
                <ChevronRight
                  className={cn(
                    "h-5 w-5 transition-transform",
                    activeModule.id === module.id
                      ? "translate-x-1 text-foreground"
                      : "text-muted-foreground"
                  )}
                />
              </button>
            ))}
          </div>

          {/* Module Detail */}
          <div className="lg:col-span-8">
            <div
              className={cn(
                "rounded-2xl border bg-linear-to-br p-6 md:p-8",
                activeModule.color,
                activeModule.borderColor
              )}
            >
              <div className="mb-6 flex items-start gap-4">
                <div
                  className={cn(
                    "flex h-14 w-14 shrink-0 items-center justify-center rounded-xl",
                    `bg-linear-to-br ${activeModule.color}`,
                    activeModule.iconColor
                  )}
                >
                  <activeModule.icon className="h-7 w-7" />
                </div>
                <div>
                  <h3 className="mb-1 text-2xl font-bold">
                    {activeModule.name}
                  </h3>
                  <p className="text-muted-foreground">
                    {activeModule.description}
                  </p>
                </div>
              </div>

              <div className="grid gap-8 md:grid-cols-2">
                {/* Features */}
                <div>
                  <h4 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                    Funcionalidades
                  </h4>
                  <ul className="space-y-3">
                    {activeModule.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <div
                          className={cn(
                            "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full",
                            `bg-linear-to-br ${activeModule.color}`
                          )}
                        >
                          <Check
                            className={cn("h-3 w-3", activeModule.iconColor)}
                          />
                        </div>
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Example Commands */}
                <div>
                  <h4 className="mb-4 text-sm font-semibold tracking-wider text-muted-foreground uppercase">
                    Exemplos de comandos
                  </h4>
                  <div className="space-y-3">
                    {activeModule.commands.map((command) => (
                      <div
                        key={command}
                        className="flex items-center gap-3 rounded-xl border border-border/50 bg-background/50 p-3"
                      >
                        <span className="text-lg">💬</span>
                        <span className="text-sm text-muted-foreground italic">
                          &quot;{command}&quot;
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* CTA */}
              <div className="mt-8 border-t border-border/50 pt-6">
                <Link href="/auth/sign-up" className="flex items-center gap-2">
                  <Button className="gap-2">
                    Experimentar {activeModule.name}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
