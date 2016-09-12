import { requireFields, getFields, respondJSON, respondError } from "../api_util"
import jwt from "jsonwebtoken"

export default function requireAuth(req, res, next) {

  const token = req.headers["x-access-token"]

  if (token) {

    jwt.verify(token, "app.get('token-secret')", function(err, decoded) {

      if (err) {
        return respondError(res, err)
      } else {
        req.user = decoded
        next()
      }

    })

  } else {
    return respondError(res, new Error("Attempted Authentication Failed: No token (x-access-token) provided"))
  }

}
