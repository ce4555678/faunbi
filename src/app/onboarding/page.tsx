import { redirect } from "next/navigation"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { Metadata } from "next"
import OnboardingForm from "@/components/onboardingUi/onboardingForm"

export const metadata: Metadata = {
  title: "Criar Empresa",
  description:
    "Configure sua empresa e comece a usar a Faunbi para gerenciar clientes, serviços, estoque, finanças e automações com IA.",
  robots: {
    index: false,
    follow: false,
  },
}

export default async function OnboardingPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/auth/login")
  }

  if (session.session.companyId) {
    redirect("/assistente")
  }

  return (
    <main className="min-h-screen bg-linear-to-b from-background via-background to-muted/20 p-6 md:p-10">
      <OnboardingForm />
    </main>
  )
}
