import { PubSub } from 'graphql-subscriptions';
import { ChatRoom as ChatRoomType, Message as MessageType } from '../types';
import User from '../models/User';
import ChatRoom from '../models/ChatRoom';
import Message from '../models/Message';
import bcrypt from 'bcrypt';

const pubsub = new PubSub();
const MESSAGE_SENT = 'MESSAGE_SENT';

export const resolvers = {
  Query: {
    messages: async (
      _parent: unknown,
      { chatRoomId }: { chatRoomId: string }
    ) => {
      return Message.find({ chatRoomId });
    },
    chatRooms: async () => {
      return ChatRoom.find({});
    },
  },
  Mutation: {
    createMessage: async (
      _parent: unknown,
      {
        content,
        userId,
        chatRoomId,
      }: { content: string; userId: string; chatRoomId: string }
    ) => {
      const message = new Message({ content, userId, chatRoomId });
      await message.save();
      await pubsub.publish(MESSAGE_SENT, { messageSent: message });
      return message;
    },
    createChatRoom: async (_parent: unknown, { name }: { name: string }) => {
      const chatRoom = new ChatRoom({ name });
      await chatRoom.save();
      return chatRoom;
    },
    createUser: async (
      _parent: unknown,
      { username, password }: { username: string; password: string }
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username, password: hashedPassword });
      await user.save();
      return user;
    },
  },
  Subscription: {
    messageSent: {
      subscribe: (_parent: unknown, { chatRoomId }: { chatRoomId: string }) =>
        pubsub.asyncIterator([MESSAGE_SENT]),
    },
  },
  Message: {
    user: async (message: MessageType) => {
      return User.findById(message.userId);
    },
    chatRoom: async (message: MessageType) => {
      return ChatRoom.findById(message.chatRoomId);
    },
  },
  ChatRoom: {
    messages: async (chatRoom: ChatRoomType) => {
      return Message.find({ chatRoomId: chatRoom.id });
    },
  },
};
