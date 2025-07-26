import {
    Box,
    Heading,
    HStack,
    IconButton,
    Image,
    Text,
    Button,
    Input,
    VStack,
} from "@chakra-ui/react";
import { Dialog } from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "@/store/product";
import { toaster } from "../ui/toaster";
import { MdDeleteOutline } from "react-icons/md";
import { IoMdCreate } from "react-icons/io";
import { useProductCardStyles } from "./ProductCard.styles";
import { useFormValidation } from "@/hooks/useFormValidation";
import { sanitizeProductData } from "@/utils/validation";
import ValidatedInput from "../ui/ValidatedInput";

const ProductCard = ({ product }) => {
    const styles = useProductCardStyles();
    const { colors } = styles;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { deleteProduct, updateProduct, loading } = useProductStore();

    const {
        formData,
        errors,
        validateForm,
        handleInputChange,
        resetForm,
        clearErrors,
    } = useFormValidation({
        name: product.name,
        price: product.price,
        image: product.image,
    });

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

    const handleEditProduct = async () => {
        // Validate form before submission
        const isValid = await validateForm();
        if (!isValid) {
            return;
        }

        try {
            const sanitizedData = sanitizeProductData(formData);
            const result = await updateProduct(product._id, sanitizedData);

            if (result.success) {
                toaster.create({
                    title: "Success! 🎉",
                    description: result.message,
                    type: "success",
                    status: "success",
                    duration: 3000,
                    closable: true,
                });
                setIsModalOpen(false);
                clearErrors();
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
            console.error("Failed to update product:", error);
            toaster.create({
                title: "Error",
                description: "Failed to update product. Please try again.",
                type: "error",
                status: "error",
                duration: 4000,
                closable: true,
            });
        }
    };

    // const handleInputChange = (e) => {
    //     const { name, value } = e.target;
    //     setFormData((prev) => ({
    //         ...prev,
    //         [name]: value,
    //     }));
    // };

    const handleModalClose = () => {
        setIsModalOpen(false);
        resetForm({
            name: product.name,
            price: product.price,
            image: product.image,
        });
    };

    return (
        <>
            <Box
                w="full" // Take full width of the grid cell
                maxW={{ base: "450px", md: "none" }} // Limit width only on mobile
                mx="auto" // Center within the grid cell
                shadow="md"
                rounded="lg"
                overflow={"hidden"}
                transition={"transform 0.2s"}
                _hover={{ transform: "translateY(-5px)", shadow: "lg" }}
                bg={colors.bg}
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
                    <Text color={colors.textColor} fontSize={"md"} mb={4}>
                        ${product.price}
                    </Text>

                    <HStack spacing={2}>
                        <IconButton
                            onClick={() => setIsModalOpen(true)}
                            {...styles.editIconButtonProps}
                        >
                            <IoMdCreate />
                        </IconButton>
                        <IconButton
                            onClick={() => handleDeleteProduct(product._id)}
                            {...styles.deleteIconButtonProps}
                        >
                            <MdDeleteOutline />
                        </IconButton>
                    </HStack>
                </Box>
            </Box>

            <Dialog.Root
                open={isModalOpen}
                onOpenChange={(details) => {
                    if (!details.open) {
                        handleModalClose();
                    }
                }}
                size="md"
            >
                <Dialog.Backdrop />
                <Dialog.Positioner>
                    <Dialog.Content
                        bg={colors.modalBg}
                        rounded="xl"
                        shadow="2xl"
                    >
                        <Dialog.Header bg={colors.modalBg}>
                            <Dialog.Title color={colors.textColor}>
                                Edit Product
                            </Dialog.Title>
                            <Dialog.CloseTrigger onClick={handleModalClose} />
                        </Dialog.Header>

                        <Dialog.Body bg={colors.modalBg}>
                            <VStack spacing={4}>
                                <ValidatedInput
                                    placeholder="Product Name"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleInputChange}
                                    error={errors.name}
                                />

                                <ValidatedInput
                                    placeholder="Product Price"
                                    name="price"
                                    type="number"
                                    step="0.01"
                                    min="0"
                                    value={formData.price}
                                    onChange={handleInputChange}
                                    error={errors.price}
                                />

                                <ValidatedInput
                                    placeholder="Product Image URL"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    error={errors.image}
                                />
                            </VStack>
                        </Dialog.Body>

                        <Dialog.Footer bg={colors.modalBg}>
                            <HStack spacing={3}>
                                <Button
                                    onClick={handleModalClose}
                                    {...styles.cancelButtonProps}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    loading={loading}
                                    onClick={handleEditProduct}
                                    {...styles.updateButtonProps}
                                >
                                    {loading ? "Updating..." : "Update Product"}
                                </Button>
                            </HStack>
                        </Dialog.Footer>
                    </Dialog.Content>
                </Dialog.Positioner>
            </Dialog.Root>
        </>
    );
};

export default ProductCard;
