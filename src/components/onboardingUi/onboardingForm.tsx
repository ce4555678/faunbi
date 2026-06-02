"use client"

import * as React from "react"
import { useForm, FormProvider } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Building2 } from "lucide-react"
import { toast } from "sonner"

import { Button }      from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { companyDefaultValues, CompanyFormData, companySchema } from "./schema"
import { useAddressAutofill } from "./use-address-autofill"
import { LogoSection } from "./logo-section"
import { CompanyDataSection } from "./company-data-section"
import { AddressSection } from "./address-section"

// ── Componente interno que consome o contexto do form ─────────────────────────
// (necessário para que useAddressAutofill acesse o FormProvider)

function CompanyFormInner() {
  const { handleSubmit, formState } = useForm<CompanyFormData>() // apenas para o type — o contexto já está disponível
  const [logoFile, setLogoFile] = React.useState<File | null>(null)

  // Side-effects de autofill ficam aqui, dentro do FormProvider
  useAddressAutofill()

  async function onSubmit(data: CompanyFormData) {
    try {
      console.log({ ...data, logoFile })
      toast.success("Empresa criada com sucesso")
    } catch {
      toast.error("Erro ao criar empresa")
    }
  }

  return null // placeholder — veja CompanyForm abaixo
}

// ── Componente principal ──────────────────────────────────────────────────────

export default function OnboardingForm() {
  const methods = useForm<CompanyFormData>({
    resolver: zodResolver(companySchema),
    defaultValues: companyDefaultValues,
  })

  const [logoFile, setLogoFile] = React.useState<File | null>(null)

  async function onSubmit(data: CompanyFormData) {
    try {
      console.log({ ...data, logoFile })
      toast.success("Empresa criada com sucesso")
    } catch {
      toast.error("Erro ao criar empresa")
    }
  }

  return (
    <FormProvider {...methods}>
      {/* Hook de autofill precisa estar dentro do FormProvider */}
      <AutofillBridge />

      <Card className="mx-auto w-full max-w-6xl border-border bg-card shadow-2xl">
        <CardHeader className="border-b border-border/70 bg-muted/20">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-primary/20 bg-primary/15">
              <Building2 className="h-7 w-7 text-primary dark:text-blue-200" />
            </div>
            <div>
              <CardTitle className="text-3xl font-bold">Configure sua empresa</CardTitle>
              <CardDescription className="mt-2 text-base">
                Essas informações serão utilizadas em clientes, estoque,
                financeiro e automações da plataforma.
              </CardDescription>
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={methods.handleSubmit(onSubmit)} className="space-y-8">
            <LogoSection onFileChange={setLogoFile} />
            <CompanyDataSection />
            <AddressSection />

            <div className="flex justify-end border-t border-border/70 pt-8">
              <Button
                size="lg"
                type="submit"
                disabled={methods.formState.isSubmitting}
                className="h-12 min-w-55 rounded-xl"
              >
                {methods.formState.isSubmitting ? "Criando empresa..." : "Continuar"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </FormProvider>
  )
}

/**
 * Componente auxiliar vazio — apenas monta o hook de autofill
 * dentro do contexto do FormProvider sem poluir o JSX principal.
 */
function AutofillBridge() {
  useAddressAutofill()
  return null
}