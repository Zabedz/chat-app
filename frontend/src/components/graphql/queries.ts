import { gql } from '@apollo/client';

const GET_CHAT_ROOMS = gql`
  query GetChatRooms {
    chatRooms {
      id
      name
    }
  }
`;

const LOGIN_USER = gql`
  query LoginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

export { GET_CHAT_ROOMS, LOGIN_USER };
