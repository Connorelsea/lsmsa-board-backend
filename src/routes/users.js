import { Users, User } from "../models.js"

const route = "/users"

function requireFields({
  objects: { req, res },
  required,
  success
}) {
  let field_values    = {}
  let fields_received = []
  let fields_missing   = []

  try {

    required.forEach(field => {
      if (!req.body[field]) {
        fields_missing.push(field)
      }
      else {
        fields_received.push(field)
        field_values = { ...field_values, [field]:req.body[field] }
      }
    })

    if (fields_missing.length > 0) {
      throw new Error(`Required field(s) missing`)
    }

    success(field_values)

  } catch (err) {

    res.json({
      error : true,
      data  : {
        message: `${err.message}`,
        fields: {
          received : fields_received,
          missing  : fields_missing
        }
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
