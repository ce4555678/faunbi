import { Geist_Mono, Roboto, Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import { NuqsAdapter } from "nuqs/adapters/next/app"
import { TooltipProvider } from "@/components/ui/tooltip"
import { Toaster } from "@/components/ui/sonner"

const interHeading = Inter({ subsets: ["latin"], variable: "--font-heading" })

const roboto = Roboto({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

import type { Metadata, Viewport } from "next"
import Providers from "./providers"

export const viewport: Viewport = {
  themeColor: "#FFFFFF",
}

export const metadata: Metadata = {
  title: {
    default: "Faunbi — Gestão inteligente para autônomos",
    template: "%s | Faunbi",
  },
  description:
    "Organize clientes, pedidos, estoque, agenda e financeiro em uma plataforma simples, moderna e com assistente de IA para automatizar sua rotina.",

  applicationName: "Faunbi",

  authors: [{ name: "Faunbi" }],

  creator: "Faunbi",
  publisher: "Faunbi",

  manifest: "/manifest.webmanifest",

  keywords: [
    "Faunbi",
    "gestão para autônomos",
    "sistema para pequenos negócios",
    "controle financeiro",
    "controle de estoque",
    "gestão de pedidos",
    "orçamentos online",
    "agenda para serviços",
    "assistente de IA",
    "SaaS para autônomos",
  ],

  icons: {
    icon: [
      {
        url: "/icon512_rounded.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/icon512_rounded.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    other: [
      {
        rel: "mask-icon",
        url: "/icon512_maskable.png",
      },
    ],
  },

  openGraph: {
    title: "Faunbi — Gestão inteligente para autônomos",
    description:
      "Controle clientes, pedidos, estoque, agenda e financeiro com uma plataforma simples, rápida e impulsionada por IA.",
    url: "https://faunbi.com",
    siteName: "Faunbi",
    locale: "pt_BR",
    type: "website",
    images: [
      {
        url: "https://faunbi.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Faunbi — Gestão inteligente para autônomos e pequenos negócios",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Faunbi — Gestão inteligente para autônomos",
    description:
      "Clientes, pedidos, estoque, agenda e financeiro em um só lugar, com IA para simplificar sua rotina.",
    images: ["https://faunbi.com/og-image.avif"],
  },

  alternates: {
    canonical: "https://faunbi.com",
  },

  category: "business",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="pt-BR"
      dir="ltr"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        roboto.variable,
        interHeading.variable
      )}
    >
      <body>
        <ThemeProvider>
          <NuqsAdapter>
            <TooltipProvider>
              <Providers>{children}</Providers>
              <Toaster  richColors/>
            </TooltipProvider>
          </NuqsAdapter>
        </ThemeProvider>
      </body>
    </html>
  )
}
