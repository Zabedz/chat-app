import { Schema, model, Document } from "mongoose";

interface IUser extends Document {
    username: string;
}

const userSchema = new Schema<IUser>(
    {
        username: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

const User = model<IUser>("User", userSchema);
export default User;
