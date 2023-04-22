// src/resolvers/resolvers.ts
import { PubSub } from 'graphql-subscriptions';
import { ChatRoom, Message, User } from '../types';

const pubsub = new PubSub();
const MESSAGE_SENT = 'MESSAGE_SENT';

// Mock data
const users: User[] = [];
const chatRooms: ChatRoom[] = [];
const messages: Message[] = [];

export const resolvers = {
  Query: {
    messages: (_parent: unknown, { chatRoomId }: { chatRoomId: string }) =>
      messages.filter((m) => m.chatRoomId === chatRoomId),
    chatRooms: () => chatRooms,
  },
  Mutation: {
    createMessage: (
      _parent: unknown,
      {
        content,
        userId,
        chatRoomId,
      }: { content: string; userId: string; chatRoomId: string }
    ) => {
      const message: Message = {
        id: (messages.length + 1).toString(),
        content,
        userId,
        chatRoomId,
      };
      messages.push(message);
      pubsub.publish(MESSAGE_SENT, { messageSent: message });
      return message;
    },
    createChatRoom: (_parent: unknown, { name }: { name: string }) => {
      const chatRoom: ChatRoom = {
        id: (chatRooms.length + 1).toString(),
        name,
      };
      chatRooms.push(chatRoom);
      return chatRoom;
    },
    createUser: (_parent: unknown, { username }: { username: string }) => {
      const user: User = { id: (users.length + 1).toString(), username };
      users.push(user);
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
    user: (message: Message) => users.find((u) => u.id === message.userId),
  },
  ChatRoom: {
    messages: (chatRoom: ChatRoom) =>
      messages.filter((m) => m.chatRoomId === chatRoom.id),
  },
};
