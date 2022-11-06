import axios from 'axios'
import { io } from '../index.js'
import { sequelize } from './repository.js'
import { initiateMatch } from './match-init.js'
import { initiateRoom } from './room-init.js'
import "dotenv/config";
import { v4 } from "uuid";

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
            socket.emit('matchFailure', {message: 'failed to find match'});
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

        //Generate unqiue roomId
        const room = initiateRoom(sequelize)
        //Set smaller socket id as sessionId1
        let sessionId1, sessionId2
        if (users[0].sessionId < socket.id) {
            sessionId1 = users[0].sessionId
            sessionId2 = socket.id
        } else {
            sessionId1 = socket.id
            sessionId2 = users[0].sessionId
        }

        const createdRoom = await room.create({sessionId1: sessionId1, sessionId2: sessionId2})
        
        const roomId = v4();
        
        //Fetch Random question
        let question = null
        await axios.get('http://' + process.env.QN_SERVER_URL + ':' + process.env.QN_SERVER_PORT + '/api/randomquestion', {
            params: {
                difficulty: difficulty
            }
        })
        .then(function (response) {
        console.log(response.data);
        question = response.data
        })
        .catch(function (error) {
        console.log(error);
        })
        .finally(function () {
        // always executed
        });
        
        // Make both sockets join room
        io.of('/').sockets.get(users[0].sessionId).join(roomId);
        io.of('/').sockets.get(socket.id).join(roomId);
        
        //Emit data to clients in the room
        io.to(roomId).emit('matchSuccess', roomId, question);
        
        return false;
    } else {
        return true;
    }
}

export async function ormDisconnectUser(socket) {
    const matchInit = initiateMatch(sequelize);
    matchInit.destroy({
        where: {
            sessionId: socket.id
        }
    })
}
