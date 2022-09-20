import Sequelize from 'sequelize';
import { initiateMatch } from './match-init.js'

export const sequelize = new Sequelize('sqlite::memory:');

initiateMatch(sequelize);

sequelize.sync().then(console.log('Database synced'));