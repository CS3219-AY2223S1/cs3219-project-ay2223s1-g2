import {
    delKey,
    getObject,
    setObject,
    lpush,
    lRangeKey,
    setRoomId,
    setString,
    getString,
} from "../middleware/redis.js";
import { io } from "../index.js";

export const collaborationController = function (socket) {
    socket.on("roomConnect", async ({ roomId, username }) => {
        if (!(roomId == null || username == null)) {
            console.log("Room connect triggered");
            console.log("socketid here", socket.id);
            console.log("usernam here", username);
            console.log("roomid here", roomId);
            await setRoomId(roomId);
            await lpush(`${roomId}:users`, `${username}`);
            await setObject(socket.id, { roomId, username });
            const users = await lRangeKey(`${roomId}:users`, 0, -1);
            const roomName = `ROOM:${roomId}`;
            socket.join(roomName);
            const  code  = (await getString(`${roomId}:code`)) || {};
            io.in(roomName).emit("roomConnect", {users, "code": code});
        }
    });

    socket.on("codeChange", async (code) => {
        console.log(`codeChange triggered ${code}`);
        const { roomId, username } = (await getObject(socket.id)) || {};
        const roomName = `ROOM:${roomId}`;
        await setString(`${roomId}:code`, code);
        socket.to(roomName).emit("codeChange", code);
    });

    socket.on("disconnect", async () => {
        console.log("Room disconnect triggered");
        const { roomId, username } = (await getObject(socket.id)) || {};
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
