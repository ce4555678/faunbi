import { createHash, Hash } from "crypto"

export default async function genHashSha3(url: string): Promise<string> {
  return fetch(url).then((response: Response): Promise<string> => {
    if (!response.ok) {
      throw new Error(`Erro ao baixar o arquivo: ${response.statusText}`)
    }

    if (!response.body) {
      throw new Error("O corpo da resposta (response.body) está vazio.")
    }

    // Inicializa o algoritmo SHA-3 de 256 bits nativo do Node.js
    const hash: Hash = createHash("sha3-256")
    const reader = response.body.getReader()

    return new Promise<string>((resolve, reject) => {
      function lerProximoPedaco(): void {
        reader
          .read()
          .then(({ done, value }: ReadableStreamReadResult<Uint8Array>) => {
            if (done) {
              // Download concluído! Retorna o hash final do SHA-3
              const id = gerarIdCurtoDoHash(hash.digest("hex"))
              resolve(id)
              return
            }

            if (value) {
              // Alimenta a máquina do SHA-3 com o pedaço de dados atual
              hash.update(value)
            }

            // Continua o loop para o próximo bloco da rede
            lerProximoPedaco()
          })
          .catch((err: unknown) => {
            reject(err) // Captura falhas de conexão no meio do streaming
          })
      }

      lerProximoPedaco()
    })
  })
}

function gerarIdCurtoDoHash(sha3Hex: string) {
  // 1. Corta o hash para pegar apenas os primeiros 16 caracteres hexadecimais (8 bytes)
  const hexCurto = sha3Hex.substring(0, 16)

  // 2. Converte para bytes e depois para Base64 URL-Safe (formato do YouTube)
  return Buffer.from(hexCurto, "hex")
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "") // Remove preenchimento
}

// O seu hash SHA3 original
// const seuHash = "b6d20094b54ecf17e0059797355d5931d7491a005647a2e90d8fed5fd15c50c4";
// const idEstiloYoutube = gerarIdCurtoDoHash(seuHash);

// console.log(idEstiloYoutube);
// Resultado: ttIAlLVOzxc (Exatamente 11 caracteres, igual ao qNJXt_L79y4)
