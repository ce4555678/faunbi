import { accountTable } from "./account.db"
import { apikeyTable } from "./apiKey.db"
import { customerTable } from "./customer.db"
import { inventoryTable } from "./inventory.db"
import { orderTable } from "./order.db"
import { userTable } from "./users.db"

const schema = {
  user: userTable,
  account: accountTable,
  apiKey: apikeyTable,
  cutomer: customerTable,
  inventory: inventoryTable,
  order: orderTable,
  
}

export default schema
