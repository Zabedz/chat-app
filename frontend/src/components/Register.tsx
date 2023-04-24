import { useContext, useState } from 'react';
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
import { useMutation } from '@apollo/client';
import { CREATE_USER } from './graphql/mutations';
import { AuthContext } from '../context/auth';

const Register = () => {
  // Context hooks
  const navigate = useNavigate();
  const toast = useToast();

  // States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Auth
  const { setUser } = useContext(AuthContext);
  const [createUser] = useMutation(CREATE_USER, {
    onCompleted: (data) => {
      setUser(data.createUser); // Set the user in the context after successful registration
    },
    onError: (err) => {
      setError('Error creating user');
    },
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUser({
        variables: {
          username,
          password,
        },
      });

      toast({
        title: 'Registration successful',
        description: 'Account registered successfully',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate('/'); // Navigate to the Home page
      }, 3000);
    } catch (err) {
      setError('Error creating user');
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
              Register
            </Heading>
            {error && (
              <Box color='red.500' textAlign='center'>
                {error}
              </Box>
            )}
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type='text'
                placeholder='Enter new username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type='password'
                placeholder='Enter new password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button variant='primary' type='submit'>
              Register
            </Button>
            <Button variant='outline' onClick={() => navigate('/login')}>
              Have an account? Login here
            </Button>
          </Stack>
        </motion.form>
      </Box>
    </Box>
  );
};

export default Register;
