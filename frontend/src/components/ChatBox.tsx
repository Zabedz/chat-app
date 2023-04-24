import React, { useEffect, useState } from 'react';
import { Box, CloseButton, Flex, IconButton, Input, Text, VStack } from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';
import { MESSAGE_SUBSCRIPTION } from './graphql/subscriptions';
import { useSubscription } from '@apollo/client';

type User = {
  id: string;
  username: string;
};

type Message = {
  user: string;
  content: string;
};

type ChatBoxProps = {
  user: User;
  onCloseChat: () => void;
};

const ChatBox: React.FC<ChatBoxProps> = ({ user, onCloseChat }) => {
  const { data, error } = useSubscription(MESSAGE_SUBSCRIPTION);
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (data) {
      setMessages((prevMessages) => [...prevMessages, data.messageAdded]);
    }
  }, [data]);

  return (
    <Box
      flexGrow={2}
      flexBasis='70%'
      minWidth='600px'
      marginLeft='1rem'
      maxHeight='100%'
      borderRadius='0.5rem'
      borderWidth='1px'
      borderColor='gray.200'
      overflowY='auto' // Enable scrolling when needed
    >
      <Flex justifyContent='space-between' alignItems='center' padding='1rem'>
        <Text fontWeight='medium' fontSize='lg'>
          Chat with {user.username}
        </Text>
        <CloseButton onClick={onCloseChat} />
      </Flex>
      <VStack
        padding='1rem'
        spacing='1rem'
        alignItems='stretch'
        flexGrow={1}
        overflowY='auto'
      >
        {messages.map((message, index) => (
          <Text key={index}>
            {message.user}: {message.content}
          </Text>
        ))}
      </VStack>
      <Flex padding='1rem' alignItems='center'>
        <Input placeholder='Type your message here...' flexGrow={1} />
        <IconButton
          aria-label='Send message'
          icon={<MdSend />}
          marginLeft='0.5rem'
          colorScheme='blue'
        />
      </Flex>
    </Box>
  );
};

export default ChatBox;
