import { ormInitiateMatch } from '../model/match-orm.js'
import { ormMatchUser } from '../model/match-user.js'

export const matchController = function (socket) {
    console.log("connected");

    socket.on("matchInit", async (data, callback) => {
        if (await ormMatchUser(socket, data.difficulty)) {
            ormInitiateMatch(socket.id, data);
        }
    });
}