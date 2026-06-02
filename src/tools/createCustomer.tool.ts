import db from "@/db"
import { customerTable } from "@/db/schema/customer.db"
import { tool } from "ai"
import { z } from "zod"

// ─── Enums ───────────────────────────────────────────────────────────────────

export const personTypeSchema = z.enum(["PF", "PJ"])

// ─── JSONB Types ─────────────────────────────────────────────────────────────

export const addressSchema = z.object({
  street: z.string().min(1).describe("Logradouro (rua, avenida, etc.)"),
  number: z.string().min(1).describe("Número do imóvel"),
  complement: z
    .string()
    .optional()
    .describe("Complemento opcional, ex: Apto 12"),
  neighborhood: z.string().min(1).describe("Bairro"),
  city: z.string().min(1).describe("Cidade"),
  state: z.string().length(2).describe("UF com 2 letras, ex: SP, RJ"),
  zipCode: z
    .string()
    .regex(/^\d{5}-?\d{3}$/, "CEP inválido")
    .describe("CEP no formato 00000-000 ou 00000000"),
})

const phoneEntrySchema = z.object({
  ddd: z.string().length(2).describe("DDD com 2 dígitos, ex: 11"),
  number: z.string().min(8).max(9).describe("Número com 8 ou 9 dígitos"),
})

const phonesSchema = z.object({
  phone1: phoneEntrySchema.optional().describe("Telefone principal"),
  phone2: phoneEntrySchema.optional().describe("Telefone secundário"),
})

// ─── Customer Input Schema ────────────────────────────────────────────────────

const customerSchema = z.object({
  name: z
    .string()
    .min(1, "Nome é obrigatório")
    .describe("Nome completo ou razão social do cliente"),

  type: personTypeSchema
    .default("PF")
    .optional()
    .describe("Tipo de pessoa: PF para pessoa física, PJ para pessoa jurídica"),
  document: z
    .string()
    .max(14)
    .regex(/^\d+$/, "Documento deve conter apenas números")
    .nullable()
    .optional()
    .describe(
      "CPF (11 dígitos) ou CNPJ (14 dígitos), somente números, opcional"
    ),

  email: z
    .email("E-mail inválido")
    .nullable()
    .optional()
    .describe("E-mail do cliente"),

  phones: phonesSchema
    .nullable()
    .optional()
    .describe("Telefones de contato do cliente"),

  address: addressSchema
    .nullable()
    .optional()
    .describe("Endereço completo do cliente"),
})

// ─── Tool ─────────────────────────────────────────────────────────────────────

const createCustomerTool = tool({
  description: `Cria um novo cliente no sistema.

QUANDO USAR: usuário pedir para cadastrar, adicionar ou registrar um cliente.

FLUXO:
1. Se não souber se é PF ou PJ, pergunte
2. Tendo name + type, execute IMEDIATAMENTE
3. Não peça CPF, email, telefone ou endereço — são opcionais
4. Não peça confirmação — execute direto

APÓS EXECUTAR:
- Se success=true: confirme com "Cliente [nome] cadastrado."
- Se success=false: informe o erro claramente, nunca diga que funcionou
    `,
  inputSchema: customerSchema,
  execute: async (data) => {
    try {
      //   const [customer] = await db
      //     .insert(customerTable)
      //     .values({
      //       ...data,
      //       companyId: "",
      //     })
      //     .returning()
      console.log(data)
      return {
        success: true,
        // customer,
        message: `Cliente "${data.name}" criado com sucesso.`,
      }
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Erro desconhecido"

      // Unique constraint = documento duplicado no tenant
      if (message.includes("customer_enterprise_document_unique_idx")) {
        return {
          success: false,
          message: "Já existe um cliente com esse documento cadastrado.",
        }
      }

      return {
        success: false,
        message: `Não foi possível criar o cliente: ${message}`,
      }
    }
  },
})

export default createCustomerTool
