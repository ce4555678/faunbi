"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BotIcon,
  FileTextIcon,
  LifeBuoyIcon,
  MessageSquareTextIcon,
  SearchIcon,
  SendIcon,
  Settings2Icon,
  SparklesIcon,
} from "lucide-react"

const data = {
  user: {
    name: "Carlos Eduardo",
    email: "ce4555678@gmail.com",
    avatar: "",
  },
  navMain: [
    {
      title: "Chat",
      url: "/chatbot",
      icon: <MessageSquareTextIcon className="size-4" />,
      isActive: true,
      items: [
        {
          title: "Nova conversa",
          url: "/chatbot",
        },
        {
          title: "Histórico",
          url: "#",
        },
      ],
    },
    {
      title: "Transcrições",
      url: "#",
      icon: <FileTextIcon className="size-4" />,
      items: [
        {
          title: "Meus arquivos",
          url: "#",
        },
        {
          title: "Enviar arquivo",
          url: "#",
        },
      ],
    },
    {
      title: "Busca inteligente",
      url: "#",
      icon: <SearchIcon className="size-4" />,
      items: [
        {
          title: "Pesquisar conteúdos",
          url: "#",
        },
        {
          title: "Resultados salvos",
          url: "#",
        },
      ],
    },
    {
      title: "Automações",
      url: "#",
      icon: <BotIcon className="size-4" />,
      items: [
        {
          title: "Assistentes",
          url: "#",
        },
        {
          title: "Fluxos",
          url: "#",
        },
      ],
    },
    {
      title: "Configurações",
      url: "#",
      icon: <Settings2Icon className="size-4" />,
      items: [
        {
          title: "Geral",
          url: "#",
        },
        {
          title: "Conta",
          url: "#",
        },
        {
          title: "Plano",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Suporte",
      url: "#",
      icon: <LifeBuoyIcon className="size-4" />,
    },
    {
      title: "Feedback",
      url: "#",
      icon: <SendIcon className="size-4" />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="border-b border-sidebar-border/70">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<a href="/chatbot" />}
              className="gap-3"
            >
              <div className="flex aspect-square size-9 items-center justify-center rounded-xl bg-primary text-primary-foreground shadow-sm">
                <SparklesIcon className="size-4" />
              </div>

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold tracking-tight">
                  Faunbi
                </span>
                <span className="truncate text-xs text-muted-foreground">
                  Assistente inteligente
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border/70 p-2">
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}