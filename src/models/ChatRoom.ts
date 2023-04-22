import { Schema, model, Document } from "mongoose";

interface IChatRoom extends Document {
    name: string;
}

const chatRoomSchema = new Schema<IChatRoom>(
    {
        name: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const ChatRoom = model<IChatRoom>("ChatRoom", chatRoomSchema);
export default ChatRoom;
