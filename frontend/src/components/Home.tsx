import React, { useState } from 'react';
import { Flex } from '@chakra-ui/react';
import UserList from './UserList';
import ChatBox from './ChatBox';

type User = {
  id: number;
  username: string;
};

const users: User[] = [
  // Dummy data for now
  { id: 1, username: 'User 1' },
  { id: 2, username: 'User 2' },
  { id: 3, username: 'User 3' },
];

const Home: React.FC = () => {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelection = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseChat = () => {
    setSelectedUser(null);
  };

  return (
    <Flex
      minHeight="100vh"
      padding="2rem"
      flexDirection="row"
      justifyContent="flex-start"
      alignItems="flex-start"
    >
      <UserList users={users} onUserSelect={handleUserSelection} />
      {selectedUser && (
        <ChatBox user={selectedUser} onCloseChat={handleCloseChat} />
      )}
    </Flex>
  );
};

export default Home;
