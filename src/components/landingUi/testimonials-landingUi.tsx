"use client"

import { Star, Quote } from "lucide-react"
import { cn } from "@/lib/utils"

const testimonials = [
  {
    quote:
      "Antes eu perdia clientes porque esquecia de confirmar agendamentos. Agora a Faunbi faz isso automaticamente. Meu faturamento aumentou 40%.",
    author: "Maria Santos",
    role: "Manicure • São Paulo",
    rating: 5,
    highlight: true,
  },
  {
    quote:
      "Sou péssimo com planilhas. Agora só pergunto 'quanto lucrei esse mês?' e tenho a resposta na hora. Revolucionário.",
    author: "Carlos Ferreira",
    role: "Pintor • Rio de Janeiro",
    rating: 5,
    highlight: false,
  },
  {
    quote:
      "O controle de estoque por conversa é incrível. 'Quantos produtos tenho?' e pronto. Nunca mais deixei cliente na mão.",
    author: "Ana Oliveira",
    role: "Cabeleireira • Belo Horizonte",
    rating: 5,
    highlight: false,
  },
  {
    quote:
      "Faço orçamentos pelo celular enquanto visito o cliente. Ele já recebe o PDF profissional na hora. Impressiona muito.",
    author: "Roberto Lima",
    role: "Eletricista • Curitiba",
    rating: 5,
    highlight: false,
  },
  {
    quote:
      "A IA entende quando falo 'agenda o de sempre pro João'. Ela já sabe que é corte e barba às 10h. Parece mágica.",
    author: "Fernando Costa",
    role: "Barbeiro • Salvador",
    rating: 5,
    highlight: true,
  },
  {
    quote:
      "Minha esposa achava que eu não controlava nada. Agora mostro os relatórios gerados automaticamente. Profissionalismo total.",
    author: "Pedro Alves",
    role: "Pedreiro • Fortaleza",
    rating: 5,
    highlight: false,
  },
]

export function TestimonialsLandingUi() {
  return (
    <section className="relative overflow-hidden py-24 md:py-32">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/2 left-0 h-72 w-72 rounded-full bg-primary/5 blur-[100px]" />
        <div className="absolute top-1/2 right-0 h-72 w-72 rounded-full bg-accent/5 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <span className="mb-4 inline-block text-sm font-semibold text-primary">
            DEPOIMENTOS
          </span>
          <h2 className="mb-6 text-3xl font-bold tracking-tight text-balance sm:text-4xl md:text-5xl">
            Quem usa, <span className="text-primary">recomenda</span>
          </h2>
          <p className="text-lg leading-relaxed text-pretty text-muted-foreground">
            Mais de 2.000 profissionais já transformaram seus negócios com a
            Faunbi.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className={cn(
                "relative rounded-2xl border p-6 transition-all duration-300 hover:border-primary/30",
                testimonial.highlight
                  ? "border-primary/20 bg-linear-to-br from-primary/10 via-primary/5 to-transparent"
                  : "border-border bg-card/50 hover:bg-card/80"
              )}
            >
              {/* Quote Icon */}
              <div className="absolute top-4 right-4 opacity-10">
                <Quote className="h-12 w-12" />
              </div>

              {/* Rating */}
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-yellow-500 text-yellow-500"
                  />
                ))}
              </div>

              {/* Quote */}
              <blockquote className="mb-6 leading-relaxed text-foreground/90">
                &quot;{testimonial.quote}&quot;
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-primary/30 to-accent/30 text-sm font-semibold">
                  {testimonial.author
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </div>
                <div>
                  <p className="text-sm font-medium">{testimonial.author}</p>
                  <p className="text-xs text-muted-foreground">
                    {testimonial.role}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-8 md:grid-cols-4">
          {[
            { value: "2.000+", label: "Profissionais ativos" },
            { value: "98%", label: "Taxa de satisfação" },
            { value: "4.9/5", label: "Avaliação média" },
            { value: "40%", label: "Aumento médio em vendas" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="mb-1 text-3xl font-bold text-primary md:text-4xl">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
