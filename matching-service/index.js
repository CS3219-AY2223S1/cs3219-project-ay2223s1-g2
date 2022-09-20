import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import { matchController } from './controller/match-controller.js'

const app = express();
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors()) // config cors so that front-end can use
app.options('*', cors())

const router = express.Router()

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

io.on("connection", matchController);

httpServer.listen(8001);
