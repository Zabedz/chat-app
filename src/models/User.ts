import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  username: string;
  password: string; // Add this line for the password field
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// noinspection TypeScriptValidateTypes
const User = model<IUser>('User', userSchema);
export default User;
