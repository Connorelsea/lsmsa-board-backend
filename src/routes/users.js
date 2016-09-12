import { Users, User } from "../models.js"
import { requireFields, getFields, respondJSON, respondError } from "../api_util"
import requireAuth from "../utils/auth_middleware"

export const route = "/users"

/**
 * Noun: POST
 * Action: Create new user
 */

export const post_fields = [
  "name_first", "name_last",
  "username", "password",
]

export const post_middleware = [
  requireFields(post_fields),
  requireAuth
]

export const post_action = function(req, res) {
  User.create(getFields(req, post_fields))
    .then(user =>  respondJSON (res, user, 201))
    .catch(err => respondError (res, err))
}

/**
 * Noun: GET
 * Action: Fetch all users
 */
export const get_action = function(req, res) {
  User.findAll()
    .then(users =>  respondJSON (res, users))
    .catch(err  => respondError (res, err))
}
