import { drizzle } from "drizzle-orm/libsql/http"

export default async function connectDB(userId: string) {
  const db = drizzle({
    connection: {
      url: `libsql://${userId.toLowerCase()}-ce4555678.aws-us-east-1.turso.io`,
      authToken: process.env.TURSO_AUTH_TOKEN,
    },
  })

  return db
}
