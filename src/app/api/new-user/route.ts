import { serve } from "@upstash/workflow/nextjs"
import { Resend } from "resend"
import EmailWelcome from "@/components/email-welcome"
import { createClient } from "@tursodatabase/api"

const resend = new Resend(process.env.RESEND_KEY)
const turso = createClient({
  org: "ce4555678",
  token: process.env.TURSO_KEY as string,
})
interface ServeBody {
  email: string
  name: string
  id: string
}

export const { POST } = serve<ServeBody>(async (context) => {
  const { email, name, id } = context.requestPayload

  await context.run("enviar-email de boas vindas", async () => {
    await resend.emails.send({
      from: "Faunbi <noreplay@notifications.faunbi.com>",
      to: email,
      subject: "Boas vindas",
      react: EmailWelcome({
        name,
        url: "https://www.faunbi.com",
      }),
    })
  })

  await context.run("criar banco", async () => {
    await turso.databases.create(id.toLowerCase(), {
      group: "faunbi",
    })
  })
})
