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
// import { sanitizeProductData } from "@/utils/validation";
import ValidatedInput from "../ui/ValidatedInput";

const ProductCard = ({ product }) => {
    const styles = useProductCardStyles();
    const { colors } = styles;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { deleteProduct, updateProduct, loading } = useProductStore();

    // Enhanced form validation with better options for modal context
    const {
        formData,
        errors,
        validateForm,
        handleInputChange,
        handleFieldBlur,
        resetForm,
        clearErrors,
        hasErrors,
        isValidating,
    } = useFormValidation(
        {
            name: product.name,
            price: product.price,
            image: product.image,
        },
        {
            enableRealTimeValidation: true,
            validationDelay: 300,
            sanitizeOnChange: true,
            showToastOnError: false, // Handle validation errors manually in modal
        }
    );

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

    // Corrected validation handling
    const handleEditProduct = async () => {
        try {
            // Validate form before submission
            const { isValid, sanitizedData } = await validateForm();

            if (!isValid) {
                // Show validation errors in toast for better UX
                const errorMessages = Object.values(errors)
                    .filter((error) => error)
                    .slice(0, 2); // Show max 2 errors

                if (errorMessages.length > 0) {
                    toaster.create({
                        title: "Validation Error",
                        description: errorMessages.join(". "),
                        type: "error",
                        status: "error",
                        duration: 4000,
                        closable: true,
                    });
                }
                return;
            }

            // Update product with sanitized data
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
        clearErrors();
    };

    // Modal open handler to reset form state
    const handleModalOpen = () => {
        setIsModalOpen(true);
        resetForm({
            name: product.name,
            price: product.price,
            image: product.image,
        });
        clearErrors();
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
                            onClick={handleModalOpen} // Use proper modal open handler
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
                                    onBlur={handleFieldBlur} // Field blur validation
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
                                    onBlur={handleFieldBlur} // Field blur validation
                                    error={errors.price}
                                />

                                <ValidatedInput
                                    placeholder="Product Image URL"
                                    name="image"
                                    value={formData.image}
                                    onChange={handleInputChange}
                                    onBlur={handleFieldBlur} // Field blur validation
                                    error={errors.image}
                                />
                            </VStack>
                        </Dialog.Body>

                        <Dialog.Footer bg={colors.modalBg}>
                            <HStack spacing={3}>
                                <Button
                                    onClick={handleModalClose}
                                    {...styles.cancelButtonProps}
                                    disabled={loading} // Disable during loading
                                >
                                    Cancel
                                </Button>
                                <Button
                                    loading={loading || isValidating} // Show loading during validation
                                    onClick={handleEditProduct}
                                    disabled={hasErrors} // Disable when validation errors exist
                                    {...styles.updateButtonProps}
                                >
                                    {loading
                                        ? "Updating..."
                                        : isValidating
                                        ? "Validating..."
                                        : "Update Product"}
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
