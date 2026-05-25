import db from "@/db"
import { chatdb } from "@/db/schema/chat-db"
import { auth } from "@/lib/auth"
import { eq } from "drizzle-orm"
import { headers } from "next/headers"
import { NextResponse } from "next/server"
import { parseAsFloat, createLoader } from "nuqs/server"

// Describe your search params, and reuse this in useQueryStates / createSerializer:
export const paginateSearchParams = {
  page: parseAsFloat.withDefault(0),
}

export const loadSearchParams = createLoader(paginateSearchParams)

export const GET = async (request: Request) => {
  const { page } = loadSearchParams(request)
  const session = await auth.api.getSession({
    headers: await headers(),
  })
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
  const chats = await db
    .select({
      id: chatdb.id,
      title: chatdb.title,
    })
    .from(chatdb)
    .where(eq(chatdb.userId, session.user.id))
    .limit(10)
    .offset(page * 10)

  return NextResponse.json(chats)
}
