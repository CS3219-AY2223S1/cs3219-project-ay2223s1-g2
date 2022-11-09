import { ormInitiateMatch, ormMatchUser, ormMatchTimeout, ormDisconnectUser } from '../model/match-orm.js'

export const matchController = function (socket) {
    console.log("connected" + socket.id);

    socket.on("matchInit", async (data) => {
        console.log(data);
        if (await ormMatchUser(socket, data.difficulty)) {
            ormInitiateMatch(socket.id, data);
            setTimeout(function () {
                ormMatchTimeout(socket);
            }, 30000)
        }
    });

    socket.on("disconnect", async () => {
        ormDisconnectUser(socket);
    });
}