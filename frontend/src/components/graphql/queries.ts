import { gql } from '@apollo/client';

export const GET_CHAT_ROOMS = gql`
  query GetChatRooms {
    chatRooms {
      id
      name
    }
  }
`;
