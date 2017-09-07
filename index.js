'use strict'

const Hapi = require('hapi')

// Create a server with a host and port
const server = new Hapi.Server()
server.connection({
  port: process.env.PORT || 5000
})

// Add the route
server.route({
  method: 'GET',
  path: '/hello',
  handler: function (req, res) {
    const ipAddress = {
      ip: req.info.remoteAddress
    }
    return res(ipAddress)
  }
})

// Start the server
server.start((err) => {
  if (err) {
    throw err
  }
  console.log('Server running at:', server.info.uri)
})
