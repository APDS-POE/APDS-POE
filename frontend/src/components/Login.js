// src/components/Login.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  VStack,
  Text,
  useToast,
  InputGroup,
  InputLeftElement,
  Icon,
  Alert,
  AlertIcon,
  Flex
} from '@chakra-ui/react';
import { FaIdCard, FaUserShield, FaLock } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext.mjs';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);
  const toast = useToast();
  
  const [formData, setFormData] = useState({
    idNumber: '',
    accountNumber: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { idNumber, accountNumber, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://localhost:5000/api/users/login', formData);
      login(res.data.token); // Update the AuthContext
      
      const payload = JSON.parse(atob(res.data.token.split('.')[1]));
      toast({
        title: 'Login successful.',
        description: `Welcome back! Redirecting...`,
        status: 'success',
        duration: 1500,
        isClosable: true,
      });

      // Redirect based on user type
      setTimeout(() => {
        if (payload.userType === 'employee') {
          navigate('/payments');
        } else {
          navigate('/dashboard');
        }
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed.');
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'Invalid credentials. Please try again.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50">
      <Box
        w="full"
        maxW="md"
        p={8}
        bg="white"
        boxShadow="lg"
        borderRadius="lg"
      >
        <VStack spacing={6}>
          <Heading size="lg" color="cyan.600">
            Login to Your Account
          </Heading>

          {message && (
            <Alert status="error" borderRadius="md">
              <AlertIcon />
              {message}
            </Alert>
          )}

          <form onSubmit={onSubmit} style={{ width: '100%' }}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>ID Number</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaIdCard} color="gray.500" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    name="idNumber"
                    value={idNumber}
                    onChange={onChange}
                    placeholder="Enter your ID Number"
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Account Number</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaUserShield} color="gray.500" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    name="accountNumber"
                    value={accountNumber}
                    onChange={onChange}
                    placeholder="Enter your Account Number"
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaLock} color="gray.500" />
                  </InputLeftElement>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="Enter your password"
                  />
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                colorScheme="cyan"
                variant="solid"
                isFullWidth
                isLoading={loading}
              >
                Login
              </Button>
            </VStack>
          </form>

          <Text>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: 'cyan.500' }}>
              Register here
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Login;
