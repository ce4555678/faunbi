// Definição da interface para a resposta da Cloudflare (opcional, mas recomendada)
interface CloudflareEmbeddingResponse {
  result: {
    data: number[][]
  }
  success: boolean
  errors: any[]
  messages: any[]
}

/**
 * Gera embeddings utilizando o modelo BAAI BGE-M3 da Cloudflare
 * @param texts Array de strings que serão processadas
 */
export default async function generateEmbeddings(
  texts: string[]
): Promise<CloudflareEmbeddingResponse | null> {
  const accountId = process.env.CLOUDFLARE_ACCOUNT_ID
  const apiToken = process.env.CLOUDFLARE_API_TOKEN

  if (!accountId || !apiToken) {
    throw new Error(
      "As variáveis de ambiente CLOUDFLARE_ACCOUNT_ID e CLOUDFLARE_API_TOKEN são obrigatórias."
    )
  }

  const url = `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/google/embeddinggemma-300m`

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: texts }),
    })

    if (!response.ok) {
      throw new Error(
        `Erro na requisição: ${response.status} ${response.statusText}`
      )
    }

    const result: CloudflareEmbeddingResponse = await response.json()
    return result
  } catch (error) {
    console.error("Erro ao buscar embeddings:", error)
    return null
  }
}
