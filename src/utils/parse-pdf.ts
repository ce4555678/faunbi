import PDFParser from "pdf2json"

export default async function parsePDF(url: string): Promise<string> {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error("Falha ao buscar o PDF")
    }

    // 2. Transforma em ArrayBuffer
    const arrayBuffer = await response.arrayBuffer()

    // CORREÇÃO DO ERRO: Converte o ArrayBuffer do navegador/fetch em um Buffer do Node.js
    const nodeBuffer = Buffer.from(arrayBuffer)

    // 3. Cria uma Promise para esperar os eventos assíncronos do pdf2json
    const pdfData = await new Promise((resolve, reject) => {
      const pdfParser = new PDFParser(null, true)

      pdfParser.on("pdfParser_dataError", (errData) => {
        reject(errData)
      })

      pdfParser.on("pdfParser_dataReady", () => {
        // Se você quiser apenas o texto puro (Raw Text):
        const textContent = pdfParser.getRawTextContent()
        resolve(textContent)

        // Se preferir o JSON estruturado completo do PDF, descomente a linha abaixo:
        // resolve(parsedData);
      })

      // Passa o Buffer correto do Node.js
      pdfParser.parseBuffer(nodeBuffer)
    })

    // 4. Retorna o resultado obtido na Promise
    return pdfData as string
  } catch (error) {
    console.error("Erro no processamento do PDF:", error)
    throw new Error("Erro no processamento do PDF: " + (error))
  }
}
