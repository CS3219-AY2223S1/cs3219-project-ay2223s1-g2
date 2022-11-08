import express from "express";
import cors from "cors";
import { createServer } from "http";
import { Server } from "socket.io";
import "dotenv/config";
import { collaborationController } from "./controller/collaboration-controller.js";

const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // config cors so that front-end can use
app.options("*", cors());

app.get("/api", (req, res) => {
    res.send("Hello World from collaboration-service");
});
// app.get("/api/createRoom", createRoom);

const httpServer = createServer(app);

export const io = new Server(httpServer, {
    /* options */
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});


io.on("connection", collaborationController);
httpServer.listen(8002);
// app.listen(8002, () => console.log("user-service listening on port 8002"));
