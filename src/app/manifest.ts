import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Faunbi — Gestão inteligente para autônomos",
    short_name: "Faunbi",
    description:
      "Organize clientes, pedidos, estoque, agenda e financeiro em uma plataforma simples, moderna e com assistente de IA para automatizar sua rotina.",

    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",

    background_color: "#ffffff",
    theme_color: "#2563eb",

    categories: ["business", "productivity", "finance"],

    lang: "pt-BR",
    dir: "ltr",

    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      {
        src: "/icon512_rounded.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: "/icon512_maskable.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],

    screenshots: [
      {
        src: "/og-image.png",
        sizes: "1731x909",
        type: "image/png",
        form_factor: "wide",
        label: "Faunbi — Gestão inteligente para autônomos",
      },
    ],
  }
}