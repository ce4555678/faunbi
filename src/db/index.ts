import { drizzle } from "drizzle-orm/node-postgres"

const connectionString = process.env.DATABASE_URL as string
const db = drizzle(connectionString)

export default db
