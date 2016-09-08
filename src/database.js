import knex      from "knex"
import bookshelf from "bookshelf"

const config = {
  client: "mysql",
  connection: {
    host: "127.0.0.1",
    user: "root",
    password: "",
    database: "lsmsa_board",
    charset: "utf8",
  }
}

const knexObject      = knex(config)
const bookshelfObject = bookshelf(knexObject)

export default bookshelfObject
