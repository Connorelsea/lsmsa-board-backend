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
function requireFields({
  objects: { req, res },
  required,
  success
}) {
  let field_values    = {}
  let fields_received = []
  let fields_missing  = []

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
function respondJSON(res, data, { status = undefined }) {

  // TODO: idk how to handle passing in a status to this elegantly and optionally

  let response = status ? res.status(status) : res

  response.json({
    error : false,
    data  : (data.toJSON) ? data.toJSON() : data
  })
}

export {
  requireFields,
  respondJSON,
  respondError,
}
