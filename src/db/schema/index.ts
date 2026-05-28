import { accountTable } from "./account.db"
import { apikeyTable } from "./apiKey.db"
import { userTable } from "./users.db"

const schema = {
  user: userTable,
  account: accountTable,
  apiKey: apikeyTable,
}

export default schema
