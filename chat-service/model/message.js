import mongoose from "mongoose";
var Schema = mongoose.Schema;
let ChatMessageSchema = new Schema({
    roomId: {
        type: String,
        required: true,
    },    
    username: {
        type: String,
        required: true,
    },
    message: {
        type: String,
        required: true,
    },    
    sent_date: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("ChatMessage", ChatMessageSchema);

