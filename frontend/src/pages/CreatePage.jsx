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
import { useFormValidation } from "@/hooks/useFormValidation";
import { sanitizeProductData } from "@/utils/validation";
import ValidatedInput from "@/components/ui/ValidatedInput";

const CreatePage = () => {
    const { createProduct, loading } = useProductStore();
    const { formData, errors, validateForm, handleInputChange, resetForm } =
        useFormValidation();

    const handleAddProduct = async () => {
        // Validate form before submission
        const isValid = await validateForm();
        if (!isValid) {
            return;
        }

        const sanitizedData = sanitizeProductData(formData);
        const { success, message } = await createProduct(sanitizedData);

        if (success) {
            toaster.create({
                title: "Success! 🎉",
                description: message,
                type: "success",
                status: "success",
                duration: 3000,
                closable: true,
            });
            resetForm();
        } else {
            toaster.create({
                title: "Error",
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

                        <Button
                            w={"full"}
                            colorPalette="blue"
                            bg="blue.500"
                            color="white"
                            _hover={{ bg: "blue.600" }}
                            loading={loading}
                            onClick={handleAddProduct}
                        >
                            {loading ? "Creating..." : "Add Product"}
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    );
};

export default CreatePage;
