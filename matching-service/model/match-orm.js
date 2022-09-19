import { sequelize } from './repository.js';
import { initiateMatch } from './match-init.js'

export async function ormInitiateMatch(id, data) {
    try {
        const matchInit = initiateMatch(sequelize);
        matchInit.create({ sessionId: id, username: data.username, difficulty: data.difficulty });
        const users = await matchInit.findAll();
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        console.log(err);
        return { err };
    }
}

export async function ormMatchTimeout(socket) {
    const matchInit = initiateMatch(sequelize);
    matchInit.destroy({
        where: {
            sessionId: socket.id
        }
    }).then(numberRows => {
        if (numberRows == 1) {
            socket.emit('matchFailure', 'failure');
        }
    })
}

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
        socket.to(users[0].sessionId).emit('matchSuccess', 'sucess');
        socket.emit('matchSuccess', 'sucess');
        return false;
    } else {
        return true;
    }
}