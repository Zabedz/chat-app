import { Document, model, Schema } from 'mongoose';

interface IMessage extends Document {
  content: string;
  userId: Schema.Types.ObjectId;
  chatRoomId: Schema.Types.ObjectId;
}

const messageSchema = new Schema<IMessage>(
  {
    content: {
      type: String,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    chatRoomId: {
      type: Schema.Types.ObjectId,
      ref: 'ChatRoom',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// noinspection TypeScriptValidateTypes
const Message = model<IMessage>('Message', messageSchema);
export default Message;
