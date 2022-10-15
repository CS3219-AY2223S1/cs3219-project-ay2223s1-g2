import mongoose from "mongoose";
var Schema = mongoose.Schema;
let CollabMessageSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    message: {
        type: String,
        required: true,
    },
});

export default mongoose.model("CollabMessage", CollabMessageSchema);

