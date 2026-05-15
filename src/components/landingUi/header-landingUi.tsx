"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Menu, X, MessageSquare, ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"
import ButtonTheme from "../button-theme"

const navLinks = [
  { href: "#features", label: "Funcionalidades" },
  { href: "#how-it-works", label: "Como Funciona" },
  { href: "#modules", label: "Módulos" },
  { href: "#pricing", label: "Planos" },
]

export function HeaderLandingUi() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }

    handleScroll()
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={cn(
        "fixed top-0 right-0 left-0 z-50 transition-all duration-300",
        isScrolled
          ? "border-b border-slate-200/80 bg-white/85 shadow-sm shadow-slate-950/5 backdrop-blur-2xl dark:border-slate-800/80 dark:bg-slate-950/80"
          : "bg-transparent"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-300",
            isScrolled ? "h-16" : "h-20"
          )}
        >
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <Image
              className="size-10"
              src="/faunbi.svg"
              alt="Logo"
              width={40}
              height={40}
            />

            <div className="flex flex-col leading-none">
              <span className="text-xl font-black tracking-tight text-slate-950 dark:text-white">
                Faunbi
              </span>
              <span className="hidden text-[10px] font-semibold tracking-[0.22em] text-blue-600 uppercase sm:block dark:text-blue-300">
                AI Business
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden items-center rounded-full border border-slate-200/80 bg-white/70 p-1 shadow-sm backdrop-blur-xl md:flex dark:border-slate-800 dark:bg-slate-900/60">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-full px-4 py-2 text-sm font-semibold text-slate-600 transition-all duration-200 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <ButtonTheme/>
            <Button
              variant="ghost"
              size="sm"
              className="font-semibold text-slate-700 hover:bg-slate-100 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-slate-800 dark:hover:text-white"
            >
              <Link href="/auth/login">Entrar</Link>
            </Button>
            <Link className="flex items-center gap-2" href="/auth/sign-up">
              <Button
                size="sm"
                className="group h-10 rounded-full bg-blue-600 px-5 font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400"
              >
                <MessageSquare className="h-4 w-4" />
                Começar Grátis
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-10 w-10 rounded-full border border-slate-200 bg-white/80 text-slate-900 shadow-sm backdrop-blur-xl hover:bg-slate-100 md:hidden dark:border-slate-800 dark:bg-slate-900/80 dark:text-white dark:hover:bg-slate-800"
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-label={isMobileMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>

        {/* Mobile Menu */}
        <div
          className={cn(
            "grid overflow-hidden transition-all duration-300 md:hidden",
            isMobileMenuOpen
              ? "grid-rows-[1fr] pb-4 opacity-100"
              : "grid-rows-[0fr] opacity-0"
          )}
        >
          <div className="min-h-0">
            <div className="rounded-3xl border border-slate-200 bg-white/95 p-3 shadow-2xl shadow-slate-950/10 backdrop-blur-2xl dark:border-slate-800 dark:bg-slate-950/95">
              <div className="flex flex-col gap-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:bg-blue-50 hover:text-blue-700 dark:text-slate-300 dark:hover:bg-blue-950/40 dark:hover:text-blue-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>

              <div className="mt-3 border-t border-slate-200 pt-3 dark:border-slate-800">
                <div className="grid gap-2">
                  <Button
                    variant="outline"
                    className="h-11 rounded-2xl border-slate-300 bg-white font-semibold text-slate-900 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:bg-slate-900"
                  >
                    <Link
                      href="/login"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Entrar
                    </Link>
                  </Button>

                  <Button className="h-11 rounded-2xl bg-blue-600 font-semibold text-white shadow-lg shadow-blue-600/25 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400">
                    <Link
                      href="/chat"
                      className="flex items-center justify-center gap-2"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <MessageSquare className="h-4 w-4" />
                      Começar Grátis
                    </Link>
                  </Button>
                </div>

                <p className="mt-3 text-center text-xs font-medium text-slate-500 dark:text-slate-400">
                  Teste grátis, sem cartão de crédito.
                </p>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  )
}
