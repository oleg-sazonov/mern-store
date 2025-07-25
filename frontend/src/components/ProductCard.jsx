import {
    Box,
    Heading,
    HStack,
    IconButton,
    Image,
    Text,
} from "@chakra-ui/react";
import React from "react";
import { useProductStore } from "@/store/product";
import { useColorModeValue } from "./ui/color-mode";
import { toaster } from "./ui/toaster";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";

const ProductCard = ({ product }) => {
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.700");

    const { deleteProduct } = useProductStore();

    const handleDeleteProduct = async (id) => {
        try {
            const result = await deleteProduct(id);

            if (result.success) {
                toaster.create({
                    title: "Success! 🎉",
                    description: result.message,
                    type: "success",
                    status: "success",
                    duration: 3000,
                    closable: true,
                });
            } else {
                toaster.create({
                    title: "Error",
                    description: result.message,
                    type: "error",
                    status: "error",
                    duration: 4000,
                    closable: true,
                });
            }
        } catch (error) {
            console.error("Failed to delete product:", error);
            toaster.create({
                title: "Error",
                description: "Failed to delete product. Please try again.",
                type: "error",
                status: "error",
                duration: 4000,
                closable: true,
            });
        }
    };

    return (
        <Box
            m={5}
            // maxW="sm"
            shadow="md"
            rounded="lg"
            overflow={"hidden"}
            transition={"transform 0.2s"}
            _hover={{ transform: "translateY(-5px)", shadow: "lg" }}
            bg={bg}
        >
            <Image
                h={48}
                w="full"
                objectFit="cover"
                src={product.image}
                alt={product.name}
            />
            <Box p={4}>
                <Heading as="h3" size="lg" mb={2}>
                    {product.name}
                </Heading>
                <Text color={textColor} fontSize={"md"} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton
                        aria-label="Update Product"
                        colorPalette="blue"
                        bg="blue.500"
                        // onClick={handleEdit}
                        _hover={{
                            bg: "blue.600",
                            borderColor: "blue.600",
                        }}
                    >
                        <IoMdCreate />
                    </IconButton>
                    <IconButton
                        aria-label="Delete Product"
                        colorPalette="red"
                        bg="red.500"
                        _hover={{
                            bg: "red.600",
                            borderColor: "red.600",
                        }}
                        onClick={() => handleDeleteProduct(product._id)}
                    >
                        <MdDeleteOutline />
                    </IconButton>
                </HStack>
            </Box>
        </Box>
    );
};

export default ProductCard;
