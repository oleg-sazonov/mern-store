import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useProductStore } from "@/store/product";
import { useEffect } from "react";
import ProductCard from "@/components/ProductCard";

const HomePage = () => {
    const { products, fetchProducts } = useProductStore();

    useEffect(() => {
        fetchProducts();
    }, [fetchProducts]);
    console.log("products", products);
    // if (loading) {
    //     return <Container maxW="6xl" py={12}></Container>;
    // }

    // if (error) {
    //     return <Container maxW="6xl" py={12}></Container>;
    // }

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

                <SimpleGrid
                    columns={{ base: 1, md: 2, lg: 3 }}
                    spacing={10}
                    w="full"
                >
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </SimpleGrid>

                <Text
                    fontSize="xl"
                    textAlign="center"
                    fontWeight="bold"
                    color="gray.500"
                >
                    No products found 😢
                    <Link to="/create">
                        <Text
                            fontSize="xl"
                            as={"span"}
                            _hover={{ textDecoration: "underline" }}
                            textAlign="center"
                            fontWeight="bold"
                            color="cyan.600"
                        >
                            Go back to create a product
                        </Text>
                    </Link>
                </Text>
            </VStack>
        </Container>
    );
};

export default HomePage;
