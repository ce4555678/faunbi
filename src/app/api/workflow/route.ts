// app/api/workflow/route.ts
import { serve } from "@upstash/workflow/nextjs"

export const { POST } = serve(async (context) => {
  await context.run("step-1", () => console.log("running locally"))
})
