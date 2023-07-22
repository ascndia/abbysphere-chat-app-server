const expressApp = require('./app')
const setupSocketServer = require('./wss')
const http = require('http')

const server = http.createServer(expressApp)
setupSocketServer(server)

server.listen(process.env.PORT,()=>{
    console.log(`server running on port ${process.env.PORT}`)
})