import Sequelize from 'sequelize';
import { initiateMatch } from './match-init.js'
import { initiateRoom } from './room-init.js';

export const sequelize = new Sequelize('sqlite::memory:');

initiateMatch(sequelize);
initiateRoom(sequelize);

sequelize.sync().then(console.log('Database synced'));