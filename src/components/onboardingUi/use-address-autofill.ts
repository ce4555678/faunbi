import * as React from "react"
import { useFormContext } from "react-hook-form"
import type { CompanyFormData } from "@/lib/schema"
import searchCNPJ from "@/utils/search-cnpj"

/**
 * Escuta os campos `document` (CNPJ) e `zipCode` (CEP) e preenche
 * automaticamente os demais campos quando os valores ficam completos.
 *
 * Deve ser montado dentro de um <FormProvider>.
 */
export function useAddressAutofill() {
  const { watch, setValue } = useFormContext<CompanyFormData>()

  const cep  = watch("zipCode")
  const cnpj = watch("document")

  // ── CNPJ → preenche dados da empresa ──────────────────────────────────
  React.useEffect(() => {
    if (!cnpj || cnpj.replace(/\D/g, "").length !== 14) return

    searchCNPJ(cnpj).then(({ razao_social, estabelecimento }) => {
      setValue("businessName", razao_social)
      setValue("tradeName",    estabelecimento.nome_fantasia || "")
      setValue("email",        estabelecimento.email || "")
      setValue("zipCode",      estabelecimento.cep || "")
      setValue("number",       estabelecimento.numero || "")
      setValue("complement",   estabelecimento.complemento || "")
      setValue("phone",        estabelecimento.telefone1 || estabelecimento.telefone2 || "")
    })
  }, [cnpj, setValue])

  // ── CEP → preenche endereço ────────────────────────────────────────────
  React.useEffect(() => {
    const clean = cep?.replace(/\D/g, "")
    if (clean?.length !== 8) return

    fetch(`https://viacep.com.br/ws/${clean}/json`)
      .then((r) => r.json())
      .then((data) => {
        setValue("street",   data.logradouro)
        setValue("district", data.bairro)
        setValue("city",     data.localidade)
        setValue("state",    data.uf)
      })
  }, [cep, setValue])
}
