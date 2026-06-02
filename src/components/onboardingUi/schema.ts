import * as z from "zod"

// ── Refinamentos reutilizáveis ────────────────────────────────────────────────

const optionalCnpj = z
  .string()
  .refine((v) => !v || v.replace(/\D/g, "").length === 14, "CNPJ inválido")

const optionalPhone = z
  .string()
  .refine((v) => !v || v.replace(/\D/g, "").length >= 10, "Telefone inválido")

const optionalCep = z
  .string()
  .refine((v) => !v || v.replace(/\D/g, "").length === 8, "CEP inválido")

const optionalEmail = z
  .string()
  .refine(
    (v) => !v || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
    "E-mail inválido"
  )

// ── Schema principal ──────────────────────────────────────────────────────────

export const companySchema = z.object({
  businessName: z.string().min(2, "Nome da empresa é obrigatório"),
  tradeName:    z.string().optional(),
  document:     optionalCnpj,
  email:        optionalEmail,
  phone:        optionalPhone,
  zipCode:      optionalCep,
  street:       z.string().optional(),
  number:       z.string().optional(),
  complement:   z.string().optional(),
  district:     z.string().optional(),
  city:         z.string().optional(),
  state:        z.string().max(2, "UF inválida").optional(),
})

export type CompanyFormData = z.infer<typeof companySchema>

export const companyDefaultValues: CompanyFormData = {
  businessName: "",
  tradeName:    "",
  document:     "",
  email:        "",
  phone:        "",
  zipCode:      "",
  street:       "",
  number:       "",
  complement:   "",
  district:     "",
  city:         "",
  state:        "",
}
