import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    username: String!
  }

  type Message {
    id: ID!
    content: String!
    user: User!
    chatRoom: ChatRoom!
  }

  type ChatRoom {
    id: ID!
    name: String!
    messages: [Message!]
  }

  type Query {
    messages(chatRoomId: ID!): [Message!]
    chatRooms: [ChatRoom!]
    loginUser(username: String!, password: String!): User!
  }

  type Mutation {
    createMessage(content: String!, userId: ID!, chatRoomId: ID!): Message!
    createChatRoom(name: String!): ChatRoom!
    createUser(username: String!, password: String!): User!
  }

  type Subscription {
    messageSent(chatRoomId: ID!): Message!
  }
`;
