import React from 'react';
import { Box, VStack, Text } from '@chakra-ui/react';

type User = {
  id: number;
  username: string;
};

type UserListProps = {
  users: User[];
  onUserSelect: (user: User) => void;
};

const UserList: React.FC<UserListProps> = ({ users, onUserSelect }) => {
  return (
    <VStack
      minWidth="300px" // Set the minimum width for the user list
      maxHeight="100%"
      borderRadius="0.5rem"
      borderWidth="1px"
      borderColor="gray.200"
      overflowY="auto" // Enable scrolling when needed
    >
      {users.map((user) => (
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
