import bcrypt from "bcrypt";
import { signAccessToken } from "../helper/jwt-auth.js";
import { blacklistToken } from "../helper/redis.js";
import {
    ormFindUserByUsername as _findUserByUsername,
    ormDeleteUser as _deleteUser,
} from "../model/user-orm.js";

export async function logUserIn(req, res) {
    try {
        const { username, password } = req.body;

        if (!(username && password)) {
            return res
                .status(400)
                .json({ message: "Username and/or Password are missing!" });
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
                        const token = await signAccessToken(username);
                        console.log(token);
                        return res.status(200).json({
                            userId: currUser._id,
                            success: true,
                            token,
                            message: "Authentication Success: Log-in Completed",
                        });
                    } else {
                        return res.status(401).json({
                            success: false,
                            message:
                                "Authentication Error: Wrong log-in credentials",
                        });
                    }
                }
            );
        } else {
            return res.status(401).json({
                success: false,
                message: "Authentication Error: Wrong log-in credentials",
            });
        }
    } catch (err) {
        console.log(err);
        return res
            .status(500)
            .json({ message: `Internal Server Error during Log-in ${err}` });
    }
}

export const logoutUser = async (req, res) => {
    const isBlacklisted = await blacklistToken(req.headers["authorization"]);
    console.log(isBlacklisted);
    if (isBlacklisted) {
        return res
            .status(200)
            .json({ messsage: "User logged out w/ JWT invalidated" });
    } else {
        return res
            .status(500)
            .json({ message: "Failed to blacklist JWT" });
    }
};
