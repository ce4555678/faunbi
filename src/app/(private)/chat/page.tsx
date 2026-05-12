"use client"
import { useMemo, useState } from "react"
import {
  Send,
  Bot,
  User,
  Paperclip,
  X,
  FileText,
  ImageIcon,
} from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

type Message = {
  role: "assistant" | "user"
  content: string
}

type PreviewFile = {
  id: string
  file: File
  url: string | null
  type: "image" | "pdf"
}

const MAX_FILES = 3

const allowedTypes = [
  "application/pdf",
  "image/png",
  "image/jpeg",
  "image/webp",
]

const initialMessages: Message[] = [
  {
    role: "assistant",
    content: "Olá! Sou seu assistente inteligente. Como posso te ajudar hoje?",
  },
  {
    role: "user",
    content: "Quero organizar meus atendimentos e automatizar algumas tarefas.",
  },
  {
    role: "assistant",
    content:
      "Perfeito. Posso te ajudar a criar clientes, gerar orçamentos, consultar estoque, resumir informações e automatizar processos.",
  },
]

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const [input, setInput] = useState("")
  const [files, setFiles] = useState<PreviewFile[]>([])

  const canSend = useMemo(() => {
    return input.trim().length > 0 || files.length > 0
  }, [input, files])

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFiles = Array.from(event.target.files ?? [])
    if (!selectedFiles.length) return

    const remainingSlots = MAX_FILES - files.length

    if (remainingSlots <= 0) {
      alert("Você pode enviar no máximo 3 itens.")
      event.target.value = ""
      return
    }

    const validFiles = selectedFiles
      .filter((file) => allowedTypes.includes(file.type))
      .slice(0, remainingSlots)

    if (validFiles.length !== selectedFiles.length) {
      alert("Alguns arquivos foram ignorados. Envie apenas imagens ou PDF.")
    }

    const mappedFiles: PreviewFile[] = validFiles.map((file) => {
      const isImage = file.type.startsWith("image/")

      return {
        id: crypto.randomUUID(),
        file,
        type: isImage ? "image" : "pdf",
        url: isImage ? URL.createObjectURL(file) : null,
      }
    })

    setFiles((prev) => [...prev, ...mappedFiles])
    event.target.value = ""
  }

  function removeFile(id: string) {
    setFiles((prev) => {
      const fileToRemove = prev.find((item) => item.id === id)

      if (fileToRemove?.url) {
        URL.revokeObjectURL(fileToRemove.url)
      }

      return prev.filter((item) => item.id !== id)
    })
  }

  function handleSend() {
    if (!canSend) return

    const fileText =
      files.length > 0
        ? `\n\nArquivos anexados: ${files
            .map((item) => item.file.name)
            .join(", ")}`
        : ""

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        content: `${input || "Enviei alguns arquivos para análise."}${fileText}`,
      },
      {
        role: "assistant",
        content:
          "Recebi sua mensagem. Vou processar o conteúdo e te devolver uma resposta estruturada.",
      },
    ])

    files.forEach((item) => {
      if (item.url) URL.revokeObjectURL(item.url)
    })

    setInput("")
    setFiles([])
  }

  return (
    <main className="h-dvh w-full overflow-hidden bg-background text-foreground">
      <section className="relative flex h-full w-full flex-col">
        {/* Área de mensagens com scroll vertical */}
        <ScrollArea className="h-full w-full pb-45 sm:pb-47.5">
          <div className="mx-auto flex min-h-full w-full max-w-4xl flex-col gap-5 px-4 pt-6 pb-8 sm:px-6 sm:pt-10 lg:px-8">
            {messages.map((message, index) => {
              const isUser = message.role === "user"

              return (
                <div
                  key={index}
                  className={`flex w-full items-end gap-2 sm:gap-3 ${
                    isUser ? "justify-end" : "justify-start"
                  }`}
                >
                  {!isUser && (
                    <Avatar className="h-8 w-8 shrink-0 border bg-muted shadow-sm sm:h-9 sm:w-9">
                      <AvatarFallback className="bg-muted">
                        <Bot className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                      </AvatarFallback>
                    </Avatar>
                  )}

                  <Card
                    className={`max-w-[84%] rounded-3xl border px-4 py-3 text-sm leading-relaxed shadow-sm sm:max-w-[72%] sm:px-5 sm:py-4 sm:text-[15px] ${
                      isUser
                        ? "border-blue-500/30 bg-blue-600 text-white shadow-blue-600/10"
                        : "border-border bg-muted/70 text-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{message.content}</p>
                  </Card>

                  {isUser && (
                    <Avatar className="h-8 w-8 shrink-0 border bg-muted shadow-sm sm:h-9 sm:w-9">
                      <AvatarFallback className="bg-muted">
                        <User className="h-4 w-4 text-blue-600 dark:text-blue-300" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              )
            })}
          </div>
        </ScrollArea>

        {/* Campo fixo no bottom */}
        <div className="fixed inset-x-0 bottom-0 z-20 border-t bg-background/85 px-3 py-3 backdrop-blur-xl sm:px-6 sm:py-5">
          <div className="mx-auto w-full max-w-4xl">
            <div className="rounded-[2rem] border bg-background/95 p-2 shadow-2xl shadow-black/10 dark:shadow-black/30">
              {files.length > 0 && (
                <div className="mb-2 grid grid-cols-1 gap-2 px-1 sm:grid-cols-3">
                  {files.map((item) => (
                    <div
                      key={item.id}
                      className="group relative overflow-hidden rounded-2xl border bg-muted/80"
                    >
                      {item.type === "image" && item.url ? (
                        <div className="relative h-24 w-full sm:h-28">
                          <Image
                            src={item.url}
                            alt={item.file.name}
                            className="h-full w-full object-cover"
                          />

                          <div className="absolute inset-x-0 bottom-0 bg-black/55 px-3 py-2 backdrop-blur-sm">
                            <p className="truncate text-xs text-white">
                              {item.file.name}
                            </p>
                          </div>
                        </div>
                      ) : (
                        <div className="flex h-24 items-center gap-3 px-3 sm:h-28">
                          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
                            <FileText className="h-5 w-5" />
                          </div>

                          <div className="min-w-0">
                            <p className="truncate text-sm font-medium">
                              {item.file.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              Documento PDF
                            </p>
                          </div>
                        </div>
                      )}

                      <button
                        type="button"
                        onClick={() => removeFile(item.id)}
                        className="hover:text-destructive-foreground absolute top-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-background/90 text-foreground shadow-sm transition hover:bg-destructive"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <Textarea
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Digite sua mensagem..."
                className="max-h-40 min-h-14 resize-none border-0 bg-transparent px-4 py-3 text-sm shadow-none focus-visible:ring-0 sm:min-h-20 sm:text-[15px]"
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault()
                    handleSend()
                  }
                }}
              />

              <div className="flex items-center justify-between gap-3 px-2 pt-1 pb-1">
                <div className="flex min-w-0 items-center gap-2">
                  <label
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl border bg-muted/50 transition ${
                      files.length >= MAX_FILES
                        ? "cursor-not-allowed opacity-50"
                        : "cursor-pointer hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:hover:bg-blue-950/40 dark:hover:text-blue-400"
                    }`}
                  >
                    <Paperclip className="h-4 w-4" />

                    <input
                      type="file"
                      multiple
                      disabled={files.length >= MAX_FILES}
                      accept="image/png,image/jpeg,image/webp,application/pdf,.pdf"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>

                  <div className="hidden min-w-0 items-center gap-1 text-xs text-muted-foreground sm:flex">
                    {files.length > 0 ? (
                      <span className="truncate">
                        {files.length}/{MAX_FILES} anexos adicionados
                      </span>
                    ) : (
                      <>
                        <ImageIcon className="h-3.5 w-3.5 shrink-0" />
                        <span>Imagem ou PDF</span>
                      </>
                    )}
                  </div>
                </div>

                <Button
                  onClick={handleSend}
                  disabled={!canSend}
                  className="h-10 shrink-0 rounded-2xl bg-blue-600 px-4 text-white shadow-lg shadow-blue-600/20 hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50 sm:px-5"
                >
                  <span className="hidden sm:inline">Enviar</span>
                  <Send className="h-4 w-4 sm:ml-2" />
                </Button>
              </div>
            </div>

            <p className="mt-2 hidden text-center text-xs text-muted-foreground sm:block">
              Enter para enviar · Shift + Enter para quebrar linha · até 3
              anexos
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}
