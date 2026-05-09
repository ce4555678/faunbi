import embeddingText from "@/lib/embedding-text"

export const GET = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get("query")

  if (!query) {
    return new Response(
      JSON.stringify({ error: "Query parameter is required" }),
      { status: 400 }
    )
  }

  const embedding = await embeddingText(query)

  return new Response(JSON.stringify(embedding), {
    headers: { "Content-Type": "application/json" },
  })
}
