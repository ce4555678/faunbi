"use client"

import { usePathname } from "next/navigation"
import { Fragment } from "react"

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const routeLabels: Record<string, string> = {
  chatbot: "Assistente",
  chat: "Chat",
  history: "Histórico",
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
    decoded.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())
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

  // Lógica para colapsar em telas pequenas se houver muitos segmentos
  const shouldCollapse = segments.length > 2

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {/* Sempre mostra o Início no Desktop, esconde no Mobile se tiver muitos itens */}
        <BreadcrumbItem className="hidden sm:block">
          <BreadcrumbLink href="/">Início</BreadcrumbLink>
        </BreadcrumbItem>

        <BreadcrumbSeparator className="hidden sm:block" />

        {shouldCollapse ? (
          <>
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1">
                  <BreadcrumbEllipsis className="h-4 w-4" />
                  <span className="sr-only">Toggle menu</span>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  {segments.slice(0, -1).map((segment, index) => (
                    <DropdownMenuItem key={index}>
                      <a href={`/${segments.slice(0, index + 1).join("/")}`}>
                        {formatSegment(segment)}
                      </a>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </>
        ) : (
          segments.slice(0, -1).map((segment, index) => (
            <Fragment key={index}>
              <BreadcrumbItem>
                <BreadcrumbLink
                  href={`/${segments.slice(0, index + 1).join("/")}`}
                >
                  {formatSegment(segment)}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
            </Fragment>
          ))
        )}

        {/* O último item (página atual) sempre aparece */}
        <BreadcrumbItem>
          <BreadcrumbPage className="max-w-37.5 truncate sm:max-w-none">
            {formatSegment(segments[segments.length - 1])}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  )
}
