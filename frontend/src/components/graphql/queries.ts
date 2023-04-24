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

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      username
    }
  }
`;

export { GET_CHAT_ROOMS, LOGIN_USER, GET_USERS };
