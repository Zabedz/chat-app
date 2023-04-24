import React from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';
import { useQuery } from '@apollo/client';
import { GET_USERS } from './graphql/queries';

type User = {
  id: string;
  username: string;
};

type UserListProps = {
  loggedInUserId?: string;
  onUserSelect: (user: User) => void;
};

const UserList: React.FC<UserListProps> = ({ loggedInUserId, onUserSelect }) => {
  const { loading, error, data } = useQuery(GET_USERS);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  const users = data.users.filter((user: User) => user.id !== loggedInUserId);

  return (
    <VStack
      minWidth="300px" // Set the minimum width for the user list
      maxHeight="100%"
      borderRadius="0.5rem"
      borderWidth="1px"
      borderColor="gray.200"
      overflowY="auto" // Enable scrolling when needed
    >
      {users.map((user: User) => (
        <Box
          key={user.id}
          onClick={() => onUserSelect(user)}
          padding="1rem"
          borderBottom="1px solid"
          borderColor="gray.200"
          width="100%"
          _hover={{ backgroundColor: 'gray.100', cursor: 'pointer' }}
        >
          <Text fontWeight="medium">{user.username}</Text>
        </Box>
      ))}
    </VStack>
  );
};

export default UserList;
