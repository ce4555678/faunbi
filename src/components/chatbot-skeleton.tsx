import { Skeleton } from "@/components/ui/skeleton"

export default function ChatSkeleton() {
  return (
    <div className="flex h-dvh w-full flex-col bg-background px-4 py-4 sm:px-6">
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-4">
        <div className="space-y-2">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-4 w-64 max-w-[70vw]" />
        </div>

        <Skeleton className="h-10 w-36 rounded-full" />
      </div>

      {/* Área da conversa */}
      <div className="min-h-0 flex-1 overflow-hidden rounded-3xl border bg-card shadow-sm">
        <div className="flex h-full flex-col items-center justify-center px-4 py-10 text-center">
          {/* Ícone */}
          <Skeleton className="mb-6 size-14 rounded-2xl" />

          {/* Título */}
          <Skeleton className="mb-3 h-7 w-[320px] max-w-[85vw]" />

          {/* Subtítulo */}
          <div className="mb-7 space-y-2">
            <Skeleton className="mx-auto h-4 w-[420px] max-w-[80vw]" />
            <Skeleton className="mx-auto h-4 w-[260px] max-w-[70vw]" />
          </div>

          {/* Sugestões */}
          <div className="grid w-full max-w-[450px] grid-cols-1 gap-2.5 sm:grid-cols-2">
            <Skeleton className="h-12 rounded-2xl" />
            <Skeleton className="h-12 rounded-2xl" />
            <Skeleton className="h-16 rounded-2xl sm:h-12" />
            <Skeleton className="h-16 rounded-2xl sm:h-12" />
          </div>
        </div>
      </div>

      {/* Input */}
      <div className="mt-3 rounded-3xl border bg-card p-4 shadow-sm">
        <Skeleton className="mb-7 h-4 w-48" />

        <div className="flex items-center justify-between">
          <Skeleton className="size-6 rounded-full" />
          <Skeleton className="size-9 rounded-xl" />
        </div>
      </div>
    </div>
  )
}