import jwt from "jsonwebtoken"
import { app } from "./express"

const port = process.env.PORT || 3000

console.log("[Server Index] Init")

app.listen(port, function() {
  console.log(`[Server Index] Running\n[Server Index] Port: ${port}`)
})
