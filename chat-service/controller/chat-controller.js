import { io } from '../index.js';

export const chatController = function (socket) {
    let roomId;

    socket.on("joinRoom", (data) => {
        socket.join(data.roomId);
        roomId = data.roomId;
    });

    socket.on("sendMessage", async (data) => {
        io.in(roomId).emit("newMessage",data);
    });

}