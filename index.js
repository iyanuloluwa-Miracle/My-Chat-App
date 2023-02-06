const express = require('express')
const path = require('path')
const http = require('http')
const socketio = require('socket.io')


const app = express()
const server = http.createServer(app)
const io = socketio(server)



//set static folder
app.use(express.static(path.join(__dirname, 'public')))


//Run when client connects
io.on('connection', socket =>{
    

    //Welcome current Users
    socket.emit('message', 'Welcome to ChatPal')


    //Broadcast when a user connects
    socket.broadcast.emit('message', 'A User has joined the chat')

    //Runs when client disconnrcts
    socket.on('disconnect', () => {
        io.emit('message', 'A user has left the chat')
    })
})


const PORT = 3000 || process.env.PORT

server.listen(PORT, () => console.log(`Server running on port ${PORT}`))