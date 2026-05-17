import { PaddleOcrService } from "ppu-paddle-ocr"

export const runtime = "nodejs"
export const GET = async (request: Request) => {
  const file = await fetch("https://tesseract.projectnaptha.com/img/eng_bw.png")
  const image = await file.blob()
  // 1. Converte o Blob para ArrayBuffer
  const arrayBuffer = await image.arrayBuffer()

  const service = new PaddleOcrService()
  await service.initialize()

  const result = await service.recognize(arrayBuffer, {
    strategy: "per-box",
  })

  return Response.json({
    text: result.text,
    lines: result.lines,
  })
}
