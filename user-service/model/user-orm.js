import { createUser, checkIfUserExists, findUser } from "./repository.js";

//need to separate orm functions from repository to decouple business logic from persistence
export async function ormCreateUser(username, password) {
    try {
        const newUser = await createUser({ username, password });
        newUser.save();
        return true;
    } catch (err) {
        console.log("ERROR: Could not create new user");
        return { err };
    }
}

export const ormFindUserByUsername = async (username) => {
    try {
        const desiredUser = await findUser({ username });
        return desiredUser;
    } catch (err) {
        console.log("<USER-ORM> ERROR: Could not find user in database ");
        return { err };
    }
};

export const ormUserExists = async (username) => {
    try {
        const userFound = await checkIfUserExists({ username });
        return userFound;
    } catch (err) {
        console.log("<USER-ORM> ERROR: User Existence Check Failure");
        return { err };
    }
};
