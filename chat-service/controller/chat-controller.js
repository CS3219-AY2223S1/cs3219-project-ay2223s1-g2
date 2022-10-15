import { io } from '../index.js';

export const chatController = function (socket) {
    console.log("connected");
    socket.join("room");
    
    socket.on("sendMessage", async (data) => {
        io.in("room").emit("newMessage",data);
    });

}