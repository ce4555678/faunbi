import { Suspense } from "react"
import ChatBot from "./chatbot"
import { Spinner } from "@/components/ui/spinner"

export const metadata = {
  title: "ChatBot",
}

export default function ChatBotPage() {
  return (
    <Suspense
      fallback={
        <div>
          <Spinner />
          Loading...
        </div>
      }
    >
      <ChatBot />
    </Suspense>
  )
}
