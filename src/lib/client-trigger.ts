import { Client } from "@upstash/workflow"

const clientTrigger = new Client({ token: process.env.QSTASH_TOKEN ?? "" })

// await client.trigger({
//   url: "http://localhost:3000/api/workflow",

// });

export default clientTrigger
