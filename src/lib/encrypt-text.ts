import crypto from "node:crypto"

const algoritmo = "aes-256-ctr"
const secretKey = process.env.SECRET_KEY

if (!secretKey) {
  throw new Error("A SECRET_KEY não foi adicionada")
}

// Gera a chave de 32 bytes baseada na sua variável de ambiente
const chaveSecreta = crypto
  .createHash("sha256")
  .update(secretKey)
  .digest("base64")
  .substring(0, 32)

const ivLength = 16

// Função para ENCRIPTAR (Compacta em Base64)
function encrypt(texto: string): string {
  const iv = crypto.randomBytes(ivLength)
  const cipher = crypto.createCipheriv(algoritmo, chaveSecreta, iv)

  // Junta o IV e os dados criptografados em um único Buffer
  const resultadoBuffer = Buffer.concat([
    iv,
    cipher.update(texto, "utf8"),
    cipher.final(),
  ])

  // Retorna uma string Base64 bem menor que o formato Hex antigo
  return resultadoBuffer.toString("base64")
}

// Função para DECRIPTAR (Lê o formato Base64 compacto)
function decrypt(textoEncriptado: string): string {
  // Transforma a string Base64 de volta em Buffer para leitura
  const bufferCompleto = Buffer.from(textoEncriptado, "base64")

  // Validação: o buffer precisa ter pelo menos o tamanho do IV
  if (bufferCompleto.length < ivLength) {
    throw new Error("Texto criptografado em formato inválido ou corrompido.")
  }

  // Extrai o IV (primeiros 16 bytes) e o texto cifrado (o restante)
  const iv = bufferCompleto.subarray(0, ivLength)
  const textoCifrado = bufferCompleto.subarray(ivLength)

  const decipher = crypto.createDecipheriv(algoritmo, chaveSecreta, iv)

  let decriptado = decipher.update(textoCifrado, undefined, "utf8")
  decriptado += decipher.final("utf8")

  return decriptado
}

const encryptText = {
  encrypt,
  decrypt,
}

export default encryptText
