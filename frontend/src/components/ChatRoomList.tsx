import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_CHAT_ROOMS } from './graphql/queries';

const ChatRoomList: React.FC = () => {
  const { loading, error, data } = useQuery(GET_CHAT_ROOMS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <ul>
      {data.chatRooms.map(({ id, name }: { id: string; name: string }) => (
        <li key={id}>{name}</li>
      ))}
    </ul>
  );
};

export default ChatRoomList;
