import ChatMessageSchema from "./message.js";
import "dotenv/config";

//Set up mongoose connection
import mongoose from "mongoose";

let mongoDB =
    process.env.ENV == "PROD"
        ? 'mongodb://' + process.env.CHAT_MONGO_IP + ':' + process.env.CHAT_MONGO_PORT
        : process.env.DB_LOCAL_URI;

mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });

let db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

export async function addMessage(params) {
    return new ChatMessageSchema(params);
}

export async function getChatLog(params) {
    return ChatMessageSchema.find(params).sort({sent_date: 'ASC'});
}
