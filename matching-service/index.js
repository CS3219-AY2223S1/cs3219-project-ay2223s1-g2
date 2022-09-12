import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from 'socket.io';

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

app.get('/', (req, res) => {
    res.send('Hello World from matching-service');
});

const httpServer = createServer(app)

const io = new Server(httpServer, { 
    /* options */ 
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

const handleFindMatch = () => {
    console.log("Finding Match")
    let roomId = Math.floor(Math.random() * 10000)
    if (Math.random() < 0.8) {
        console.log(roomId)
        return roomId
    }
    console.log('-1')
    return -1
}

io.on("connection", (socket) => {
  console.log("Welcome to a socket io connection!")
  socket.emit('message', "Hello, welcome!")
  console.log('A user connected')
  socket.on('match', async (message) => {
    console.log(message)
    let roomId = await new Promise((resolve) => setTimeout(() => resolve(handleFindMatch()), 3000))
    console.log(roomId)
    if (roomId == -1) {
        socket.emit('matchFail')
    } else {
        socket.emit('matchSuccess', `${roomId}`)
    }
  })
});


httpServer.listen(8001);
