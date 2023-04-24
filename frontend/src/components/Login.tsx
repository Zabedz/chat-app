import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  useColorModeValue,
  useToast,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { css } from '@emotion/react';
import { useAuth } from '../context/auth';
import { useLazyQuery } from '@apollo/client';
import { LOGIN_USER } from './graphql/queries';

const Login = () => {
  // Hooks
  const navigate = useNavigate();
  const toast = useToast();
  // Auth
  const { setUser } = useAuth();

  const [loginUser, { error }] = useLazyQuery(LOGIN_USER, {
    onCompleted: (data) => {
      setUser(data.loginUser); // Set the user in the context

      toast({
        title: 'Login successful',
        description: 'Logged in successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/'); // Navigate to the Home page

    },
    onError: (err) => {
      setErrorMessage('Invalid username or password');
    },
  });
  // Component states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await loginUser({
        variables: {
          username,
          password,
        },
      });
    } catch (err) {
      // Handle error
    }
  };

  return (
    <Box
      backgroundColor={useColorModeValue('gray.100', 'gray.900')}
      h='100vh'
      display='flex'
      alignItems='center'
      justifyContent='center'
    >
      <Box
        css={css`
          width: 400px;
          background-color: ${useColorModeValue('white', 'gray.700')};
          padding: 2rem;
          border-radius: 0.5rem;
          box-shadow: 0 0 1rem rgba(0, 0, 0, 0.1);
        `}
      >
        <motion.form
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          onSubmit={handleSubmit}
        >
          <Stack spacing={4}>
            <Heading textAlign='center' size='lg'>
              Login
            </Heading>
            {errorMessage && (
              <Box color='red.500' textAlign='center'>
                {errorMessage}
              </Box>
            )}
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type='username'
                placeholder='Enter your username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                placeholder='Enter your password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button variant='primary' type='submit'>
              Login
            </Button>
            <Button variant='outline' onClick={() => navigate('/register')}>
              New User? Sign Up Here
            </Button>
          </Stack>
        </motion.form>
      </Box>
    </Box>
  );
};

export default Login;
