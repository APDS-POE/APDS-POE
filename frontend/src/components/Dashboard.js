// src/components/Dashboard.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import {
    Box,
    Heading,
    Text,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
    VStack,
    HStack,
    Alert,
    AlertIcon,
    useToast,
    Icon,
    Flex,
    Spacer,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react';
import { FaDollarSign, FaMoneyCheckAlt, FaUserCircle, FaSwift } from 'react-icons/fa';
import { AuthContext } from '../context/AuthContext.mjs';

const Dashboard = () => {
    const { auth } = useContext(AuthContext);
    const toast = useToast();

    const [formData, setFormData] = useState({
        amount: '',
        currency: 'USD',
        provider: 'SWIFT',
        payeeAccount: '',
        swiftCode: '',
    });
    const [loading, setLoading] = useState(false);

    const { amount, currency, provider, payeeAccount, swiftCode } = formData;

    const onChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const token = auth.token;
        try {
            const res = await axios.post('https://localhost:5000/api/payments', formData, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            toast({
                title: 'Payment Successful',
                description: res.data.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            setFormData({
                amount: '',
                currency: 'USD',
                provider: 'SWIFT',
                payeeAccount: '',
                swiftCode: '',
            });
        } catch (error) {
            toast({
                title: 'Payment Failed',
                description: error.response?.data?.message || 'An error occurred during the payment process.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Flex minH="100vh" align="center" justify="center" bg="gray.100" p={5}>
            <Box
                bg="white"
                p={8}
                maxWidth="600px"
                borderRadius="lg"
                boxShadow="lg"
                w="100%"
            >
                <VStack spacing={6} align="stretch">
                    <Heading as="h2" size="lg" textAlign="center" color="teal.500">
                        Make a Payment
                    </Heading>

                    <Box>
                        <Text fontSize="md" color="gray.600" mb={4}>
                            Securely transfer funds internationally using our trusted platform.
                        </Text>
                    </Box>

                    <form onSubmit={onSubmit}>
                        <VStack spacing={4} align="stretch">
                            {/* Amount Field */}
                            <FormControl id="amount" isRequired>
                                <FormLabel>Amount</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                        <Icon as={FaDollarSign} color="gray.300" />
                                    </InputLeftElement>
                                    <Input
                                        type="number"
                                        name="amount"
                                        value={amount}
                                        onChange={onChange}
                                        placeholder="Enter amount"
                                        min="0"
                                        step="0.01"
                                    />
                                </InputGroup>
                            </FormControl>

                            {/* Currency Field */}
                            <FormControl id="currency" isRequired>
                                <FormLabel>Currency</FormLabel>
                                <Select
                                    name="currency"
                                    value={currency}
                                    onChange={onChange}
                                    placeholder="Select currency"
                                >
                                    <option value="USD">USD - US Dollar</option>
                                    <option value="EUR">EUR - Euro</option>
                                    <option value="ZAR">ZAR - South African Rand</option>
                                    <option value="GBP">GBP - British Pound</option>
                                    <option value="JPY">JPY - Japanese Yen</option>
                                    {/* Add more currencies as needed */}
                                </Select>
                            </FormControl>

                            {/* Provider Field */}
                            <FormControl id="provider" isRequired>
                                <FormLabel>Provider</FormLabel>
                                <HStack>
                                    <Icon as={FaSwift} color="teal.500" />
                                    <Text>{provider}</Text>
                                </HStack>
                            </FormControl>

                            {/* Payee Account Field */}
                            <FormControl id="payeeAccount" isRequired>
                                <FormLabel>Payee Account</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                        <Icon as={FaUserCircle} color="gray.300" />
                                    </InputLeftElement>
                                    <Input
                                        type="text"
                                        name="payeeAccount"
                                        value={payeeAccount}
                                        onChange={onChange}
                                        placeholder="Enter payee account number"
                                    />
                                </InputGroup>
                            </FormControl>

                            {/* SWIFT Code Field */}
                            <FormControl id="swiftCode" isRequired>
                                <FormLabel>SWIFT Code</FormLabel>
                                <InputGroup>
                                    <InputLeftElement pointerEvents="none">
                                        <Icon as={FaSwift} color="gray.300" />
                                    </InputLeftElement>
                                    <Input
                                        type="text"
                                        name="swiftCode"
                                        value={swiftCode}
                                        onChange={onChange}
                                        placeholder="Enter SWIFT/BIC code"
                                    />
                                </InputGroup>
                            </FormControl>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                colorScheme="teal"
                                isLoading={loading}
                                loadingText="Processing"
                                size="lg"
                            >
                                Pay Now
                            </Button>
                        </VStack>
                    </form>
                </VStack>
            </Box>
        </Flex>
    );

};

export default Dashboard;
