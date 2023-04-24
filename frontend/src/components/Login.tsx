import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { css } from "@emotion/react";

const Login = () => {
    const navigate = useNavigate();
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            // Perform login logic here
            navigate("/");
        } catch (err) {
            setError("Invalid email or password");
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
                            Login
                        </Heading>
                        {error && (
                            <Box color="red.500" textAlign="center">
                                {error}
                            </Box>
                        )}
                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter your username"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
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
                            Login
                        </Button>
                        <Button variant="outline" onClick={() => navigate("/register")}>
                            New User? Sign Up Here
                        </Button>
                    </Stack>
                </motion.form>
            </Box>
        </Box>
    );
};

export default Login;
