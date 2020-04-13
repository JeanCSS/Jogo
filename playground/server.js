import express from "express"
import http from "http"
import createGame from "./public/game.js"
import socketio from "socket.io"

const app = express()
const server = http.createServer(app)
const sockets = socketio(server)

app.use(express.static('public'))

const game = createGame()
game.addPlayer({playerId: "player1", playerX: 1, playerY: 1})
game.addFruit({fruitId: "fruit1", fruitX: 3, fruitY: 5})
game.addFruit({fruitId: "fruit2", fruitX: 4, fruitY: 2})
console.log(game.state)

sockets.on('connection', (socket) => {
  const playerId = socket.id
  socket.emit('setup', game.state)
  console.log(`> Player connected on server whith id: ${playerId}`)
})

server.listen(3000, () => {
  console.log('> Server listing on port: 3000')
}) 