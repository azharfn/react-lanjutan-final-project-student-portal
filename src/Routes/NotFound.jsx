import React, { useEffect, useState } from "react";
import { Box, Button } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";


const NotFound = () => {
    const navigate = useNavigate();

    const [slideUp, setSlideUp] = useState(false);
    useEffect(() => {
    setSlideUp(true);
    }, []);
    //handle
    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            transform={slideUp ? "translateY(0)" : "translateY(100px)"}
            opacity={slideUp ? 1 : 0}
            transition="transform 0.5s ease-in, opacity 0.5s ease-in"
        >
            {/* TODO: answer here */}
            <Box textAlign="center" marginBottom={8}>
                <p style={{ fontSize: "24px", fontWeight: "bold", marginBottom: "20px" }}>404 Page not found!</p>
                <Button onClick={handleGoBack} data-testid="back" colorScheme="teal" mt={4}>
                    Go back
                </Button>
            </Box>
        </Box>
    );
};

export default NotFound;
