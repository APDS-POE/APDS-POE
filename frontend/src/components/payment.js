// src/components/Payments.js
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
    TableContainer,
    Button,
    Text,
    useToast,
    Icon,
    Flex,
    Badge,
    VStack,
    Spinner,
    Tooltip
} from '@chakra-ui/react';
import { FaCheck, FaTimes, FaExclamationTriangle, FaMoneyCheckAlt } from 'react-icons/fa';

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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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
                headers: {
                    Authorization: `Bearer ${token}`,
                },
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

    return (
        <Flex direction="column" align="center" minH="100vh" bg="gray.100" p={6}>
            <VStack spacing={6} w="100%" maxW="1200px">
                <Heading size="lg" color="teal.600">
                    Payments Portal
                </Heading>

                {message && (
                    <Text color="red.500">{message}</Text>
                )}

                {loading ? (
                    <Spinner size="xl" color="teal.500" />
                ) : (
                    <TableContainer w="100%" bg="white" borderRadius="lg" boxShadow="md">
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
                                    <Tr key={payment._id}>
                                        <Td>
                                            <Tooltip label={payment.customer.accountNumber}>
                                                <Text fontWeight="bold">{payment.customer.fullName}</Text>
                                            </Tooltip>
                                        </Td>
                                        <Td>
                                            <Flex align="center">
                                                <Icon as={FaMoneyCheckAlt} color="green.500" mr={2} />
                                                {payment.amount}
                                            </Flex>
                                        </Td>
                                        <Td>{payment.currency}</Td>
                                        <Td>{payment.provider}</Td>
                                        <Td>{payment.payeeAccount}</Td>
                                        <Td>{payment.swiftCode}</Td>
                                        <Td>
                                            {payment.status === 'pending' ? (
                                                <Badge colorScheme="yellow">Pending</Badge>
                                            ) : payment.status === 'verified' ? (
                                                <Badge colorScheme="green">Verified</Badge>
                                            ) : (
                                                <Badge colorScheme="red">Failed</Badge>
                                            )}
                                        </Td>
                                        <Td>
                                            {payment.status === 'pending' ? (
                                                <Button
                                                    size="sm"
                                                    colorScheme="teal"
                                                    onClick={() => verifyPayment(payment._id)}
                                                    leftIcon={<FaCheck />}
                                                >
                                                    Verify
                                                </Button>
                                            ) : (
                                                <Icon as={FaTimes} color="red.500" />
                                            )}
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                )}
            </VStack>
        </Flex>
    );
};

export default Payments;
