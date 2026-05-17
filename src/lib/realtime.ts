import { Realtime, InferRealtimeEvents } from "@upstash/realtime"
import z from "zod/v4"
import redis from "./redis"

const schema = {
  notification: {
    alert: z.string(),
  },
}

export const realtime = new Realtime({
  schema,
  redis,
  history: {
    expireAfterSecs: 60 * 60 * 24, // 1 day,
    maxLength: 100,
  },
  maxDurationSecs: 300,
})
export type RealtimeEvents = InferRealtimeEvents<typeof realtime>
