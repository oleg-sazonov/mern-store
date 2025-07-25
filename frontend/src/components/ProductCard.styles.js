import { useColorModeValue } from "./ui/color-mode";

export const useProductCardStyles = () => {
    // Color mode values
    const textColor = useColorModeValue("gray.600", "gray.200");
    const bg = useColorModeValue("white", "gray.700");
    const modalBg = useColorModeValue("gray.100", "gray.700");
    const inputBg = useColorModeValue("white", "gray.600");
    const inputBorderColor = useColorModeValue("gray.300", "gray.500");
    const placeholderColor = useColorModeValue("gray.500", "gray.400");
    const buttonBorderColor = useColorModeValue("gray.300", "gray.500");
    const buttonHoverBg = useColorModeValue("gray.50", "gray.600");
    const buttonHoverBorderColor = useColorModeValue("gray.400", "gray.400");

    return {
        // Colors for direct use
        colors: {
            textColor,
            bg,
            modalBg,
            inputBg,
            inputBorderColor,
            placeholderColor,
            buttonBorderColor,
            buttonHoverBg,
            buttonHoverBorderColor,
        },

        // Component props
        inputProps: {
            bg: inputBg,
            borderColor: inputBorderColor,
            color: textColor,
            _placeholder: { color: placeholderColor },
        },

        cancelButtonProps: {
            variant: "outline",
            borderColor: buttonBorderColor,
            color: textColor,
            _hover: {
                bg: buttonHoverBg,
                borderColor: buttonHoverBorderColor,
            },
        },

        updateButtonProps: {
            colorPalette: "blue",
            bg: "blue.500",
            color: "white",
            _hover: { bg: "blue.600" },
        },

        baseIconButtonProps: {
            size: "sm",
        },

        editIconButtonProps: {
            size: "sm",
            "aria-label": "Update Product",
            colorPalette: "blue",
            bg: "blue.500",
            _hover: {
                bg: "blue.600",
                borderColor: "blue.600",
            },
        },

        deleteIconButtonProps: {
            size: "sm",
            "aria-label": "Delete Product",
            colorPalette: "red",
            bg: "red.500",
            _hover: {
                bg: "red.600",
                borderColor: "red.600",
            },
        },
    };
};
