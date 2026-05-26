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
  BarChart3Icon,
  BoxesIcon,
  CircleDollarSignIcon,
  CreditCardIcon,
  FileTextIcon,
  LayoutDashboardIcon,
  LifeBuoyIcon,
  MessageSquareTextIcon,
  SendIcon,
  Settings2Icon,
  UserRoundIcon,
} from "lucide-react"
import Image from "next/image"

const data = {
  navMain: [
    {
      title: "Assistente",
      url: "/assistente",
      icon: <MessageSquareTextIcon className="size-4" />,
    },
    {
      title: "Clientes",
      url: "/clients",
      icon: <UserRoundIcon className="size-4" />,
    },
    {
      title: "Configurações",
      url: "/settings",
      icon: <Settings2Icon className="size-4" />,
      items: [
        {
          title: "Conta",
          url: "/settings/account",
        },
        {
          title: "Geral",
          url: "/settings",
        },
      ],
    },
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon className="size-4" />,
    },
    {
      title: "Estoque",
      url: "/inventory",
      icon: <BoxesIcon className="size-4" />,
    },
    {
      title: "Financeiro",
      url: "/finance",
      icon: <CircleDollarSignIcon className="size-4" />,
    },
    {
      title: "Orcamentos",
      url: "/budgets",
      icon: <FileTextIcon className="size-4" />,
    },
    {
      title: "Planos",
      url: "/plans",
      icon: <CreditCardIcon className="size-4" />,
      items: [
        {
          title: "Meu plano",
          url: "/plans",
        },
        {
          title: "Upgrade",
          url: "/plans/upgrade",
        },
      ],
    },
    {
      title: "Relatorios",
      url: "/reports",
      icon: <BarChart3Icon className="size-4" />,
    },
    {
      title: "Suporte",
      url: "/support",
      icon: <LifeBuoyIcon className="size-4" />,
      items: [
        {
          title: "Central de ajuda",
          url: "/support",
        },
        {
          title: "Falar com suporte",
          url: "/support/contact",
        },
      ],
    },
  ],

  navSecondary: [
    {
      title: "Feedback",
      url: "/feedback",
      icon: <SendIcon className="size-4" />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader className="border-b border-slate-800/10 dark:border-slate-800/80">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              render={<a href="/dashboard" />}
              className="gap-3"
            >
              <div className="flex items-center gap-3">
                <div className="flex aspect-square size-10 items-center justify-center overflow-hidden rounded-xl border border-border bg-background shadow-sm">
                  <Image
                    src="/faunbi.svg"
                    alt="Logo Faunbi"
                    width={28}
                    height={28}
                    className="size-7 object-contain"
                    priority
                  />
                </div>

                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold tracking-tight text-foreground">
                    Faunbi
                  </span>
                  <span className="truncate text-xs text-muted-foreground">
                    Assistente inteligente
                  </span>
                </div>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent className="px-2 py-3">
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>

      <SidebarFooter className="border-t border-slate-800/10 p-2 dark:border-slate-800/80">
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
