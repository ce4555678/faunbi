import ChatSkeleton from "@/components/chatbot-skeleton"
import { Metadata } from "next"
import { Suspense } from "react"
import ChatBot from "./chatbot"

export const metadata: Metadata = {
  title: "Chat",
}

export default function ChatPage() {
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatBot />
    </Suspense>
  )
}
