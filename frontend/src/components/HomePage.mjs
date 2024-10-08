// src/components/HomePage.js
import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Image,
  Flex,
  Button,
  Grid,
  Stack,
  Icon,
  useColorModeValue,
} from '@chakra-ui/react';
import { FaRocket, FaShieldAlt, FaHeadset } from 'react-icons/fa';

const HomePage = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        bgImage="url('https://media.istockphoto.com/id/1249306214/photo/financial-technology-concept-fintech-online-banking-foreign-exchange.jpg?s=612x612&w=0&k=20&c=d-BUu-GRJTviVc9QfLICgo_QcRDJjC76MeSLm8-w_DI=')"
        bgPosition="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        height={{ base: '400px', md: '600px' }}
        position="relative"
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
      >
        <Box
          position="absolute"
          top="0"
          left="0"
          width="100%"
          height="100%"
          bgGradient="linear(to-r, rgba(0,0,0,0.6), rgba(0,0,0,0.6))"
        />
        <Box position="relative" textAlign="center" px={4}>
          <Heading
            as="h1"
            size="2xl"
            mb={4}
            fontWeight="bold"
            textShadow="2px 2px 4px rgba(0,0,0,0.6)"
          >
            Your Gateway to Global Payments
          </Heading>
          <Text fontSize={{ base: 'md', md: 'xl' }} mb={6} textShadow="1px 1px 2px rgba(0,0,0,0.6)">
            Seamlessly send and receive funds across the globe with unmatched security and speed.
          </Text>
          <Button
            as={Link}
            to="/register"
            colorScheme="teal"
            size="lg"
            px={8}
            py={6}
            fontSize="lg"
            _hover={{ transform: 'scale(1.05)', boxShadow: 'lg' }}
            transition="all 0.3s ease"
          >
            Get Started
          </Button>
        </Box>
      </Box>

      {/* Features Section */}
      <Box py={16} px={4} bg={useColorModeValue('gray.50', 'gray.800')}>
        <Heading textAlign="center" mb={12} fontSize="3xl" fontWeight="bold">
          Why Choose Us
        </Heading>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          gap={8}
          maxW="1200px"
          mx="auto"
        >
          {/* Feature 1 */}
          <Flex
            direction="column"
            align="center"
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            rounded="md"
            shadow="md"
            transition="transform 0.3s ease, box-shadow 0.3s ease"
            _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
          >
            <Icon as={FaRocket} w={12} h={12} color="teal.500" mb={4} />
            <Heading as="h3" size="md" mb={2}>
              Fast Transactions
            </Heading>
            <Text textAlign="center" color={useColorModeValue('gray.600', 'gray.300')}>
              Transfer funds quickly to any country with our optimized payment processing system.
            </Text>
          </Flex>

          {/* Feature 2 */}
          <Flex
            direction="column"
            align="center"
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            rounded="md"
            shadow="md"
            transition="transform 0.3s ease, box-shadow 0.3s ease"
            _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
          >
            <Icon as={FaShieldAlt} w={12} h={12} color="teal.500" mb={4} />
            <Heading as="h3" size="md" mb={2}>
              Secure Payments
            </Heading>
            <Text textAlign="center" color={useColorModeValue('gray.600', 'gray.300')}>
              Your transactions are protected with state-of-the-art security protocols and encryption.
            </Text>
          </Flex>

          {/* Feature 3 */}
          <Flex
            direction="column"
            align="center"
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            rounded="md"
            shadow="md"
            transition="transform 0.3s ease, box-shadow 0.3s ease"
            _hover={{ transform: 'translateY(-5px)', shadow: 'lg' }}
          >
            <Icon as={FaHeadset} w={12} h={12} color="teal.500" mb={4} />
            <Heading as="h3" size="md" mb={2}>
              24/7 Support
            </Heading>
            <Text textAlign="center" color={useColorModeValue('gray.600', 'gray.300')}>
              Our dedicated support team is available around the clock to assist you with any inquiries.
            </Text>
          </Flex>
        </Grid>
      </Box>

      {/* Additional Section: Testimonials (Optional) */}
      <Box py={16} px={4}>
        <Heading textAlign="center" mb={12} fontSize="3xl" fontWeight="bold">
          What Our Users Say
        </Heading>
        <Flex
          direction={{ base: 'column', md: 'row' }}
          justify="center"
          align="center"
          maxW="1200px"
          mx="auto"
          gap={8}
        >
          {/* Testimonial 1 */}
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            rounded="md"
            shadow="md"
            maxW="400px"
          >
            <Text fontStyle="italic" mb={4}>
              "This payment portal has revolutionized the way I send money internationally. Fast, secure, and reliable!"
            </Text>
            <Text fontWeight="bold">- Jane Bane</Text>
          </Box>

          {/* Testimonial 2 */}
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            rounded="md"
            shadow="md"
            maxW="400px"
          >
            <Text fontStyle="italic" mb={4}>
              "Exceptional customer service and seamless transactions. Highly recommend to anyone needing international payments."
            </Text>
            <Text fontWeight="bold">- John Smith</Text>
          </Box>
        </Flex>
      </Box>

      

      {/* Footer Section (Optional) */}
      <Box bg={useColorModeValue('gray.100', 'gray.900')} py={4}>
        <Text textAlign="center" color={useColorModeValue('gray.600', 'gray.400')}>
          © {new Date().getFullYear()} International Payment Portal. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default HomePage;
