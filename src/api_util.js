/**
 * Ensures that supplied field keys are found in the
 * request body of an incoming API call. If all keys
 * are found, the success function is called. If all
 * keys are not found, a detailed error is returned.
 *
 * @param {object}  objects  - The request and response objects
 * @param {array}   required - An array of strings representing
 *                             required request body keys
 * @param {function} success - Callback when all keys are found
 */
function requireFields(required) {

  return function(req, res, next) {

    let fields_received = []
    let fields_missing  = []

    try {

      required.forEach(field => {
        if (!req.body[field]) fields_missing.push(field)
        else fields_received.push(field)
      })

      if (fields_missing.length > 0) {
        throw new Error(`Required field(s) missing`)
      } else {
        next()
      }

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

}

function getFields(req, fields) {
  let values = { }
  fields.forEach(field => values = { ...values, [field]: req.body[field] } )
  return values
}

/**
 * A helper function that takes formats a typical error
 * API response, effectively reducing repeated code.
 *
 * @param {object} res - The express response object
 * @param {object} err - A standard JavaScript error object
 */
function respondError(res, err) {
  res.status(500).json({
    error : true,
    data  : { message: err.message } 
  })
}

/**
 * A helper function that responds typical JSON-formatted data
 * as an API response, effectively reducing repeated code. If
 * the data provided can be automatically converted to JSON via
 * a `.toJSON()` function on that object, that function will be
 * called before it is sent in the response.
 *
 * @param {object} res     - The express response object
 * @param {object} data    - Data (formatted as JSON) to be returned
 * @param {object} options - Options altering the intended execution
 */
function respondJSON(res, data, status) {

  let response = status ? res.status(status) : res

  response.json({
    error : false,
    data  : (data.toJSON) ? data.toJSON() : data
  })
}

export {
  requireFields,
  getFields,
  respondJSON,
  respondError,
}
