import generateEmbeddings from "@/utils/embeddinggemma-300m-embedding"
import { NextResponse } from "next/server"

export const GET = async (request: Request) => {
  const resp = await generateEmbeddings(["um teste"])

  return NextResponse.json(resp?.result.data[0].length)
}
