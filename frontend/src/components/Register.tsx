import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, FormControl, FormLabel, Heading, Input, Stack, useColorModeValue } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { css } from "@emotion/react";
import { useMutation } from "@apollo/client";
import gql from "graphql-tag";

const CREATE_USER = gql`
  mutation CreateUser($username: String!, $password: String!) {
    createUser(username: $username, password: $password) {
      id
      username
    }
  }
`;

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [createUser] = useMutation(CREATE_USER);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createUser({
        variables: {
          username,
          password
        }
      });
      navigate("/");
    } catch (err) {
      setError("Error creating user");
    }
  };

  return (
    <Box
      backgroundColor={useColorModeValue("gray.100", "gray.900")}
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <Box
        css={css`
          width: 400px;
          background-color: ${useColorModeValue("white", "gray.700")};
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
            <Heading textAlign="center" size="lg">
              Register
            </Heading>
            {error && (
              <Box color="red.500" textAlign="center">
                {error}
              </Box>
            )}
            <FormControl isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </FormControl>
            <FormControl isRequired>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormControl>
            <Button variant="primary" type="submit">
              Register
            </Button>
            <Button variant="outline" onClick={() => navigate("/login")}>
              Have an account? Login here
            </Button>
          </Stack>
        </motion.form>
      </Box>
    </Box>
  );
};

export default Register;
