import {
    ormCreateUser as _createUser,
    ormUserExists as _checkUserExists,
    ormFindUserByUsername as _findUserByUsername,
    ormDeleteUser as _deleteUser,
    ormUpdateUser as _updateUser,
} from "../model/user-orm.js";
import bcrypt from "bcrypt";
import { BRCYPT_COST } from "../common/constants.js";
import { blacklistToken } from "../helper/redis.js";

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

export async function deleteUser(req, res) {
    try {
        const { username, password } = req.body;

        if (!(username && password)) {
            return res.status(400).json({
                message: "Username and/or Password are missing!",
            });
        }

        const currUser = await _findUserByUsername(username);
        if (currUser) {
            bcrypt.compare(
                password,
                currUser.password,
                async function (err, success) {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message:
                                "Authentication Internal Server Error: Please contact admin.",
                        });
                    }
                    if (success) {
                        await blacklistToken(req.headers["authorization"]);
                        await _deleteUser(currUser.username);
                        return res.status(200).json({
                            userId: currUser._id,
                            success: true,
                            message: "User deleted",
                        });
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: "Authentication Error: Wrong credentials",
                        });
                    }
                }
            );
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal server error when deleting user!" });
    }
}

export async function updateUserPassword(req, res) {
    try {
        const { username, password, newPassword } = req.body;

        if (!(username && password && newPassword)) {
            return res.status(400).json({
                message:
                    "Username and/or Password and/or newPassword are missing!",
            });
        }

        const currUser = await _findUserByUsername(username);
        if (currUser) {
            bcrypt.compare(
                password,
                currUser.password,
                async function (err, success) {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message:
                                "Authentication Internal Server Error: Please contact admin.",
                        });
                    }
                    if (success) {
                        const encryptedPassword = await bcrypt.hash(
                            newPassword,
                            BRCYPT_COST
                        );
                        await _updateUser(currUser._id, {
                            password: encryptedPassword,
                        });
                        return res.status(200).json({
                            userId: currUser._id,
                            success: true,
                            message: "User Updated",
                        });
                    } else {
                        return res.status(401).json({
                            success: false,
                            message: "Authentication Error: Wrong credentials",
                        });
                    }
                }
            );
        }
    } catch (err) {
        return res
            .status(500)
            .json({ message: "Internal server error when update user password!" });
    }
}
