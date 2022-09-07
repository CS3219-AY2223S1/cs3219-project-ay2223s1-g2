import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import { Server } from "socket.io";
import { sequelize } from './model/repository.js';
import { matcher } from './model/match-init.js'

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

const matchInit = matcher(sequelize);

sequelize.sync().then(console.log('Database synced'));

io.on("connection", (socket) => {
    console.log("connected");

    socket.on("matchInit", function(data) {
        matchInit.create({ username: "test" });
        console.log("pending match");
    });
});

httpServer.listen(8001);
