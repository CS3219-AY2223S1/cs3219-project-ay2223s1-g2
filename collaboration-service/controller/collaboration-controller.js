import { v4 } from "uuid";
import {
    delKey,
    getObject,
    setObject,
    lpush,
    lRangeKey,
    setRoomId,
    setString,
} from "../middleware/redis.js";
import { Server } from "socket.io";
import { io } from "../../collaboration-service/index.js";

export async function createRoom(req, res) {
    try {
        const { username } = req.body;
        const roomId = v4();
        await setRoomId(roomId);

        res.status(201).send({ roomId });
    } catch (err) {
        return res.status(500).json({
            message: "{Collaboration Service} Error when creating a room!",
        });
    }
}

export const collaborationController = function (socket) {

    socket.on("roomConnect", async ({ roomId, username }) => {
        if (!(roomId == null || username == null)) {
            console.log("Room connect triggered");
            console.log("socketid here", socket.id);
            console.log("usernam here", username);
            console.log("roomid here", roomId);
            await lpush(`${roomId}:users`, `${username}`);
            await setObject(socket.id, { roomId, username });
            const users = await lRangeKey(`${roomId}:users`, 0, -1);
            const roomName = `ROOM:${roomId}`;
            socket.join(roomName);
            io.in(roomName).emit("roomConnect", users);
        }
    });

    socket.on("codeChange", async (code) => {
        console.log(`codeChange triggered ${code}`);
        const { roomId, username } = await getObject(socket.id);
        const roomName = `ROOM:${roomId}`;
        socket.to(roomName).emit("codeChange", code);
    });

    socket.on("disconnect", async () => {
        console.log("Room disconnect triggered");
        const { roomId, username } = await getObject(socket.id);
        console.log(
            `socketid is ${socket.id},roomID is ${roomId} and userID is ${username}`
        );
        const users = await lRangeKey(`${roomId}:users`, 0, -1);
        const newUsers = users.filter((user) => username !== user);

        if (newUsers.length) {
            await delKey(`${roomId}:users`);
            await lpush(`${roomId}:users`, newUsers);
        } else {
            await delKey(`${roomId}:users`);
        }

        const roomName = `ROOM:${roomId}`;
        io.in(roomName).emit("roomConnect", newUsers);
    });
};
