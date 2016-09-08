import { Users, User } from "../models.js"
import { requireFields, respondJSON, respondError } from "../api_util"

const route = "/users"

/**
 * Noun: GET
 * Action: Fetch all users
 */
function get(req, res) {
  User.findAll()
  .then(users =>  respondJSON (res, users))
  .catch(err  => respondError (res, err))
}

/**
 * Noun: POST
 * Action: Create new user
 */
function post(req, res) {

  requireFields({
    objects  : { req, res },
    required : [
      "name_first", "name_last"
    ],
    success: function(fields) {
      User.create(fields)
        .then(user =>  respondJSON (res, fields, { status: 201 }))
        .catch(err => respondError (res, err))
    }
  })

}

export { route, post, get }
