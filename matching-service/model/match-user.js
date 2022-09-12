import { sequelize } from './repository.js';
import { initiateMatch } from './match-init.js'

export async function ormMatchUser(socket, difficulty) {
    const matchInit = initiateMatch(sequelize);
    const users = await matchInit.findAll({
        limit: 1,
        where: {
            difficulty: difficulty
        },
        order: [['createdAt', 'ASC']]
    });
    if (users.length != 0) {
        matchInit.destroy({
            where: {
                sessionId: users[0].sessionId,
                difficulty: users[0].difficulty,
                createdAt: users[0].createdAt
            }
        })
        socket.to("room").emit('matchSuccess', 'sucess');
        socket.emit('matchSuccess', 'sucess');
        return false;
    } else {
        return true;
    }

}