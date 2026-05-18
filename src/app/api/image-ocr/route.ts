import Ocr from '@gutenye/ocr-node'

export const runtime = "nodejs"
export const GET = async (request: Request) => {
  const file = await fetch("https://tesseract.projectnaptha.com/img/eng_bw.png")
  const image = await file.blob()
  const ocr = await Ocr.create()
const result = await ocr.detect(await image.arrayBuffer())
  // 1. Converte o Blob para ArrayBuffer


  return Response.json({
    text: result.text,
    lines: result.lines,
  })
}
