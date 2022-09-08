import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import { sequelize } from './model/repository.js';
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
const io = new Server(httpServer, {});

//https://stackoverflow.com/questions/4647348/send-message-to-specific-client-with-socket-io-and-node-js
io.on("connection", matchController);

httpServer.listen(8001);
