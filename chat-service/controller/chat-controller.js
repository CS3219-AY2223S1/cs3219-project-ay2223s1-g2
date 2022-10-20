import { io } from '../index.js';
import {addMessage, getChatLog} from '../model/repository.js'

export const chatController = function (socket) {
    socket.on("joinRoom", async (data) => {
        console.log("Room joined" + data.roomId);
        socket.join(data.roomId);
        var log = await getChatLog({ roomId : data.roomId});
        console.log(log);
        socket.emit("updateChatLog", log);
    });

    socket.on("sendMessage", async (data) => {
        console.log(data);
        var message = await addMessage({roomId: data.roomId, username: data.username, message:data.message});
        message.save(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log("message added" + data);
            }
            });
        io.in(data.roomId).emit("newMessage",data);
    });

}