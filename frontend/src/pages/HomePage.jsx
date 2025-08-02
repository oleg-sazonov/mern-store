import {
    Container,
    SimpleGrid,
    Text,
    VStack,
    Spinner,
    Box,
    Button,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "@/store/product";
import { useEffect } from "react";
import ProductCard from "@/components/ProductCard/ProductCard";

const HomePage = () => {
    const { products, loading, error, fetchProducts, clearError } =
        useProductStore();

    useEffect(() => {
        fetchProducts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []); // Remove fetchProducts from dependencies to prevent re-renders
    // console.log("Products:", products);

    // Loading state
    if (loading && products.length === 0) {
        return (
            <Container maxW="6xl" py={12}>
                <VStack spacing={4}>
                    <Spinner size="xl" color="blue.500" thickness="4px" />
                    <Text fontSize="lg" color="gray.600">
                        Loading products...
                    </Text>
                </VStack>
            </Container>
        );
    }

    // Error state
    if (error) {
        return (
            <Container maxW="6xl" py={12}>
                <VStack spacing={4}>
                    <Text color="red.500" fontSize="lg" textAlign="center">
                        ❌ Error: {error}
                    </Text>
                    <Button
                        colorPalette="blue"
                        onClick={() => {
                            clearError();
                            fetchProducts();
                        }}
                    >
                        Try Again
                    </Button>
                </VStack>
            </Container>
        );
    }

    return (
        <Container maxW="6xl" py={12}>
            <VStack spacing={8}>
                <Text
                    fontSize={{ base: "2xl", sm: "3xl" }}
                    textTransform={"uppercase"}
                    textAlign={{ base: "center", sm: "left" }}
                    bgGradient={"to-r"}
                    gradientFrom={"blue.400"}
                    gradientTo={"purple.500"}
                    bgClip={"text"}
                    fontWeight={"bold"}
                >
                    Current Products 🚀
                </Text>

                {/* Products Grid */}
                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    gap={{ base: 6, md: 8, lg: 10 }}
                    w="full"
                    px={{ base: 4, md: 0 }}
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>

                {/* Empty state */}
                {products.length === 0 && !loading && !error && (
                    <Box textAlign="center" py={10}>
                        <Text
                            fontSize="2xl"
                            fontWeight="bold"
                            color="gray.500"
                            mb={4}
                        >
                            No products found 😢
                        </Text>
                        <Text fontSize="lg" color="gray.400" mb={6}>
                            Start by creating your first product!
                        </Text>
                        <Link to="/create">
                            <Button
                                colorPalette="blue"
                                size="lg"
                                _hover={{ transform: "translateY(-2px)" }}
                                transition="all 0.2s ease"
                            >
                                Create Your First Product
                            </Button>
                        </Link>
                    </Box>
                )}

                {/* Loading indicator for additional operations */}
                {loading && products.length > 0 && (
                    <Box
                        position="fixed"
                        top={4}
                        right={4}
                        bg="blue.500"
                        color="white"
                        px={4}
                        py={2}
                        rounded="md"
                        shadow="lg"
                        zIndex={1000}
                    >
                        <Spinner size="sm" mr={2} />
                        Processing...
                    </Box>
                )}
            </VStack>
        </Container>
    );
};

export default HomePage;
