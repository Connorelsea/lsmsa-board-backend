import { Users, User } from "../models.js"
import { requireFields, getFields, respondJSON, respondError } from "../api_util"
import jwt from "jsonwebtoken"

export const route = "/authenticate"

/**
 * Noun: POST
 * Action: Check if a user is authenticated
 */

export const post_fields = [ "username", "password" ]

export const post_middleware = [ requireFields(post_fields) ]

export const post_action = function(req, res) {
  User.findOne({ username: req.body.username })
    .then(user_object => {

      if (user_object.attributes.password === req.body.password) {

        const token = jwt.sign(user_object, "app.get('token-secret')", {
          expiresIn: "7 days",
        })

        respondJSON(res, {
          message: "Token",
          token: token,
        })

      } else {
        respondError(res, new Error("err???"))
        //throw err, wrong password
      }

    })
    .catch(err => respondError (res, err))
}
