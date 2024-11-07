import React from 'react';
import { Link } from 'react-router-dom';
import {
  Box,
  Heading,
  Text,
  Button,
  Grid,
  Flex,
  Icon,
  useColorModeValue,
  Stack,
  Avatar,
} from '@chakra-ui/react';
import { FaRocket, FaShieldAlt, FaHeadset } from 'react-icons/fa';
import ParticlesComponent from './particles.js'; // Adjust path if necessary

const HomePage = () => {
  return (
    <Box position="relative">
      {/* Hero Section */}
      <Box
        position="relative"
        height={{ base: '400px', md: '600px' }}
        display="flex"
        alignItems="center"
        justifyContent="center"
        color="white"
      >
        {/* Particles Background */}
        <Box position="absolute" top="0" left="0" width="100%" height="100%" zIndex="-1">
          <ParticlesComponent id="tsparticles" /> {/* Apply particles only within this box */}
        </Box>

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

      {/* Testimonials Section */}
      <Box py={16} px={4} bg={useColorModeValue('gray.100', 'gray.900')}>
        <Heading textAlign="center" mb={12} fontSize="3xl" fontWeight="bold">
          What Our Clients Say
        </Heading>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(3, 1fr)' }}
          gap={8}
          maxW="1200px"
          mx="auto"
        >
          {/* Testimonial 1 */}
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            rounded="md"
            shadow="md"
            textAlign="center"
          >
            <Avatar name="Jane Doe" src="https://bit.ly/dan-abramov" mb={4} size="xl" />
            <Text fontSize="lg" fontWeight="bold" color={useColorModeValue('gray.800', 'gray.200')}>
              Jane Doe
            </Text>
            <Text color={useColorModeValue('gray.600', 'gray.300')} mb={4}>
              "This platform revolutionized the way I send and receive money. Fast, reliable, and secure. I couldn't ask for more!"
            </Text>
          </Box>

          {/* Testimonial 2 */}
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            rounded="md"
            shadow="md"
            textAlign="center"
          >
            <Avatar name="John Smith" src="https://bit.ly/dan-abramov" mb={4} size="xl" />
            <Text fontSize="lg" fontWeight="bold" color={useColorModeValue('gray.800', 'gray.200')}>
              John Smith
            </Text>
            <Text color={useColorModeValue('gray.600', 'gray.300')} mb={4}>
              "Their customer service is outstanding! Every time I had a question, they were there to help immediately."
            </Text>
          </Box>

          {/* Testimonial 3 */}
          <Box
            bg={useColorModeValue('white', 'gray.700')}
            p={6}
            rounded="md"
            shadow="md"
            textAlign="center"
          >
            <Avatar name="Alice Johnson" src="https://bit.ly/dan-abramov" mb={4} size="xl" />
            <Text fontSize="lg" fontWeight="bold" color={useColorModeValue('gray.800', 'gray.200')}>
              Alice Johnson
            </Text>
            <Text color={useColorModeValue('gray.600', 'gray.300')} mb={4}>
              "I’ve used many services, but this one is by far the best. Quick transfers and amazing customer care."
            </Text>
          </Box>
        </Grid>
      </Box>

      {/* Footer Section */}
      <Box bg={useColorModeValue('gray.100', 'gray.900')} py={4}>
        <Text textAlign="center" color={useColorModeValue('gray.600', 'gray.400')}>
          © {new Date().getFullYear()} International Payment Portal. All rights reserved.
        </Text>
      </Box>
    </Box>
  );
};

export default HomePage;
