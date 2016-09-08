import Bookshelf from "./database"
import ModelBase from "bookshelf-modelbase"

const Model = ModelBase(Bookshelf)

const User = Model.extend({
  tableName: "users"
})

const Users = Bookshelf.Collection.extend({
  model: User,
})

export { User, Users }
