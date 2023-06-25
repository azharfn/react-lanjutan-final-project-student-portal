import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Heading, Text, } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Footer from "../components/Footer";

const Home = () => {
    return (
        <Box
            bg="gray.800"
            color="white"
            minHeight="100vh"
            display="flex"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
        >
            <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Box mb={8}>
                    <img
                        src="https://cdn-images-1.medium.com/max/262/1*lIJJ-Ntcxmd7uI5BORe0SQ@2x.png"
                        alt="Logo"
                        width={150}
                        height={150}
                    />
                </Box>
            </motion.div>
            <Box mb={8}>
                <Heading as="h1" fontSize="4xl" textAlign="center" mb={4}>
                    Studi Independen Kampus Merdeka
                </Heading>
                <Text fontSize="xl" textAlign="center" fontWeight="bold">
                    By: Ruang guru
                </Text>
            </Box>
            <Box mb={8}>
                <Heading as="h2" fontSize="3xl" textAlign="center">
                    Welcome to Student Portal
                </Heading>
            </Box>
            <Button
                as={Link}
                to="/student"
                data-testid="student-btn"
                colorScheme="teal"
                size="lg"
            >
                All Student
            </Button>
            <Footer />
        </Box>
    );
};

export default Home;
