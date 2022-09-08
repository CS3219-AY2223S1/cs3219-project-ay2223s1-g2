import { ormInitiateMatch } from '../model/match-orm.js'

export const matchController = (socket) => {
    console.log("connected");

    socket.on("matchInit", function (data) {
        ormInitiateMatch(data);
    });
}