import {
    ormCreateUser as _createUser,
    ormUserExists as _checkUserExists,
} from "../model/user-orm.js";
import bcrypt from 'bcrypt';
import { BRCYPT_COST } from "../common/constants.js";

export async function createUser(req, res) {
    try {
        const { username, password } = req.body;
        const userExists = await _checkUserExists(username);

        if (userExists) {
            return res.status(400).json({
                message: "(Duplicate Username): Kindly pick another username.",
            });
        } 
        if (username && password) {
            const encryptedPassword = await bcrypt.hash(password, BRCYPT_COST);
            const resp = await _createUser(username, encryptedPassword);
            console.log(resp);
            if (resp.err) {
                return res
                    .status(400)
                    .json({ message: "Could not create a new user!" });
            } else {
                console.log(`Created new user ${username} successfully!`);
                return res.status(201).json({
                    message: `Created new user ${username} successfully!`,
                });
            }
        } else {
            return res
                .status(400)
                .json({ message: "Username and/or Password are missing!" });
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Database failure when creating new user!" });
    }
}
