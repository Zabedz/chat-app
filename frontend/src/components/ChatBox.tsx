import React from 'react';
import {
  Box,
  Text,
  Input,
  IconButton,
  VStack,
  CloseButton,
  Flex,
} from '@chakra-ui/react';
import { MdSend } from 'react-icons/md';

type User = {
  id: number;
  username: string;
};

type ChatBoxProps = {
  user: User;
  onCloseChat: () => void;
};

const ChatBox: React.FC<ChatBoxProps> = ({ user, onCloseChat }) => {
  return (
    <Box
      flexGrow={2}
      flexBasis="70%"
      minWidth="600px"
      marginLeft="1rem"
      maxHeight="100%"
      borderRadius="0.5rem"
      borderWidth="1px"
      borderColor="gray.200"
      overflowY="auto" // Enable scrolling when needed
    >
      <Flex justifyContent="space-between" alignItems="center" padding="1rem">
        <Text fontWeight="medium" fontSize="lg">
          Chat with {user.username}
        </Text>
        <CloseButton onClick={onCloseChat} />
      </Flex>
      <VStack
        padding="1rem"
        spacing="1rem"
        alignItems="stretch"
        flexGrow={1}
        overflowY="auto"
      >
        {/* The chat messages will be rendered here */}
      </VStack>
      <Flex padding="1rem" alignItems="center">
        <Input placeholder="Type your message here..." flexGrow={1} />
        <IconButton
          aria-label="Send message"
          icon={<MdSend />}
          marginLeft="0.5rem"
          colorScheme="blue"
        />
      </Flex>
    </Box>
  );
};

export default ChatBox;
