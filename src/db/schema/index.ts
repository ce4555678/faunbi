import { accountTable } from "./account.db"
import { apikeyTable } from "./apiKey.db"
import { customerTable } from "./customer.db"
import { inventoryTable } from "./inventory.db"
import { userTable } from "./users.db"

const schema = {
  user: userTable,
  account: accountTable,
  apiKey: apikeyTable,
  cutomer: customerTable,
  inventory: inventoryTable
}

export default schema
