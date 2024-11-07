import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Box,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Text,
    useToast,
    Icon,
    Flex,
    Badge,
    VStack,
    Spinner,
    Tooltip,
    HStack,
    Center,
    SlideFade,
} from '@chakra-ui/react';
import { FaCheck, FaTimes, FaMoneyCheckAlt } from 'react-icons/fa';

const Payments = () => {
    const [payments, setPayments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState('');
    const toast = useToast();

    useEffect(() => {
        fetchPayments();
    }, []);

    const fetchPayments = async () => {
        setLoading(true);
        const token = localStorage.getItem('token');
        try {
            const res = await axios.get('https://localhost:5000/api/payments', {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPayments(res.data);
        } catch (error) {
            setMessage(error.response?.data?.message || 'Failed to fetch payments.');
            toast({
                title: 'Error',
                description: message,
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setLoading(false);
        }
    };

    const verifyPayment = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.put(`https://localhost:5000/api/payments/${id}/verify`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast({
                title: 'Payment Verified',
                description: res.data.message,
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            fetchPayments();
        } catch (error) {
            toast({
                title: 'Verification Failed',
                description: error.response?.data?.message || 'Verification failed.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    const declinePayment = async (id) => {
        const token = localStorage.getItem('token');
        try {
            const res = await axios.put(`https://localhost:5000/api/payments/${id}/decline`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            toast({
                title: 'Payment Declined',
                description: res.data.message,
                status: 'warning',
                duration: 5000,
                isClosable: true,
            });
            fetchPayments();
        } catch (error) {
            toast({
                title: 'Decline Failed',
                description: error.response?.data?.message || 'Decline failed.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex direction="column" align="center" minH="100vh" bgGradient="linear(to-br, teal.100, blue.100)" p={8}>
            <SlideFade in offsetY={20}>
                <VStack spacing={8} w="full" maxW="1100px">
                    <Heading size="lg" color="teal.800" fontWeight="bold" textAlign="center">
                        Payments Dashboard
                    </Heading>

                    {message && (
                        <Text color="red.500" fontSize="lg" fontWeight="semibold" textAlign="center">
                            {message}
                        </Text>
                    )}

                    {loading ? (
                        <Center w="full">
                            <Spinner size="xl" color="teal.500" thickness="4px" />
                        </Center>
                    ) : (
                        <Box w="full" p={4} bg="white" borderRadius="md" boxShadow="2xl">
                            <Table variant="simple">
                                <Thead bg="teal.500">
                                    <Tr>
                                        <Th color="white">Customer</Th>
                                        <Th color="white">Amount</Th>
                                        <Th color="white">Currency</Th>
                                        <Th color="white">Provider</Th>
                                        <Th color="white">Payee Account</Th>
                                        <Th color="white">SWIFT Code</Th>
                                        <Th color="white">Status</Th>
                                        <Th color="white">Action</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {payments.map((payment) => (
                                        <Tr key={payment._id} _hover={{ bg: 'teal.50' }}>
                                            <Td>
                                                <Tooltip label={`Account No: ${payment.customer.accountNumber}`}>
                                                    <Text fontWeight="semibold" color="teal.700">
                                                        {payment.customer.fullName}
                                                    </Text>
                                                </Tooltip>
                                            </Td>
                                            <Td>
                                                <HStack spacing={2}>
                                                    <Icon as={FaMoneyCheckAlt} color="green.400" />
                                                    <Text fontWeight="bold">${payment.amount}</Text>
                                                </HStack>
                                            </Td>
                                            <Td fontWeight="medium" color="gray.600">{payment.currency}</Td>
                                            <Td fontWeight="medium" color="gray.600">{payment.provider}</Td>
                                            <Td fontWeight="medium" color="gray.600">{payment.payeeAccount}</Td>
                                            <Td fontWeight="medium" color="gray.600">{payment.swiftCode}</Td>
                                            <Td>
                                                <Badge
                                                    colorScheme={
                                                        payment.status === 'verified' ? 'green' :
                                                        payment.status === 'failed' ? 'red' :
                                                        payment.status === 'declined' ? 'red' : 'yellow'
                                                    }
                                                    variant="subtle"
                                                    fontSize="sm"
                                                    px={2} py={1}
                                                >
                                                    {payment.status.charAt(0).toUpperCase() + payment.status.slice(1)}
                                                </Badge>
                                            </Td>
                                            <Td>
                                                {payment.status === 'pending' ? (
                                                    <HStack spacing={2}>
                                                        <Button
                                                            size="sm"
                                                            colorScheme="teal"
                                                            onClick={() => verifyPayment(payment._id)}
                                                            leftIcon={<FaCheck />}
                                                            variant="outline"
                                                            _hover={{ bg: 'teal.100' }}
                                                        >
                                                            Verify
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            colorScheme="red"
                                                            onClick={() => declinePayment(payment._id)}
                                                            leftIcon={<FaTimes />}
                                                            variant="outline"
                                                            _hover={{ bg: 'red.100' }}
                                                        >
                                                            Decline
                                                        </Button>
                                                    </HStack>
                                                ) : (
                                                    <Icon as={FaTimes} color="red.400" boxSize={5} />
                                                )}
                                            </Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    )}
                </VStack>
            </SlideFade>
        </Flex>
    );
};

export default Payments;
