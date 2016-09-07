
function setupRoute(api_router, object) {
  console.log(`[Route Setup] -> [Build] Route: "${object.route}"`)

  const route = api_router.route(object.route)

  if ( object.post ) route.post( object.post )
  if ( object.get  )  route.get( object.get  )
}

import * as users from "./users"

export default function run(api_router) {

  console.log("[Route Setup] Init")

  setupRoute(api_router, users)
}
