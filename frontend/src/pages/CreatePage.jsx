import { useColorModeValue } from "@/components/ui/color-mode";
import { useProductStore } from "@/store/product";
import { toaster } from "@/components/ui/toaster";
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
    const { createProduct } = useProductStore();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewProduct((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleAddProduct = async (product) => {
        // Show loading toast
        const loadingToast = toaster.create({
            title: "Creating Product...",
            type: "loading",
            status: "loading",
            duration: null, // Don't auto-dismiss
        });

        const { success, message } = await createProduct(product);

        // Close loading toast
        toaster.dismiss(loadingToast);

        if (success) {
            // Success toast
            toaster.create({
                title: "Success!",
                description: message,
                type: "success",
                status: "success",
                duration: 3000,
                closable: true,
            });
            // Reset form
            setNewProduct({ name: "", price: "", image: "" });
        } else {
            // Error toast
            toaster.create({
                title: "Oops! Something went wrong.",
                description: message,
                type: "error",
                status: "error",
                duration: 4000,
                closable: true,
            });
        }
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
