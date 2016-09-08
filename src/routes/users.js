import { Users, User } from "../models.js"

const route = "/users"

function requireFields({
  objects: { req, res },
  required,
  success
}) {
  let field_values = {}

  try {

    required.forEach(field => {
      if (!req.body[field]) throw new Error("First missing field: " + field)
      else field_values = { ...field_values, [field]:req.body[field] }
    })

    success(field_values)

  } catch (err) {

    res.json({
      error : true,
      data  : {
        message: `Not all required fields are present: ${err.message}`
      }
    })

  }
}

function respondError(res, err) {
  res.status(500).json({
    error : true,
    data  : { message: err.message } 
  })
}

function respondData(res, data) {
  res.json({
    error : false,
    data  : data
  })
}

/**
 * Noun: GET
 * Action: Fetch all users
 */
function get(req, res) {
  User.findAll()
  .then(users =>  respondData (res, users.toJSON()))
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
        .then(user =>  respondData (res, user.toJSON()))
        .catch(err => respondError (res, err))
    }
  })

}

export { route, post, get }
