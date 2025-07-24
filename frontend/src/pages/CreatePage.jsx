import { useColorModeValue } from "@/components/ui/color-mode";
import {
    Box,
    Button,
    Container,
    Heading,
    Input,
    VStack,
} from "@chakra-ui/react";
import { useState } from "react";

const CreatePage = () => {
    const [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: "",
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddProduct = (product) => {
        // Logic to add the product, e.g., API call
        console.log("Product added:", product);
        // Reset form
        setNewProduct({ name: "", price: "", image: "" });
    };
    return (
        <Container
            maxW={"2xl"}
            px={{ base: 4, md: 6, lg: 8 }}
            py={{ base: 6, md: 8 }}
        >
            <VStack spacing={8}>
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>
                <Box
                    w={"full"}
                    bg={useColorModeValue("gray.100", "gray.700")}
                    p={6}
                    rounded={"lg"}
                    shadow={"md"}
                >
                    <VStack spacing={4}>
                        <Input
                            placeholder="Product Name"
                            name="name"
                            value={newProduct.name}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder="Product Price"
                            name="price"
                            type="number"
                            value={newProduct.price}
                            onChange={handleInputChange}
                        />
                        <Input
                            placeholder="Product Image URL"
                            name="image"
                            value={newProduct.image}
                            onChange={handleInputChange}
                        />
                        <Button
                            w={"full"}
                            colorPalette="gray"
                            onClick={() => {
                                handleAddProduct(newProduct);
                            }}
                        >
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;
