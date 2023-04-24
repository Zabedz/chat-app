import { PubSub } from 'graphql-subscriptions';
import { ChatRoom as ChatRoomType, Message as MessageType } from '../types';
import { IUser, User } from '../models/User';
import ChatRoom from '../models/ChatRoom';
import Message from '../models/Message';
import bcrypt from 'bcrypt';

const pubsub = new PubSub();
const MESSAGE_SENT = 'MESSAGE_SENT';

export const resolvers = {
  Query: {
    messages: async (
      _parent: unknown,
      { chatRoomId }: { chatRoomId: string },
    ) => {
      console.log('Getting messages for chat room: ', chatRoomId);
      return Message.find({ chatRoomId });
    },
    chatRooms: async () => {
      console.log('Getting chat rooms');
      return ChatRoom.find({});
    },
    loginUser: async (
      _parent: unknown,
      { username, password }: { username: string; password: string },
    ): Promise<IUser> => {
      console.log('Logging in with: ', username, password);
      const user: IUser | null = await User.findOne({ username });
      if (!user) {
        throw new Error('User not found');
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        throw new Error('Invalid password');
      }

      return user;
    },
  },
  Mutation: {
    createMessage: async (
      _parent: unknown,
      {
        content,
        userId,
        chatRoomId,
      }: { content: string; userId: string; chatRoomId: string },
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
      { username, password }: { username: string; password: string },
    ) => {
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new User({ username: username, password: hashedPassword });
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
