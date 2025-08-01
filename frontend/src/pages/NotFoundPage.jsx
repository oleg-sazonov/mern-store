import {
    Box,
    Button,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "../components/ui/color-mode";
import { Link, useLocation } from "react-router-dom"; // add useNavigate
// import { useEffect, useState } from "react";
import { FaHome, FaPlus, FaArrowLeft } from "react-icons/fa";
import { MdError } from "react-icons/md";

const NotFoundPage = () => {
    // const navigate = useNavigate();
    const location = useLocation();
    // const [countdown, setCountdown] = useState(10);

    // Color mode values to match your theme
    const bg = useColorModeValue("white", "gray.700");
    const textColor = useColorModeValue("gray.600", "gray.200");
    const accentColor = useColorModeValue("blue.500", "blue.400");
    const borderColor = useColorModeValue("gray.200", "gray.600");

    // Auto-redirect countdown
    // useEffect(() => {
    //     const timer = setInterval(() => {
    //         setCountdown((prev) => {
    //             if (prev <= 1) {
    //                 navigate("/");
    //                 return 0;
    //             }
    //             return prev - 1;
    //         });
    //     }, 1000);

    //     return () => clearInterval(timer);
    // }, [navigate]);

    // const handleGoBack = () => {
    //     if (window.history.length > 1) {
    //         navigate(-1);
    //     } else {
    //         navigate("/");
    //     }
    // };

    const isApiRoute = location.pathname.startsWith("/api");

    return (
        <Container maxW="4xl" py={20}>
            <VStack spacing={8} textAlign="center">
                {/* Error Icon */}
                <Box
                    p={6}
                    rounded="full"
                    bg={useColorModeValue("red.50", "red.900")}
                    border="2px solid"
                    borderColor={useColorModeValue("red.200", "red.600")}
                >
                    <MdError
                        size="80px"
                        color={useColorModeValue("#E53E3E", "#FC8181")}
                    />
                </Box>

                {/* Main Error Message */}
                <VStack spacing={4}>
                    <Heading
                        size="3xl"
                        bgGradient="to-r"
                        gradientFrom="red.400"
                        gradientTo="red.600"
                        bgClip="text"
                        fontWeight="bold"
                    >
                        404
                    </Heading>

                    <Heading size="xl" color={textColor}>
                        {isApiRoute
                            ? "API Endpoint Not Found"
                            : "Page Not Found"}
                    </Heading>

                    <Text fontSize="lg" color={textColor} maxW="md">
                        {isApiRoute
                            ? `The API endpoint "${location.pathname}" doesn't exist on our server.`
                            : `Sorry, the page "${location.pathname}" you're looking for doesn't exist.`}
                    </Text>
                </VStack>

                {/* Helpful Information */}
                <Box
                    p={6}
                    bg={bg}
                    rounded="lg"
                    border="1px solid"
                    borderColor={borderColor}
                    shadow="md"
                    w="full"
                    maxW="lg"
                >
                    <VStack spacing={4}>
                        <Text fontWeight="semibold" color={accentColor}>
                            {isApiRoute
                                ? "Available API Endpoints:"
                                : "What you can do:"}
                        </Text>

                        {isApiRoute ? (
                            <VStack spacing={2} fontSize="sm" color={textColor}>
                                <Text>
                                    • GET /api/products - Get all products
                                </Text>
                                <Text>
                                    • POST /api/products - Create new product
                                </Text>
                                <Text>
                                    • PATCH /api/products/:id - Update product
                                </Text>
                                <Text>
                                    • DELETE /api/products/:id - Delete product
                                </Text>
                                <Text>• GET /health - Health check</Text>
                            </VStack>
                        ) : (
                            <VStack spacing={2} fontSize="sm" color={textColor}>
                                <Text>• Check the URL for typos</Text>
                                <Text>• Go back to the homepage</Text>
                                <Text>• Create a new product</Text>
                                <Text>• Browse existing products</Text>
                            </VStack>
                        )}
                    </VStack>
                </Box>

                {/* Action Buttons */}
                <VStack spacing={4} w="full" maxW="md">
                    <HStack spacing={4} w="full">
                        <Button
                            as={Link}
                            to="/"
                            leftIcon={<FaHome />}
                            colorPalette="blue"
                            bg="blue.500"
                            color="white"
                            _hover={{ bg: "blue.600" }}
                            flex={1}
                            size="lg"
                        >
                            Go Home
                        </Button>

                        <Button
                            as={Link}
                            to="/create"
                            leftIcon={<FaPlus />}
                            colorPalette="green"
                            bg="green.500"
                            color="white"
                            _hover={{ bg: "green.600" }}
                            flex={1}
                            size="lg"
                        >
                            Create Product
                        </Button>
                    </HStack>
                    {/* 
                    <Button
                        onClick={handleGoBack}
                        leftIcon={<FaArrowLeft />}
                        variant="outline"
                        borderColor={borderColor}
                        color={textColor}
                        _hover={{
                            bg: useColorModeValue("gray.50", "gray.600"),
                        }}
                        w="full"
                        size="lg"
                    >
                        Go Back
                    </Button> */}
                </VStack>

                {/* Auto-redirect Notice */}
                {/* <Box
                    p={4}
                    bg={useColorModeValue("blue.50", "blue.900")}
                    rounded="md"
                    border="1px solid"
                    borderColor={useColorModeValue("blue.200", "blue.600")}
                >
                    <Text
                        fontSize="sm"
                        color={useColorModeValue("blue.700", "blue.200")}
                    >
                        🔄 Redirecting to homepage in {countdown} seconds...
                    </Text>
                </Box> */}
            </VStack>
        </Container>
    );
};

export default NotFoundPage;
