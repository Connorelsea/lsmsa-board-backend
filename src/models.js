import Bookshelf from "./database"

const User = Bookshelf.Model.extend({
  tableName: "users"
})

const Users = Bookshelf.Collection.extend({
  model: User,
})
