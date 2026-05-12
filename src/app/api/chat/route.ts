import { streamText, UIMessage, convertToModelMessages } from "ai"
import { google } from '@ai-sdk/google';

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json()

  const result = streamText({
    model: google('gemini-3.1-flash-lite'),
    messages: await convertToModelMessages(messages),
  })

  return result.toUIMessageStreamResponse()
}
