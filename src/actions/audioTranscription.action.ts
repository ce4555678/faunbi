"use server"

import { actionClient } from "@/lib/safe-action"
import Groq from "groq-sdk"
import { z } from "zod"

const MAX_AUDIO_DURATION_MS = 30_000
const MAX_AUDIO_SIZE_BYTES = 20 * 1024 * 1024

export const audioTranscriptAction = actionClient
  .schema(
    z.object({
      audio: z.instanceof(File),
      durationMs: z.number().positive().max(MAX_AUDIO_DURATION_MS, {
        message: "O audio deve ter no maximo 30 segundos.",
      }),
    })
  )
  .action(async ({ parsedInput: { audio } }) => {
    if (audio.size > MAX_AUDIO_SIZE_BYTES) {
      throw new Error("O audio ficou muito grande. Grave ate 30 segundos.")
    }

    const groq = new Groq()

    const transcription = await groq.audio.transcriptions.create({
      file: audio, // Groq aceita File/Blob diretamente
      model: "whisper-large-v3-turbo",
      temperature: 0,
      response_format: "verbose_json",
    })

    return { text: transcription.text?.trim() ?? "" }
  })
