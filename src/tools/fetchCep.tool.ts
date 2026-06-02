import { tool } from "ai"
import { z } from "zod"

// Tipagem da resposta da ViaCEP
export interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

// Tipagem do retorno da tool
export type FetchCepResult =
  | { success: true; data: ViaCepResponse }
  | { success: false; error: string }

const fetchCepTool = tool({
  description: "Busca informações de endereço a partir de um CEP brasileiro.",
  inputSchema: z.object({
    cep: z
      .string()
      .regex(
        /^\d{5}-?\d{3}$/,
        "CEP inválido. Use o formato 00000-000 ou 00000000."
      ),
  }),
  execute: async ({ cep }): Promise<FetchCepResult> => {
    // Normaliza o CEP removendo hífen
    const cepNormalizado = cep.replace("-", "")

    const response = await fetch(
      `https://viacep.com.br/ws/${cepNormalizado}/json/`
    )

    if (!response.ok) {
      return {
        success: false,
        error: `Erro na requisição: ${response.status} ${response.statusText}`,
      }
    }

    const json = await response.json()

    // A ViaCEP retorna { erro: true } quando o CEP não é encontrado
    if (json.erro) {
      return {
        success: false,
        error: `CEP ${cep} não encontrado.`,
      }
    }

    return {
      success: true,
      data: json as ViaCepResponse,
    }
  },
})

export default fetchCepTool
