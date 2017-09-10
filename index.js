'use strict'

const Hapi = require('hapi')

// Create a server with a host and port
const server = new Hapi.Server()
server.connection({
  port: process.env.PORT || 5000,
  routes: {security: true}
})

// Add the route
server.route({
  method: 'GET',
  path: '/myip',
  handler: function (req, res) {
    let ipAddr = req.headers['x-forwarded-for']
    if (ipAddr) {
      let list = ipAddr.split(',')
      ipAddr = list[list.length - 1]
    } else {
      ipAddr = req.connection.remoteAddress
    }
    return res({
      ip: ipAddr
    }).code(200)
  }
})

// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
