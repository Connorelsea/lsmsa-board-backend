import knex      from "knex"
import bookshelf from "bookshelf"

const config = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "user",
    password: "password",
    database: "myapp_test",
    charset: "utf8",
  }
}

const knexObject      = knex(config)
const bookshelfObject = bookshelf(knexObject)

export default bookshelfObject

console.log("Hello")
