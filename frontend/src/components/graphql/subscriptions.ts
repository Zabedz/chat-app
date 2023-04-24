import gql from 'graphql-tag';

const MESSAGE_SUBSCRIPTION = gql`
  subscription OnMessageAdded {
    messageAdded {
      id
      user
      content
    }
  }
`;

export { MESSAGE_SUBSCRIPTION };
