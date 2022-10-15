import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import { chatController } from './controller/chat-controller.js'
const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

app.get('/', (req, res) => {
    res.send('Hello World from collaboration-service port 8002');
});

const httpServer = createServer(app)

export const io = new Server(httpServer, { 
    /* options */ 
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});

io.on("connection", chatController);

httpServer.listen(8002);