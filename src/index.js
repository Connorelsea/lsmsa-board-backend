import express    from "express"
import bodyParser from "body-parser"
import morgan     from "morgan"
import jwt        from "jsonwebtoken"

const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan("dev"))

app.get("/", function(req, res) {
  res.send("Hello, Api!")
})

const port = process.env.PORT || 3000

app.listen(port, function() {
  console.log("Running")
})

console.log("Hello, World!")
