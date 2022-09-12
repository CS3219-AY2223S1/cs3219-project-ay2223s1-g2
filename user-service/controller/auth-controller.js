import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_EXPIRY, JWT_SECRET_KEY } from "../common/constants.js";
import { ormFindUserByUsername as _findUserByUsername } from "../model/user-orm.js";

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
                function (err, success) {
                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message:
                                "Authentication Internal Server Error: Please contact admin.",
                        });
                    }
                    if (success) {
                        const token = jwt.sign({ username }, JWT_SECRET_KEY, {
                            expiresIn: JWT_EXPIRY,
                        });
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
            .json({ message: "Internal Server Error during Log-in $err" });
    }
}
