import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { Link, Flex, Box, Heading, Text } from '@chakra-ui/react';

function Navbar() {
    return (
        <Flex as="nav" 
        bg="white.800" 
        p={4} alignItems="center" 
        justifyContent="space-between"
        boxShadow="0px 2px 4px rgba(0, 0, 0, 0.3)" // Menambahkan outline dengan boxShadow
        >
        <Box>
            <Heading as="h1" fontSize="xl" data-testid="home-page">
                <Link
                    as={RouterLink}
                    to="/"
                    color="teal.500"
                    _hover={{ textDecoration: 'none' }}
                >
                    Student Portal
                </Link>
            </Heading>
        </Box>
        <Flex as="ul" listStyleType="none" ml={4}>
            <Text as="li" mr={4}>
                <Link
                    as={RouterLink}
                    to="/student"
                    data-testid="student-page"
                    _hover={{ textDecoration: 'underline' }} // Menambahkan garis bawah saat hover
                >
                    All Student
                </Link>
            </Text>
            <Text as="li">
                <Link
                    as={RouterLink}
                    to="/add"
                    data-testid="add-page"
                    _hover={{ textDecoration: 'underline' }} // Menambahkan garis bawah saat hover
                >
                    Add Student
                </Link>
            </Text>
        </Flex>
    </Flex>
    );
}

export default Navbar;
