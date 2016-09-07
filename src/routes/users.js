const route = "/users"

function post(req, res) {
  res.json({ message: "post message users" })
}

function get(req, res) {
  res.json({ message: "post message get" })
}

export { route, post, get }
