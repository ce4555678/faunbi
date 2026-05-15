import { Suspense } from "react"
import ChatBot from "./chatbot"
import ChatSkeleton from "@/components/chatbot-skeleton"

export const metadata = {
  title: "ChatBot",
}

export default function ChatBotPage() {
  return (
    <Suspense
      fallback={
        <ChatSkeleton/>
      }
    >
      <ChatBot />
    </Suspense>
  )
}
