import React, { useEffect, useState } from 'react';
import { Flex } from '@chakra-ui/react';
import UserList from './UserList';
import ChatBox from './ChatBox';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';

type User = {
  id: string;
  username: string;
};

const Home: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleUserSelection = (user: User) => {
    setSelectedUser(user);
  };

  const handleCloseChat = () => {
    setSelectedUser(null);
  };

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <Flex
      minHeight='100vh'
      padding='2rem'
      flexDirection='row'
      justifyContent='flex-start'
      alignItems='flex-start'
    >
      <UserList loggedInUserId={user?.id} onUserSelect={handleUserSelection} />
      {selectedUser && (
        <ChatBox user={selectedUser} onCloseChat={handleCloseChat} />
      )}
    </Flex>
  );
};

export default Home;
