import UserModel from "./user-model.js";
import "dotenv/config";

//Set up mongoose connection
import mongoose from "mongoose";

let mongoDB =
    process.env.ENV == "PROD"
        ? 'mongodb://' + process.env.USER_MONGO_IP + ':' + process.env.USER_MONGO_PORT
        : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export async function createUser(params) {
    return new UserModel(params);
}

export async function deleteUser(params) {
    return UserModel.deleteOne(params);
}

export const findUser = async (params) => {
    return UserModel.findOne(params);
};

export const checkIfUserExists = async (params) => {
    return UserModel.exists(params);
};

export const updateUser = async (id, params) => {
    return UserModel.findByIdAndUpdate(id, params);
};
