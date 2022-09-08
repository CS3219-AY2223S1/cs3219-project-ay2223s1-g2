import { sequelize } from './repository.js';
import { initiateMatch } from './match-init.js'

export async function ormInitiateMatch(data) {
    try {
        const matchInit = initiateMatch(sequelize);
        matchInit.create({ username: data.username });
        const users = await matchInit.findAll();
        console.log(users.every(user => user instanceof matchInit)); // true
        console.log("All users:", JSON.stringify(users, null, 2));
        return true;
    } catch (err) {
        console.log('ERROR: Could not create new user');
        console.log(err);
        return { err };
    }
}