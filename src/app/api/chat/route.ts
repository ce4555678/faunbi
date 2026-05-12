import { streamText, UIMessage, convertToModelMessages } from "ai"
import { google, GoogleLanguageModelOptions } from "@ai-sdk/google"

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: google("gemini-3.1-flash-lite"),
    messages: await convertToModelMessages(messages),
    topP: 0.1,
    temperature: 0.1,
    providerOptions: {
      google: {
        thinkingConfig: {
          thinkingLevel: "minimal",
        },
      } satisfies GoogleLanguageModelOptions,
    },
  })

  return result.toUIMessageStreamResponse()
}
