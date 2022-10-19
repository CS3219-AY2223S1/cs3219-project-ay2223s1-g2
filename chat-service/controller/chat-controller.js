import { io } from '../index.js';

export const chatController = function (socket) {
    console.log("connected");
    socket.on("joinRoom", (data) => {
        console.log("Room joined" + data.roomId);
        socket.join(data.roomId);
    });

    socket.on("sendMessage", async (data) => {
        console.log(data);
        io.in(data.roomId).emit("newMessage",data);
    });

}