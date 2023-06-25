import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
    return (
        <Box className="footer" p={4} color="teal.500">
            <Text className="studentName" fontSize="sm" fontWeight="bold">
                Azhar Fauzan Nugroho
            </Text>
            <Text className="studentId" fontSize="sm">
                FE4249027
            </Text>
            <Text className="copyright" fontSize="xs">
                &copy; {new Date().getFullYear()} Student Portal. All rights reserved.
            </Text>
        </Box>
    );
};

export default Footer;
