import { ormInitiateMatch } from '../model/match-orm.js'
import { ormMatchUser } from '../model/match-orm.js'
import { ormMatchTimeout } from '../model/match-orm.js'

export const matchController = function (socket) {
    console.log("connected");

    socket.on("matchInit", async (data, callback) => {
        if (await ormMatchUser(socket, data.difficulty)) {
            ormInitiateMatch(socket.id, data);
            setTimeout(function () {
                ormMatchTimeout(socket);
            }, 30000)
        }
    });
}