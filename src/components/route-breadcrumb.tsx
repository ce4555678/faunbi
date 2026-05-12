"use client"

import { usePathname } from "next/navigation"

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

const routeLabels: Record<string, string> = {
  chatbot: "Assistente",
  chat: "Chat",
  transcricoes: "Transcrições",
  arquivos: "Arquivos",
  configuracoes: "Configurações",
  conta: "Conta",
  plano: "Plano",
}

function formatSegment(segment: string) {
  const decoded = decodeURIComponent(segment)

  return (
    routeLabels[decoded] ??
    decoded
      .replace(/-/g, " ")
      .replace(/\b\w/g, (char) => char.toUpperCase())
  )
}

export default function RouteBreadcrumb() {
  const pathname = usePathname()

  const segments = pathname.split("/").filter(Boolean)

  if (segments.length === 0) {
    return (
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbPage>Início</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    )
  }

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink href="/">Início</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator className="hidden md:block" />

        {segments.map((segment, index) => {
          const href = `/${segments.slice(0, index + 1).join("/")}`
          const isLast = index === segments.length - 1
          const label = formatSegment(segment)

          return (
            <div key={href} className="flex items-center gap-1.5">
              <BreadcrumbItem className={index === 0 ? "hidden md:block" : ""}>
                {isLast ? (
                  <BreadcrumbPage>{label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink href={href}>{label}</BreadcrumbLink>
                )}
              </BreadcrumbItem>

              {!isLast && (
                <BreadcrumbSeparator
                  className={index === 0 ? "hidden md:block" : ""}
                />
              )}
            </div>
          )
        })}
      </BreadcrumbList>
    </Breadcrumb>
  )
}