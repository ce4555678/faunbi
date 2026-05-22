import ChatSkeleton from "@/components/chatbot-skeleton"
import { Suspense } from "react"
import ChatBot from "../chatbot"
import { loadChat } from "@/lib/chat-store"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import { redirect } from "next/navigation"
import { Metadata } from "next"

// Definimos a interface para o formato dos parâmetros da rota
interface Props {
  params: Promise<{ id: string }>
}

export async function generateMetadata(
  { params }: Props,
): Promise<Metadata> {
      const id = (await params).id

  const session = await auth.api.getSession({
      headers: await headers(),
    })

    if(!session) return {
        title: "Não encontrado"
    }
  const chatHistory = await loadChat(id, session.user.id)

 
  return {
    title: chatHistory.title
  }
}

export default async function ChatIdPage({ params }: Props) {
  // Aguardamos a resolução da Promise dos parâmetros
  const { id } = await params
    const session = await auth.api.getSession({
      headers: await headers(),
    })

    if(!session) redirect("/auth")
  const chatHistory = await loadChat(id, session.user.id)

     console.log(chatHistory)
  return (
    <Suspense fallback={<ChatSkeleton />}>
      <ChatBot id={id} initialMessages={chatHistory.messages}/>
    </Suspense>
  )
}
