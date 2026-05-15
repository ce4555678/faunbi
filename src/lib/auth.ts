import db from "@/db"
import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { admin, haveIBeenPwned } from "better-auth/plugins"
import redis from "./redis"
import { apiKey } from "@better-auth/api-key"
import { nextCookies } from "better-auth/next-js"
import { userDb } from "@/db/schema/user-db"
import { accountDb } from "@/db/schema/account-db"
import { apikeyDb } from "@/db/schema/api-key-db"

export const auth = betterAuth({
  plugins: [
    admin(),
    nextCookies(),
    haveIBeenPwned({
      enabled: process.env.NODE_ENV === "production",
      customPasswordCompromisedMessage:
        "Por favor, escolha uma senha mais segura.",
    }),
    apiKey({
      storage: "secondary-storage",
    }),
  ],
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    maxPasswordLength: 100,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
  secondaryStorage: {
    get: async (key) => await redis.get(key),
    set: async (key, value, ttl) => {
      if (ttl) await redis.set(key, value, "EX", ttl)
      else await redis.set(key, value)
    },
    delete: async (key) => {
      await redis.del(key)
    },
  },
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: userDb,
      account: accountDb,
      apikey: apikeyDb,
    },
  }),
})
