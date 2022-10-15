import { createServer } from 'http';
import { Server } from "socket.io";

const httpServer = createServer(app)

export const io = new Server(httpServer, { 
    /* options */ 
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"]
    }
});