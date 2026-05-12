"use client"
import Link from "next/link"
import { Sparkles } from "lucide-react"

const footerLinks = {
  produto: [
    { label: "Funcionalidades", href: "#features" },
    { label: "Módulos", href: "#modules" },
    { label: "Planos", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ],
  empresa: [
    { label: "Sobre nós", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Carreiras", href: "/careers" },
    { label: "Contato", href: "/contact" },
  ],
  legal: [
    { label: "Termos de Uso", href: "/terms" },
    { label: "Privacidade", href: "/privacy" },
    { label: "Cookies", href: "/cookies" },
    { label: "LGPD", href: "/lgpd" },
  ],
  suporte: [
    { label: "Central de Ajuda", href: "/help" },
    { label: "Documentação", href: "/docs" },
    { label: "Status", href: "/status" },
    { label: "API", href: "/api-docs" },
  ],
}

const socialLinks: {
  icon: React.ElementType
  href: string
  label: string
}[] = [
  //   { icon: Twitter, href: "https://twitter.com/faunbi", label: "Twitter" },
  //   { icon: Instagram, href: "https://instagram.com/faunbi", label: "Instagram" },
  //   { icon: Linkedin, href: "https://linkedin.com/company/faunbi", label: "LinkedIn" },
  //   { icon: Youtube, href: "https://youtube.com/@faunbi", label: "YouTube" },
]

export default function FooterLandingUi() {
  return (
    <footer className="border-t border-border bg-card/30">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer */}
        <div className="py-12 md:py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-6 lg:gap-12">
            {/* Brand Column */}
            <div className="col-span-2">
              <Link href="/" className="mb-4 flex items-center gap-2">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10">
                  <Sparkles className="h-5 w-5 text-primary" />
                </div>
                <span className="text-xl font-bold tracking-tight">faunbi</span>
              </Link>
              <p className="mb-6 max-w-xs text-sm leading-relaxed text-muted-foreground">
                A plataforma de gestão por conversa para profissionais
                autônomos. Simplifique seu negócio com IA.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-9 w-9 items-center justify-center rounded-lg bg-muted text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
                    aria-label={social.label}
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                ))}
              </div>
            </div>

            {/* Link Columns */}
            <div>
              <h4 className="mb-4 font-semibold">Produto</h4>
              <ul className="space-y-3">
                {footerLinks.produto.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Empresa</h4>
              <ul className="space-y-3">
                {footerLinks.empresa.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Legal</h4>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Suporte</h4>
              <ul className="space-y-3">
                {footerLinks.suporte.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Faunbi. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Feito com</span>
            <span className="text-red-500">♥</span>
            <span>no Brasil</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
