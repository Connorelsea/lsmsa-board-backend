import express    from "express"
import bodyParser from "body-parser"
import morgan     from "morgan"
import routes     from "./routes"

console.log("[Express Index] Init")

const app = express()

// Set up express middleware

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan("dev"))

// Setup routing system

const api_router = express.Router()
routes(api_router)

app.use(api_router)

export { app, express, api_router }
