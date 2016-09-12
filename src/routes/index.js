
function setupRoute(api_router, object) {
  console.log(`[Route Setup] -> [Build] Route: "${object.route}"`)

  const route = api_router.route(object.route)

  if ( object.post_action ) route.post(object.post_middleware || [], object.post_action)
  if ( object.get_action  )  route.get(object.get_middleware  || [], object.get_action)
}

import * as users from "./users"
import * as authenticate from "./authenticate"

export default function run(api_router) {

  console.log("[Route Setup] Init")

  setupRoute(api_router, authenticate)
  setupRoute(api_router, users)
}
