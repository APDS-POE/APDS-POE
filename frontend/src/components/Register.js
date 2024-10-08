// src/components/Register.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  VStack,
  useToast,
  Icon,
  InputGroup,
  InputLeftElement,
  Flex,
  Alert,
  AlertIcon,
} from '@chakra-ui/react';
import { FaUser, FaIdCard, FaKey, FaUserShield } from 'react-icons/fa';

const Register = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    fullName: '',
    idNumber: '',
    accountNumber: '',
    password: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const { fullName, idNumber, accountNumber, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post('https://localhost:5000/api/users/register', formData);
      setMessage(res.data.message);
      toast({
        title: 'Account created.',
        description: 'Your account has been successfully created!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Registration failed.');
      toast({
        title: 'Error',
        description: error.response?.data?.message || 'An error occurred during registration.',
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
        bg="white"
        p={6}
        borderRadius="lg"
        boxShadow="lg"
      >
        <VStack spacing={6}>
          <Heading size="lg" color="teal.600">
            Create an Account
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
                <FormLabel>Full Name</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaUser} color="gray.500" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    name="fullName"
                    value={fullName}
                    onChange={onChange}
                    placeholder="John Doe"
                  />
                </InputGroup>
              </FormControl>

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
                    placeholder="12345678"
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
                    placeholder="ACC12345"
                  />
                </InputGroup>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <Icon as={FaKey} color="gray.500" />
                  </InputLeftElement>
                  <Input
                    type="password"
                    name="password"
                    value={password}
                    onChange={onChange}
                    placeholder="********"
                  />
                </InputGroup>
              </FormControl>

              <Button
                type="submit"
                colorScheme="teal"
                isFullWidth
                isLoading={loading}
              >
                Register
              </Button>
            </VStack>
          </form>

          <Text>
            Already have an account?{' '}
            <Link to="/login" style={{ color: 'teal.500' }}>
              Login
            </Link>
          </Text>
        </VStack>
      </Box>
    </Flex>
  );
};

export default Register;
